// The pen's glyph set — the same hand as HandArrow. This file IS the icon
// tier of the UI kit: /design-system § 06 renders every glyph from here, so
// adding one here documents it automatically.
//
//   HandMenu     the mobile burger, SectionNav's collapsed sidebar toggle
//   HandClose    the mobile menu's X, the chat widget, the media lightbox
//   HandChevron  every disclosure: sections, read-more, key insights
//   HandList     the /projects list-view toggle
//   HandGrid     the /projects grid-view toggle
//   HandMail     the Contact page's envelope
//   HandQuestion the 404 page's mark
//   HandBang     the error page's mark, the dev-only NEEDS INPUT marker
//   HandDownload the credential lightbox's download button
//   HandSend     the chat composer's submit arrow
//   HandSpark    the chat launcher's spark
//   HandSun      the nav's theme toggle (shown in dark — "go light")
//   HandMoon     the nav's theme toggle (shown in light — "go dark")
//   HandSearch   the nav's site-search trigger + the search dialog's field
//   HandInfo     bench — reserved for method notes and hints
//   HandCheck    bench — reserved for confirmations and done-states
//   HandPlus     bench — reserved for expanders and steppers
//   HandMinus    bench — HandPlus's other half
//
// ("bench" = drawn and documented so a future control doesn't reach for a
// library icon; they carry no site role yet.)
//
// Every mark wobbles the way the rule-* hairlines do: the strokes curve
// where a machine would rule them, ends overshoot slightly, and nothing is
// symmetric. Do not "correct" the path values, and do not substitute a
// Feather/lucide icon — machine-perfect geometry next to a drawn line reads
// as two different pens (see HandArrow.jsx, which these extend). Dots (the
// ? and ! points, the i's tittle) are short flicked strokes, not circles —
// a pen tap, rendered by the round linecap.
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

export function HandQuestion({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M8.5 8.8c.2-2.4 1.9-4 4-3.9 2.1.1 3.6 1.5 3.5 3.3-.1 1.5-1.2 2.4-2.5 3.3-1.1.8-1.6 1.5-1.7 3.1" />
      <path d="M11.6 18.4c.1.1.2.2.3.3" />
    </svg>
  );
}

export function HandBang({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M12.3 4.6c-.3 3.2-.4 6.3-.2 9.5" />
      <path d="M11.9 18.4c.1.1.2.2.3.3" />
    </svg>
  );
}

export function HandInfo({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.6" className={className}>
      <path d="M12.4 3.5c4.5-.1 8.1 3.7 8 8.4-.1 4.6-3.8 8.5-8.3 8.4-4.5-.1-8.1-3.9-8-8.5.1-4.4 3.6-8 8.6-8.2" />
      <path d="M11.8 7.9c.1.1.2.2.3.3" />
      <path d="M12.1 11.6c-.1 1.8-.1 3.5 0 5.3" />
    </svg>
  );
}

export function HandSearch({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.7" className={className}>
      <path d="M10.9 4.9c3.2.1 5.5 2.7 5.3 5.7-.2 3-2.8 5.3-5.7 5.1-3-.2-5.1-2.6-5-5.5.1-2.9 2.4-5.2 5.6-5.3" />
      <path d="M15 15.2c1.5 1.3 2.9 2.7 4.3 4.2" />
    </svg>
  );
}

export function HandCheck({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M4.9 12.8c1.8 1.5 3.4 3.2 4.9 5.1 2.6-4.2 5.6-7.9 9.3-11.2" />
    </svg>
  );
}

export function HandPlus({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M12.2 5.4c-.2 4.4-.2 8.8-.1 13.2" />
      <path d="M5.5 12.2c4.4-.3 8.8-.3 13.2-.1" />
    </svg>
  );
}

export function HandMinus({ className = "" }) {
  return (
    <svg {...pen} className={className}>
      <path d="M5.3 12.3c4.5-.4 9-.4 13.5-.1" />
    </svg>
  );
}

export function HandDownload({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.7" className={className}>
      <path d="M12.2 4.3c-.2 3.4-.3 6.8-.2 10.3" />
      <path d="M8.2 11.5c1.4 1.2 2.7 2.5 3.9 3.9 1.3-1.4 2.7-2.7 4.1-3.8" />
      <path d="M4.7 19.4c4.9.4 9.8.3 14.7 0" />
    </svg>
  );
}

/* The chat composer's arrow — heavier nib than HandArrow because it sits
   alone at 20px with no label beside it. Lived inline in AskPortfolio.jsx
   until the kit consolidated it; the path values are unchanged. */
export function HandSend({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.9" className={className}>
      <path d="M4.8 12.2c4.6-.1 9.2-.1 13.9-.2" />
      <path d="M13 6.5c2 2 3.9 3.9 5.8 5.6-2 1.9-3.9 3.8-5.7 5.7" />
    </svg>
  );
}

/* The chat launcher's four-point spark — same relocation story as HandSend. */
export function HandSpark({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.6" className={className}>
      <path d="M12 3.6c.5 2.9 1.4 5 2.9 6.3 1.2 1 2.9 1.7 5.3 2-2.4.5-4.1 1.2-5.3 2.2-1.4 1.2-2.4 3.2-2.9 6-.6-2.9-1.5-4.9-2.9-6-1.2-1-2.9-1.7-5.2-2.1 2.3-.4 4-1.1 5.2-2.1 1.4-1.3 2.3-3.4 2.9-6.3Z" />
    </svg>
  );
}

/* The theme toggle's pair. The sun's disc doesn't quite close and no two
   rays share a length; the moon is one crescent stroke whose horns overlap
   slightly where the pen came back around. */
export function HandSun({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.6" className={className}>
      <path d="M12.1 8.5c1.9.2 3.3 1.7 3.3 3.6 0 1.9-1.6 3.4-3.5 3.4-1.9-.1-3.4-1.6-3.4-3.5 0-1.8 1.4-3.3 3.2-3.5" />
      <path d="M12.1 3.1c0 .8-.1 1.6-.1 2.4" />
      <path d="M12 18.6c0 .8 0 1.6.1 2.4" />
      <path d="M3.2 12.2c.8-.1 1.6-.1 2.4-.1" />
      <path d="M18.5 12c.8 0 1.6 0 2.4.1" />
      <path d="M5.6 5.8c.6.5 1.2 1.1 1.7 1.7" />
      <path d="M16.8 16.9c.6.6 1.2 1.2 1.7 1.8" />
      <path d="M18.4 5.6c-.6.6-1.2 1.1-1.8 1.7" />
      <path d="M7.2 16.8c-.6.6-1.1 1.2-1.7 1.9" />
    </svg>
  );
}

export function HandMoon({ className = "" }) {
  return (
    <svg {...pen} strokeWidth="1.6" className={className}>
      <path d="M14.6 4c-2.5 1.4-4 4.1-3.8 7 .2 3 2.2 5.5 5 6.5-1.4.9-3 1.3-4.7 1.2-4-.3-7-3.7-6.8-7.7C4.5 7 7.9 4 11.9 4c.9 0 1.8.1 2.6.4" />
    </svg>
  );
}
