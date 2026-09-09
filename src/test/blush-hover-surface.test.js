import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const theme = readFileSync("src/styles/theme.css", "utf8");
const about = readFileSync("src/pages/About.jsx", "utf8");

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

describe("light blush hover surfaces stay readable in dark mode", () => {
  it("all About-card foreground tiers clear WCAG AA on blush-100", () => {
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

  it("About explicitly switches both the hover surface and its text palette", () => {
    expect(about).toContain("dark:hover:bg-[var(--color-blush-100)]");
    expect(about).toContain("dark:group-hover:text-[var(--color-ink-900)]");
    expect(about).toContain("dark:group-hover:text-[var(--color-ink-700)]");
    expect(about).toContain("dark:group-hover:text-[var(--color-rose-600)]");
  });
});
