// Section navigation: the sticky sidebar TOC (md+) and the mobile pill bar.
// Both resolve the same `sections` list and the same activeId, so they stay
// in one file.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";
import { Chevron } from "./Chevron";
import { EASE } from "./constants";

// Sticky TOC — numbers and labels, active item marked with a layoutId
// indicator that slides between entries instead of popping.
export function SidebarNav({ sections, activeId, onNavigate, allOpen, onToggleAll }) {
  const { t } = useTranslation();
  return (
    <nav aria-label={t("project.sidebar.ariaLabel")}>
      <Link
        to="/projects"
        className="flex items-center gap-2 text-2xs font-black uppercase tracking-[0.2em]
                   text-dim hover:text-primary-600 transition-colors duration-200 mb-8 group"
      >
        <svg className="w-3 h-3 transform group-hover:-translate-x-0.5 transition-transform"
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {t("project.sidebar.allProjects")}
      </Link>

      <ul className="space-y-0.5">
        {sections.map((section, i) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => onNavigate(section.id)}
                className={`relative w-full text-left flex items-baseline gap-3 pl-3 pr-3 py-2
                  transition-colors duration-200
                  ${isActive ? "text-primary-600" : "text-dim hover:text-text/80"}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-toc-indicator"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-600"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
                <span className="font-mono text-2xs font-bold tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {t(section.labelKey)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={onToggleAll}
        className="mt-6 pt-4 border-t border-border w-full text-left flex items-center gap-2
                   text-2xs font-bold uppercase tracking-[0.15em] text-text/35
                   hover:text-primary-600 transition-colors duration-200"
      >
        <Chevron isOpen={allOpen} />
        {allOpen ? t("project.sidebar.collapseAll") : t("project.sidebar.expandAll")}
      </button>
    </nav>
  );
}

// Mobile pill bar
export function MobilePillBar({ sections, activeId, onNavigate }) {
  const { t } = useTranslation();
  return (
    <div className="sticky top-[80px] z-40 bg-bg/90 backdrop-blur-md border-b border-border
                     -mx-4 px-4 py-2 md:hidden no-print">
      <div className="flex gap-1 overflow-x-auto">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`shrink-0 px-3 py-1.5 text-2xs font-black uppercase tracking-widest
                transition-colors duration-200
                ${isActive
                  ? "bg-primary text-white"
                  : "text-dim hover:text-text border border-border"
                }`}
            >
              {t(section.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
