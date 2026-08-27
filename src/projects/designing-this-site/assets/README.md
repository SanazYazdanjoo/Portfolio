# assets — designing-this-site

Current contents:

- `wireframe-case-study-xl.svg` — schematic of the shipped case-study
  template at ≥1280px (three tracks: TOC rail, prose column, pull-quote
  rail), wired into `figures.wireframe`.
- `wireframe-case-study-mobile.svg` — the same template below 768px (one
  column, pill bar, no rails), wired into `figures.wireframe`.

Both are post-hoc schematics drawn from `src/projects/ProjectTemplate.jsx`,
and the case-study prose says so — they document the shipped layout, they do
not pretend to be sketches that preceded it. If the template's layout
changes, redraw them; a wireframe that no longer matches the code is the
documentation-drift failure mode this project keeps writing tests against.

The hero banner lives one level up, following the site-wide master pattern:
`../Project-5.png` (+ `.webp` via `scripts/generate-webp.mjs`) — a generated
illustration added 2026-08-27, extended to 21:9 on a TRANSPARENT background
so the md+ cover band shows the full art and the hero's dotted paper mat
shows through behind it (owner ruling: keep the dots). It is wired as
`thumbnail` in `card.js`, with `heroIsGenerated: true` in `data.js`
rendering the visible generation credit (an AI image must never pass as
documentation).

Still absent, per the "no invented data" rule (nothing here is a stand-in
image pretending to be evidence):

- any real screenshots for `figures.prototype`
