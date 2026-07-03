// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MESSINESS FIX v3 — one vertical rhythm for the whole page.
//
// Before: About had pt-5, What I Bring had pt-20 (inside AboutMe), Projects
// had pt-24 pb-20, dividers appeared in some sections and not others.
// That inconsistency IS the "messy" feeling.
//
// Now: ONE <HomeSection> wrapper (composition over duplication) that enforces
//   hairline divider → tracked micro-label → content
// with identical pt-24 spacing everywhere. AboutMe.jsx no longer renders its
// own labels/dividers — it exports pure content blocks (AboutBio, WhatIBring).
//
// Roadmap check ✓: id="projects" anchor preserved for the /#projects link.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Hero } from "../components/Hero";
import { AboutBio, WhatIBring } from "../components/AboutMe";
import { StackedProjectCard } from "../components/StackedProjectCard";
import { projects } from "../data/projects";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { ScribbleDivider } from "../components/ScribbleDivider";

// ─── The ONE section rhythm: divider → label → content ───────────────────────
function HomeSection({ id, label, children, labelMargin = "mb-10" }) {
  return (
    <section id={id} className="w-full pt-24">
      <div className="w-full h-px bg-border mb-6" />
      <motion.span
        className={`block text-[11px] tracking-[0.2em] uppercase
                    text-primary-600 font-bold ${labelMargin}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {label}
      </motion.span>
      {children}
    </section>
  );
}

export default function Home() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();

  return (
    <div className="w-full relative pb-24">

      {/* ── Hero — controls its own height, sits outside the section rhythm ── */}
      <section id="Hero-Section" className="w-full">
        <Hero data={profileData} />
      </section>

      {/* One scribble on the page — after the hero, then the grid takes over */}
      <ScribbleDivider />

      {/* ── About ── */}
      <HomeSection id="AboutMe-Section" label={t("about.heading")}>
        <AboutBio data={profileData} />
      </HomeSection>

      {/* ── What I Bring — now a first-class section, same rhythm ── */}
      <HomeSection id="WhatIBring-Section" label={t("about.whatIBring")}>
        <WhatIBring data={profileData} />
      </HomeSection>

      {/* ── Projects ── */}
      <HomeSection id="projects" label={t("projects.heading")} labelMargin="mb-14">
        {projects.length > 0 ? (
          /* Negative margin breaks out of the page's px-8/12/16 padding
             for full-bleed cards */
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
      </HomeSection>

    </div>
  );
}