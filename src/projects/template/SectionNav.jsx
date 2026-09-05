// Section navigation: the sticky sidebar TOC (md+) and the phone's in-flow
// section index. Both resolve the same `sections` list, so they stay in one
// file — but only the sidebar knows about activeId. On a phone there is no
// active section to mark, by design (see MobileSectionIndex).
//
// The sidebar collapses to a numbered icon rail. Collapsing is not just
// hiding: the content column claims the freed width back (see
// ProjectTemplate), which is the entire point — a reader who dismisses the
// nav wants the figures bigger, not a strip of empty page. The rail keeps the
// numbers and the active-section indicator, so orientation survives the
// collapse; only the labels go. Below md neither form renders — the section
// index owns that width — so the toggle is a wide-screen affordance by
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

// Phone section index.
//
// A plain, in-flow list of the page's sections, rendered once under the
// header and scrolled past like any other content. It replaces the sticky
// pill bar, and the difference is the whole point: the bar was a
// `position: sticky` layer with its own transform, re-rendered on every
// scroll-spy change and re-scrolled horizontally to centre the active pill,
// all inside iOS WebKit's async overflow scroller. Each of those was a
// separately fixed source of the "page shakes while I scroll" report, and
// after four rounds of layer surgery the page still shook — while every
// screenshot of it looked fine, which is the signature of an animation
// between two valid frames rather than a broken one. A phone gets nothing
// that can animate between frames at all: this element has no state, no
// effects, no observers, no sticky pin and no transform. It cannot move
// unless the reader scrolls it, and then it moves with everything else.
//
// No active-section marker, deliberately. Marking one needs a scroll-spy,
// and a spy needs the element it marks to be on screen — a sticky bar,
// which is what this replaced. The numbers on the section headings carry
// the orientation instead; a reader mid-page who wants the index scrolls
// up, the way they would in any document.
//
// data-corner-cta: on its way up the list transits the bottom-right corner
// where the ASK AI pill floats, so it declares the corner claimed for the
// transit and the pill parks (see hooks/useCornerOccupied.js) — the same
// contract the bar honoured, kept because two stacked tap targets is a real
// tap-swallowing bug a reader recorded, and the parking observer is rooted
// at the scroller and fires only on real band crossings.
export function MobileSectionIndex({ sections, onNavigate }) {
  const { t } = useTranslation();
  if (!sections || sections.length === 0) return null;

  return (
    <nav
      /* Its own name, not the sidebar's "Page sections": both navs are in
         the DOM at every width (the sidebar hides by class), and two
         landmarks with one name are indistinguishable to a screen reader. */
      aria-label={t("project.sidebar.onThisPage")}
      className="md:hidden no-print mb-10 border-t rule-t pt-4"
      data-corner-cta=""
    >
      <p className="mb-3 text-2xs font-black uppercase text-primary-600">
        {t("project.sidebar.onThisPage")}
      </p>
      <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
        {sections.map((section, i) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => onNavigate(section.id)}
              data-section-id={section.id}
              className="inline-flex items-baseline gap-2 border rule-frame px-3 py-1.5
                         text-2xs font-black uppercase text-dim focus-ring"
            >
              <span className="font-mono tabular-nums text-primary-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.label || t(section.labelKey)}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
