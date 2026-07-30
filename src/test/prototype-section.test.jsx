import { describe, it, expect } from "vitest";
import { screen, within, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData as baseProject } from "../projects/project-1/data";

function metaWithout(extra = {}) {
  // project-1 has no prototype fields at all — a clean base to add just the
  // field(s) each test cares about, without a real prototype build/URL.
  return { ...baseProject, ...extra };
}

describe("Prototype section — off by default", () => {
  it("doesn't render for a project with no prototype fields", () => {
    renderWithProviders(<ProjectTemplate meta={baseProject} />);
    expect(screen.queryByRole("heading", { name: /prototype/i })).not.toBeInTheDocument();
  });
});

describe("Prototype section — three ways to activate it", () => {
  it("shows up from prototype text alone", () => {
    renderWithProviders(
      <ProjectTemplate meta={metaWithout({ prototype: "Here is what I built." })} />
    );
    expect(screen.getByRole("heading", { name: /prototype/i })).toBeInTheDocument();
  });

  it("shows up from a prototype URL alone, with no description text", () => {
    renderWithProviders(
      <ProjectTemplate meta={metaWithout({ prototypeUrl: "https://example.com/demo" })} />
    );
    expect(screen.getByRole("heading", { name: /prototype/i })).toBeInTheDocument();
  });

  it("shows up from prototype figures alone, with no text or link", () => {
    renderWithProviders(
      <ProjectTemplate
        meta={metaWithout({
          figures: { prototype: [{ src: "/shot.webp", alt: "Dashboard screenshot" }] },
        })}
      />
    );
    expect(screen.getByRole("heading", { name: /prototype/i })).toBeInTheDocument();
    expect(screen.getByAltText("Dashboard screenshot")).toBeInTheDocument();
  });
});

describe("Prototype CTA link", () => {
  it("opens in a new tab safely and uses the default label", () => {
    renderWithProviders(
      <ProjectTemplate meta={metaWithout({ prototypeUrl: "https://example.com/demo" })} />
    );
    fireEvent.click(within(screen.getByRole("heading", { name: /prototype/i })).getByRole("button"));

    const link = screen.getByRole("link", { name: /open the prototype/i });
    expect(link).toHaveAttribute("href", "https://example.com/demo");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("uses a custom label when one is provided", () => {
    renderWithProviders(
      <ProjectTemplate
        meta={metaWithout({
          prototypeUrl: "https://example.com/demo",
          prototypeUrlLabel: "Try the live dashboard",
        })}
      />
    );
    fireEvent.click(within(screen.getByRole("heading", { name: /prototype/i })).getByRole("button"));

    expect(screen.getByRole("link", { name: /try the live dashboard/i })).toBeInTheDocument();
  });

  it("does not render a link when no prototypeUrl is given", () => {
    renderWithProviders(
      <ProjectTemplate meta={metaWithout({ prototype: "Text only, no link yet." })} />
    );
    fireEvent.click(within(screen.getByRole("heading", { name: /prototype/i })).getByRole("button"));

    expect(screen.queryByRole("link", { name: /open the prototype/i })).not.toBeInTheDocument();
  });
});

describe("Prototype section respects the closed-by-default accordion", () => {
  it("starts collapsed like every other section", () => {
    renderWithProviders(
      <ProjectTemplate meta={metaWithout({ prototype: "Here is what I built." })} />
    );
    const heading = screen.getByRole("heading", { name: /prototype/i });
    expect(within(heading).getByRole("button")).toHaveAttribute("aria-expanded", "false");
  });
});
