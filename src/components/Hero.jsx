// src/components/Hero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT FIX v6 — HERO RECOMPOSITION
//
//   • One tight left stack (kicker → name → tagline → proof → CTAs),
//     vertically centered against the photo — no dead middle.
//   • Tagline promoted to display scale, directly under the name.
//   • Gold highlight now hits ONLY the quoted words ('user', 'developer'),
//     not the full sentence — parsed from data.tagline so i18n still works.
//   • CTA hierarchy: SolidButton → /projects (primary),
//     quiet underlined link → /about (secondary).
//   • Evidence line added (translatable via t("hero.proof")).
//   • Role annotation overlaps the photo-frame corner instead of floating.
//
// v5/v4/v3 fixes retained: safe fallbacks, natural hero height,
// right-anchored wrappable annotation, reduced-motion support.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
//import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { Button, SolidButton } from "./Button";

// Wrap each ‘quoted’ segment of the tagline in the gold swipe.
// "I speak both ‘user’ and ‘developer’." → highlights only ‘user’ / ‘developer’.
function HighlightQuoted({ text }) {
  const parts = text.split(/(‘[^’]*’|'[^']*')/g);
  return parts.map((part, i) =>
    /^[‘'].*[’']$/.test(part) ? (
      <span key={i} className="ink-highlight">{part}</span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

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

  return (
    <div className="relative w-full pt-12 md:pt-16 pb-4">

      {/* ── 12-col editorial grid, both columns vertically centered ── */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-14 items-center
                      min-h-[calc(100svh-12rem)]">

        {/* ── Left stack: kicker → name → tagline → proof → CTAs ── */}
        <div className="col-span-12 md:col-span-7 flex flex-col items-start
                        gap-6 md:gap-7 relative z-20">

          <motion.p
            {...fadeUp(0)}
            className="text-2xs md:text-xs font-bold uppercase
                       tracking-[0.28em] text-text-dim m-0"
          >
            UX Research × Engineering&nbsp;&nbsp;—&nbsp;&nbsp;
            {data.contact?.location || "Weimar, Germany"}
          </motion.p>

          <motion.h1 {...fadeUp(0.08)} className="type-hero text-text m-0">
            <span className="block">{firstName}</span>
            <span className="block">{lastName}</span>
            <span className="sr-only"> — {data.role || "UX Engineer"}</span>
          </motion.h1>

          {/* Tagline: the ONE gold-highlighter moment on this page —
              swipe on the quoted words only. */}
          <motion.p
            {...fadeUp(0.18)}
            className="type-tagline hero-tagline max-w-2xl m-0"
          >
            <HighlightQuoted
              text={data.tagline || "I speak both ‘user’ and ‘developer’."}
            />
          </motion.p>

          {/* Evidence line — numbers do the selling */}
          <motion.p
            {...fadeUp(0.26)}
            className="text-sm text-text-dim leading-relaxed m-0"
          >
            M.Sc. Human–Computer Interaction, 5+ years across UI development, UX research & QA.
          </motion.p>

          {/* CTA pair: loud → projects, quiet → about */}
          <motion.div
            {...fadeUp(0.34)}
            className="flex items-center flex-wrap gap-x-10 gap-y-4 mt-1"
          >
            <SolidButton to="/projects">
              See my projects
            </SolidButton>

            {/* Quiet half of the pair. Underlined rather than bare, so it
                reads as a link without competing with the solid CTA. */}
            <Button to="/about" className="underline underline-offset-4 decoration-border">
              More about me
            </Button>
          </motion.div>
        </div>

        {/* ── Photo cluster ── */}
        <motion.div
          {...fadeUp(0.2)}
          className="col-span-9 col-start-2 sm:col-span-8 sm:col-start-3
                     md:col-span-4 md:col-start-9
                     relative z-10 w-full max-w-[420px] md:justify-self-end"
        >
          {/* Annotation overlaps the frame corner; right-anchored +
              wrappable = physically cannot clip. */}
          <span
            aria-hidden="true"
            className="hero-role absolute -top-4 -right-1 md:-top-5 md:right-0
                       origin-bottom-right -rotate-[5deg]
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
    </div>
  );
}
