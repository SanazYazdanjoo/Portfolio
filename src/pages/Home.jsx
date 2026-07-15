// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT v5 — UX ENGINEER STRATEGY UPDATE
//
// Because this page is fully data-driven, it automatically inherits the new 
// UX Engineer positioning (Frontend focus, rearranged skills columns) directly 
// from profileData and the updated child components (Hero, AboutMe).
//
// Retained from v4:
//   • published   → StackedProjectCard (clickable)
//   • coming-soon → muted, non-interactive teaser row
//   • empty state → WIP doodle message
//
// Roadmap check ✓: id="projects" anchor preserved for the /#projects link.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Hero } from "../components/Hero";
import { AboutBio, WhatIBring } from "../components/AboutMe";
import { StackedProjectCard } from "../components/StackedProjectCard";
import { projects } from "../data/projects";
import { profileData as rawProfile } from "../data/profile";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import EtherealGradient from "../components/EtherealGradient";

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

  // Same split as /projects — one rule, two pages
  const published = projects.filter((p) => p.status !== "coming-soon");
  const comingSoon = projects.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = published.length > 0 || comingSoon.length > 0;

  return (
    <div className="w-full relative pb-24">

      {/* ── Hero — natural height, no viewport lock ── */}
      <section id="Hero-Section" className="w-full relative overflow-hidden">
        <EtherealGradient color="blush" position="top-right" size="lg" grain="medium" delay={0.3} />
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

      {/* ── Case Studies — STACKED list, same system as /projects ──
           id="projects" kept here so the /#projects nav anchor works;
           scroll-mt offsets the sticky Nav (roadmap item 1.3 ✓) */}
      <section id="projects" className="w-full pt-20 scroll-mt-24">
        <div className="w-full h-px bg-border mb-12" />
        <SectionLabel>{t("projects.heading")}</SectionLabel>

        {/* Full-bleed: cards carry px-8 md:px-16 inner padding, so the
            wrapper mirrors App.jsx's container padding (px-8 md:px-12
            lg:px-16) with negative margins — card edge kisses viewport edge */}
        <div className="-mx-8 md:-mx-12 lg:-mx-16 mt-10">
          {hasAnyProjects ? (
            <>
              {published.map((project, i) => (
                <StackedProjectCard key={project.slug} project={project} index={i} />
              ))}
              {comingSoon.map((project, i) => (
                <ComingSoonRow
                  key={project.slug}
                  project={project}
                  index={published.length + i}
                />
              ))}
              {/* Closing hairline under the last row */}
              <div className="w-full h-px bg-border" />
            </>
          ) : (
            <div className="px-8 md:px-16 py-16 text-center">
              <p className="doodle-text m-0 text-3xl text-dim">
                Case studies are being inked — check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}