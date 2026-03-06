// src/projects/ProjectTemplate.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── Phase config ─────────────────────────────────────────────────────────────
const PHASE_META = {
  discover:  { label: "Discover",  number: "01", color: "text-sky-600    border-sky-200    bg-sky-50"    },
  define:    { label: "Define",    number: "02", color: "text-amber-600  border-amber-200  bg-amber-50"  },
  design:    { label: "Design",    number: "03", color: "text-primary    border-primary/20 bg-primary/5" },
  deliver:   { label: "Deliver",   number: "04", color: "text-emerald-600 border-emerald-200 bg-emerald-50" },
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

// ─── Process Gallery ──────────────────────────────────────────────────────────
function ProcessCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const phase = PHASE_META[item.phase] || PHASE_META.discover;
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      className="bg-bg border border-border/25 hover:border-primary/30
                 transition-all duration-300 flex flex-col group min-w-[260px] max-w-[300px]
                 shrink-0 snap-start"
    >
      {/* Image / placeholder */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-primary/4 relative">
        {item.imagePath && !imgError ? (
          <img
            src={item.imagePath}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative">
            <div className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",
                backgroundSize: "10px 10px",
              }}
            />
            <svg className="w-7 h-7 text-primary/20 relative z-10" fill="none"
              stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 3.75h3.75v3.75" />
            </svg>
            <span className="text-[8px] font-black uppercase tracking-widest text-primary/25 relative z-10 text-center px-3">
              {item.type}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Phase tag */}
        <span className={`self-start text-[8px] font-black uppercase tracking-[0.18em]
                          border px-2 py-0.5 mb-3 ${phase.color}`}>
          {phase.number} {phase.label}
        </span>

        {/* Type */}
        <p className="text-[8.5px] font-black uppercase tracking-widest text-primary/60 mb-1">
          {item.type}
        </p>

        {/* Title */}
        <h4 className="font-black text-[13px] text-text leading-snug mb-2
                       group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h4>

        {/* Annotation */}
        <p className="text-[10.5px] leading-relaxed text-text/50 flex-1 mb-4">
          {item.annotation}
        </p>

        {/* Key insight toggle */}
        <div className="border-t border-border/20 pt-3">
          <button
            onClick={() => setExpanded(p => !p)}
            className="flex items-center justify-between w-full group/btn"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/50
                             group-hover/btn:text-primary transition-colors">
              Key Insight
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
      </div>
    </motion.div>
  );
}

function ProcessGallery({ items }) {
  if (!items || items.length === 0) return null;

  // Group by phase for the phase indicator row
  const phases = [...new Set(items.map(i => i.phase))];

  return (
    <section id="process" className="mb-16 scroll-mt-32">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">
            Behind the Work
          </p>
          <h2 className="text-xl font-black text-text tracking-tight">
            Research Process
          </h2>
        </div>

        {/* Phase legend */}
        <div className="hidden sm:flex items-center gap-3 flex-wrap justify-end">
          {phases.map(p => {
            const meta = PHASE_META[p];
            if (!meta) return null;
            return (
              <span key={p} className={`text-[8px] font-black uppercase tracking-widest
                                        border px-2 py-0.5 ${meta.color}`}>
                {meta.number} {meta.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div className="flex gap-px overflow-x-auto snap-x snap-mandatory
                      scrollbar-hide pb-2 -mx-4 px-4 md:-mx-0 md:px-0">
        {items.map((item, i) => (
          <ProcessCard key={i} item={item} index={i} />
        ))}
      </div>

      {/* Scroll hint — only shows if more than 3 items */}
      {items.length > 3 && (
        <p className="text-[8.5px] text-text/25 font-semibold uppercase tracking-widest
                      mt-3 flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor"
            strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Scroll to see all {items.length} artefacts
        </p>
      )}
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
                ? (sections.findIndex(s => s.id === activeId) + 1) / sections.length
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

// ─── Content section wrapper ──────────────────────────────────────────────────
function ContentSection({ id, heading, headingColor = "text-primary", children }) {
  return (
    <motion.section
      id={id}
      className="mb-20 scroll-mt-32"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className={`text-4xl md:text-5xl font-hand mb-6 ${headingColor}`}>{heading}</h2>
      {children}
    </motion.section>
  );
}

// ─── Main template ────────────────────────────────────────────────────────────
export default function ProjectTemplate({ meta, children }) {
  const [activeId, setActiveId] = useState(null);

  // Only include sidebar items for sections that have data
  const activeSections = SECTIONS.filter((s) => {
    if (s.dataKey === "process") return meta.process && meta.process.length > 0;
    return !!meta[s.dataKey];
  });

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
    return () => observers.forEach(o => o.disconnect());
  }, [meta]);

  return (
    <main className="min-h-screen bg-bg pt-32 pb-24">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <motion.header
          className="mb-12 max-w-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-text tracking-tighter mb-6 leading-tight">
            {meta.title}
          </h1>

          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {meta.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest
                                         text-text border border-border/50 bg-muted/30">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-8 border-t border-b border-border/30 py-5">
            <div>
              <span className="block text-[8.5px] font-black text-text/35 uppercase tracking-widest mb-1">Role</span>
              <span className="text-primary font-semibold text-sm">{meta.role}</span>
            </div>
            <div>
              <span className="block text-[8.5px] font-black text-text/35 uppercase tracking-widest mb-1">Timeline</span>
              <span className="text-text font-semibold text-sm">{meta.timeline}</span>
            </div>
            {meta.methods && meta.methods.length > 0 && (
              <div>
                <span className="block text-[8.5px] font-black text-text/35 uppercase tracking-widest mb-1">
                  Research Methods
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
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
          <aside className="hidden md:block w-[180px] lg:w-[200px] shrink-0">
            <div className="sticky top-36">
              <SidebarNav sections={activeSections} activeId={activeId} />
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 min-w-0">

            {/* Process Gallery — replaces hero image */}
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
                      className="w-full h-full object-cover  contrast-110" />
                  </motion.div>
                )
            }

            {meta.challenge && (
              <ContentSection id="challenge" heading="The Challenge">
                <p className="text-lg text-text leading-relaxed font-medium">{meta.challenge}</p>
              </ContentSection>
            )}

            {meta.solution && (
              <ContentSection id="solution" heading="The Solution" headingColor="text-accent">
                <p className="text-lg text-text leading-relaxed font-medium">{meta.solution}</p>
              </ContentSection>
            )}

            {meta.methodology && (
              <ContentSection id="methodology" heading="Methodology & Approach">
                <p className="text-lg text-text/75 leading-relaxed mb-6">{meta.methodology}</p>
                {meta.techStack && meta.techStack.length > 0 && (
                  <div className="border-l-2 border-primary/30 pl-5 mt-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-2">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {meta.techStack.map((t) => (
                        <span key={t} className="text-[10px] font-semibold text-text/60
                                                  border border-border/40 px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </ContentSection>
            )}

            {meta.results && (
              <ContentSection id="results" heading="Key Findings" headingColor="text-accent">
                <p className="text-lg text-text/75 leading-relaxed">{meta.results}</p>
                {meta.metrics && meta.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border/20 mt-8">
                    {meta.metrics.map((m) => (
                      <div key={m.label} className="bg-bg px-5 py-5">
                        <p className="font-black text-2xl text-primary leading-none mb-1">{m.value}</p>
                        <p className="text-[9.5px] text-text/45 uppercase tracking-widest font-semibold">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </ContentSection>
            )}

            {meta.implications && (
              <ContentSection id="implications" heading="Design Implications">
                <p className="text-lg text-text leading-relaxed font-medium">{meta.implications}</p>
              </ContentSection>
            )}

            {children}

            {/* Back link */}
            <div className="pt-12 border-t border-border/20 mt-8">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase
                           tracking-widest text-text/35 hover:text-primary transition-colors group"
              >
                <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform"
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