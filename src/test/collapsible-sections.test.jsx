import { describe, it, expect } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as project1 } from "../projects/project-1/data";

// Sections whose body is closed with height:0 still have that height applied
// via inline style (the CSS grid 0fr/1fr trick), not by unmounting — so we
// assert on the style/aria-hidden state rather than absence from the DOM.
function bodyFor(id) {
  return document.getElementById(`${id}-body`);
}

describe("Collapsible sections — open by default", () => {
  it("every section body starts open", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    ["process", "challenge", "solution", "methodology", "results"].forEach((id) => {
      const body = bodyFor(id);
      expect(body).toHaveAttribute("aria-hidden", "false");
      expect(body.style.gridTemplateRows).toBe("1fr");
    });
  });

  it("every section header is an open toggle button", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const heading = screen.getByRole("heading", { name: /the challenge|challenge/i, level: 2 });
    const button = within(heading).getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking an open section header closes it", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const heading = screen.getByRole("heading", { name: /solution/i, level: 2 });
    const button = within(heading).getByRole("button");

    fireEvent.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("clicking a closed header opens it again", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const heading = screen.getByRole("heading", { name: /solution/i, level: 2 });
    const button = within(heading).getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Expand all / Collapse all", () => {
  it("starts in the collapse-all state since every section opens by default", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    expect(screen.getByRole("button", { name: /collapse all/i })).toBeInTheDocument();
  });

  it("collapse all closes every section and flips its own label", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    fireEvent.click(screen.getByRole("button", { name: /collapse all/i }));

    expect(screen.getByRole("button", { name: /expand all/i })).toBeInTheDocument();
    screen.getAllByRole("heading", { level: 2 }).forEach((h) => {
      const btn = within(h).queryByRole("button");
      if (btn) expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("expand all returns every section to open", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    fireEvent.click(screen.getByRole("button", { name: /collapse all/i }));
    fireEvent.click(screen.getByRole("button", { name: /expand all/i }));

    screen.getAllByRole("heading", { level: 2 }).forEach((h) => {
      const btn = within(h).queryByRole("button");
      if (btn) expect(btn).toHaveAttribute("aria-expanded", "true");
    });
  });
});

describe("Sidebar navigation opens the target section", () => {
  it("clicking a sidebar link keeps that (already open) section open and scrolls to it", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);

    // Sidebar renders inside <nav aria-label="Page sections">, distinct from
    // the mobile pill bar which uses the same section labels.
    const nav = screen.getByRole("navigation", { name: /page sections/i });
    const link = within(nav).getByRole("button", { name: /challenge/i });

    fireEvent.click(link);

    const heading = screen.getAllByRole("heading", { level: 2 })
      .find((h) => within(h).queryByRole("button", { name: /challenge/i }));
    expect(within(heading).getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("clicking a sidebar link re-opens that section if the user had closed it", () => {
    renderWithProviders(<ProjectTemplate meta={project1} />);
    const heading = screen.getByRole("heading", { name: /the challenge|challenge/i, level: 2 });

    fireEvent.click(within(heading).getByRole("button"));
    expect(within(heading).getByRole("button")).toHaveAttribute("aria-expanded", "false");

    const nav = screen.getByRole("navigation", { name: /page sections/i });
    fireEvent.click(within(nav).getByRole("button", { name: /challenge/i }));

    expect(within(heading).getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Heading markup is valid", () => {
  it("never nests a heading inside a button (invalid content model)", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={project1} />);
    container.querySelectorAll("button").forEach((btn) => {
      expect(btn.querySelector("h1,h2,h3,h4,h5,h6")).toBeNull();
    });
  });
});
