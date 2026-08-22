// The motion contract, in one place.
//
// EASE is the site's only easing curve — the same one the design system
// publishes under "Motion". It used to be copy-pasted into thirteen files as
// a bare `[0.22, 0.61, 0.36, 1]`, which is how a "no exceptions" rule quietly
// becomes twenty exceptions: half the entrances had drifted to framer's
// generic `easeOut` instead.
//
// The one thing that legitimately does NOT use it: a continuous rotation
// (the loading spinner, the prototype badge's drifting shapes). An eased loop
// visibly stutters once per cycle, so those stay `linear` on purpose.
//
// Reduced motion is handled globally rather than per-component — see the
// <MotionConfig reducedMotion="user"> in App.jsx and the
// `prefers-reduced-motion` block in theme.css.
export const EASE = [0.22, 0.61, 0.36, 1];
