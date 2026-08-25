// Renders the Smart Home Control discovery chart from the questionnaire's
// raw response data. Run: node scripts/generate-smart-home-chart.mjs
//
// Provenance: the counts below are tallied from "Smart Home Application
// (Responses).xlsx" (24 responses; the sheet is raw research data and stays
// out of the repo — see the project's .gitignore), column "What do you
// generally find difficult while using these apps?". 16 of 24 respondents
// answered; the question was multi-select, so counts are mentions, not
// people. The study itself never charted these responses — this figure was
// made for the case study FROM the primary data, which is what its caption
// says. Do not alter a count without re-tallying the sheet.
//
// Design: single-series horizontal bars in one hue (--color-coral-500),
// which passes the 3:1 contrast check against white. The two rows that
// became prototype decisions are emphasised by an annotation in ink — not
// by a second fill: coral-600 vs ink-900 fails a normal-vision ΔE floor
// (13.3 < 15), so color may not carry that distinction.

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "src/projects/smart-home-control/media/charts/discovery-difficulties.png");

// Tallied from the response sheet, descending; "Nothing difficult" set
// apart at the bottom — it answers the question by declining it.
const ROWS = [
  { label: "CONNECTION PROBLEMS", n: 7 },
  { label: "SYNCING DEVICES", n: 5, used: true },
  { label: "ADJUSTING SETTINGS REMOTELY", n: 4, used: true },
  { label: "OVERALL USABILITY &amp; UX", n: 4 },
  { label: "FINDING SETTINGS &amp; CONTROLS", n: 3 },
  { label: "UNDERSTANDING THE FEATURES", n: 2 },
  { label: "USING THEM WITH MULTIPLE PEOPLE", n: 1 },
  { label: "CROSS-PLATFORM COMPATIBILITY †", n: 1 },
  { label: "NOTHING DIFFICULT", n: 2, apart: true },
];

const CORAL = "#892107"; // --color-coral-500, the data hue
const INK = "#211d1c"; // --color-ink-900, labels
const INK_MUTED = "#57534a"; // --color-ink-700, secondary text
const SURFACE = "#ffffff";

const W = 820;
const MARGIN_L = 268;
const BAR_MAX = 470; // px at n = 7
const MAX_N = Math.max(...ROWS.map((r) => r.n));
const ROW_H = 44;
const BAR_H = 16;
const APART_GAP = 18;
const TOP = 26;

const rowY = (i) => TOP + i * ROW_H + (ROWS[i].apart ? APART_GAP : 0);
const H = rowY(ROWS.length - 1) + ROW_H + 40;

const bars = ROWS.map((r, i) => {
  const y = rowY(i);
  const w = (r.n / MAX_N) * BAR_MAX;
  const cy = y + ROW_H / 2;
  // Rounded data-end only: square at the baseline, 4px radius on the right.
  // "Nothing difficult" declines the question rather than answering it —
  // drawn hollow so the distinction is carried by shape, not by a second
  // fill color (a coral/ink pair fails the normal-vision ΔE floor).
  const fill = r.apart
    ? `fill="${SURFACE}" stroke="${CORAL}" stroke-width="1.5"`
    : `fill="${CORAL}"`;
  const bar = `<path d="M${MARGIN_L},${cy - BAR_H / 2}
    h${w - 4} a4,4 0 0 1 4,4 v${BAR_H - 8} a4,4 0 0 1 -4,4
    h${-(w - 4)} z" ${fill}/>`;
  const label = `<text x="${MARGIN_L - 12}" y="${cy + 4}" text-anchor="end"
    font-family="Consolas, 'Courier New', monospace" font-size="11.5"
    letter-spacing="0.4" fill="${r.apart ? INK_MUTED : INK}">${r.label}</text>`;
  const value = `<text x="${MARGIN_L + w + 10}" y="${cy + 4}"
    font-family="Consolas, 'Courier New', monospace" font-size="12"
    font-weight="bold" fill="${INK}">${r.n}</text>`;
  const note = r.used
    ? `<text x="${MARGIN_L + w + 30}" y="${cy + 4}"
        font-family="Consolas, 'Courier New', monospace" font-size="10.5"
        fill="${INK_MUTED}">→ SHAPED THE PROTOTYPE</text>`
    : "";
  return bar + label + value + note;
}).join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${SURFACE}"/>
  <line x1="${MARGIN_L}" y1="${TOP - 8}" x2="${MARGIN_L}" y2="${rowY(ROWS.length - 1) + ROW_H - 4}"
    stroke="${INK}" stroke-width="1"/>
  ${bars}
  <text x="${MARGIN_L}" y="${H - 14}"
    font-family="Consolas, 'Courier New', monospace" font-size="10.5"
    fill="${INK_MUTED}">MULTI-SELECT · MENTIONS AMONG THE 16 OF 24 RESPONDENTS WHO ANSWERED · † FREE-TEXT WRITE-IN</text>
</svg>`;

await mkdir(dirname(OUT), { recursive: true });
const info = await sharp(Buffer.from(svg), { density: 192 }).png().toFile(OUT);
console.log(`discovery-difficulties.png ${info.width}x${info.height} ${Math.round(info.size / 1024)} KB`);
