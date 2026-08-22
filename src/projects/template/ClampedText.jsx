// Body copy opens clamped to 2.5 lines, with Read more / Read less to
// toggle the rest. The half line is the point: a whole-line cut can read as
// a paragraph that simply ended, where a sliced line says "there is more" on
// sight. So the clamp is a max-height of 2.5 × the paragraph's own computed
// line-height — CSS line-clamp only counts whole lines — with a mask fading
// that half line out.
//
// Whether a given paragraph overflows depends on the column width, so it is
// measured rather than guessed from character count: the clip lives on the
// outer div while the inner div keeps its natural height, and it's the inner
// one the ResizeObserver watches. Watching the clipped element instead would
// go stale the moment it stopped changing size — which is exactly when it is
// clamped, i.e. always.

import { useState, useEffect, useRef, useId } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";
import { Chevron } from "./Chevron";
import { EASE } from "./constants";

const CLAMP_LINES = 2.5;
const CLAMP_FADE = "linear-gradient(to bottom, #000 78%, transparent 100%)";
const CLAMP_TRANSITION = `max-height 320ms cubic-bezier(${EASE.join(", ")})`;

export function ClampedText({ children, className = "" }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const innerRef = useRef(null);
  const bodyId = useId();
  const [expanded, setExpanded] = useState(false);
  const [clampPx, setClampPx] = useState(0);
  const [fullPx, setFullPx] = useState(0);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const measure = () => {
      // The paragraph carries the type scale, not this wrapper, so read the
      // line-height off the child that actually has it.
      const typed = inner.firstElementChild ?? inner;
      const style = window.getComputedStyle(typed);
      const lineHeight = parseFloat(style.lineHeight);
      const fontSize = parseFloat(style.fontSize) || 17;
      const line = Number.isFinite(lineHeight) ? lineHeight : fontSize * 1.5;
      setClampPx(line * CLAMP_LINES);
      setFullPx(inner.getBoundingClientRect().height);
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  const overflows = clampPx > 0 && fullPx > clampPx + 1;
  const collapsed = overflows && !expanded;

  return (
    <div className={className}>
      <div
        id={bodyId}
        data-clamped-text
        style={{
          overflow: "hidden",
          maxHeight: collapsed ? `${clampPx}px` : overflows ? `${fullPx}px` : undefined,
          transition: prefersReducedMotion ? "none" : CLAMP_TRANSITION,
          WebkitMaskImage: collapsed ? CLAMP_FADE : undefined,
          maskImage: collapsed ? CLAMP_FADE : undefined,
        }}
      >
        <div ref={innerRef}>{children}</div>
      </div>

      {/* A blush wash rather than another bare coral caps line: the page already
          spends that exact style on section kickers, meta labels and the back
          link, so the toggle needs a surface of its own to read as the one
          clickable thing under a paragraph. Blush is a background-only token by
          design-system rule; hover flips to the solid coral fill the chips use,
          which holds contrast in both themes. */}
      {overflows && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={bodyId}
          className="no-print mt-3 inline-flex items-center gap-1.5 border-0 bg-blush-weak rule-fill
                     px-2.5 py-1.5 text-2xs font-black uppercase tracking-[0.2em] text-primary-600
                     hover:bg-primary-600 hover:text-white transition-colors duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          {expanded ? t("common.readLess") : t("common.readMore")}
          <Chevron isOpen={expanded} className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
