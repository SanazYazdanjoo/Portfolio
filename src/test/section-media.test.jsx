import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import SectionMedia from "../projects/SectionMedia";

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

describe("Figure framing fields", () => {
  const rich = [{
    src: "/c.webp",
    alt: "Diagram C",
    label: "Stakeholder Map",
    title: "Nine roles",
    description: "How to read it.",
    takeaway: "The finding.",
    takeawayLabel: "Why it matters",
  }];

  it("renders label, title, description and takeaway when provided", () => {
    renderWithProviders(<SectionMedia items={rich} />);
    expect(screen.getByText("Stakeholder Map")).toBeInTheDocument();
    expect(screen.getByText("Nine roles")).toBeInTheDocument();
    expect(screen.getByText("How to read it.")).toBeInTheDocument();
    expect(screen.getByText("The finding.")).toBeInTheDocument();
    expect(screen.getByText("Why it matters")).toBeInTheDocument();
  });

  it("falls back to a default takeaway label", () => {
    renderWithProviders(
      <SectionMedia items={[{ src: "/d.webp", alt: "D", takeaway: "X" }]} />
    );
    expect(screen.getByText("What it shows")).toBeInTheDocument();
  });

  it("stays backward compatible for figures with only src, alt and caption", () => {
    renderWithProviders(
      <SectionMedia items={[{ src: "/e.webp", alt: "E", caption: "Just a caption" }]} />
    );
    expect(screen.getByText(/just a caption/i)).toBeInTheDocument();
    expect(screen.queryByText("What it shows")).not.toBeInTheDocument();
  });

});
