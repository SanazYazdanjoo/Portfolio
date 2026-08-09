// One-off conversion: generates a .webp sibling next to each large project
// thumbnail PNG. Not wired into `npm run build` — re-run manually
// (`node scripts/generate-webp.mjs`) if one of these source PNGs changes.
import { readdir, stat } from "node:fs/promises";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = join(__dirname, "..", "src", "projects");

// Only the large root-level thumbnail/hero PNGs — not the smaller figures
// under each project's media/ subfolder.
const TARGETS = [
  "project-1/Project-1.png",
  "project-2/Project-2.png",
  "project-3/Project-3.png",
  "Project-4/Project-4.png",
];

async function convert(relPath) {
  const src = join(PROJECTS_DIR, relPath);
  const dest = join(dirname(src), basename(src, extname(src)) + ".webp");

  const before = (await stat(src)).size;
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  const after = (await stat(dest)).size;

  console.log(
    `${relPath} → ${basename(dest)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB ` +
      `(-${(100 - (after / before) * 100).toFixed(1)}%)`
  );
}

for (const target of TARGETS) {
  await convert(target);
}
