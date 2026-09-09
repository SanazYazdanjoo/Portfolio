// Scroll-in and mount-in reveals without Framer Motion.
//
// The homepage and the app shell used framer-motion for two things only:
// "fade up when this scrolls into view" and "fade up when this mounts".
// Both are CSS transitions with a class toggle; the 138 KB motion chunk was
// on the critical path of every page for them (Lighthouse mobile, Sept
// 2026: TBT ~1 s). Framer stays on the case-study pages, which use its
// layout animations, scroll-linked values and presence transitions.
//
// The CSS side lives in theme.css under "Reveals":
//   .reveal            hidden until .is-in — opacity + translateY transition
//   .reveal-swipe      scaleX(0) → 1, for the ink highlight
//   .reveal-draw       stroke-dashoffset 1 → 0, for drawn SVG paths
//   .enter-up/.enter-pop  keyframe entrances that need no JS at all
// --reveal-delay / --enter-delay stagger children. The global
// prefers-reduced-motion block zeroes every duration and delay, so a
// motion-sensitive reader gets the final state at once.

import { useEffect, useRef, useState } from "react";

/**
 * [ref, inView] — inView flips true once the element intersects the
 * viewport (by `amount` of its box, expanded by `margin`). Once true it
 * stays true. Without IntersectionObserver (old engines, jsdom) it is true
 * immediately, so nothing can be left invisible.
 */
export function useInViewReveal({ amount = 0.2, margin = "0px" } = {}) {
  const ref = useRef(null);
  // Without IntersectionObserver the element starts shown, so nothing can
  // be left invisible and no effect has to flip it.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver !== "function"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, margin, inView]);

  return [ref, inView];
}

/**
 * True one frame after mount, so an element that renders in its hidden
 * state gets a real transition to its shown state. For above-the-fold
 * content that should not wait for a scroll.
 */
export function useMountReveal() {
  const [shown, setShown] = useState(
    () => typeof requestAnimationFrame !== "function"
  );
  useEffect(() => {
    if (shown) return undefined;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [shown]);
  return shown;
}

/** Class string for a reveal element. */
export const revealClass = (inView, base = "reveal") =>
  `${base} ${inView ? "is-in" : ""}`;
