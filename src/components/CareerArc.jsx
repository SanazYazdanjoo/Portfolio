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
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
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
          className={`relative p-8 group
            ${step.highlight
              ? "bg-primary text-white"
              : "bg-bg hover:bg-blush-weak transition-colors duration-300"
            }`}
        >
          <span
            className={`block font-display font-extrabold text-4xl leading-none mb-4 select-none
              ${step.highlight
                ? "text-white/40"
                : "text-blush group-hover:text-secondary transition-colors duration-300"
              }`}
            aria-hidden="true"
          >
            {step.phase}
          </span>

          <h3 className={`font-display font-bold text-xl leading-tight mb-1 ${step.highlight ? "text-white" : "text-text"}`}>
            {step.label}
          </h3>
          <p className={`text-2xs font-semibold uppercase tracking-[0.18em] mb-4 ${step.highlight ? "text-white/60" : "text-secondary-600"}`}>
            {step.years}
          </p>
          <p className={`text-sm leading-relaxed mb-6 ${step.highlight ? "text-white/85" : "text-text/70"}`}>
            {step.summary}
          </p>

          {step.skillGroups.map((group, gi) => (
            <div key={group.label ?? `group-${gi}`} className={gi > 0 ? "mt-5" : ""}>
              {group.label && (
                <p
                  className={`text-[9px] font-black uppercase tracking-[0.2em] mb-2
                    ${step.highlight ? "text-white" : "text-secondary-600"}`}
                >
                  {group.label}
                </p>
              )}
              <ul
                className="flex flex-wrap gap-1.5 list-none m-0 p-0"
                aria-label={group.label || undefined}
              >
                {group.items.map((item) => (
                  <li key={item}>
                    <span
                      className={`inline-block text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full border
                        ${step.highlight
                          ? "border-white/40 text-white"
                          : "border-border text-text/65"
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
              <InkArrow className="text-text/60" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// COMPACT — homepage strip (numeral · label · years, arrows between)
//
// A proper container: three equal-width columns spanning the full content
// width, with a thin connector line running behind the arrows at the
// numeral baseline. The line draws itself left-to-right on scroll-in
// (stroke-dashoffset), and each step fades in as the line "reaches" it.
// `no-underline` and `border-b-0` guard against inherited link styling.
function CareerArcCompact({ steps }) {
  const prefersReducedMotion = useReducedMotion();
  const reduce = prefersReducedMotion;

  const fade = (delay = 0) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: reduce ? 0 : 0.4, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  return (
    <div className="relative w-full">
      {/* Connector line — behind the arrows, at the numeral baseline.
          Hidden on mobile, where steps stack instead of running inline. */}
      <svg
        aria-hidden="true"
        className="hidden md:block absolute left-0 right-0 top-[27px] w-full h-[2px] overflow-visible -z-10"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="0" y1="1" x2="100%" y2="1"
          stroke="var(--border)"
          strokeWidth="1.5"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </svg>

      <ol className="relative grid grid-cols-1 gap-y-5 list-none m-0 p-0 w-full md:grid-cols-3 md:gap-x-8">
        {steps.map((step, i) => (
          <li
            key={step.phase}
            className="relative md:text-left"
          >
            <motion.div {...fade(i * 0.15)} className="flex items-baseline gap-3 md:block">
              {/* Numeral — static color, no hover shift (steps aren't links) */}
              <span
                className={`font-display font-extrabold text-2xl md:text-3xl leading-none select-none
                  ${step.highlight ? "text-primary" : "text-blush"}`}
                aria-hidden="true"
              >
                {step.phase}
              </span>
              <span className="md:block md:mt-2">
                {/* Label — same treatment on all steps; accent color is
                    the only differentiator for the current phase. */}
                <span
                  className={`block font-display font-bold text-sm md:text-base leading-tight
                              md:whitespace-nowrap no-underline border-b-0
                    ${step.highlight ? "text-primary-600" : "text-text"}`}
                >
                  {step.label}
                </span>
                <span
                  className={`block text-2xs font-semibold uppercase tracking-[0.18em] mt-1
                    ${step.highlight ? "text-primary-600" : "text-text-dim"}`}
                >
                  {step.years}
                </span>
              </span>
            </motion.div>

            {/* Arrow — sits over the connector line in the gutter between
                columns, bigger and in the same pink as the numeral accent. */}
            {i < steps.length - 1 && (
              <motion.span
                {...fade(i * 0.15 + 0.15)}
                aria-hidden="true"
                className="hidden md:flex absolute top-[9px] -right-4 translate-x-1/2 items-center justify-center text-secondary"
              >
                <InkArrow className="w-9 h-8" />
              </motion.span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// Public API
export default function CareerArc({ variant = "full" }) {
  const steps = useCareerArc();
  return variant === "compact"
    ? <CareerArcCompact steps={steps} />
    : <CareerArcFull steps={steps} />;
}
