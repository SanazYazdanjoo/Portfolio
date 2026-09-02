// The portfolio case study's own page shape, pinned. This project is the
// deliberate exception to the standard section list — no Process, Challenge,
// Solution, Methodology or Implications; Results renamed to "Metrics"; two
// sections the other studies don't have (Wireframes, Design System, the
// latter resolving its values live from theme.css). The second half of the
// contract matters just as much: the mechanisms that make this page an
// exception are all data-gated, so a study that doesn't opt in renders
// exactly as before — asserted here against a real unmodified project.
//
// Explicit timeouts: each test renders the full ProjectTemplate tree, which
// under the suite's parallel workers can cross vitest's 5s default and fail
// as a timeout, not as a violation (same story as the provenance suite).

import { describe, it, expect } from "vitest";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as siteData } from "../projects/designing-this-site/designing-this-site.data";
import { projectData as gazeData } from "../projects/gaze-assisted-input/gaze-assisted-input.data";
import { renderWithProviders, screen } from "./renderWithProviders";

describe("designing-this-site — the exception's own section list", () => {
  it("drops process, challenge, solution, methodology and implications", () => {
    // The data is the gate: absent fields cannot render (SECTIONS contract).
    for (const key of ["process", "challenge", "solution", "methodology", "implications"]) {
      expect(siteData[key], `<slug>.data.js still carries \`${key}\``).toBeUndefined();
    }
    const { container } = renderWithProviders(<ProjectTemplate meta={siteData} />);
    for (const id of ["process", "challenge", "solution", "methodology", "implications"]) {
      expect(
        container.querySelector(`section#${id}`),
        `section #${id} should not render for this project`
      ).toBeNull();
    }
  }, 30_000);

  it("renames Results to Metrics — heading, kicker and sidebar label", () => {
    renderWithProviders(<ProjectTemplate meta={siteData} />);
    expect(screen.getByRole("heading", { name: /Metrics/ })).toBeInTheDocument();
    expect(screen.queryByText("Key Findings & Outcome")).toBeNull();
    // Sidebar + mobile pill bar both carry the overridden label.
    expect(screen.getAllByText("Metrics").length).toBeGreaterThanOrEqual(2);
  }, 30_000);

  it("renders the Wireframes section with both layout schematics", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={siteData} />);
    expect(container.querySelector("section#wireframe")).not.toBeNull();
    expect(screen.getByText(siteData.wireframe.en)).toBeInTheDocument();
    for (const figure of siteData.figures.wireframe) {
      expect(screen.getByAltText(figure.alt.en)).toBeInTheDocument();
    }
  }, 30_000);

  it("renders the Design System section with the live token panel", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={siteData} />);
    expect(container.querySelector("section#designSystem")).not.toBeNull();
    const panel = container.querySelector("[data-design-tokens-panel]");
    expect(panel).not.toBeNull();
    // The panel lists token NAMES; values resolve from the live stylesheet
    // (empty in jsdom, rendered as an em-dash) — the point under test is
    // that no value is hardcoded in the panel, so names are the contract.
    // Color chips shorten the primitive prefix ("coral-500"); the semantic
    // and typography rows carry the full custom-property name.
    expect(screen.getByText("coral-500")).toBeInTheDocument();
    expect(screen.getByText("--primary")).toBeInTheDocument();
    expect(screen.getByText("--font-family-display")).toBeInTheDocument();
  }, 30_000);

  // The Figma Make build of the same system, linked at the end of the
  // section. Two things are pinned: that it opens safely in a new tab, and
  // that it is NOT the gold PrototypeLink treatment — that mark is
  // once-per-page and the prototype link one section below already spends
  // it, so this one carries the inline-link style (coral + drawn hairline).
  it("links the Figma Make kit at the end of the Design System section", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={siteData} />);
    const section = container.querySelector("section#designSystem");
    const link = section.querySelector('a[href*="figma.com/make"]');
    expect(link, "Design System section should link the Figma Make kit").not.toBeNull();
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.className).toContain("rule-underline");
    expect(link.className).not.toContain("bg-highlight");
  }, 30_000);

  it("still shows Research Methods + Tech Stack, re-homed under Prototype", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={siteData} />);
    const prototype = container.querySelector("section#prototype");
    expect(prototype).not.toBeNull();
    expect(prototype.textContent).toContain("Tech Stack");
    expect(prototype.textContent).toContain("Vite");
  }, 30_000);
});

describe("designing-this-site — the exception does not leak", () => {
  it("a project without the opt-in fields keeps its standard sections and titles", () => {
    expect(gazeData.wireframe).toBeUndefined();
    expect(gazeData.designSystem).toBeUndefined();
    expect(gazeData.sectionTitles).toBeUndefined();

    const { container } = renderWithProviders(<ProjectTemplate meta={gazeData} />);
    for (const id of ["challenge", "solution", "methodology", "results"]) {
      expect(
        container.querySelector(`section#${id}`),
        `section #${id} must keep rendering for an unmodified project`
      ).not.toBeNull();
    }
    expect(container.querySelector("section#wireframe")).toBeNull();
    expect(container.querySelector("section#designSystem")).toBeNull();
    // The Figma Make link is data-gated on designSystemUrl the same way.
    expect(gazeData.designSystemUrl).toBeUndefined();
    expect(container.querySelector('a[href*="figma.com/make"]')).toBeNull();
    expect(screen.getByText("Key Findings & Outcome")).toBeInTheDocument();
    // Methods/Tech Stack stay in Methodology when methodology exists.
    const methodology = container.querySelector("section#methodology");
    expect(methodology.textContent).toContain("Tech Stack");
  }, 30_000);
});
