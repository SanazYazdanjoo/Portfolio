// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// One change: the "Case Studies" label joins the unified label system
// (tracked uppercase, primary-600, bold) — same as About Me / What I Bring.
// Roadmap check ✓: id="projects" anchor confirmed for the /#projects link.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Hero } from "../components/Hero";
import { AboutMe } from "../components/AboutMe";
import { StackedProjectCard } from "../components/StackedProjectCard";
import { projects } from "../data/projects";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { ScribbleDivider } from "../components/ScribbleDivider";

export default function Home() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();

  return (
    <div className="w-full relative">

      {/* ── Hero — no min-h-screen, Hero controls its own height ── */}
      <section id="Hero-Section" className="w-full">
        <Hero data={profileData} />
      </section>

      <ScribbleDivider />

      {/* ── About — flows naturally after hero ── */}
      <section id="AboutMe-Section" className="w-full">
        <AboutMe data={profileData} />
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="w-full pt-24 pb-20">

        <div className="w-full h-px bg-border mb-6" />

        <motion.span
          className="block text-[11px] tracking-[0.2em] uppercase text-primary-600 font-bold mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t("projects.heading")}
        </motion.span>

        {projects.length > 0 ? (
          /* Negative margin breaks out of the page's px-8/12/16 padding for full-bleed cards */
          <div className="relative flex flex-col -mx-8 md:-mx-12 lg:-mx-16">
            {projects.map((project, index) => (
              <StackedProjectCard key={project.id || index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[13px] font-semibold text-text/30 uppercase tracking-widest mb-2">
              {t("projects.wip")}
            </p>
            <p className="text-[13px] text-text/40 max-w-xs mx-auto leading-relaxed font-light">
              {t("projects.wipDesc")}
            </p>
          </div>
        )}
      </section>

    </div>
  );
}