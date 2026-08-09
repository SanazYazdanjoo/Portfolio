// One-off analysis tool: extracts head/hhea/OS2 metrics from a WOFF2 file
// using only Node's built-in zlib (Brotli), so no new dependency is needed.
// WOFF2 stores its table directory with a compact encoding (known-tag
// indices, UIntBase128 varints) — this implements just enough of the spec
// (https://www.w3.org/TR/WOFF2/) to walk the directory and pull out the
// three small fixed-layout tables we need. Run: node scripts/extract-font-metrics.mjs <file.woff2>
import { readFileSync } from "node:fs";
import { brotliDecompressSync } from "node:zlib";

// WOFF2 spec Table 3 — known table tags, indexed 0-62. Index 63 means "tag
// follows explicitly as 4 bytes" (used for uncommon tables not in this list).
const KNOWN_TAGS = [
  "cmap","head","hhea","hmtx","maxp","name","OS/2","post","cvt ","fpgm",
  "glyf","loca","prep","CFF ","VORG","EBDT","EBLC","gasp","hdmx","kern",
  "LTSH","PCLT","VDMX","vhea","vmtx","BASE","GDEF","GPOS","GSUB","EBSC",
  "JSTF","MATH","CBDT","CBLC","COLR","CPAL","SVG ","sbix","acnt","avar",
  "bdat","bloc","bsln","cvar","fdsc","feat","fmtx","fvar","gvar","hsty",
  "just","lcar","mort","morx","opbd","prop","trak","Zapf","Silf","Glat",
  "Gloc","Feat","Sill",
];

function readUIntBase128(buf, pos) {
  let value = 0;
  let bytesRead = 0;
  for (;;) {
    const b = buf[pos];
    if (bytesRead === 0 && b === 0x80) throw new Error("UIntBase128: leading zero byte");
    if (value & 0xfe000000) throw new Error("UIntBase128: overflow");
    value = (value << 7) | (b & 0x7f);
    pos += 1;
    bytesRead += 1;
    if ((b & 0x80) === 0) break;
    if (bytesRead > 5) throw new Error("UIntBase128: too long");
  }
  return [value >>> 0, pos];
}

function parseSfnt(buf) {
  // Plain TTF/OTF (and TTC, using the first font in the collection): a
  // 12-byte offset table followed by numTables x 16-byte table records —
  // no compression, no compact tag encoding. Used for system fallback
  // fonts (Arial, Segoe UI), which ship as plain sfnt, not WOFF2.
  let base = 0;
  if (buf.toString("ascii", 0, 4) === "ttcf") {
    base = buf.readUInt32BE(12); // offset to the first font's offset table
  }
  const numTables = buf.readUInt16BE(base + 4);
  const tables = {};
  const entries = [];
  for (let i = 0; i < numTables; i++) {
    const rec = base + 12 + i * 16;
    const tag = buf.toString("ascii", rec, rec + 4);
    const offset = buf.readUInt32BE(rec + 8);
    const length = buf.readUInt32BE(rec + 12);
    entries.push(tag);
    tables[tag] = { offset, length, data: buf.subarray(offset, offset + length) };
  }
  return { numTables, entries, tables };
}

function parseWoff2(buf) {
  if (buf.readUInt32BE(0) !== 0x774f4632) throw new Error("Not a WOFF2 file (bad signature)");
  const numTables = buf.readUInt16BE(12);
  const totalCompressedSize = buf.readUInt32BE(20);

  let pos = 48; // end of fixed WOFF2 header
  const entries = [];
  for (let i = 0; i < numTables; i++) {
    const flags = buf[pos]; pos += 1;
    const tagIndex = flags & 0x3f;
    const transformVersion = (flags >> 6) & 0x3;
    let tag;
    if (tagIndex === 0x3f) {
      tag = buf.toString("ascii", pos, pos + 4);
      pos += 4;
    } else {
      tag = KNOWN_TAGS[tagIndex];
    }
    let origLength;
    [origLength, pos] = readUIntBase128(buf, pos);

    let transformLength = null;
    const hasTransform = (tag === "glyf" || tag === "loca") ? transformVersion === 0 : transformVersion !== 0;
    if (hasTransform) {
      [transformLength, pos] = readUIntBase128(buf, pos);
    }
    entries.push({ tag, origLength, transformLength });
  }

  // Compressed data block starts right after the table directory, per spec.
  const compressedStart = pos;
  const compressed = buf.subarray(compressedStart, compressedStart + totalCompressedSize);
  const decompressed = brotliDecompressSync(compressed);

  // Tables are concatenated in decompressed stream in directory order, each
  // occupying (transformLength ?? origLength) bytes, back-to-back, no padding.
  let offset = 0;
  const tables = {};
  for (const e of entries) {
    const len = e.transformLength ?? e.origLength;
    tables[e.tag] = { offset, length: len, data: decompressed.subarray(offset, offset + len) };
    offset += len;
  }
  return { numTables, entries: entries.map((e) => e.tag), tables, decompressedTotal: decompressed.length };
}

function parseHead(buf) {
  return { unitsPerEm: buf.readUInt16BE(18) };
}

function parseHhea(buf) {
  return {
    ascender: buf.readInt16BE(4),
    descender: buf.readInt16BE(6),
    lineGap: buf.readInt16BE(8),
    numberOfHMetrics: buf.readUInt16BE(34),
  };
}

function parseOS2(buf) {
  const version = buf.readUInt16BE(0);
  const out = {
    version,
    xAvgCharWidth: buf.readInt16BE(2),
    usWeightClass: buf.readUInt16BE(4),
    sTypoAscender: buf.readInt16BE(68),
    sTypoDescender: buf.readInt16BE(70),
    sTypoLineGap: buf.readInt16BE(72),
    usWinAscent: buf.readUInt16BE(74),
    usWinDescent: buf.readUInt16BE(76),
  };
  if (version >= 2) {
    out.sxHeight = buf.readInt16BE(86);
    out.sCapHeight = buf.readInt16BE(88);
  }
  return out;
}

function parseHmtx(buf, numberOfHMetrics, unitsPerEm) {
  // Each longHorMetric is 4 bytes: uint16 advanceWidth, int16 lsb.
  let sum = 0;
  for (let i = 0; i < numberOfHMetrics; i++) {
    sum += buf.readUInt16BE(i * 4);
  }
  return { avgAdvanceWidth: sum / numberOfHMetrics };
}

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/extract-font-metrics.mjs <file.woff2>");
  process.exit(1);
}

const buf = readFileSync(file);
const sig = buf.readUInt32BE(0);
const isWoff2 = sig === 0x774f4632;
const { numTables, entries, tables } = isWoff2 ? parseWoff2(buf) : parseSfnt(buf);

console.log(`File: ${file}`);
console.log(`numTables: ${numTables}`);
console.log(`Tags found: ${entries.join(", ")}`);
console.log("");

if (!tables.head || !tables.hhea || !tables["OS/2"]) {
  console.error("Missing one of head/hhea/OS2 — cannot compute metrics.");
  process.exit(1);
}

const head = parseHead(tables.head.data);
const hhea = parseHhea(tables.hhea.data);
const os2 = parseOS2(tables["OS/2"].data);

console.log("head:", head);
console.log("hhea:", hhea);
console.log("OS/2:", os2);

if (tables.hmtx) {
  const hmtx = parseHmtx(tables.hmtx.data, hhea.numberOfHMetrics, head.unitsPerEm);
  console.log("hmtx:", hmtx);
}
