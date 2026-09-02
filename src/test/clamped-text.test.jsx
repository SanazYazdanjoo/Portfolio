import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as project1 } from "../projects/gaze-assisted-input/gaze-assisted-input.data";

// jsdom has no layout engine: every box measures 0, so the clamp would never
// consider anything overflowing and the toggle would never render. Stubbing
// the height is what makes "is this paragraph longer than 2.5 lines?"
// answerable here at all — the number just has to exceed 2.5 lines of the
// default 16px/normal type jsdom resolves without the Tailwind stylesheet.
const TALL = 400;

let rectSpy;
let originalResizeObserver;

beforeAll(() => {
  rectSpy = vi
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockReturnValue({ height: TALL, width: 600, top: 0, left: 0, right: 600, bottom: TALL, x: 0, y: 0 });

  originalResizeObserver = globalThis.ResizeObserver;
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterAll(() => {
  rectSpy.mockRestore();
  globalThis.ResizeObserver = originalResizeObserver;
});

describe("Read more / Read less clamp on body copy", () => {
  it("offers a Read More toggle on every overflowing paragraph", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    expect(screen.getAllByRole("button", { name: /read more/i }).length).toBeGreaterThan(0);
  });

  it("starts collapsed and expands to the full paragraph on click", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const toggle = screen.getAllByRole("button", { name: /read more/i })[0];
    const body = document.getElementById(toggle.getAttribute("aria-controls"));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    const clamped = parseFloat(body.style.maxHeight);

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName(/read less/i);
    expect(parseFloat(body.style.maxHeight)).toBe(TALL);
    expect(parseFloat(body.style.maxHeight)).toBeGreaterThan(clamped);
  });

  it("collapses back to the clamped height on Read Less", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const toggle = screen.getAllByRole("button", { name: /read more/i })[0];
    const body = document.getElementById(toggle.getAttribute("aria-controls"));
    const clamped = parseFloat(body.style.maxHeight);

    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(parseFloat(body.style.maxHeight)).toBe(clamped);
  });

  it("clamps to 2.5 lines of the paragraph's own line-height", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const toggle = screen.getAllByRole("button", { name: /read more/i })[0];
    const body = document.getElementById(toggle.getAttribute("aria-controls"));

    // Tailwind's stylesheet isn't loaded here, so the paragraph resolves no
    // line-height and no font-size of its own; this walks the same fallback
    // chain the clamp does, ending at the 17px body size the template sets.
    const paragraph = body.querySelector("p");
    const style = window.getComputedStyle(paragraph);
    const lineHeight = parseFloat(style.lineHeight);
    const line = Number.isFinite(lineHeight)
      ? lineHeight
      : (parseFloat(style.fontSize) || 17) * 1.5;

    expect(parseFloat(body.style.maxHeight)).toBeCloseTo(line * 2.5, 5);
  });
});

describe("Project title", () => {
  it("renders on a single line", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title.style.whiteSpace).toBe("nowrap");
  });
});
