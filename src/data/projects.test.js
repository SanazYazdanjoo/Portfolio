// Data-contract tests for the projects aggregator. These run against the
// actual src/projects/*/data.js files (import.meta.glob works natively in
// Vitest since it runs through Vite's transform pipeline) and don't assert
// specific titles or counts, so adding a new project won't break them, but a
// malformed data.js will.

import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { projects, sortedProjects, getProject, getTagData } from "./projects";
// The aggregator carries CARD-level fields only (see the Phase 5 split in
// projects.js). Content-level suites — bilingual parity, tagEvidence, the
// renderer registry, metric provenance — verify the FULL data.js modules
// through this test-only glob.
import { fullProjects, getFullProject } from "../test/fullProjects";
import { profileData } from "./profile";
import { isNeedsInput } from "./needsInput";
import {
  RENDERED_FIELDS,
  DATA_ONLY_FIELDS,
  FIGURE_KEYS,
  PROSE_SECTIONS,
  SECTIONS,
  VERBATIM_SECTIONS,
} from "../projects/template/constants";

describe("projects aggregator — data contract", () => {
  it("discovers at least one project folder", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every card has the required fields", () => {
    for (const p of projects) {
      expect(p.slug, `missing slug`).toBeTruthy();
      expect(p.title, `${p.slug} missing title`).toBeTruthy();
      expect(p.status, `${p.slug} missing status`).toBeTruthy();
      expect(p.tags, `${p.slug} missing tags`).toBeTruthy();
    }
  });

  // `methods` renders on the detail page, so it lives in data.js, not the card.
  it("every full data.js has methods", () => {
    for (const p of fullProjects) {
      expect(p.methods, `${p.slug} missing methods`).toBeTruthy();
    }
  });

  // The split's own contract: every card has a data.js spreading it (same
  // folder set), and the card's identity fields survive the spread unchanged.
  it("card.js and data.js folders match one-to-one, and data spreads its card", () => {
    const cardSlugs = new Set(projects.map((p) => p.slug));
    const fullSlugs = new Set(fullProjects.map((p) => p.slug));
    expect(fullSlugs).toEqual(cardSlugs);
    for (const p of projects) {
      const full = getFullProject(p.slug);
      expect(full.id, `${p.slug}: data.js id diverges from card.js`).toBe(p.id);
      expect(full.title.en, `${p.slug}: data.js title diverges from card.js`).toBe(p.title.en);
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
    for (const p of fullProjects) {
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
    for (const p of fullProjects) {
      if (p.tags.length > 0) {
        expect(Array.isArray(p.tagEvidence), `${p.slug} has tags but no tagEvidence`).toBe(true);
      }
    }
  });

  it("every tag has a matching tagEvidence entry, and no entry references an unknown tag", () => {
    for (const p of fullProjects) {
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
    for (const p of fullProjects) {
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
    for (const p of fullProjects) {
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

// The data/renderer contract, in both directions. The tagEvidence suite above
// exists because pointers once named fields that did not exist; this one
// exists because the inverse is just as silent — `notBuilt` sat in a data.js
// fully written, fully bilingual, and rendered by nothing, so the author
// believed a section was published that no reader could reach.
//
// The registry lives in src/projects/template/constants.js, next to SECTIONS,
// so the list of fields a page can render sits beside the list of sections it
// renders them into.
describe("data/renderer contract — no field drifts in either direction", () => {
  const KNOWN = new Set([...RENDERED_FIELDS, ...DATA_ONLY_FIELDS]);

  it("every field in every data.js is either rendered or explicitly data-only", () => {
    for (const p of fullProjects) {
      // `href` is synthesized by the aggregator, not authored in data.js.
      const unknown = Object.keys(p).filter((k) => k !== "href" && !KNOWN.has(k));
      expect(
        unknown,
        `${p.slug}: field(s) ${unknown.join(", ")} appear in data.js but are in ` +
          `neither RENDERED_FIELDS nor DATA_ONLY_FIELDS. Either wire a renderer ` +
          `to them or list them as deliberately data-only, with a reason.`
      ).toEqual([]);
    }
  });

  it("the two registry lists never overlap (a field is rendered or it is not)", () => {
    const both = RENDERED_FIELDS.filter((f) => DATA_ONLY_FIELDS.includes(f));
    expect(both, `listed as both rendered and data-only: ${both.join(", ")}`).toEqual([]);
  });

  // The strip in the Results section renders from whichever of these is
  // present — never from a boolean. `resultsDetail` was one: read as
  // `!== false`, it could not turn the strip off for the project that set it,
  // and its heading called a set of artefact counts a study. It came back in
  // a later wholesale data replacement, still doing nothing, which is why
  // this guard is worth its line count.
  it("no project reintroduces the resultsDetail boolean", () => {
    for (const p of fullProjects) {
      expect(
        "resultsDetail" in p,
        `${p.slug}: resultsDetail is gone — the strip renders from ` +
          `resultsAtAGlance or metrics, whichever is present, and ` +
          `metricsIntro replaces its eyebrow.`
      ).toBe(false);
    }
  });

  // One level below the registry check: `figures` is a rendered field, so a
  // figure group filed under a key no section reads passes that check and
  // still renders nothing. `figures.design` was exactly this — written in
  // full, with alt text and captions, reachable by no one.
  it("every figures.* group is a slot some section actually renders", () => {
    for (const p of fullProjects) {
      if (!p.figures) continue;
      const unknown = Object.keys(p.figures).filter((k) => !FIGURE_KEYS.includes(k));
      expect(
        unknown,
        `${p.slug}: figures.${unknown.join(", figures.")} ` +
          `${unknown.length === 1 ? "is a group" : "are groups"} no section reads. ` +
          `Known slots: ${FIGURE_KEYS.join(", ")}.`
      ).toEqual([]);
    }
  });

  // A prose section needs three things to reach a reader: the text key in the
  // data, an entry in SECTIONS (or the sidebar and the numbering skip it),
  // and its two translation keys. Two out of three renders a heading with no
  // label, or a section no one can navigate to.
  it("every prose section has a matching SECTIONS entry", () => {
    for (const section of PROSE_SECTIONS) {
      expect(
        SECTIONS.some((s) => s.id === section.id && s.dataKey === section.textKey),
        `PROSE_SECTIONS "${section.id}" has no SECTIONS entry keyed to ` +
          `"${section.textKey}" — the sidebar and section numbering would skip it`
      ).toBe(true);
    }
  });

  // Bilingual prose blocks that stand alone as a section body. Same rule as
  // the strip and notBuilt: present-but-empty is worse than absent, because
  // it renders a heading over nothing.
  it("design, wireframe, designSystem, accessibility and metricsIntro, where present, are non-empty bilingual blocks", () => {
    for (const p of fullProjects) {
      for (const key of ["design", "wireframe", "designSystem", "accessibility", "metricsIntro"]) {
        if (!(key in p)) continue;
        const v = p[key];
        expect(
          v !== null && typeof v === "object" && !Array.isArray(v),
          `${p.slug}: ${key} must be an { en, de } object — useLocalizedProfile ` +
            `resolves it per language`
        ).toBe(true);
        expect(
          (v.en || "").length > 0,
          `${p.slug}: ${key} is present but empty — omit the field instead`
        ).toBe(true);
      }
    }
  });

  // The blank-cell rule, applied to figures. An entry with no image, no link
  // and no pending state renders a bordered empty box under its own caption —
  // the visual equivalent of the empty strip cell the metrics guard above
  // already forbids. `pending: true` is the supported way to keep a planned
  // figure visible while its artwork is still being made; it renders a frame
  // that says so and, unlike the NEEDS_INPUT sentinel, does not fail the
  // build — an absent illustration is not a fabricated claim.
  it("every figure has a src, an href, or pending: true", () => {
    for (const p of fullProjects) {
      if (!p.figures) continue;
      for (const [group, items] of Object.entries(p.figures)) {
        items.forEach((f, i) => {
          expect(
            !!f.src || !!f.href || f.pending === true,
            `${p.slug}: figures.${group}[${i}] has no src, no href and is not ` +
              `marked pending — it would render as an empty frame`
          ).toBe(true);
        });
      }
    }
  });

  // A design section with no figures is legitimate prose; figures with no
  // prose would render a numbered heading straight into an image grid.
  it("figures.design never appears without the design prose that heads it", () => {
    for (const p of fullProjects) {
      if (!p.figures?.design) continue;
      expect(
        p.design,
        `${p.slug}: figures.design exists but \`design\` does not — the section ` +
          `is keyed to the prose, so the figures would render nowhere`
      ).toBeTruthy();
    }
  });

  // The per-project heading override. A typo'd section id here would
  // silently do nothing — the section would keep its default title and the
  // author would believe it renamed — which is the same silent-drift class
  // as a figures group under an unknown key.
  it("sectionTitles, where present, keys real sections and carries bilingual parts", () => {
    const sectionIds = new Set(SECTIONS.map((s) => s.id));
    const ALLOWED_PARTS = ["label", "kicker", "heading"];
    for (const p of fullProjects) {
      if (!p.sectionTitles) continue;
      for (const [id, parts] of Object.entries(p.sectionTitles)) {
        expect(
          sectionIds.has(id),
          `${p.slug}: sectionTitles["${id}"] names no section — the override would silently do nothing`
        ).toBe(true);
        for (const [part, value] of Object.entries(parts)) {
          expect(
            ALLOWED_PARTS,
            `${p.slug}: sectionTitles.${id}.${part} is not a part any renderer reads`
          ).toContain(part);
          expect(
            (value?.en || "").length > 0,
            `${p.slug}: sectionTitles.${id}.${part} is present but empty — omit it instead`
          ).toBe(true);
        }
      }
    }
  });

  // Placement, not visibility: `verbatims` renders on presence alone. This
  // only checks that a project naming a section names one that exists —
  // a typo would otherwise silently fall back and move quotes off the
  // section their author put them in.
  it("verbatimsIn, where present, names a section that renders verbatims", () => {
    for (const p of fullProjects) {
      if (!("verbatimsIn" in p)) continue;
      expect(
        VERBATIM_SECTIONS,
        `${p.slug}: verbatimsIn "${p.verbatimsIn}" is not a section that renders ` +
          `verbatims`
      ).toContain(p.verbatimsIn);
      expect(
        p.verbatims?.length > 0,
        `${p.slug}: verbatimsIn is set but there are no verbatims to place`
      ).toBe(true);
    }
  });

  it("resultsAtAGlance, where present, carries a title and renderable items", () => {
    for (const p of fullProjects) {
      const glance = p.resultsAtAGlance;
      if (!glance) continue;
      expect(glance.title, `${p.slug}: resultsAtAGlance has no title`).toBeTruthy();
      expect(
        Array.isArray(glance.items) && glance.items.length > 0,
        `${p.slug}: resultsAtAGlance has no items — omit the field rather than ` +
          `render an empty strip`
      ).toBe(true);
    }
  });

  // Applies to both strip sources, since ProjectTemplate feeds whichever is
  // present through the same MetricsStrip.
  it("every strip item has a label and either a value or pending: true", () => {
    for (const p of fullProjects) {
      const sources = [
        ["metrics", p.metrics],
        ["resultsAtAGlance.items", p.resultsAtAGlance?.items],
      ];
      for (const [path, items] of sources) {
        if (!items) continue;
        items.forEach((item, i) => {
          expect(item.label, `${p.slug}: ${path}[${i}] has no label`).toBeTruthy();
          expect(
            item.value !== undefined || item.pending === true,
            `${p.slug}: ${path}[${i}] has neither a value nor pending: true — it ` +
              `would render as a blank cell`
          ).toBe(true);
        });
      }
    }
  });

  // The header's lead line and the project card's "Context" field both read
  // `tagline`, and both render nothing at all when it is missing — no gap, no
  // fallback, no warning. The IBS case study shipped that way: four of five
  // projects filled the line and one silently didn't. Every project with a
  // detail page owes the reader that sentence.
  it("every project with a detail page has a tagline", () => {
    for (const p of fullProjects) {
      if (p.status === "coming-soon") continue;
      expect(
        p.tagline,
        `${p.slug}: no tagline — the header lead line and the card's Context ` +
          `field will both render empty`
      ).toBeTruthy();
    }
  });

  // Same title+items shape as resultsAtAGlance, and the same rule: a block
  // that would render as a bare heading over nothing should be omitted, not
  // rendered empty.
  it("notBuilt, where present, carries a title and at least one item", () => {
    for (const p of fullProjects) {
      const nb = p.notBuilt;
      if (!nb) continue;
      expect(nb.title, `${p.slug}: notBuilt has no title`).toBeTruthy();
      expect(
        Array.isArray(nb.items) && nb.items.length > 0,
        `${p.slug}: notBuilt has no items — omit the field rather than render ` +
          `a heading over an empty list`
      ).toBe(true);
    }
  });

  // Optional by contract: the renderer must stay silent, not render an empty
  // row, for every project that has not written its disclosure.
  it("aiAssistance is optional, and a bilingual object wherever it is present", () => {
    for (const p of fullProjects) {
      if (!("aiAssistance" in p)) continue;
      const v = p.aiAssistance;
      expect(
        v !== null && typeof v === "object" && !Array.isArray(v),
        `${p.slug}: aiAssistance must be an { en, de } object, not a bare string ` +
          `— useLocalizedProfile resolves it per language`
      ).toBe(true);
      // Both languages non-empty; one-sided gaps are caught by the bilingual
      // parity suite above, so this only guards the all-empty case.
      expect(
        (v.en || "").length > 0,
        `${p.slug}: aiAssistance is present but empty — omit the field instead`
      ).toBe(true);
    }
  });
});

// The homepage card shows a capped, curated slice of a project's tags. That
// slice has to be a real subset of `tags`, or a card advertises a skill the
// detail page and the /tags directory have never heard of — the same
// documentation-drift class as tagEvidence, one level up.
describe("cardTags — the homepage card's capped tag list", () => {
  it("is always a subset of the project's own tags", () => {
    for (const p of projects) {
      if (!p.cardTags) continue;
      const known = new Set(p.tags);
      const strays = p.cardTags.filter((tag) => !known.has(tag));
      expect(
        strays,
        `${p.slug}: cardTags names tags that are not in \`tags\`: ${strays.join(", ")}`
      ).toEqual([]);
    }
  });

  // Exactly four, not "at most four": the card renders the list verbatim
  // with no counter and no expansion, so a fifth tag would silently not
  // appear anywhere and a third would leave the row looking unfinished.
  // One method, one research skill, one technical, one domain.
  it("is exactly four tags", () => {
    for (const p of projects) {
      if (!p.cardTags) continue;
      expect(p.cardTags.length, `${p.slug}: cardTags must be exactly 4`).toBe(4);
    }
  });

  it("has no duplicates", () => {
    for (const p of projects) {
      if (!p.cardTags) continue;
      expect(new Set(p.cardTags).size, `${p.slug}: cardTags repeats a tag`).toBe(p.cardTags.length);
    }
  });
});

// The homepage card gets one sentence per project. Twenty words is the point
// at which it stops being a summary and starts being the case study, and the
// forbidden phrases are the ones that spend the sentence taking the claim
// back — the caveats belong in the case study body, where there is room to
// earn them.
describe("cardOutcome — the homepage card's one-sentence result", () => {
  const HEDGES = [
    "not confirmed", "unconfirmed", "not yet", "not run", "pending",
    "nicht bestätigt", "unbestätigt", "noch nicht", "nicht durchgeführt",
  ];

  it("is at most twenty words, in both languages", () => {
    for (const p of projects) {
      if (!p.cardOutcome) continue;
      for (const lang of ["en", "de"]) {
        const words = p.cardOutcome[lang].trim().split(/\s+/).length;
        expect(
          words,
          `${p.slug}.cardOutcome.${lang} is ${words} words`
        ).toBeLessThanOrEqual(20);
      }
    }
  });

  it("does not spend the sentence hedging", () => {
    for (const p of projects) {
      if (!p.cardOutcome) continue;
      for (const lang of ["en", "de"]) {
        const text = p.cardOutcome[lang].toLowerCase();
        const found = HEDGES.filter((h) => text.includes(h));
        expect(
          found,
          `${p.slug}.cardOutcome.${lang} hedges: "${found.join('", "')}" — move the caveat to the case study body`
        ).toEqual([]);
      }
    }
  });
});

// A project kept off the homepage must not also carry the fields only the
// homepage card reads, or it is holding content nothing renders.
describe("excludeFromHome", () => {
  it("means the project carries no homepage-card fields", () => {
    for (const p of projects) {
      if (!p.excludeFromHome) continue;
      for (const field of ["cardTags", "cardOutcome", "cardImage", "year", "context"]) {
        expect(
          p[field],
          `${p.slug} is excluded from the homepage but still defines \`${field}\``
        ).toBeUndefined();
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Metric provenance — a CV-highlight metric may not be satisfied by case-study
// text born in the same commit as the metric itself. Evidence has to predate
// the claim it backs (or arrive later, verified from primary records, in its
// own commit). The failure mode this catches is real and recent: a metric
// ("4 stakeholder interviews") existed with no backing, and the tempting fix
// was to write the count into the case study in the same change — which turns
// the claim into its own source.
//
// Mechanism: for every numeric metric in profile.portfolioHighlights, find the
// case-study sentences that back it (the number, as digits or spelled out,
// co-occurring with a word from the metric's label), then ask git which commit
// first introduced each backing fragment into the project's data.js and which
// first introduced the metric's label into data.json. If every backing
// fragment was born in the metric's own commit — and that commit did not
// create the case-study file (a new case study legitimately lands claim and
// evidence together) — the build fails.
//
// Stated limits, in the spirit of the enforcement table: git pickaxe reads
// committed history, so an offending pair sitting uncommitted in the working
// tree passes until its first post-commit build; rewording a backing sentence
// resets its provenance; and a metric with NO backing text at all passes here
// vacuously — absence of evidence is a different rule's job, this one only
// polices where evidence came from. Shallow CI clones collapse old history
// into one boundary commit, which the file-creation exception absorbs.
const NUMBER_WORDS = {
  1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six",
  7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve",
};

function collectEnglishStrings(value, out) {
  if (value === null || value === undefined) return;
  if (typeof value === "string") { out.push(value); return; }
  if (Array.isArray(value)) { value.forEach((v) => collectEnglishStrings(v, out)); return; }
  if (typeof value !== "object") return;
  if (Object.prototype.hasOwnProperty.call(value, "en")) {
    if (typeof value.en === "string") out.push(value.en);
    return; // bilingual leaf — EN side only; DE mirrors it by the parity test
  }
  for (const key of Object.keys(value)) collectEnglishStrings(value[key], out);
}

describe("metric provenance — evidence may not be born in the metric's own commit", () => {
  let gitAvailable = true;
  const git = (...args) => {
    try {
      return execFileSync("git", args, { encoding: "utf8" }).trim();
    } catch {
      gitAvailable = false;
      return "";
    }
  };
  const firstCommitIntroducing = (needle, file) =>
    git("log", "--reverse", "--format=%H", "-S", needle, "--", file).split("\n")[0] || "";
  const firstCommitTouching = (file) =>
    git("log", "--reverse", "--format=%H", "--", file).split("\n")[0] || "";

  // Explicit timeout: this test shells out to dozens of `git log -S`
  // pickaxe sweeps over the full history. Alone it finishes in ~3s, but
  // under the full suite's parallel workers it intermittently crosses
  // vitest's 5s default and fails as a timeout, not as a violation.
  it("no numeric CV-highlight metric is backed only by same-commit text", () => {
    const highlights = profileData.portfolioHighlights ?? [];
    const violations = [];

    for (const h of highlights) {
      // FULL module: the evidence corpus is the prose, which cards no
      // longer carry after the Phase 5 split.
      const project = getFullProject(h.id);
      if (!project) continue; // the id/slug contract is asserted elsewhere
      const projectFile = `src/projects/${h.id}/data.js`;
      const projectStrings = [];
      collectEnglishStrings(project, projectStrings);

      for (const metric of h.metrics ?? []) {
        const rawValue =
          typeof metric.value === "object" ? metric.value.en : String(metric.value ?? "");
        const label = typeof metric.label === "object" ? metric.label.en : String(metric.label ?? "");
        const numbers = String(rawValue).match(/\d+(?:\.\d+)?/g) ?? [];
        if (numbers.length === 0) continue; // non-numeric values are out of scope

        const keywords = label.toLowerCase().split(/[^a-z-]+/).filter((w) => w.length >= 5);
        if (keywords.length === 0) continue;

        for (const num of numbers) {
          const word = NUMBER_WORDS[Number(num)];
          // Digit-boundary lookarounds, not \b: "4" must not match inside
          // "aged 25–34", nor "30" inside "300" — \b would accept both.
          const digitPattern =
            "(?<![0-9.])" + num.replace(".", "[.]") + "(?![0-9.])";
          const numberPattern = new RegExp(
            word ? digitPattern + "|\\b" + word + "\\b" : digitPattern,
            "i"
          );

          // Backing fragments: a ±30-char window around the number in any
          // project string that also carries a label keyword. The window is
          // cut at quote characters so the fragment stays a literal substring
          // of the source file (pickaxe matches text, not semantics).
          const fragments = [];
          for (const s of projectStrings) {
            const lower = s.toLowerCase();
            if (!keywords.some((k) => lower.includes(k))) continue;
            const m = numberPattern.exec(s);
            if (!m) continue;
            const start = Math.max(0, m.index - 30);
            const end = Math.min(s.length, m.index + m[0].length + 30);
            const frag = s.slice(start, end).split(/["'\u2018\u2019\u201C\u201E]/).sort((a, b) => b.length - a.length)[0].trim();
            if (frag.length >= 8) fragments.push(frag);
          }
          if (fragments.length === 0) continue; // no backing at all — vacuous here

          const metricIntro = firstCommitIntroducing(label, "src/data/data.json");
          if (!gitAvailable) return; // no repo history to consult — stated limit
          if (!metricIntro) continue; // metric not committed yet — bites next build

          const fileCreation = firstCommitTouching(projectFile);
          const intros = fragments.map((f) => firstCommitIntroducing(f, projectFile));
          const independent = intros.some(
            (c) => c === "" || c !== metricIntro || c === fileCreation
          );
          const selfBorn =
            !independent && intros.every((c) => c === metricIntro) && metricIntro !== fileCreation;

          if (selfBorn) {
            violations.push(
              `${h.id}: metric "${rawValue} ${label}" is backed only by text introduced in its own commit (${metricIntro.slice(0, 10)}) — evidence must come from primary records, in its own change`
            );
          }
        }
      }
    }

    expect(
      violations,
      `Self-born metrics:\n${violations.join("\n")}`
    ).toEqual([]);
  }, 30_000);
});
