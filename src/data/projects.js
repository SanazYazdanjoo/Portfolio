// ─────────────────────────────────────────────────────────────
// src/data/projects.js — DYNAMIC aggregator. Do not edit
// project content here; edit src/projects/<folder>/data.js.
//
// How it works:
//   import.meta.glob scans src/projects/*/data.js at build time
//   (and hot-reloads in dev). Every folder that contains a
//   data.js is discovered automatically:
//
//     src/projects/
//       project-1/data.js   ← edit → site updates everywhere
//       project-2/data.js
//       project-3/data.js
//       my-new-study/…      ← just add a folder. That's it.
//
//   No registration, no imports to maintain, no drift.
//
// NOTE: `import.meta.glob` is Vite-only. (CRA equivalent would
// be require.context — but you're on Vite, so we're good.)
// ─────────────────────────────────────────────────────────────

const modules = import.meta.glob("../projects/*/data.js", { eager: true });

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

    // Slug = folder name ("../projects/project-1/data.js" → "project-1").
    // Same source main.jsx builds routes from — link and route can't drift.
    const folderSlug = path.split("/")[2];
    const slug = p.slug ?? folderSlug;

    const status = normalizeStatus(p.status);

    if (import.meta.env.DEV) {
      for (const field of ["status", "title", "methods"]) {
        if (!p?.[field]) {
          console.warn(`[projects] ${path} is missing required field "${field}"`);
        }
      }
      if (status && !["published", "coming-soon"].includes(status)) {
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
      href: status === "published" ? `/projects/${slug}` : null,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

/** Homepage order: published first (by `order`), coming-soon sinks. */
export const sortedProjects = [
  ...projects.filter((p) => p.status === "published"),
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