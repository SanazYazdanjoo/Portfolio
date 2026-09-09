import React from "react";
import { describe, expect, it } from "vitest";
import { renderWithProviders, screen } from "./renderWithProviders";
import { Hero } from "../components/Hero";

const mockData = {
  name: "Jane Doe",
  role: "UX Engineer",
  tagline: "I speak both ‘user’ & ‘developer’.",
  positioning: "Research → Usability Engineering → Implementation",
  heroNarrative: {
    intro: "Hi, I'm Jane.",
    workflow: "Research → Usability Engineering → Implementation",
    statement:
      "I study how people use technology, turn evidence into product decisions, and build the interfaces that put those decisions into practice.",
    careerPathLabel: "My path",
    ctas: {
      work: "View Case Studies",
      cv: "View CV",
    },
  },
  careerPath: [
    { id: "software", label: "Software Engineering" },
    { id: "frontend", label: "Frontend" },
    { id: "qa", label: "QA / Usability" },
    { id: "hci", label: "HCI Research" },
    { id: "ux", label: "UX Engineering", highlight: true },
  ],
  aboutImage: "https://example.com/photo.jpg",
};

describe("Hero positioning and CTA hierarchy", () => {
  it("makes case studies the first CTA, ahead of the CV", () => {
    renderWithProviders(<Hero data={mockData} />);

    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"));

    expect(hrefs).toContain("/projects");
    expect(hrefs).toContain("/cv");
    expect(hrefs.indexOf("/projects")).toBeLessThan(hrefs.indexOf("/cv"));
  });

  it("does not repeat About or Contact as competing hero actions", () => {
    renderWithProviders(<Hero data={mockData} />);

    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"));

    expect(hrefs).not.toContain("/about");
    expect(hrefs).not.toContain("/contact");
  });

  it("shows identity, current workflow and supporting statement instead of PORTFOLIO", () => {
    renderWithProviders(<Hero data={mockData} />);

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("UX Engineer")).toBeInTheDocument();
    expect(screen.getByText(mockData.heroNarrative.workflow)).toBeInTheDocument();
    expect(screen.getByText(mockData.heroNarrative.statement)).toBeInTheDocument();
    expect(screen.queryByText("PORTFOLIO")).not.toBeInTheDocument();
  });

  it("keeps the detailed career progression out of the hero", () => {
    renderWithProviders(<Hero data={mockData} />);

    expect(screen.queryByText("Software Engineering")).not.toBeInTheDocument();
    expect(screen.queryByText("HCI Research")).not.toBeInTheDocument();
  });

  it("keeps the personal tagline with the portrait", () => {
    renderWithProviders(<Hero data={mockData} />);
    expect(screen.getByText(mockData.tagline)).toBeInTheDocument();
  });

  it("offers only case studies and CV as hero links", () => {
    renderWithProviders(<Hero data={mockData} />);
    const hrefs = screen.getAllByRole("link").map((el) => el.getAttribute("href"));
    expect(hrefs).toEqual(["/projects", "/cv"]);
  });

  it("does not carry the old credential/location proof line", () => {
    renderWithProviders(<Hero data={mockData} />);
    expect(screen.queryByText(/Weimar/)).not.toBeInTheDocument();
  });
});
