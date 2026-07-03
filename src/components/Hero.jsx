// src/components/Hero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MESSINESS FIX v3 — two changes, everything else untouched:
//
//   1. Handwritten role annotation no longer clips off the right viewport edge.
//      Root cause: `whitespace-nowrap max-w-none` + negative left offset.
//      Fix: anchored to the photo's RIGHT edge (`right-2`, `text-right`,
//      `origin-bottom-right`) so it grows LEFT into the empty name column,
//      and it's allowed to wrap (max-w-[16ch]). It can never overflow again.
//
//   2. Meta strip: "Portfolio [ 2026 ]" was filler in a prime column.
//      Replaced with "Status" — the one thing a recruiter acts on.
//      Value comes from profileData.heroMeta.status (bilingual-ready),
//      with a safe English fallback.
//
// Data contract: add `status` to heroMeta in data.json when convenient:
//   "heroMeta": { ..., "status": { "en": "Open to UX Researcher roles",
//                                  "de": "Offen für UX-Researcher-Rollen" } }
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";


export function Hero({ data }) {

  const { t, localize } = useTranslation();

const meta = {
  currently:  localize(data.heroMeta?.currently)  || t("hero.meta.currentlyValue"),
  background: localize(data.heroMeta?.background) || t("hero.meta.backgroundValue"),
  focus:      localize(data.heroMeta?.focus)      || t("hero.meta.focusValue"),
  status:     localize(data.heroMeta?.status)     || t("hero.meta.statusValue"),
};


  const prefersReducedMotion = useReducedMotion();

  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const meta = {
    currently: data.heroMeta?.currently ?? "MSc HCI · Bauhaus-Universität Weimar",
    background: data.heroMeta?.background ?? "Software Engineering · QA",
    focus: data.heroMeta?.focus ?? "Mixed-methods research · Prototyping",
    status: data.heroMeta?.status ?? "Open to UX Researcher roles",
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
        className="text-2xs md:text-xs font-bold uppercase
                   tracking-[0.28em] text-text-dim mb-8 md:mb-12"
      >
        UX Research × Engineering&nbsp;&nbsp;—&nbsp;&nbsp;{data.contact?.location || "Weimar, Germany"}
      </motion.p>

      {/* ── Name + Photo: 12-col editorial grid (≈ 70/30 split) ── */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 items-center">

        {/* Name — the one and only star of this screen. */}
        <motion.h1
          {...fadeUp(0.08)}
          className="type-hero col-span-12 md:col-span-8 md:col-start-1 md:row-start-1
                     relative z-20 text-text pointer-events-none"
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
          {/* Handwritten role annotation.
              Right-anchored + wrappable = physically cannot clip.
              −4° instead of −6°: a script face fights its own letterforms
              past ~5° of rotation. */}
          <span
            aria-hidden="true"
            className="hero-role absolute -top-9 right-2 md:-top-11 md:right-0
                       origin-bottom-right -rotate-[4deg]
                       font-hand font-bold text-secondary
                       text-2xl md:text-3xl leading-[1.05]
                       z-30 select-none text-right max-w-[16ch]"
          >
            {data.role}
          </span>

          <div
            className="polaroid-frame relative z-20 rotate-1
                       transition-transform duration-500 hover:rotate-0"
          >
            <div className="polaroid-photo relative overflow-hidden">
            <img
              src={data.aboutImage}
              alt={data.name}
              className="w-full h-auto object-cover grayscale
                         transition-all duration-700 hover:grayscale-0"
              style={{ aspectRatio: "4 / 5" }}
            />
            </div>
            {/* Chin — handwritten caption, data-driven with a safe fallback */}
            <div className="polaroid-chin">
              <span
                className="font-hand text-lg md:text-xl text-text/70
                           -rotate-1 select-none"
              >
                {data.heroMeta?.photoCaption ?? "Weimar, 2026"}
              </span>
            </div>
            
          </div>
        </motion.div>
      </div>

      {/* ── Tagline: the ONE gold-highlighter moment on this page ── */}
      <motion.p
        {...fadeUp(0.32)}
        className="type-tagline hero-tagline max-w-2xl mt-12 md:mt-16"
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
        <MetaItem label="Status" value={meta.status} align="md:text-right" />
      </motion.div>
    </div>
  );
}

function MetaItem({ label, value, align = "" }) {
  return (
    <div className={align}>
      <p className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-1.5">
        {label}
      </p>
      <p className="text-xs md:text-sm font-medium text-text-dim leading-relaxed">
        {value}
      </p>
    </div>
  );
}