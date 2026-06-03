import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

export function AboutMe({ data }) {
  const { t } = useTranslation();
  const skills = data.skills || {};
  const bioParagraphs = data.bioParagraphs || [];

  return (
    <div className="relative w-full font-sans text-text pt-5 md:pt-5">

      {/* ── "About" label + two-column bio ── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-12 gap-y-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Label — cols 1-5 (left ~40%) */}
        <div className="md:col-span-5">
          <span className="text-[13px] font-normal text-text/55">
            {t("about.heading")}
          </span>
        </div>

        {/* Bio — cols 6-12 (right ~60%), one paragraph per column */}
        <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {bioParagraphs.map((para, i) => (
            <p key={i} className="text-[13.5px] leading-[1.9] text-text/85 max-w-[52ch]">
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
        <div className="w-full h-px bg-text/20 mb-6" />

        <span className="block text-[11px] tracking-[0.2em] uppercase text-text/55 mb-10">
          {t("about.whatIBring")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {[
            { key: "Research", label: t("about.skillsResearch") },
            { key: "Design", label: t("about.skillsDesign") },
            { key: "Technical", label: t("about.skillsTechnical") },
          ].map(({ key, label }) => (
            <div key={key}>
              <h3 className="text-[13px] font-semibold text-text mb-4">
                {label}
              </h3>
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