// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT FIX v4 — the wide-screen problems from the latest screenshot:
//
//   1. DEAD BAND KILLED: ScribbleDivider (a horizontal line) + HomeSection's
//      hairline were stacking into a double-divider sandwich with ~200px of
//      void. ScribbleDivider is removed — HomeSection owns ALL dividers now.
//      One divider system, zero ambiguity.
//
//   2. LABEL RAIL (the 70/30 fix): section labels no longer sit ABOVE content
//      wasting a full row and leaving the right half of wide screens empty.
//      Labels live in a left rail (cols 1–3), content in cols 4–12 — the same
//      editorial split as the hero and your About page. Every section now
//      shares one strong left content axis.
//
//   3. Case Studies uses `fullBleed` — label in the rail position, cards
//      spanning the full width below (they need the edge-to-edge treatment).
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

// ─── Section label — one style, used everywhere ───────────────────────────────
function SectionLabel({ children }) {
  return (
    <motion.span
      className="block text-[11px] tracking-[0.2em] uppercase
                 text-primary-600 font-bold"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
}

// ─── The ONE section rhythm: divider → label rail (3) + content (9) ──────────
function HomeSection({ id, label, children, fullBleed = false }) {
  return (
    <section id={id} className="w-full pt-20">
      <div className="w-full h-px bg-border mb-8" />

      {fullBleed ? (
        <>
          <div className="mb-12">
            <SectionLabel>{label}</SectionLabel>
          </div>
          {children}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8">
          {/* Label rail — sticky so the label keeps you oriented in long sections */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <SectionLabel>{label}</SectionLabel>
            </div>
          </div>
          {/* Content — cols 4–12, the same axis in every section */}
          <div className="md:col-span-9">{children}</div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();

  return (
    <div className="w-full relative pb-24">

      {/* ── Hero — natural height, no viewport lock ── */}
      <section id="Hero-Section" className="w-full">
        <Hero data={profileData} />
      </section>

      {/* ── About ── */}
      <HomeSection id="AboutMe-Section" label={t("about.heading")}>
        <AboutBio data={profileData} />
      </HomeSection>

      {/* ── What I Bring ── */}
      <HomeSection id="WhatIBring-Section" label={t("about.whatIBring")}>
        <WhatIBring data={profileData} />
      </HomeSection>

      {/* ── Case Studies — label in rail position, cards full-bleed ── */}
      <HomeSection id="projects" label={t("projects.heading")} fullBleed>
        {projects.length > 0 ? (
          /* Negative margin breaks out of the page's px-8/12/16 padding */
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