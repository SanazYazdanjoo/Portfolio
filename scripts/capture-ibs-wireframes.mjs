// Captures a screen from one of the IBS wireframe sets and writes it next to
// the case study's data module.
//
// Both sets are live Figma Make sites whose screens are code, not exported
// images — there is nothing to download. This script renders one screen
// deterministically instead: fixed viewport, 2× device pixel ratio, the set's
// own chrome hidden, cropped to the content box, so what lands in the repo is
// the wireframe itself rather than a picture of a website.
//
//   node scripts/capture-ibs-wireframes.mjs lowfi
//   node scripts/capture-ibs-wireframes.mjs hifi
//   node scripts/capture-ibs-wireframes.mjs lowfi "TN Formular" wireframe-tn-form
//
// Re-run it when a screen changes upstream; the output is stable enough that an
// unchanged screen produces an unchanged file.

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SETS = {
  // IBS-FKTN-LOW-FI — grey-box structure, one tab per screen along the top.
  lowfi: {
    site: 'https://buck-pep-93168732.figma.site/',
    screen: 'Anwes.·Monat',
    basename: 'wireframe-attendance-month',
    // The set's own tab bar is chrome around the wireframe, not part of it.
    hideTabBar: true,
  },
  // IBS-FKTN High-Fidelity Wireframes — the same screens with the design
  // system applied, navigated through the app's own sidebar.
  hifi: {
    site: 'https://venue-decal-53243258.figma.site/',
    screen: 'Monat · Ganzer Monat',
    basename: 'wireframe-hifi-attendance-month',
    // Nothing to hide: the set has no wrapper of its own, the app is the page.
    hideTabBar: false,
  },
};

const setName = process.argv[2] ?? 'lowfi';
const set = SETS[setName];
if (!set) {
  console.error(`capture-ibs-wireframes: unknown set "${setName}" — expected ${Object.keys(SETS).join(' or ')}`);
  process.exit(1);
}

const OUT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'projects',
  'digitalising-ibs-travel-reimbursements'
);

const screen = process.argv[3] ?? set.screen;
const basename = process.argv[4] ?? set.basename;
const outFile = path.join(OUT_DIR, `${basename}.png`);

const VIEWPORT = { width: 1440, height: 1200 };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
await page.goto(set.site, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

await page.getByRole('button', { name: screen, exact: true }).first().click();
await page.waitForTimeout(1500);

// Hide the set's own chrome and measure where the screen's content ends, so
// the crop carries no trailing empty canvas.
const contentBottom = await page.evaluate((hideTabBar) => {
  if (hideTabBar) {
    const bar = [...document.querySelectorAll('div')].find(
      (d) => d.textContent.trim().startsWith('WIREFRAMES') && d.clientHeight > 20 && d.clientHeight < 120
    );
    if (bar) bar.style.display = 'none';
  }
  let max = 0;
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    // Skip full-height wrappers — they would stretch the crop to the viewport.
    if (r.width > 0 && r.height > 0 && r.height < 900) max = Math.max(max, r.bottom);
  }
  return max;
}, set.hideTabBar);
await page.waitForTimeout(200);

const height = Math.min(VIEWPORT.height, Math.ceil(contentBottom) + 16);
await page.screenshot({
  path: outFile,
  clip: { x: 0, y: 0, width: VIEWPORT.width, height },
});
await browser.close();

console.log(
  `capture-ibs-wireframes: ${setName} "${screen}" → ${path.relative(process.cwd(), outFile)} (${VIEWPORT.width}×${height} @2×)`
);
