// src/components/AboutMe.jsx
// ─────────────────────────────────────────────────────────────────────────────
// The "What I Bring" skills wall (SKILL_COLUMNS / resolveSkillColumns) has
// been removed — skills now live inside The Bridge (CareerArc, variant="full")
// as chronologically-grouped chips. See src/data/career.js.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";

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

// ─── Legacy alias — safe to delete once nothing imports <AboutMe> ─────────────
export function AboutMe({ data }) {
  return <AboutBio data={data} />;
}
