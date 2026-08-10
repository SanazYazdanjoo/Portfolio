// Build-time NEEDS_INPUT gate. Runs before `vite build` (see package.json),
// alongside generate-sitemap.mjs. A page that ships with a fabricated claim
// is a worse failure than a page that refuses to build — so any surviving
// NEEDS_INPUT sentinel (src/data/needsInput.js) fails the build with the
// exact file and field path, rather than shipping silently resolved to
// "Symbol(portfolio.needsInput)" in the rendered HTML.
import { createServer } from "vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);

// Symbol.for uses the global symbol registry, so this is identical to the
// NEEDS_INPUT export in src/data/needsInput.js without needing to load that
// module through the SSR runner.
const NEEDS_INPUT = Symbol.for("portfolio.needsInput");

function findNeedsInput(value, path, out) {
  if (value === NEEDS_INPUT) {
    out.push(path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => findNeedsInput(item, `${path}[${i}]`, out));
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const key of Object.keys(value)) {
      findNeedsInput(value[key], path ? `${path}.${key}` : key, out);
    }
  }
}

async function main() {
  const server = await createServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { projects } = await server.ssrLoadModule("/src/data/projects.js");

    const failures = [];
    for (const project of projects) {
      const hits = [];
      findNeedsInput(project, "", hits);
      if (hits.length > 0) {
        failures.push({ slug: project.slug, hits });
      }
    }

    if (failures.length > 0) {
      console.error("\nBuild refused: unfilled NEEDS_INPUT fields remain.\n");
      for (const { slug, hits } of failures) {
        console.error(`  src/projects/${slug}/data.js`);
        for (const hit of hits) console.error(`    - ${hit}`);
      }
      console.error(
        `\n${failures.reduce((n, f) => n + f.hits.length, 0)} field(s) across ${failures.length} project(s) still need real content.\n` +
        "See CONTENT_GAPS.md for the full worklist.\n"
      );
      process.exitCode = 1;
      return;
    }

    console.log("check-needs-input: no unfilled NEEDS_INPUT fields — build may proceed.");
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
