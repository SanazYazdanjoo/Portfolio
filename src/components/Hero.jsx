// The hero: text cols 1-7, portrait cols 9-12, the grid bottom-aligned so
// the portrait's bottom edge lands on the CTA row. --hero-baseline-inset
// lifts it from the button's bottom EDGE to its text baseline; that inset is
// the button's own bottom padding plus DM Sans's descent, derived in
// theme.css.
//
// The headline is the word PORTFOLIO under a handwritten "Hi, welcome to my"
// greeting — the name and the positioning sentence that used to stand here
// are gone; the name still reaches assistive tech through the sr-only span.
// The handwritten line under the buttons stays an aside: muted and
// unhighlighted, rather than a second headline competing with the title.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { HandArrow, HandBubbleTail, HandRoleArrow } from "./HandArrow";
import { InkCtaButton } from "./Button";
import { EASE } from "../utils/motion";
import { useIsMobile } from "../hooks/useIsMobile";

const ENTRANCE_DURATION = 0.4;

export function Hero({ data }) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  // The bubble arrives like a spoken line: it pops from the tail's corner
  // with a little overshoot, then breathes on the spot. The idle loop is
  // deliberately tiny (2px, 5s) and OFF on phones — a continuous ornament
  // loop there reads as the page shaking, which is what calmed the FAB.
  const bubbleHover = reduce
    ? undefined
    : { scale: 1.045, rotate: -1.6, transition: { type: "spring", stiffness: 340, damping: 14 } };

  const bubbleMotion = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, scale: 0.86, rotate: -2.5 },
        animate: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: isMobile ? 0 : [0, -2.5, 0, 2, 0],
        },
        transition: {
          opacity: { duration: ENTRANCE_DURATION, delay: 0.34, ease: EASE },
          scale: { type: "spring", stiffness: 320, damping: 12, delay: 0.34 },
          rotate: { type: "spring", stiffness: 300, damping: 11, delay: 0.34 },
          y: isMobile
            ? { duration: 0 }
            : { duration: 6, delay: 1.1, repeat: Infinity, ease: "easeInOut" },
        },
      };

  const fadeUp = (delay = 0) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : ENTRANCE_DURATION, delay, ease: EASE },
  });

  return (
    <div className="grid-12 items-end">
      <div className="md:col-span-7 flex flex-col gap-s24">
        <h1 className="text-hero font-display font-extrabold text-text-display">
          <motion.span
            {...fadeUp(0.06)}
            className="block text-aside font-hand font-normal text-text-meta"
          >
            {t("hero.welcome")}
          </motion.span>
          <motion.span {...fadeUp(0.12)} className="block">{t("hero.portfolio")}</motion.span>
          <span className="sr-only"> — {data.name}, {data.role || "UX Engineer"}</span>
        </h1>


        <motion.div {...fadeUp(0.32)} className="flex flex-wrap items-center gap-s28 mt-s8">
          <InkCtaButton to="/projects">
            {t("hero.ctaWork")} <HandArrow />
          </InkCtaButton>
          <Link
            to="/cv"
            className="relative text-body font-medium text-text pb-s2
                       hover:text-primary-600 transition-colors duration-200 focus-ring group/cv"
          >
            {t("hero.ctaCv")}
            <span
              aria-hidden="true"
              style={{ height: "var(--rule-w)" }}
              className="absolute left-0 right-0 bottom-0 bg-text rule-stroke
                         transition-colors duration-200 group-hover/cv:bg-primary-600"
            />
          </Link>
        </motion.div>

      </div>

      {/* Portrait — 4:5, in colour, bottom edge on the CTA baseline. The
          inner wrapper clips the hover scale to the photo well, so the
          image never rides over the mat or the drawn frame line. */}
      <motion.div
        {...fadeUp(0.18)}
        className="group/photo relative md:col-start-9 md:col-span-4 mt-s48 md:mt-0"
        style={{ marginBottom: "var(--hero-baseline-inset)" }}
      >
        {/* The photo and its role label share a relative box of their own:
            the label anchors to the PHOTO's bottom edge, not the column's,
            which below lg also holds the speech bubble under it. */}
        <div className="relative">
        <div className="group w-full aspect-portrait photo-frame rule-frame-in">
          <div className="w-full h-full overflow-hidden">
            <img
              src={data.aboutImage}
              alt={data.name}
              className="w-full h-full object-cover object-top
                         transition-transform duration-[250ms] ease-smooth group-hover:scale-[1.04]"
            />
          </div>
        </div>
        {/* The role, labelled under the photo with a small drawn arrow
            pointing back up at it. Absolute, so it adds no height to the
            portrait column and the photo's bottom edge stays on the CTA
            baseline; below lg the bubble's top margin leaves it room. */}
        <span
          aria-hidden="true"
          className="absolute top-full right-s24 mt-s6 flex items-start gap-s6"
        >
          <span className="mt-s12 text-date font-mono text-text-meta">
            {data.role || "UX Engineer"}
          </span>
          <HandRoleArrow className="shrink-0 text-text-meta" />
        </span>
        </div>



        {/* The aside, in a hand-drawn speech bubble the portrait is saying.
            Below lg it simply sits under the photo; from lg up it lifts out
            of flow and parks off the photo's top-left corner, with the tail
            running back down onto the frame. `rule-bubble` is a stretched
            oval, so the box has to stay near its 2.1:1 aspect or the line
            thickens on one axis — hence the fixed measure and the centred
            two-line wrap rather than one long line. Absolute at lg, so it
            never moves the portrait's baseline or the CTA row. */}
        <motion.p
          {...bubbleMotion}
          whileHover={bubbleHover}
          style={{ transformOrigin: "85% 60%" }}
          className="relative mt-s56 mx-auto w-[18ch] rule-bubble
                     px-s24 py-s16 text-center text-aside font-hand text-text-meta
                     hover:[--rule-line-color:var(--blush)]
                     group-hover/photo:[--rule-line-color:var(--blush)]
                     lg:absolute lg:mt-0 lg:top-s24 lg:right-[calc(100%+72px)]"
        >
          {data.tagline || "I speak both ‘user’ & ‘developer’."}
          <HandBubbleTail
            /* Inked with the bubble's own line colour — an arbitrary
               PROPERTY, not a text-* utility, so one hover rule warms the
               oval and the tail together without hardcoding a type value. */
            className="hidden lg:block absolute left-full top-1/2
                       -translate-y-1/2 -ml-s16 z-10 pointer-events-none
                       [color:var(--rule-line-color)]"
          />
        </motion.p>
      </motion.div>

    </div>
  );
}
