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

import { useEffect, useRef, useState } from "react";
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
// Opaque `bg-bg`, and no backdrop-blur: a translucent frosted bar over
// scrolling content is the pairing mobile browsers are worst at
// invalidating, which leaves stale copies of already-scrolled content baked
// into the bar. The frosting bought nothing anyway: everything behind this
// bar is the content wrapper's opaque background.
//
// `top-0`, NOT top-[80px]: the site header is a static flex sibling ABOVE
// the scroll container (App.jsx), so this bar's containing scroller already
// starts at the header's bottom edge. The old 80px offset was a relic of a
// long-gone overlay-header design — on a phone it pinned the bar mid-air,
// with a transparent dead band above it that body text scrolled straight
// through before being guillotined by the bar's top edge (measured on a
// reader's recording: whole caption lines swallowed).
export function MobilePillBar({ sections, activeId, onNavigate }) {
  const { t } = useTranslation();
  const stripRef = useRef(null);
  // Whether the strip is scrolled to its end. The right-edge fade is a
  // "more tabs this way" affordance, so it must disappear when that stops
  // being true — a fade that also veils the LAST pill at full scroll says
  // "more" exactly when there is none.
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () =>
      setAtEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1);
    update();
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      strip.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  // Keep the active pill in view. The strip scrolls horizontally, so a
  // working scroll-spy alone isn't enough — by mid-page the active section's
  // pill can be clipped past the right edge, and a bar that highlights
  // something the reader can't see is as useless as one that never updates.
  // Manual scrollLeft math rather than scrollIntoView: scrollIntoView
  // scrolls EVERY scrollable ancestor, and this strip lives inside the
  // page's one big scroller, which must not move.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !activeId) return;
    const pill = strip.querySelector(`[data-section-id="${activeId}"]`);
    if (!pill) return;
    const target = pill.offsetLeft - (strip.clientWidth - pill.offsetWidth) / 2;
    // Optional call: jsdom implements neither scrollTo nor scrollLeft writes.
    strip.scrollTo?.({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeId]);

  return (
    // translateZ(0) is load-bearing, not an optimization: the content
    // sections could otherwise be composited above this bar by iOS WebKit
    // mid-scroll, whatever z-index says (observed on-device). Giving the
    // bar its own layer hands the compositor an explicit order to honour.
    <div className="sticky top-0 z-40 bg-bg border-b rule-b
                     -mx-4 px-4 py-2 md:hidden no-print"
         style={{ transform: "translateZ(0)" }}>
      <div ref={stripRef} className="flex gap-1 overflow-x-auto pr-8">
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
      {/* Right-edge fade: the affordance that the strip continues. Without
          it the last visible pill clips hard mid-word against the viewport
          and reads as the end of the list. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-12
                    transition-opacity duration-200 ${atEnd ? "opacity-0" : "opacity-100"}`}
        /* Solid for the first quarter, then falls off: a pure 0→1 gradient
           read as video noise on a reader's recording, not as "more tabs
           this way". */
        style={{ background: "linear-gradient(to left, var(--bg) 25%, transparent)" }}
      />
    </div>
  );
}
