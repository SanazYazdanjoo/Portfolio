// ─────────────────────────────────────────────────────────────
// EtherealGradient.jsx — reusable "ethereal grain" wash, Ink & Bloom
//
// One primitive, used anywhere:
//   <section className="relative overflow-hidden">
//     <EtherealGradient color="blush" position="top-right" />
//     <div className="relative z-10">...section content...</div>
//   </section>
//
// Props:
//   color    "blush" | "gold" | "rose" | "paper"     (default "blush")
//            → always the pale -100 tint. Palette rule enforced:
//              tints are backgrounds-only, so text on top stays AA.
//   position "top-left" | "top-right" | "bottom-left" |
//            "bottom-right" | "center"                (default "top-right")
//   size     "sm" | "md" | "lg"                       (default "md")
//   grain    "none" | "soft" | "medium" | "heavy"     (default "medium")
//            → grain is MASKED to the wash shape, so it reads as
//              textured pigment, not a noise layer over the section.
//   delay    seconds before the draw-in starts         (default 0.15)
//
// Behavior: draws in once (fade + settle, house easing), then holds
// still. prefers-reduced-motion → final state instantly. Decorative:
// aria-hidden, pointer-events-none, hidden in print.
//
// The parent section MUST be `relative overflow-hidden`.
// ─────────────────────────────────────────────────────────────
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1]; // house easing

// Tints only — never the 500-strength accents (palette contrast rule).
const COLOR_VAR = {
  blush: "var(--color-blush-100)",
  gold: "var(--color-gold-100)",
  rose: "var(--color-rose-400)", // used at low alpha below — see ALPHA
  paper: "var(--color-paper-200)",
};
// Rose has no -100 tint in the palette, so it gets extra transparency
// to land in the same "whisper" range as blush/gold washes.
const COLOR_ALPHA = { blush: 1, gold: 1, rose: 0.22, paper: 1 };

// Full literal class strings so Tailwind JIT keeps them.
// Negative insets bleed the wash off the section edge (lots of
// whitespace stays intact — the wash is a corner event, not a bg).
const POSITION_CLASSES = {
  "top-left": "top-[-15%] left-[-12%]",
  "top-right": "top-[-15%] right-[-12%]",
  "bottom-left": "bottom-[-18%] left-[-12%]",
  "bottom-right": "bottom-[-18%] right-[-12%]",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

// Settle direction: the wash drifts INTO place from its own corner.
const SETTLE_FROM = {
  "top-left": { x: -24, y: -20 },
  "top-right": { x: 24, y: -20 },
  "bottom-left": { x: -24, y: 20 },
  "bottom-right": { x: 24, y: 20 },
  center: { x: 0, y: 16 },
};

const SIZE_CLASSES = {
  sm: "h-[36vw] w-[36vw] max-h-[420px] max-w-[420px]",
  md: "h-[50vw] w-[50vw] max-h-[560px] max-w-[560px]",
  lg: "h-[62vw] w-[62vw] max-h-[720px] max-w-[720px]",
};

const GRAIN_OPACITY = { none: 0, soft: 0.15, medium: 0.3, heavy: 0.5 };

// feTurbulence noise — same recipe family as .bg-ink-speckles.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

// Radial falloff does the blur for free (no filter: blur, no repaints).
// Reused as the wash fill AND as the mask that clips the grain.
const RADIAL = (fill) =>
  `radial-gradient(circle at center, ${fill} 0%, transparent 66%)`;
const MASK = RADIAL("black"); // mask uses alpha: black = visible

export default function EtherealGradient({
  color = "blush",
  position = "top-right",
  size = "md",
  grain = "medium",
  delay = 0.15,
}) {
  const reduceMotion = useReducedMotion();

  const fill = COLOR_VAR[color] ?? COLOR_VAR.blush;
  const alpha = COLOR_ALPHA[color] ?? 1;
  const settle = SETTLE_FROM[position] ?? SETTLE_FROM["top-right"];
  const grainOpacity = GRAIN_OPACITY[grain] ?? GRAIN_OPACITY.medium;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 rounded-full print:hidden
        ${POSITION_CLASSES[position] ?? POSITION_CLASSES["top-right"]}
        ${SIZE_CLASSES[size] ?? SIZE_CLASSES.md}`}
      initial={
        reduceMotion ? false : { opacity: 0, scale: 0.92, ...settle }
      }
      animate={{ opacity: 1, scale: 1, x: position === "center" ? "-50%" : 0, y: position === "center" ? "-50%" : 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 1.2, ease: EASE, delay }
      }
    >
      {/* Layer 1 — the color wash */}
      <div
        className="absolute inset-0"
        style={{ background: RADIAL(fill), opacity: alpha }}
      />
      {/* Layer 2 — grain, masked to the same radial shape */}
      {grainOpacity > 0 && (
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage: GRAIN_URL,
            backgroundSize: "240px",
            opacity: grainOpacity,
            WebkitMaskImage: MASK,
            maskImage: MASK,
          }}
        />
      )}
    </motion.div>
  );
}