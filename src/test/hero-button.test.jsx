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
  it("renders a link to the About page", () => {
    renderWithProviders(<Hero data={mockData} />);

    const link = screen.getByRole("link", { name: /about/i });
    expect(link).toHaveAttribute("href", "/about");
  });
});
