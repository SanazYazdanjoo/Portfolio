// Dynamic aggregator — project content is edited in src/projects/<folder>/,
// not here. import.meta.glob scans the folders at build time (and hot-reloads
// in dev), so any folder is discovered automatically with no manual
// registration. import.meta.glob is Vite-only.
//
// CARD FILES, not data.js: this module reaches every page (homepage grid,
// /projects, tag pages, sitemap, CV highlights, the meta/sitemap scripts),
// so eagerly globbing the full data.js files shipped all five case studies'
// complete bilingual prose (~57 KiB gzipped) on the homepage's critical
// path — 85% of mobile LCP was render delay waiting on exactly this chain.
// card.js carries only what card surfaces read; each data.js spreads its
// card and loads with the detail route's own chunk. Full-content consumers
// (the test suites, check-needs-input) glob data.js themselves via
// src/test/fullProjects.js — never import that helper from app code, or
// the split is undone.

const modules = import.meta.glob("../projects/*/card.js", { eager: true });

/**
 * Normalize the status field at the boundary, so data.js files
 * can say "Published", "published", or "Coming Soon" and the rest
 * of the app only ever sees the canonical lowercase-kebab form.
 * (Caught by the invariant tests: "Published" !== "published"
 * silently emptied sortedProjects and nulled every href.)
 */
const normalizeStatus = (raw) =>
  String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-"); // "Coming Soon" → "coming-soon"

/** All projects, sorted by their `order` field (missing order sinks last). */
export const projects = Object.entries(modules)
  .map(([path, mod]) => {
    const p = mod.default ?? mod.projectData;

    if (!p) {
      console.warn(
        `[projects] ${path} exports neither \`default\` nor \`projectData\` — skipped.`
      );
      return null;
    }

    // Slug = folder name ("../projects/gaze-assisted-input/data.js" →
    // "gaze-assisted-input").
    // Same source main.jsx builds routes from — link and route can't drift.
    // A `slug` field in data.js is deliberately ignored: main.jsx would still
    // register the route under the folder name, so a custom slug could only
    // produce links that 404. To change a URL, rename the folder.
    const slug = path.split("/")[2];

    const status = normalizeStatus(p.status);

    if (import.meta.env.DEV) {
      if (p.slug && p.slug !== slug) {
        console.warn(
          `[projects] ${path} sets slug "${p.slug}" — ignored; the folder name is the slug. Rename the folder to change the URL.`
        );
      }
      for (const field of ["status", "title", "tags"]) {
        if (!p?.[field]) {
          console.warn(`[projects] ${path} is missing required field "${field}"`);
        }
      }
      if (status && !["published", "in-progress", "coming-soon"].includes(status)) {
        console.warn(
          `[projects] ${path} has unknown status "${p.status}" — it will not appear in sortedProjects.`
        );
      }
    }

    return {
      ...p,
      slug,
      status, // ← after ...p, so the normalized value overwrites the raw one
      tags: Array.isArray(p.tags)
        ? p.tags
        : Array.isArray(p.methods)
        ? p.methods
        : [],
      // "in-progress" projects have a real, linkable detail page too (see
      // Project-4) — only "coming-soon" has nothing to route to yet.
      href: status === "published" || status === "in-progress" ? `/projects/${slug}` : null,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

/**
 * Homepage order: everything with a real detail page (published *and*
 * in-progress) shares one `order`-sorted group, so a live in-progress case
 * study can lead the grid. Only "coming-soon" — which has nothing to link
 * to — sinks to the end.
 */
export const sortedProjects = [
  ...projects.filter((p) => p.status === "published" || p.status === "in-progress"),
  ...projects.filter((p) => p.status === "coming-soon"),
];

export const getTagData = () => {
  const tagCounts = {};
  projects.forEach((p) => {
    if (Array.isArray(p.tags)) {
      p.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  return Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
};

/** Detail-page lookup: useProject("gaze-assisted-input") → project or undefined. */
export const getProject = (slug) => projects.find((p) => p.slug === slug);