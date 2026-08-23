// One optical block: the eyebrow, name, positioning line and tagline sit in
// the left column, the headshot in the right, and CSS Grid's default
// `stretch` makes the two columns end at the same y. That is what pins the
// photo's top edge to the eyebrow line and its bottom edge to the tagline
// baseline — no magic offsets, and it holds at every breakpoint because the
// row height is whichever column is taller. `mt-auto` on the tagline is the
// other half of the rule: when the photo is the taller of the two, the slack
// lands between the positioning line and the tagline rather than under it,
// so the tagline stays welded to the photo's bottom edge.
//
// The handwritten role badge that used to hang over the photo is gone: it
// said "UX Engineer", which is the first half of the eyebrow line and now
// also the first two words of the positioning statement. The role still
// reaches assistive tech via the sr-only span inside the <h1>.

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { Button, SolidButton } from "./Button";
import { InkHighlight } from "./InkHighlight";
import { EASE } from "../utils/motion";

// Shared entrance timing — 400ms max per the motion spec, single easing
// token, staggered per element (kicker 60ms, name lines 120/180ms, portrait
// 240ms, positioning 300ms, tagline 320ms). Nav's own entrance (0ms) lives
// in Nav.jsx.
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
    // No viewport cap. The name is the largest thing on the site and a
    // max-h that made it fit a fold would be the viewport setting the type
    // scale, which is backwards — the hero is allowed to run past the fold.
    <div className="relative w-full flex flex-col pt-4 md:pt-6 pb-6">

      <div className="grid grid-cols-12 gap-x-6 md:gap-x-8 items-stretch">

        {/* Text column — eyebrow at the top, tagline pinned to the bottom */}
        <div className="col-span-12 md:col-span-8 flex flex-col">

          {/* Kicker: the 2-second read. 12px floor for an all-caps,
              letter-spaced label (see tracking-caps in tailwind.config). */}
          <motion.p
            {...fadeUp(0.06)}
            className="text-xs font-bold uppercase tracking-caps
                       text-text-meta mb-4 md:mb-5"
          >
            {t("hero.kicker")}&nbsp;&nbsp;—&nbsp;&nbsp;{data.heroMeta?.location ?? data.contact?.location}
          </motion.p>

          <h1 className="type-hero relative z-20 text-text pointer-events-none">
            <motion.span {...fadeUp(0.12)} className="block">{firstName}</motion.span>
            <motion.span {...fadeUp(0.18)} className="block">{lastName}</motion.span>
            <span className="sr-only"> — {data.role || "UX Engineer"}</span>
          </h1>

          {/* Positioning statement — role + specialism + what I'm looking
              for, in one line of plain prose. This is the sentence a
              recruiter needs and the handwritten tagline can't carry. */}
          {data.positioning && (
            <motion.p
              {...fadeUp(0.3)}
              className="max-w-[52ch] mt-5 md:mt-6 text-subhead text-text"
            >
              {data.positioning}
            </motion.p>
          )}

          {/* Tagline: the one gold-highlighter moment on this page. The sweep
              fires once, timed to start just after the tagline itself settles
              (delay 0.32 + entrance duration 0.4 ≈ 0.72s). */}
          <motion.p
            {...fadeUp(0.32)}
            className="hero-tagline max-w-2xl mt-auto pt-5
                       font-hand font-bold text-2xl md:text-3xl leading-[1.15]"
          >
            <InkHighlight triggerOnLoad delay={0.75} duration={0.4}>
              {data.tagline || "I speak both ‘user’ and ‘developer’."}
            </InkHighlight>
          </motion.p>
        </div>

        {/* Photo column — `h-full` inside the stretched grid cell is what
            makes the frame span exactly eyebrow-top to tagline-bottom. The
            crop is horizontal (the box is narrower per unit height than the
            source 4:5), so object-cover never cuts the face. */}
        <motion.div
          {...fadeUp(0.24)}
          className="col-span-8 col-start-3 sm:col-span-6 sm:col-start-4 mt-8 md:mt-0
                     md:col-span-3 md:col-start-10 relative z-10"
        >
          <div
            className="photo-frame rule-frame-in relative z-20 rotate-1 h-full
                       transition-transform duration-[250ms] ease-smooth
                       hover:rotate-0 hover:scale-[1.02]"
          >
            <img
              src={data.aboutImage}
              alt={data.name}
              className="w-full h-full object-cover object-center grayscale
                         aspect-[4/5] md:aspect-auto md:min-h-[320px]
                         transition-all duration-[400ms] ease-smooth hover:grayscale-0"
            />
          </div>
        </motion.div>
      </div>

      {/* CTA row. One primary — the work — carrying the house hand-drawn
          underline so it reads as the page's single ask at rest, not only on
          hover. CV is the secondary; "About" is gone because it is already
          in the primary nav two lines above. */}
      <motion.div
        {...fadeUp(0.38)}
        className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
      >
        <SolidButton
          to="/projects"
          className="rule-underline"
        >
          {t("hero.ctaWork")}
        </SolidButton>
        <Button
          to="/cv"
          className="text-xs uppercase tracking-caps font-bold text-text-meta hover:text-primary-600"
        >
          {t("hero.ctaCv")}
        </Button>
      </motion.div>
    </div>
  );
}
