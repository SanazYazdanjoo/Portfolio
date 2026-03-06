// src/components/DoodleLibrary.jsx
import React from 'react';
import { motion, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// CircleDoodle
// ─────────────────────────────────────────────────────────────────────────────
export const CircleDoodle = ({ className = "text-primary", isAnimated = true, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    preserveAspectRatio="none"
    className={className}
    {...props}
  >
    <path
      d="M5,50 C5,20 25,5 50,5 C75,5 95,20 95,50 C95,80 75,95 50,95 C25,95 5,80 5,50"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="500"
      className={`${isAnimated ? 'animate-sketch-oval' : ''}`}
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// FlowerDoodle
// ─────────────────────────────────────────────────────────────────────────────
export const FlowerDoodle = ({ className = "", ...props }) => (
  <img
    src="/assets/flower-doodle.png"
    alt="Hand-drawn flower decoration"
    className={`object-contain ${className}`}
    {...props}
  />
);

// ─────────────────────────────────────────────────────────────────────────────
// ScribbleUnderline
// ─────────────────────────────────────────────────────────────────────────────
export const ScribbleUnderline = ({ className = "text-primary", ...props }) => (
  <svg viewBox="0 0 100 20" fill="none" preserveAspectRatio="none" className={className} {...props}>
    <path
      d="M2,15 Q25,5 50,15 T98,15"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// VerticalMarginLine
// ─────────────────────────────────────────────────────────────────────────────
export const VerticalMarginLine = ({ className = "text-border opacity-40" }) => (
  <div className={`vertical-line fixed left-4 md:left-8 top-0 bottom-0 w-4 pointer-events-none z-[60] ${className}`}>
    <svg width="100%" height="100%" viewBox="0 0 20 1000" preserveAspectRatio="none">
      <path
        d="M10,0 Q12,100 8,200 T10,400 Q13,500 9,600 T10,800 Q7,900 11,1000"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// HorizontalMarginLine
// ─────────────────────────────────────────────────────────────────────────────
export const HorizontalMarginLine = ({ isVisible = true, className = "text-primary opacity-40" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    className={`horizontal-line w-full h-5 pointer-events-none ${className}`}
  >
    <svg width="100%" height="100%" viewBox="0 0 1000 20" preserveAspectRatio="none" className="w-full h-full">
      <path
        d="M0,10 Q100,12 200,8 T400,10 Q500,13 600,9 T800,10 Q900,7 1000,11"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SpeckleCluster  ─ "Research Affinity Board"
//
// Visual hierarchy:
//   Large dots  (r ≥ 5.5) → key insights       — breathe with pulse rings
//   Medium dots (r 2–4)   → supporting evidence — steady
//   Tiny dots   (r < 2)   → raw observations    — faint
//   Dashed lines          → affinity threads    — self-drawing on mount
//   ✕                     → invalidated assumption
//   ＋                     → open question
//
// ── Animation architecture (no conflicts) ──────────────────────────────────
//
//   The core rule: entrance and hover MUST control DIFFERENT CSS properties.
//
//   Entrance  → motion.g  initial/animate  →  { scale, opacity }
//   Hover     → variants propagated from parent whileHover  →  { x, y }
//   Pulse     → separate motion.circle per anchor  →  { scale } repeating
//
//   Because { scale, opacity } ≠ { x, y }, Framer Motion merges them
//   cleanly and neither overrides the other.
// ─────────────────────────────────────────────────────────────────────────────

// Outward shift for each node on hover (away from centre 50,50)
const shift = (x, y, amount) => ({
  x: +(((x - 50) * amount).toFixed(2)),
  y: +(((y - 50) * amount).toFixed(2)),
});

const SPRING = { type: "spring", stiffness: 200, damping: 20, mass: 0.7 };

// ── Node data ────────────────────────────────────────────────────────────────
const ANCHORS = [
  { id: "a1", x: 28, y: 30, r: 6.2,  delay: 0.00, pulseDur: 2.8, pulseDelay: 1.2 },
  { id: "a2", x: 74, y: 26, r: 5.6,  delay: 0.06, pulseDur: 3.2, pulseDelay: 1.6 },
  { id: "a3", x: 54, y: 70, r: 6.8,  delay: 0.04, pulseDur: 3.6, pulseDelay: 2.0 },
];

const DATA_PTS = [
  { id: "d1", x: 16, y: 56, r: 3.0, delay: 0.14 },
  { id: "d2", x: 46, y: 16, r: 2.6, delay: 0.18 },
  { id: "d3", x: 84, y: 54, r: 3.2, delay: 0.12 },
  { id: "d4", x: 64, y: 86, r: 2.8, delay: 0.20 },
  { id: "d5", x: 34, y: 84, r: 2.4, delay: 0.22 },
  { id: "d6", x: 90, y: 20, r: 2.2, delay: 0.16 },
];

const DUST = [
  { id: "p1", x: 10, y: 24, r: 1.2, delay: 0.28 },
  { id: "p2", x: 60, y: 10, r: 1.0, delay: 0.30 },
  { id: "p3", x: 92, y: 70, r: 1.4, delay: 0.26 },
  { id: "p4", x: 22, y: 76, r: 1.1, delay: 0.32 },
  { id: "p5", x: 78, y: 92, r: 1.3, delay: 0.34 },
  { id: "p6", x: 50, y: 46, r: 0.9, delay: 0.36 },
  { id: "p7", x:  6, y: 44, r: 1.0, delay: 0.38 },
];

const THREADS = [
  { id: "t1", d: "M28,30 C34,22 40,18 46,16",     delay: 0.42 },
  { id: "t2", d: "M28,30 C22,40 18,48 16,56",     delay: 0.46 },
  { id: "t3", d: "M74,26 C80,36 84,44 84,54",     delay: 0.44 },
  { id: "t4", d: "M54,70 C48,78 42,80 34,84",     delay: 0.48 },
  { id: "t5", d: "M54,70 C60,78 62,80 64,86",     delay: 0.50 },
  { id: "t6", d: "M74,26 C65,42 60,54 54,70",     delay: 0.52 },
  { id: "t7", d: "M28,30 C38,44 46,58 54,70",     delay: 0.54 },
];

export const SpeckleCluster = ({ className = "" }) => {
  const prefersReduced = useReducedMotion();

  // Helper: entrance transition — spring pop
  const entrance = (delay) =>
    prefersReduced
      ? { duration: 0 }
      : { delay, type: "spring", stiffness: 400, damping: 17, mass: 0.55 };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      style={{ overflow: "visible" }}   // pulse rings must not be clipped
      className={`w-32 h-32 ${className}`}
      fill="currentColor"
      // Parent broadcasts hover state — children opt in via variants
      initial="rest"
      whileHover="hovered"
      aria-label="Research affinity cluster"
      role="img"
    >

      {/* ── LAYER 1: Affinity threads ─────────────────────────────────── */}
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {THREADS.map(({ id, d, delay }) => (
          <motion.path
            key={id}
            d={d}
            strokeWidth="0.8"
            strokeDasharray="2.5 2"
            // Entrance: path draws itself in
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 0.22,
              transition: {
                pathLength: { delay, duration: 0.5, ease: "easeOut" },
                opacity:    { delay, duration: 0.01 },
              },
            }}
            // Hover: threads brighten — x/y don't conflict with pathLength/opacity
            variants={{
              rest:    { opacity: 0.22 },
              hovered: { opacity: 0.6, transition: { duration: 0.25 } },
            }}
          />
        ))}
      </g>

      {/* ── LAYER 2: Dust dots ────────────────────────────────────────── */}
      {DUST.map(({ id, x, y, r, delay }) => {
        const hv = shift(x, y, 0.10);
        return (
          <motion.g
            key={id}
            // Entrance via scale+opacity
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.28 }}
            transition={entrance(delay)}
            style={{ transformOrigin: `${x}px ${y}px` }}
            // Hover via x+y — different props, no conflict
            variants={{
              rest:    { x: 0, y: 0 },
              hovered: { x: hv.x, y: hv.y, transition: SPRING },
            }}
          >
            <circle cx={x} cy={y} r={r} />
          </motion.g>
        );
      })}

      {/* ── LAYER 3: Data points ──────────────────────────────────────── */}
      {DATA_PTS.map(({ id, x, y, r, delay }) => {
        const hv = shift(x, y, 0.13);
        return (
          <motion.g
            key={id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.65 }}
            transition={entrance(delay)}
            style={{ transformOrigin: `${x}px ${y}px` }}
            variants={{
              rest:    { x: 0, y: 0 },
              hovered: { x: hv.x, y: hv.y, transition: SPRING },
            }}
          >
            <circle cx={x} cy={y} r={r} />
            {/* Shine highlight — top-left light source */}
            <circle
              cx={x - r * 0.32}
              cy={y - r * 0.32}
              r={r * 0.3}
              fill="white"
              opacity={0.38}
            />
          </motion.g>
        );
      })}

      {/* ── LAYER 4: Anchor dots with dual pulse rings ────────────────── */}
      {ANCHORS.map(({ id, x, y, r, delay, pulseDur, pulseDelay }) => {
        const hv = shift(x, y, 0.16);
        return (
          <motion.g
            key={id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={entrance(delay)}
            style={{ transformOrigin: `${x}px ${y}px` }}
            variants={{
              rest:    { x: 0, y: 0 },
              hovered: { x: hv.x, y: hv.y, transition: SPRING },
            }}
          >
            {/* Outer pulse ring */}
            {!prefersReduced && (
              <motion.circle
                cx={x} cy={y} r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                animate={{
                  scale:   [1, 2.6, 1],
                  opacity: [0.45, 0, 0.45],
                }}
                transition={{
                  delay:    pulseDelay,
                  duration: pulseDur,
                  repeat:   Infinity,
                  ease:     "easeInOut",
                }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            )}

            {/* Inner pulse ring — offset for layered depth */}
            {!prefersReduced && (
              <motion.circle
                cx={x} cy={y} r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                animate={{
                  scale:   [1, 1.8, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  delay:    pulseDelay + pulseDur * 0.45,
                  duration: pulseDur * 0.7,
                  repeat:   Infinity,
                  ease:     "easeInOut",
                }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            )}

            {/* The dot itself */}
            <circle cx={x} cy={y} r={r} />

            {/* Shine */}
            <circle
              cx={x - r * 0.3}
              cy={y - r * 0.3}
              r={r * 0.3}
              fill="white"
              opacity={0.52}
            />
          </motion.g>
        );
      })}

      {/* ── ✕ mark — invalidated assumption (top-right) ──────────────── */}
      <motion.g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.38 }}
        transition={entrance(0.60)}
        style={{ transformOrigin: "88px 14px" }}
        variants={{
          rest:    { opacity: 0.38 },
          hovered: { opacity: 0.85, transition: { duration: 0.2 } },
        }}
      >
        <line x1="84" y1="10" x2="92" y2="18" />
        <line x1="92" y1="10" x2="84" y2="18" />
      </motion.g>

      {/* ── ＋ mark — open question (bottom-left) ────────────────────── */}
      <motion.g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.38 }}
        transition={entrance(0.64)}
        style={{ transformOrigin: "10px 90px" }}
        variants={{
          rest:    { opacity: 0.38 },
          hovered: { opacity: 0.85, transition: { duration: 0.2 } },
        }}
      >
        <line x1="10" y1="86" x2="10" y2="94" />
        <line x1="6"  y1="90" x2="14" y2="90" />
      </motion.g>

    </motion.svg>
  );
};