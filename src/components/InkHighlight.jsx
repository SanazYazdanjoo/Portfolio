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
import { useInViewReveal, useMountReveal, revealClass } from "../hooks/useReveal";

export function InkHighlight({
  children,
  tone = "gold",
  animate = true,
  className = "",
  delay = 0.15,
  duration = 0.5,
  triggerOnLoad = false,
}) {
  const color = tone === "rose" ? "var(--blush)" : "var(--highlight)";

  // triggerOnLoad: fire once on mount (e.g. above-the-fold hero) instead of
  // waiting for the viewport intersection — same visual sweep, different cue.
  const [ref, inView] = useInViewReveal({ amount: 0, margin: "-60px" });
  const mounted = useMountReveal();
  const shown = !animate || (triggerOnLoad ? mounted : inView);

  return (
    <span className={`relative inline whitespace-normal ${className}`}>
      {/* The swipe — sits behind the text, slightly rotated, hand-drawn edges */}
      <svg
        ref={ref}
        aria-hidden="true"
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        className={`${revealClass(shown, "reveal-swipe")} absolute left-[-0.15em] right-[-0.15em] bottom-[-0.06em] h-[0.72em] w-[calc(100%+0.3em)] -z-10 -rotate-[0.6deg]`}
        style={{ "--reveal-dur": animate ? `${duration}s` : "0s", "--reveal-delay": `${delay}s` }}
      >
        {/* Wobbly quad path = marker stroke, not a rectangle */}
        <path
          d="M3,14 Q40,9 100,11 T197,10 L196,20 Q140,24 90,21 T4,21 Z"
          fill={color}
          opacity="0.9"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </span>
  );
}