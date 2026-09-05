// Section open/active state for the template: which sections are expanded,
// which one the TOC marks active (via IntersectionObserver), expand/collapse
// all with its brief stagger window, and the numbering helpers the section
// renderers share.
//
// `spy: false` leaves the IntersectionObserver unmounted. Phones pass it:
// nothing on a phone displays activeId any more (the sticky pill bar is
// gone — see MobileSectionIndex), so the spy would only be re-rendering the
// whole template on every band crossing mid-scroll for no reader-visible
// result. A re-render nobody can see is still a re-render inside an async
// scroller, and that class of work is what the phone version of this page
// exists to have none of.

import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function useSectionState(activeSections, { spy = true } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const toggleAllTimeoutRef = useRef(null);

  // isProgrammaticScroll, in spirit: true while a tap-initiated scroll is in
  // flight. The spy stands down for the ride — the tap already chose the
  // destination, so the sections flying past must not fight it, and a
  // programmatic scroll must never re-trigger the observer chain that
  // reacts to activeId (that read/write cycle is how the iOS oscillation
  // loop closed — the old pill bar's centring effect, removed in the
  // commit that made phones a plain document; the guard still protects
  // the desktop sidebar from the same shape of loop).
  const spySuspendedRef = useRef(false);
  const releaseSpyRef = useRef(null);

  const [activeId, setActiveId] = useState(() => activeSections[0]?.id ?? null);

  const [openSections, setOpenSections] = useState(
    () => new Set(activeSections.map((s) => s.id))
  );

  const [staggerAll, setStaggerAll] = useState(false);

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const navigateToSection = (id) => {
    setOpenSections((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    const el = document.getElementById(id);
    if (!el) return;

    // The tap decides the active pill — immediately, not whenever the spy
    // notices the fly-by. Then suspend the spy until the programmatic
    // scroll settles: `scrollend` releases it where the event exists, and
    // the timeout is the ceiling for engines without it (iOS < 26) and for
    // taps whose target is already on screen, where no scroll ever fires.
    setActiveId(id);
    releaseSpyRef.current?.();
    const scroller = el.closest?.(".overflow-y-auto") ?? null;
    spySuspendedRef.current = true;
    let timer = null;
    const release = () => {
      spySuspendedRef.current = false;
      releaseSpyRef.current = null;
      scroller?.removeEventListener("scrollend", release);
      window.clearTimeout(timer);
    };
    releaseSpyRef.current = release;
    scroller?.addEventListener("scrollend", release);
    timer = window.setTimeout(release, 1200);

    el.scrollIntoView?.({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const allOpen =
    activeSections.length > 0 && activeSections.every((s) => openSections.has(s.id));

  const toggleAllSections = () => {
    setOpenSections(allOpen ? new Set() : new Set(activeSections.map((s) => s.id)));
    if (prefersReducedMotion) return;
    setStaggerAll(true);
    window.clearTimeout(toggleAllTimeoutRef.current);
    const settle = activeSections.length * 40 + 350 + 60;
    toggleAllTimeoutRef.current = window.setTimeout(() => setStaggerAll(false), settle);
  };

  useEffect(
    () => () => {
      window.clearTimeout(toggleAllTimeoutRef.current);
      releaseSpyRef.current?.();
    },
    []
  );

  const sectionIndex = (id) => activeSections.findIndex((s) => s.id === id);
  const sectionNumber = (id) => String(sectionIndex(id) + 1).padStart(2, "0");
  const staggerDelayFor = (id) => (staggerAll ? sectionIndex(id) * 40 : 0);

  useEffect(() => {
    if (!spy || activeSections.length === 0) return;

    const order = new Map(activeSections.map((s, i) => [s.id, i]));
    const els = activeSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (els.length === 0) return;

    // Explicit root: the app scrolls inside a container (see App.jsx), and
    // iOS WebKit does not reliably recompute default-viewport-root
    // intersections while an INNER scroller moves the content — on-device
    // the callbacks simply stopped and the active pill froze on the first
    // section, however far the reader scrolled. Rooting the observer at
    // the scroller itself is the designed form for subscrollers and fires
    // from that scroller's own scroll events on every engine.
    const root = els[0].closest(".overflow-y-auto") ?? null;

    // ONE observer over all sections, and a deterministic winner. The
    // shipped form was one observer per section, each doing
    // `if (isIntersecting) setActiveId(id)`: whenever a section boundary
    // rested inside the band, TWO sections were legitimately intersecting
    // and callback arrival order picked the active one — so sub-pixel
    // movement flapped activeId A↔B at frame rate, and every flap re-ran
    // the pill bar's centring scroll. That flap was one half of the iOS
    // oscillation loop (SectionNav.jsx has the other). Here the set of
    // in-band sections is tracked across batches and the winner is always
    // the furthest section reached (highest index) — a pure function of the
    // set, so entry order cannot matter, and the set only changes on real
    // band-edge crossings, so a static page can never change activeId.
    const inBand = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        // Keep maintaining the set while suspended (crossings during a
        // programmatic scroll are real); only the selection stands down.
        if (spySuspendedRef.current || inBand.size === 0) return;
        let next = null;
        for (const id of inBand) {
          if (next === null || (order.get(id) ?? -1) > (order.get(next) ?? -1)) {
            next = id;
          }
        }
        if (next !== null) setActiveId(next);
      },
      { root, rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeSections, spy]);

  return {
    activeId,
    openSections,
    toggleSection,
    navigateToSection,
    allOpen,
    toggleAllSections,
    sectionNumber,
    staggerDelayFor,
  };
}
