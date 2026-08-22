// Grid view (default) and list view, toggled by the user: grid renders
// ProjectTile in a responsive column layout; list renders ProjectListRow, a
// plain non-expanding row (the hover-expand panel stays on Home's
// StackedProjectCard); coming-soon items render ComingSoonRow in both views;
// the empty state uses the same i18n keys as Home so the two pages stay in
// sync. The chosen view persists in localStorage across visits.
//
// List rows carry their own px-8 md:px-16 inner padding and break out of the
// page container with negative margins that mirror the container's
// px-4 md:px-8, so the row edge meets the viewport edge exactly like on Home.

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sortedProjects } from "../data/projects";
import { ProjectListRow } from "../components/ProjectListRow";
import { ProjectTile } from "../components/ProjectTile";
import { ComingSoonRow } from "../components/ComingSoonRow";
import { useTranslation } from "../context/LanguageContext";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { profileData as rawProfile } from "../data/profile";
import { EASE } from "../utils/motion";

const VIEW_STORAGE_KEY = "projects.view";

function readStoredView() {
  try {
    const stored = localStorage.getItem(VIEW_STORAGE_KEY);
    return stored === "list" || stored === "grid" ? stored : "list";
  } catch {
    return "list";
  }
}

// Sliding coral pill behind the active toggle button — shared layoutId
// makes it glide between LIST and GRID instead of popping.
function ViewToggleButton({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`relative flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-widest
                 transition-colors duration-200 ${active ? "text-white" : "text-text/60 hover:text-text"}`}
    >
      {active && (
        <motion.span
          layoutId="projects-view-pill"
          className="absolute inset-0 bg-primary rule-fill -z-10"
          transition={{ duration: 0.25, ease: EASE }}
        />
      )}
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const localizedProjects = useLocalizedProfile(sortedProjects);
  const [view, setView] = useState(readStoredView);
  const profileData = useLocalizedProfile(rawProfile);

  useDocumentMeta({
    title: `${t("projects.title")} — ${profileData.name}`,
    description: profileData.tagline,
  });

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch {
      // Storage unavailable (private mode, etc.) — view just won't persist.
    }
  }, [view]);

  // Same split as Home — one rule, two pages. Order comes from
  // sortedProjects (each project's `order` field), NOT from re-grouping by
  // status here: a live in-progress case study with order:1 must be able to
  // lead the list. Only coming-soon is split out, because it renders a
  // different row component.
  const live       = localizedProjects.filter((p) => p.status !== "coming-soon");
  const comingSoon = localizedProjects.filter((p) => p.status === "coming-soon");
  const hasAnyProjects = live.length > 0 || comingSoon.length > 0;
  const allForGrid = localizedProjects; // already ordered, coming-soon last

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-8 relative overflow-hidden bg-transparent">
      <div className="container relative z-10 mx-auto px-4 md:px-8">

        {/* Page header */}
        <motion.header
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div>
            <h1 className="font-display text-5xl md:text-8xl tracking-tighter text-text leading-none">
              {t("projects.title")}<span className="text-primary">.</span>
            </h1>
          </div>

          {/* View toggle: list vs tile grid */}
          {hasAnyProjects && (
            <div
              role="group"
              aria-label={t("projects.view.label")}
              className="flex shrink-0 items-center gap-1 border rule-frame p-1 mb-1"
            >
              <ViewToggleButton
                active={view === "list"}
                onClick={() => setView("list")}
                label={t("projects.view.list")}
                icon={
                  <svg className="w-4 h-4 relative" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                }
              />
              <ViewToggleButton
                active={view === "grid"}
                onClick={() => setView("grid")}
                label={t("projects.view.grid")}
                icon={
                  <svg className="w-4 h-4 relative" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h7v7H4V5zm9 0h7v7h-7V5zM4 14h7v7H4v-7zm9 0h7v7h-7v-7z" />
                  </svg>
                }
              />
            </div>
          )}
        </motion.header>

        {/* List / Grid — mirrors container padding to go full-bleed in list mode */}
        {hasAnyProjects ? (
          <AnimatePresence mode="wait" initial={false}>
            {view === "list" ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="relative flex flex-col -mx-4 md:-mx-8"
              >
                {live.map((project, index) => (
                  <ProjectListRow
                    key={project.id || index}
                    project={project}
                    index={index}
                  />
                ))}
                {comingSoon.map((project, i) => (
                  <ComingSoonRow
                    key={project.id || `soon-${i}`}
                    project={project}
                    index={live.length + i}
                  />
                ))}
                {/* Closing hairline under the last row — its own element, not
                    a border-b on this wrapper: the rows paint an opaque bg-bg
                    right up to the wrapper's content edge, which would sit on
                    top of the hand-drawn rule's 5px band and hide it. */}
                <div className="w-full rule-line" />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid grid-cols-1 md:grid-cols-2 min-[1440px]:grid-cols-3 gap-6 md:gap-8"
              >
                {allForGrid.map((project, index) => (
                  <ProjectTile
                    key={project.id || `tile-${index}`}
                    project={project}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          /* Empty state — same keys as Home so both pages stay in sync */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border rule-box px-12 py-20 text-center"
          >
            <svg className="w-12 h-12 text-primary/25 mx-auto mb-6" fill="none"
              stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <p className="text-[13px] font-semibold text-text-meta uppercase tracking-widest mb-2">
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
