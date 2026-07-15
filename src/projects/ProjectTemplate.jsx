// src/projects/ProjectTemplate.jsx
// ─────────────────────────────────────────────────────────────────────────────
// QUIET EDITION — the detail page finally speaks the same language as
// Home v4 / About / StackedProjectCard. What changed and why:
//
//   1. ONE HEADING SYSTEM, IN INK: font-hand script headings are gone.
//      Every section = border-t divider → numbered kicker (primary-600)
//      → font-display heading in ink. Same rhythm as Home's sections.
//      The script font stays available for ONE annotation moment if you
//      ever want it — but it no longer titles six sections.
//
//   2. MONOCHROME PROCESS RAIL: the 4-color phase legend (sky/amber/
//      coral/emerald) is deleted. Phases are now numbered micro-labels in
//      ink on each card. Four rainbow chips proved nothing; the card
//      content does.
//
//   3. ONE CHIP ROW → ZERO: header tags become a quiet eyebrow line
//      (mid-dot separated, uppercase micro-type). Methods render as the
//      same quiet ink list used on StackedProjectCard — proof, not
//      decoration. No more coral chip wall.
//
//   4. METRICS IN INK: "Study at a Glance" numerals are font-display ink,
//      matching the card's stat fix. The kicker stays the only coral.
//
//   5. LESS CHROME: sidebar progress bar (Start/End) removed — the
//      numbered active state already communicates position. Sticky
//      surfaces reduced = fewer print/screenshot edge cases.
//
// Contract unchanged: default export ProjectTemplate({ meta, children }).
// All data flows from src/projects/*/data.js — nothing hardcoded.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionMedia from "./SectionMedia";

// ─── Phase config — monochrome, numbered ─────────────────────────────────────
const PHASE_META = {
  discover: { label: "Discover", number: "01" },
  define:   { label: "Define",   number: "02" },
  design:   { label: "Design",   number: "03" },
  deliver:  { label: "Deliver",  number: "04" },
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

// ─── Section head — THE one heading pattern, used by every section ──────────
function SectionHead({ number, kicker, heading }) {
  return (
    <>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-3">
        {number} — {kicker}
      </p>
      <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight
                     text-text leading-tight mb-8">
        {heading}
      </h2>
    </>
  );
}

// ─── Content section wrapper — divider → head → body ────────────────────────
function ContentSection({ id, number, kicker, heading, children }) {
  return (
    <motion.section
      id={id}
      className="pt-12 mb-12 border-t border-border scroll-mt-32"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <SectionHead number={number} kicker={kicker} heading={heading} />
      {children}
    </motion.section>
  );
}

// ─── Process card — monochrome ───────────────────────────────────────────────
function ProcessCard({ item, index }) {
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
          {phase.number} {phase.label}
          <span className="mx-1.5 text-text/25">·</span>
          {item.type}
        </p>

        <h3 className="font-display font-bold text-sm text-text leading-snug mb-2">
          {item.title}
        </h3>

        <p className="text-xs text-text/60 leading-relaxed flex-1">
          {item.annotation}
        </p>

        {/* Insight — progressive disclosure, kept */}
        {item.insight && (
          <div className="mt-4 pt-3 border-t border-border">
            <button
              onClick={() => setExpanded((p) => !p)}
              aria-expanded={expanded}
              className="flex items-center justify-between w-full group/btn"
            >
              <span className="text-2xs font-extrabold uppercase tracking-[0.18em]
                               text-primary-600">
                {expanded ? "Hide insight" : "Key insight"}
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

// ─── Process gallery — horizontal snap rail, legend removed ──────────────────
function ProcessGallerySection({ items, number }) {
  if (!items || items.length === 0) return null;

  return (
    <section id="process" className="pt-12 mb-12 border-t border-border scroll-mt-32">
      <SectionHead number={number} kicker="Behind the Work" heading="Research Process" />

      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
                   -mx-4 px-4 md:-mx-0 md:px-0
                   [scrollbar-width:thin] [scrollbar-color:theme(colors.border)_transparent]"
        role="list"
        aria-label="Research process steps"
      >
        {items.map((item, i) => (
          <ProcessCard key={`${item.phase}-${i}`} item={item} index={i} />
        ))}
      </div>

      <p className="text-2xs font-semibold uppercase tracking-widest text-text/30 mt-1 md:hidden">
        Swipe to explore →
      </p>
    </section>
  );
}

// ─── Sidebar nav — numbers + labels, progress bar removed ────────────────────
function SidebarNav({ sections, activeId }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Page sections">
      <Link
        to="/projects"
        className="flex items-center gap-2 text-2xs font-black uppercase tracking-[0.2em]
                   text-text/40 hover:text-primary-600 transition-colors duration-200 mb-8 group"
      >
        <svg className="w-3 h-3 transform group-hover:-translate-x-0.5 transition-transform"
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        All Projects
      </Link>

      <ul className="space-y-0.5">
        {sections.map((section, i) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left flex items-baseline gap-3 px-3 py-2
                  transition-colors duration-200 relative border-l-2
                  ${isActive
                    ? "border-primary text-primary-600"
                    : "border-transparent text-text/40 hover:text-text/80"}`}
              >
                <span className="font-mono text-2xs font-bold tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── Mobile pill bar ──────────────────────────────────────────────────────────
function MobilePillBar({ sections, activeId }) {
  return (
    <div className="sticky top-[80px] z-40 bg-bg/90 backdrop-blur-md border-b border-border
                    -mx-4 px-4 py-2 md:hidden no-print">
      <div className="flex gap-1 overflow-x-auto">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={`shrink-0 px-3 py-1.5 text-2xs font-black uppercase tracking-widest
                transition-colors duration-200
                ${isActive
                  ? "bg-primary text-white"
                  : "text-text/40 hover:text-text border border-border"
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

// ─── Metrics strip — ink numerals, same fix as StackedProjectCard ────────────
function MetricsStrip({ metrics }) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="mt-8 border-t border-b border-border py-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text/40 mb-5">
        Study at a Glance
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

// ─── Quiet meta field (header) ───────────────────────────────────────────────
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

// ─── Main template ────────────────────────────────────────────────────────────
export default function ProjectTemplate({ meta, children }) {
  const prefersReducedMotion = useReducedMotion();

  // Only include sidebar items for sections that have data
  const activeSections = SECTIONS.filter((s) => {
    if (s.dataKey === "process") return meta.process && meta.process.length > 0;
    return !!meta[s.dataKey];
  });

  const [activeId, setActiveId] = useState(() => activeSections[0]?.id ?? null);

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
  }, [meta]); // eslint-disable-line react-hooks/exhaustive-deps

  const methods = meta.methods || [];
  const tags = meta.tags || [];

  return (
    <main className="min-h-screen bg-bg pt-32 pb-16">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <motion.header
          className="mb-12 max-w-4xl"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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

          {/* ONE meta block — Role · Timeline · Methods, all quiet ink */}
          <div className="border-t border-b border-border py-5 space-y-5">
            <div className="flex flex-wrap gap-x-14 gap-y-4">
              {meta.role && (
                <MetaField label="Role">
                  <span className="text-sm font-semibold text-text">{meta.role}</span>
                </MetaField>
              )}
              {meta.timeline && (
                <MetaField label="Timeline">
                  <span className="font-mono text-xs text-text/70">{meta.timeline}</span>
                </MetaField>
              )}
            </div>

            {methods.length > 0 && (
              <MetaField label="Research Methods">
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

        {/* ── Mobile pill bar ── */}
        <MobilePillBar sections={activeSections} activeId={activeId} />

        {/* ── Body: sidebar + content ── */}
        <div className="flex gap-12 md:gap-16 lg:gap-20 mt-8">

          <aside className="hidden md:block w-[180px] lg:w-[200px] shrink-0 no-print">
            <div className="sticky top-36">
              <SidebarNav sections={activeSections} activeId={activeId} />
            </div>
          </aside>

          <article className="flex-1 min-w-0">

            {/* Process gallery — replaces hero image when present */}
            {meta.process && meta.process.length > 0 ? (
              <ProcessGallerySection items={meta.process} number={sectionNumber("process")} />
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
                kicker="The Problem Space" heading="The Challenge">
                <p className="text-base md:text-lg text-text/80 leading-relaxed max-w-prose">
                  {meta.challenge}
                </p>
              </ContentSection>
            )}

            {meta.solution && (
              <ContentSection id="solution" number={sectionNumber("solution")}
                kicker="What I Built" heading="The Solution">
                <p className="text-base md:text-lg text-text/80 leading-relaxed max-w-prose">
                  {meta.solution}
                </p>
                <SectionMedia items={meta.figures?.solution} />

              </ContentSection>
            )}

            {meta.methodology && (
              <ContentSection id="methodology" number={sectionNumber("methodology")}
                kicker="How I Studied It" heading="Methodology & Approach">
                <p className="text-base md:text-lg text-text/80 leading-relaxed max-w-prose mb-6">
                  {meta.methodology}
                </p>
                <SectionMedia items={meta.figures?.methodology} />
                {meta.techStack && meta.techStack.length > 0 && (
                  <div className="border-l-2 border-border pl-5">
                    <span className="block font-mono text-2xs uppercase tracking-wider text-text/45 mb-2">
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
                <p className="text-base md:text-lg text-text/80 leading-relaxed max-w-prose">
                  {meta.results}
                </p>
                    <SectionMedia items={meta.figures?.results} />

                <MetricsStrip metrics={meta.metrics} />
              </ContentSection>
            )}

            {meta.implications && (
              <ContentSection id="implications" number={sectionNumber("implications")}
                kicker="So What" heading="Design Implications">
                <p className="text-base md:text-lg text-text/80 leading-relaxed max-w-prose">
                  {meta.implications}
                </p>
              </ContentSection>
            )}

            {/* Escape hatch for per-project custom content */}
            {children}

            {/* ── Footer back link ── */}
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
                Back to All Projects
              </Link>
            </div>

          </article>
        </div>
      </div>
    </main>
  );
}