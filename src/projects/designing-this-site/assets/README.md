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

Still absent, per the "no invented data" rule (`data.js` ships without a
`thumbnail` or `heroImage`, and nothing here is a stand-in image pretending
to be evidence):

- a hero screenshot of the homepage (`thumbnail` / `thumbnailWebp`)
- any real screenshots for `figures.prototype`
