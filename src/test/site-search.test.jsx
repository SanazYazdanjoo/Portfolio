// Site search: the nav trigger, the dialog's lightbox contract (Escape,
// focus, corner parking), and the index it searches (pages from the
// translation maps, projects from the card glob, tags from getTagData).

import { describe, it, expect } from "vitest";
import { useLocation } from "react-router-dom";
import { renderWithProviders, screen, fireEvent, within } from "./renderWithProviders";
import { SiteSearch } from "../components/SiteSearch";
import { searchSite, MIN_QUERY_LENGTH } from "../utils/searchIndex";

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

const openSearch = () => {
  fireEvent.click(screen.getByRole("button", { name: /search this site/i }));
  return screen.getByRole("combobox");
};

describe("SiteSearch dialog", () => {
  it("opens from the nav trigger with the field focused, and Escape closes and returns focus", () => {
    renderWithProviders(<SiteSearch />);
    const trigger = screen.getByRole("button", { name: /search this site/i });

    const input = openSearch();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(input).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("opens and closes on Ctrl+K", () => {
    renderWithProviders(<SiteSearch />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("declares the scrim a corner occupant so the FABs park", () => {
    renderWithProviders(<SiteSearch />);
    openSearch();
    expect(document.querySelector("[data-corner-cta]")).toBeInTheDocument();
  });

  it("locks body scroll while open and restores it on close", () => {
    renderWithProviders(<SiteSearch />);
    openSearch();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(document.body.style.overflow).toBe("");
  });

  it("finds a case study by title and links to its detail page", () => {
    renderWithProviders(<SiteSearch />);
    const input = openSearch();
    fireEvent.change(input, { target: { value: "gaze" } });

    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getByText("Case Studies")).toBeInTheDocument();
    const link = within(listbox).getByRole("link", { name: /gaze-assisted input/i });
    expect(link).toHaveAttribute("href", "/projects/gaze-assisted-input");
  });

  it("finds a static page through its translated body copy", () => {
    renderWithProviders(<SiteSearch />);
    const input = openSearch();
    fireEvent.change(input, { target: { value: "privacy" } });

    const listbox = screen.getByRole("listbox");
    const link = within(listbox).getByRole("link", { name: /privacy policy/i });
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("finds tags and links into the tag directory", () => {
    renderWithProviders(<SiteSearch />);
    const input = openSearch();
    fireEvent.change(input, { target: { value: "eye-tracking" } });

    const links = within(screen.getByRole("listbox")).getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toContain("/tags/Eye-Tracking");
  });

  it("shows the hint below the minimum query length and the empty state on no match", () => {
    renderWithProviders(<SiteSearch />);
    const input = openSearch();

    fireEvent.change(input, { target: { value: "g" } });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByText(/type at least two characters/i)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "zzqqxx" } });
    expect(screen.getByText(/nothing matches that yet/i)).toBeInTheDocument();
  });

  it("moves the active option with the arrow keys and opens it with Enter", () => {
    renderWithProviders(
      <>
        <SiteSearch />
        <LocationProbe />
      </>
    );
    const input = openSearch();
    fireEvent.change(input, { target: { value: "gaze" } });

    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAttribute("aria-selected", "true");

    if (options.length > 1) {
      fireEvent.keyDown(input, { key: "ArrowDown" });
      expect(options[0]).toHaveAttribute("aria-selected", "false");
      expect(options[1]).toHaveAttribute("aria-selected", "true");
      fireEvent.keyDown(input, { key: "ArrowUp" });
      expect(options[0]).toHaveAttribute("aria-selected", "true");
    }

    fireEvent.keyDown(input, { key: "Enter" });
    expect(screen.getByTestId("location")).toHaveTextContent("/projects/gaze-assisted-input");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("searchSite index", () => {
  it("returns nothing below the minimum query length", () => {
    const result = searchSite("a".repeat(MIN_QUERY_LENGTH - 1), "en");
    expect(result.projects).toHaveLength(0);
    expect(result.pages).toHaveLength(0);
    expect(result.tags).toHaveLength(0);
  });

  it("searches the German translations when lang is de", () => {
    const { pages } = searchSite("Datenschutz", "de");
    expect(pages.map((p) => p.href)).toContain("/privacy");
  });

  it("requires every token of a multi-word query", () => {
    const hit = searchSite("gaze input", "en");
    expect(hit.projects.map((p) => p.href)).toContain("/projects/gaze-assisted-input");

    const miss = searchSite("gaze zzqqxx", "en");
    expect(miss.projects).toHaveLength(0);
  });

  it("never returns a result without a destination", () => {
    for (const group of Object.values(searchSite("design", "en"))) {
      for (const item of group) expect(item.href).toBeTruthy();
    }
  });
});
