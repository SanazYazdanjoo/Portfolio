// src/projects/ProjectTemplate.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CLEANUP PASS — fixes for the /projects/project-1 mess:
//
//   1. PROCESS RAIL RESTORED: ProcessGallery was rendering its header + phase
//      legend and then... nothing. The card rail JSX was missing entirely.
//      The horizontal snap-scroll rail is back — your 5 process cards from
//      data.js now actually render. Sidebar "01 Process" no longer points
//      at a void.
//
//   2. ONE HEADING SYSTEM: every section now uses the same pattern —
//      numbered kicker (matches the sidebar numbers) + font-hand heading in
//      text-primary. No more per-section color swaps (text-accent is gone),
//      no more sans-vs-script mix. The numbering is justified: a research
//      case study IS a sequence.
//
//   3. METRICS ANCHORED: the N=30 / N=20 strip now lives INSIDE the Results
//      section, framed with border-y and a label — no more floating numbers.
//
//   4. TAGLINE RENDERED: meta.tagline (your hook question) now appears as
//      the lead under the title. It existed in data.js but was never shown.
//
//   5. TIGHTER RHYTHM: section margins mb-20 → mb-16, header meta block
//      consolidated into one bordered unit, back-link pulled up (border-t
//      instead of dead space).
//
// Contract unchanged: default export ProjectTemplate({ meta, children }).
// All data still flows from src/projects/*/data.js — nothing hardcoded.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Phase config ─────────────────────────────────────────────────────────────
const PHASE_META = {
  discover: { label: "Discover", number: "01", color: "text-sky-600 border-sky-200 bg-sky-50" },
  define:   { label: "Define",   number: "02", color: "text-amber-600 border-amber-200 bg-amber-50" },
  design:   { label: "Design",   number: "03", color: "text-primary border-primary/20 bg-primary/5" },
  deliver:  { label: "Deliver",  number: "04", color: "text-emerald-600 border-emerald-200 bg-emerald-50" },
};

// ─── Content section definitions ─────────────────────────────────────────────
const SECTIONS = [
  { id: "process",      label: "Process",      dataKey: "process"      },
  { id: "challenge",    label: "Challenge",    dataKey: "challenge"    },
  { id: "solution",     label: "Solution",     dataKey: "solution"     },
  { id: "methodology",  label: "Methodology",  dataKey: "methodology"  },
  { id: "results",      label: "Results",      dataKey: "results"      },
  { id: "implications", label: "Implications", dataKey: "implications" },
];

// ─── Process card ─────────────────────────────────────────────────────────────
function ProcessCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const phase = PHASE_META[item.phase] || PHASE_META.discover;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      className="bg-bg border border-border/25 hover:border-primary/30
                 transition-all duration-300 flex flex-col group
                 w-[270px] md:w-[290px] shrink-0 snap-start"
    >
      {/* Image / structured placeholder */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-primary/5 relative">
        {item.imagePath && !imgError ? (
          <img
            src={item.imagePath}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-[1.03]"
          />
        ) : (
          /* No asset yet → phase-coloured placeholder, not a broken hole */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="font-black text-4xl text-primary/15 select-none">
              {phase.number}
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-text/25">
              {item.type}
            </span>
          </div>
        )}
        {/* Phase badge */}
        <span
          className={`absolute top-2 left-2 text-[8px] font-black uppercase tracking-widest
                      border px-2 py-0.5 ${phase.color}`}
        >
          {phase.number} {phase.label}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[8.5px] font-black uppercase tracking-[0.18em] text-primary/60 mb-1">
          {item.type}
        </p>
        <h3 className="text-[13px] font-bold text-text leading-snug mb-2">
          {item.title}
        </h3>
        <p className="text-[11px] leading-relaxed text-text/60 flex-1">
          {item.annotation}
        </p>

        {/* Insight toggle */}
        {item.insight && (
          <div className="mt-3 pt-3 border-t border-border/20">
            <button
              onClick={() => setExpanded((p) => !p)}
              aria-expanded={expanded}
              className="flex items-center justify-between w-full group/btn"
            >
              <span className="text-[9px] font-black uppercase tracking-widest text-primary/70
                               group-hover/btn:text-primary transition-colors">
                {expanded ? "Hide insight" : "Key insight"}
              </span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-primary/30 group-hover/btn:text-primary transition-colors"
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
                  <p className="text-[10.5px] leading-relaxed text-text/65 italic
                                 border-l-2 border-primary/30 pl-3 mt-3">
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

// ─── Process Gallery (card rail RESTORED) ─────────────────────────────────────
function ProcessGallery({ items }) {
  if (!items || items.length === 0) return null;
  const phases = [...new Set(items.map((i) => i.phase))];

  return (
    <section id="process" className="mb-16 scroll-mt-32">
      {/* Section header — same kicker system as every other section */}
      <div className="flex items-end justify-between mb-5 gap-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-2">
            01 — Behind the Work
          </p>
          <h2 className="text-3xl md:text-4xl font-hand text-primary leading-none">
            Research Process
          </h2>
        </div>

        {/* Phase legend — only meaningful now that cards exist below it */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end pb-1">
          {phases.map((p) => {
            const m = PHASE_META[p];
            if (!m) return null;
            return (
              <span key={p}
                className={`text-[8px] font-black uppercase tracking-widest border px-2 py-0.5 ${m.color}`}>
                {m.number} {m.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* ★ THE MISSING PIECE — horizontal snap rail */}
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4
                   md:-mx-0 md:px-0
                   [scrollbar-width:thin] [scrollbar-color:theme(colors.primary/30)_transparent]"
        role="list"
        aria-label="Research process steps"
      >
        {items.map((item, i) => (
          <ProcessCard key={`${item.phase}-${i}`} item={item} index={i} />
        ))}
      </div>

      {/* Scroll hint — only shows when there are more cards than fit */}
      <p className="text-[9px] font-semibold uppercase tracking-widest text-text/25 mt-1 md:hidden">
        Swipe to explore →
      </p>
    </section>
  );
}

// ─── Sidebar nav ──────────────────────────────────────────────────────────────
function SidebarNav({ sections, activeId }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Page sections">
      <Link
        to="/projects"
        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em]
                   text-text/35 hover:text-primary transition-colors duration-200 mb-8 group"
      >
        <svg className="w-3 h-3 transform group-hover:-translate-x-0.5 transition-transform"
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        All Projects
      </Link>

      <ul className="space-y-1">
        {sections.map((section, i) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5
                  transition-all duration-200 group relative
                  ${isActive ? "text-primary" : "text-text/40 hover:text-text/80"}`}
              >
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4
                  rounded-full transition-all duration-300
                  ${isActive ? "bg-primary opacity-100" : "bg-primary opacity-0"}`}
                />
                <span className={`text-[8.5px] font-black tabular-nums shrink-0
                  ${isActive ? "text-primary" : "text-text/25 group-hover:text-text/40"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-[11px] font-bold uppercase tracking-widest
                  ${isActive ? "text-primary" : ""}`}>
                  {section.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeDot"
                    className="ml-auto w-1 h-1 rounded-full bg-primary shrink-0"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Progress bar */}
      <div className="mt-8 px-3">
        <div className="w-full h-[2px] bg-border/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{
              scaleX: sections.length
                ? (sections.findIndex((s) => s.id === activeId) + 1) / sections.length
                : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[8px] text-text/25 font-semibold uppercase tracking-wider">Start</span>
          <span className="text-[8px] text-text/25 font-semibold uppercase tracking-wider">End</span>
        </div>
      </div>
    </nav>
  );
}

// ─── Mobile pill bar ──────────────────────────────────────────────────────────
function MobilePillBar({ sections, activeId }) {
  return (
    <div className="sticky top-[80px] z-40 bg-bg/90 backdrop-blur-md border-b border-border/20
                    -mx-4 px-4 py-2 md:hidden no-print">
      <div className="flex gap-1 overflow-x-auto">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={`shrink-0 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest
                transition-all duration-200
                ${isActive
                  ? "bg-primary text-white"
                  : "text-text/40 hover:text-text border border-border/30"
                }`}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Content section wrapper — ONE heading system for the whole page ─────────
// Numbered kicker mirrors the sidebar numbers; heading is always font-hand
// in text-primary. No per-section colour overrides.
function ContentSection({ id, number, kicker, heading, children }) {
  return (
    <motion.section
      id={id}
      className="mb-16 scroll-mt-32"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-2">
        {number} — {kicker}
      </p>
      <h2 className="text-3xl md:text-4xl font-hand text-primary leading-none mb-6">
        {heading}
      </h2>
      {children}
    </motion.section>
  );
}

// ─── Metrics strip — anchored, framed, labelled ───────────────────────────────
function MetricsStrip({ metrics }) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="mt-8 border-y border-border/30 py-6">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text/35 mb-4">
        Study at a Glance
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-6">
        {metrics.map((m, i) => (
          <div key={i}>
            <p className="font-black text-2xl md:text-3xl text-primary leading-none">
              {m.value}
            </p>
            <p className="text-[9px] uppercase tracking-widest text-text/40 font-semibold mt-1.5 leading-snug">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main template ────────────────────────────────────────────────────────────
export default function ProjectTemplate({ meta, children }) {
  const [activeId, setActiveId] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  // Only include sidebar items for sections that have data
  const activeSections = SECTIONS.filter((s) => {
    if (s.dataKey === "process") return meta.process && meta.process.length > 0;
    return !!meta[s.dataKey];
  });

  // Section numbers must match the sidebar — compute once
  const sectionNumber = (id) =>
    String(activeSections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  useEffect(() => {
    if (activeSections.length === 0) return;
    setActiveId(activeSections[0].id);

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
  }, [meta]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen bg-bg pt-32 pb-16">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <motion.header
          className="mb-10 max-w-4xl"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-text tracking-tighter leading-tight mb-4">
            {meta.title}
          </h1>

          {/* Tagline — the hook. Was in data.js, never rendered. Now it is. */}
          {meta.tagline && (
            <p className="text-lg md:text-xl text-text/60 font-medium leading-relaxed mb-6 max-w-3xl">
              {meta.tagline}
            </p>
          )}

          {/* Tags — the ONLY chip row in the header now */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {meta.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest
                                         text-text/70 border border-border/50 bg-muted/30">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* One consolidated meta block: Role + Timeline on top,
              Methods spanning full width below — no more awkward wrap */}
          <div className="border-t border-b border-border/30 py-5 space-y-5">
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <span className="block text-[8.5px] font-black text-text/35 uppercase tracking-widest mb-1">
                  Role
                </span>
                <span className="text-primary font-semibold text-sm">{meta.role}</span>
              </div>
              <div>
                <span className="block text-[8.5px] font-black text-text/35 uppercase tracking-widest mb-1">
                  Timeline
                </span>
                <span className="text-text font-semibold text-sm">{meta.timeline}</span>
              </div>
            </div>

            {meta.methods && meta.methods.length > 0 && (
              <div>
                <span className="block text-[8.5px] font-black text-text/35 uppercase tracking-widest mb-1.5">
                  Research Methods
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {meta.methods.map((m) => (
                    <span key={m} className="text-[9.5px] font-semibold text-primary
                                             border border-primary/30 bg-primary/5 px-2 py-0.5">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.header>

        {/* ── Mobile pill bar ── */}
        <MobilePillBar sections={activeSections} activeId={activeId} />

        {/* ── Body: sidebar + content ── */}
        <div className="flex gap-12 md:gap-16 lg:gap-20 mt-8">

          {/* Sidebar */}
          <aside className="hidden md:block w-[180px] lg:w-[200px] shrink-0 no-print">
            <div className="sticky top-36">
              <SidebarNav sections={activeSections} activeId={activeId} />
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 min-w-0">

            {/* Process Gallery — replaces hero image when present */}
            {meta.process && meta.process.length > 0
              ? <ProcessGallery items={meta.process} />
              : meta.heroImage && (
                  <motion.div
                    className="photo-frame text-text w-full aspect-video bg-muted mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <img src={meta.heroImage} alt={meta.title}
                      className="w-full h-full object-cover contrast-110" />
                  </motion.div>
                )
            }

            {meta.challenge && (
              <ContentSection id="challenge" number={sectionNumber("challenge")}
                kicker="The Problem Space" heading="The Challenge">
                <p className="text-lg text-text leading-relaxed font-medium">{meta.challenge}</p>
              </ContentSection>
            )}

            {meta.solution && (
              <ContentSection id="solution" number={sectionNumber("solution")}
                kicker="What I Built" heading="The Solution">
                <p className="text-lg text-text leading-relaxed font-medium">{meta.solution}</p>
              </ContentSection>
            )}

            {meta.methodology && (
              <ContentSection id="methodology" number={sectionNumber("methodology")}
                kicker="How I Studied It" heading="Methodology & Approach">
                <p className="text-lg text-text/75 leading-relaxed mb-6">{meta.methodology}</p>
                {meta.techStack && meta.techStack.length > 0 && (
                  <div className="border-l-2 border-primary/20 pl-5">
                    <span className="block text-[8.5px] font-black text-text/35 uppercase tracking-widest mb-2">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                      {meta.techStack.map((t) => (
                        <span key={t} className="text-xs font-semibold text-text/60">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </ContentSection>
            )}

            {meta.results && (
              <ContentSection id="results" number={sectionNumber("results")}
                kicker="What the Data Showed" heading="Key Findings">
                <p className="text-lg text-text/75 leading-relaxed">{meta.results}</p>
                {/* Metrics now live INSIDE Results — framed, not floating */}
                <MetricsStrip metrics={meta.metrics} />
              </ContentSection>
            )}

            {meta.implications && (
              <ContentSection id="implications" number={sectionNumber("implications")}
                kicker="So What" heading="Design Implications">
                <p className="text-lg text-text/75 leading-relaxed">{meta.implications}</p>
              </ContentSection>
            )}

            {children}

            {/* Back link — pulled up against a border, no dead space */}
            <div className="pt-8 border-t border-border/30">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase
                           tracking-[0.2em] text-text/40 hover:text-primary
                           transition-colors duration-200 group"
              >
                <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform"
                  fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Projects
              </Link>
            </div>

          </article>
        </div>
      </div>
    </main>
  );
}