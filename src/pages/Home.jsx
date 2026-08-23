// One grid, one rhythm. Every section on this page is a `.grid-12` — 12
// columns, 1200px, 32px gutters — inside a `.section-pad` band of 128px top
// and bottom. No section sets its own padding and no block sets its own
// max-width: a narrower text column spans fewer columns instead.
//
// Where a heading sits is the one structural choice per section:
//
//   heading cols 1-4, content cols 6-12   About, Contact
//   heading full width, content below     Case Studies
//
// Case Studies is the exception because its cards must span all twelve
// columns themselves (see StackedProjectCard), so there is no room beside
// them for a heading rail.

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

// Eyebrow + heading. The eyebrow is the label step — the only capitals on
// the page — and the heading is h2, the same step in every section.
function SectionHeading({ eyebrow, heading }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
    >
      <p className="type-label text-primary-600">{eyebrow}</p>
      <h2 className="mt-s16 type-h2">{heading}</h2>
    </motion.div>
  );
}

// `layout`:
//   "split"   heading cols 1-4, content cols 6-12
//   "stacked" heading full width, content full width beneath it
function HomeSection({ id, eyebrow, heading, children, rail = null, layout = "split" }) {
  return (
    <section id={id} className="section-pad scroll-mt-s96">
      <div className="grid-12">
        {layout === "split" ? (
          <>
            <div className="md:col-span-4">
              <SectionHeading eyebrow={eyebrow} heading={heading} />
              {rail && <div className="mt-s48">{rail}</div>}
            </div>
            <div className="md:col-start-6 md:col-span-7 mt-s48 md:mt-0">{children}</div>
          </>
        ) : (
          <>
            <div className="md:col-span-12">
              <SectionHeading eyebrow={eyebrow} heading={heading} />
            </div>
            <div className="md:col-span-12 mt-s64">{children}</div>
          </>
        )}
      </div>
    </section>
  );
}

// Three capability lines, drawn from the same skill groups The Bridge
// renders (src/data/career.js) so the rail and the arc cannot drift.
function WhatIBring() {
  const { t } = useTranslation();
  const items = [
    t("home.about.bring.research"),
    t("home.about.bring.build"),
    t("home.about.bring.qa"),
  ];

  return (
    <div>
      <h3 className="type-label text-primary-600">{t("home.about.bring.title")}</h3>
      <ul className="mt-s16 pt-s16 border-t rule-t list-none m-0 p-0 flex flex-col gap-s12">
        {items.map((item) => (
          <li key={item} className="text-small text-text-meta">{item}</li>
        ))}
      </ul>
    </div>
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

      <section id="Hero-Section" className="section-pad">
        <Hero data={profileData} />
      </section>

      {/* About + The Bridge. The warm band bleeds to the viewport edge; the
          grid inside it is the same 1200px column as everywhere else. */}
      <div className="bg-surface-warm">
        <HomeSection
          id="AboutMe-Section"
          eyebrow={t("home.about.kicker")}
          heading={t("about.heading")}
          rail={<WhatIBring />}
        >
          <AboutBio data={profileData} />
          <div className="mt-s64">
            <CareerArc variant="compact" />
          </div>
        </HomeSection>
      </div>

      <HomeSection
        id="projects"
        eyebrow={t("home.projects.kicker")}
        heading={t("projects.heading")}
        layout="stacked"
      >
        {hasAnyProjects ? (
          // 64px between cards, with the single hairline that separates them
          // sitting in the middle of that gap: 32px of list gap, the rule, and
          // 32px of the next card's own lead-in.
          <div className="flex flex-col gap-s32">
            {live.map((project, i) => (
              <div key={project.slug} className={i > 0 ? "border-t rule-t pt-s32" : undefined}>
                <StackedProjectCard project={project} index={i} lead={i === 0} />
              </div>
            ))}
            {comingSoon.map((project, i) => (
              <div key={project.slug} className="border-t rule-t pt-s32">
                <ComingSoonRow project={project} index={live.length + i} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title={t("home.projects.empty")} />
        )}
      </HomeSection>

      <HomeSection
        id="contact"
        eyebrow={t("home.contact.kicker")}
        heading={t("contact.headline")}
      >
        <HomeContact data={profileData} />
      </HomeSection>

    </div>
  );
}
