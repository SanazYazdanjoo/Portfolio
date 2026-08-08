// Grid view (default) and list view, toggled by the user: grid renders
// ProjectTile in a 2-column layout; list renders ProjectListRow, a plain
// non-expanding row (the hover-expand panel stays on Home's
// StackedProjectCard); coming-soon items render ComingSoonRow in both views;
// the empty state uses the same i18n keys as Home so the two pages stay in
// sync.
//
// List rows carry their own px-8 md:px-16 inner padding and break out of the
// page container with negative margins that mirror the container's
// px-4 md:px-8, so the row edge meets the viewport edge exactly like on Home.

import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { ProjectListRow } from "../components/ProjectListRow";
import { ProjectTile } from "../components/ProjectTile";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { useTranslation } from "../context/LanguageContext";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";

export default function Projects() {
  const { t } = useTranslation();
  const localizedProjects = useLocalizedProfile(projects);
  const [view, setView] = useState("grid"); // "list" | "grid"

  // Same split as Home — one rule, two pages
  const published  = localizedProjects.filter((p) => p.status === "published");
  const inProgress = localizedProjects.filter((p) => p.status === "in-progress");
  const comingSoon = localizedProjects.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = published.length > 0 || inProgress.length > 0 || comingSoon.length > 0;
  const allForGrid = [...published, ...inProgress, ...comingSoon];

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-transparent">
      <div className="container relative z-10 mx-auto px-4 md:px-8">

        {/* Page header */}
        <motion.header
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="font-display text-5xl md:text-8xl tracking-tighter text-text">
              {t("projects.title")}<span className="text-primary">.</span>
            </h1>
          </div>

          {/* View toggle: list vs 2-col tile grid */}
          {hasAnyProjects && (
            <div
              role="group"
              aria-label={t("projects.view.label")}
              className="flex shrink-0 items-center gap-1 border border-border p-1"
            >
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200
                           ${view === "list" ? "bg-primary text-white" : "text-text/60 hover:text-text"}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="hidden sm:inline">{t("projects.view.list")}</span>
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200
                           ${view === "grid" ? "bg-primary text-white" : "text-text/60 hover:text-text"}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h7v7H4V5zm9 0h7v7h-7V5zM4 14h7v7H4v-7zm9 0h7v7h-7v-7z" />
                </svg>
                <span className="hidden sm:inline">{t("projects.view.grid")}</span>
              </button>
            </div>
          )}
        </motion.header>

        {/* List / Grid — mirrors container padding to go full-bleed in list mode */}
        {hasAnyProjects ? (
          view === "list" ? (
            <div className="relative flex flex-col -mx-4 md:-mx-8 border-b border-border">
              {published.map((project, index) => (
                <ProjectListRow
                  key={project.id || index}
                  project={project}
                  index={index}
                />
              ))}
              {inProgress.map((project, i) => (
                <ProjectListRow
                  key={project.id || `wip-${i}`}
                  project={project}
                  index={published.length + i}
                />
              ))}
              {comingSoon.map((project, i) => (
                <ComingSoonRow
                  key={project.id || `soon-${i}`}
                  project={project}
                  index={published.length + inProgress.length + i}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {allForGrid.map((project, index) => (
                <ProjectTile
                  key={project.id || `tile-${index}`}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )
        ) : (
          /* Empty state — same keys as Home so both pages stay in sync */
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
            <p className="text-[13px] text-dim max-w-xs mx-auto leading-relaxed font-light">
              {t("projects.wipDesc")}
            </p>
          </motion.div>
        )}

      </div>
    </main>
  );
}