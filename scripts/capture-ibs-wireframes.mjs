// Captures a screen from the IBS low-fidelity wireframe set and writes it next
// to the case study's data module.
//
// The set is a live Figma Make site (IBS-FKTN-LOW-FI) whose screens are code,
// not exported images — there is no file to download. This script renders one
// tab deterministically instead: fixed viewport, 2× device pixel ratio, the
// wireframe tab bar hidden, cropped to the content box, so what lands in the
// repo is the wireframe itself rather than a picture of a website.
//
//   node scripts/capture-ibs-wireframes.mjs                 # attendance month
//   node scripts/capture-ibs-wireframes.mjs "TN Formular" wireframe-tn-form
//
// Re-run it when a screen changes upstream; the output is stable enough that an
// unchanged screen produces an unchanged file.

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SITE = 'https://buck-pep-93168732.figma.site/';
const OUT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'projects',
  'digitalising-ibs-travel-reimbursements'
);

const screen = process.argv[2] ?? 'Anwes.·Monat';
const basename = process.argv[3] ?? 'wireframe-attendance-month';
const outFile = path.join(OUT_DIR, `${basename}.png`);

const VIEWPORT = { width: 1440, height: 1000 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
await page.goto(SITE, { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

await page.getByRole('button', { name: screen }).click();
await page.waitForTimeout(1500);

// Hide the set's own tab bar and measure where the screen's content ends, so
// the crop has no trailing empty canvas.
const contentBottom = await page.evaluate(() => {
  const bar = [...document.querySelectorAll('div')].find(
    (d) => d.textContent.trim().startsWith('WIREFRAMES') && d.clientHeight > 20 && d.clientHeight < 120
  );
  if (bar) bar.style.display = 'none';
  let max = 0;
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    // Skip full-height wrappers — they would stretch the crop to the viewport.
    if (r.width > 0 && r.height > 0 && r.height < 900) max = Math.max(max, r.bottom);
  }
  return max;
});
await page.waitForTimeout(200);

const height = Math.min(VIEWPORT.height, Math.ceil(contentBottom) + 16);
await page.screenshot({
  path: outFile,
  clip: { x: 0, y: 0, width: VIEWPORT.width, height },
});
await browser.close();

console.log(`capture-ibs-wireframes: "${screen}" → ${path.relative(process.cwd(), outFile)} (${VIEWPORT.width}×${height} @2×)`);
