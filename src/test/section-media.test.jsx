import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import SectionMedia from "../projects/SectionMedia";
import { projectData } from "../projects/project-4/data";

const figures = [
  { src: "/a.webp", alt: "Diagram A", caption: "Caption A" },
  { src: "/b.webp", alt: "Diagram B", zoom: false },
];

describe("SectionMedia", () => {
  it("renders nothing when there are no items", () => {
    const { container } = renderWithProviders(<SectionMedia items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("gives every figure alt text", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    expect(screen.getByAltText("Diagram A")).toBeInTheDocument();
    expect(screen.getByAltText("Diagram B")).toBeInTheDocument();
  });

  it("makes zoomable figures keyboard-reachable buttons, and respects zoom:false", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    expect(
      screen.getByRole("button", { name: /enlarge figure: diagram a/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /enlarge figure: diagram b/i })
    ).not.toBeInTheDocument();
  });

  it("opens a labelled modal dialog on click and closes on Escape", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /enlarge figure: diagram a/i }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Diagram A");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("restores body scroll after the overlay closes", () => {
    renderWithProviders(<SectionMedia items={figures} />);
    fireEvent.click(screen.getByRole("button", { name: /enlarge figure: diagram a/i }));
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});

describe("Reimbursement case study figures", () => {
  it("every figure has a src and non-empty alt text", () => {
    const all = Object.values(projectData.figures).flat();
    expect(all.length).toBeGreaterThan(0);
    all.forEach((f) => {
      expect(f.src).toBeTruthy();
      expect(f.alt && f.alt.length).toBeGreaterThan(20);
    });
  });

  it("ships one board per persona in the seven-board set", () => {
    expect(projectData.figures.methodology).toHaveLength(7);
  });
});
