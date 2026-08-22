// The project title sits on one line where one line is possible: it is not
// allowed to wrap at the class-driven size, and the type size is fitted to
// the column instead. Sizing has to happen in JS — the right size depends on
// how long this particular title is, which CSS's clamp() cannot see. The
// measure→shrink pass repeats a couple of times because glyph advance isn't
// perfectly linear in font-size, and re-runs once webfonts land, since the
// first measurement is of fallback metrics.
//
// Where one line is NOT possible, it wraps rather than shrinking without a
// floor. Unbounded shrinking has a failure mode narrow columns reach easily:
// a 37-character title in a 326px phone column fitted to 16.8px, i.e. the
// page's <h1> came out smaller than the 18px tagline directly beneath it. So
// the fit stops at MIN_RATIO of the size the classes asked for, and a title
// that still overflows at that floor is released to wrap onto two lines at
// the floor size. Two readable lines beat one unreadable one.

import { useLayoutEffect, useRef, useState } from "react";

// Never shrink below this fraction of the class-driven size (36px → ~22px on
// a phone, 60px → ~36px at md), and never below the absolute floor.
const MIN_RATIO = 0.6;
const TITLE_MIN_PX = 14;

export function FitTitle({ children, className }) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [wraps, setWraps] = useState(false);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;
    let cancelled = false;

    const fit = () => {
      if (cancelled) return;
      // Measure on one line at the class-driven size, whatever the last pass
      // decided, so every run starts from the same known state.
      text.style.fontSize = "";
      text.style.whiteSpace = "nowrap";
      const base = parseFloat(window.getComputedStyle(text).fontSize);
      const available = wrap.clientWidth;
      if (!base || !available || !text.scrollWidth) return;

      const floor = Math.max(TITLE_MIN_PX, base * MIN_RATIO);
      let size = base;
      for (let pass = 0; pass < 3 && text.scrollWidth > available && size > floor; pass++) {
        size = Math.max(floor, size * (available / text.scrollWidth) * 0.995);
        text.style.fontSize = `${size}px`;
      }

      // Still over the column at the floor: this title cannot hold one line
      // at a readable size, so let it wrap at the floor instead.
      const needsWrap = text.scrollWidth > available;
      text.style.whiteSpace = needsWrap ? "normal" : "nowrap";
      setWraps(needsWrap);
    };

    fit();
    document.fonts?.ready?.then(fit).catch(() => {});

    // The wrapper's width is independent of the title's font size, so
    // resizing the title can never re-trigger this observer. (It is watched
    // for width; the height changes this effect causes are its own and are
    // measured back to the same value on every run.)
    if (typeof ResizeObserver === "undefined") return () => { cancelled = true; };
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [children]);

  // `overflow-x: clip` rather than `hidden`: hidden on one axis forces the
  // other to `auto`, which would both clip tall glyphs and risk a stray
  // scrollbar. This is only a guard for a title so long it hits the size
  // floor on a narrow phone — normally nothing reaches the edge to clip.
  return (
    <div ref={wrapRef} className="min-w-0" style={{ overflowX: "clip" }}>
      <h1 ref={textRef} className={className} style={{ whiteSpace: wraps ? "normal" : "nowrap" }}>
        {children}
      </h1>
    </div>
  );
}
