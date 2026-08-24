// The hand-drawn arrow, used wherever a link points forward: the hero's
// primary button and every "Read case study" link.
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

export function HandArrow({ className = "" }) {
  return (
    <svg
      width="24"
      height="10"
      viewBox="0 0 24 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 5.3c4.3-.5 11.6-.7 21.8-.5" />
      <path d="M18.2 1.3c1.8 1.6 3.2 2.8 4.6 3.6-1.6.9-3 1.9-4.4 3.5" />
    </svg>
  );
}
