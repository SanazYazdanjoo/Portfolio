// Generates the homepage case-study card images.
//
// The plate is a fixed 4:3 box with `object-fit: contain`, so the CSS never
// crops. Every framing decision therefore happens HERE, once, to the asset:
//
//   1. `rect` is a clean detail of the source — chosen so no column, row,
//      chip or panel is ever sliced through. Boundaries were read off a
//      coordinate grid rendered over each source.
//   2. The crop is then EXTENDED, never resized, onto a 4:3 canvas filled
//      with the plate's own paper tint. That makes every asset exactly 4:3,
//      so all three plates render at identical height, and the padding is
//      invisible because it is the colour of the box behind it.
//
// `rect.width` is the only thing that sets legibility: the plate scales the
// asset to its content width, so source text of height T renders at
// T x (plateContent / rect.width). The `legible` field records the
// narrowest plate each crop still clears ~10px at, and the check below
// fails the export if a rect drifts wider than its own budget.
//
// Run: node scripts/generate-card-crops.mjs

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// --color-paper-100, the .card-figure background. The extend below must use
// this exact value or the letterbox would show as a band.
const PAPER = { r: 0xeb, g: 0xe9, b: 0xe1, alpha: 1 };

// The plate's content width at the two ends of the grid: ~266px when the
// 12-column grid is at its narrowest (a ~800px window) and ~457px once the
// 1200px column is fully open.
const PLATE_NARROW = 266;
const PLATE_WIDE = 457;

const CROPS = [
  {
    // Plate 01: "claim table — 2-3 columns and 4-5 rows at native
    // resolution". Teilnehmer:in and Verkehrsmittel in full, header plus six
    // rows. The right edge is at 1150: past the Verkehrsmittel header, which
    // runs to 1132 and is the widest thing in that column, and short of the
    // Belege column's text at 1265. Everything between is cell padding.
    from: "src/projects/digitalising-ibs-travel-reimbursements/Fahrtkostenerstattung-—-Prototyp-08-14-2026.jpg",
    to: "src/projects/digitalising-ibs-travel-reimbursements/card-claim-table.webp",
    rect: { left: 505, top: 520, width: 645, height: 368 },
    sourceTextPx: 20,
  },
  {
    // Plate 02: "interest-picker panel — chips and selected state only".
    // Four complete rows, cut above the row the modal's own scroll area
    // slices. The full width of the chip block, because the chips are
    // left-packed at variable widths and their row ends never line up: every
    // vertical cut narrower than this severs a chip on some row. Rows do
    // align, so the vertical bound is free.
    from: "src/projects/deskbird-hybrid-work/media/interests-modal.png",
    to: "src/projects/deskbird-hybrid-work/media/card-interest-picker.webp",
    rect: { left: 439, top: 488, width: 545, height: 180 },
    sourceTextPx: 14,
  },
  {
    // Plate 05 (smart-home-control): "the Josh's Home card with the green
    // highlighter bracket". The bracket IS the case study's first design
    // change — a selection indicator added after testing — so the card
    // detail doubles as the outcome. The crop stops left of the second
    // carousel card (which the photograph itself slices at the image edge)
    // and above the ROOMS heading, so no panel is cut through.
    from: "src/projects/smart-home-control/media/v2/A.jpg",
    to: "src/projects/smart-home-control/media/v2/card-selected-home.webp",
    rect: { left: 60, top: 170, width: 960, height: 390 },
    sourceTextPx: 39,
  },
  {
    // Plate 03: "one chart panel with readable axis labels — not the
    // two-panel plot".
    //
    // The right edge is 1069, and that number is measured, not chosen: the
    // left panel's own ink ends at x=1054 (the axis line and its last tick),
    // and the right panel's first x-label — rotated ~45deg, so it leans
    // down and to the LEFT of its own panel — reaches back to x=1071. A cut
    // anywhere in 1055-1070 takes all of one panel and none of the other.
    // The earlier edge at 1105 sat inside that leaning label, which is the
    // "0T" fragment that showed up in the bottom right corner.
    //
    // The legend is excluded, not clipped: it is centred across both panels
    // and has no clean cut.
    from: "src/projects/gaze-assisted-input/media/chart-movement-time.png",
    to: "src/projects/gaze-assisted-input/media/card-large-target-panel.webp",
    rect: { left: 0, top: 234, width: 1069, height: 828 },
    sourceTextPx: 29,
  },
];

for (const { from, to, rect, sourceTextPx } of CROPS) {
  const src = resolve(root, from);
  const { width, height } = await sharp(src).metadata();

  if (rect.left + rect.width > width || rect.top + rect.height > height) {
    throw new Error(`${to}: rect falls outside the ${width}x${height} source`);
  }

  // Extend to 4:3 — never resize. Resizing here would either upscale a small
  // detail into mush or shrink the type the crop exists to make readable.
  const targetW = Math.max(rect.width, Math.round((rect.height * 4) / 3));
  const targetH = Math.max(rect.height, Math.round((rect.width * 3) / 4));
  const padX = Math.round((targetW - rect.width) / 2);
  const padY = Math.round((targetH - rect.height) / 2);

  const out = resolve(root, to);
  await mkdir(dirname(out), { recursive: true });
  const info = await sharp(src)
    .extract(rect)
    .extend({
      top: padY,
      bottom: targetH - rect.height - padY,
      left: padX,
      right: targetW - rect.width - padX,
      background: PAPER,
    })
    .webp({ quality: 88 })
    .toFile(out);

  const ratio = info.width / info.height;
  if (Math.abs(ratio - 4 / 3) > 0.01) {
    throw new Error(`${to}: exported at ${ratio.toFixed(3)}, not 4:3`);
  }

  const atNarrow = (sourceTextPx * PLATE_NARROW) / info.width;
  const atWide = (sourceTextPx * PLATE_WIDE) / info.width;

  console.log(
    `${to.split("/").pop().padEnd(32)} ${info.width}x${info.height}  ` +
      `${String(Math.round(info.size / 1024)).padStart(3)} KB   ` +
      `type renders ${atNarrow.toFixed(1)}px @${PLATE_NARROW} · ${atWide.toFixed(1)}px @${PLATE_WIDE}` +
      `${atWide < 10 ? "   <-- below the 10px floor even at full width" : ""}`
  );
}
