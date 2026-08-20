import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData } from "../projects/gaze-assisted-input/data";
import { projectData as ibsData } from "../projects/digitalising-ibs-travel-reimbursements/data";

describe("ProjectTemplate", () => {
  it("renders challenge figures when they exist in the project data", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.getByAltText("challenge")).toBeInTheDocument();
  });
});

// The rendering half of the data/renderer contract. projects.test.js checks
// the data shape; these check that the shape actually reaches the page, and —
// more importantly — that a project omitting an optional field gets silence
// rather than an empty heading or a stray label.
describe("ProjectTemplate — header lead line", () => {
  it("renders the tagline for the IBS case study", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    expect(screen.getByText(ibsData.tagline.en)).toBeInTheDocument();
  });
});

describe("ProjectTemplate — at-a-glance strip renders from present fields, not a flag", () => {
  it("uses the project's own strip title and items when resultsAtAGlance is present", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    expect(screen.getByText("Measured so far")).toBeInTheDocument();
    // The default study-shaped heading must not appear on a project whose
    // evaluation has not run.
    expect(screen.queryByText("Study at a Glance")).not.toBeInTheDocument();

    for (const item of ibsData.resultsAtAGlance.items) {
      expect(screen.getByText(item.label.en)).toBeInTheDocument();
    }
  });

  it("falls back to metrics under the default heading for projects without resultsAtAGlance", () => {
    expect(projectData.resultsAtAGlance).toBeUndefined();
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.getByText("Study at a Glance")).toBeInTheDocument();
  });

  it("keeps rendering verbatims — survey data, not study results", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    // Rail (xl+) and inline (<xl) both render in jsdom; both are the same
    // content, so assert on the count rather than a single match.
    for (const v of ibsData.verbatims) {
      expect(screen.getAllByText(`“${v.quote.en}”`).length).toBeGreaterThan(0);
    }
  });

  it("renders no strip at all when a project has neither field", () => {
    const bare = { ...projectData, metrics: undefined, resultsAtAGlance: undefined };
    renderWithProviders(<ProjectTemplate meta={bare} />);
    expect(screen.queryByText("Study at a Glance")).not.toBeInTheDocument();
  });
});

describe("ProjectTemplate — deliberately-not-built block", () => {
  it("renders its data-supplied title and every item", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);

    expect(screen.getByText(ibsData.notBuilt.title.en)).toBeInTheDocument();
    for (const item of ibsData.notBuilt.items) {
      expect(screen.getByText(item.en)).toBeInTheDocument();
    }
  });

  it("renders nothing for a project without the field", () => {
    expect(projectData.notBuilt).toBeUndefined();
    const { container } = renderWithProviders(<ProjectTemplate meta={projectData} />);
    // No stray heading, and no empty bordered list where the block would be.
    expect(container.textContent).not.toMatch(/deliberately not built/i);
  });
});

describe("ProjectTemplate — AI-assistance disclosure", () => {
  it("renders the disclosure as a labelled metadata row when present", () => {
    renderWithProviders(<ProjectTemplate meta={ibsData} />);
    expect(screen.getByText("AI Assistance")).toBeInTheDocument();
    expect(screen.getByText(ibsData.aiAssistance.en)).toBeInTheDocument();
  });

  it("renders nothing — not an empty row — for a project without the field", () => {
    expect(projectData.aiAssistance).toBeUndefined();
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.queryByText("AI Assistance")).not.toBeInTheDocument();
  });
});
