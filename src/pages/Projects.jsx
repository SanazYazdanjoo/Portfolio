// src/pages/Projects.jsx
// ─────────────────────────────────────────────────────────────────────────────
// STACKED EDITION — /projects now uses the SAME list system as Home:
//
//   • published    → StackedProjectCard (spine, hover-expand panel, route)
//   • coming-soon  → ComingSoonRow (shared component — extracted from Home)
//   • none at all  → WIP empty state (same i18n keys as Home, so both pages
//                    stay in sync when translations change)
//
// The old ProjectCard grid is gone. One list language across the whole site.
//
// Layout note: cards carry their own px-8 md:px-16 inner padding, so they
// break out of the page container with negative margins that MIRROR the
// container's px-4 md:px-8 — the card edge kisses the viewport edge exactly
// like on Home.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { StackedProjectCard } from "../components/StackedProjectCard";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { useTranslation } from "../context/LanguageContext";

export default function Projects() {
  const { t } = useTranslation();

  // Same split as Home — one rule, two pages
  const published = projects.filter((p) => p.status !== "coming-soon");
  const comingSoon = projects.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = published.length > 0 || comingSoon.length > 0;

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-transparent">
      <div className="container relative z-10 mx-auto px-4 md:px-8">

        {/* ── Page header ── */}
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[11px] tracking-[0.2em] uppercase
                           text-primary-600 font-bold mb-4">
            {t("projects.heading")}
          </span>
          <h1 className="font-display text-5xl md:text-8xl tracking-tighter text-text">
            Case Studies<span className="text-primary">.</span>
          </h1>
        </motion.header>

        {/* ── Stacked list — mirrors container padding to go full-bleed ── */}
        {hasAnyProjects ? (
          <div className="relative flex flex-col -mx-4 md:-mx-8 border-b border-border">
            {published.map((project, index) => (
              <StackedProjectCard
                key={project.id || index}
                project={project}
                index={index}
              />
            ))}
            {comingSoon.map((project, i) => (
              <ComingSoonRow
                key={project.id || `soon-${i}`}
                project={project}
                index={published.length + i}
              />
            ))}
          </div>
        ) : (
          /* ── Empty state — same keys as Home so both pages stay in sync ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border/30 px-12 py-20 text-center"
          >
            <svg className="w-12 h-12 text-primary/25 mx-auto mb-6" fill="none"
              stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <p className="text-[13px] font-semibold text-text/30 uppercase tracking-widest mb-2">
              {t("projects.wip")}
            </p>
            <p className="text-[13px] text-text/40 max-w-xs mx-auto leading-relaxed font-light">
              {t("projects.wipDesc")}
            </p>
          </motion.div>
        )}

      </div>
    </main>
  );
}