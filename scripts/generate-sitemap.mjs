// Build-time sitemap generator. Runs before `vite build` (see package.json).
//
// src/data/projects.js uses import.meta.glob, a Vite-only construct plain
// Node can't execute — so this loads it through Vite's own SSR module
// runner instead of re-implementing the project-discovery logic here. That
// keeps src/data/projects.js the single source of truth: a project folder
// added there is picked up here automatically, the same way it's picked up
// by the app itself, so it can't silently go missing from the sitemap.
import { createServer } from "vite";
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Routes with no natural data source (not in profileData.navLinks, not a
// project). Sitemap.jsx (the in-app /sitemap page) hand-lists these same
// routes for the same reason — there's nothing to derive them from.
const EXTRA_STATIC_ROUTES = ["/credentials", "/sitemap", "/tags", "/voluntary", "/privacy", "/impressum"];

async function main() {
  const server = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { projects } = await server.ssrLoadModule("/src/data/projects.js");
    const { profileData } = await server.ssrLoadModule("/src/data/profile.js");

    const siteUrl = profileData.contact.website.replace(/\/$/, "");

    const navRoutes = profileData.navLinks.map((link) => link.path);

    // Same publish rule the app itself uses (projects.js sets `href` to
    // null for coming-soon projects) — a coming-soon case study has no
    // page to crawl yet, so it's excluded here too.
    const projectRoutes = projects.filter((p) => p.href).map((p) => p.href);

    const routes = [...new Set([...navRoutes, ...EXTRA_STATIC_ROUTES, ...projectRoutes])];

    const urls = routes
      .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

    await writeFile(join(ROOT, "public", "sitemap.xml"), xml, "utf-8");
    console.log(`sitemap.xml: ${routes.length} URLs written (${projectRoutes.length} from projects.js)`);
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
