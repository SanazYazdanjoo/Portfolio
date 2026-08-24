// One-off: crop/resize/optimize the EmbraceMe originals into media/.
// Originals stay untouched in the project root next to FIGURES.md.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "src/projects/embraceme-soft-robotics";
const OUT = join(SRC, "media");
mkdirSync(OUT, { recursive: true });

const jobs = [
  // [input, output, options]
  ["fig01_sketch-backpack-concept.jpg", "sketch-backpack-concept.jpg", {}],
  ["fig02_sketch-standalone-concept.jpg", "sketch-standalone-concept.jpg", {}],
  ["fig08_arm-final-structure.jpg", "arm-final-structure.jpg", {}],
  // FIGURES.md: foot in a sandal bottom-left (image is rotated) — crop the left strip.
  ["fig09_tpu-transparent.jpg", "tpu-transparent.jpg", { extract: { left: 155, top: 0, width: 1381, height: 2048 } }],
  ["fig10_tpu-inconsistent-inflation.png", "tpu-inconsistent-inflation.jpg", {}],
  ["fig11_tpu-yellow.jpg", "tpu-yellow.jpg", {}],
  ["fig12_air-channel-pipes.jpg", "air-channel-pipes.jpg", {}],
  ["fig13_arduino-setup.jpg", "arduino-setup.jpg", {}],
  ["fig14_touch-sensor-chest.png", "touch-sensor-chest.jpg", {}],
  ["fig15_inner-structure.jpg", "inner-structure.jpg", {}],
  // FIGURES.md: tight crop to the artefact and the stand — cuts the power
  // strip, cable reel, and the glacier poster on the left.
  ["fig16_final-build-pink.jpg", "final-build.jpg", { extract: { left: 316, top: 0, width: 1219, height: 1459 } }],
];

for (const [input, output, opts] of jobs) {
  let img = sharp(join(SRC, input)).rotate(); // respect EXIF orientation
  if (opts.extract) img = img.extract(opts.extract);
  await img
    .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(OUT, output));
  const meta = await sharp(join(OUT, output)).metadata();
  console.log(`${output}: ${meta.width}x${meta.height}`);
}

// Hero/thumbnail webp companion + the 4:3 card crop (torso, heart, both arms).
await sharp(join(OUT, "final-build.jpg")).webp({ quality: 82 }).toFile(join(OUT, "final-build.webp"));
await sharp(join(SRC, "fig16_final-build-pink.jpg"))
  .rotate()
  .extract({ left: 316, top: 571, width: 1213, height: 908 })
  .resize(1200, 900)
  .webp({ quality: 82 })
  .toFile(join(OUT, "card-final-build.webp"));
console.log("companions written");
