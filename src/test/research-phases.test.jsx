import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData } from "../projects/project-4/data";
import { getProject, sortedProjects } from "../data/projects";

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
    const withoutPhases = { ...projectData };
    delete withoutPhases.phases;
    delete withoutPhases.phasesIntro;
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
    ["eDoc", "EKN", "T:\\", "Bauhaus", "Kristin"].forEach((term) => {
      expect(serialised).not.toContain(term);
    });
  });
});

describe("Project display order", () => {
  it("lists projects in explicit order with the reimbursement study third", () => {
    expect(sortedProjects.map((p) => p.slug)).toEqual([
      "project-1",
      "project-2",
      "project-4", // reimbursement service — displays as 03
      "project-3", // EmbraceMe — displays as 04
    ]);
  });

  it("keeps every published URL stable — folder names are the routes", () => {
    const byOrder = Object.fromEntries(sortedProjects.map((p) => [p.slug, p.href]));
    expect(byOrder["project-3"]).toBe("/projects/project-3"); // EmbraceMe, unmoved
    expect(byOrder["project-4"]).toBe("/projects/project-4");
  });

  it("declares a unique explicit order on every published project", () => {
    const orders = sortedProjects.map((p) => p.order);
    expect(orders.every((o) => typeof o === "number")).toBe(true);
    expect(new Set(orders).size).toBe(orders.length);
  });
});
