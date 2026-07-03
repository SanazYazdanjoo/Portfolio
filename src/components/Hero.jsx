// src/components/Hero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Editorial hero — Ink & Bloom edition.
// Same data contract as before: everything flows from profileData, with the
// optional heroMeta fields and safe fallbacks:
//
//   heroMeta: {
//     currently:  "MSc HCI · Bauhaus-Universität Weimar",
//     background: "Software Engineering · QA",
//     focus:      "Mixed-methods research · Prototyping",
//   }
//
// What changed visually:
//   • Name is now set in the display serif (Fraunces via font-display)
//   • Role annotation is rose (--secondary) — the feminine whisper
//   • Photo uses the .photo-frame mat from theme.css (blush edge on hover)
//   • Tagline carries the signature gold highlighter (.ink-highlight —
//     the CSS version, because it wraps cleanly across lines on mobile)
//   • Meta labels use primary-600, the AA-safe coral for small text
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero({ data }) {
  const prefersReducedMotion = useReducedMotion();

  // Split the name from profile.js — no hardcoded strings.
  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const meta = {
    currently: data.heroMeta?.currently ?? "MSc HCI · Bauhaus-Universität Weimar",
    background: data.heroMeta?.background ?? "Software Engineering · QA",
    focus: data.heroMeta?.focus ?? "Mixed-methods research · Prototyping",
  };

  // Shared entrance — one orchestrated sequence, not scattered effects.
  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  return (
    <div className="relative w-full flex flex-col justify-center">

      {/* ── Kicker: the 2-second read ── */}
      <motion.p
        {...fadeUp(0)}
        className="text-[10px] md:text-[11px] font-bold uppercase
                   tracking-[0.28em] text-text-dim mb-6 md:mb-10"
      >
        UX Research × Engineering&nbsp;&nbsp;—&nbsp;&nbsp;{data.contact?.location || "Weimar, Germany"}
      </motion.p>

      {/* ── Name + Photo: 12-col editorial grid ── */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 items-center">

        {/* Name — now in Fraunces. Serifs are wider than the old grotesk,
            so the clamp ceiling drops slightly and tracking relaxes. */}
        <motion.h1
          {...fadeUp(0.08)}
          className="col-span-12 md:col-span-8 md:col-start-1 md:row-start-1
                     relative z-20 font-display font-black
                     leading-[0.92] text-text pointer-events-none"
          style={{
            fontSize: "clamp(3rem, 8.5vw, 9.5rem)",
            letterSpacing: "-0.015em",
            fontVariationSettings: "'opsz' 144, 'SOFT' 30",
          }}
        >
          <span className="block">{firstName}</span>
          <span className="block">{lastName}</span>
        </motion.h1>

        {/* Photo — hand-placed feel via 1° rotation; the mat now comes from
            .photo-frame (white sheet, ink hairline, blush edge on hover). */}
        <motion.div
          {...fadeUp(0.2)}
          className="col-span-8 col-start-3 mt-10 md:mt-0
                     md:col-span-4 md:col-start-9 md:row-start-1
                     relative z-10"
        >
          {/* Handwritten role annotation — rose, the feminine whisper */}
          <span
            aria-hidden="true"
            className="hero-role absolute -top-7 -left-4 md:-top-9 md:-left-10
                       font-hand text-secondary text-3xl md:text-4xl lg:text-5xl
                       -rotate-[8deg] z-30 select-none whitespace-nowrap"
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
                   max-w-2xl mt-10 md:mt-14 leading-snug"
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

/* Small, repeated pattern → shared component (composition over duplication). */
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