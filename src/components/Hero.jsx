// src/components/Hero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIXES (screenshot feedback):
//   1. The Nav is now a compact wordmark, so the Hero name is the ONLY giant
//      name on screen — no more duplication.
//   2. Annotation ("UX Researcher & HCI Specialist") capped at text-2xl/3xl
//      and anchored to the photo's top-LEFT, rotating from its left edge —
//      it can no longer bleed off the right side of the viewport.
//   3. pt-12/pt-20 top spacing so the kicker stops hugging the Nav, and
//      min-h keeps the hero filling the first screen with content centered.
//
// Data contract unchanged: everything flows from profileData + heroMeta.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero({ data }) {
  const prefersReducedMotion = useReducedMotion();

  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const meta = {
    currently: data.heroMeta?.currently ?? "MSc HCI · Bauhaus-Universität Weimar",
    background: data.heroMeta?.background ?? "Software Engineering · QA",
    focus: data.heroMeta?.focus ?? "Mixed-methods research · Prototyping",
  };

  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  return (
    <div
      className="relative w-full flex flex-col justify-center
                 pt-12 md:pt-20 pb-12 min-h-[calc(100vh-160px)]"
    >

      {/* ── Kicker: the 2-second read ── */}
      <motion.p
        {...fadeUp(0)}
        className="text-[10px] md:text-[11px] font-bold uppercase
                   tracking-[0.28em] text-text-dim mb-8 md:mb-12"
      >
        UX Research × Engineering&nbsp;&nbsp;—&nbsp;&nbsp;{data.contact?.location || "Weimar, Germany"}
      </motion.p>

      {/* ── Name + Photo: 12-col editorial grid (≈ 70/30 split) ── */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 items-center">

        {/* Name — the one and only star of this screen */}
        <motion.h1
          {...fadeUp(0.08)}
          className="col-span-12 md:col-span-8 md:col-start-1 md:row-start-1
                     relative z-20 font-display font-black
                     leading-[0.92] text-text pointer-events-none"
          style={{
            fontSize: "clamp(3rem, 8vw, 8.5rem)",
            letterSpacing: "-0.015em",
            fontVariationSettings: "'opsz' 144, 'SOFT' 30",
          }}
        >
          <span className="block">{firstName}</span>
          <span className="block">{lastName}</span>
        </motion.h1>

        {/* Photo cluster */}
        <motion.div
          {...fadeUp(0.2)}
          className="col-span-9 col-start-2 sm:col-span-8 sm:col-start-3 mt-14 md:mt-0
                     md:col-span-4 md:col-start-9 md:row-start-1
                     relative z-10"
        >
          {/* Handwritten role annotation — rose, capped size, rotates from
              its LEFT edge so long titles grow toward the empty name column,
              never off the right side of the screen. */}
          <span
            aria-hidden="true"
            className="hero-role absolute -top-8 left-0 md:-top-10 md:-left-8
                       origin-bottom-left -rotate-[6deg]
                       font-hand font-bold text-secondary
                       text-2xl md:text-3xl leading-none
                       z-30 select-none whitespace-nowrap max-w-none"
          >
            {data.role}
          </span>

          <div
            className="photo-frame relative z-20 rotate-1
                       transition-transform duration-500 hover:rotate-0"
          >
            <img
              src={data.aboutImage}
              alt={data.name}
              className="w-full h-auto object-cover grayscale
                         transition-all duration-700 hover:grayscale-0"
              style={{ aspectRatio: "4 / 5" }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Tagline: the signature moment — gold highlighter over the thesis ── */}
      <motion.p
        {...fadeUp(0.32)}
        className="hero-tagline font-display text-2xl md:text-4xl
                   max-w-2xl mt-12 md:mt-16 leading-snug"
        style={{ fontVariationSettings: "'opsz' 40" }}
      >
        <span className="ink-highlight">{data.tagline}</span>
      </motion.p>

      {/* ── Meta strip: the 5-second recruiter read ── */}
      <motion.div
        {...fadeUp(0.44)}
        className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8
                   border-t border-border mt-10 md:mt-14 pt-6"
      >
        <MetaItem label="Currently" value={meta.currently} />
        <MetaItem label="Background" value={meta.background} />
        <MetaItem label="Focus" value={meta.focus} />
        <MetaItem
          label="Portfolio"
          value={`[ ${data.year || new Date().getFullYear()} ]`}
          align="md:text-right"
        />
      </motion.div>
    </div>
  );
}

function MetaItem({ label, value, align = "" }) {
  return (
    <div className={align}>
      <p className="text-[9px] font-black uppercase tracking-[0.22em] text-primary-600 mb-1.5">
        {label}
      </p>
      <p className="text-xs md:text-[13px] font-medium text-text/70 leading-relaxed">
        {value}
      </p>
    </div>
  );
}