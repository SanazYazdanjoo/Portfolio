// The hero on the page's 12-column grid: text in cols 1-7, photo in cols
// 9-12, column 8 empty.
//
// Two alignments hold the block together, and neither is eyeballed:
//
//   photo top    = the cap height of the name's first line
//   photo bottom = the CTA row's text baseline
//
// The photo sits in the same grid row as the name-through-CTA block, so
// CSS Grid's `stretch` already gives it that row's exact height. The two
// insets that turn the row's box edges into the two type edges are
// --hero-cap-inset and --hero-baseline-inset, both computed from real font
// metrics in theme.css. The eyebrow is its own row above, which is why the
// photo does not have to know how tall the eyebrow is.
//
// Every other length is a spacing token and every size is a type step.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { InkHighlight } from "./InkHighlight";
import { EASE } from "../utils/motion";

// Shared entrance timing — 400ms max per the motion spec, single easing token.
const ENTRANCE_DURATION = 0.4;

export function Hero({ data }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  const nameParts = (data.name || "").trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const fadeUp = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion ? 0 : ENTRANCE_DURATION, delay, ease: EASE },
  });

  return (
    <div className="grid-12">

      {/* Row 1 — eyebrow. Its own row so the photo below can align to the
          name rather than to the top of the whole text column. */}
      <motion.p
        {...fadeUp(0.06)}
        className="md:col-span-7 md:row-start-1 type-label text-text-meta mb-s24"
      >
        {t("hero.kicker")}&nbsp;&nbsp;—&nbsp;&nbsp;{data.heroMeta?.location ?? data.contact?.location}
      </motion.p>

      {/* Row 2 — name, positioning, tagline, CTA */}
      <div className="md:col-span-7 md:row-start-2">
        <h1 className="type-display text-text">
          <motion.span {...fadeUp(0.12)} className="block">{firstName}</motion.span>
          <motion.span {...fadeUp(0.18)} className="block">{lastName}</motion.span>
          <span className="sr-only"> — {data.role || "UX Engineer"}</span>
        </h1>

        {/* The subhead: role, specialism, and what she is looking for. */}
        {data.positioning && (
          <motion.p {...fadeUp(0.3)} className="mt-s24 text-body-lg text-text">
            {data.positioning}
          </motion.p>
        )}

        {/* The handwritten line, at h3 so it has presence rather than
            reading as a caption under the subhead. */}
        <motion.p {...fadeUp(0.32)} className="mt-s16 font-hand font-bold text-h3 leading-none">
          <InkHighlight triggerOnLoad delay={0.75} duration={0.4}>
            {data.tagline || "I speak both ‘user’ and ‘developer’."}
          </InkHighlight>
        </motion.p>

        <motion.div {...fadeUp(0.38)} className="mt-s48 flex flex-wrap items-center gap-x-s32 gap-y-s16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-s12 bg-text rule-fill-r text-bg
                       px-s24 py-s16 rounded-[var(--radius)] text-body-lg font-bold
                       transition-opacity duration-200 hover:opacity-90 focus-ring"
          >
            {t("hero.ctaWork")}
            <svg className="w-s16 h-s16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            to="/cv"
            className="text-body font-semibold text-text rule-underline
                       hover:text-primary-600 transition-colors duration-200 focus-ring"
          >
            {t("hero.ctaCv")}
          </Link>
        </motion.div>
      </div>

      {/* Photo — same grid row as the block above, so `stretch` sizes it to
          that row. The two insets move its edges from the row's box edges to
          the cap height and the baseline. */}
      <motion.div
        {...fadeUp(0.24)}
        className="hidden md:block md:col-start-9 md:col-span-4 md:row-start-2"
        style={{
          marginTop: "var(--hero-cap-inset)",
          marginBottom: "var(--hero-baseline-inset)",
        }}
      >
        <div className="photo-frame rule-frame-in h-full">
          <img
            src={data.aboutImage}
            alt={data.name}
            className="w-full h-full object-cover object-top grayscale
                       transition-[filter] duration-[400ms] ease-smooth hover:grayscale-0"
          />
        </div>
      </motion.div>

      {/* Below md the grid is one column and the alignment above has nothing
          to align to, so the photo runs at its own ratio under the text. */}
      <motion.div {...fadeUp(0.24)} className="md:hidden mt-s48">
        <div className="photo-frame rule-frame-in">
          <img
            src={data.aboutImage}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-cover grayscale"
            style={{ aspectRatio: "4 / 5" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
