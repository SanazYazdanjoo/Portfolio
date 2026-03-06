// src/components/ScrollArrow.jsx
// A hand-drawn, bouncy "scroll down" nudge for the Hero section.
// Draws itself on mount, bounces idly, goes wild on hover.
// Click scrolls to the next snap section.

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

export function ScrollArrow({ targetId = "AboutMe-Section", scrollRef }) {
  const [hovered, setHovered] = useState(false);
  const [drawn, setDrawn]     = useState(false);
  const arrowControls         = useAnimationControls();

  // ── Draw the arrow path on mount ──────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 600);
    return () => clearTimeout(t);
  }, []);

  // ── Click: scroll to next section, let snap-center do the rest ────────
  const handleClick = () => {
    const container = scrollRef?.current;
    const el = document.getElementById(targetId);
    if (!container || !el) return;

    // Spring-kickback on click
    arrowControls.start({
      y: [0, -18, 4, -8, 0],
      rotate: [0, -8, 6, -3, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="hero-arrow group flex flex-col items-center gap-2 cursor-pointer
                 pointer-events-auto no-print"
      aria-label="Scroll to next section"

      // Idle float — runs forever
      animate={hovered ? "hover" : "idle"}
      variants={{
        idle: {
          y: [0, -10, 0],
          transition: {
            y: {
              duration:   1.6,
              repeat:     Infinity,
              ease:       [0.45, 0, 0.55, 1],
            },
          },
        },
        hover: {
          y: [0, -16, 2, -10, 0, -6, 0],
          rotate: [0, -5, 5, -3, 2, 0],
          transition: {
            duration: 0.7,
            ease: "easeInOut",
          },
        },
      }}
    >
      {/* ── Hand-written label ── */}
      <motion.span
        className="font-hand text-sm text-primary/60 tracking-wide leading-none"
        animate={{ opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.25 }}
      >
        scroll
      </motion.span>

      {/* ── The arrow itself ── */}
      <motion.div animate={arrowControls} className="relative w-10 h-16">

        {/* Wobbly shaft */}
        <svg
          viewBox="0 0 40 70"
          fill="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* Shadow / depth line */}
          <motion.path
            d="M21 4 C19 18, 23 30, 20 52"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="text-primary/15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          />

          {/* Main shaft */}
          <motion.path
            d="M20 4 C18 18, 22 30, 20 52"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />

          {/* Left arrowhead stroke */}
          <motion.path
            d="M20 52 C17 44, 10 40, 7 36"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
          />

          {/* Right arrowhead stroke */}
          <motion.path
            d="M20 52 C23 44, 30 40, 33 36"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.55 }}
          />

          {/* Tiny ink dot at the tip */}
          <motion.circle
            cx="20"
            cy="53"
            r="2"
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.75, type: "spring", stiffness: 400 }}
          />
        </svg>

        {/* Excited sparkles on hover */}
        {hovered && (
          <>
            {[
              { x: -14, y: 10,  delay: 0,    rotate: -20 },
              { x:  18, y: 5,   delay: 0.08, rotate:  15 },
              { x: -10, y: 36,  delay: 0.14, rotate: -10 },
              { x:  16, y: 30,  delay: 0.05, rotate:  25 },
            ].map((spark, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: `calc(50% + ${spark.x}px)`, top: spark.y }}
                initial={{ scale: 0, opacity: 0, rotate: spark.rotate }}
                animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, delay: spark.delay, ease: "easeOut" }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M4 0 L4.3 3.7 L8 4 L4.3 4.3 L4 8 L3.7 4.3 L0 4 L3.7 3.7 Z"
                    fill="currentColor"
                    className="text-primary"
                  />
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* Subtle circle pulse at rest */}
      <motion.div
        className="w-8 h-8 rounded-full border border-primary/20 absolute bottom-0"
        animate={{
          scale:   [1, 1.6, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2.2,
          repeat:   Infinity,
          ease:     "easeInOut",
          delay:    0.8,
        }}
      />
    </motion.button>
  );
}