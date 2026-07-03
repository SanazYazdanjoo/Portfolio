// src/components/AboutMe.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIX (screenshot feedback): "About Me" used a third label style — plain grey
// 13px in a half-empty 40% column. Now ONE label system across the homepage:
// tracked uppercase micro-label in primary-600, same as every other section.
//
// Layout tightened: label 3 cols (was 5 — that was the dead air), bio 9 cols.
// First paragraph reads as the lead (larger); skill columns get the short
// coral rule from the About page, so both pages speak the same language.
// Data contract unchanged: bioParagraphs + skills from profile.js.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

export function AboutMe({ data }) {
  const { t } = useTranslation();
  const skills = data.skills || {};
  const bioParagraphs = data.bioParagraphs || [];

  return (
    <div className="relative w-full font-sans text-text pt-5 md:pt-5">

      {/* ── Section label + two-column bio ── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Label — cols 1-3, same system as every other section */}
        <div className="md:col-span-3">
          <span className="block text-[11px] tracking-[0.2em] uppercase text-primary-600 font-bold">
            {t("about.heading")}
          </span>
        </div>

        {/* Bio — cols 4-12. First paragraph = the lead, rest support it. */}
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {bioParagraphs.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-[15px] md:text-base leading-[1.85] text-text max-w-[52ch]"
                  : "text-[13.5px] leading-[1.9] text-text/75 max-w-[52ch]"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </motion.div>

      {/* ── Skills ── */}
      <motion.div
        className="w-full pt-20"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="w-full h-px bg-border mb-6" />

        <span className="block text-[11px] tracking-[0.2em] uppercase text-primary-600 font-bold mb-10">
          {t("about.whatIBring")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
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
    </div>
  );
}