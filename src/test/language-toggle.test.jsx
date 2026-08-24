// The language toggle has been wrong twice: once set in --color-ink-300 at
// 2.06:1 because the design reference drew it that way, and once as a dim
// <span> inside a single toggle button, which gave a German-reading visitor
// nothing to aim at. Both failures looked fine in a screenshot.
//
// So the contract is asserted rather than eyeballed: the language you are
// not currently reading is a real control, it has a name a screen reader can
// announce, it actually switches, and it is set in ink rather than in a tint.

import React from "react";
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { renderWithProviders, fireEvent } from "./renderWithProviders";
import { LanguageToggle } from "../components/LanguageToggle";

const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*/g, "");

describe("language toggle", () => {
  it("renders the inactive language as a button, not a span", () => {
    const { container } = renderWithProviders(<LanguageToggle />);
    const current = container.querySelector("[aria-current]");
    const other = container.querySelector("button");

    expect(current, "no language is marked as current").toBeTruthy();
    expect(other, "the other language is not a control").toBeTruthy();
    expect(other.textContent.trim()).not.toBe(current.textContent.trim());
  });

  it("gives the inactive language an accessible name in the language it switches to", () => {
    const { container } = renderWithProviders(<LanguageToggle />);
    const other = container.querySelector("button");
    // The default locale is English, so the button offers German — and says
    // so in German, which is the point: the reader who needs it can read it.
    expect(other.getAttribute("aria-label")).toBe("Auf Deutsch wechseln");
  });

  it("switches when the inactive language is clicked", () => {
    const { container } = renderWithProviders(<LanguageToggle />);
    const before = container.querySelector("[aria-current]").textContent.trim();
    fireEvent.click(container.querySelector("button"));
    const after = container.querySelector("[aria-current]").textContent.trim();

    expect(after, "clicking the other language did not switch to it").not.toBe(before);
  });

  it("sets both languages in ink, never in a tint below 4.5:1", () => {
    // Comments stripped: the component's own note names ink-300 as the token
    // it replaced, and that sentence is documentation, not a usage.
    const src = stripComments(readFileSync("src/components/LanguageToggle.jsx", "utf8"));
    // --color-ink-300 is 2.06:1 on the page background and --blush is lower
    // still; neither may carry text here. --text is 16.7:1 and
    // --primary-600 is 13.2:1.
    for (const tint of ["ink-300", "text-faint", "text-blush", "opacity-"]) {
      expect(src, `the toggle uses ${tint}, which cannot clear 4.5:1`).not.toContain(tint);
    }
    expect(src).toMatch(/text-text\b/);
    expect(src).toMatch(/text-primary-600\b/);
  });
});
