// src/pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT v6 — CONTAINER QA PASS (no content, copy, or data changed)
//
// The child components were already fixed. This file was quietly undoing them:
//
//   1. HERO→ABOUT GAP (~150px → ~48px): HomeSection hardcoded pt-20 (80px) on
//      every section, which stacked on top of the Hero's own trailing margin.
//      HomeSection now takes a `tight` prop; the About section uses it.
//      Every OTHER section keeps pt-20 so the page rhythm stays intact.
//
//   2. OVERFLOW-HIDDEN REMOVED from #Hero-Section. This single class was
//      responsible for the handwritten "UX Engineer" badge clipping at the
//      top-right. A clipping ancestor beats any `overflow-visible` a child
//      declares.
//      Hero.jsx v6 already reserves headroom (pt-10 md:pt-12), so nothing
//      needs to hang outside the box anymore — the class was pure downside.
//
//   3. FOOTER GAP (pb-24 → pb-6): 96px of wrapper padding sat on top of the
//      Footer's own 128px of internal lead-in. See the Footer.jsx patch note
//      in chat — BOTH halves must change or the gap only shrinks by half.
//
//   4. Stray empty JSX lines inside #Hero-Section removed (they were adding
//      nothing, but they made the gap look intentional in review).
//
// Retained from v5: data-driven positioning, published/coming-soon split,
// empty state, and the id="projects" anchor for the /#projects nav link.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Hero } from "../components/Hero";
import { AboutBio } from "../components/AboutMe";
import { StackedProjectCard } from "../components/StackedProjectCard";
import { projects } from "../data/projects";
import { profileData as rawProfile } from "../data/profile";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { motion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import CareerArc from "../components/CareerArc";

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
//
// `tight` = the section directly follows the Hero, which already carries its
// own trailing space. 80px on top of that read as a hole in the page.
//   tight  → pt-10 md:pt-12  (40 / 48px)
//   normal → pt-20           (80px)
function HomeSection({ id, label, children, fullBleed = false, tight = false }) {
  return (
    <section
      id={id}
      className={`w-full overflow-visible ${tight ? "pt-10 md:pt-12" : "pt-20"}`}
    >
      <div className="w-full h-px bg-border mb-8" />

      {fullBleed ? (
        <>
          <div className="mb-12">
            <SectionLabel>{label}</SectionLabel>
          </div>
          {children}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 overflow-visible">
          {/* Label rail — sticky so the label keeps you oriented in long sections */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <SectionLabel>{label}</SectionLabel>
            </div>
          </div>
          {/* Content — cols 4–12, the same axis in every section */}
          <div className="md:col-span-9 overflow-visible">{children}</div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const profileData = useLocalizedProfile(rawProfile);
  const localizedProjects = useLocalizedProfile(projects);
  const { t } = useTranslation();

  // Same split as /projects — one rule, two pages
  const published  = localizedProjects.filter((p) => p.status === "published");
  const inProgress = localizedProjects.filter((p) => p.status === "in-progress");
  const comingSoon = localizedProjects.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = published.length > 0 || inProgress.length > 0 || comingSoon.length > 0;

  return (
    // pb-24 → pb-6: the Footer owns the space above itself now (see patch note)
    <div className="w-full relative pb-6 overflow-visible">

      {/* ── Hero — natural height, no viewport lock, NO overflow clip ──
          Do not re-add overflow-hidden here. It clips the role badge. */}
      <section id="Hero-Section" className="w-full relative overflow-visible">
        <Hero data={profileData} />
      </section>

      {/* ── About — tight rhythm: sits ~48px under the Hero, not ~150px ── */}
      <HomeSection id="AboutMe-Section" label={t("about.heading")} tight>
        <AboutBio data={profileData} />

        {/* The Bridge — visual proof of the bio's "eight years across..." claim.
            mt-14 → mt-12 so the arc breathes without reopening a gap. */}
        <div className="mt-12">
          <CareerArc variant="compact" />
        </div>
      </HomeSection>

      {/* ── Case Studies — STACKED list, same system as /projects ──
           id="projects" kept here so the /#projects nav anchor works;
           scroll-mt offsets the sticky Nav (roadmap item 1.3 ✓) */}
      <section id="projects" className="w-full pt-20 scroll-mt-24 overflow-visible">
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
              {inProgress.map((project, i) => (
                <StackedProjectCard
                  key={project.slug}
                  project={project}
                  index={published.length + i}
                />
              ))}
              {comingSoon.map((project, i) => (
                <ComingSoonRow
                  key={project.slug}
                  project={project}
                  index={published.length + inProgress.length + i}
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