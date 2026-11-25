// Scroll reveals for primary content: visible by default, a small settle.
//
// Reveals used to start at opacity 0 and wait for an IntersectionObserver.
// Anything that never fired the observer — a fast scroll, a full-page
// screenshot, a link-preview render, print — saw blank space where a section
// should be. Content now renders visible from the first frame; the only
// motion left is a 12px upward settle, triggered 200px before the element
// enters the viewport so it has usually finished by the time it is seen.
// Decorative draws (ink highlight, scribbles, skill orbit) keep their own.

/** framer-motion `viewport`: fire once, 200px before the element arrives. */
export const EARLY_VIEWPORT = { once: true, margin: "0px 0px 200px 0px", amount: 0 };

/** Margin for useInViewReveal (CSS reveals), same early trigger. */
export const EARLY_MARGIN = "0px 0px 200px 0px";

/** framer-motion `initial` for a settle: a transform only, never opacity. */
export const settleFrom = (reduce, y = 12) => (reduce ? false : { y });

/** framer-motion `whileInView` that ends the settle. */
export const SETTLED = { y: 0 };
