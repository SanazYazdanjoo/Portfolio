// The hero: text cols 1-7, portrait cols 9-12, the grid bottom-aligned so
// the portrait's bottom edge lands on the CTA row. --hero-baseline-inset
// lifts it from the button's bottom EDGE to its text baseline; that inset is
// the button's own bottom padding plus DM Sans's descent, derived in
// theme.css.
//
// Three blocks, not five. The eyebrow that used to sit above the name said
// the same things as the positioning line and the credential line — one of
// which is now above the buttons and the other below them — so it is gone.
// The positioning line is one sentence at 21px, and the handwritten line
// under it is an aside: muted, unhighlighted, rather than a second headline
// competing with the name.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { HandArrow } from "./HandArrow";
import { EASE } from "../utils/motion";

const ENTRANCE_DURATION = 0.4;

export function Hero({ data }) {
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const fadeUp = (delay = 0) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : ENTRANCE_DURATION, delay, ease: EASE },
  });

  // The credential and the location, on one line under the buttons. Both
  // already exist in profile data — this is where they are read, not a
  // second copy of them.
  const credentials = [
    data.heroMeta?.credential,
    data.heroMeta?.location ?? data.contact?.location,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="grid-12 items-end">
      <div className="md:col-span-7 flex flex-col gap-s24">
        <h1 className="text-hero font-display font-extrabold text-text-display">
          <motion.span {...fadeUp(0.06)} className="block">{firstName}</motion.span>
          <motion.span {...fadeUp(0.12)} className="block">{lastName}</motion.span>
          <span className="sr-only"> — {data.role || "UX Engineer"}</span>
        </h1>

        {data.positioning && (
          <motion.p {...fadeUp(0.24)} className="text-statement text-text">
            {data.positioning}
          </motion.p>
        )}

        {/* An aside: muted ink, no highlighter behind it. */}
        <motion.p {...fadeUp(0.28)} className="text-aside font-hand text-text-meta">
          {data.tagline || "I speak both ‘user’ and ‘developer’."}
        </motion.p>

        <motion.div {...fadeUp(0.32)} className="flex flex-wrap items-center gap-s28 mt-s8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-s10 bg-text rule-fill-r text-bg text-body font-medium
                       px-s26 py-s15 rounded-sm hover:opacity-90 transition-opacity duration-200 focus-ring"
          >
            {t("hero.ctaWork")} <HandArrow />
          </Link>
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

        {credentials && (
          <motion.p {...fadeUp(0.36)} className="text-date font-mono text-text-meta">
            {credentials}
          </motion.p>
        )}
      </div>

      {/* Portrait — 4:5, black and white, bottom edge on the CTA baseline. */}
      <motion.div
        {...fadeUp(0.18)}
        className="md:col-start-9 md:col-span-4 mt-s48 md:mt-0"
        style={{ marginBottom: "var(--hero-baseline-inset)" }}
      >
        <div className="w-full aspect-portrait photo-frame rule-frame-in">
          <img
            src={data.aboutImage}
            alt={data.name}
            className="w-full h-full object-cover object-top grayscale"
          />
        </div>
      </motion.div>
    </div>
  );
}
