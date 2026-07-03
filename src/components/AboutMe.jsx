// src/components/AboutMe.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT FIX v4 — content blocks now live inside HomeSection's 9-col content
// area (cols 4–12), next to the label rail. Two changes:
//
//   1. IMPACT STAT STACK: the empty field to the right of the bio now earns
//      its keep — a vertical column of impact metrics ("focus on impact
//      metrics", per your content goal). Reads from profileData.impactStats
//      if present, with evidence-based fallbacks. Add to data.json when ready:
//        "impactStats": [
//          { "value": "5+",   "label": { "en": "Years engineering & QA", "de": "…" } },
//          { "value": "20+",  "label": { "en": "Production sites shipped", "de": "…" } },
//          { "value": "N=30", "label": { "en": "Largest controlled study", "de": "…" } }
//        ]
//
//   2. Inner grids are 9-col (matching the parent content area) so the bio
//      (cols 1–6) and stats (cols 7–9) land on clean grid lines.
//
// Legacy <AboutMe> alias kept — delete once nothing else imports it.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const FALLBACK_STATS = [
  { value: "5+", label: "Years in engineering & QA" },
  { value: "20+", label: "Production sites shipped" },
  { value: "N=30", label: "Largest controlled study" },
];

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
  const skills = data.skills || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-x-10">
        {[
          { key: "Research", label: t("about.skillsResearch") },
          { key: "Design", label: t("about.skillsDesign") },
          { key: "Technical", label: t("about.skillsTechnical") },
        ].map(({ key, label }) => (
          <div key={key}>
            <h3 className="text-[13px] font-bold text-text mb-2">
              {label}
            </h3>
            {/* Short coral rule — same device as the About page columns */}
            <div className="w-8 border-b-2 border-primary mb-4" aria-hidden="true" />
            <ul className="text-[13px] text-text/80 space-y-2.5">
              {(skills[key] || []).map((s) => <li key={s}>{s}</li>)}
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