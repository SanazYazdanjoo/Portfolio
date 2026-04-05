// src/components/AboutMe.jsx
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

export function AboutMe({ data }) {
  const { t } = useTranslation();
  const skills = data.skills || {};

  return (
    <div className="relative w-full px-[0] md:px-[0] font-sans text-text">

      <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">

      <motion.div
          className="md:col-span-12 flex flex-col z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
      >
          {/* Handwritten Header */}
          <div className="relative inline-block w-max mb-6 md:mb-10">
            <h2 className="font-display text-text text-6xl md:text-8xl -rotate-6 relative z-10">
              {t("about.heading")}
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-10 lg:gap-20 mt-2 max-w-5xl">
            <p className="text-base leading-[1.85] text-text/90 font-light">
              {data.bio}
            </p>
          </div>
      </motion.div>

      </div>

      {/* ── Bottom Section: Skills List ── */}
      <motion.div
        className="w-full max-w-[1400px] mx-auto pt-5 border-t border-border/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <span className="block text-[10px] md:text-xs font-black tracking-[0.3em] text-primary mb-10">
          {t("about.whatIBring")}
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="paper-bg">
            <h3 className="text-[28px] md:text-xl font-display font-bold font-black tracking-[0.2em] text-text mb-4">
              {t("about.skillsResearch")}
            </h3>
            <ul className="text-sm text-text/70 space-y-2 font-light leading-relaxed">
              {(skills["Research"] || []).map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="paper-bg">
            <h3 className="text-[28px] md:text-xl font-display font-bold font-black tracking-[0.2em] text-text mb-4">
              {t("about.skillsDesign")}
            </h3>
            <ul className="text-sm text-text/70 space-y-2 font-light leading-relaxed">
              {(skills["Design"] || []).map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="paper-bg">
            <h3 className="text-[28px] md:text-xl font-display font-bold font-black tracking-[0.2em] text-text mb-4">
              {t("about.skillsTechnical")}
            </h3>
            <ul className="text-sm text-text/70 space-y-2 font-light leading-relaxed">
              {(skills["Technical"] || []).map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
