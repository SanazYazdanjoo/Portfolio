// Regenerates every optimized delivery image from its git-tracked master.
// Not wired into `npm run build` — re-run manually (`node scripts/generate-webp.mjs`)
// after changing any source image below. Safe to re-run: resizes are capped
// with withoutEnlargement, and the two in-place rewrites are skipped once
// the file is already at target size (no generational recompression).
//
// Size caps are derived from render slots, not guessed:
//   - Project thumbnails render largest in ProjectHero (max-w-[1500px] cover
//     band) → 1600px wide webp. The 2624px PNG masters stay untouched as the
//     <picture> fallback and archive.
//   - me.jpg renders at ~380-440 CSS px (Home hero / About / CV) → 880px (2x).
//   - bg-paper tiles at background-size: 300px → 600px covers 2x displays;
//     webp because the flagged 400KB PNG cost more than every script on the
//     page. Tailwind's backgroundImage.paper points at the .webp.
import { readFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

async function report(label, beforeBytes, dest) {
  const after = (await stat(dest)).size;
  console.log(
    `${label}  ${(beforeBytes / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB` +
      (beforeBytes ? ` (-${(100 - (after / beforeBytes) * 100).toFixed(1)}%)` : "")
  );
}

// 1. Project thumbnails: PNG master → 1600px-wide webp sibling.
const THUMBNAILS = [
  "src/projects/gaze-assisted-input/Project-1.png",
  "src/projects/deskbird-hybrid-work/Project-2.png",
  "src/projects/embraceme-soft-robotics/Project-3.png",
  "src/projects/digitalising-ibs-travel-reimbursements/Project-4.png",
  // 3808x1632: the 2624px illustration extended to exactly 21:9 with a
  // TRANSPARENT background, so the md+ cover band shows the full art
  // instead of cropping the figure's feet — and the alpha is the point:
  // the hero frame is bg-transparent over the dotted paper mat, so the
  // house dot pattern shows through behind the illustration.
  "src/projects/designing-this-site/Project-5.png",
  // JPG master (photograph of the v1 paper-prototype flow map) — the .jpg
  // stays as the <picture> fallback, same as the PNG masters above.
  "src/projects/smart-home-control/media/v1/flow-map.jpg",
];

for (const rel of THUMBNAILS) {
  const src = join(ROOT, rel);
  const dest = src.replace(/\.(png|jpg)$/, ".webp");
  const before = (await stat(src)).size;
  // .rotate() with no args applies the EXIF orientation, then discards the
  // tag. Defensive for phone-photo masters: sharp strips EXIF from the
  // webp without baking the rotation in, so an orientation-tagged source
  // would export sideways. No-op for untagged sources and the PNGs.
  await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
  await report(rel, before, dest);
}

// 2. Hero portrait: resize in place (og:image + aboutImage keep their URL).
{
  const src = join(ROOT, "public/assets/me.jpg");
  const buf = await readFile(src);
  const meta = await sharp(buf).metadata();
  if (meta.width > 880) {
    await sharp(buf)
      .resize({ width: 880 })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(src);
    await report("public/assets/me.jpg", buf.length, src);
  } else {
    console.log("public/assets/me.jpg already ≤880px — skipped");
  }
}

// 3. Paper texture: PNG master → 600px webp.
{
  const src = join(ROOT, "public/assets/bg-paper.png");
  const dest = join(ROOT, "public/assets/bg-paper.webp");
  const before = (await stat(src)).size;
  await sharp(src)
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(dest);
  await report("public/assets/bg-paper.png → .webp", before, dest);
}
