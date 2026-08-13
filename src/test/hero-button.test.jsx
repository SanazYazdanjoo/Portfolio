import React from "react";
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "./renderWithProviders";
import { Hero } from "../components/Hero";

const mockData = {
  name: "Jane Doe",
  role: "UX Engineer",
  tagline: "I speak both ‘user’ and ‘developer’.",
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
  // The work is the primary action — this asserts the ordering contract, not
  // just that the links exist: a future refactor that demotes /projects below
  // /about or /cv should fail here.
  it("makes the work the first CTA, ahead of CV and About", () => {
    renderWithProviders(<Hero data={mockData} />);

    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"));

    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/cv");
    expect(hrefs).toContain("/about");
    expect(hrefs.indexOf("/projects")).toBeLessThan(hrefs.indexOf("/cv"));
    expect(hrefs.indexOf("/projects")).toBeLessThan(hrefs.indexOf("/about"));
  });
});
