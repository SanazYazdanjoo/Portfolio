// The infinite-oscillation regression (iOS Safari, observed on e59c0a0).
//
// Measured on-device: with the page at rest, the content of the app's one
// vertical scroller alternated between two positions exactly 50 CSS px
// apart, every frame, indefinitely — while the pill strip's own scrollLeft
// never moved. The loop: a section boundary rested inside the scroll-spy's
// band, the per-section observers had no deterministic winner so activeId
// flapped A↔B on sub-pixel jitter, and every flap re-issued the pill bar's
// `strip.scrollTo({ behavior: "smooth" })` before the previous smooth
// animation had produced a single frame — a pile of never-settling
// animations the engine ended up applying around the page scroller.
//
// The fix breaks the loop at both ends, and this file pins each break in
// jsdom terms:
//   1. however hard the spy churns, the vertical scroll container's
//      scrollTop stays untouched across N simulated frames (the bug's
//      literal symptom, asserted as an invariant);
//   2. every centring write is instant (`behavior: "instant"`) and
//      horizontal-only (no `top`), so no animation survives the frame;
//   3. centring converges: an already-centred strip gets NO further write,
//      so any observer → setState → effect echo terminates at its fixed
//      point instead of oscillating;
//   4. the spy is deterministic: the same set of in-band sections resolves
//      to the same active id whatever order the entries arrive, so a
//      static page can never flap activeId at all;
//   5. a tap-initiated programmatic scroll suspends the spy until
//      `scrollend` — the isProgrammaticScroll guard — so the sections
//      flying past cannot re-trigger the chain that caused the scroll.

import React, { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, renderWithProviders } from "./renderWithProviders";
import { MobilePillBar } from "../projects/template/SectionNav";
import { useSectionState } from "../projects/template/useSectionState";

// ─── The pill bar inside a page scroller ────────────────────────────────────

const SECTIONS = ["about", "challenge", "solution", "design", "research", "wireframes"].map(
  (id) => ({ id, label: id.toUpperCase() })
);

// Same phone geometry as section-nav.test.jsx: 358px strip viewport,
// 96px pills, 4px gap.
const CLIENT_WIDTH = 358;
const PILL_WIDTH = 96;
const STEP = PILL_WIDTH + 4;
const SCROLL_WIDTH = SECTIONS.length * STEP - 4 + 32;

function Harness({ activeId }) {
  return (
    <div className="overflow-y-auto" data-testid="page-scroller">
      <MobilePillBar sections={SECTIONS} activeId={activeId} onNavigate={() => {}} />
    </div>
  );
}

// Strip mock that APPLIES writes, like a real browser — the fixed-point
// guard reads scrollLeft back.
function installStrip(container) {
  const strip = container.querySelector(".overflow-x-auto");
  Object.defineProperty(strip, "clientWidth", { value: CLIENT_WIDTH, configurable: true });
  Object.defineProperty(strip, "scrollWidth", { value: SCROLL_WIDTH, configurable: true });
  let scrollLeft = 0;
  Object.defineProperty(strip, "scrollLeft", {
    get: () => scrollLeft,
    set: (v) => { scrollLeft = v; },
    configurable: true,
  });
  const calls = [];
  strip.scrollTo = (opts) => {
    calls.push(opts);
    scrollLeft = opts.left;
  };
  strip.querySelectorAll("[data-section-id]").forEach((pill, i) => {
    Object.defineProperty(pill, "offsetLeft", { value: i * STEP, configurable: true });
    Object.defineProperty(pill, "offsetWidth", { value: PILL_WIDTH, configurable: true });
  });
  return calls;
}

// The vertical scroller records every way code could move it. The recording
// showed it mid-page; 1234 stands in for "somewhere deep in the article".
function installScroller(scroller) {
  let scrollTop = 1234;
  const verticalWrites = [];
  Object.defineProperty(scroller, "scrollTop", {
    get: () => scrollTop,
    set: (v) => { verticalWrites.push(["scrollTop", v]); scrollTop = v; },
    configurable: true,
  });
  scroller.scrollTo = (...args) => verticalWrites.push(["scrollTo", ...args]);
  scroller.scrollBy = (...args) => verticalWrites.push(["scrollBy", ...args]);
  return verticalWrites;
}

describe("pill-bar centring vs the page scroller", () => {
  it("leaves the container's scrollTop untouched across N frames of spy flapping", () => {
    const { container, rerender, getByTestId } = renderWithProviders(<Harness activeId="about" />);
    const calls = installStrip(container);
    const scroller = getByTestId("page-scroller");
    const verticalWrites = installScroller(scroller);

    // The measured failure mode: the spy alternates between two adjacent
    // sections every frame, forever. 20 frames of the worst case.
    const flap = ["design", "research"];
    for (let frame = 0; frame < 20; frame++) {
      rerender(<Harness activeId={flap[frame % 2]} />);
      expect(scroller.scrollTop).toBe(1234);
    }

    expect(verticalWrites).toHaveLength(0);
    // The centring itself must still be alive — breaking the loop by never
    // scrolling the strip would be the old dead-centring bug in new clothes.
    expect(calls.length).toBeGreaterThan(0);
  });

  it("writes instantly and horizontally only — nothing an engine can keep animating", () => {
    const { container, rerender } = renderWithProviders(<Harness activeId="about" />);
    const calls = installStrip(container);

    rerender(<Harness activeId="design" />);
    rerender(<Harness activeId="research" />);
    rerender(<Harness activeId="wireframes" />);

    expect(calls.length).toBeGreaterThan(0);
    for (const opts of calls) {
      expect(opts.behavior).toBe("instant");
      expect(opts.top).toBeUndefined();
    }
  });

  it("converges: an already-centred strip receives no further write", () => {
    const { container, rerender } = renderWithProviders(<Harness activeId="about" />);
    const calls = installStrip(container);

    rerender(<Harness activeId="design" />);
    const afterFirst = calls.length;
    expect(afterFirst).toBeGreaterThan(0);

    // The same state again — a re-render, an observer echo, anything that
    // re-runs the effect against a strip already at the target — must be a
    // no-op. This is the fixed point that makes a feedback loop impossible.
    rerender(<Harness activeId="design" />);
    rerender(<Harness activeId="design" />);
    rerender(<Harness activeId="design" />);
    expect(calls.length).toBe(afterFirst);
  });
});

// ─── The scroll-spy ─────────────────────────────────────────────────────────

let io;

beforeEach(() => {
  io = null;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback, opts) {
        this.callback = callback;
        this.opts = opts;
        this.observed = new Set();
        io = this;
      }
      observe(el) { this.observed.add(el); }
      unobserve(el) { this.observed.delete(el); }
      disconnect() { this.observed.clear(); }
      trigger(states) {
        act(() =>
          this.callback(
            states.map(([target, isIntersecting]) => ({ target, isIntersecting }))
          )
        );
      }
    }
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.querySelectorAll("[data-spy-scroller]").forEach((el) => el.remove());
});

const SPY_SECTIONS = [{ id: "alpha" }, { id: "beta" }, { id: "gamma" }];

function mountSections() {
  const scroller = document.createElement("div");
  scroller.className = "overflow-y-auto";
  scroller.setAttribute("data-spy-scroller", "");
  document.body.appendChild(scroller);
  const els = {};
  for (const { id } of SPY_SECTIONS) {
    const s = document.createElement("section");
    s.id = id;
    scroller.appendChild(s);
    els[id] = s;
  }
  return { scroller, els };
}

function SpyProbe({ probeRef }) {
  const state = useSectionState(SPY_SECTIONS);
  useEffect(() => {
    probeRef.current = state;
  });
  return null;
}

function renderSpy() {
  const dom = mountSections();
  const probe = { current: null };
  renderWithProviders(<SpyProbe probeRef={probe} />);
  return { ...dom, probe };
}

describe("scroll-spy determinism", () => {
  it("two sections in the band resolve to the same winner in either entry order", () => {
    {
      const { els, probe } = renderSpy();
      io.trigger([[els.alpha, true], [els.beta, true]]);
      expect(probe.current.activeId).toBe("beta");
    }
    // Fresh render, reversed arrival — the old per-section observers made
    // arrival order pick the winner, which is what let activeId flap.
    {
      const { els, probe } = renderSpy();
      io.trigger([[els.beta, true], [els.alpha, true]]);
      expect(probe.current.activeId).toBe("beta");
    }
  });

  it("steps back on a real exit and ignores redundant notifications", () => {
    const { els, probe } = renderSpy();
    io.trigger([[els.alpha, true]]);
    expect(probe.current.activeId).toBe("alpha");
    io.trigger([[els.beta, true]]);
    expect(probe.current.activeId).toBe("beta");

    // A repeated "still intersecting" batch changes nothing — the winner is
    // a pure function of the set, not of the latest event.
    io.trigger([[els.alpha, true]]);
    expect(probe.current.activeId).toBe("beta");

    io.trigger([[els.beta, false]]);
    expect(probe.current.activeId).toBe("alpha");
  });

  it("suspends during a tap-initiated scroll and re-arms on scrollend", () => {
    const { scroller, els, probe } = renderSpy();
    io.trigger([[els.alpha, true]]);
    expect(probe.current.activeId).toBe("alpha");

    // The tap decides the destination immediately…
    act(() => probe.current.navigateToSection("gamma"));
    expect(probe.current.activeId).toBe("gamma");

    // …and the sections flying past during the programmatic scroll cannot
    // re-trigger the chain that caused it.
    io.trigger([[els.beta, true]]);
    expect(probe.current.activeId).toBe("gamma");

    // scrollend releases the guard; from here real crossings count again.
    fireEvent(scroller, new Event("scrollend"));
    io.trigger([[els.alpha, false]]);
    expect(probe.current.activeId).toBe("beta");
  });
});
