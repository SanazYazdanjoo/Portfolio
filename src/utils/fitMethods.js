// Picks as many whole method names as fit under a character budget so a
// single-line methods list never has to truncate mid-word — CSS
// text-overflow/line-clamp clip at a pixel boundary regardless of word
// boundaries, so the only way to guarantee "never mid-word" is to choose
// whole array items ourselves and let the rest simply not render.
export function fitMethods(methods, { max = 3, maxChars = 56 } = {}) {
  const out = [];
  let len = 0;
  for (const m of (methods || []).slice(0, max)) {
    const addLen = (out.length ? 3 : 0) + m.length; // " · " separator ≈ 3 chars
    if (out.length > 0 && len + addLen > maxChars) break;
    out.push(m);
    len += addLen;
  }
  return out;
}

// Same idea for free-flowing prose: trims to a character budget at the last
// whole word so a clamped blurb never ends mid-word — CSS line-clamp's
// ellipsis clips at a pixel boundary, not a word boundary. CSS line-clamp
// still stays on as a hard safety net for the rare case a word runs long.
export function clampText(text, maxChars) {
  if (!text || text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  const safe = lastSpace > maxChars * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${safe.trim()}…`;
}
