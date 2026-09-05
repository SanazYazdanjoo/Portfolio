// The phone rendering of a case study is a plain document.
//
// Four rounds of layer surgery (8e6a8c4, ada7454, 64850e0, 41c1228) each
// removed a real cause of "the page shakes on my phone" and each left it
// still shaking — while every screenshot looked fine, the signature of an
// alternation between valid frames rather than one broken one. The answer
// this file pins is structural: below md, nothing on the page is pinned,
// nothing listens to the scroll, and nothing re-renders because of it.
//
// jsdom has no layout, so "a phone" is a matchMedia stub that answers the
// template's `(max-width: 767px)` query with a match. What is asserted is
// what the DOM and the observer constructors can show: no sticky element,
// no scroll-progress bar, no scroll-spy observer, and the in-flow index in
// the bar's place. Desktop is asserted alongside, so the switch is known to
// be a switch and not a deletion.

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, renderWithProviders, screen, within } from "./renderWithProviders";
import ProjectTemplate from "../projects/ProjectTemplate";
import { projectData } from "../projects/gaze-assisted-input/gaze-assisted-input.data";

const MOBILE_QUERY = "(max-width: 767px)";
// The spy's band — the one rootMargin only useSectionState uses.
const SPY_MARGIN = "-10% 0px -60% 0px";

let observers;

function stubViewport({ mobile }) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query) => ({
      matches: mobile && query === MOBILE_QUERY,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    }))
  );
}

beforeEach(() => {
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback, opts) {
        this.callback = callback;
        this.opts = opts;
        observers.push(this);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const spyObservers = () => observers.filter((o) => o.opts?.rootMargin === SPY_MARGIN);

describe("project page on a phone", () => {
  beforeEach(() => stubViewport({ mobile: true }));

  it("pins nothing: no sticky element and no transform-promoted layer in the page", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={projectData} />);
    // The sidebar is `hidden md:block` — a Tailwind class, present in the
    // DOM at every width — so it is excluded by its own hidden class, and
    // what must be absent is anything sticky the phone would actually show.
    const sticky = [...container.querySelectorAll(".sticky")].filter(
      (el) => !el.className.includes("hidden")
    );
    expect(sticky).toHaveLength(0);
    expect(container.querySelector('[style*="translateZ"]')).toBeNull();
  });

  it("renders the in-flow section index with every section, in order", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    const index = screen.getByRole("navigation", { name: /on this page/i });
    expect(index.className).not.toContain("sticky");
    expect(index).toHaveAttribute("data-corner-cta");

    const entries = within(index).getAllByRole("button");
    const ids = entries.map((b) => b.getAttribute("data-section-id"));
    // Every entry points at a rendered section, in document order.
    const rendered = [...document.querySelectorAll("article section[id]")].map((s) => s.id);
    expect(ids).toEqual(rendered);
    expect(within(index).getByText("On this page")).toBeInTheDocument();
  });

  it("mounts no scroll-spy and no scroll-progress bar", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(spyObservers()).toHaveLength(0);
    // The progress bar portals to <body> as a fixed strip driven by scaleX.
    expect(document.body.querySelector(".fixed.top-0.h-\\[5px\\]")).toBeNull();
  });

  it("the index still opens and scrolls to a section a reader closed", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    const heading = screen.getByRole("heading", { name: /solution/i, level: 2 });
    fireEvent.click(within(heading).getByRole("button"));
    expect(within(heading).getByRole("button")).toHaveAttribute("aria-expanded", "false");

    const index = screen.getByRole("navigation", { name: /on this page/i });
    const target = document.getElementById("solution");
    target.scrollIntoView = vi.fn();
    fireEvent.click(within(index).getByRole("button", { name: /solution/i }));

    expect(within(heading).getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(target.scrollIntoView).toHaveBeenCalled();
  });

  it("sections and the header are plain elements — no framer inline styles", () => {
    const { container } = renderWithProviders(<ProjectTemplate meta={projectData} />);
    // framer-motion writes its animated values as inline style; a plain
    // <section> carries none. The collapsible body's grid is the one inline
    // style a section legitimately has, and it lives on a child, not here.
    for (const section of container.querySelectorAll("article section[id]")) {
      expect(section.getAttribute("style")).toBeNull();
    }
    expect(container.querySelector("header").getAttribute("style")).toBeNull();
  });
});

describe("project page on a desktop", () => {
  beforeEach(() => stubViewport({ mobile: false }));

  it("keeps the scroll-spy and the progress bar", () => {
    renderWithProviders(<ProjectTemplate meta={projectData} />);
    expect(spyObservers()).toHaveLength(1);
    expect(document.body.querySelector(".fixed.top-0.h-\\[5px\\]")).not.toBeNull();
  });
});
