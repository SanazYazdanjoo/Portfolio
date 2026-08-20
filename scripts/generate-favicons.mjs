// Generates the favicon set from the existing flower mark.
//
// The mark is a 5-path line drawing on no background, currently painted a
// single hardcoded #96150F. That is why it vanishes on dark browser chrome:
// a dark red line on a near-black tab strip is a dark red line on a
// near-black tab strip.
//
// Output:
//   favicon.svg              — ink switches on prefers-color-scheme
//   favicon-96.png / .ico    — static fallback, glyph on a coral chip
//   apple-touch-icon-180.png — same chip, opaque (iOS composites its own bg)
//   icon-192.png / icon-512.png — manifest sizes
//
// prefers-color-scheme here is the BROWSER's setting, evaluated by the
// browser against the SVG document itself. It has nothing to do with the
// site's [data-theme] toggle and must not: a visitor reading the site in
// light theme inside a dark-chrome browser needs the light-chrome mark.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

// The untouched mark, git-tracked, never written to — the generator's output
// overwrites public/assets/favicon.svg, so reading the master from there would
// make a second run parse its own output and fail. Same master-plus-generator
// arrangement as scripts/generate-webp.mjs.
const SRC = 'scripts/favicon-master.svg';
// The public root, not public/assets. vercel.json serves /assets/* with
// 'immutable, max-age=31536000' — correct for content-hashed build output,
// fatal for a file whose whole purpose is to be corrected in place: a
// visitor who loaded the broken favicon once would keep it for a year.
// The root has no cache header, and browsers probing /favicon.ico find it
// there anyway.
const OUT = 'public';

// Light chrome keeps today's exact ink — the light-mode favicon is unchanged
// by this work, so there is nothing to re-approve there.
const INK_LIGHT = '#96150F';
// Dark chrome: brand blush. Bright enough for a thin line drawing at 16px
// (~8:1 on Chrome's #202124), and still recognisably the coral mark rather
// than a generic white blob.
const INK_DARK = '#E1A19A';
// The chip the static fallbacks sit on. A fallback cannot switch, so it
// carries its own ground and stops depending on the chrome behind it.
const CHIP = '#892107';   // coral-500
const CHIP_INK = '#FAF8F4'; // paper-50

const original = fs.readFileSync(SRC, 'utf8');
const pathCount = (original.match(/<path/g) || []).length;
if (pathCount !== 5) throw new Error(`expected 5 paths, found ${pathCount}`);

// ── 1. Theme-aware SVG ────────────────────────────────────────────────────
// Paths lose their hardcoded fill and take it from a class, so one rule
// switches all five. `fill` on the root stays "none" — that is the
// transparent background, not the glyph colour.
const themed = original
  .replace(/ fill="#96150F"/g, ' class="glyph"')
  .replace(
    /(<svg[^>]*>)/,
    `$1
<style>
  .glyph { fill: ${INK_LIGHT}; }
  @media (prefers-color-scheme: dark) {
    .glyph { fill: ${INK_DARK}; }
  }
</style>`
  );

// The ink still appears once, in the <style> rule — what must be gone is
// any per-path fill attribute overriding it.
if (/ fill="#96150F"/.test(themed)) throw new Error('a hardcoded path fill survived');
if ((themed.match(/class="glyph"/g) || []).length !== 5) throw new Error('not all paths reclassed');

fs.writeFileSync(`${OUT}/favicon.svg`, themed);

// ── 2. Flat SVGs for rasterising ──────────────────────────────────────────
// sharp's renderer does not evaluate prefers-color-scheme, so each raster
// variant is built from an explicitly-coloured copy.
const flat = (ink) => original.replace(/ fill="#96150F"/g, ` fill="${ink}"`);

// The chip: a rounded square in brand coral with the glyph knocked out in
// paper. Inset so the drawing does not touch the corner radius.
const chipSvg = (size) => {
  const r = Math.round(size * 0.22);
  const inset = Math.round(size * 0.10);
  const inner = size - inset * 2;
  const glyph = flat(CHIP_INK)
    .replace(/width="1024"/, `width="${inner}"`)
    .replace(/height="1024"/, `height="${inner}"`)
    .replace(/<svg /, `<svg x="${inset}" y="${inset}" `);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
<rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${CHIP}"/>
${glyph}
</svg>`;
};

const render = (svg, size, file) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toFile(file);

await render(chipSvg(96), 96, `${OUT}/favicon-96.png`);
await render(chipSvg(180), 180, `${OUT}/apple-touch-icon-180.png`);
await render(chipSvg(192), 192, `${OUT}/icon-192.png`);
await render(chipSvg(512), 512, `${OUT}/icon-512.png`);

// ── 3. ICO ────────────────────────────────────────────────────────────────
// A PNG-payload ICO — valid since Vista, and every browser that still needs
// an .ico at all reads it. Written by hand rather than pulling a dependency
// in for a 22-byte header.
const icoSizes = [16, 32, 48];
const pngs = [];
for (const s of icoSizes) {
  pngs.push(await sharp(Buffer.from(chipSvg(s))).resize(s, s).png().toBuffer());
}
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);              // reserved
header.writeUInt16LE(1, 2);              // type 1 = icon
header.writeUInt16LE(pngs.length, 4);    // image count

const dir = Buffer.alloc(16 * pngs.length);
let offset = 6 + dir.length;
pngs.forEach((png, i) => {
  const b = i * 16;
  dir.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], b + 0); // width
  dir.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], b + 1); // height
  dir.writeUInt8(0, b + 2);              // palette
  dir.writeUInt8(0, b + 3);              // reserved
  dir.writeUInt16LE(1, b + 4);           // colour planes
  dir.writeUInt16LE(32, b + 6);          // bits per pixel
  dir.writeUInt32LE(png.length, b + 8);  // payload size
  dir.writeUInt32LE(offset, b + 12);     // payload offset
  offset += png.length;
});
fs.writeFileSync(`${OUT}/favicon.ico`, Buffer.concat([header, dir, ...pngs]));

// ── 4. Side-by-side proof sheet ───────────────────────────────────────────
// Every variant on both chromes, at the size a tab actually shows it, so the
// question "does this survive dark mode" is answered by looking rather than
// by trusting the hex values.
const CHROME_LIGHT = '#f1f3f4'; // Chrome light tab strip
const CHROME_DARK = '#202124';  // Chrome dark tab strip

async function tile(svg, bg, size) {
  const pad = Math.round(size * 0.5);
  const box = size + pad * 2;
  const icon = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  return sharp({
    create: { width: box, height: box, channels: 4, background: bg },
  })
    .composite([{ input: icon, top: pad, left: pad }])
    .png()
    .toBuffer();
}

const SHOW = 32;
const row = async (bg) => [
  await tile(original, bg, SHOW),        // today
  await tile(flat(INK_LIGHT), bg, SHOW), // svg, light rule
  await tile(flat(INK_DARK), bg, SHOW),  // svg, dark rule
  await tile(chipSvg(256), bg, SHOW),    // static fallback
];

const lightRow = await row(CHROME_LIGHT);
const darkRow = await row(CHROME_DARK);
const cell = SHOW * 2;
const sheet = sharp({
  create: { width: cell * 4, height: cell * 2, channels: 4, background: '#ffffff' },
}).composite([
  ...lightRow.map((input, i) => ({ input, top: 0, left: i * cell })),
  ...darkRow.map((input, i) => ({ input, top: cell, left: i * cell })),
]);
// Written to the temp dir, not the repo: it is something to look at once
// after changing the mark, not an artefact the project carries.
const proofPath = path.join(os.tmpdir(), 'favicon-proof.png');
await sheet.png().toFile(proofPath);

console.log('generated:');
for (const f of ['favicon.svg', 'favicon-96.png', 'favicon.ico',
                 'apple-touch-icon-180.png', 'icon-192.png', 'icon-512.png']) {
  console.log(`  ${OUT}/${f}  ${fs.statSync(`${OUT}/${f}`).size} bytes`);
}
console.log('proof sheet: ' + proofPath);
