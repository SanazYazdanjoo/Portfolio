// The hand-drawn arrow, in three directions.
//
//   forward   the hero's primary button, every "Read case study" link
//   up-right  the external-link mark on LinkedIn, GitHub, CV, View source
//   back      "All projects", the prev half of prev/next case-study nav
//
// Neither variant is a second drawing: up-right is the same two paths
// rotated -45deg inside a viewBox opened up to hold them, and back is the
// same two paths mirrored — so every mark is the same hand. That is the
// whole reason they exist — a ↗ or ← glyph next to a drawn arrow reads as
// two different pens.
//
// The shaft is deliberately off-straight and the head asymmetric — that is
// the whole point of it, and the same reason the rule-* hairlines are drawn
// rather than stroked. Do not "correct" the path values, and do not
// substitute a → glyph, which is what this replaced.
//
// It paints in currentColor, so it takes the colour of whatever link it sits
// in, including that link's hover state. aria-hidden because the link text
// beside it already says where it goes.

import React from "react";

export function HandArrow({ direction = "forward", className = "" }) {
  const upRight = direction === "up-right";
  const back = direction === "back";

  return (
    <svg
      width={upRight ? "13" : "24"}
      height={upRight ? "12" : "10"}
      /* Rotating the 24x10 artwork about (12,5) takes it to roughly
         x 1.6-22, y -5.3-15.2, so the up-right box is opened to fit it
         rather than clipping the head or the tail. */
      viewBox={upRight ? "0 -6 24 22" : "0 0 24 10"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <g transform={upRight ? "rotate(-45 12 5)" : back ? "translate(24 0) scale(-1 1)" : undefined}>
        <path d="M1 5.3c4.3-.5 11.6-.7 21.8-.5" />
        <path d="M18.2 1.3c1.8 1.6 3.2 2.8 4.6 3.6-1.6.9-3 1.9-4.4 3.5" />
      </g>
    </svg>
  );
}
