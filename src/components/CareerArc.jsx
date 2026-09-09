// Renders the career arc ("The Bridge"). Phase labels, years and summaries
// come from the canonical professional narrative in profile.js via career.js.
// Skill chips remain evidence-backed and grouped by the phase where they became
// central to the story.
//
//   variant="full"    - About page: numeral, label, years, summary, skills
//   variant="compact" - homepage: date + label only

import React from "react";
import { useInViewReveal, revealClass } from "../hooks/useReveal";
import { useTranslation } from "../context/LanguageContext";
import { careerPhases } from "../data/career";

function InkArrow({ className = "" }) {
  return (
    <svg
      width="26" height="24" viewBox="0 0 26 24" fill="none"
      className={className} aria-hidden="true"
    >
      <path
        d="M3 12.5 C9 11.5, 15 12.8, 21.5 12 M16 6.5 C18.5 9, 20.8 11, 22.5 12 C20.5 13.5, 18 15.8, 16.5 18"
        stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function useCareerArc() {
  const { t, localize } = useTranslation();

  return careerPhases.map((phase) => ({
    phase: phase.phase,
    label: localize(phase.label),
    years: localize(phase.years),
    summary: localize(phase.summary),
    highlight: !!phase.highlight,
    skillGroups: phase.skillGroups.map((group) => ({
      label: group.groupKey ? t(group.groupKey) : null,
      items: group.items,
    })),
  }));
}

function CareerArcFull({ steps }) {
  const [ref, inView] = useInViewReveal({ amount: 0 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-px bg-border items-stretch"
    >
      {steps.map((step, i) => (
        <div
          key={step.phase}
          style={{ "--reveal-delay": `${i * 0.08}s`, "--reveal-dur": "0.5s" }}
          className={`${revealClass(inView)} relative p-s24 group
            ${step.highlight
              ? "bg-primary rule-fill text-white"
              : "bg-bg rule-fill hover:bg-blush-weak transition-colors duration-300"
            }`}
        >
          <span
            className={`block font-display font-extrabold text-h1 leading-none mb-s16 select-none
              ${step.highlight
                ? "text-white/40"
                : "text-blush group-hover:text-secondary transition-colors duration-300"
              }`}
            aria-hidden="true"
          >
            {step.phase}
          </span>

          <h3 className={`font-display font-bold text-h3 leading-tight mb-s4 ${step.highlight ? "text-white" : "text-text"}`}>
            {step.label}
          </h3>
          <p className={`type-label mb-s16 ${step.highlight ? "text-white/60" : "text-secondary-600"}`}>
            {step.years}
          </p>
          <p className={`text-small mb-s24 ${step.highlight ? "text-white/85" : "text-text-meta"}`}>
            {step.summary}
          </p>

          {step.skillGroups.map((group, gi) => (
            <div key={group.label ?? `group-${gi}`} className={gi > 0 ? "mt-s24" : ""}>
              {group.label && (
                <p
                  className={`type-label mb-s8
                    ${step.highlight ? "text-white" : "text-secondary-600"}`}
                >
                  {group.label}
                </p>
              )}
              <ul
                className="flex flex-wrap gap-s8 list-none m-0 p-0"
                aria-label={group.label || undefined}
              >
                {group.items.map((item) => (
                  <li key={item}>
                    <span
                      className={`inline-block type-label px-s12 py-s4 rounded-full border
                        rule-pill [--rule-cap:14px]
                        transition-colors duration-200 ease-smooth
                        ${step.highlight
                          ? "[--rule-line-color:rgb(255_255_255/0.4)] text-white hover:[--rule-fill-color:rgb(255_255_255)] hover:[--rule-line-color:rgb(255_255_255)] hover:text-primary"
                          : "text-dim hover:[--rule-fill-color:var(--primary-600)] hover:[--rule-line-color:var(--primary-600)] hover:[color:var(--on-primary-600)]"
                        }`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {i < steps.length - 1 && (
            <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
              <InkArrow className="text-dim" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CareerArcCompact({ steps }) {
  const [ref, inView] = useInViewReveal({ amount: 0.2 });

  return (
    <ol
      ref={ref}
      className={`${revealClass(inView)} flex flex-col list-none m-0 p-0 w-full`}
      style={{ "--reveal-dur": "0.4s" }}
    >
      {steps.map((step, i) => (
        <li
          key={step.phase}
          className={`flex items-baseline gap-s24 py-s16 ${i > 0 ? "border-t rule-t" : ""}`}
        >
          <span
            className={`w-timeline-date shrink-0 whitespace-nowrap text-date font-mono ${
              step.highlight ? "text-primary-600" : "text-dim"
            }`}
          >
            {step.years}
          </span>
          <span className={`text-body ${step.highlight ? "font-medium text-primary-600" : "text-text"}`}>
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function CareerArc({ variant = "full" }) {
  const steps = useCareerArc();
  return variant === "compact"
    ? <CareerArcCompact steps={steps} />
    : <CareerArcFull steps={steps} />;
}
