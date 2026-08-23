// One shared grid for the whole page: a 1200px column, 12 tracks, held by
// every section (Hero, About, Bridge, Case Studies) via `.home-grid`. Case
// Studies used to bleed its cards to the viewport edge with negative
// margins — it now lives on the same label-rail + content-column axis as
// About/Bridge instead, via HomeSection, so the content column never drifts
// between sections. HomeSection controls the vertical gap above each
// section via its `tight` prop.
// The page does not pad its own bottom: the Footer already carries pt-12
// above its first row, and adding a second gap on this side is what left a
// dead band under the last case study.

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
import { EASE } from "../utils/motion";
import { EmptyState } from "../components/EmptyState";


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
        className="block text-2xs uppercase text-primary-600 font-bold"
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
//
// `rail` is content for the space under the sticky label. A 4/12 column
// holding two lines of heading and then 400px of nothing is a hole, not
// structure — either it earns its width or the section should collapse to
// one centred column. About fills it (see WhatIBring below); Case Studies
// deliberately leaves it empty, because its heading has to stay pinned
// beside a list that runs several screens.
function HomeSection({ id, eyebrow, heading, children, rail = null, tight = false }) {
  return (
    <section
      id={id}
      className={`w-full overflow-visible scroll-mt-24 ${tight ? "pt-10 md:pt-12" : "pt-20"}`}
    >
      <div className="w-full rule-line mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 overflow-visible">
        {/* Label rail — sticky so the heading stays visible in long
            sections; releases at this wrapper's own bottom edge, which
            CSS Grid stretches to match the content column's height. */}
        <div className="lg:col-span-4 lg:pr-6 lg:border-r lg:rule-r lg:rule-soft">
          <div className="lg:sticky lg:top-24">
            <SectionHeading eyebrow={eyebrow} heading={heading} />
            {rail && <div className="mt-8 lg:mt-10">{rail}</div>}
          </div>
        </div>
        {/* Content — the same axis in every section */}
        <div className="lg:col-span-8 overflow-visible">{children}</div>
      </div>
    </section>
  );
}

// Fills the About rail: three capability lines, each one a claim the page
// goes on to evidence — the research methods and the stack come straight
// from The Bridge's own skill groups (src/data/career.js), and the QA line
// is the third phase of the same arc. Short enough to read as a summary
// beside the bio rather than compete with it.
function WhatIBring() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const items = [
    t("home.about.bring.research"),
    t("home.about.bring.build"),
    t("home.about.bring.qa"),
  ];

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
    >
      <h3 className="text-xs font-black uppercase tracking-caps text-primary-600">
        {t("home.about.bring.title")}
      </h3>
      <ul className="mt-4 space-y-3 list-none m-0 p-0 border-t rule-t pt-4">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-text-meta">
            <span className="text-primary-600 shrink-0" aria-hidden="true">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
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
    // Footer owns the space above itself — this wrapper adds none of its own
    <div className="w-full relative overflow-visible">

      {/* Hero — capped at ~85vh by Hero.jsx itself, not locked here. */}
      <section id="Hero-Section" className="w-full relative overflow-visible max-w-page mx-auto">
        <Hero data={profileData} />
      </section>

      {/* About + Bridge — the page's one alternate surface: a warm off-white
          band, bled edge-to-edge (matching App.jsx's own px-8/12/16 gutter)
          so the page isn't a single uninterrupted white sheet. Content
          inside still holds the shared 1200px column. */}
      <div className="-mx-8 md:-mx-12 lg:-mx-16 bg-surface-warm">
        <div className="px-8 md:px-12 lg:px-16 pb-14 md:pb-16">
          <div className="max-w-page mx-auto w-full">
            <HomeSection
              id="AboutMe-Section"
              eyebrow={t("home.about.kicker")}
              heading={t("about.heading")}
              rail={<WhatIBring />}
              tight
            >
              <AboutBio data={profileData} />

              {/* The Bridge — visual proof of the bio's "5+ years across..." claim */}
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
      <div className="max-w-page mx-auto w-full">
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
              <div className="w-full rule-line" />
            </div>
          ) : (
            <EmptyState title={t("home.projects.empty")} />
          )}
        </HomeSection>
      </div>

    </div>
  );
}
