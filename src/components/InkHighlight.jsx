// A hand-drawn gold (or blush) highlighter swipe behind a key phrase — the way
// a researcher marks a finding worth remembering. Draws itself on scroll-in.
//
// Usage:
//   <InkHighlight>increased task success by 32%</InkHighlight>
//   <InkHighlight tone="rose" animate={false}>slightly feminine</InkHighlight>
//
// Limit to 1-2 per viewport; it's meant as a signature, not decoration.
// A zero-JS CSS version is also available: class="ink-highlight" in theme.css.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function InkHighlight({ children, tone = "gold", animate = true, className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const color = tone === "rose" ? "var(--blush)" : "var(--highlight)";
  const shouldAnimate = animate && !prefersReducedMotion;

  return (
    <span className={`relative inline whitespace-normal ${className}`}>
      {/* The swipe — sits behind the text, slightly rotated, hand-drawn edges */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        className="absolute left-[-0.15em] right-[-0.15em] bottom-[-0.06em] h-[0.72em] w-[calc(100%+0.3em)] -z-10 -rotate-[0.6deg]"
        initial={shouldAnimate ? { scaleX: 0 } : { scaleX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
        style={{ transformOrigin: "left center" }}
      >
        {/* Wobbly quad path = marker stroke, not a rectangle */}
        <path
          d="M3,14 Q40,9 100,11 T197,10 L196,20 Q140,24 90,21 T4,21 Z"
          fill={color}
          opacity="0.9"
        />
      </motion.svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}