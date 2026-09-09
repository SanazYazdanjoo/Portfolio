// The deskbird case study resolves figures by filename through a Vite glob
// (see deskbird-hybrid-work.data.js, MEDIA RESOLUTION). These tests pin the
// plumbing: process steps render their `figures` through SectionMedia, a
// missing file becomes a labelled placeholder, a present one becomes an
// <img>, and both follow the language toggle.
import { describe, it, expect } from "vitest";
import { screen, within, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import { ProcessGallerySection } from "../projects/template/ProcessGallery";
import { projectData } from "../projects/deskbird-hybrid-work/deskbird-hybrid-work.data";
import Project2, { enrichedProjectData } from "../projects/deskbird-hybrid-work/index";
import { useTranslation } from "../context/LanguageContext";

// The template has no language switch of its own (it lives in the site Nav),
// so the test mounts one against the same provider.
function LangToggle() {
  const { toggleLang } = useTranslation();
  return <button type="button" onClick={toggleLang}>toggle-lang</button>;
}

const allFigures = projectData.process
  .flatMap((s) => s.figures ?? [])
  .concat(Object.values(projectData.figures).flat());

const enrichedFigures = enrichedProjectData.process
  .flatMap((s) => s.figures ?? [])
  .concat(Object.values(enrichedProjectData.figures ?? {}).flat());

describe("deskbird media resolution", () => {
  it("every figure carries the fields the renderer needs", () => {
    for (const f of allFigures) {
      expect(typeof f.pendingFile).toBe("string");
      expect(typeof f.alt.en).toBe("string");
      expect(typeof f.alt.de).toBe("string");
      expect([1, 2]).toContain(f.span);
    }
    expect(projectData.process.every((s) => !("imagePath" in s))).toBe(true);
  });

  it("resolves known uploaded base files and keeps unresolved media as placeholders", () => {
    const byFile = new Map(allFigures.map((f) => [f.pendingFile, f]));
    expect(byFile.get("met_ucd-process.png")?.src).toBeTruthy();
    expect(byFile.get("p10_interests-modal.png")?.src).toBeTruthy();

    const missing = [...new Set(allFigures.filter((f) => !f.src).map((f) => f.pendingFile))];
    expect(missing.length).toBeGreaterThan(0);
    expect(missing.every((name) => typeof name === "string" && name.length > 0)).toBe(true);
  });
});

describe("process steps with figures", () => {
  const items = [
    {
      phase: "discover", type: "Study", title: "Step one", annotation: "Did a thing.",
      figures: [
        { src: null, pendingFile: "p01_a.png", alt: "Alt A", caption: "Cap A", span: 2 },
        { src: "/real.png", alt: "Alt B", caption: "Cap B", span: 1 },
      ],
    },
  ];

  it("renders each step's figures through the shared grid", () => {
    renderWithProviders(<ProcessGallerySection items={items} number="03" isOpen onToggle={() => {}} />);
    const step = screen.getByRole("listitem");
    expect(within(step).getByRole("img", { name: "Alt A" })).toHaveTextContent("p01_a.png");
    expect(within(step).getByAltText("Alt B")).toBeInTheDocument();
    expect(within(step).getByText("Cap A")).toBeInTheDocument();
    expect(step.querySelector("[data-section-media]")).not.toBeNull();
  });
});

describe("deskbird page end to end", () => {
  it("renders every resolved image and a placeholder for unresolved figures, in both languages", () => {
    const { container } = renderWithProviders(<><LangToggle /><Project2 /></>, { route: "/projects/deskbird-hybrid-work" });
    const grids = container.querySelectorAll("[data-section-media]");
    const real = () => Array.from(grids).flatMap((g) => Array.from(g.querySelectorAll("figure img")));
    const placeholders = () => Array.from(grids).flatMap((g) => Array.from(g.querySelectorAll("figure [role='img']")));
    const expectedResolvedCount = enrichedFigures.filter((f) => f.src).length;

    expect(real()).toHaveLength(expectedResolvedCount);
    const enPlaceholders = placeholders();
    expect(enPlaceholders.length).toBeGreaterThan(0);
    expect(enPlaceholders.every((p) => /\.(png|jpe?g|webp|svg)/i.test(p.textContent))).toBe(true);

    const modal = enrichedProjectData.figures.solution[0];
    expect(screen.getByAltText(modal.alt.en)).toBeInTheDocument();
    const wall = enrichedProjectData.process[5].figures[0];
    expect(screen.getByRole("img", { name: wall.alt.en })).toBeInTheDocument();
    expect(screen.getByText(wall.caption.en)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "toggle-lang" }));
    expect(screen.getByAltText(modal.alt.de)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: wall.alt.de })).toBeInTheDocument();
    expect(screen.getByText(wall.caption.de)).toBeInTheDocument();
    expect(placeholders()).toHaveLength(enPlaceholders.length);
    expect(real()).toHaveLength(expectedResolvedCount);
  });
});
