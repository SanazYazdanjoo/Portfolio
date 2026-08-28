// The mobile pill bar's auto-centring (template/SectionNav.jsx).
//
// A reader's recording proved the scroll-spy fix without ever driving the
// strip past scrollLeft 0 — the active pill only reached position 2, where
// centring is impossible anyway (you cannot scroll left past zero). So the
// centring path itself had never been exercised. This file exercises it at
// every depth that recording missed: mid-list, the 5th tab, and the last
// tab, where the ideal centre overshoots the track and the browser clamp
// takes over.
//
// jsdom has no layout, so a phone's geometry is installed by hand and what
// the test verifies is the centring MATH: the scrollTo target the effect
// computes, after the clamping a real browser applies, must leave the
// active pill fully inside the strip's visible window. On-device visibility
// still needs eyes on a phone; this pins the arithmetic those eyes would
// check.

import { describe, it, expect } from "vitest";
import { renderWithProviders } from "./renderWithProviders";
import { MobilePillBar } from "../projects/template/SectionNav";

const SECTIONS = ["about", "challenge", "solution", "design", "research", "wireframes"].map(
  (id) => ({ id, label: id.toUpperCase() })
);

// A 390px phone: 358px strip viewport (bar padding off), 96px pills, 4px gap.
const CLIENT_WIDTH = 358;
const PILL_WIDTH = 96;
const STEP = PILL_WIDTH + 4;
const SCROLL_WIDTH = SECTIONS.length * STEP - 4 + 32; // + the strip's pr-8

// What a real browser does to a requested scrollLeft.
const clampToTrack = (left) => Math.min(Math.max(0, left), SCROLL_WIDTH - CLIENT_WIDTH);

function installGeometry(container) {
  const strip = container.querySelector(".overflow-x-auto");
  Object.defineProperty(strip, "clientWidth", { value: CLIENT_WIDTH, configurable: true });
  Object.defineProperty(strip, "scrollWidth", { value: SCROLL_WIDTH, configurable: true });
  // The mock applies the write, like a real browser: the effect's fixed-point
  // guard reads scrollLeft back, and against a mock that never moves it would
  // re-issue the same scroll forever — the exact failure mode it guards.
  let scrollLeft = 0;
  Object.defineProperty(strip, "scrollLeft", {
    get: () => scrollLeft,
    set: (v) => { scrollLeft = v; },
    configurable: true,
  });
  const calls = [];
  strip.scrollTo = (opts) => {
    calls.push(opts.left);
    scrollLeft = opts.left;
  };
  strip.querySelectorAll("[data-section-id]").forEach((pill, i) => {
    Object.defineProperty(pill, "offsetLeft", { value: i * STEP, configurable: true });
    Object.defineProperty(pill, "offsetWidth", { value: PILL_WIDTH, configurable: true });
  });
  return calls;
}

function driveSpyTo(activeId) {
  const { container, rerender } = renderWithProviders(
    <MobilePillBar sections={SECTIONS} activeId="about" onNavigate={() => {}} />
  );
  const calls = installGeometry(container);
  rerender(<MobilePillBar sections={SECTIONS} activeId={activeId} onNavigate={() => {}} />);
  return calls;
}

describe("MobilePillBar auto-centring", () => {
  it.each([
    ["solution", 2],
    ["design", 3],
    ["research", 4], // the 5th tab
    ["wireframes", 5], // last tab: the ideal centre overshoots, the clamp takes over
  ])("keeps the %s pill fully inside the strip's visible bounds", (activeId, index) => {
    const calls = driveSpyTo(activeId);

    expect(calls.length).toBeGreaterThan(0);
    const requested = calls[calls.length - 1];
    // The component's own floor: it must never ask for a negative scroll.
    expect(requested).toBeGreaterThanOrEqual(0);

    const scrollLeft = clampToTrack(requested);
    const pillLeft = index * STEP;
    const pillRight = pillLeft + PILL_WIDTH;
    expect(pillLeft).toBeGreaterThanOrEqual(scrollLeft);
    expect(pillRight).toBeLessThanOrEqual(scrollLeft + CLIENT_WIDTH);
  });

  it("issues no scroll at all near the start — the clamp lands on the fixed point", () => {
    // Position 1's ideal centre is negative (offsetLeft 100 − 131), which
    // clamps to 0 — and the strip already sits at 0, so the fixed-point
    // guard must swallow the write entirely. Re-issuing even a no-op scroll
    // here is what the guard exists to prevent: an echoed no-op is the seed
    // of the observer→scroll feedback loop (see section-nav-stability).
    const calls = driveSpyTo("challenge");
    expect(calls).toHaveLength(0);
  });
});
