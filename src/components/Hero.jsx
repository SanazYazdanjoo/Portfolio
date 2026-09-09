// The hero is intentionally restrained: identity, value proposition, proof
// statement and actions. The longer career narrative already lives in About,
// so it is not repeated here. All copy still comes from profile.js through the
// localized profile.

import React from "react";
import { Link } from "react-router-dom";
import { HandArrow } from "./HandArrow";
import { InkCtaButton } from "./Button";

export function Hero({ data }) {
  const narrative = data.heroNarrative || {};
  const workflow = narrative.workflow || data.positioning || "";
  const workflowSteps = workflow
    .split("\u2192")
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <div className="grid-12 items-center">
      <div className="md:col-span-7 flex flex-col gap-s32">
        <div className="flex flex-col gap-s16">
          <div
            className="enter-up flex flex-wrap items-center gap-x-s12 gap-y-s3 text-label font-mono uppercase"
            style={{ "--enter-delay": "0.06s" }}
          >
            <span className="text-text-meta">{data.name}</span>
            <span aria-hidden="true" className="text-dim">/</span>
            <span className="text-primary-600">{data.role || "UX Engineer"}</span>
          </div>

          <h1
            className="enter-up text-email font-display font-bold text-text-display"
            style={{ "--enter-delay": "0.14s" }}
          >
            <span className="sr-only">{workflow}</span>
            <span aria-hidden="true" className="block">
              {workflowSteps.map((step, index) => (
                <span
                  key={step}
                  className={`block ${index === 1 ? "text-primary-600" : ""}`}
                >
                  {step}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {narrative.statement && (
          <p
            className="enter-up text-lead text-text"
            style={{ "--enter-delay": "0.22s" }}
          >
            {narrative.statement}
          </p>
        )}

        <div
          className="enter-up flex flex-wrap items-center gap-s28"
          style={{ "--enter-delay": "0.3s" }}
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

      <figure
        className="enter-up group/photo md:col-start-9 md:col-span-4 mt-s48 md:mt-0"
        style={{ "--enter-delay": "0.18s" }}
      >
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

        {/* The old rule-bubble treatment was intentionally removed here: the
            tagline now behaves as a quiet caption instead of a competing UI
            object, while the portrait frame retains the hand-drawn signature. */}
        <figcaption
          className="enter-up mt-s16 text-center text-hand font-hand text-text-meta"
          style={{ "--enter-delay": "0.28s" }}
        >
          {data.tagline || "I speak both ‘user’ & ‘developer’."}
        </figcaption>
      </figure>
    </div>
  );
}
