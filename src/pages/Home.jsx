// The homepage, built to the "Ink & Bloom" design reference
// (templates/portfolio-homepage).
//
// Structure, section by section, exactly as the reference lays it out:
//
//   hero      72px top / 88px bottom · text cols 1-7 · portrait cols 9-12
//   about     88px · warm band, ruled top and bottom
//             heading full width · bio cols 1-7 · timeline cols 9-12
//   work      88px · heading cols 1-7, 56px below it, then the card list
//   contact   88px · warm band, ruled top
//             heading full width · availability, email, links, colophon
//             cols 1-7, on the heading's own axis
//
// No component on this page sets a size or a length of its own: every value
// is a token from the reference's scale (see theme.css) reached through a
// Tailwind key. design-system.test.js fails the build on any that is not.

import React from "react";
import { Hero } from "../components/Hero";
import { AboutBio } from "../components/AboutMe";
import { StackedProjectCard } from "../components/StackedProjectCard";
import { sortedProjects } from "../data/projects";
import { profileData as rawProfile } from "../data/profile";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { HomeContact } from "../components/HomeContact";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import CareerArc from "../components/CareerArc";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { EASE } from "../utils/motion";
import { EmptyState } from "../components/EmptyState";

// Eyebrow + heading. The eyebrow is the mono label role — the only place
// capitals appear — and the heading is the section role, 34px, in every
// section without exception.
function SectionHeading({ eyebrow, heading }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
    >
      <p className="text-label font-mono uppercase text-primary-600 mb-s8">{eyebrow}</p>
      <h2 className="text-h2 font-display font-bold text-text-display">{heading}</h2>
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

  const onHome     = localizedProjects.filter((p) => !p.excludeFromHome);
  const live       = onHome.filter((p) => p.status !== "coming-soon");
  const comingSoon = onHome.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = live.length > 0 || comingSoon.length > 0;

  return (
    <div className="w-full">

      {/* Hero — the one section the reference gives a different top pad. */}
      <section id="Hero-Section" className="pb-s88" style={{ paddingTop: "var(--hero-pad-top)" }}>
        <Hero data={profileData} />
      </section>

      {/* About — the heading runs the full width above the content rather
          than sitting in a sidebar beside it. Below it the bio takes cols
          1-7 (about 55ch at the statement step, so the measure comes from
          the columns and not from a max-width) and the timeline takes
          cols 9-12. */}
      <section
        id="AboutMe-Section"
        className="section-pad scroll-mt-s56 bg-surface-warm border-y rule-tb"
      >
        <div className="grid-12">
          <div className="md:col-span-12 mb-s48">
            <SectionHeading eyebrow={t("home.about.kicker")} heading={t("about.heading")} />
          </div>
          <div className="md:col-span-7">
            <AboutBio data={profileData} />
          </div>
          <div className="md:col-start-9 md:col-span-4 mt-s48 md:mt-0">
            <CareerArc variant="compact" />
          </div>
        </div>
      </section>

      <section id="projects" className="section-pad scroll-mt-s56">
        <div className="grid-12 mb-s56">
          <div className="md:col-span-7">
            <SectionHeading
              eyebrow={t("home.projects.kicker")}
              heading={t("projects.heading")}
            />
          </div>
        </div>

        {hasAnyProjects ? (
          <div>
            {live.map((project, i) => (
              <StackedProjectCard key={project.slug} project={project} index={i} />
            ))}
            {comingSoon.map((project, i) => (
              <ComingSoonRow key={project.slug} project={project} index={live.length + i} />
            ))}
          </div>
        ) : (
          <div className="grid-12">
            <div className="md:col-span-12">
              <EmptyState title={t("home.projects.empty")} />
            </div>
          </div>
        )}
      </section>

      <section
        id="contact"
        className="section-pad scroll-mt-s56 bg-surface-warm border-t rule-t"
      >
        <div className="grid-12">
          <div className="md:col-span-12 mb-s48">
            <SectionHeading
              eyebrow={t("home.contact.kicker")}
              heading={t("contact.headline")}
            />
          </div>
          {/* Column 1, the same axis as the heading above it. */}
          <div className="md:col-span-7">
            <HomeContact data={profileData} />
          </div>
        </div>
      </section>

    </div>
  );
}
