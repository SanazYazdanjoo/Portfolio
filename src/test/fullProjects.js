// FULL project data for tests and build-time audits ONLY.
//
// The app aggregator (src/data/projects.js) deliberately globs card.js —
// card-level fields — so the case-study prose stays out of the shared
// bundle. The verification suites and check-needs-input.mjs, though, must
// see EVERYTHING: bilingual parity, tagEvidence, the evidence corpora, and
// NEEDS_INPUT sentinels all live in the full <slug>.data.js modules.
//
// ⚠️ Never import this from application code. One import from a page or
// component pulls all five case studies' prose back into a shared chunk
// and silently undoes the Phase 5 split this file exists to protect.

const modules = import.meta.glob("../projects/*/*.data.js", { eager: true });

/** Full project objects, slug derived from the folder name like the app
 *  aggregator does, sorted by `order` for stable output. */
export const fullProjects = Object.entries(modules)
  .map(([path, mod]) => {
    const p = mod.default ?? mod.projectData;
    if (!p) return null;
    const slug = path.split("/")[2];
    // Mirror the aggregator's derivations so full-data suites can assert on
    // them (e.g. "every project with a detail page has a tagline").
    const status = String(p.status ?? "").trim().toLowerCase().replace(/\s+/g, "-");
    const href =
      status === "published" || status === "in-progress" ? `/projects/${slug}` : null;
    return { ...p, slug, status, href };
  })
  .filter(Boolean)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const getFullProject = (slug) => fullProjects.find((p) => p.slug === slug);
