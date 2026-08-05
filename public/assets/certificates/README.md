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
- `.webp` thumbnails: max **1200px wide**, target **~150KB**. Re-encode scans/
  photos of certificates through an image tool (e.g. `squoosh.app`) before
  adding them here — don't commit unoptimized exports.
- `.pdf` files: the full, unmodified credential document.

Both `file` and `thumb` are optional per entry — omit either (or leave the
field as an empty string) and the Credentials page falls back gracefully
(typographic tile instead of a thumbnail, no lightbox trigger without a
`file`).
