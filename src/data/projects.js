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

    if (import.meta.env.DEV) {
      for (const field of ["status", "title", "methods"]) {
        if (!p?.[field]) {
          console.warn(`[projects] ${path} is missing required field "${field}"`);
        }
      }
    }

    return {
      ...p,
      slug,
      tags: Array.isArray(p.tags)
        ? p.tags
        : Array.isArray(p.methods)
        ? p.methods
        : [],
      href: p.status === "published" ? `/projects/${slug}` : null,
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