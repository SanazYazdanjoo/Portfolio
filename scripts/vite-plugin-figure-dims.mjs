// Vite plugin: every image imported from src/projects/ registers its pixel
// size against the URL it ends up served from, so SectionMedia can give
// each figure `width`/`height` attributes and the browser reserves the
// figure's box BEFORE the lazy image loads.
//
// Why this exists: the case-study figures are `loading="lazy"` with no
// intrinsic size, so a page grew as the reader scrolled — measured at 766px
// over one phone read of the gaze study — and every lazily arriving figure
// shoved the content under it. On a phone that is a visible jump mid-scroll,
// and it put a tapped section index entry ~300px off its target by the time
// the images between had landed.
//
// Why a plugin and not width/height fields in the data files: 100-odd
// figures across six case studies, and a number typed beside an import is a
// number that rots the next time the image is re-exported. The size is read
// from the file at build time, keyed by the final URL — which is the one key
// that survives Vite's content hashing, dev and prod alike — and nothing in
// the data contract changes. Data files keep importing images; figures keep
// being `{ src, alt, ... }`.
//
// Mechanics: Vite's own asset plugin turns an image import into
// `export default "<url>"` (in a build the url is a `__VITE_ASSET__…__`
// placeholder Vite resolves per chunk, and the registration call carries it
// the same way). This plugin runs after it (`enforce: "post"`) and rewrites
// that one-line module to register the size first. Anything that does not
// look exactly like that one line is left untouched — an unrecognised shape
// gets the old behaviour, never a broken module.

import { readFileSync } from "node:fs";
import { imageDimsFromBuffer } from "./lib/image-dims.mjs";

const IMAGE_ID = /\.(png|jpe?g|webp|svg)(\?[^/]*)?$/i;
const ASSET_MODULE = /^\s*export\s+default\s+("[^"\n]*")\s*;?\s*$/;
const REGISTRY = "/src/utils/imageDims.js";

export function figureDims({ include = /[\\/]src[\\/]projects[\\/]/ } = {}) {
  return {
    name: "figure-dims",
    enforce: "post",
    transform(code, id) {
      if (!include.test(id)) return null;
      const match = id.match(IMAGE_ID);
      if (!match) return null;
      const asset = code.match(ASSET_MODULE);
      if (!asset) return null;

      let dims = null;
      try {
        dims = imageDimsFromBuffer(readFileSync(id.split("?")[0]), match[1]);
      } catch {
        dims = null;
      }
      if (!dims?.width || !dims?.height) return null;

      return {
        code:
          `import { registerImageDims } from ${JSON.stringify(REGISTRY)};\n` +
          `const __url = ${asset[1]};\n` +
          `registerImageDims(__url, ${dims.width}, ${dims.height});\n` +
          `export default __url;\n`,
        map: null,
      };
    },
  };
}
