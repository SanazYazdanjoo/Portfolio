// Social-preview card (og:image / twitter:image), 1200×630.
//
// Why this exists: the old og:image was the raw square portrait
// (assets/me.jpg, 880×880). Every unfurler that matters — LinkedIn, Slack,
// X's summary_large_image — crops to ~1.91:1, and a centre crop of a
// portrait that fills its frame takes the forehead and chin with it. This
// composes the portrait uncropped onto a 1200×630 card in the site's own
// palette (paper / ink / coral, see src/styles/theme.css) with the name and
// role set beside it, so the unfurl carries the same information as the
// hero.
//
// Served from the site root (like the favicons), NOT /assets/: vercel.json
// marks /assets/* immutable for a year, which is wrong for a file that gets
// corrected in place. Unfurlers cache by URL on their own schedule anyway.
//
// Type is set in the system UI face, not Bricolage: librsvg reads installed
// system fonts, not the woff2 files this repo ships, and a silently wrong
// fallback rendered on CI would be worse than a deliberate neutral face.
//
// Regenerate with: node scripts/generate-og-image.mjs

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const W = 1200;
const H = 630;

const PAPER = "#ebe9e1"; // --color-paper-100
const PAPER_200 = "#e0ddd2";
const INK = "#211d1c"; // --color-ink-900
const INK_600 = "#6b6560";
const CORAL_600 = "#5e1605"; // AA-safe coral for small-ish text on paper

// Portrait: full height, right-aligned, uncropped (it's square, so at
// H=630 it occupies the right 630px of the 1200px canvas).
const PORTRAIT = H;
const PORTRAIT_X = W - PORTRAIT;

const FONT = `'Segoe UI', 'DejaVu Sans', Arial, sans-serif`;

const textLayer = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .name { font: 700 56px ${FONT}; fill: ${INK}; }
    .role { font: 600 40px ${FONT}; fill: ${CORAL_600}; }
    .meta { font: 400 27px ${FONT}; fill: ${INK_600}; }
    .site { font: 400 24px ${FONT}; fill: ${INK_600}; }
  </style>
  <text x="72" y="248" class="name">Sanaz Yazdanjoo</text>
  <rect x="76" y="284" width="120" height="6" fill="${CORAL_600}"/>
  <text x="72" y="356" class="role">UX Engineer</text>
  <text x="72" y="416" class="meta">M.Sc. Human-Computer Interaction</text>
  <text x="72" y="456" class="meta">UX Research · React · Design Systems</text>
  <text x="72" y="566" class="site">yazdanjoo.de</text>
</svg>`;

async function main() {
  const portrait = await sharp(join(ROOT, "public/assets/me.jpg"))
    .resize(PORTRAIT, PORTRAIT)
    .toBuffer();

  // 1px hairline at the seam so the portrait's near-white studio ground
  // reads as deliberate against the warmer paper, not as a rendering gap.
  const seam = Buffer.from(
    `<svg width="2" height="${H}"><rect width="2" height="${H}" fill="${PAPER_200}"/></svg>`
  );

  await sharp({
    create: { width: W, height: H, channels: 3, background: PAPER },
  })
    .composite([
      { input: portrait, left: PORTRAIT_X, top: 0 },
      { input: seam, left: PORTRAIT_X - 2, top: 0 },
      { input: Buffer.from(textLayer), left: 0, top: 0 },
    ])
    .png()
    .toFile(join(ROOT, "public/og-card.png"));

  console.log("generate-og-image: wrote public/og-card.png (1200×630)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
