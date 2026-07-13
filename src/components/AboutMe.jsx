// src/components/AboutMe.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT FIX v5 — SKILL KEY MISMATCH RESOLVED.
//
// Previous versions looked up skills["Research"] / skills["Technical"], but
// data.json's actual keys are "Research Methods", "Analysis & Tools",
// "Design", "Engineering", "QA". The `|| []` fallback silently swallowed the
// miss, so two of the three columns rendered empty.
//
// Fix: SKILL_COLUMNS below is the ONE place that maps the 5 data categories
// onto the 3 display columns. It is exported so About.jsx uses the exact
// same grouping — the two pages can no longer drift apart.
//
//   ⚠ The strings in `categories` MUST match data.json keys EXACTLY.
//     If you rename a category in the Admin panel, update it here too.
//     (A dev-only console.warn below will tell you if they fall out of sync.)
//
// Everything else (AboutBio, impact stats, legacy alias) unchanged from v4.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const FALLBACK_STATS = [
  { value: "5+", label: "Years in engineering & QA" },
  { value: "10+", label: "Wordpress Websites delivered" },
  { value: "N=30", label: "Largest controlled study" },
];

// ─── Single source of truth: data.json categories → 3 display columns ────────
// labelKey  → translation key for the column heading
// categories → data.json skill keys folded into this column (order preserved)
export const SKILL_COLUMNS = [
  {
    labelKey: "about.skillsResearch",
    categories: ["Research Methods"],
  },
  {
    labelKey: "about.skillsDesign",
    categories: ["Design", "Analysis & Tools"],
  },
  {
    labelKey: "about.skillsTechnical",
    categories: ["Engineering", "QA"],
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

// ─── Bio (cols 1–6) + Impact stats (cols 7–9) ────────────────────────────────
export function AboutBio({ data }) {
  const bioParagraphs = data.bioParagraphs || [];
  const stats = data.impactStats?.length ? data.impactStats : FALLBACK_STATS;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-9 gap-x-10 gap-y-10"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Bio — one calm reading column */}
      <div className="md:col-span-6 max-w-[62ch] space-y-6">
        {bioParagraphs.map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "text-[15px] md:text-base leading-[1.85] text-text"
                : "text-[13.5px] leading-[1.9] text-text/75"
            }
          >
            {para}
          </p>
        ))}
      </div>

      {/* Impact stats — evidence at a glance, filling the former dead zone */}
      <div
        className="md:col-span-3 flex flex-row flex-wrap md:flex-col
                   gap-x-10 gap-y-7 md:border-l md:border-border md:pl-8"
      >
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display font-extrabold text-3xl leading-none text-text">
              {s.value}
            </p>
            <p className="text-2xs uppercase tracking-[0.14em] text-text/55 font-semibold mt-1.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
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
