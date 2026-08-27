// Section navigation: the sticky sidebar TOC (md+) and the mobile pill bar.
// Both resolve the same `sections` list and the same activeId, so they stay
// in one file.
//
// The sidebar collapses to a numbered icon rail. Collapsing is not just
// hiding: the content column claims the freed width back (see
// ProjectTemplate), which is the entire point — a reader who dismisses the
// nav wants the figures bigger, not a strip of empty page. The rail keeps the
// numbers and the active-section indicator, so orientation survives the
// collapse; only the labels go. Below md neither form renders — the mobile
// pill bar owns that width — so the toggle is a wide-screen affordance by
// construction, and nothing about it needs a media query of its own.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";
import { Chevron } from "./Chevron";
import { HandArrow } from "../../components/HandArrow";
import { HandChevron, HandList } from "../../components/HandIcons";
import { EASE } from "./constants";

// Sticky TOC — numbers and labels, active item marked with a layoutId
// indicator that slides between entries instead of popping.
export function SidebarNav({
  sections,
  activeId,
  onNavigate,
  allOpen,
  onToggleAll,
  collapsed = false,
  onToggleCollapsed,
  listId = "project-toc",
}) {
  const { t } = useTranslation();
  const toggleLabel = collapsed ? t("project.sidebar.show") : t("project.sidebar.hide");

  return (
    <nav aria-label={t("project.sidebar.ariaLabel")}>
      {/* Toggle first in the DOM, so tabbing into the sidebar reaches the
          control that governs the list before the list itself. */}
      <div className={`mb-6 flex ${collapsed ? "justify-center" : "justify-end"}`}>
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-expanded={!collapsed}
          aria-controls={listId}
          aria-label={toggleLabel}
          title={toggleLabel}
          className="inline-flex h-8 w-8 items-center justify-center border rule-frame
 text-dim transition-colors duration-200
 hover:[--rule-line-color:var(--primary-600)] hover:text-primary-600 focus-ring"
        >
          {collapsed
            ? <HandList className="h-3.5 w-3.5" />
            : <HandChevron className="h-3.5 w-3.5 rotate-90" />}
        </button>
      </div>

      {!collapsed && (
        <Link
          to="/projects"
          className="flex items-center gap-2 text-2xs font-black uppercase
                     text-dim hover:text-primary-600 transition-colors duration-200 mb-8 group"
        >
          <HandArrow direction="back" className="w-3 h-3 transform group-hover:-translate-x-0.5 transition-transform" />
          {t("project.sidebar.allProjects")}
        </Link>
      )}

      {/* The list stays mounted and keyboard-reachable when collapsed — it
          sheds its labels, not its function. Each entry keeps an accessible
          name through aria-label, since a visible "03" is not one. */}
      <ul id={listId} className="space-y-0.5">
        {sections.map((section, i) => {
          const isActive = activeId === section.id;
          // `label` is the per-project override (meta.sectionTitles, already
          // localized); the translation key is the site-wide default.
          const label = section.label || t(section.labelKey);
          return (
            <li key={section.id}>
              <button
                onClick={() => onNavigate(section.id)}
                data-section-id={section.id}
                aria-label={collapsed ? label : undefined}
                title={collapsed ? label : undefined}
                aria-current={isActive ? "true" : undefined}
                className={`relative w-full text-left flex items-baseline gap-3 py-2
                  transition-colors duration-200
                  ${collapsed ? "justify-center px-0" : "pl-3 pr-3"}
                  ${isActive ? "text-primary-600" : "text-dim hover:text-text-meta"}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-toc-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[5px] rule-stroke-v bg-primary-600"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
                <span className="font-mono text-2xs font-bold tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {!collapsed && (
                  <span className="text-2xs font-bold uppercase">
                    {label}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {!collapsed && (
        <button
          onClick={onToggleAll}
          className="mt-6 pt-4 border-t rule-t w-full text-left flex items-center gap-2
                     text-2xs font-bold uppercase text-dim
                     hover:text-primary-600 transition-colors duration-200"
        >
          <Chevron isOpen={allOpen} />
          {allOpen ? t("project.sidebar.collapseAll") : t("project.sidebar.expandAll")}
        </button>
      )}
    </nav>
  );
}

// Mobile pill bar.
//
// Opaque `bg-bg`, and no backdrop-blur. This bar pins at the same `top: 80px`
// as the project hero banner, so its backdrop is a filtered, permanently
// pinned compositing layer — the one pairing mobile browsers are worst at
// invalidating, which leaves stale copies of already-scrolled content baked
// into the bar. The frosting bought nothing anyway: everything behind this
// bar is the content wrapper's opaque background.
export function MobilePillBar({ sections, activeId, onNavigate }) {
  const { t } = useTranslation();
  return (
    <div className="sticky top-[80px] z-40 bg-bg border-b rule-b
                     -mx-4 px-4 py-2 md:hidden no-print">
      <div className="flex gap-1 overflow-x-auto">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              data-section-id={section.id}
              className={`shrink-0 px-3 py-1.5 text-2xs font-black uppercase
                transition-colors duration-200
                border rule-frame
                ${isActive
                  ? "text-white [--rule-line-color:var(--primary)] [--rule-fill-color:var(--primary)]"
                  : "text-dim hover:text-text"
                }`}
            >
              {section.label || t(section.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
