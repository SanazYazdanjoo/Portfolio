// Section headings follow one pattern: a border-t divider, a numbered
// kicker in primary-600, then a font-display heading in ink, matching the
// rhythm used elsewhere on the site. The process rail uses numbered
// micro-labels on each card rather than a color-coded phase legend. Header
// tags render as a quiet, mid-dot-separated eyebrow line, and methods as a
// plain ink list, rather than chips. Metrics are font-display ink, with the
// kicker as the only coral accent. There is no sidebar progress bar — the
// numbered active state in the nav communicates position instead.
//
// Default export is ProjectTemplate({ meta, children }). All data comes
// from src/projects/*/data.js.

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionMedia from "./SectionMedia";
import { useTranslation } from "../context/LanguageContext";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";

// Phase config. Labels are resolved via t() at render time; only keys live here.
const PHASE_META = {
  discover: { labelKey: "project.phase.discover", number: "01" },
  define:   { labelKey: "project.phase.define",   number: "02" },
  design:   { labelKey: "project.phase.design",   number: "03" },
  deliver:  { labelKey: "project.phase.deliver",  number: "04" },
};

// Content section definitions. `labelKey` drives the sidebar/mobile-pill text (short form).
const SECTIONS = [
  { id: "process",      labelKey: "project.sidebar.process",      dataKey: "process"      },
  { id: "challenge",    labelKey: "project.sidebar.challenge",    dataKey: "challenge"    },
  { id: "solution",     labelKey: "project.sidebar.solution",     dataKey: "solution"     },
  { id: "prototype",    labelKey: "project.sidebar.prototype",    dataKey: "prototype"    },
  { id: "methodology",  labelKey: "project.sidebar.methodology",  dataKey: "methodology"  },
  { id: "results",      labelKey: "project.sidebar.results",      dataKey: "results"      },
  { id: "implications", labelKey: "project.sidebar.implications", dataKey: "implications" },
  { id: "phases",       labelKey: "project.sidebar.status",       dataKey: "phases"       },
  { id: "conclusion",   labelKey: "project.sidebar.conclusion",   dataKey: "conclusion"   },
];

// Section head — the one heading pattern, used by every section. The
// <button> nests inside the <h2> rather than the reverse: <h2> is not
// permitted content inside <button>, and this matches the ARIA Authoring
// Practices accordion example.
function CollapsibleSectionHead({ id, number, kicker, heading, isOpen, onToggle }) {
  return (
    <>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-3">
        {number} — {kicker}
      </p>
      <h2 className="mb-8">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-body`}
          className="group flex w-full items-center justify-between gap-4 border-0 bg-transparent
                     p-0 text-left font-display font-extrabold text-2xl md:text-3xl tracking-tight
                     leading-tight text-text focus:outline-none focus-visible:ring-2
                     focus-visible:ring-primary-600"
        >
          <span>{heading}</span>
          <span className="mt-0.5 shrink-0 text-text/30 transition-colors duration-200 group-hover:text-primary-600 no-print">
            <Chevron isOpen={isOpen} />
          </span>
        </button>
      </h2>
    </>
  );
}

// Chevron — rotates open/closed; no separate open/closed icon needed.
function Chevron({ isOpen }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`w-4 h-4 md:w-5 md:h-5 shrink-0 transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

// Content section wrapper: divider, clickable head, collapsible body. Open
// state is controlled by the parent's openSections set. Body height is
// animated with the CSS grid 0fr/1fr trick rather than measured in JS, so
// it works for arbitrary content — text, figures, the metrics strip —
// without a resize observer.
//
// Content stays mounted at all times rather than conditionally rendered, so
// in-page find, screen-reader access via the section id, and print output
// stay correct regardless of open/closed state. `[data-collapsible-body]`
// is force-opened in print CSS (src/index.css) for the same reason.
function ContentSection({ id, number, kicker, heading, isOpen, onToggle, children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className="pt-10 mb-14 md:pt-16 md:mb-20 border-t border-border scroll-mt-32"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <CollapsibleSectionHead
        id={id} number={number} kicker={kicker} heading={heading}
        isOpen={isOpen} onToggle={onToggle}
      />

      <div
        id={`${id}-body`}
        data-collapsible-body
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: "" } : {})}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: prefersReducedMotion ? "none" : "grid-template-rows 350ms ease",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div className="pb-1">{children}</div>
        </div>
      </div>
    </motion.section>
  );
}

// Process card
function ProcessCard({ item, index }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const phase = PHASE_META[item.phase] || PHASE_META.discover;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
      className="bg-bg border border-border hover:border-text/30
                 transition-colors duration-300 flex flex-col
                 w-[270px] md:w-[290px] shrink-0 snap-start"
      role="listitem"
    >
      {/* Image / structured placeholder */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-muted/40 relative">
        {item.imagePath && !imgError ? (
          <img
            src={item.imagePath}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover grayscale hover:grayscale-0
                       transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display font-extrabold text-5xl text-text/10 select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Phase + type — one quiet micro-line, no color coding */}
        <p className="font-mono text-2xs uppercase tracking-wider text-text/45 mb-2">
          {phase.number} {t(phase.labelKey)}
          <span className="mx-1.5 text-text/25">·</span>
          {item.type}
        </p>

        <h3 className="font-display font-bold text-sm text-text leading-snug mb-2">
          {item.title}
        </h3>

        <p className="text-xs text-text/60 leading-relaxed flex-1">
          {item.annotation}
        </p>

        {/* Insight — progressive disclosure */}
        {item.insight && (
          <div className="mt-4 pt-3 border-t border-border">
            <button
              onClick={() => setExpanded((p) => !p)}
              aria-expanded={expanded}
              className="flex items-center justify-between w-full group/btn"
            >
              <span className="text-2xs font-extrabold uppercase tracking-[0.18em]
                               text-primary-600">
                {expanded ? t("project.process.hideInsight") : t("project.process.keyInsight")}
              </span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-text/30 group-hover/btn:text-text/60 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor"
                  strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.span>
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <p className="text-[11px] leading-relaxed text-text/70
                                border-l-2 border-primary/40 pl-3 mt-3">
                    {item.insight}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Process gallery — horizontal snap rail
function ProcessGallerySection({ items, number, isOpen, onToggle }) {
  const { t } = useTranslation();
  if (!items || items.length === 0) return null;

  return (
    <section id="process" className="pt-10 mb-14 md:pt-16 md:mb-20 border-t border-border scroll-mt-32">
      <CollapsibleSectionHead
        id="process" number={number} kicker={t("project.process.kicker")} heading={t("project.process.heading")}
        isOpen={isOpen} onToggle={onToggle}
      />

      <div
        id="process-body"
        data-collapsible-body
        aria-hidden={!isOpen}
        {...(!isOpen ? { inert: "" } : {})}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 350ms ease",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
                       -mx-4 px-4 md:-mx-0 md:px-0
                       [scrollbar-width:thin] [scrollbar-color:theme(colors.border)_transparent]"
            role="list"
            aria-label={t("project.process.ariaLabel")}
          >
            {items.map((item, i) => (
              <ProcessCard key={`${item.phase}-${i}`} item={item} index={i} />
            ))}
          </div>

          <p className="text-2xs font-semibold uppercase tracking-widest text-text/30 mt-1 md:hidden">
            {t("project.process.swipe")}
          </p>
        </div>
      </div>
    </section>
  );
}

// Sidebar nav — numbers and labels
function SidebarNav({ sections, activeId, onNavigate, allOpen, onToggleAll }) {
  const { t } = useTranslation();
  return (
    <nav aria-label="Page sections">
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
                className={`w-full text-left flex items-baseline gap-3 px-3 py-2
                  transition-colors duration-200 relative border-l-2
                  ${isActive
                    ? "border-primary text-primary-600"
                    : "border-transparent text-dim hover:text-text/80"}`}
              >
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
function MobilePillBar({ sections, activeId, onNavigate }) {
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

// Metrics strip — ink numerals, matching StackedProjectCard
function MetricsStrip({ metrics }) {
  const { t } = useTranslation();
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="mt-8 border-t border-b border-border py-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-5">
        {t("project.results.glance")}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6">
        {metrics.map((m, i) => (
          <div key={i}>
            <p className="font-display font-extrabold text-2xl md:text-3xl text-text leading-none">
              {m.value}
            </p>
            <p className="text-2xs uppercase tracking-wider text-text/50 font-semibold mt-2 leading-snug">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Quiet meta field (header)
function MetaField({ label, children }) {
  return (
    <div>
      <span className="block font-mono text-2xs uppercase tracking-wider text-text/45 mb-1.5">
        {label}
      </span>
      {children}
    </div>
  );
}

// Research phase status. Shows unfinished phases as unfinished rather than
// omitting them, since a method that's only visible once it has produced a
// polished result isn't a method. Status is always carried by a text
// label, never by color alone (WCAG 1.4.1): completed work sits in quiet
// ink, live work in the signature primary, so the eye lands on what's
// moving. `highlight` (gold) is intentionally unused here — per the token
// comments it is a highlighter wash, not a small-text color.
const PHASE_STATUS = {
  complete: {
    labelKey: "project.status.complete",
    dot: "bg-text",
    text: "text-text",
  },
  "in-progress": {
    labelKey: "project.status.inProgress",
    dot: "bg-primary-600",
    text: "text-primary-600",
  },
  planned: {
    labelKey: "project.status.planned",
    dot: "bg-transparent border border-dim",
    text: "text-dim",
  },
  blocked: {
    labelKey: "project.status.blocked",
    dot: "bg-danger",
    text: "text-danger",
  },
};

function ResearchPhases({ phases, intro, number, isOpen, onToggle }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <ContentSection
      id="phases"
      number={number}
      kicker={t("project.phases.kicker")}
      heading={t("project.phases.heading")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      {intro && (
        <p className="text-base md:text-lg text-text/90 leading-[1.7] mb-8">
          {intro}
        </p>
      )}

      <ol className="list-none p-0 m-0">
        {phases.map((p, i) => {
          const s = PHASE_STATUS[p.status] ?? PHASE_STATUS.planned;
          return (
            <motion.li
              key={p.phase}
              className="border-t border-border py-4 first:border-t-0 first:pt-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.04 }}
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-2 h-2 rounded-full translate-y-[-1px] ${s.dot}`}
                />
                <span className="text-sm md:text-base font-semibold text-text">
                  {p.phase}
                </span>
                <span
                  className={`text-2xs font-black uppercase tracking-[0.2em] ${s.text}`}
                >
                  {t(s.labelKey)}
                </span>
              </div>
              {p.note && (
                <p className="mt-1.5 ml-5 text-sm text-text/60 leading-relaxed">
                  {p.note}
                </p>
              )}
            </motion.li>
          );
        })}
      </ol>
    </ContentSection>
  );
}

// Main template
export default function ProjectTemplate({ meta: rawMeta, children }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  // Resolve any { en, de } bilingual fields in the project data (title,
  // challenge/solution/methodology/…, process[], figures{}, metrics[]…)
  // recursively, once, here — so every caller (real pages and tests alike)
  // can just pass the raw src/projects/*/data.js export straight through.
  const meta = useLocalizedProfile(rawMeta);

  // Only include sidebar items for sections that have data.
  // Arrays are length-checked so an empty `process`/`phases` can't create a
  // sidebar link pointing at a section that never renders.
  // Memoized so the IntersectionObserver effect and the openSections helpers
  // below aren't recomputing/re-diffing a fresh array identity every render.
  const activeSections = useMemo(
    () =>
      SECTIONS.filter((s) => {
        const value = meta[s.dataKey];
        const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
        // Prototype is the one section that might be nothing but a link or a
        // couple of screenshots — no paragraph required — so it also counts
        // as active on those alone.
        if (s.id === "prototype") {
          return hasValue || !!meta.prototypeUrl || (meta.figures?.prototype?.length > 0);
        }
        return hasValue;
      }),
    [meta]
  );

  const [activeId, setActiveId] = useState(() => activeSections[0]?.id ?? null);

  // Every section starts open — the evidence a recruiter needs shouldn't be
  // gated behind a click. A Set rather than one id, since more than one
  // section can be closed independently (this is an accordion of
  // independent panels, not a single-select tab strip).
  const [openSections, setOpenSections] = useState(
    () => new Set(activeSections.map((s) => s.id))
  );

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Sidebar / mobile-pill navigation: opening a closed section and scrolling
  // to it in one action. Scrolling first would target the same position
  // either way — a section's own height doesn't depend on whether ITS body
  // is open, only on sections above it — but opening first keeps the two
  // conceptually in the right order (reveal, then move to it).
  const navigateToSection = (id) => {
    setOpenSections((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    const el = document.getElementById(id);
    el?.scrollIntoView?.({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const allOpen =
    activeSections.length > 0 && activeSections.every((s) => openSections.has(s.id));

  const toggleAllSections = () => {
    setOpenSections(allOpen ? new Set() : new Set(activeSections.map((s) => s.id)));
  };

  // Section numbers must match the sidebar — compute once
  const sectionNumber = (id) =>
    String(activeSections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  useEffect(() => {
    if (activeSections.length === 0) return;

    const observers = [];
    activeSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(section.id); },
        { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [activeSections]);

  const methods = meta.methods || [];
  const tags = meta.tags || [];

  return (
    <main className="min-h-screen bg-bg pt-32 pb-16">
      {/* Banner — project thumbnail, full-bleed, above everything else */}
      {meta.thumbnail && (
        <motion.div
          className="photo-frame w-full overflow-hidden bg-muted mb-12 md:mb-16"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={meta.thumbnail}
            alt={meta.title}
            className="w-full h-auto block"
          />
        </motion.div>
      )}

      <div className="w-full px-4 md:px-8">

        <div className="flex gap-12 md:gap-16 lg:gap-20 items-start">
          <aside className="hidden md:block w-[180px] lg:w-[220px] shrink-0 no-print sticky top-36 self-start">
            <SidebarNav sections={activeSections} activeId={activeId}
              onNavigate={navigateToSection} allOpen={allOpen} onToggleAll={toggleAllSections} />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <motion.header
              className="mb-12"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Live-stage chip — optional. Signals an in-flight case study
                  above the fold, so a recruiter isn't reading a partial page
                  wondering why sections are missing. */}
              {meta.stage && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 border border-border px-2.5 py-1">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-primary-600"
                    />
                    <span className="text-2xs font-black uppercase tracking-[0.2em] text-primary-600">
                      {meta.stage}
                    </span>
                  </span>
                </div>
              )}

              {/* Tags — quiet eyebrow, not chips */}
              {tags.length > 0 && (
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-4">
                  {tags.slice(0, 4).join("  ·  ")}
                </p>
              )}

              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text
                             tracking-tighter leading-tight mb-5">
                {meta.title}
              </h1>

              {meta.tagline && (
                <p className="text-lg md:text-xl text-text/60 font-medium leading-relaxed mb-8 max-w-3xl">
                  {meta.tagline}
                </p>
              )}

              {/* Meta block — Role, Timeline, Methods, all quiet ink */}
              <div className="border-t border-b border-border py-5 space-y-5">
                <div className="flex flex-wrap gap-x-14 gap-y-4">
                  {meta.role && (
                    <MetaField label={t("project.meta.role")}>
                      <span className="text-sm font-semibold text-text">{meta.role}</span>
                    </MetaField>
                  )}
                  {meta.timeline && (
                    <MetaField label={t("project.meta.timeline")}>
                      <span className="font-mono text-xs text-text/70">{meta.timeline}</span>
                    </MetaField>
                  )}
                </div>

                {methods.length > 0 && (
                  <MetaField label={t("project.meta.methods")}>
                    <p className="text-sm tracking-wide leading-relaxed">
                      {methods.map((m, i, arr) => (
                        <span key={m}>
                          <span className="font-medium text-text/60">{m}</span>
                          {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                        </span>
                      ))}
                    </p>
                  </MetaField>
                )}
              </div>
            </motion.header>

            {/* Mobile pill bar */}
            <MobilePillBar sections={activeSections} activeId={activeId} onNavigate={navigateToSection} />

            <article className="min-w-0">

            {/* Process gallery — replaces hero image when present */}
            {meta.process && meta.process.length > 0 ? (
              <ProcessGallerySection items={meta.process} number={sectionNumber("process")}
                isOpen={openSections.has("process")} onToggle={() => toggleSection("process")} />
            ) : meta.heroImage && (
              <motion.div
                className="photo-frame text-text w-full aspect-video bg-muted mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <img src={meta.heroImage} alt={meta.title}
                  className="w-full h-full object-cover contrast-110" />
              </motion.div>
            )}

            {meta.challenge && (
              <ContentSection id="challenge" number={sectionNumber("challenge")}
                isOpen={openSections.has("challenge")} onToggle={() => toggleSection("challenge")}
                kicker={t("project.challenge.kicker")} heading={t("project.challenge.heading")}>
                <p className="text-base md:text-lg text-text/90 leading-[1.7]">
                  {meta.challenge}
                </p>
                <SectionMedia items={meta.figures?.challenge} />
              </ContentSection>
            )}

            {meta.solution && (
              <ContentSection id="solution" number={sectionNumber("solution")}
                isOpen={openSections.has("solution")} onToggle={() => toggleSection("solution")}
                kicker={t("project.solution.kicker")} heading={t("project.solution.heading")}>
                <p className="text-base md:text-lg text-text/90 leading-[1.7]">
                  {meta.solution}
                </p>
                <SectionMedia items={meta.figures?.solution} />

              </ContentSection>
            )}

            {(meta.prototype || meta.prototypeUrl || (meta.figures?.prototype?.length > 0)) && (
              <ContentSection id="prototype" number={sectionNumber("prototype")}
                isOpen={openSections.has("prototype")} onToggle={() => toggleSection("prototype")}
                kicker={t("project.prototype.kicker")} heading={t("project.prototype.heading")}>
                {meta.prototype && (
                  <p className="text-base md:text-lg text-text/90 leading-[1.7]">
                    {meta.prototype}
                  </p>
                )}

                {meta.prototypeUrl && (
                  <a
                    href={meta.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2.5
                               text-2xs font-black uppercase tracking-[0.2em] text-text
                               hover:border-primary-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {meta.prototypeUrlLabel || t("project.prototype.openLink")}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </a>
                )}

                <SectionMedia items={meta.figures?.prototype} />
              </ContentSection>
            )}

            {meta.methodology && (
              <ContentSection id="methodology" number={sectionNumber("methodology")}
                isOpen={openSections.has("methodology")} onToggle={() => toggleSection("methodology")}
                kicker={t("project.methodology.kicker")} heading={t("project.methodology.heading")}>
                <p className="text-base md:text-lg text-text/90 leading-[1.7] mb-6">
                  {meta.methodology}
                </p>
                <SectionMedia items={meta.figures?.methodology} />
                {meta.techStack && meta.techStack.length > 0 && (
                  <div className="border-l-2 border-border pl-5">
                    <span className="block font-mono text-2xs uppercase tracking-wider text-text/45 mb-2">
                      {t("project.methodology.techStack")}
                    </span>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                      {meta.techStack.map((tech) => (
                        <span key={tech} className="text-xs font-semibold text-text/60">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </ContentSection>
            )}

            {meta.results && (
              <ContentSection id="results" number={sectionNumber("results")}
                isOpen={openSections.has("results")} onToggle={() => toggleSection("results")}
                kicker={t("project.results.kicker")} heading={t("project.results.heading")}>
                <p className="text-base md:text-lg text-text/90 leading-[1.7]">
                  {meta.results}
                </p>
                    <SectionMedia items={meta.figures?.results} />

                <MetricsStrip metrics={meta.metrics} />
              </ContentSection>
            )}

            {meta.implications && (
              <ContentSection id="implications" number={sectionNumber("implications")}
                isOpen={openSections.has("implications")} onToggle={() => toggleSection("implications")}
                kicker={t("project.implications.kicker")} heading={t("project.implications.heading")}>
                <p className="text-base md:text-lg text-text/90 leading-[1.7]">
                  {meta.implications}
                </p>
              </ContentSection>
            )}

            {meta.phases && meta.phases.length > 0 && (
              <ResearchPhases
                phases={meta.phases}
                intro={meta.phasesIntro}
                number={sectionNumber("phases")}
                isOpen={openSections.has("phases")}
                onToggle={() => toggleSection("phases")}
              />
            )}

            {meta.conclusion && (
              <ContentSection id="conclusion" number={sectionNumber("conclusion")}
                isOpen={openSections.has("conclusion")} onToggle={() => toggleSection("conclusion")}
                kicker={t("project.conclusion.kicker")} heading={t("project.conclusion.heading")}>
                <SectionMedia items={meta.conclusion} />
              </ContentSection>
            )}

            {/* Escape hatch for per-project custom content */}
            {children}

            {/* Footer back link */}
            <div className="pt-10 border-t border-border">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-2xs font-black uppercase
                           tracking-[0.2em] text-text/45 hover:text-primary-600
                           transition-colors duration-200 group"
              >
                <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform"
                  fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t("project.footer.back")}
              </Link>
            </div>

            </article>
          </div>
        </div>
      </div>
    </main>
  );
}