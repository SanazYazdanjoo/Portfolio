import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

// The blush hover surface contract.
//
// A light blush wash (--color-blush-100) under a hover is fine in light mode
// and unreadable in dark mode unless every text tier on it is rebound to an
// ink that clears AA on blush. So the rule has two halves:
//
//   1. the blush-100 primitive stays readable under the three inks that may
//      ever sit on it (token contract, computed from theme.css — never from
//      a screenshot, where subpixel glyphs understate contrast);
//   2. any component that tints a surface blush on hover ALSO rebinds its
//      text tiers for dark mode — or, simpler, does not tint on hover at all.
//      Non-interactive surfaces (the career arc cards, the voluntary cards)
//      took the second route: a hover that promises a click going nowhere is
//      not worth the dark-mode plumbing it needs.

const theme = readFileSync("src/styles/theme.css", "utf8");

const lum = ([r, g, b]) => {
  const linear = (value) => {
    const c = value / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
};

const contrast = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const token = (name) => {
  const match = theme.match(new RegExp(`${name}:\\s*#([0-9a-fA-F]{6})`));
  expect(match, `${name} not found as a hex token in theme.css`).toBeTruthy();
  return [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16));
};

// Strip comments so prose about a class is not read as a use of it.
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

describe("light blush hover surfaces stay readable in dark mode", () => {
  it("all foreground tiers used on blush-100 clear WCAG AA", () => {
    const blush = token("--color-blush-100");

    for (const foreground of [
      "--color-ink-900",
      "--color-ink-700",
      "--color-rose-600",
    ]) {
      expect(
        contrast(token(foreground), blush),
        `${foreground} must clear 4.5:1 on --color-blush-100`
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  // Every file that may paint the blush wash under a hover. A file that does
  // must rebind its dark-mode text tiers; a file that does not is exempt —
  // and the two that used to (About's voluntary cards, CareerArc's cards)
  // are asserted NOT to, because those surfaces are not interactive.
  const HOVER_BLUSH = /hover:bg-blush-weak|hover:\[--rule-fill-color:var\(--blush-weak\)\]/;

  it("a component that tints blush on hover also rebinds its dark-mode text", () => {
    for (const file of ["src/pages/About.jsx", "src/components/CareerArc.jsx", "src/pages/Contact.jsx"]) {
      const src = code(readFileSync(file, "utf8"));
      if (!HOVER_BLUSH.test(src)) continue;
      expect(src, `${file} tints blush on hover without a dark-mode surface`).toContain(
        "dark:hover:bg-[var(--color-blush-100)]"
      );
      expect(src, `${file} tints blush on hover without rebinding its text tiers`).toMatch(
        /dark:(?:group-)?hover:(?:text-\[var\(--color-ink-900\)\]|\[--text-rgb:var\(--color-ink-900-rgb\)\])/
      );
    }
  });

  it("non-interactive About surfaces carry no hover tint at all", () => {
    for (const file of ["src/pages/About.jsx", "src/components/CareerArc.jsx"]) {
      const src = code(readFileSync(file, "utf8"));
      expect(src, `${file} tints a non-interactive surface on hover`).not.toMatch(HOVER_BLUSH);
    }
  });
});
