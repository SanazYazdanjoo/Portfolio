// The corner contract (hooks/useCornerOccupied.js): any element carrying
// `data-corner-cta` claims the viewport's bottom-right corner while it is
// there, and the floating FABs — the ASK AI pill sitewide, the prototype
// badge on phones — park so two tap targets are never stacked. z-index
// cannot arbitrate this collision: the FABs are shell-level fixed elements
// while the occupants live inside the scroll container's own stacking
// context, so the layers cannot interleave (observed on a reader's
// recording: the pill sat exactly on the pill bar's DESIGN tab and
// swallowed its taps).
//
// jsdom has no layout, so "in the corner" is played by a controllable
// IntersectionObserver; what these tests pin is the machinery around it —
// that occupants are discovered whenever they mount, that parking follows
// occupancy in both directions, and that the two new occupants declare
// themselves.

import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, renderWithProviders, screen, waitFor } from "./renderWithProviders";
import { AskPortfolio } from "../components/AskPortfolio";
import { Nav } from "../components/Nav";
import { MobilePillBar } from "../projects/template/SectionNav";

// Set-tracking fake: tests can ask what the hook observes and push
// enter/leave notifications for a specific element.
let io;

beforeEach(() => {
  io = null;
  vi.stubGlobal("fetch", vi.fn());
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback, opts) {
        this.callback = callback;
        this.opts = opts;
        this.observed = new Set();
        io = this;
      }
      observe(el) {
        this.observed.add(el);
      }
      unobserve(el) {
        this.observed.delete(el);
      }
      disconnect() {
        this.observed.clear();
      }
      enter(el) {
        act(() => this.callback([{ target: el, isIntersecting: true }]));
      }
      leave(el) {
        act(() => this.callback([{ target: el, isIntersecting: false }]));
      }
    }
  );
});

// Only the occupants these tests hand-mounted get swept here — a rendered
// component's own [data-corner-cta] node belongs to React, and pulling it
// out from under RTL's cleanup makes the unmount throw.
const mounted = [];

afterEach(() => {
  vi.unstubAllGlobals();
  mounted.splice(0).forEach((el) => el.remove());
});

function mountOccupant() {
  const el = document.createElement("div");
  el.setAttribute("data-corner-cta", "");
  document.body.appendChild(el);
  mounted.push(el);
  return el;
}

describe("AskPortfolio corner parking", () => {
  it("watches occupants that mount AFTER it — the lazy-loaded routes", async () => {
    // The routes render under Suspense (App.jsx), so a project page's
    // occupants do not exist yet when the pill mounts. A one-shot
    // querySelectorAll at mount misses them all — this pins the
    // MutationObserver that keeps the watched set current.
    renderWithProviders(<AskPortfolio />);
    const late = mountOccupant();
    await waitFor(() => expect(io.observed.has(late)).toBe(true));
  });

  it("parks the pill while an occupant holds the corner, and returns it after", async () => {
    renderWithProviders(<AskPortfolio />);
    const fab = screen.getByRole("button", { name: /ask ai/i });
    const chip = mountOccupant();
    await waitFor(() => expect(io.observed.has(chip)).toBe(true));

    io.enter(chip);
    // Parked = invisible, untappable, and out of the a11y tree + tab order.
    expect(fab.className).toContain("pointer-events-none");
    expect(fab).toHaveAttribute("aria-hidden", "true");
    expect(fab).toHaveAttribute("tabindex", "-1");

    io.leave(chip);
    expect(fab.className).not.toContain("pointer-events-none");
    expect(fab).not.toHaveAttribute("aria-hidden");
  });

  it("frees the corner when an occupant unmounts without ever leaving", async () => {
    // A removed element reports no exit intersection — the hamburger menu
    // overlay unmounts in place, and without pruning it would park the
    // pill forever.
    renderWithProviders(<AskPortfolio />);
    const fab = screen.getByRole("button", { name: /ask ai/i });
    const overlay = mountOccupant();
    await waitFor(() => expect(io.observed.has(overlay)).toBe(true));

    io.enter(overlay);
    expect(fab).toHaveAttribute("aria-hidden", "true");

    overlay.remove();
    await waitFor(() => expect(fab).not.toHaveAttribute("aria-hidden"));
  });

  it("never parks an open panel's pill — a reader mid-conversation keeps it", async () => {
    renderWithProviders(<AskPortfolio />);
    const fab = screen.getByRole("button", { name: /ask ai/i });
    fireEvent.click(fab);
    await screen.findByRole("dialog");

    const chip = mountOccupant();
    await waitFor(() => expect(io.observed.has(chip)).toBe(true));
    io.enter(chip);

    expect(fab).not.toHaveAttribute("aria-hidden");
    expect(fab.className).not.toContain("pointer-events-none");
  });
});

describe("the occupants declare themselves", () => {
  it("the mobile pill bar, for its in-flow transit past the pill", () => {
    const sections = [{ id: "about", label: "ABOUT" }];
    const { container } = renderWithProviders(
      <MobilePillBar sections={sections} activeId="about" onNavigate={() => {}} />
    );
    const bar = container.querySelector("[data-corner-cta]");
    expect(bar).not.toBeNull();
    expect(bar.className).toContain("sticky");
  });

  it("the open hamburger menu, whose z-[60] cannot outrank a shell-level pill", async () => {
    renderWithProviders(<Nav />);
    expect(document.querySelector("[data-corner-cta]")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const overlay = await waitFor(() => {
      const el = document.querySelector("[data-corner-cta]");
      expect(el).not.toBeNull();
      return el;
    });
    expect(overlay.className).toContain("fixed");
  });
});
