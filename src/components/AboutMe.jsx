// src/components/AboutMe.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT FIX v7 — VISUAL QA PASS
//
//   • WHAT-I-BRING CLIP FIX: the skills grid could get its last items cut off
//     when a parent constrained/clipped it (the tallest column — QA & Analysis
//     — was truncating). The wrapper and grid now declare `overflow-visible`
//     and `h-auto` explicitly, and the whileInView animation no longer relies
//     on a negative viewport margin that could fire before the section had its
//     final height. The section grows to fit its tallest column, always.
//
// v6 retained: SKILL_COLUMNS mapping to data.json keys, Technical-first order.
//   ⚠ The strings in `categories` MUST match data.json keys EXACTLY.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

// ─── Single source of truth: data.json categories → 3 display columns ────────
export const SKILL_COLUMNS = [
  {
    labelKey: "about.skillsTechnical",     // e.g., "Frontend Engineering"
    categories: ["Frontend Engineering"],
  },
  {
    labelKey: "about.skillsResearch",      // e.g., "Research & AI Workflow"
    categories: ["AI-Assisted Development", "UX Research & Design"],
  },
  {
    labelKey: "about.skillsAnalysis",      // e.g., "QA & Analysis"
    categories: ["QA & Testing", "Analysis & Tools"],
  },
];

// Shared resolver — also used by About.jsx.
export function resolveSkillColumns(skills = {}) {
  return SKILL_COLUMNS.map(({ labelKey, categories }) => {
    if (import.meta.env?.DEV) {
      categories.forEach((cat) => {
        if (!(cat in skills)) {
          console.warn(
            `[SKILL_COLUMNS] Category "${cat}" not found in data.json skills. ` +
            `Available: ${Object.keys(skills).join(", ")}`
          );
        }
      });
    }
    return {
      labelKey,
      items: categories.flatMap((cat) => skills[cat] || []),
    };
  });
}

// ─── Bio — one calm reading column ───────────────────────────────────────────
export function AboutBio({ data }) {
  const bioParagraphs = data.bioParagraphs || [];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {bioParagraphs.map((para, i) => (
        <p
          key={i}
          className={
            i === 0
              ? "text-[15px] md:text-base leading-[1.85] text-text"
              : "text-sm leading-[1.9] text-text/75"
          }
        >
          {para}
        </p>
      ))}
    </motion.div>
  );
}

// ─── Skills: the scannable 3-column grid ─────────────────────────────────────
// overflow-visible + h-auto everywhere: the section MUST grow to its tallest
// column. Never re-add a max-height or overflow-hidden here.
export function WhatIBring({ data }) {
  const { t } = useTranslation();
  const columns = resolveSkillColumns(data.skills);

  return (
    <motion.div
      className="overflow-visible h-auto"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-x-10 overflow-visible h-auto items-start">
        {columns.map(({ labelKey, items }) => (
          <div key={labelKey} className="overflow-visible">
            <h3 className="text-[13px] font-bold text-text mb-2">
              {t(labelKey)}
            </h3>
            {/* Short coral rule — same device as the About page columns */}
            <div className="w-8 border-b-2 border-primary mb-4" aria-hidden="true" />
            <ul className="text-[13px] text-text/80 space-y-2.5 pb-1">
              {items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Legacy alias — safe to delete once nothing imports <AboutMe> ─────────────
export function AboutMe({ data }) {
  return (
    <>
      <AboutBio data={data} />
      <div className="pt-20">
        <WhatIBring data={data} />
      </div>
    </>
  );
}
