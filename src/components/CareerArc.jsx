// Renders the career arc ("The Bridge"). Phase data lives in src/data/career.js;
// this component resolves translation keys and renders. Each phase carries its
// own chronologically-grouped skill chips instead of a flat skills list.
//
//   variant="full"    - About page section: numeral, label, years, summary,
//                        then skill-group chips.
//   variant="compact" - homepage strip: numeral + label + years only, no
//                        skill chips.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { careerPhases } from "../data/career";
import { EASE } from "../utils/motion";

// Hand-drawn ink arrow — shared by both variants
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

// Data — resolved once, translation-driven
export function useCareerArc() {
  const { t } = useTranslation();
  return careerPhases.map((p) => ({
    phase: p.phase,
    label: t(p.labelKey),
    years: t(p.yearsKey),
    summary: t(p.summaryKey),
    highlight: !!p.highlight,
    skillGroups: p.skillGroups.map((g) => ({
      label: g.groupKey ? t(g.groupKey) : null,
      items: g.items,
    })),
  }));
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

// FULL — About page
function CareerArcFull({ steps }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border items-stretch">
      {steps.map((step, i) => (
        <motion.div
          key={step.phase}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className={`relative p-s32 group
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
                          : "text-dim hover:[--rule-fill-color:var(--primary-600)] hover:[--rule-line-color:var(--primary-600)] hover:text-white"
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
            <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
              <InkArrow className="text-dim" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// COMPACT — the homepage timeline, a vertical list rather than three
// side-by-side columns.
//
// Each row is a fixed 88px date column beside the role, separated by the
// house hairline. That geometry is what permanently retires the wrapping
// problem the horizontal version had: a role that needs two lines grows its
// own row downward and moves nothing, because the date sits at the top-left
// of the same row instead of below a label of unpredictable height.
//
// The date is 12px mono with no tracking — at .1em the longest of them
// ("2022 – Present") would not fit 88px in any mono this stack resolves to.
// The current phase takes the accent; the others are dim.
function CareerArcCompact({ steps }) {
  const reduce = useReducedMotion();

  return (
    <motion.ol
      className="flex flex-col list-none m-0 p-0 w-full"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
    >
      {steps.map((step, i) => (
        <li
          key={step.phase}
          className={`flex items-baseline gap-s24 py-s16 ${i > 0 ? "border-t rule-t" : ""}`}
        >
          <span
            className={`w-s88 shrink-0 text-date font-mono ${
              step.highlight ? "text-primary-600" : "text-text-dim"
            }`}
          >
            {step.years}
          </span>
          <span className="text-body text-text">{step.label}</span>
        </li>
      ))}
    </motion.ol>
  );
}

// Public API
export default function CareerArc({ variant = "full" }) {
  const steps = useCareerArc();
  return variant === "compact"
    ? <CareerArcCompact steps={steps} />
    : <CareerArcFull steps={steps} />;
}
