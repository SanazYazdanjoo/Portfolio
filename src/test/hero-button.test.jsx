import React from "react";
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "./renderWithProviders";
import { Hero } from "../components/Hero";

const mockData = {
  name: "Jane Doe",
  role: "UX Engineer",
  tagline: "I speak both ‘user’ & ‘developer’.",
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

  // The headline is the word PORTFOLIO under a handwritten greeting; the
  // positioning sentence that used to sit here is gone from the hero.
  it("shows the greeting and PORTFOLIO instead of the positioning line", () => {
    renderWithProviders(<Hero data={mockData} />);
    expect(screen.getByText("Hi, welcome to my")).toBeInTheDocument();
    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();
    expect(screen.queryByText(mockData.positioning)).not.toBeInTheDocument();
  });

  // The role is labelled once, under the photo, with a drawn arrow pointing
  // back up at it — not repeated as a badge over the portrait.
  it("labels the role once, under the photo", () => {
    const { container } = renderWithProviders(<Hero data={mockData} />);
    const visibleRole = [...container.querySelectorAll("span")].filter(
      (el) =>
        el.textContent.trim() === mockData.role &&
        !el.closest(".sr-only") &&
        !el.querySelector("span")
    );
    expect(visibleRole).toHaveLength(1);
  });

  // The credential and location line moved out of the hero entirely.
  it("no longer carries the credential line", () => {
    renderWithProviders(<Hero data={mockData} />);
    expect(screen.queryByText(/Weimar/)).not.toBeInTheDocument();
  });
});
