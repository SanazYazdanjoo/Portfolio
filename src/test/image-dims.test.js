// Two halves of the reserved-figure-box contract (scripts/vite-plugin-
// figure-dims.mjs and utils/imageDims.js):
//
//   1. the header parser reads the right size out of every format the
//      figures use, checked against values sharp reported for the same
//      files (the parser deliberately has no decoder to fall back on);
//   2. the plugin actually runs in this pipeline: every figure `src` in
//      every case study's data resolves to a size, so no figure on any
//      project page renders without a reserved box. A new image format or
//      a figure imported some new way shows up here, not as a page that
//      grows under a phone reader again.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { imageDimsFromBuffer } from "../../scripts/lib/image-dims.mjs";
import { imageDims } from "../utils/imageDims";
import { fullProjects } from "./fullProjects";

// Relative to the working directory, which is the repo root under vitest.
// Not `new URL(…, import.meta.url)`: Vite rewrites that form for asset URLs
// and a template-literal path resolves to "undefined".
const read = (p) => readFileSync(p);

describe("image-dims header parser", () => {
  it.each([
    ["src/projects/gaze-assisted-input/media/sus.png", "png", 850, 484],
    ["src/projects/embraceme-soft-robotics/media/final-build.jpg", "jpg", 1219, 1459],
    ["src/projects/smart-home-control/media/v1/K.jpg", "jpg", 721, 1600],
    ["src/projects/embraceme-soft-robotics/media/final-build.webp", "webp", 1219, 1459],
    ["src/projects/designing-this-site/Project-5.webp", "webp", 1600, 686],
    ["src/projects/designing-this-site/assets/wireframe-case-study-mobile.svg", "svg", 1600, 1000],
    ["src/projects/digitalising-ibs-travel-reimbursements/process-sketch-wireframe-shipped.svg", "svg", 1600, 478],
  ])("%s", (path, ext, width, height) => {
    expect(imageDimsFromBuffer(read(path), ext)).toEqual({ width, height });
  });

  it("returns null rather than a guess for what it cannot read", () => {
    // A text file wearing each image extension, and a real image under an
    // extension the parser does not cover.
    const text = read("README.md");
    expect(imageDimsFromBuffer(text, "png")).toBeNull();
    expect(imageDimsFromBuffer(text, "jpg")).toBeNull();
    expect(imageDimsFromBuffer(text, "webp")).toBeNull();
    expect(imageDimsFromBuffer(text, "svg")).toBeNull();
    expect(imageDimsFromBuffer(read("src/projects/gaze-assisted-input/media/sus.png"), "mp4")).toBeNull();
  });
});

describe("every case-study figure has a registered size", () => {
  for (const project of fullProjects) {
    it(project.slug, () => {
      const missing = [];
      for (const [section, items] of Object.entries(project.figures ?? {})) {
        items.forEach((f, i) => {
          const src = f.type === "video" ? f.poster : f.src;
          if (typeof src !== "string") return; // pending / NEEDS_INPUT figures
          const dims = imageDims(src);
          if (!dims) missing.push(`${section}[${i}] ${src}`);
          else expect(dims.width * dims.height).toBeGreaterThan(0);
        });
      }
      expect(missing).toEqual([]);
    });
  }
});
