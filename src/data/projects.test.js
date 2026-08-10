// Data-contract tests for the projects aggregator. These run against the
// actual src/projects/*/data.js files (import.meta.glob works natively in
// Vitest since it runs through Vite's transform pipeline) and don't assert
// specific titles or counts, so adding a new project won't break them, but a
// malformed data.js will.

import { describe, it, expect } from "vitest";
import { projects, sortedProjects, getProject, getTagData } from "./projects";
import { isNeedsInput } from "./needsInput";

describe("projects aggregator — data contract", () => {
  it("discovers at least one project folder", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has the required fields", () => {
    for (const p of projects) {
      expect(p.slug, `missing slug`).toBeTruthy();
      expect(p.title, `${p.slug} missing title`).toBeTruthy();
      expect(p.status, `${p.slug} missing status`).toBeTruthy();
      expect(p.methods, `${p.slug} missing methods`).toBeTruthy();
    }
  });

  it("status is always a known value", () => {
    for (const p of projects) {
      expect(["published", "in-progress", "coming-soon"]).toContain(p.status);
    }
  });

  it("slugs are unique (no duplicate routes)", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("tags is always an array (methods fallback works)", () => {
    for (const p of projects) {
      expect(Array.isArray(p.tags), `${p.slug} tags not an array`).toBe(true);
    }
  });

  it("href follows the publish rule: /projects/<slug> for published/in-progress, else null", () => {
    for (const p of projects) {
      if (p.status === "published" || p.status === "in-progress") {
        expect(p.href).toBe(`/projects/${p.slug}`);
      } else {
        expect(p.href).toBeNull();
      }
    }
  });

  it("projects are sorted ascending by order (missing order sinks last)", () => {
    const orders = projects.map((p) => p.order ?? 99);
    const sorted = [...orders].sort((a, b) => a - b);
    expect(orders).toEqual(sorted);
  });

  // main.jsx derives routes from the folder name under src/projects/, this
  // file derives `href` from `slug`, and Sitemap.jsx links via `p.id` — three
  // independent derivations that only agree if id === slug === folder name.
  // A mismatch here is a live sitemap 404, not a hypothetical one.
  it("id, slug, and folder name are identical", () => {
    for (const p of projects) expect(p.id).toBe(p.slug);
  });

  // Sitemap.jsx links via p.id — a capitalized slug still passes the id/slug
  // equality check above as long as id matches, but a capitalized folder
  // name is itself the kind of casing drift that caused the Project-4 bug.
  it("slugs are lowercase", () => {
    for (const p of projects) expect(p.slug).toBe(p.slug.toLowerCase());
  });
});

describe("sortedProjects — homepage ordering", () => {
  it("all published projects appear before any coming-soon project", () => {
    const firstComingSoon = sortedProjects.findIndex(
      (p) => p.status === "coming-soon"
    );
    if (firstComingSoon === -1) return; // nothing coming-soon: trivially true
    const publishedAfter = sortedProjects
      .slice(firstComingSoon)
      .some((p) => p.status === "published");
    expect(publishedAfter).toBe(false);
  });

  it("all in-progress projects appear before any coming-soon project", () => {
    const firstComingSoon = sortedProjects.findIndex(
      (p) => p.status === "coming-soon"
    );
    if (firstComingSoon === -1) return; // nothing coming-soon: trivially true
    const inProgressAfter = sortedProjects
      .slice(firstComingSoon)
      .some((p) => p.status === "in-progress");
    expect(inProgressAfter).toBe(false);
  });

  it("contains exactly the same projects as `projects` (nothing lost)", () => {
    expect(sortedProjects.length).toBe(projects.length);
    const a = new Set(projects.map((p) => p.slug));
    const b = new Set(sortedProjects.map((p) => p.slug));
    expect(b).toEqual(a);
  });
});

describe("getProject — detail-page lookup", () => {
  it("finds every project by its own slug", () => {
    for (const p of projects) {
      expect(getProject(p.slug)).toBe(p);
    }
  });

  it("returns undefined for unknown slugs (404 path)", () => {
    expect(getProject("definitely-not-a-project")).toBeUndefined();
  });
});

describe("getTagData — tag cloud counts", () => {
  it("total counts equal total tags across all projects", () => {
    const totalTags = projects.reduce((n, p) => n + p.tags.length, 0);
    const countedTags = getTagData().reduce((n, t) => n + t.count, 0);
    expect(countedTags).toBe(totalTags);
  });

  it("every count is at least 1 and every name is a non-empty string", () => {
    for (const { name, count } of getTagData()) {
      expect(typeof name).toBe("string");
      expect(name.length).toBeGreaterThan(0);
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });
});

// Walks a project's raw (pre-localization) data tree looking for bilingual
// { en, de } leaf pairs — recognized the same way useLocalizedProfile.js's
// isBilingualField does (an object carrying an `en` and/or `de` own key),
// extended to also recognize the sentinel: a field explicitly flagged
// NEEDS_INPUT on either side is a deliberate, visible "not yet known" — not
// the silent one-language gap this test exists to catch — so it's exempted
// rather than failed. Bare NEEDS_INPUT array items (e.g. myContribution's
// `owned: [NEEDS_INPUT]`) aren't a { en, de } shape at all and are skipped
// by the same object-with-en/de-key check.
function findBilingualParityGaps(value, path, out) {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    value.forEach((item, i) => findBilingualParityGaps(item, `${path}[${i}]`, out));
    return;
  }
  if (typeof value !== "object") return;

  const hasEn = Object.prototype.hasOwnProperty.call(value, "en");
  const hasDe = Object.prototype.hasOwnProperty.call(value, "de");
  if (hasEn || hasDe) {
    const { en, de } = value;
    if (isNeedsInput(en) || isNeedsInput(de)) return; // explicitly flagged, not a silent gap
    const enPresent = typeof en === "string" && en.length > 0;
    const dePresent = typeof de === "string" && de.length > 0;
    if (enPresent !== dePresent) {
      out.push(`${path}: en=${JSON.stringify(en)} de=${JSON.stringify(de)}`);
    }
    return; // a resolved bilingual leaf — don't recurse into its own en/de strings
  }

  for (const key of Object.keys(value)) {
    findBilingualParityGaps(value[key], path ? `${path}.${key}` : key, out);
  }
}

describe("bilingual parity — every { en, de } field has both languages or neither", () => {
  it("no project has an en value without a matching de value (or vice versa)", () => {
    for (const p of projects) {
      const gaps = [];
      findBilingualParityGaps(p, "", gaps);
      expect(gaps, `${p.slug} has one-sided bilingual fields:\n${gaps.join("\n")}`).toEqual([]);
    }
  });
});

// The tag-evidence invariant. A tag can never again be added to a case
// study without a pointer to the thing that proves it — the same class of
// contract as "id === slug === folder name" above: a claim that could
// silently go stale is instead something the suite catches.
const ALLOWED_EVIDENCE_STATUSES = ["evidenced", "thin", "unevidenced"];

describe("tagEvidence — every skill tag is backed by a pointer into the case study", () => {
  it("every project defines tagEvidence when it defines tags", () => {
    for (const p of projects) {
      if (p.tags.length > 0) {
        expect(Array.isArray(p.tagEvidence), `${p.slug} has tags but no tagEvidence`).toBe(true);
      }
    }
  });

  it("every tag has a matching tagEvidence entry, and no entry references an unknown tag", () => {
    for (const p of projects) {
      if (!p.tagEvidence) continue;
      const tagSet = new Set(p.tags);
      const evidenceTagSet = new Set(p.tagEvidence.map((e) => e.tag));

      for (const tag of p.tags) {
        expect(evidenceTagSet.has(tag), `${p.slug}: tag "${tag}" has no tagEvidence entry`).toBe(true);
      }
      for (const entry of p.tagEvidence) {
        expect(tagSet.has(entry.tag), `${p.slug}: tagEvidence references unknown tag "${entry.tag}"`).toBe(true);
      }
    }
  });

  it("every tagEvidence entry has an allowed status and a non-empty evidence pointer", () => {
    for (const p of projects) {
      if (!p.tagEvidence) continue;
      for (const entry of p.tagEvidence) {
        expect(
          ALLOWED_EVIDENCE_STATUSES,
          `${p.slug}: tag "${entry.tag}" has unknown status "${entry.status}"`
        ).toContain(entry.status);
        expect(
          typeof entry.evidence === "string" && entry.evidence.length > 0,
          `${p.slug}: tag "${entry.tag}" has no evidence pointer`
        ).toBe(true);
      }
    }
  });

  it("thin evidence warns but passes; unevidenced evidence fails the build", () => {
    const unevidenced = [];
    for (const p of projects) {
      if (!p.tagEvidence) continue;
      for (const entry of p.tagEvidence) {
        if (entry.status === "thin") {
          console.warn(`[tagEvidence] ${p.slug}: "${entry.tag}" is thinly evidenced — ${entry.evidence}`);
        }
        if (entry.status === "unevidenced") {
          unevidenced.push(`${p.slug}: "${entry.tag}" — ${entry.evidence}`);
        }
      }
    }
    expect(unevidenced, `Unevidenced tags must be fixed or dropped before this passes:\n${unevidenced.join("\n")}`).toEqual([]);
  });
});