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
import { projects } from "../data/projects";
import { profileData as rawProfile } from "../data/profile";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import CareerArc from "../components/CareerArc";

const EASE = [0.22, 0.61, 0.36, 1];

// Eyebrow (11px caps) + a proper 32–40px display heading — the mid-tier
// this page was missing. Lives in the sticky label rail so it scrolls with
// its section instead of leaving a dead 270px gutter.
function SectionHeading({ eyebrow, heading }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
    >
      <span className="block text-[11px] tracking-[0.2em] uppercase text-primary-600 font-bold">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display font-extrabold text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.01em] text-text">
        {heading}
      </h2>
    </motion.div>
  );
}

// The one section rhythm: divider → label rail (3) + content (9), held to
// the shared 1200px column everywhere it's used.
//
// `tight` is for a section that directly follows the Hero, which already
// carries its own trailing space — the default pt-20 would double it up.
//   tight  → pt-10 md:pt-12  (40 / 48px)
//   normal → pt-20           (80px)
function HomeSection({ id, label, children, tight = false }) {
  return (
    <section
      id={id}
      className={`w-full overflow-visible scroll-mt-24 ${tight ? "pt-10 md:pt-12" : "pt-20"}`}
    >
      <div className="w-full h-px bg-border mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 overflow-visible">
        {/* Label rail — sticky so the label stays visible in long sections;
            a hairline at the rail edge reads the empty space as structure. */}
        <div className="md:col-span-3 md:border-r md:border-border/60 md:pr-6">
          <div className="md:sticky md:top-28">
            <SectionHeading eyebrow={label} heading={label} />
          </div>
        </div>
        {/* Content — cols 4–12, the same axis in every section */}
        <div className="md:col-span-9 overflow-visible">{children}</div>
      </div>
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
            <HomeSection id="AboutMe-Section" label={t("about.heading")} tight>
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
        <HomeSection id="projects" label={t("projects.heading")}>
          {hasAnyProjects ? (
            <div>
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
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="doodle-text m-0 text-3xl text-dim">
                Case studies are being inked — check back soon.
              </p>
            </div>
          )}
        </HomeSection>
      </div>

    </div>
  );
}
