import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData } from "../projects/gaze-assisted-input/data";

describe("ProjectTemplate", () => {
  it("renders challenge figures when they exist in the project data", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(screen.getByAltText("challenge")).toBeInTheDocument();
  });
});
