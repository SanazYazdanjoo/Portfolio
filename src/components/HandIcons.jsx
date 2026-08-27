// The pen's glyph set — the same hand as HandArrow.
//
//   HandMenu     the mobile burger, SectionNav's collapsed sidebar toggle
//   HandClose    the mobile menu's X, the chat widget, the media lightbox
//   HandChevron  every disclosure: sections, read-more, key insights
//   HandList     the /projects list-view toggle
//   HandGrid     the /projects grid-view toggle
//   HandMail     the Contact page's envelope
//
// Every mark wobbles the way the rule-* hairlines do: the strokes curve
// where a machine would rule them, ends overshoot slightly, and nothing is
// symmetric. Do not "correct" the path values, and do not substitute a
// Feather/lucide icon — machine-perfect geometry next to a drawn line reads
// as two different pens (see HandArrow.jsx, which these extend).
//
// All paint in currentColor and hide from the accessibility tree: the
// control carrying a glyph already has its own name (aria-label or text).

import React from "react";

const pen = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function HandMenu({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M4.2 8.3c4.1-.6 8.6-.7 15.7-.4" />
      <path d="M4 15.7c5.6.4 10.4.2 16-.3" />
    </svg>
  );
}

export function HandClose({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M6.4 6.2c3.8 4 7.5 7.8 11.3 11.5" />
      <path d="M17.5 6.4C13.8 10.2 10 14 6.3 17.7" />
    </svg>
  );
}

/* Points down at rest; callers rotate it (`rotate-180`, `rotate-90`) the
   same way the machine chevron rotated, so open/closed needs no second
   drawing. */
export function HandChevron({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M5.7 9.2c2.3 2 4.4 4.1 6.2 6.4 2.2-2.4 4.3-4.5 6.5-6.2" />
    </svg>
  );
}

export function HandList({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M4.3 6.3c4.5-.4 9.1-.5 15.6-.2" />
      <path d="M4 12.1c5.4.3 10.7.2 16-.1" />
      <path d="M4.4 17.8c4.7-.5 9.3-.3 15.4.1" />
    </svg>
  );
}

export function HandGrid({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.6" className={className}>
      <path d="M4.6 4.9c2.2-.2 4.3-.3 6.3-.1.2 2.1.2 4.2 0 6.2-2.1.2-4.2.2-6.2 0-.2-2-.2-4.1-.1-6.1Z" />
      <path d="M13.4 4.7c2.1-.1 4.2-.1 6.2.1.2 2 .2 4.1 0 6.2-2 .2-4.1.2-6.1 0-.2-2.1-.2-4.2-.1-6.3Z" />
      <path d="M4.5 13.6c2.1-.2 4.2-.2 6.3 0 .2 2 .2 4.1 0 6.1-2.1.2-4.2.2-6.2.1-.2-2.1-.2-4.2-.1-6.2Z" />
      <path d="M13.5 13.5c2-.1 4.1-.1 6.2.1.1 2.1.1 4.2-.1 6.2-2 .2-4.1.2-6.1.1-.2-2.1-.2-4.3 0-6.4Z" />
    </svg>
  );
}

export function HandMail({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.6" className={className}>
      <path d="M2.8 5.3c6.2-.5 12.4-.5 18.6-.2.3 4.5.3 9 .1 13.5-6.3.3-12.6.3-18.8.1-.2-4.5-.2-9 .1-13.4Z" />
      <path d="M3.4 6.2c2.9 2.3 5.8 4.5 8.7 6.7 3-2.2 5.9-4.4 8.7-6.6" />
    </svg>
  );
}
