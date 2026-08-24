// The design reference, enforced.
//
// The homepage is built to a specific reference
// (Claude Design › Ink & Bloom › templates/portfolio-homepage). This suite
// reads the homepage's own source and fails on the four ways every previous
// pass drifted away from it:
//
//   - a spacing value that is not one the reference uses
//   - a font size, leading or tracking written at a call site
//   - a max-width standing in for a column span
//   - a card figure that crops instead of containing
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
  "src/components/LanguageToggle.jsx",
  "src/components/Footer.jsx",
];

const read = (f) => readFileSync(f, "utf8");

// Strip comments: prose about `mt-5` is documentation, not a violation.
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");

const findAll = (src, re) => [...code(src).matchAll(re)].map((m) => m[0]);

describe("reference — the spacing scale", () => {
  // Tailwind's default numeric spacing (p-4, gap-1.5, mt-7) is a whole
  // parallel ramp the reference does not use. The reference's own set lives
  // in the s-prefixed namespace, so anything numeric here is a value nobody
  // took from the reference. `-0` is exempt: zero is the absence of a value.
  const OFF_SCALE =
    /\b-?(?:m|p)[tblrxy]?-\d+(?:\.5)?\b|\bgap(?:-[xy])?-\d+(?:\.5)?\b|\bspace-[xy]-\d+(?:\.5)?\b/g;

  it("uses only the reference's steps", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), OFF_SCALE).filter((h) => !/-0$/.test(h));
      expect(hits, `${file} uses off-scale spacing: ${hits.join(", ")}`).toEqual([]);
    }
  });

  it("hardcodes no spacing value", () => {
    const ARBITRARY = /\b-?(?:m|p)[tblrxy]?-\[[^\]]+\]|\bgap(?:-[xy])?-\[[^\]]+\]/g;
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), ARBITRARY);
      expect(hits, `${file} hardcodes spacing: ${hits.join(", ")}`).toEqual([]);
    }
  });

  // Inline styles are the other way a px value gets in. The four that exist
  // all read a token; a literal length would not.
  it("writes no literal length in an inline style", () => {
    const LITERAL = /style=\{\{[^}]*?\d+(?:px|rem|em)\b[^}]*\}\}/g;
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), LITERAL);
      expect(hits, `${file} inlines a literal length: ${hits.join(" | ")}`).toEqual([]);
    }
  });
});

describe("reference — the type scale", () => {
  // Every size in the reference is a role with its own leading and tracking.
  // A component names the role; it never writes any of the three.
  const LEGACY = /(?:^|[\s"'`])text-(?:2xs|xs|sm|base|lg|xl|2xl|3xl|4xl|quote|metric)\b/g;
  const ARBITRARY = /\btext-\[[^\]]+\]|\bleading-\[[^\]]+\]|\btracking-\[[^\]]+\]/g;

  it("names roles, not legacy sizes", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), LEGACY).map((h) => h.trim());
      expect(hits, `${file} uses legacy type names: ${hits.join(", ")}`).toEqual([]);
    }
  });

  it("hardcodes no size, leading or tracking", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), ARBITRARY);
      expect(hits, `${file} hardcodes type: ${hits.join(", ")}`).toEqual([]);
    }
  });

  // A narrower column is fewer columns. A max-width is a second, invisible
  // grid competing with the real one.
  it("controls measure with column spans, not max-widths", () => {
    const MEASURE = /\bmax-w-\[[^\]]+\]|\bmax-w-(?:xs|sm|md|lg|xl|2xl|3xl|4xl|prose|measure)\b/g;
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), MEASURE);
      expect(hits, `${file} sets a max-width: ${hits.join(", ")}`).toEqual([]);
    }
  });
});

describe("reference — the tokens", () => {
  const theme = readFileSync("src/styles/theme.css", "utf8");

  it("declares the reference's spacing set and nothing between it", () => {
    const steps = [2, 3, 5, 6, 8, 10, 12, 15, 16, 20, 24, 26, 28, 32, 48, 56, 72, 88];
    const declared = [...theme.matchAll(/--space-(\d+):/g)].map((m) => Number(m[1]));
    expect([...new Set(declared)].sort((a, b) => a - b)).toEqual(steps);
  });

  it("declares the grid the reference uses", () => {
    expect(theme).toContain("--content-max:   1200px;");
    expect(theme).toContain("--gutter:          32px;");
    expect(theme).toContain("--section-pad:     88px;");
    expect(theme).toContain("--card-pad:        48px;");
  });

  it("declares every type role the reference sets", () => {
    for (const [role, size] of [
      ["plate", "11px"],
      ["label", "12px"],
      ["small", "15px"],
      ["body", "17px"],
      ["lead", "19px"],
      ["hand", "26px"],
      ["card-title", "27px"],
      ["numeral", "30px"],
      ["h2", "34px"],
    ]) {
      expect(theme, `--fs-${role} should be ${size}`).toMatch(
        new RegExp(`--fs-${role}:\\s*${size.replace("px", "px")}`)
      );
    }
    expect(theme).toContain("clamp(28px, 3.2vw, 44px)"); // email
    expect(theme).toContain("clamp(56px, 7vw, 104px)");  // hero name
  });
});

describe("reference — the card figure", () => {
  const theme = readFileSync("src/styles/theme.css", "utf8");
  const figure = theme.slice(theme.indexOf(".card-figure {"));

  // Rule 1 of the brief, and the one the previous pass broke: a UI
  // screenshot may never be cropped by its box.
  it("contains, never covers", () => {
    expect(figure).toContain("object-fit: contain;");
    expect(figure).not.toContain("object-fit: cover;");
  });

  it("is a fixed 4:3 box on the paper tint with one hairline", () => {
    expect(figure).toContain("aspect-ratio: 4 / 3;");
    expect(figure).toContain("background: var(--color-paper-100);");
    // Exactly 1px, so the reference's geometry holds — but transparent,
    // because the line itself is painted by `rule-frame-in` rather than
    // stroked by the border. Both halves matter: a solid colour here would
    // flatten the edge, and any other width would move the box.
    expect(figure).toContain("border: 1px solid transparent;");
  });

  // The CSS-side zoom the previous pass used to fake a crop.
  it("carries no crop transform", () => {
    expect(figure).not.toContain("transform: scale(");
    expect(figure).not.toContain("object-position:");
  });
});

// The hand-drawn line work is the site's signature, and building the page to
// a reference that draws every rule as `1px solid` is exactly how it got
// flattened once already. These assertions are the guard: the geometry comes
// from the reference, the line quality comes from the house rule-* system,
// and the two are independent — rule-* paints over the same border box, so
// restoring the texture never moves a measurement.
describe("reference — drawn, not stroked", () => {
  const EXPECTED = {
    "src/pages/Home.jsx":                       ["rule-t", "rule-b"],
    "src/components/Hero.jsx":                  ["rule-fill-r", "rule-stroke", "photo-frame", "rule-frame-in", "InkHighlight"],
    "src/components/StackedProjectCard.jsx":    ["rule-t", "rule-frame-in", "rule-frame"],
    "src/components/ComingSoonRow.jsx":         ["rule-t", "rule-frame-in", "rule-frame"],
    "src/components/SkillTagRow.jsx":           ["rule-pill"],
    "src/components/HomeContact.jsx":           ["rule-underline", "rule-b"],
    "src/components/CareerArc.jsx":             ["InkArrow"],
    "src/components/Nav.jsx":                   ["rule-stroke"],
    "src/components/LanguageToggle.jsx":        ["rule-l", "rule-underline"],
    "src/components/Footer.jsx":                ["rule-t"],
    "src/App.jsx":                              ["rule-b"],
  };

  // Any class ending in a stroke colour, keeping whatever prefixed it so a
  // `focus:` variant can be told apart from a plain one.
  const STROKE = /[\w:-]*\bborder-(?:border|text|primary-600|secondary-600|current)\b/g;

  it("draws every line through the house rule-* system", () => {
    for (const [file, classes] of Object.entries(EXPECTED)) {
      const src = read(file);
      const missing = classes.filter((c) => !src.includes(c));
      expect(
        missing,
        `${file} lost its drawn line work: ${missing.join(", ")} — a plain ` +
          `border would flatten the page away from the rest of the site`
      ).toEqual([]);
    }
  });

  // A visible solid stroke means something was drawn with a border colour
  // instead of the rule system. Focus indicators are the exception: those
  // want a crisp, unambiguous line, not a wobbly one.
  it("leaves no solid stroke colour outside a focus indicator", () => {
    for (const file of Object.keys(EXPECTED)) {
      const hits = findAll(read(file), STROKE).filter((h) => !h.startsWith("focus:"));
      expect(
        hits,
        `${file} strokes a line instead of drawing it: ${hits.join(", ")}`
      ).toEqual([]);
    }
  });

  // Guards the guard. A pattern that silently stopped matching would let
  // every file above pass vacuously, which is exactly how a check rots.
  it("has a pattern that actually catches a solid stroke", () => {
    expect("border-t rule-t border-border".match(STROKE)).toEqual(["border-border"]);
    expect("focus:border-primary-600".match(STROKE)).toEqual(["focus:border-primary-600"]);
    expect("border-t rule-t rule-frame-in".match(STROKE)).toBeNull();
  });
});
