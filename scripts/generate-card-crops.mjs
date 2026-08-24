// Generates the homepage case-study card images.
//
// The card figure is a fixed 4:3 box with `object-fit: contain` — a UI
// screenshot is never cropped by the CSS box. So the crop has to happen HERE,
// to the asset, once: each output is the specific legible detail the design
// reference names on its plate, already at 4:3, so `contain` fills the box
// exactly and nothing is cut off at render time.
//
// Rects are in source pixels and were chosen by rendering each candidate and
// reading it at the card's real width (~481px in the 1200/32 grid). Ratios
// are asserted at 4:3 so a bad edit fails here rather than letterboxing on
// the page.
//
// Run: node scripts/generate-card-crops.mjs

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// 2x the ~481px rendered box, which is where the legibility was judged.
const OUT_W = 1200;
const OUT_H = 900;

const CROPS = [
  {
    // Plate 01: "claim table — one participant row with its status controls,
    // legible at 480px". The rect covers the header row plus thirteen
    // participant rows: ID, name, transport type, and the receipt checks and
    // "fehlt" flags that are the screen's actual controls.
    from: "src/projects/digitalising-ibs-travel-reimbursements/Fahrtkostenerstattung-—-Prototyp-08-14-2026.jpg",
    to: "src/projects/digitalising-ibs-travel-reimbursements/card-claim-table.webp",
    rect: { left: 513, top: 413, width: 1101, height: 825 },
  },
  {
    // Plate 02: "interest-picker panel — chips and selected state only, not
    // the full screen". Includes two selected chips (Movies, Yoga) so the
    // selected state is visible, and excludes the schedule behind the modal.
    from: "src/projects/deskbird-hybrid-work/media/interests-modal.png",
    to: "src/projects/deskbird-hybrid-work/media/card-interest-picker.webp",
    rect: { left: 430, top: 365, width: 561, height: 421 },
  },
  {
    // Plate 03: "one chart panel with readable axis labels — not the
    // two-panel plot". The large-target panel with its title, the 0–2500ms
    // y-axis, and the distance labels along x. (The plate offers a rig photo
    // as an alternative; the repo has no photograph of the setup.)
    from: "src/projects/gaze-assisted-input/media/chart-movement-time.png",
    to: "src/projects/gaze-assisted-input/media/card-large-target-panel.webp",
    rect: { left: 68, top: 203, width: 1200, height: 901 },
  },
];

const RATIO = 4 / 3;

for (const { from, to, rect } of CROPS) {
  const ratio = rect.width / rect.height;
  if (Math.abs(ratio - RATIO) > 0.01) {
    throw new Error(`${to}: rect is ${ratio.toFixed(3)}, not 4:3 — contain would letterbox`);
  }

  const src = resolve(root, from);
  const { width, height } = await sharp(src).metadata();
  if (rect.left + rect.width > width || rect.top + rect.height > height) {
    throw new Error(`${to}: rect falls outside the ${width}x${height} source`);
  }

  const out = resolve(root, to);
  await mkdir(dirname(out), { recursive: true });
  const info = await sharp(src)
    .extract(rect)
    .resize(OUT_W, OUT_H, { fit: "fill" })
    .webp({ quality: 82 })
    .toFile(out);

  console.log(
    `${to.padEnd(70)} ${OUT_W}x${OUT_H}  ${(info.size / 1024).toFixed(0)} KB` +
      `  (from ${(rect.width / OUT_W * 100).toFixed(0)}% scale of a ${width}x${height} source)`
  );
}
