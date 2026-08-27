// The accent hover contract. A -600 text link hovers to --primary-500 — one
// rung BRIGHTER than its resting -600 in both themes — never to --primary,
// which in dark mode is the coral-400 FILL accent: as text it measures 3.9:1
// on the page, under the 4.5:1 AA floor, so the old `hover:text-primary`
// pattern brightened links in light mode and dimmed them below AA in dark
// (flagged on a reader's device pass, 2026-08).
//
// Everything here is computed from the token hexes in theme.css — never from
// screenshots or recordings, where subpixel glyph strokes blend with the
// background and understate text contrast by 2x or more.

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const theme = readFileSync("src/styles/theme.css", "utf8");

// WCAG 2.x relative luminance and contrast, same helper as
// design-system.test.js's monitor-survival floors.
const lum = ([r, g, b]) => {
  const lin = (c) =>
    c / 255 <= 0.04045 ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const token = (name) => {
  const m = theme.match(new RegExp(`${name}:\\s*#([0-9a-fA-F]{6})`));
  expect(m, `${name} not found as a hex token in theme.css`).toBeTruthy();
  return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
};

const WHITE = [255, 255, 255];

describe("accent hover stays AA in both themes", () => {
  it("dark: the -500 hover rung clears 4.5:1 on bg, surface and muted", () => {
    const hover = token("--color-coral-200");
    for (const surface of ["--color-dark-bg", "--color-dark-surface", "--color-dark-muted-surface"]) {
      expect(
        contrast(hover, token(surface)),
        `coral-200 under 4.5:1 on ${surface}`
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("dark: hover means BRIGHTER — the -500 rung outshines the -600 rest state", () => {
    const bg = token("--color-dark-bg");
    expect(contrast(token("--color-coral-200"), bg)).toBeGreaterThan(
      contrast(token("--color-coral-300"), bg)
    );
  });

  it("light: the -500 hover rung clears 4.5:1 on white and on muted paper", () => {
    const hover = token("--color-coral-500");
    expect(contrast(hover, WHITE)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(hover, token("--color-paper-100"))).toBeGreaterThanOrEqual(4.5);
  });

  it("no -600 link hovers to the dark-mode fill accent any more", () => {
    // The pattern lock: `hover:text-primary` (bare, not -500/-600) may only
    // survive where the hover puts the text on a WHITE fill (CareerArc), on
    // a pinned-light page (/designsystem, the CV), or at display size where
    // the 3:1 large-text floor applies (SolidButton). Small dark-capable
    // text must use the -500 rung.
    const locked = [
      "src/pages/About.jsx",
      "src/pages/Credentials.jsx",
      "src/pages/Privacy.jsx",
      "src/tags/SingleTagPage.jsx",
    ];
    for (const file of locked) {
      const src = readFileSync(file, "utf8");
      expect(src, `${file} hovers -600 text to the fill accent`).not.toMatch(
        /text-primary-600[^"]*hover:text-primary(?!-)/
      );
    }
    // Button's plain text button is sitewide and dark-capable.
    expect(readFileSync("src/components/Button.jsx", "utf8")).toContain(
      "hover:text-primary-500"
    );
  });
});
