// The system, enforced.
//
// Three passes over this page ended with the listed items fixed and the
// visual coherence worse, because every gap and size was a one-off decision
// that no rule prevented. This suite is that rule. It reads the homepage's
// own source and fails on the things that produced the incoherence:
//
//   - a spacing value that is not one of the ten steps
//   - a font size that is not one of the eight steps
//   - capitals outside the label step
//   - a max-width standing in for a column span
//
// Adding a component to HOMEPAGE opts it into all four.

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const HOMEPAGE = [
  "src/App.jsx",
  "src/pages/Home.jsx",
  "src/components/Hero.jsx",
  "src/components/StackedProjectCard.jsx",
  "src/components/ComingSoonRow.jsx",
  "src/components/HomeContact.jsx",
  "src/components/AboutMe.jsx",
  "src/components/CareerArc.jsx",
  "src/components/SkillTagRow.jsx",
  "src/components/Nav.jsx",
  "src/components/Footer.jsx",
];

const read = (f) => readFileSync(f, "utf8");

// Strip block and line comments: prose about `mt-5` is not a violation.
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

function findAll(src, re) {
  return [...code(src).matchAll(re)].map((m) => m[0]);
}

describe("design system — the spacing scale", () => {
  // Tailwind's own numeric spacing (p-4, gap-1.5, mt-7) is the whole
  // off-scale ramp. The ten steps live in their own s-prefixed namespace, so
  // anything numeric here is a value nobody chose from the scale. `-0` is
  // exempt: zero is not a step, it is the absence of one.
  const OFF_SCALE =
    /\b-?(?:m|p)[tblrxy]?-\d+(?:\.5)?\b|\bgap(?:-[xy])?-\d+(?:\.5)?\b|\bspace-[xy]-\d+(?:\.5)?\b/g;

  it("uses only the ten steps — no Tailwind numeric spacing", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), OFF_SCALE).filter((h) => !/-0$/.test(h));
      expect(hits, `${file} uses off-scale spacing: ${hits.join(", ")}`).toEqual([]);
    }
  });

  it("uses no arbitrary spacing values", () => {
    const ARBITRARY = /\b-?(?:m|p)[tblrxy]?-\[[^\]]+\]|\bgap(?:-[xy])?-\[[^\]]+\]/g;
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), ARBITRARY);
      expect(hits, `${file} hardcodes spacing: ${hits.join(", ")}`).toEqual([]);
    }
  });
});

describe("design system — the type scale", () => {
  // The legacy names still resolve to steps, but a homepage component that
  // writes text-sm has picked a name rather than a step, and the next person
  // reading it cannot tell which step they got.
  const LEGACY = /\btext-(?:2xs|xs|sm|base|lg|xl|2xl|3xl|4xl)\b/g;
  const ARBITRARY = /\btext-\[[^\]]+\]|\bleading-\[[^\]]+\]|\btracking-\[[^\]]+\]/g;

  it("names steps, not legacy sizes", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), LEGACY);
      expect(hits, `${file} uses legacy type names: ${hits.join(", ")}`).toEqual([]);
    }
  });

  it("uses no arbitrary font sizes, leadings or trackings", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), ARBITRARY);
      expect(hits, `${file} hardcodes type: ${hits.join(", ")}`).toEqual([]);
    }
  });
});

describe("design system — capitals and measure", () => {
  // 13px + 0.08em is what makes capitals legible. `uppercase` applied to any
  // other step is the setting that produced 10px letter-spaced labels, so the
  // transform is only available through .type-label.
  it("sets capitals only through the label step", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), /\buppercase\b/g);
      expect(
        hits,
        `${file} applies uppercase directly — use .type-label, the only step allowed capitals`
      ).toEqual([]);
    }
  });

  // A narrower text block spans fewer columns. A max-width is a second,
  // invisible grid competing with the real one.
  it("controls measure with column spans, not max-widths", () => {
    const MEASURE = /\bmax-w-\[[^\]]+\]|\bmax-w-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|prose|measure)\b/g;
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), MEASURE);
      expect(hits, `${file} sets a max-width: ${hits.join(", ")} — span fewer columns instead`).toEqual([]);
    }
  });
});

describe("design system — the tokens themselves", () => {
  const theme = readFileSync("src/styles/theme.css", "utf8");

  it("declares all ten spacing steps and nothing between them", () => {
    const steps = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];
    for (const n of steps) {
      expect(theme, `--space-${n} is missing`).toContain(`--space-${n}:`);
    }
    const declared = [...theme.matchAll(/--space-(\d+):/g)].map((m) => Number(m[1]));
    expect([...new Set(declared)].sort((a, b) => a - b)).toEqual(steps);
  });

  it("declares all eight type steps", () => {
    for (const step of ["display", "h1", "h2", "h3", "body-lg", "body", "small", "label"]) {
      expect(theme, `--fs-${step} is missing`).toContain(`--fs-${step}:`);
    }
  });

  it("pins the label step to 13px and 0.08em", () => {
    expect(theme).toContain("--fs-label:    0.8125rem");
    expect(theme).toContain("--tracking-label:    0.08em");
  });
});
