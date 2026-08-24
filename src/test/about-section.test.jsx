// The About section is the reader's first stop on every case study — it sits
// directly under the header's Skills row and carries the two-to-three-line
// plain-language summary. Both halves of that contract are asserted here: the
// section renders, and every project supplies the `about` copy it renders from.
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { fullProjects as projects } from "./fullProjects";
import { projectData } from "../projects/gaze-assisted-input/data";

describe("About section", () => {
  it("renders the About heading and the project's about copy", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.getByText("About the Project")).toBeInTheDocument();
    expect(screen.getByText(projectData.about.en)).toBeInTheDocument();
  });

  it("is present in every project's data, in both languages", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.about, `${project.slug} is missing \`about\``).toBeTruthy();
      expect(typeof project.about.en).toBe("string");
      expect(typeof project.about.de).toBe("string");
      expect(project.about.en.trim().length).toBeGreaterThan(0);
      expect(project.about.de.trim().length).toBeGreaterThan(0);
    }
  });
});
