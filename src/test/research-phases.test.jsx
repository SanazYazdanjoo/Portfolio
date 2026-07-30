import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData } from "../projects/project-4/data";
import { getProject } from "../data/projects";

describe("Research phases section", () => {
  it("renders every phase from the project data", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    projectData.phases.forEach((p) => {
      expect(screen.getByText(p.phase)).toBeInTheDocument();
    });
  });

  it("labels each status in text, not colour alone (WCAG 1.4.1)", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    // At least one of each status word the data actually uses must be visible.
    const used = new Set(projectData.phases.map((p) => p.status));
    const expected = {
      complete: "Complete",
      "in-progress": "In progress",
      planned: "Planned",
      blocked: "Blocked",
    };
    used.forEach((status) => {
      expect(screen.getAllByText(expected[status]).length).toBeGreaterThan(0);
    });
  });

  it("omits the section entirely for projects without phases", () => {
    const { phases, phasesIntro, ...withoutPhases } = projectData;
    renderWithProviders(<ProjectTemplate meta={withoutPhases} />);
    expect(screen.queryByText("Research Phases")).not.toBeInTheDocument();
  });
});

describe("Reimbursement case study is live", () => {
  it("is published and therefore has a real href", () => {
    const p = getProject("project-4");
    expect(p).toBeDefined();
    expect(p.status).toBe("published");
    expect(p.href).toBe("/projects/project-4");
  });

  it("stays anonymised — no internal system names or institution in any string", () => {
    const serialised = JSON.stringify(projectData);
    // Report §8.3: internal system names and network paths must never ship.
    ["eDoc", "EKN", "T:\\", "Bauhaus"].forEach((term) => {
      expect(serialised).not.toContain(term);
    });
  });
});
