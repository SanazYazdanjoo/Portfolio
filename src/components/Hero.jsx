// The hero, matching the design reference: text cols 1-7, portrait cols
// 9-12, the grid bottom-aligned so the portrait's bottom edge lands on the
// CTA row. The reference's portrait plate reads "4:5 · b/w · bottom edge on
// CTA baseline" — `align-items:end` puts it on the button's bottom EDGE, so
// --hero-baseline-inset lifts it the rest of the way to the text baseline.
// That inset is the button's own bottom padding plus DM Sans's descent; the
// derivation is written out in theme.css.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { InkHighlight } from "./InkHighlight";
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

  return (
    <div className="grid-12 items-end">
      <div className="md:col-span-7 flex flex-col gap-s24">
        <motion.p {...fadeUp(0.06)} className="text-label font-mono uppercase text-text-dim">
          {t("hero.kicker")} — {data.heroMeta?.location ?? data.contact?.location}
        </motion.p>

        <h1 className="text-hero font-display font-extrabold text-text-display">
          <motion.span {...fadeUp(0.12)} className="block">{firstName}</motion.span>
          <motion.span {...fadeUp(0.18)} className="block">{lastName}</motion.span>
          <span className="sr-only"> — {data.role || "UX Engineer"}</span>
        </h1>

        {data.positioning && (
          <motion.p {...fadeUp(0.3)} className="text-lead text-text">
            {data.positioning}
          </motion.p>
        )}

        {/* The reference sets the highlighter as a flat gradient stopping at
            42% of the line box, not as a drawn sweep. */}
        <motion.p {...fadeUp(0.32)} className="text-hand font-hand text-text">
          <InkHighlight triggerOnLoad delay={0.75} duration={0.4}>
            {data.tagline || "I speak both ‘user’ and ‘developer’."}
          </InkHighlight>
        </motion.p>

        <motion.div {...fadeUp(0.38)} className="flex flex-wrap items-center gap-s28 mt-s8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-s10 bg-text rule-fill-r text-bg text-body font-medium
                       px-s26 py-s15 rounded-sm hover:opacity-90 transition-opacity duration-200 focus-ring"
          >
            {t("hero.ctaWork")} <span aria-hidden="true">&rarr;</span>
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
      </div>

      {/* Portrait — 4:5, black and white, bottom edge on the CTA baseline. */}
      <motion.div
        {...fadeUp(0.24)}
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
