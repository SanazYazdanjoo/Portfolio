import React from "react";
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "./renderWithProviders";
import { Hero } from "../components/Hero";

const mockData = {
  name: "Jane Doe",
  role: "UX Engineer",
  tagline: "I speak both ‘user’ and ‘developer’.",
  positioning:
    "UX Engineer bridging mixed-methods research and production React — M.Sc. HCI. Open to UX roles in the EU.",
  aboutImage: "https://example.com/photo.jpg",
  heroMeta: {
    location: "Weimar, DE · Open to relocation",
    background: "M.Sc. HCI · B.E. Software Engineering · QA",
    focus: "Frontend Development · UI Architecture · Mixed-methods research",
    status: "Open to interdisciplinary UX & Tech roles",
  },
  contact: {
    location: "Weimar, Germany",
  },
};

describe("Hero CTA", () => {
  // One primary action, one secondary. This asserts the ordering contract,
  // not just that the links exist: a future refactor that demotes /projects
  // below /cv should fail here.
  it("makes the work the first CTA, ahead of the CV", () => {
    renderWithProviders(<Hero data={mockData} />);

    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"));

    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/cv");
    expect(hrefs.indexOf("/projects")).toBeLessThan(hrefs.indexOf("/cv"));
  });

  // "About" lives in the primary nav; repeating it here gave the hero three
  // competing calls to action and no primary.
  it("does not repeat the About link the nav already carries", () => {
    renderWithProviders(<Hero data={mockData} />);

    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"));

    expect(hrefs).not.toContain("/about");
  });

  // The positioning statement is the sentence a recruiter reads after the
  // name — role, specialism, and what she's looking for, in plain prose.
  it("renders the positioning statement", () => {
    renderWithProviders(<Hero data={mockData} />);
    expect(screen.getByText(mockData.positioning)).toBeInTheDocument();
  });

  // The handwritten role badge duplicated the eyebrow line; the role now
  // reaches assistive tech through the sr-only span in the <h1> only.
  it("does not repeat the role as a visible badge on the photo", () => {
    const { container } = renderWithProviders(<Hero data={mockData} />);
    const visibleRole = [...container.querySelectorAll("span")].filter(
      (el) => el.textContent.trim() === mockData.role && !el.classList.contains("sr-only")
    );
    expect(visibleRole).toHaveLength(0);
  });
});
