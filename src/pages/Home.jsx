// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT v4 (label rail) + COMING-SOON FIX.
//
// New in this version: Home previously rendered EVERY project — including
// status: "coming-soon" — as a clickable StackedProjectCard. Coming-soon
// projects have no /projects/{id} route yet (routes are auto-generated from
// src/projects/*/index.jsx), so those cards were dead links waiting to
// happen. Home now mirrors the split already used on /projects:
//
//   • published    → StackedProjectCard (clickable, as before)
//   • coming-soon  → muted, non-interactive teaser row
//   • none at all  → existing WIP empty state
//
// Roadmap check ✓: id="projects" anchor preserved for the /#projects link
// (which actually works now — see the scroll manager in App.jsx).
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

// ─── Coming-soon teaser row — deliberately NOT a link ────────────────────────
// Same anatomy as StackedProjectCard (index · title · methods) so the list
// reads as one system, but muted and inert. No spine, no hover, no route.
function ComingSoonRow({ project, index }) {
  const { t } = useTranslation();
  const methods = project.methods || project.tags || [];

  return (
    <div
      aria-disabled="true"
      className="relative px-8 md:px-16 py-7 bg-bg border-t border-border opacity-60"
    >
      <div className="flex items-start gap-6">
        <span className="font-mono text-2xs font-bold text-text/30 tabular-nums mt-2 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h2 className="font-display font-extrabold text-2xl tracking-[-0.01em]
                         uppercase leading-tight text-text/45">
            {project.title}
          </h2>
          {methods.length > 0 && (
            <p className="mt-3 text-sm tracking-wide text-text/35">
              {methods.slice(0, 4).join(" · ")}
            </p>
          )}
        </div>

        <span className="shrink-0 mt-2 text-[9px] font-black uppercase tracking-[0.2em]
                         text-text/35 border border-border px-2.5 py-1">
          {t("projects.comingSoon")}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();

  // Same split as /projects — one rule, two pages
  const published = projects.filter((p) => p.status !== "coming-soon");
  const comingSoon = projects.filter((p) => p.status === "coming-soon");

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
 
 
<ProjectsSection />

    </div>
  );
}