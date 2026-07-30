import { describe, it, expect } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as project1 } from "../projects/project-1/data";
import { projectData as project4 } from "../projects/project-4/data";

// Sections whose body is closed with height:0 still have that height applied
// via inline style (the CSS grid 0fr/1fr trick), not by unmounting — so we
// assert on the style/aria-hidden state rather than absence from the DOM.
function bodyFor(id) {
  return document.getElementById(`${id}-body`);
}

describe("Collapsible sections — closed by default", () => {
  it("every section body starts collapsed", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    ["challenge", "solution", "methodology", "results"].forEach((id) => {
      const body = bodyFor(id);
      if (body) {
        expect(body).toHaveAttribute("aria-hidden", "true");
        expect(body.style.gridTemplateRows).toBe("0fr");
      }
    });
  });

  it("every section header is a collapsed toggle button", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const heading = screen.getByRole("heading", { name: /the challenge|challenge/i, level: 2 });
    const button = within(heading).getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking a section header opens it", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const heading = screen.getAllByRole("heading", { level: 2 })[0];
    const button = within(heading).getByRole("button");

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking an open header closes it again", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const heading = screen.getAllByRole("heading", { level: 2 })[0];
    const button = within(heading).getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Expand all / Collapse all", () => {
  it("opens every section and flips its own label", () => {
    renderWithProviders(<ProjectTemplate meta={project4} />);
    const toggle = screen.getByRole("button", { name: /expand all/i });

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: /collapse all/i })).toBeInTheDocument();
    screen.getAllByRole("heading", { level: 2 }).forEach((h) => {
      const btn = within(h).queryByRole("button");
      if (btn) expect(btn).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("collapse all returns every section to closed", () => {
    renderWithProviders(<ProjectTemplate meta={project4} />);
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));
    fireEvent.click(screen.getByRole("button", { name: /collapse all/i }));

    screen.getAllByRole("heading", { level: 2 }).forEach((h) => {
      const btn = within(h).queryByRole("button");
      if (btn) expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });
});

describe("Sidebar navigation opens the target section", () => {
  it("clicking a sidebar link opens that section even though it starts closed", () => {
    renderWithProviders(<ProjectTemplate meta={project4} />);

    // Sidebar renders inside <nav aria-label="Page sections">, distinct from
    // the mobile pill bar which uses the same section labels.
    const nav = screen.getByRole("navigation", { name: /page sections/i });
    const link = within(nav).getByRole("button", { name: /challenge/i });

    fireEvent.click(link);

    const heading = screen.getAllByRole("heading", { level: 2 })
      .find((h) => within(h).queryByRole("button", { name: /challenge/i }));
    expect(within(heading).getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Heading markup is valid", () => {
  it("never nests a heading inside a button (invalid content model)", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={project4} />);
    container.querySelectorAll("button").forEach((btn) => {
      expect(btn.querySelector("h1,h2,h3,h4,h5,h6")).toBeNull();
    });
  });
});
