// The hero answers three recruiter questions in order: who Sanaz is, what she
// does now, and how she got here. The portrait and speech bubble keep the
// existing personality without carrying the burden of explaining the value
// proposition. All copy comes from profile.js through the localized profile.
//
// Every entrance is a CSS keyframe (theme.css, "Reveals") so the first paint
// does not wait on the motion library. Reduced-motion collapses the durations.

import React from "react";
import { Link } from "react-router-dom";
import { HandArrow, HandBubbleTail } from "./HandArrow";
import { InkCtaButton } from "./Button";

export function Hero({ data }) {
  const narrative = data.heroNarrative || {};
  const careerPath = data.careerPath || [];

  return (
    <div className="grid-12 items-end">
      <div className="md:col-span-7 flex flex-col gap-s24">
        <h1 className="flex flex-col gap-s8">
          <span
            className="block text-aside font-hand font-normal text-text-meta enter-up"
            style={{ "--enter-delay": "0.06s" }}
          >
            {narrative.intro || `Hi, I'm ${data.name}.`}
          </span>

          <span
            className="block text-label font-mono uppercase text-primary-600 enter-up"
            style={{ "--enter-delay": "0.1s" }}
          >
            {data.role || "UX Engineer"}
          </span>

          <span
            className="block text-hero font-display font-extrabold text-text-display enter-up"
            style={{ "--enter-delay": "0.14s" }}
          >
            {narrative.workflow || data.positioning}
          </span>
        </h1>

        {narrative.statement && (
          <p
            className="enter-up text-statement text-text max-w-measure"
            style={{ "--enter-delay": "0.22s" }}
          >
            {narrative.statement}
          </p>
        )}

        {careerPath.length > 0 && (
          <div
            className="enter-up flex flex-wrap items-center gap-x-s8 gap-y-s6 text-meta font-mono text-text-meta"
            style={{ "--enter-delay": "0.27s" }}
            aria-label={`${narrative.careerPathLabel || "My path"}: ${careerPath.map((step) => step.label).join(", ")}`}
          >
            <span className="text-primary-600">
              {narrative.careerPathLabel || "My path"}
            </span>
            <span aria-hidden="true">—</span>
            {careerPath.map((step, index) => (
              <React.Fragment key={step.id || step.phase || step.label}>
                {index > 0 && <span aria-hidden="true">→</span>}
                <span
                  aria-hidden="true"
                  className={step.highlight ? "font-medium text-primary-600" : undefined}
                >
                  {step.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}

        <div
          className="enter-up flex flex-wrap items-center gap-s28 mt-s8"
          style={{ "--enter-delay": "0.32s" }}
        >
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
        </div>
      </div>

      {/* Portrait — 4:5, in colour. Keeping the CTA as the final item in the
          left column preserves the original portrait-to-CTA baseline geometry. */}
      <div
        className="enter-up group/photo relative md:col-start-9 md:col-span-4 mt-s48 md:mt-0"
        style={{ "--enter-delay": "0.18s", marginBottom: "var(--hero-baseline-inset)" }}
      >
        <div className="relative">
          <div className="group w-full aspect-portrait photo-frame rule-frame-in">
            <div className="w-full h-full overflow-hidden">
              <img
                src={data.aboutImage}
                alt={data.name}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top
                           transition-transform duration-[250ms] ease-smooth group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>

        {/* Personality, not positioning: this line should remain memorable but
            visually secondary to the professional proposition on the left. */}
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
            className="hidden lg:block absolute left-full top-1/2
                       -translate-y-1/2 -ml-s16 z-10 pointer-events-none
                       [color:var(--rule-line-color)]"
          />
        </p>
      </div>
    </div>
  );
}
