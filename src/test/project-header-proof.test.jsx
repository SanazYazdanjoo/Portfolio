import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as ibsData } from "../projects/digitalising-ibs-travel-reimbursements/digitalising-ibs-travel-reimbursements.data";
import { projectData as gazeData } from "../projects/gaze-assisted-input/gaze-assisted-input.data";

// Ported from PR #12: the case-study header repeats the card's proof points,
// so the detail page answers "scale, rigour, result" before the long form.
// The values are the card's own (card.js is spread into each data file), so
// the header can never show a number the card doesn't.
describe("ProjectHeader — proof points from cardStats", () => {
  it("renders every card stat in the case-study header", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    for (const stat of ibsData.cardStats) {
      expect(screen.getAllByText(stat.label.en).length).toBeGreaterThan(0);
    }
  });

  it("renders nothing for a project without cardStats", () => {
    const { container } = renderWithProviders(
      <ProjectTemplate meta={{ ...gazeData, cardStats: undefined }} />
    );
    for (const stat of gazeData.cardStats ?? []) {
      expect(container.textContent).not.toContain(stat.label.en);
    }
  });
});

// The process section used to ignore meta.sectionTitles — every other
// section honoured a per-project kicker/heading, this one always fell back
// to the site-wide translation.
describe("ProcessGallerySection — honours sectionTitles", () => {
  it("uses the project's process heading override", () => {
    const meta = {
      ...gazeData,
      sectionTitles: {
        ...(gazeData.sectionTitles ?? {}),
        process: {
          kicker: { en: "How it ran", de: "Ablauf" },
          heading: { en: "Five steps from question to recommendation", de: "Fünf Schritte" },
        },
      },
    };
    expect(meta.process?.length).toBeGreaterThan(0);
    renderWithProviders(<ProjectTemplate meta={meta} />);
    expect(
      screen.getByRole("button", { name: /Five steps from question to recommendation/ })
    ).toBeInTheDocument();
  });
});
