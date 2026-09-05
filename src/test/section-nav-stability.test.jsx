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
// The pill bar is gone now — phones render an in-flow section index with
// no centring and no active state (template/SectionNav.jsx), and the spy
// itself is switched off below md (project-page-mobile.test.jsx pins both).
// The spy still drives the desktop sidebar, so its half of the fix stays
// pinned here in jsdom terms:
//   1. the spy is deterministic: the same set of in-band sections resolves
//      to the same active id whatever order the entries arrive, so a
//      static page can never flap activeId at all;
//   2. a tap-initiated programmatic scroll suspends the spy until
//      `scrollend` — the isProgrammaticScroll guard — so the sections
//      flying past cannot re-trigger the chain that caused the scroll;
//   3. `spy: false` mounts no observer at all.

import React, { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, renderWithProviders } from "./renderWithProviders";
import { useSectionState } from "../projects/template/useSectionState";

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

function SpyProbe({ probeRef, options }) {
  const state = useSectionState(SPY_SECTIONS, options);
  useEffect(() => {
    probeRef.current = state;
  });
  return null;
}

function renderSpy(options) {
  const dom = mountSections();
  const probe = { current: null };
  renderWithProviders(<SpyProbe probeRef={probe} options={options} />);
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

  it("mounts no observer when the spy is switched off", () => {
    const { probe } = renderSpy({ spy: false });
    expect(io).toBeNull();
    // The rest of the state still works without it: the first section is
    // active by default and a tap still chooses its destination.
    expect(probe.current.activeId).toBe("alpha");
    act(() => probe.current.navigateToSection("gamma"));
    expect(probe.current.activeId).toBe("gamma");
  });
});
