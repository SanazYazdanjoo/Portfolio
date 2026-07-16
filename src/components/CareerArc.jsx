// src/components/CareerArc.jsx
// ─────────────────────────────────────────────────────────────────────────────
// THE BRIDGE — single source of truth for the career arc.
//
//   • variant="full"    → the About page section, pixel-identical to the old
//                         hardcoded version (numerals, coral highlight card,
//                         tags, hand-drawn arrows).
//   • variant="compact" → homepage hero strip: numeral + label + years only.
//                         No summaries, no tags, no coral block — the hero
//                         already owns the loud moments. Ends with a
//                         "full story" link so Home teases and About pays off.
//
//   Data resolves ONCE here from the existing about.career.* translation keys
//   (EN/DE both inherit automatically). About.jsx and Hero.jsx no longer
//   hardcode any career content.
//
// INTEGRATION
//   About.jsx →  replace the local `careerArc` array + the entire
//                <div className="grid grid-cols-1 md:grid-cols-3 gap-px …">
//                block inside Section 2 with:  <CareerArc variant="full" />
//                (keep the SectionHeader — it stays page-owned)
//   Hero.jsx  →  replace the 4-item meta grid with:
//                <CareerArc variant="compact" />  + the status line
//                (see snippet in chat)
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

// ─── Hand-drawn ink arrow — shared by both variants ──────────────────────────
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

// ─── Data — resolved once, translation-driven ─────────────────────────────────
// Tags are presentation metadata for the FULL variant only, so they live here
// (not in profile.js — they're not CV data, they're About-page seasoning).
export function useCareerArc() {
  const { t } = useTranslation();
  return [
    {
      phase: "01",
      label: t("about.career.phase1.label"),
      years: t("about.career.phase1.years"),
      summary: t("about.career.phase1.summary"),
      tags: ["Frontend Dev", "WordPress", "HTML/CSS/JS"],
    },
    {
      phase: "02",
      label: t("about.career.phase2.label"),
      years: t("about.career.phase2.years"),
      summary: t("about.career.phase2.summary"),
      tags: ["Usability Testing", "Bug Tracking", "Agile"],
    },
    {
      phase: "03",
      label: t("about.career.phase3.label"),
      years: t("about.career.phase3.years"),
      summary: t("about.career.phase3.summary"),
      tags: ["HCI Research", "Mixed Methods", "TypeScript"],
      highlight: true,
    },
  ];
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════
// FULL — About page (visually identical to the previous hardcoded block)
// ═══════════════════════════════════════════════════════════════════════════
function CareerArcFull({ steps }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
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

          <div className="flex flex-wrap gap-1.5">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded-full
                  ${step.highlight
                    ? "border border-white/30 text-white/80"
                    : "border border-border text-text/60 group-hover:border-secondary/40"
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>

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

// ═══════════════════════════════════════════════════════════════════════════
// COMPACT — homepage hero strip (numeral · label · years, arrows between)
// ═══════════════════════════════════════════════════════════════════════════
function CareerArcCompact({ steps }) {
  const prefersReducedMotion = useReducedMotion();

  const fade = (delay = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  return (
    // Explicit 5-track grid: phase · arrow · phase · arrow · phase.
    // 1fr tracks force full-width distribution no matter how the parent
    // sizes itself — this is what the flex version failed to guarantee.
    <ol
      className="grid grid-cols-1 gap-y-5 list-none m-0 p-0 w-full
                 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-x-4 md:items-center"
    >
      {steps.map((step, i) => (
        <React.Fragment key={step.phase}>
          <motion.li
            {...fade(0.05 * i)}
            className="flex items-baseline gap-3 md:block md:text-left group"
          >
            <span
              className={`font-display font-extrabold text-2xl md:text-3xl leading-none select-none
                ${step.highlight
                  ? "text-primary"
                  : "text-blush group-hover:text-secondary transition-colors duration-300"
                }`}
              aria-hidden="true"
            >
              {step.phase}
            </span>
            <span className="md:block md:mt-2">
              <span
                className={`block font-display font-bold text-sm md:text-base leading-tight md:whitespace-nowrap
                  ${step.highlight ? "text-primary-600" : "text-text"}`}
              >
                {step.label}
              </span>
              <span className="block text-2xs font-semibold uppercase tracking-[0.18em] text-text-dim mt-1">
                {step.years}
              </span>
            </span>
          </motion.li>

          {i < steps.length - 1 && (
            <motion.li
              {...fade(0.05 * i + 0.03)}
              aria-hidden="true"
              className="hidden md:flex justify-center"
            >
              <InkArrow className="text-text/50" />
            </motion.li>
          )}
        </React.Fragment>
      ))}
    </ol>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────
export default function CareerArc({ variant = "full" }) {
  const steps = useCareerArc();
  return variant === "compact"
    ? <CareerArcCompact steps={steps} />
    : <CareerArcFull steps={steps} />;
}