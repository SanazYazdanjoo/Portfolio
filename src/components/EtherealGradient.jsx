// ─────────────────────────────────────────────────────────────
// EtherealGradient.jsx — "drawn-in" grain-gradient wash (Hero)
//
// Behavior: each wash draws itself in ONCE on load — soft fade +
// settle — then holds perfectly still. No infinite loops, no idle
// GPU cost. Pairs with the sketch-oval draw-on: everything on the
// page "gets drawn", nothing runs forever.
//
// Ink & Bloom rules honored:
// - Blush / gold TINTS only (backgrounds, never text) → WCAG safe
// - Grain via feTurbulence, multiply — matches .bg-paper-texture
// - House easing [0.22, 0.61, 0.36, 1], durations in the 0.45–1.2s family
// - prefers-reduced-motion → renders final state instantly, no motion
// - aria-hidden + pointer-events-none: pure decoration
// - Hidden in print
//
// Usage in Hero:
//   <section id="Hero-Section" className="relative overflow-hidden">
//     <EtherealGradient />
//     <div className="relative z-10"> ...existing hero content... </div>
//   </section>
// ─────────────────────────────────────────────────────────────
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1]; // house easing

// Soft radial washes built from PALETTE TINTS.
// radial-gradient falloff does the "blur" for free — no filter: blur().
const WASHES = [
  {
    // Behind the polaroid, top-right — arrives first
    className: "top-[-15%] right-[-10%] h-[55vw] w-[55vw] max-h-[640px] max-w-[640px]",
    background:
      "radial-gradient(circle at center, var(--color-blush-100) 0%, transparent 65%)",
    from: { opacity: 0, scale: 0.92, y: 24 },
    delay: 0.15,
  },
  {
    // Bottom-left edge — settles a beat later, like a second brushstroke
    className: "bottom-[-20%] left-[-15%] h-[50vw] w-[50vw] max-h-[560px] max-w-[560px]",
    background:
      "radial-gradient(circle at center, var(--color-gold-100) 0%, transparent 65%)",
    from: { opacity: 0, scale: 0.92, y: -20 },
    delay: 0.4,
  },
];

// Same feTurbulence recipe family as .bg-ink-speckles — one data URI, repeats.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export default function EtherealGradient() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden print:hidden"
    >
      {WASHES.map((wash, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${wash.className}`}
          style={{ background: wash.background }}
          initial={reduceMotion ? false : wash.from}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.2, ease: EASE, delay: wash.delay }
          }
        />
      ))}

      {/* Grain fades in with the washes, then sits still on top of them */}
      <motion.div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: GRAIN, backgroundSize: "240px" }}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.4, ease: EASE, delay: 0.3 }}
      />
    </div>
  );
}
