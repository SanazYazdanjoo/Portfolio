// Dynamic aggregator — project content is edited in src/projects/<folder>/data.js,
// not here. import.meta.glob scans src/projects/*/data.js at build time (and
// hot-reloads in dev), so any folder containing a data.js is discovered
// automatically with no manual registration. import.meta.glob is Vite-only.

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

    // Slug = folder name ("../projects/gaze-assisted-input/data.js" →
    // "gaze-assisted-input").
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

/** Homepage order: published first (by `order`), then in-progress, coming-soon sinks. */
export const sortedProjects = [
  ...projects.filter((p) => p.status === "published"),
  ...projects.filter((p) => p.status === "in-progress"),
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