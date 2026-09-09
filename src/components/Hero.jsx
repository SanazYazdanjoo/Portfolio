// The hero answers three recruiter questions in order: who Sanaz is, what she
// does now, and how she got here. The composition is deliberately editorial:
// a dominant process statement, a quieter evidence trail, and a portrait that
// supports the story instead of competing with it. All copy comes from
// profile.js through the localized profile.
//
// Every entrance is a CSS keyframe (theme.css, "Reveals") so the first paint
// does not wait on the motion library. Reduced-motion collapses the durations.

import React from "react";
import { Link } from "react-router-dom";
import { HandArrow } from "./HandArrow";
import { InkCtaButton } from "./Button";

export function Hero({ data }) {
  const narrative = data.heroNarrative || {};
  const careerPath = data.careerPath || [];
  const workflow = narrative.workflow || data.positioning || "";
  const workflowSteps = workflow
    .split("\u2192")
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <div className="grid-12 items-start">
      {/* 9/3 on large screens gives the value proposition enough editorial
          width to resolve as three strong beats instead of four accidental
          lines. Tablet keeps the roomier 7/4 split. */}
      <div className="md:col-span-7 lg:col-span-9 flex flex-col gap-s28">
        <h1 className="flex flex-col gap-s16">
          {/* Identity is one compact eyebrow row — not two competing lines. */}
          <span
            className="enter-up flex flex-wrap items-baseline gap-x-s16 gap-y-s3"
            style={{ "--enter-delay": "0.06s" }}
          >
            <span className="text-aside font-hand font-normal text-text-meta">
              {narrative.intro || `Hi, I'm ${data.name}.`}
            </span>
            <span aria-hidden="true" className="text-small text-dim">/</span>
            <span className="text-label font-mono uppercase text-primary-600">
              {data.role || "UX Engineer"}
            </span>
          </span>

          <span
            className="block text-hero font-display font-extrabold text-text-display enter-up"
            style={{ "--enter-delay": "0.14s" }}
          >
            <span className="sr-only">{workflow}</span>
            <span aria-hidden="true">
              {workflowSteps.map((step, index) => (
                <span
                  key={step}
                  className={`block ${index === 1 ? "text-primary" : ""}`}
                >
                  {step}
                </span>
              ))}
            </span>
          </span>
        </h1>

        {narrative.statement && (
          <p
            className="enter-up text-statement text-text lg:pr-s88"
            style={{ "--enter-delay": "0.22s" }}
          >
            {narrative.statement}
          </p>
        )}

        {/* The career story is a provenance strip, not another sentence full
            of arrows. Number + order already communicates progression while
            the segmented rules echo the research-notebook visual language. */}
        {careerPath.length > 0 && (
          <div
            className="enter-up flex flex-col gap-s10"
            style={{ "--enter-delay": "0.27s" }}
            aria-label={`${narrative.careerPathLabel || "My path"}: ${careerPath.map((step) => step.label).join(", ")}`}
          >
            <span className="text-label font-mono uppercase text-primary-600">
              {narrative.careerPathLabel || "My path"}
            </span>
            <ol
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-s16 gap-y-s12 list-none m-0 p-0"
              aria-hidden="true"
            >
              {careerPath.map((step, index) => (
                <li
                  key={step.id || step.phase || step.label}
                  className={`border-t rule-t pt-s8 ${
                    step.highlight ? "text-primary-600" : "text-text-meta"
                  }`}
                >
                  <span className="block text-meta font-mono text-dim mb-s3">
                    {step.phase || String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`block text-small ${step.highlight ? "font-medium" : ""}`}>
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div
          className="enter-up flex flex-wrap items-center gap-s28 mt-s4"
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

      {/* Portrait — visually enters alongside the second headline beat instead
          of being pinned to the CTA baseline. That gives the hero one balanced
          composition rather than a text block with a detached image below it. */}
      <div
        className="enter-up group/photo relative md:col-start-9 md:col-span-4 lg:col-start-10 lg:col-span-3 mt-s48 md:mt-s88 lg:mt-s72"
        style={{ "--enter-delay": "0.18s" }}
      >
        <div className="relative">
          <div className="group w-full aspect-portrait photo-frame rule-frame-in">
            <div className="w-full h-full overflow-hidden">
              <img
                src={data.heroImage || data.aboutImage}
                alt={data.name}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top
                           transition-transform duration-[250ms] ease-smooth group-hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* The personality note behaves like a handwritten photo caption.
              Desktop parks it below the frame; mobile keeps normal flow. */}
          <p
            className="enter-pop bubble-idle relative mt-s20 mx-auto w-[18ch] rule-bubble
                       px-s24 py-s16 text-center text-aside font-hand text-text-meta
                       transition-transform duration-[250ms] ease-smooth
                       hover:scale-[1.045] hover:-rotate-[1.6deg]
                       hover:[--rule-line-color:var(--blush)]
                       group-hover/photo:[--rule-line-color:var(--blush)]
                       lg:absolute lg:top-full lg:right-0 lg:mt-s16"
            style={{ transformOrigin: "50% 20%", "--enter-delay": "0.34s" }}
          >
            {data.tagline || "I speak both ‘user’ & ‘developer’."}
            <HandArrow
              className="hidden lg:block absolute left-1/2 bottom-full
                         -translate-x-1/2 mb-s8 -rotate-90 text-dim pointer-events-none"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
