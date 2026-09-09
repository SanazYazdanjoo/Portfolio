// The hero: text cols 1-7, portrait cols 9-12, the grid bottom-aligned so
// the portrait's bottom edge lands on the CTA row. --hero-baseline-inset
// lifts it from the button's bottom EDGE to its text baseline; that inset is
// the button's own bottom padding plus DM Sans's descent, derived in
// theme.css.
//
// The headline is the word PORTFOLIO under a handwritten "Hi, welcome to my"
// greeting; the name reaches assistive tech through the sr-only span. Under
// it, the positioning sentence and a mono credential line answer "why
// Sanaz" before the three actions: work, CV, contact.
//
// Every entrance here is a CSS keyframe (theme.css, "Reveals"): the hero is
// the first thing painted on the site's most-visited route, and it no
// longer waits on the motion library to animate in. The reduced-motion
// block in theme.css collapses every duration to nothing.

import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { HandArrow, HandBubbleTail, HandRoleArrow } from "./HandArrow";
import { InkCtaButton } from "./Button";

export function Hero({ data }) {
  const { t } = useTranslation();

  return (
    <div className="grid-12 items-end">
      <div className="md:col-span-7 flex flex-col gap-s24">
        <h1 className="text-hero font-display font-extrabold text-text-display">
          <span
            className="block text-aside font-hand font-normal text-text-meta enter-up"
            style={{ "--enter-delay": "0.06s" }}
          >
            {t("hero.welcome")}
          </span>
          <span className="block enter-up" style={{ "--enter-delay": "0.12s" }}>
            {t("hero.portfolio")}
          </span>
          <span className="sr-only"> — {data.name}, {data.role || "UX Engineer"}</span>
        </h1>

        {/* The positioning statement and its proof line. A recruiter should
            read "why Sanaz" within seconds: the bridge she works across,
            then the credential and the three capabilities that back it —
            statement step for the sentence, mono meta for the evidence. */}
        {data.positioning && (
          <div className="enter-up flex flex-col gap-s12" style={{ "--enter-delay": "0.2s" }}>
            <p className="text-statement text-text">{data.positioning}</p>
            <p className="text-meta font-mono text-text-meta">{t("hero.credentials")}</p>
          </div>
        )}

        <div className="enter-up flex flex-wrap items-center gap-s28 mt-s8" style={{ "--enter-delay": "0.32s" }}>
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
          <Link
            to="/contact"
            className="relative text-body font-medium text-text pb-s2
                       hover:text-primary-600 transition-colors duration-200 focus-ring group/contact"
          >
            {t("hero.ctaContact")}
            <span
              aria-hidden="true"
              style={{ height: "var(--rule-w)" }}
              className="absolute left-0 right-0 bottom-0 bg-text rule-stroke
                         transition-colors duration-200 group-hover/contact:bg-primary-600"
            />
          </Link>
        </div>

      </div>

      {/* Portrait — 4:5, in colour, bottom edge on the CTA baseline. The
          inner wrapper clips the hover scale to the photo well, so the
          image never rides over the mat or the drawn frame line. */}
      <div
        className="enter-up group/photo relative md:col-start-9 md:col-span-4 mt-s48 md:mt-0"
        style={{ "--enter-delay": "0.18s", marginBottom: "var(--hero-baseline-inset)" }}
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
            never moves the portrait's baseline or the CTA row.

            It arrives like a spoken line — the enter-pop keyframe overshoots
            from the tail's corner — then breathes on the spot via
            .bubble-idle, which theme.css enables from md up only: a
            continuous ornament loop on a phone reads as the page shaking. */}
        <p
          className="enter-pop bubble-idle relative mt-s56 mx-auto w-[18ch] rule-bubble
                     px-s24 py-s16 text-center text-aside font-hand text-text-meta
                     transition-transform duration-[250ms] ease-smooth
                     hover:scale-[1.045] hover:-rotate-[1.6deg]
                     hover:[--rule-line-color:var(--blush)]
                     group-hover/photo:[--rule-line-color:var(--blush)]
                     lg:absolute lg:mt-0 lg:top-s24 lg:right-[calc(100%+72px)]"
          style={{ transformOrigin: "85% 60%", "--enter-delay": "0.34s" }}
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
        </p>
      </div>

    </div>
  );
}
