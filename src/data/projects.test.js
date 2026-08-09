// Data-contract tests for the projects aggregator. These run against the
// actual src/projects/*/data.js files (import.meta.glob works natively in
// Vitest since it runs through Vite's transform pipeline) and don't assert
// specific titles or counts, so adding a new project won't break them, but a
// malformed data.js will.

import { describe, it, expect } from "vitest";
import { projects, sortedProjects, getProject, getTagData } from "./projects";

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