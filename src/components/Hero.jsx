// The hero answers "what does Sanaz do?" inside one screen, in this order:
// the name (mono eyebrow — the wordmark above already carries it), the one
// identity as the H1, the process that identity runs on, the positioning
// sentence, three evidence-backed proof points, and two actions. The longer
// career narrative lives in About and is not repeated here. Every
// human-facing string comes from data.json through the localized profile
// adapter; this file holds no copy of its own.

import React from "react";
import { Link } from "react-router-dom";
import { HandArrow } from "./HandArrow";
import { InkCtaButton } from "./Button";
import { useTranslation } from "../context/LanguageContext";

export function Hero({ data }) {
  const { t } = useTranslation();
  const narrative = data.heroNarrative || {};
  const workflow = narrative.workflow || "";
  // The process line is stored as one string with arrow separators so the
  // CV, the About page and the chat knowledge base all read the same text;
  // here it is split so the arrows can be drawn (HandArrow) rather than set
  // in the typeface, like every other arrow on the page.
  const workflowSteps = workflow
    .split("\u2192")
    .map((step) => step.trim())
    .filter(Boolean);
  // Proof points: the evidence-backed counts from data.json (each numeric
  // one carries a derivedFrom pointer that profile-evidence.test.js checks
  // against the case studies). Rendered as the same dt/dd row the project
  // cards use, so a number means the same thing wherever it appears.
  const proof = Array.isArray(data.impactStats) ? data.impactStats : [];

  return (
    <div className="grid-12 items-center">
      <div className="md:col-span-7 flex flex-col gap-s32">
        <div className="flex flex-col gap-s16">
          <p
            className="enter-up text-label font-mono uppercase text-text-meta"
            style={{ "--enter-delay": "0.06s" }}
          >
            {data.name}
          </p>

          {/* The identity is the H1. It is the one thing a first-time
              visitor has to leave the fold knowing. */}
          <h1
            className="enter-up text-hero font-display font-bold text-text-display"
            style={{ "--enter-delay": "0.12s" }}
          >
            {data.role}
          </h1>

          {workflowSteps.length > 0 && (
            <p
              className="enter-up text-lead font-display font-semibold text-text"
              style={{ "--enter-delay": "0.18s" }}
            >
              <span className="sr-only">{workflow}</span>
              <span aria-hidden="true" className="flex flex-wrap items-center gap-x-s12 gap-y-s3">
                {workflowSteps.map((step, index) => (
                  <React.Fragment key={step}>
                    {index > 0 && <HandArrow className="shrink-0 text-primary-600" />}
                    <span className={index === 1 ? "text-primary-600" : ""}>{step}</span>
                  </React.Fragment>
                ))}
              </span>
            </p>
          )}
        </div>

        {narrative.statement && (
          <p
            className="enter-up text-lead text-text"
            style={{ "--enter-delay": "0.22s" }}
          >
            {narrative.statement}
          </p>
        )}

        {proof.length > 0 && (
          <dl
            aria-label={t("hero.proofLabel")}
            className="enter-up flex flex-wrap gap-x-s24 gap-y-s8"
            style={{ "--enter-delay": "0.26s" }}
          >
            {proof.map((stat, i) => (
              <div key={i} className="flex items-baseline gap-s6">
                <dt className="text-num font-mono text-primary-600 whitespace-nowrap">{stat.value}</dt>
                <dd className="text-meta font-mono text-dim">{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* data-corner-cta: on a phone the CTA row sits in the bottom band
            of the first screen, exactly where the ASK AI pill floats; the
            attribute parks the pill while the row is there (see
            hooks/useCornerOccupied.js), so the primary action is never
            covered by a secondary one. */}
        <div
          data-corner-cta=""
          className="enter-up flex flex-wrap items-center gap-s28"
          style={{ "--enter-delay": "0.3s" }}
        >
          <InkCtaButton to="/projects">
            {narrative.ctas?.work} <HandArrow />
          </InkCtaButton>
          <Link
            to="/cv"
            className="relative text-body font-medium text-text pb-s2
                       hover:text-primary-600 transition-colors duration-200 focus-ring group/cv"
          >
            {narrative.ctas?.cv}
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
              width="704"
              height="880"
              /* lowercase on purpose: React 18 drops the camelCase prop
                 (and logged a warning in every test run); the lowercase
                 form passes through as the real HTML attribute, matching
                 ProjectPicture. */
              fetchpriority="high"
              decoding="async"
              className="w-full h-full object-cover object-top
                         transition-transform duration-[250ms] ease-smooth group-hover:scale-[1.04]"
            />
          </div>
        </div>

        {/* The old rule-bubble treatment was intentionally removed here: the
            tagline behaves as a quiet caption instead of a competing UI
            object, while the portrait frame keeps the hand-drawn signature. */}
        <figcaption
          className="enter-up mt-s16 text-center text-hand font-hand text-text-meta"
          style={{ "--enter-delay": "0.28s" }}
        >
          {data.tagline}
        </figcaption>
      </figure>
    </div>
  );
}
