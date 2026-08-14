# Certificate assets

Files referenced by `profile.certifications[].file` and `.thumb` in
`src/data/data.json` live here.

## Naming convention

Both files for one credential share a kebab-case slug derived from its title:

```
figma-101-workshop.webp   ← thumb (preview image, shown in the /credentials grid)
figma-101-workshop.pdf    ← file  (full scan, opened in the lightbox / downloaded)
```

- Slug: lowercase, words separated by hyphens, no year or provider unless it's
  needed to disambiguate two credentials with the same title.
- `.webp` thumbnails: max **1200px wide**, target **~150KB**. Generate them with
  the script below rather than by hand.
- `.pdf` / `.png` files: the full, unmodified credential document.

Both `file` and `thumb` are optional per entry — omit either (or leave the
field as an empty string) and the Credentials page falls back gracefully
(typographic tile instead of a thumbnail, no lightbox trigger without a
`file`).

## Generating thumbnails

```
node scripts/generate-cert-thumbs.mjs
```

Rasterises page 1 of every PDF here and re-encodes every image scan into a
`<slug>.webp` sibling. The results are committed, so this only needs re-running
when a document is added or replaced. PDF rendering needs poppler's `pdftoppm`
on PATH (TeX Live and MiKTeX both ship it; `brew install poppler` or
`apt install poppler-utils` otherwise) — without it the PDFs are skipped with a
warning and their cards fall back to the typographic tile.

The `-pmi` files are PMI-branded duplicates LinkedIn Learning issues alongside
the standard certificate for the same course. They're kept for the record but
aren't referenced from `data.json` and get no thumbnail (see `SKIP` in the
script).

## Filtering on /credentials

Each entry's `topic` field decides which filter chip it appears under. The chip
order and the set of valid topics live in `TOPIC_ORDER` in
`src/pages/Credentials.jsx`, with labels under `credentials.topic.*` in both
translation files.
