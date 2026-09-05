// Pixel sizes of the case-study figures, keyed by served URL. Populated at
// module-evaluation time by the code scripts/vite-plugin-figure-dims.mjs
// injects into every image module under src/projects/ — so by the time a
// data file has finished importing its figures, every one of them is in
// here, and SectionMedia can hand the browser a `width`/`height` pair to
// reserve the box before the lazy image arrives.
//
// A miss returns undefined and the figure renders as it always did (no
// reserved box). That is the fallback for a format the plugin does not
// parse and for any image the plugin did not see — never an error, never a
// guessed size.

const dims = new Map();

export function registerImageDims(url, width, height) {
  if (typeof url !== "string" || !(width > 0) || !(height > 0)) return;
  dims.set(url, { width, height });
}

export function imageDims(url) {
  return typeof url === "string" ? dims.get(url) : undefined;
}
