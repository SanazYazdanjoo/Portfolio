// The project title always sits on one line: it never wraps, and the type
// size is fitted to the column instead. Sizing has to happen in JS — the
// right size depends on how long this particular title is, which CSS's
// clamp() cannot see. The measure→shrink pass repeats a couple of times
// because glyph advance isn't perfectly linear in font-size, and re-runs
// once webfonts land, since the first measurement is of fallback metrics.

import { useLayoutEffect, useRef } from "react";

const TITLE_MIN_PX = 14;

export function FitTitle({ children, className }) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;
    let cancelled = false;

    const fit = () => {
      if (cancelled) return;
      text.style.fontSize = ""; // back to the class-driven size before measuring
      const base = parseFloat(window.getComputedStyle(text).fontSize);
      const available = wrap.clientWidth;
      if (!base || !available || !text.scrollWidth) return;

      let size = base;
      for (let pass = 0; pass < 3 && text.scrollWidth > available && size > TITLE_MIN_PX; pass++) {
        size = Math.max(TITLE_MIN_PX, size * (available / text.scrollWidth) * 0.995);
        text.style.fontSize = `${size}px`;
      }
    };

    fit();
    document.fonts?.ready?.then(fit).catch(() => {});

    // The wrapper's width is independent of the title's font size, so
    // resizing the title can never re-trigger this observer.
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
      <h1 ref={textRef} className={className} style={{ whiteSpace: "nowrap" }}>
        {children}
      </h1>
    </div>
  );
}
