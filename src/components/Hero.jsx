// Hero positioning: the left column answers three recruiter questions in
// order — who Sanaz is, what she does, and how she got here. The portrait and
// speech bubble keep the existing personality without carrying the burden of
// explaining the professional proposition.

import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HandArrow, HandBubbleTail, HandRoleArrow } from "./HandArrow";
import { InkCtaButton } from "./Button";
import { EASE } from "../utils/motion";
import { useIsMobile } from "../hooks/useIsMobile";

const ENTRANCE_DURATION = 0.4;

export function Hero({ data }) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const narrative = data.heroNarrative || {};
  const careerPath = narrative.careerPath || data.careerPath || [];

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

  const pathItems = narrative.careerPath || [];

  return (
    <div className="grid-12 items-end">
      <div className="md:col-span-7 flex flex-col gap-s24">
        <div>
          <motion.p
            {...fadeUp(0.04)}
            className="text-aside font-hand text-text-meta mb-s8"
          >
            {narrative.intro || `Hi, I'm ${data.name?.split(' ')[0] || 'Sanaz'}.`}
          </motion.p>

          <motion.p
            {...fadeUp(0.08)}
            className="text-label font-mono uppercase text-primary-600 mb-s12"
          >
            {data.role || "UX Engineer"}
          </motion.p>

          <h1 className="font-display font-extrabold text-text-display text-h2 md:text-hero">
            <motion.span {...fadeUp(0.12)} className="block">
              {narrative.workflow || data.positioning}
            </motion.span>
          </h1>
        </div>

        <motion.p
          {...fadeUp(0.2)}
          className="text-statement text-text max-w-measure"
        >
          {narrative.statement}
        </motion.p>

        <motion.div {...fadeUp(0.28)} className="flex flex-wrap items-center gap-s28 mt-s8">
          <InkCtaButton to="/projects">
            {narrative.ctas?.work || "View Case Studies"} <HandArrow />
          </InkCtaButton>
          <Link
            to="/cv"
            className="relative text-body font-medium text-text pb-s2
                       hover:text-primary-600 transition-colors duration-200 focus-ring group/cv"
          >
            {narrative.ctas?.cv || "View CV"}
            <span
              aria-hidden="true"
              style={{ height: "var(--rule-w)" }}
              className="absolute left-0 right-0 bottom-0 bg-text rule-stroke
                         transition-colors duration-200 group-hover/cv:bg-primary-600"
            />
          </Link>
        </motion.div>

        {pathItems.length > 0 && (
          <motion.div
            {...fadeUp(0.34)}
            className="pt-s16 border-t rule-t text-date font-mono text-text-meta"
            aria-label={narrative.careerPathLabel || "My path"}
          >
            <span className="text-primary-600 mr-s8">
              {narrative.careerPathLabel || "My path"} —
            </span>
            <span className="inline-flex flex-wrap gap-x-s6 gap-y-s3">
              {pathItems.map((item, index) => (
                <React.Fragment key={item.id || item.label}>
                  <span className={item.highlight ? "text-primary-600 font-bold" : "text-text-meta"}>
                    {item.label}
                  </span>
                  {index < pathItems.length - 1 && (
                    <span aria-hidden="true" className="text-dim">→</span>
                  )}
                </React.Fragment>
              ))}
            </span>
          </motion.div>
        )}
      </div>

      <motion.div
        {...fadeUp(0.18)}
        className="group/photo relative md:col-start-9 md:col-span-4 mt-s48 md:mt-0"
        style={{ marginBottom: "var(--hero-baseline-inset)" }}
      >
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
          {data.tagline || narrative.tagline || "I speak both ‘user’ & ‘developer’."}
          <HandBubbleTail
            className="hidden lg:block absolute left-full top-1/2
                       -translate-y-1/2 -ml-s16 z-10 pointer-events-none
                       [color:var(--rule-line-color)]"
          />
        </motion.p>
      </motion.div>
    </div>
  );
}
