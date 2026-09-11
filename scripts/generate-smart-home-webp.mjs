// Generate lightweight delivery copies for the photographed Smart Home case study.
//
// The JPG files in media/ are the evidence masters and stay untouched. Vite's
// smartHomeOptimizedMedia plugin transparently swaps imports to the generated
// WebP copies when they exist, so the project data remains the single source of
// truth and zoom/print/caption behaviour does not need a second media manifest.
//
// Output lives under media/.optimized/ and is git-ignored. `predev` and
// `prebuild` run this script before Vite starts, which means a fresh clone and a
// clean Vercel build both have the optimized files before module resolution.

import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MEDIA_ROOT = join(ROOT, "src/projects/smart-home-control/media");
const OUTPUT_ROOT = join(MEDIA_ROOT, ".optimized");

// Only files actually wired into smart-home-control.data.js. The discovery
// chart is already a small, crisp PNG and the MP4 is handled separately.
const SOURCES = [
  "v1/flow-map.jpg",
  "v1/A.jpg",
  "v1/B.jpg",
  "v1/C.jpg",
  "v1/D.jpg",
  "v1/E.jpg",
  "v1/F.jpg",
  "v1/G.jpg",
  "v1/H.jpg",
  "v1/I.jpg",
  "v1/J.jpg",
  "v1/K.jpg",
  "v1/L.jpg",
  "v1/flow-cheatsheet.jpg",
  "v1/13-sheet-interaction-poster.jpg",
  "session/picture-2a-participantB-toggle-room.jpg",
  "v2/00-flow-map.jpg",
  "v2/A.jpg",
  "v2/K.jpg",
  "v2/L.jpg",
  "v2/M.jpg",
];

const LONG_EDGE = 1800;
const QUALITY = 82;

async function isFresh(source, destination) {
  try {
    const [srcStat, destStat] = await Promise.all([stat(source), stat(destination)]);
    return destStat.size > 0 && destStat.mtimeMs >= srcStat.mtimeMs;
  } catch {
    return false;
  }
}

async function optimize(relativePath) {
  const source = join(MEDIA_ROOT, relativePath);
  const destination = join(
    OUTPUT_ROOT,
    relativePath.replace(/\.(?:jpe?g|png)$/i, ".webp")
  );

  await mkdir(dirname(destination), { recursive: true });

  if (await isFresh(source, destination)) {
    return { relativePath, skipped: true };
  }

  const before = (await stat(source)).size;

  await sharp(source)
    // Apply EXIF orientation before metadata is stripped from the delivery copy.
    .rotate()
    // Case-study images never render above ~1060 CSS px inline. 1800px keeps
    // handwriting crisp on high-DPR screens and in the zoom view without
    // shipping phone-photo dimensions to every reader.
    .resize({
      width: LONG_EDGE,
      height: LONG_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(destination);

  const after = (await stat(destination)).size;
  return { relativePath, before, after, skipped: false };
}

const results = await Promise.all(SOURCES.map(optimize));

for (const result of results) {
  if (result.skipped) {
    console.log(`[smart-home images] ${result.relativePath} — cached`);
    continue;
  }

  const reduction = Math.round((1 - result.after / result.before) * 100);
  console.log(
    `[smart-home images] ${result.relativePath}: ` +
      `${Math.round(result.before / 1024)}KB → ${Math.round(result.after / 1024)}KB ` +
      `(-${reduction}%)`
  );
}
