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
import { projects } from "../data/projects";

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

  // One box, no variants: full width, 4:3, 12px padding, paper tint, one
  // hairline. Driven only by its own width and ratio, so all three plates
  // resolve to the same height and the left column aligns down the list.
  it("is a single fixed box", () => {
    expect(figure).toContain("width: 100%;");
    expect(figure).toContain("aspect-ratio: 4 / 3;");
    expect(figure).toContain("padding: var(--space-12);");
    expect(figure).toContain("background: var(--color-paper-100);");
    // Exactly 1px, so the geometry holds — but transparent, because the line
    // is painted by `rule-frame-in` rather than stroked by the border.
    expect(figure).toContain("border: 1px solid transparent;");
  });

  // A plate whose content is a caption about which image belongs in it is
  // instruction text. It rendered as UI once; it may not again.
  it("has no plate variant anywhere", () => {
    expect(theme).not.toContain("card-figure--plate");
    for (const file of HOMEPAGE) {
      expect(read(file), `${file} still renders a plate`).not.toMatch(
        /card-figure--plate|cardPlate|text-plate/
      );
    }
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
    "src/components/Hero.jsx":                  ["rule-fill-r", "rule-stroke", "photo-frame", "rule-frame-in", "HandArrow"],
    "src/components/StackedProjectCard.jsx":    ["rule-t", "rule-frame-in", "rule-frame", "HandArrow"],
    // No figure column here, so no frame — the row rule and the badge.
    "src/components/ComingSoonRow.jsx":         ["rule-t", "rule-frame"],
    "src/components/SkillTagRow.jsx":           ["rule-pill"],
    "src/components/HomeContact.jsx":           ["rule-underline", "rule-b"],
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

// The card assets are cropped by scripts/generate-card-crops.mjs, never by
// CSS. These assert the contract that script upholds, because a hand-edited
// or re-exported asset that breaks it shows up as a squashed or letterboxed
// plate rather than as an error.
describe("reference — the card assets", () => {
  const CARD_IMAGES = [
    "src/projects/digitalising-ibs-travel-reimbursements/card-claim-table.webp",
    "src/projects/deskbird-hybrid-work/media/card-interest-picker.webp",
    "src/projects/gaze-assisted-input/media/card-large-target-panel.webp",
  ];

  // Read the WebP header directly rather than pulling in an image library:
  // a VP8L/VP8X/VP8 chunk carries the dimensions at a fixed offset.
  function webpSize(buf) {
    const fourCC = buf.toString("ascii", 12, 16);
    if (fourCC === "VP8X") {
      return {
        width: 1 + buf.readUIntLE(24, 3),
        height: 1 + buf.readUIntLE(27, 3),
      };
    }
    if (fourCC === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: 1 + (b & 0x3fff), height: 1 + ((b >> 14) & 0x3fff) };
    }
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }

  it("are all exactly 4:3, so every plate renders at the same height", () => {
    for (const path of CARD_IMAGES) {
      const { width, height } = webpSize(readFileSync(path));
      const ratio = width / height;
      expect(
        Math.abs(ratio - 4 / 3),
        `${path} is ${width}x${height} (${ratio.toFixed(3)}), not 4:3`
      ).toBeLessThan(0.01);
    }
  });

  it("stay small enough to sit below the fold without cost", () => {
    for (const path of CARD_IMAGES) {
      const kb = readFileSync(path).length / 1024;
      expect(kb, `${path} is ${Math.round(kb)} KB`).toBeLessThan(120);
    }
  });
});

// The tag row has to sit on one line. It wrapped once, on the card with the
// longest labels, and the failure was invisible until someone looked at the
// page — so the arithmetic is asserted instead.
//
// The row is monospace, which makes its width computable from a character
// count: every glyph is one advance wide, plus the tracking, and the chips
// add their own padding, borders and gaps. The three faces below are the
// ones this font stack can actually resolve to, measured from the files in
// C:/Windows/Fonts. The widest of them is the one that has to fit.
describe("reference — the tag row fits one line", () => {
  const GRID = 1200;
  const PAGE_PADDING = 32;            // .grid-12 padding-inline
  const GUTTER = 32;
  const COLUMN = (GRID - 2 * PAGE_PADDING - 11 * GUTTER) / 12;
  const TEXT_COLUMN = 7 * COLUMN + 6 * GUTTER;   // cols 6-12

  const FS = 12;                      // --fs-label
  const TRACKING = 0.08 * FS;         // --ls-08
  const CHIP_PADDING_X = 6;           // px-s6
  const CHIP_BORDER = 1;
  const GAP = 8;                      // gap-s8

  // em advance per character, read from each font's OS/2 xAvgCharWidth.
  const FACES = { "Cascadia Code": 0.5859, Consolas: 0.5498, "Courier New": 0.6001 };

  function rowWidth(tags, advanceEm) {
    const chars = tags.reduce((n, t) => n + t.length, 0);
    const text = chars * (advanceEm * FS + TRACKING);
    const chrome = tags.length * (2 * CHIP_PADDING_X + 2 * CHIP_BORDER);
    return text + chrome + (tags.length - 1) * GAP;
  }

  it("fits in the text column in every mono face the stack can resolve to", () => {
    for (const p of projects) {
      if (!p.cardTags) continue;
      for (const [face, advance] of Object.entries(FACES)) {
        const w = rowWidth(p.cardTags, advance);
        expect(
          w,
          `${p.slug}: tag row is ${w.toFixed(0)}px in ${face}, over the ` +
            `${TEXT_COLUMN.toFixed(0)}px text column — shorten a label or ` +
            `reduce chip padding, do not substitute a different skill`
        ).toBeLessThanOrEqual(TEXT_COLUMN);
      }
    }
  });
});

// The forward arrow is drawn, like every other line on the page. A → glyph
// is the typeface's arrow, not this site's, and it is what HandArrow
// replaced — so its reappearance is a regression, not a shortcut.
describe("reference — the forward arrow is drawn", () => {
  const GLYPHS = /[→➡➔]|&rarr;/g;

  it("uses no arrow glyph anywhere on the page", () => {
    for (const file of HOMEPAGE) {
      const hits = findAll(read(file), GLYPHS);
      expect(
        hits,
        `${file} renders an arrow glyph — use <HandArrow /> instead`
      ).toEqual([]);
    }
  });

  it("keeps the path values the design specifies", () => {
    const src = read("src/components/HandArrow.jsx");
    // The off-straight shaft and the asymmetric head. "Correcting" either to
    // a straight line or a symmetric chevron is the failure this catches.
    expect(src).toContain("M1 5.3c4.3-.5 11.6-.7 21.8-.5");
    expect(src).toContain("M18.2 1.3c1.8 1.6 3.2 2.8 4.6 3.6-1.6.9-3 1.9-4.4 3.5");
    expect(src).toContain('stroke="currentColor"');
  });
});
