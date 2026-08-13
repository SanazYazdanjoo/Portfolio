// One shared grid for the whole page: a 1200px column, 12 tracks, held by
// every section (Hero, About, Bridge, Case Studies) via `.home-grid`. Case
// Studies used to bleed its cards to the viewport edge with negative
// margins — it now lives on the same label-rail + content-column axis as
// About/Bridge instead, via HomeSection, so the content column never drifts
// between sections. HomeSection controls the vertical gap above each
// section via its `tight` prop; the Hero-Section wrapper must stay
// overflow-visible or it clips the handwritten role badge in Hero.jsx.
// Footer padding here (pb-6) pairs with Footer's own internal lead-in —
// both sides define the gap between them.

import React from "react";
import { Hero } from "../components/Hero";
import { AboutBio } from "../components/AboutMe";
import { StackedProjectCard } from "../components/StackedProjectCard";
import { sortedProjects } from "../data/projects";
import { profileData as rawProfile } from "../data/profile";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import CareerArc from "../components/CareerArc";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const EASE = [0.22, 0.61, 0.36, 1];

// Eyebrow + heading, animated in as a pair rather than one block: the
// eyebrow only earns its line when it carries information the heading
// doesn't (a number + a short descriptor — "01 — Who I Am" — not a repeat
// of "About Me"). Both share `type-section` so no two sections read at a
// different scale. Lives in the sticky label rail so it scrolls with its
// section instead of leaving a dead gutter.
//
// Note: `primary-600` (#5E1605) is the codebase's AA-safe coral for small
// text (see theme.css) and is used here for the eyebrow so verification
// item 5 holds — both -600 and the base -700/-500 clear WCAG AA on white
// now that the palette runs on the darker Brandy coral.
function SectionHeading({ eyebrow, heading }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <motion.span
        className="block text-[11px] tracking-[0.12em] uppercase text-primary-600 font-bold"
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        className="type-section mt-2"
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.08, ease: EASE }}
      >
        {heading}
      </motion.h2>
    </div>
  );
}

// The one section rhythm: divider → label rail + content, held to the
// shared 1200px column everywhere it's used.
//
// Rail collapses to a stacked single column below 1024px (lg:) rather than
// 768px (md:) — narrower than that and there isn't room for a sticky rail
// beside the content without cramping it. The rail is 4/12 columns (not 3)
// so "Case Studies" always sets on one line; a hairline at its right edge
// reads the resulting gutter as intentional structure rather than leftover
// space, and the sticky offset matches the fixed nav's height.
//
// `tight` is for a section that directly follows the Hero, which already
// carries its own trailing space — the default pt-20 would double it up.
//   tight  → pt-10 md:pt-12  (40 / 48px)
//   normal → pt-20           (80px)
function HomeSection({ id, eyebrow, heading, children, tight = false }) {
  return (
    <section
      id={id}
      className={`w-full overflow-visible scroll-mt-24 ${tight ? "pt-10 md:pt-12" : "pt-20"}`}
    >
      <div className="w-full h-px bg-border mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 overflow-visible">
        {/* Label rail — sticky so the heading stays visible in long
            sections; releases at this wrapper's own bottom edge, which
            CSS Grid stretches to match the content column's height. */}
        <div className="lg:col-span-4 lg:pr-6 lg:border-r lg:border-[rgba(33,29,28,0.08)]">
          <div className="lg:sticky lg:top-24">
            <SectionHeading eyebrow={eyebrow} heading={heading} />
          </div>
        </div>
        {/* Content — the same axis in every section */}
        <div className="lg:col-span-8 overflow-visible">{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const profileData = useLocalizedProfile(rawProfile);
  const localizedProjects = useLocalizedProfile(sortedProjects);
  const { t } = useTranslation();

  useDocumentMeta({
    title: `${profileData.name} — ${profileData.role}`,
    description: profileData.profileSummary,
  });

  // Same split as /projects — one rule, two pages. Order comes from
  // sortedProjects (each project's `order` field), NOT from re-grouping by
  // status here: a live in-progress case study with order:1 must be able to
  // lead the page. Only coming-soon is split out, because it renders a
  // different row component.
  const live       = localizedProjects.filter((p) => p.status !== "coming-soon");
  const comingSoon = localizedProjects.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = live.length > 0 || comingSoon.length > 0;

  return (
    // Footer owns the space above itself; this wrapper only needs a small pad
    <div className="w-full relative pb-6 overflow-visible">

      {/* Hero — natural height, no viewport lock. Keep overflow-visible:
          overflow-hidden here clips the handwritten role badge. */}
      <section id="Hero-Section" className="w-full relative overflow-visible max-w-[1200px] mx-auto">
        <Hero data={profileData} />
      </section>

      {/* About + Bridge — the page's one alternate surface: a warm off-white
          band, bled edge-to-edge (matching App.jsx's own px-8/12/16 gutter)
          so the page isn't a single uninterrupted white sheet. Content
          inside still holds the shared 1200px column. */}
      <div className="-mx-8 md:-mx-12 lg:-mx-16 bg-surface-warm">
        <div className="px-8 md:px-12 lg:px-16 pb-14 md:pb-16">
          <div className="max-w-[1200px] mx-auto w-full">
            <HomeSection id="AboutMe-Section" eyebrow={t("home.about.kicker")} heading={t("about.heading")} tight>
              <AboutBio data={profileData} />

              {/* The Bridge — visual proof of the bio's "eight years across..." claim */}
              <div className="mt-12">
                <CareerArc variant="compact" />
              </div>
            </HomeSection>
          </div>
        </div>
      </div>

      {/* Case Studies — same label-rail + content-column system as
          About/Bridge, so the content axis never drifts between sections.
          id="projects" is the target of the /#projects nav anchor. */}
      <div className="max-w-[1200px] mx-auto w-full">
        <HomeSection id="projects" eyebrow={t("home.projects.kicker")} heading={t("projects.heading")}>
          {hasAnyProjects ? (
            <div>
              {live.map((project, i) => (
                <StackedProjectCard key={project.slug} project={project} index={i} />
              ))}
              {comingSoon.map((project, i) => (
                <ComingSoonRow
                  key={project.slug}
                  project={project}
                  index={live.length + i}
                />
              ))}
              {/* Closing hairline under the last row */}
              <div className="w-full h-px bg-border" />
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="doodle-text m-0 text-3xl text-dim">
                {t("home.projects.empty")}
              </p>
            </div>
          )}
        </HomeSection>
      </div>

    </div>
  );
}
