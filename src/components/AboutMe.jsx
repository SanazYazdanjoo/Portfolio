// src/components/AboutMe.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT FIX v6 — UX ENGINEER STRATEGY UPDATE
//
// Updated SKILL_COLUMNS to match the new data.json keys: "Frontend Engineering",
// "UX Research & Design", "QA & Testing", and "Analysis & Tools".
//
// The array order has been swapped so that Technical/Engineering renders 
// in the first column (left), Research in the middle, and Analysis on the right. 
// This perfectly aligns the visual hierarchy with the UX Engineer positioning 
// without needing CSS order hacks.
//
//   ⚠ The strings in `categories` MUST match data.json keys EXACTLY.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";


// ─── Single source of truth: data.json categories → 3 display columns ────────
// labelKey  → translation key for the column heading
// categories → data.json skill keys folded into this column (order preserved)
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

// Shared resolver — also used by About.jsx. Warns in dev if a mapped
// category no longer exists in the data (e.g. renamed via the Admin panel).
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

// ─── Bio — one calm reading column, full measure now that stats are gone ────
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

// ─── Skills: the scannable 3-column grid (fills cols 4–12 of the page) ───────
export function WhatIBring({ data }) {
  const { t } = useTranslation();
  const columns = resolveSkillColumns(data.skills);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-x-10">
        {columns.map(({ labelKey, items }) => (
          <div key={labelKey}>
            <h3 className="text-[13px] font-bold text-text mb-2">
              {t(labelKey)}
            </h3>
            {/* Short coral rule — same device as the About page columns */}
            <div className="w-8 border-b-2 border-primary mb-4" aria-hidden="true" />
            <ul className="text-[13px] text-text/80 space-y-2.5">
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