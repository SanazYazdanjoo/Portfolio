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

// The speech-bubble tail: two hand lines that open out of the bubble beside
// the portrait and converge to a point on its frame, so the sentence reads as
// something the photo is saying. The bubble itself is `rule-bubble` in
// theme.css — a stretched hand-drawn oval — which is why only the tail is
// drawn here.
//
// A tail is not a triangle parked next to a balloon: its mouth has to BREAK
// the oval, or the two lines just cross the outline and the join reads as
// glued on. So the first path is a wedge in the page colour that reaches back
// past the viewBox origin, into the oval, covering the arc the tail opens
// through; the caller pulls the svg left over the oval and lifts it above the
// outline with z-10 (the outline is an ::after, which otherwise paints last).
// The ink edges are then drawn on top of that wedge.
//
// Like every drawn mark on the site the edges are FILLED, not stroked: tapered
// ribbons breathing ~0.6-1.4px, so they read as the same nib as the oval and
// the photo frame. viewBox is 1:1 with CSS pixels. Paths are generated — do
// not "tidy" them.
//
// aria-hidden: the sentence it belongs to is already read aloud. Decoration
// only, so the caller hides it below lg, where the bubble sits under the photo
// in normal flow instead of beside it.
export function HandBubbleTail({ className = "" }) {
  return (
    <svg
      width="92"
      height="62"
      viewBox="-20 0 92 62"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M-20.0 8.0L0.0 14.0L1.4 14.1L2.8 14.2L4.2 14.3L5.7 14.4L7.1 14.5L8.6 14.6L10.1 14.7L11.6 14.9L13.1 15.0L14.6 15.2L16.1 15.4L17.6 15.5L19.2 15.7L20.7 15.9L22.3 16.1L23.9 16.4L25.5 16.6L27.1 16.8L28.7 17.1L30.3 17.3L31.9 17.6L33.6 17.9L35.2 18.2L36.9 18.5L38.5 18.8L40.2 19.1L41.9 19.4L43.6 19.8L45.3 20.1L47.0 20.5L48.7 20.8L50.5 21.2L52.2 21.6L54.0 22.0L55.7 22.4L57.5 22.8L59.2 23.2L61.0 23.7L62.8 24.1L64.6 24.6L66.4 25.0L68.2 25.5L70.0 26.0L70.0 26.0L68.3 26.7L66.7 27.4L65.0 28.1L63.3 28.8L61.6 29.4L60.0 30.1L58.3 30.8L56.6 31.4L54.9 32.1L53.3 32.8L51.6 33.4L50.0 34.0L48.3 34.7L46.6 35.3L45.0 35.9L43.3 36.5L41.7 37.1L40.0 37.7L38.4 38.2L36.7 38.8L35.1 39.4L33.4 39.9L31.8 40.4L30.2 40.9L28.5 41.4L26.9 41.9L25.3 42.4L23.7 42.9L22.1 43.3L20.4 43.8L18.8 44.2L17.2 44.6L15.6 45.0L14.1 45.4L12.5 45.7L10.9 46.1L9.3 46.4L7.8 46.7L6.2 47.0L4.6 47.3L3.1 47.5L1.5 47.8L0.0 48.0L-20.0 54.0Z" fill="var(--bg)" />
      <path d="M-0.0 14.8L1.3 15.0L2.8 15.2L4.2 15.4L5.6 15.5L7.0 15.7L8.5 15.8L10.0 15.9L11.5 16.0L13.0 16.1L14.5 16.2L16.0 16.4L17.5 16.5L19.1 16.7L20.6 16.9L22.2 17.0L23.8 17.2L25.4 17.4L27.0 17.6L28.6 17.8L30.2 18.0L31.8 18.3L33.4 18.6L35.1 18.9L36.7 19.2L38.4 19.6L40.1 19.8L41.8 20.1L43.5 20.4L45.2 20.6L46.9 20.9L48.7 21.1L50.4 21.4L52.2 21.8L53.9 22.2L55.6 22.7L57.4 23.2L59.1 23.7L60.9 24.2L62.7 24.7L64.4 25.1L66.2 25.6L68.0 26.1L69.8 26.6L70.1 25.5L68.3 25.0L66.5 24.4L64.8 23.9L63.0 23.4L61.2 22.8L59.5 22.3L57.7 21.8L56.0 21.3L54.2 20.8L52.5 20.4L50.7 20.0L49.0 19.7L47.2 19.4L45.5 19.2L43.8 18.9L42.1 18.7L40.4 18.4L38.7 18.2L37.0 17.9L35.3 17.5L33.7 17.2L32.0 16.9L30.4 16.6L28.8 16.4L27.2 16.2L25.6 16.0L24.0 15.8L22.4 15.6L20.8 15.4L19.3 15.2L17.7 15.0L16.2 14.8L14.6 14.6L13.1 14.5L11.6 14.4L10.1 14.3L8.6 14.2L7.2 14.1L5.7 14.0L4.3 13.8L2.9 13.6L1.4 13.4L0.0 13.2Z" />
      <path d="M0.2 49.2L1.7 48.9L3.2 48.5L4.8 48.2L6.3 47.7L7.9 47.3L9.4 47.0L11.0 46.6L12.6 46.3L14.2 45.9L15.8 45.6L17.4 45.2L19.0 44.8L20.6 44.3L22.2 43.9L23.8 43.4L25.4 42.8L27.0 42.3L28.6 41.8L30.3 41.2L31.9 40.7L33.5 40.2L35.2 39.6L36.8 39.1L38.4 38.5L40.1 37.9L41.7 37.2L43.4 36.6L45.0 36.0L46.7 35.5L48.4 34.9L50.1 34.4L51.8 33.9L53.5 33.3L55.2 32.8L56.9 32.1L58.6 31.5L60.2 30.8L61.9 30.1L63.6 29.4L65.2 28.6L66.9 27.9L68.5 27.2L70.2 26.5L69.9 25.8L68.3 26.5L66.6 27.2L64.9 28.0L63.3 28.7L61.6 29.4L60.0 30.2L58.3 30.8L56.6 31.4L54.9 32.0L53.2 32.5L51.5 33.0L49.8 33.5L48.0 34.0L46.3 34.5L44.7 35.0L43.0 35.6L41.3 36.2L39.7 36.8L38.1 37.4L36.4 38.0L34.8 38.5L33.2 39.1L31.5 39.6L29.9 40.2L28.3 40.7L26.7 41.2L25.1 41.8L23.5 42.3L21.9 42.8L20.3 43.3L18.7 43.7L17.1 44.1L15.5 44.5L13.9 44.8L12.3 45.1L10.8 45.4L9.2 45.7L7.6 46.1L6.1 46.4L4.5 46.8L3.0 47.1L1.5 47.4L-0.0 47.7Z" />
    </svg>
  );
}

export function HandRoleArrow({ className = "" }) {
  return (
    <svg
      width="56"
      height="46"
      viewBox="0 0 56 46"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M3.3 40.6L4.1 40.3L4.9 40.0L5.6 39.7L6.4 39.4L7.2 39.0L8.0 38.6L8.8 38.2L9.6 37.7L10.4 37.3L11.2 36.8L12.1 36.3L12.9 35.7L13.7 35.2L14.6 34.7L15.5 34.1L16.4 33.5L17.3 33.0L18.2 32.4L19.2 31.8L20.1 31.2L21.1 30.5L22.1 29.9L23.1 29.2L24.1 28.6L25.1 27.9L26.1 27.1L27.1 26.4L28.2 25.6L29.2 24.8L30.3 23.9L31.3 23.1L32.4 22.2L33.5 21.3L34.6 20.4L35.7 19.4L36.8 18.5L38.0 17.5L39.2 16.5L40.4 15.5L41.6 14.5L42.9 13.4L44.1 12.4L45.4 11.3L46.7 10.2L48.0 9.0L49.3 7.8L50.6 6.6L49.6 5.6L48.3 6.8L47.0 8.0L45.7 9.1L44.4 10.2L43.1 11.3L41.8 12.3L40.6 13.4L39.4 14.4L38.2 15.4L37.0 16.3L35.9 17.3L34.8 18.3L33.7 19.2L32.6 20.1L31.5 21.1L30.5 21.9L29.4 22.8L28.4 23.6L27.4 24.5L26.3 25.2L25.3 26.0L24.3 26.7L23.3 27.4L22.3 28.0L21.3 28.7L20.3 29.3L19.3 29.9L18.4 30.5L17.4 31.1L16.5 31.6L15.6 32.2L14.7 32.7L13.8 33.3L12.9 33.8L12.1 34.3L11.3 34.9L10.4 35.4L9.6 35.9L8.8 36.3L8.0 36.8L7.2 37.2L6.5 37.6L5.7 38.0L4.9 38.3L4.2 38.7L3.4 39.0L2.7 39.4Z" />
      <path d="M49.7 5.2L49.1 5.5L48.4 5.8L47.7 6.1L47.0 6.3L46.3 6.6L45.6 6.9L44.9 7.2L44.1 7.5L43.3 7.7L42.5 7.8L41.6 7.9L40.7 8.1L39.9 8.4L40.1 9.4L41.0 9.1L41.9 9.0L42.8 8.8L43.6 8.7L44.4 8.5L45.2 8.3L45.9 8.0L46.7 7.7L47.4 7.5L48.1 7.3L48.8 7.0L49.5 6.8L50.2 6.5Z" />
      <path d="M49.4 6.1L49.6 7.0L49.8 8.0L50.0 8.9L50.1 9.8L50.3 10.7L50.4 11.6L50.4 12.5L50.3 13.4L50.3 14.3L50.3 15.2L50.4 16.2L50.5 17.1L50.5 18.0L51.5 18.0L51.5 17.1L51.4 16.2L51.4 15.2L51.4 14.3L51.5 13.4L51.5 12.4L51.6 11.5L51.5 10.5L51.3 9.6L51.2 8.7L51.0 7.7L50.9 6.8L50.6 5.9Z" />
    </svg>
  );
}
