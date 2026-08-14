// Builds the /credentials grid thumbnails from the credential documents in
// public/assets/certificates: page 1 of each PDF, plus each image scan, become
// a `<slug>.webp` sibling that data.json points at via `certifications[].thumb`.
//
// Not wired into `npm run build` — the .webp files are committed, so this only
// needs re-running (`node scripts/generate-cert-thumbs.mjs`) when a source
// document is added or replaced.
//
// PDF rasterising needs poppler's `pdftoppm` on PATH (TeX Live and MiKTeX both
// ship it; `brew install poppler` / `apt install poppler-utils` elsewhere).
// Without it the PDFs are skipped with a warning and their cards fall back to
// the typographic tile — the page still renders.

import { readdir, stat, mkdtemp, rm, readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const CERT_DIR = join(__dirname, "..", "public", "assets", "certificates");

const WIDTH = 1200; // matches the README's thumbnail budget
const QUALITY = 78;
const DENSITY = 150; // pdftoppm DPI — 150 keeps the certificate text crisp at 1200px

// The PMI-branded duplicates of two courses aren't shown in the grid (the
// standard variant of the same credential is), so they get no thumbnail.
const SKIP = new Set([
  "agile-user-experience-design-and-research-pmi.pdf",
  "design-thinking-understanding-the-process-pmi.pdf",
]);

async function hasPdftoppm() {
  try {
    await execFileAsync("pdftoppm", ["-v"]);
    return true;
  } catch (err) {
    // pdftoppm -v exits non-zero on some builds but still proves it's installed
    return err.code !== "ENOENT";
  }
}

async function writeThumb(buffer, slug) {
  const dest = join(CERT_DIR, `${slug}.webp`);
  await sharp(buffer)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(dest);
  return dest;
}

async function fromPdf(file, slug) {
  const work = await mkdtemp(join(tmpdir(), "cert-thumb-"));
  try {
    const prefix = join(work, "page");
    // -f/-l 1 → first page only; -singlefile drops the -1 page suffix
    await execFileAsync("pdftoppm", [
      "-png", "-r", String(DENSITY), "-f", "1", "-l", "1", "-singlefile",
      join(CERT_DIR, file),
      prefix,
    ]);
    return await writeThumb(await readFile(`${prefix}.png`), slug);
  } finally {
    await rm(work, { recursive: true, force: true });
  }
}

async function fromImage(file, slug) {
  return writeThumb(await readFile(join(CERT_DIR, file)), slug);
}

const files = (await readdir(CERT_DIR))
  .filter((f) => /\.(pdf|png|jpe?g)$/i.test(f))
  .filter((f) => !SKIP.has(f))
  .sort();

const pdftoppm = await hasPdftoppm();
if (!pdftoppm && files.some((f) => f.toLowerCase().endsWith(".pdf"))) {
  console.warn("! pdftoppm not found on PATH — skipping PDF thumbnails.\n");
}

for (const file of files) {
  const slug = basename(file, extname(file));
  const isPdf = extname(file).toLowerCase() === ".pdf";
  if (isPdf && !pdftoppm) continue;

  try {
    const dest = isPdf ? await fromPdf(file, slug) : await fromImage(file, slug);
    const before = (await stat(join(CERT_DIR, file))).size;
    const after = (await stat(dest)).size;
    console.log(
      `${file} → ${basename(dest)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
    );
  } catch (err) {
    console.error(`x ${file}: ${err.message}`);
  }
}
