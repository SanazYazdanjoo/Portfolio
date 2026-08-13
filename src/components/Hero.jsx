// The photo cluster reserves headroom (pt-10 md:pt-12) so the handwritten
// role badge sits inside the layout box at top-0 instead of hanging above it
// via negative offsets — that way it can't get clipped by an ancestor's
// overflow-hidden. Home.jsx's Hero-Section wrapper must stay overflow-visible
// to match.

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { Button, SolidButton } from "./Button";
import { InkHighlight } from "./InkHighlight";

// Shared entrance timing — 400ms max per the motion spec, single easing
// token, staggered per element (kicker 60ms, name lines 120/180ms, portrait
// 240ms, tagline 320ms). Nav's own entrance (0ms) lives in Nav.jsx.
const EASE = [0.22, 0.61, 0.36, 1];
const ENTRANCE_DURATION = 0.4;

export function Hero({ data }) {
  const prefersReducedMotion = useReducedMotion();

  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0 : ENTRANCE_DURATION, delay, ease: EASE },
  });

  const { t } = useTranslation();

  return (
    <div className="relative w-full flex flex-col pt-6 md:pt-10 pb-4 min-h-0 md:max-h-[100vh]">

      {/* Kicker: the 2-second read */}
      <motion.p
        {...fadeUp(0.06)}
        className="text-2xs md:text-xs font-bold uppercase
                   tracking-[0.28em] text-text-dim mb-5 md:mb-7"
      >
        {t("hero.kicker")}&nbsp;&nbsp;—&nbsp;&nbsp;{data.heroMeta?.location ?? data.contact?.location}
      </motion.p>

      {/* Name + Photo: 12-col editorial grid (≈ 70/30 split), bottom-aligned
          so the portrait's baseline matches the last name line's baseline. */}
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 items-end">

        <h1
          className="type-hero col-span-12 md:col-span-8 md:col-start-1 md:row-start-1
                     relative z-20 text-text pointer-events-none"
        >
          <motion.span {...fadeUp(0.12)} className="block">{firstName}</motion.span>
          <motion.span {...fadeUp(0.18)} className="block">{lastName}</motion.span>
          <span className="sr-only"> — {data.role || "UX Engineer"}</span>
        </h1>

        {/* Photo cluster — pt-* reserves space for the badge inside the box */}
        <motion.div
          {...fadeUp(0.24)}
          className="col-span-9 col-start-2 sm:col-span-8 sm:col-start-3 mt-6 md:mt-0
                     md:col-span-4 md:col-start-9 md:row-start-1
                     relative z-10 pt-8 md:pt-10"
        >
          {/* Badge lives in the reserved headroom: top-0, right-anchored,
              wrappable via max-w — no negative offsets, so it can't clip. */}
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
                       transition-transform duration-[250ms] ease-smooth
                       hover:rotate-0 hover:scale-[1.02]"
          >
            <img
              src={data.aboutImage}
              alt={data.name}
              className="w-full h-auto object-cover grayscale
                         transition-all duration-[400ms] ease-smooth hover:grayscale-0"
              style={{ aspectRatio: "4 / 5" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Tagline: the one gold-highlighter moment on this page. The sweep
          fires once, timed to start just after the tagline itself settles
          (delay 0.32 + entrance duration 0.4 ≈ 0.72s). */}
      <motion.p
        {...fadeUp(0.32)}
        className="type-tagline hero-tagline max-w-2xl mt-4 md:mt-5"
      >
        <InkHighlight triggerOnLoad delay={0.75} duration={0.4}>
          {data.tagline || "I speak both ‘user’ and ‘developer’."}
        </InkHighlight>
      </motion.p>

      {/* CTA row. The work is the primary action — a recruiter's first
          question is "what has she built?", not "who is she?". About/CV
          stay reachable as plain text links so there's one visual primary,
          not three competing SolidButtons. */}
      <motion.div
        {...fadeUp(0.38)}
        className="mt-4 md:mt-5 flex flex-wrap items-center gap-x-6 gap-y-3"
      >
        <SolidButton
          to="/projects"
          className="text-sm md:text-base uppercase tracking-[0.18em]"
        >
          {t("hero.ctaWork")}
        </SolidButton>
        <Button to="/cv" className="text-sm uppercase tracking-[0.14em]">
          {t("hero.ctaCv")}
        </Button>
        <Button to="/about" className="text-sm uppercase tracking-[0.14em]">
          {t("nav.about")}
        </Button>
      </motion.div>
    </div>
  );
}
