// Pixel dimensions of an image, read from its header — no decoder, no
// native module. Covers the four formats the case-study figures use (PNG,
// JPEG, WebP, SVG); anything else returns null and the caller carries on
// without a size, which is exactly what it did before this existed.
//
// Why not sharp: it is a devDependency already, but a native binary in the
// production build path is a Vercel install away from failing the deploy,
// and a header read is forty lines. EXIF orientation is deliberately NOT
// read: none of the repository's photographs carries a rotating
// orientation (checked over all 107 assets with sharp when this was
// written), and a wrongly swapped ratio would reserve the wrong box — the
// one failure this file exists to prevent. If a rotated photo ever lands,
// re-export it upright rather than teaching this parser EXIF.

export function imageDimsFromBuffer(buf, ext) {
  switch (String(ext).toLowerCase()) {
    case "png":
      return png(buf);
    case "jpg":
    case "jpeg":
      return jpeg(buf);
    case "webp":
      return webp(buf);
    case "svg":
      return svg(buf);
    default:
      return null;
  }
}

function png(buf) {
  if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

// Walk the marker segments to the first Start-Of-Frame, which carries the
// frame size. SOF markers are C0–CF minus C4 (DHT), C8 (JPG ext) and CC (DAC).
function jpeg(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xff) {
      i += 1; // fill byte
      continue;
    }
    const isSOF = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSOF) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd9 || marker === 0xda) return null; // EOI / SOS before any SOF
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

// RIFF container; the first chunk after "WEBP" says which bitstream.
function webp(buf) {
  if (buf.length < 30 || buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") {
    return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
  }
  return null;
}

// width/height attributes when they are plain numbers (or px), else the
// viewBox — which is what every wireframe in this repository declares.
function svg(buf) {
  const head = buf.toString("utf8", 0, Math.min(buf.length, 4096));
  const open = head.match(/<svg\b[^>]*>/i);
  if (!open) return null;
  const attr = (name) => {
    const m = open[0].match(new RegExp(`\\s${name}\\s*=\\s*["']\\s*([0-9.]+)(px)?\\s*["']`, "i"));
    return m ? parseFloat(m[1]) : null;
  };
  const w = attr("width");
  const h = attr("height");
  if (w && h) return { width: Math.round(w), height: Math.round(h) };
  const vb = open[0].match(/\sviewBox\s*=\s*["']\s*([-0-9.]+)[\s,]+([-0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)\s*["']/i);
  if (!vb) return null;
  return { width: Math.round(parseFloat(vb[3])), height: Math.round(parseFloat(vb[4])) };
}
