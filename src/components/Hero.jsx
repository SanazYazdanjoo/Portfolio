// src/components/Hero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT FIX v6 — VISUAL QA PASS
//
//   • ROLE BADGE CLIP FIX: the handwritten "UX Engineer" label used to hang
//     ABOVE the photo cluster via negative top offsets (-top-9 / -top-11).
//     Combined with `overflow-hidden` on the hero <section> wrapper in
//     Home.jsx, the top of the text was cut off. Fix: the photo cluster now
//     RESERVES headroom (pt-10 md:pt-12) and the badge sits at top-0 inside
//     that space. It is physically inside the layout box → cannot clip,
//     regardless of any parent overflow rules.
//     (Pair this with removing `overflow-hidden` from the Hero-Section
//     wrapper in Home.jsx — see chat notes.)
//
// v5 retained: UX Engineer fallbacks for data.role / data.tagline.
// v4 retained: hero height wraps content naturally.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { SolidButton } from "./Button";

export function Hero({ data }) {
  const prefersReducedMotion = useReducedMotion();

  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  const { t } = useTranslation();

  return (
    <div className="relative w-full flex flex-col pt-12 md:pt-20 pb-4">

      {/* ── Kicker: the 2-second read ── */}
      <motion.p
        {...fadeUp(0)}
        className="text-2xs md:text-xs font-bold uppercase
                   tracking-[0.28em] text-text-dim mb-8 md:mb-12"
      >
        {t("hero.kicker")}&nbsp;&nbsp;—&nbsp;&nbsp;{data.heroMeta?.location ?? data.contact?.location}
      </motion.p>

      {/* ── Name + Photo: 12-col editorial grid (≈ 70/30 split) ── */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 items-center">

        <motion.h1
          {...fadeUp(0.08)}
          className="type-hero col-span-12 md:col-span-8 md:col-start-1 md:row-start-1
                     relative z-20 text-text pointer-events-none"
        >
          <span className="block">{firstName}</span>
          <span className="block">{lastName}</span>
          <span className="sr-only"> — {data.role || "UX Engineer"}</span>
        </motion.h1>

        {/* Photo cluster — pt-* reserves space for the badge INSIDE the box */}
        <motion.div
          {...fadeUp(0.2)}
          className="col-span-9 col-start-2 sm:col-span-8 sm:col-start-3 mt-6 md:mt-0
                     md:col-span-4 md:col-start-9 md:row-start-1
                     relative z-10 pt-10 md:pt-12"
        >
          {/* Badge lives in the reserved headroom: top-0, right-anchored,
              wrappable via max-w — no negative offsets, no clipping possible. */}
          <span
            aria-hidden="true"
            className="hero-role absolute top-0 right-2 md:right-0
                       origin-bottom-right -rotate-[4deg]
                       font-hand font-bold text-secondary
                       text-2xl md:text-3xl leading-[1.05]
                       z-30 select-none text-right max-w-[16ch]"
          >
            {data.role || "UX Engineer"}
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

      {/* ── Tagline: the ONE gold-highlighter moment on this page ──
          mt reduced (was mt-12 md:mt-16) — part of closing the hero→About gap */}
      <motion.p
        {...fadeUp(0.32)}
        className="type-tagline hero-tagline max-w-2xl mt-8 md:mt-10"
      >
        <span className="ink-highlight">{data.tagline || "I speak both ‘user’ and ‘developer’."}</span>
      </motion.p>

      <motion.div {...fadeUp(0.4)} className="mt-6 md:mt-8">
        <SolidButton
          to="/about"
          className="text-sm md:text-base uppercase tracking-[0.18em]"
        >
          {t("nav.about")}
        </SolidButton>
      </motion.div>
    </div>
  );
}
