// src/components/AboutMe.jsx

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

// ─── Bio: one calm reading column ─────────────────────────────────────────────
export function AboutBio({ data }) {
  const bioParagraphs = data.bioParagraphs || [];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-12 md:gap-x-10"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Bio sits in cols 1–9; cols 10–12 stay as intentional whitespace,
          echoing the hero's 70/30 editorial split. */}
      <div className="md:col-span-9 max-w-[62ch] space-y-6">
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
    </motion.div>
  );
}

// ─── Skills: the scannable 3-column grid ──────────────────────────────────────
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