// Section headings follow one pattern: a border-t divider, a numbered
// kicker in primary-600, then a font-display heading in ink, matching the
// rhythm used elsewhere on the site. The process rail renders as a vertical
// numbered stepper (suits a research process better than a horizontal
// scroll rail, and reads naturally in the narrow content column below).
// Header tags render as a quiet, mid-dot-separated eyebrow line, and
// methods as a plain ink list, rather than chips. Metrics are font-display
// ink, with the kicker as the only coral accent.
//
// Layout is three tracks at xl+: a sticky section TOC, a capped-width prose
// column, and a right rail used for pull-quotes lifted out of the three
// long-form sections (Challenge/Solution/Methodology). Below xl the rail
// content simply doesn't render — it's a wide-screen enhancement, not new
// information (the same sentence already lives in the paragraph).
//
// Default export is ProjectTemplate({ meta, children }). All data comes
// from src/projects/*/data.js.

import React, { useState, useEffect, useLayoutEffect, useMemo, useRef, useId } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useInView,
  animate as animateValue,
  useTransform,
} from "framer-motion";
import SectionMedia from "./SectionMedia";
import { Badge } from "../components/Badge";
import { ProjectPicture } from "../components/ProjectPicture";
import { NeedsInputMarker } from "../components/NeedsInputMarker";
import { useTranslation } from "../context/LanguageContext";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { profileData as rawProfile } from "../data/profile";
import { projects as allProjects } from "../data/projects";
import { isNeedsInput } from "../data/needsInput";

const EASE = [0.22, 0.61, 0.36, 1];

// Phase config. Labels are resolved via t() at render time; only keys live here.
const PHASE_META = {
  discover: { labelKey: "project.phase.discover", number: "01" },
  define:   { labelKey: "project.phase.define",   number: "02" },
  design:   { labelKey: "project.phase.design",   number: "03" },
  deliver:  { labelKey: "project.phase.deliver",  number: "04" },
};

// Content section definitions. `labelKey` drives the sidebar/mobile-pill text (short form).
const SECTIONS = [
  { id: "about",        labelKey: "project.sidebar.about",        dataKey: "about"        },
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

// Helpers to extract text and pull-quotes, supporting both the new
// { quote, text } object format and the legacy plain string format.
function getPullQuote(content) {
  if (!content) return "";
  if (typeof content === "object" && content.quote) return content.quote;
  if (typeof content === "string") {
    const match = content.match(/^.*?[.!?](?=\s|$)/);
    const sentence = (match ? match[0] : content).trim();
    if (sentence.length > content.length * 0.85) return "";
    return sentence;
  }
  return "";
}

function getBodyText(content) {
  if (!content) return "";
  if (typeof content === "object" && content.text) return content.text;
  if (typeof content === "string") return content;
  return "";
}

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
          <span className="mt-0.5 shrink-0 text-text-meta transition-colors duration-200 group-hover:text-primary-600 no-print">
            <Chevron isOpen={isOpen} />
          </span>
        </button>
      </h2>
    </>
  );
}

// Chevron — rotates open/closed; no separate open/closed icon needed.
function Chevron({ isOpen, className = "w-4 h-4 md:w-5 md:h-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={`${className} shrink-0 transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

// Body copy opens clamped to 2.5 lines, with Read more / Read less to
// toggle the rest. The half line is the point: a whole-line cut can read as
// a paragraph that simply ended, where a sliced line says "there is more" on
// sight. So the clamp is a max-height of 2.5 × the paragraph's own computed
// line-height — CSS line-clamp only counts whole lines — with a mask fading
// that half line out.
//
// Whether a given paragraph overflows depends on the column width, so it is
// measured rather than guessed from character count: the clip lives on the
// outer div while the inner div keeps its natural height, and it's the inner
// one the ResizeObserver watches. Watching the clipped element instead would
// go stale the moment it stopped changing size — which is exactly when it is
// clamped, i.e. always.
const CLAMP_LINES = 2.5;
const CLAMP_FADE = "linear-gradient(to bottom, #000 78%, transparent 100%)";
const CLAMP_TRANSITION = `max-height 320ms cubic-bezier(${EASE.join(", ")})`;

function ClampedText({ children, className = "" }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const innerRef = useRef(null);
  const bodyId = useId();
  const [expanded, setExpanded] = useState(false);
  const [clampPx, setClampPx] = useState(0);
  const [fullPx, setFullPx] = useState(0);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const measure = () => {
      // The paragraph carries the type scale, not this wrapper, so read the
      // line-height off the child that actually has it.
      const typed = inner.firstElementChild ?? inner;
      const style = window.getComputedStyle(typed);
      const lineHeight = parseFloat(style.lineHeight);
      const fontSize = parseFloat(style.fontSize) || 17;
      const line = Number.isFinite(lineHeight) ? lineHeight : fontSize * 1.5;
      setClampPx(line * CLAMP_LINES);
      setFullPx(inner.getBoundingClientRect().height);
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  const overflows = clampPx > 0 && fullPx > clampPx + 1;
  const collapsed = overflows && !expanded;

  return (
    <div className={className}>
      <div
        id={bodyId}
        data-clamped-text
        style={{
          overflow: "hidden",
          maxHeight: collapsed ? `${clampPx}px` : overflows ? `${fullPx}px` : undefined,
          transition: prefersReducedMotion ? "none" : CLAMP_TRANSITION,
          WebkitMaskImage: collapsed ? CLAMP_FADE : undefined,
          maskImage: collapsed ? CLAMP_FADE : undefined,
        }}
      >
        <div ref={innerRef}>{children}</div>
      </div>

      {/* A blush wash rather than another bare coral caps line: the page already
          spends that exact style on section kickers, meta labels and the back
          link, so the toggle needs a surface of its own to read as the one
          clickable thing under a paragraph. Blush is a background-only token by
          design-system rule; hover flips to the solid coral fill the chips use,
          which holds contrast in both themes. */}
      {overflows && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={bodyId}
          className="no-print mt-3 inline-flex items-center gap-1.5 border-0 bg-blush-weak
                     px-2.5 py-1.5 text-2xs font-black uppercase tracking-[0.2em] text-primary-600
                     hover:bg-primary-600 hover:text-white transition-colors duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          {expanded ? t("common.readLess") : t("common.readMore")}
          <Chevron isOpen={expanded} className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// The project title always sits on one line: it never wraps, and the type
// size is fitted to the column instead. Sizing has to happen in JS — the
// right size depends on how long this particular title is, which CSS's
// clamp() cannot see. The measure→shrink pass repeats a couple of times
// because glyph advance isn't perfectly linear in font-size, and re-runs
// once webfonts land, since the first measurement is of fallback metrics.
const TITLE_MIN_PX = 14;

function FitTitle({ children, className }) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;
    let cancelled = false;

    const fit = () => {
      if (cancelled) return;
      text.style.fontSize = ""; // back to the class-driven size before measuring
      const base = parseFloat(window.getComputedStyle(text).fontSize);
      const available = wrap.clientWidth;
      if (!base || !available || !text.scrollWidth) return;

      let size = base;
      for (let pass = 0; pass < 3 && text.scrollWidth > available && size > TITLE_MIN_PX; pass++) {
        size = Math.max(TITLE_MIN_PX, size * (available / text.scrollWidth) * 0.995);
        text.style.fontSize = `${size}px`;
      }
    };

    fit();
    document.fonts?.ready?.then(fit).catch(() => {});

    // The wrapper's width is independent of the title's font size, so
    // resizing the title can never re-trigger this observer.
    if (typeof ResizeObserver === "undefined") return () => { cancelled = true; };
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [children]);

  // `overflow-x: clip` rather than `hidden`: hidden on one axis forces the
  // other to `auto`, which would both clip tall glyphs and risk a stray
  // scrollbar. This is only a guard for a title so long it hits the size
  // floor on a narrow phone — normally nothing reaches the edge to clip.
  return (
    <div ref={wrapRef} className="min-w-0" style={{ overflowX: "clip" }}>
      <h1 ref={textRef} className={className} style={{ whiteSpace: "nowrap" }}>
        {children}
      </h1>
    </div>
  );
}

// Right-rail pull-quote. Hidden below xl — the rail is a wide-screen
// enhancement, not new information.
function PullQuote({ text }) {
  if (!text) return null;
  return (
    <blockquote className="hidden xl:block border-l-2 border-primary-600 pl-5 pt-1">
      <p className="font-hand text-[28px] leading-snug text-text/80">{text}</p>
    </blockquote>
  );
}

// Long-form prose wrapper: caps the reading measure, and — for the three
// sections that get one — sets a lead-sentence pull-quote beside it in the
// right rail once the viewport is wide enough to hold three tracks.
function Prose({ text, rail, children }) {
  const bodyText = getBodyText(text);
  const pullQuote = getPullQuote(text);

  return (
    <div className={rail ? "xl:grid xl:grid-cols-[1fr_240px] xl:gap-10 items-start" : ""}>
      <div className="max-w-[68ch]">
        <ClampedText>
          <p className="text-[17px] leading-[1.7] text-text/90">{bodyText}</p>
        </ClampedText>
        {children}
      </div>
      {rail && <PullQuote text={pullQuote} />}
    </div>
  );
}

// Content section wrapper: divider, clickable head, collapsible body. Open
// state is controlled by the parent's openSections set. Body height is
// animated with the CSS grid 0fr/1fr trick rather than measured in JS, so
// it works for arbitrary content — text, figures, the metrics strip —
// without a resize observer. `staggerDelayMs` is only non-zero for the
// brief window right after "Collapse/Expand all" fires, so every panel
// settles in sequence instead of snapping together; a single section's own
// toggle always stays instant.
function ContentSection({ id, number, kicker, heading, isOpen, onToggle, staggerDelayMs = 0, children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className="pt-10 mb-14 md:pt-16 md:mb-20 border-t border-border scroll-mt-32"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
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
          transition: prefersReducedMotion ? "none" : `grid-template-rows 350ms ease ${staggerDelayMs}ms`,
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div className="pb-1">{children}</div>
        </div>
      </div>
    </motion.section>
  );
}

// Process step — vertical numbered stepper. Suits a research process more
// naturally than a horizontal scroll rail, and fits the narrower content
// column without needing scroll affordances (edge fades, arrows, a
// progress dial) to tell the reader there's more.
function ProcessStep({ item, index, total }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const phase = PHASE_META[item.phase] || PHASE_META.discover;

  return (
    <motion.li
      className="relative pl-11 md:pl-12 pb-10 last:pb-0"
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ delay: Math.min(index, 6) * 0.06, duration: 0.4, ease: EASE }}
    >
      {index < total - 1 && (
        <span aria-hidden="true" className="absolute left-[15px] md:left-[17px] top-9 bottom-0 w-px bg-border" />
      )}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9
                   rounded-full border-2 border-primary-600 bg-bg font-mono text-xs font-bold text-primary-600"
      >
        {index + 1}
      </span>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {item.imagePath && !imgError && (
          <div className="w-full sm:w-[150px] aspect-[4/3] shrink-0 overflow-hidden border border-border bg-muted/40">
            <img
              src={item.imagePath}
              alt={item.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-2xs uppercase tracking-wider text-text-meta mb-2">
            {phase.number} {t(phase.labelKey)}
            <span className="mx-1.5 text-text/25">·</span>
            {item.type}
          </p>

          <h3 className="font-display font-bold text-base text-text leading-snug mb-2">
            {item.title}
          </h3>

          <p className="text-sm text-text/70 leading-relaxed">
            {item.annotation}
          </p>

          {item.insight && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded((p) => !p)}
                aria-expanded={expanded}
                className="flex items-center gap-2 group/btn"
              >
                <span className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600">
                  {expanded ? t("project.process.hideInsight") : t("project.process.keyInsight")}
                </span>
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-text-meta group-hover/btn:text-text/60 transition-colors"
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
                    <p className="text-[13px] leading-relaxed text-text/70
                                  border-l-2 border-primary/40 pl-3 mt-3">
                      {item.insight}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.li>
  );
}

// Process gallery — vertical stepper. Carries the same collapsible-body
// contract as ContentSection (`#<id>-body`, aria-hidden, the 0fr/1fr grid
// trick) rather than reusing it, because the body is an <ol> of steps
// rather than prose, and the sidebar/pill nav resolves `process` like any
// other section id.
function ProcessGallerySection({ items, number, isOpen, onToggle, staggerDelayMs = 0 }) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
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
          transition: prefersReducedMotion ? "none" : `grid-template-rows 350ms ease ${staggerDelayMs}ms`,
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <ol className="list-none p-0 m-0 max-w-[68ch]" role="list" aria-label={t("project.process.ariaLabel")}>
            {items.map((item, i) => (
              <ProcessStep key={`${item.phase}-${i}`} item={item} index={i} total={items.length} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// Sticky TOC — numbers and labels, active item marked with a layoutId
// indicator that slides between entries instead of popping.
function SidebarNav({ sections, activeId, onNavigate, allOpen, onToggleAll }) {
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

// Counts a metric's numeric part up from 0 once it scrolls into view.
function AnimatedMetricValue({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const target = Number(match[1]);
    const controls = animateValue(0, target, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  if (!match) return <span ref={ref}>{value}</span>;
  const shown = reduce ? match[1] : inView ? display : 0;
  return (
    <span ref={ref}>
      <span className="print:hidden">{shown}</span>
      <span className="hidden print:inline">{match[1]}</span>
      {match[2]}
    </span>
  );
}

// Metrics strip
function MetricsStrip({ metrics }) {
  const { t } = useTranslation();
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="mt-8">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-5">
        {t("project.results.glance")}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 border border-border divide-x divide-y divide-border">
        {metrics.map((m, i) => {
          if (m.pending) {
            return (
              <div key={i} className="p-5 min-w-0">
                <p className="font-display font-extrabold leading-none text-dim text-[15px] md:text-[17px] uppercase tracking-wide">
                  {t("project.results.pending")}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-text-meta font-semibold mt-3 leading-snug">
                  {m.label}
                </p>
              </div>
            );
          }
          const isLong = String(m.value).length > 5;
          return (
            <div key={i} className="p-5 min-w-0">
              <p
                className={`font-display font-extrabold leading-none text-text tabular-nums break-words
                           ${isLong ? "text-[22px] md:text-[26px]" : "text-[36px] md:text-[44px]"}`}
              >
                <AnimatedMetricValue value={m.value} />
              </p>
              <p className="text-[11px] uppercase tracking-wider text-text-meta font-semibold mt-3 leading-snug">
                {m.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const PHASE_STATUS = {
  complete: { labelKey: "project.status.complete", dot: "bg-text", text: "text-text" },
  "in-progress": { labelKey: "project.status.inProgress", dot: "bg-primary-600", text: "text-primary-600" },
  planned: { labelKey: "project.status.planned", dot: "bg-transparent border border-dim", text: "text-dim" },
  blocked: { labelKey: "project.status.blocked", dot: "bg-danger", text: "text-danger" },
};

function MaybeText({ value, path, as: As = "span", className }) {
  if (isNeedsInput(value)) return <NeedsInputMarker path={path} />;
  if (!value) return null;
  return <As className={className}>{value}</As>;
}

const ADOPTION_META = {
  shipped:      { labelKey: "project.outcome.adoption.shipped",    tone: "success" },
  roadmapped:   { labelKey: "project.outcome.adoption.roadmapped", tone: "accent"  },
  "not-adopted":{ labelKey: "project.outcome.adoption.notAdopted", tone: "muted"   },
  unknown:      { labelKey: "project.outcome.adoption.unknown",    tone: "muted"   },
  academic:     { labelKey: "project.outcome.adoption.academic",   tone: "highlight" },
};

function AdoptionPill({ adoption }) {
  const { t } = useTranslation();
  const meta = ADOPTION_META[adoption];
  if (!meta) return null;
  return (
    <Badge tone={meta.tone} className="mt-1">
      {t(meta.labelKey)}
    </Badge>
  );
}

// Outcome — what happened after the findings. It used to be a section of its
// own, directly under Results, which read as two headings for one story: the
// findings and what they changed. It's now the closing block of the Results
// section, marked by the same quiet dim label the metrics strip uses rather
// than a second coral kicker, so the section keeps one heading.
function OutcomeBlock({ outcome }) {
  const { t } = useTranslation();
  if (!outcome?.body) return null;
  const decisions = outcome.decisions || [];

  return (
    <div className="mt-12 border-t border-border pt-8 max-w-[68ch]">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-5">
        {t("project.outcome.kicker")}
      </p>

      <ClampedText>
        <MaybeText
          value={outcome.body}
          path="outcome.body"
          as="p"
          className="text-[17px] leading-[1.7] text-text/90"
        />
      </ClampedText>

      {outcome.adoption && (
        <div className="mt-5">
          <AdoptionPill adoption={outcome.adoption} />
        </div>
      )}

      {decisions.length > 0 && (
        <div className="mt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-3">
            {t("project.outcome.decisions")}
          </p>
          <ul className="border-t border-border">
            {decisions.map((decision, i) => (
              <li key={i} className="border-b border-border py-3">
                <MaybeText
                  value={decision}
                  path={`outcome.decisions[${i}]`}
                  as="p"
                  className="text-sm text-text/80 leading-relaxed"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ContributionRow({ contribution }) {
  const { t } = useTranslation();
  const groups = [
    { key: "owned", items: contribution.owned, labelKey: "project.contribution.owned", muted: false },
    { key: "shared", items: contribution.shared, labelKey: "project.contribution.shared", muted: false },
    { key: "notMine", items: contribution.notMine, labelKey: "project.contribution.notMine", muted: true },
  ].filter((g) => g.items && g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4 border-b border-border"
         style={{ breakInside: "avoid" }}>
      <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
        {t("project.meta.contribution")}
      </dt>
      <dd className="space-y-3 max-w-[68ch]">
        {groups.map((g) => (
          <div key={g.key}>
            <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-1 ${g.muted ? "text-dim" : "text-text-meta"}`}>
              {t(g.labelKey)}
            </p>
            <ul className={`text-sm leading-relaxed space-y-0.5 ${g.muted ? "text-dim" : "text-text font-medium"}`}>
              {g.items.map((item, i) => (
                <li key={i}>
                  <MaybeText value={item} path={`myContribution.${g.key}[${i}]`} as="span" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </dd>
    </div>
  );
}

function VerbatimBlock({ item, index }) {
  const { t } = useTranslation();
  if (isNeedsInput(item)) return <NeedsInputMarker path={`verbatims[${index}]`} />;
  if (isNeedsInput(item.quote)) return <NeedsInputMarker path={`verbatims[${index}].quote`} />;
  if (!item.quote) return null;
  return (
    <blockquote
      className="border-l-2 border-primary-600 pl-5 pt-1"
      aria-label={t("project.results.verbatim")}
      style={{ breakInside: "avoid" }}
    >
      <p className="font-hand text-[28px] leading-snug text-text/80">“{item.quote}”</p>
      {item.attribution && !isNeedsInput(item.attribution) && (
        <cite className="block not-italic text-2xs font-bold uppercase tracking-wider text-text-meta mt-2">
          — {item.attribution}
        </cite>
      )}
      {isNeedsInput(item.attribution) && <NeedsInputMarker path={`verbatims[${index}].attribution`} />}
    </blockquote>
  );
}

function VerbatimRail({ verbatims }) {
  if (!verbatims || verbatims.length === 0) return null;
  return (
    <div className="hidden xl:flex xl:flex-col xl:gap-8">
      {verbatims.map((item, i) => (
        <VerbatimBlock key={i} item={item} index={i} />
      ))}
    </div>
  );
}

function VerbatimInline({ verbatims }) {
  if (!verbatims || verbatims.length === 0) return null;
  return (
    <div className="xl:hidden mt-8 flex flex-col gap-6 max-w-[68ch]">
      {verbatims.map((item, i) => (
        <VerbatimBlock key={i} item={item} index={i} />
      ))}
    </div>
  );
}

function ResearchPhases({ phases, intro, number, isOpen, onToggle, staggerDelayMs }) {
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
      staggerDelayMs={staggerDelayMs}
    >
      {intro && (
        <ClampedText className="max-w-[68ch] mb-8">
          <p className="text-[17px] leading-[1.7] text-text/90">
            {intro}
          </p>
        </ClampedText>
      )}

      <ol className="list-none p-0 m-0 max-w-[68ch]">
        {phases.map((p, i) => {
          const s = PHASE_STATUS[p.status] ?? PHASE_STATUS.planned;
          return (
            <motion.li
              key={p.phase}
              className="border-t border-border py-4 first:border-t-0 first:pt-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
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

const isInternalPath = (url) => /^\/(?!\/)/.test(url);

// The one gold mark on a case-study page. Nothing else here uses the
// highlighter, so a live, clickable build is the single thing wearing it —
// that is the point of the "once per page" rule, not an exception to it.
// Gold is a background token, never a text colour, so the label is ink in
// both themes (same reasoning as .ink-highlight in theme.css). Print drops
// the fill back to an outline rather than laying down a solid gold block.
function PrototypeLink({ href, label }) {
  const className = "mt-6 inline-flex items-center gap-2 border-2 border-highlight bg-highlight px-5 py-3 " +
    "text-2xs font-black uppercase tracking-[0.2em] text-highlight-on " +
    "shadow-sm transition duration-200 " +
    "hover:bg-highlight/85 hover:-translate-y-0.5 hover:shadow-md " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-highlight focus-visible:ring-offset-bg " +
    "print:bg-transparent print:border-border print:text-text print:shadow-none";
  const icon = (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );

  if (isInternalPath(href)) {
    return (
      <Link to={href} className={className}>
        {label}
        {icon}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      {icon}
    </a>
  );
}

function ProjectNavCard({ project, direction }) {
  const { t } = useTranslation();
  const isNext = direction === "next";
  return (
    <Link
      to={project.href}
      className={`group flex items-center gap-4 border border-border p-4 transition-colors duration-200
                 hover:border-primary-600 ${isNext ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      {project.thumbnail && (
        <div className="w-20 aspect-[16/10] shrink-0 overflow-hidden border border-border bg-muted">
          <ProjectPicture
            src={project.thumbnail}
            webpSrc={project.thumbnailWebp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`min-w-0 flex-1 flex flex-col ${isNext ? "sm:items-end" : ""}`}>
        <p className={`flex items-center gap-1.5 text-2xs font-black uppercase tracking-[0.2em] text-text-meta mb-1 ${isNext ? "sm:flex-row-reverse" : ""}`}>
          <svg aria-hidden="true" className={`w-3 h-3 transition-transform duration-200 ${isNext ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={isNext ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M10 19l-7-7m0 0l7-7m-7 7h18"} />
          </svg>
          {isNext ? t("project.nav.next") : t("project.nav.previous")}
        </p>
        <p className="font-display font-bold text-sm text-text uppercase leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {project.title}
        </p>
      </div>
    </Link>
  );
}

// Main template
export default function ProjectTemplate({ meta: rawMeta, children }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const mainRef = useRef(null);
  const toggleAllTimeoutRef = useRef(null);

  const meta = useLocalizedProfile(rawMeta);
  const profileData = useLocalizedProfile(rawProfile);

  // Opt-out, not opt-in: every existing project keeps its metrics strip and
  // participant quotes without touching its data.js.
  const showResultsDetail = meta.resultsDetail !== false;

  useDocumentMeta({
    title: `${meta.title} — ${profileData.name}`,
    description: meta.tagline || meta.challenge,
  });

  const activeSections = useMemo(
    () =>
      SECTIONS.filter((s) => {
        const value = meta[s.dataKey];
        const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
        if (s.id === "prototype") {
          return hasValue || !!meta.prototypeUrl || (meta.figures?.prototype?.length > 0);
        }
        // Results carries the outcome block, so it stands on either one.
        if (s.id === "results") {
          return hasValue || !!meta.outcome?.body;
        }
        return hasValue;
      }),
    [meta]
  );

  const [activeId, setActiveId] = useState(() => activeSections[0]?.id ?? null);

  const [openSections, setOpenSections] = useState(
    () => new Set(activeSections.map((s) => s.id))
  );

  const [staggerAll, setStaggerAll] = useState(false);

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
    if (prefersReducedMotion) return;
    setStaggerAll(true);
    window.clearTimeout(toggleAllTimeoutRef.current);
    const settle = activeSections.length * 40 + 350 + 60;
    toggleAllTimeoutRef.current = window.setTimeout(() => setStaggerAll(false), settle);
  };

  useEffect(() => () => window.clearTimeout(toggleAllTimeoutRef.current), []);

  const sectionIndex = (id) => activeSections.findIndex((s) => s.id === id);
  const sectionNumber = (id) => String(sectionIndex(id) + 1).padStart(2, "0");
  const staggerDelayFor = (id) => (staggerAll ? sectionIndex(id) * 40 : 0);

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

  const scrollProgress = useMotionValue(0);
  const scrollY = useMotionValue(0); // Track exact pixel scroll for parallax

  useEffect(() => {
    const root = mainRef.current?.closest(".overflow-y-auto");
    if (!root) return;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      scrollProgress.set(max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0);
      scrollY.set(root.scrollTop); // Update tracking
    };
    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollProgress, scrollY]);

  // Parallax overlay transformations
  const bannerOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);
  const bannerBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(12px)"]);
  const bannerScale = useTransform(scrollY, [0, 600], [1, 0.96]);

  const orderedProjects = useMemo(
    () => allProjects.filter((p) => p.status !== "coming-soon"),
    []
  );
  const currentIndex = orderedProjects.findIndex((p) => p.id === meta.id);
  const rawPrev = currentIndex > 0 ? orderedProjects[currentIndex - 1] : null;
 const rawNext =
    currentIndex >= 0 && currentIndex < orderedProjects.length - 1
      ? orderedProjects[currentIndex + 1]
      : null;
  const { prev: prevProject, next: nextProject } = useLocalizedProfile({ prev: rawPrev, next: rawNext });

  const methods = meta.methods || [];
  const tags = meta.tags || [];
  const hasHeroImage = !!meta.thumbnail;

  return (
    <main ref={mainRef} className="min-h-screen bg-bg pt-20 md:pt-24">
      {/* Scroll-progress bar */}
      <motion.div
        aria-hidden="true"
        className="no-print fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[70]"
        style={{ scaleX: scrollProgress }}
      />

      {/* Hero photo — Sticky Parallax Implementation */}
      {hasHeroImage && (
        <div className="sticky top-[80px] md:top-[100px] z-0 w-full px-4 md:px-8 max-w-[1500px] mx-auto mb-10 md:mb-20">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              opacity: prefersReducedMotion ? 1 : bannerOpacity,
              filter: prefersReducedMotion ? "none" : bannerBlur,
              scale: prefersReducedMotion ? 1 : bannerScale,
            }}
          >
            <div className="photo-frame w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted shadow-sm">
              <ProjectPicture
                src={meta.thumbnail}
                webpSrc={meta.thumbnailWebp}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-right text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-meta">
              {t("project.media.heroCredit")}
            </p>
          </motion.div>
        </div>
      )}

      {/* Main Content Wrapper — Added solid bg and z-10 so it slides OVER the sticky banner */}
      <div className="relative z-10 w-full bg-bg pb-16 pt-8 md:pt-12">
        <div className="w-full px-4 md:px-8 max-w-[1500px] mx-auto">
          <div className="flex items-start">
            <aside className="hidden md:block w-[180px] lg:w-[220px] shrink-0 no-print sticky top-36 self-start pr-8 lg:pr-10">
              <SidebarNav sections={activeSections} activeId={activeId}
                onNavigate={navigateToSection} allOpen={allOpen} onToggleAll={toggleAllSections} />
            </aside>

            <div className="flex-1 min-w-0 max-w-[1060px] md:border-l md:border-border md:pl-8 lg:pl-10">
              {/* Header */}
              {/* The header caps its reading measure at 720px, but the title
                  is deliberately let out to the full content column: it has to
                  hold one line whatever its length, and every extra pixel of
                  width buys it type size. */}
              <motion.header
                className="mb-12"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {/* Live-stage chip */}
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

                <FitTitle className="font-display text-4xl md:text-6xl font-extrabold text-text
                                     tracking-tighter leading-tight mb-5">
                  {meta.title}
                </FitTitle>

                {meta.tagline && (
                  <p className="max-w-[720px] text-lg md:text-xl text-text/60 font-medium leading-relaxed mb-8">
                    {meta.tagline}
                  </p>
                )}

                {/* Meta block — Role, Timeline, Skills. Runs the full content
                    column rather than the 720px reading measure: its values are
                    short labels and chips, and giving the skill tags the whole
                    width lets them wrap into far fewer rows. The one long-form
                    value in here, the contribution lists, keeps its own measure. */}
                {(meta.role || meta.timeline || tags.length > 0) && (
                  <dl className="border-t border-border">
                    {meta.role && (
                      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4 border-b border-border">
                        <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
                          {t("project.meta.role")}
                        </dt>
                        <dd className="text-sm text-text font-medium">{meta.role}</dd>
                      </div>
                    )}
                    {meta.myContribution && <ContributionRow contribution={meta.myContribution} />}
                    {meta.timeline && (
                      <div className={`grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4 ${tags.length > 0 ? "border-b border-border" : ""}`}>
                        <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
                          {t("project.meta.timeline")}
                        </dt>
                        <dd className="font-mono text-sm text-text">{meta.timeline}</dd>
                      </div>
                    )}
                    {tags.length > 0 && (
                      <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4">
                        <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
                          {t("project.meta.skills")}
                        </dt>
                        <dd className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`}>
                              <Badge tone="accent">{tag}</Badge>
                            </Link>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
              </motion.header>

              {/* Mobile pill bar */}
              <MobilePillBar sections={activeSections} activeId={activeId} onNavigate={navigateToSection} />

              <article className="min-w-0">

              {meta.about && (
                <ContentSection id="about" number={sectionNumber("about")}
                  isOpen={openSections.has("about")} onToggle={() => toggleSection("about")}
                  staggerDelayMs={staggerDelayFor("about")}
                  kicker={t("project.about.kicker")} heading={t("project.about.heading")}>
                  <ClampedText className="max-w-[68ch]">
                    <p className="text-[17px] leading-relaxed about-project text-text/90">
                      {getBodyText(meta.about)}
                    </p>
                  </ClampedText>
                </ContentSection>
              )}

              {/* Process gallery — replaces the hero image when present. Keep
                  this as one ternary: the two branches are alternatives for the
                  same slot, and splitting them into separate guards is how the
                  gallery branch went missing before. */}
              {meta.process && meta.process.length > 0 ? (
                <ProcessGallerySection items={meta.process} number={sectionNumber("process")}
                  isOpen={openSections.has("process")} onToggle={() => toggleSection("process")}
                  staggerDelayMs={staggerDelayFor("process")} />
              ) : meta.heroImage && !hasHeroImage && (
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
                  staggerDelayMs={staggerDelayFor("challenge")}
                  kicker={t("project.challenge.kicker")} heading={t("project.challenge.heading")}>
                  <Prose text={meta.challenge} rail>
                    <SectionMedia items={meta.figures?.challenge} />
                  </Prose>
                </ContentSection>
              )}

              {meta.solution && (
                <ContentSection id="solution" number={sectionNumber("solution")}
                  isOpen={openSections.has("solution")} onToggle={() => toggleSection("solution")}
                  staggerDelayMs={staggerDelayFor("solution")}
                  kicker={t("project.solution.kicker")} heading={t("project.solution.heading")}>
                  <Prose text={meta.solution} rail>
                    <SectionMedia items={meta.figures?.solution} />
                  </Prose>
                </ContentSection>
              )}

              {(meta.prototype || meta.prototypeUrl || (meta.figures?.prototype?.length > 0)) && (
                <ContentSection id="prototype" number={sectionNumber("prototype")}
                  isOpen={openSections.has("prototype")} onToggle={() => toggleSection("prototype")}
                  staggerDelayMs={staggerDelayFor("prototype")}
                  kicker={t("project.prototype.kicker")} heading={t("project.prototype.heading")}>
                  {meta.prototype && (
                    <ClampedText className="max-w-[68ch]">
                      <p className="text-[17px] leading-[1.7] text-text/90">
                        {getBodyText(meta.prototype)}
                      </p>
                    </ClampedText>
                  )}

                  {meta.prototypeUrl && (
                    <PrototypeLink
                      href={meta.prototypeUrl}
                      label={meta.prototypeUrlLabel || t("project.prototype.openLink")}
                    />
                  )}

                  <SectionMedia items={meta.figures?.prototype} />
                </ContentSection>
              )}

              {meta.methodology && (
                <ContentSection id="methodology" number={sectionNumber("methodology")}
                  isOpen={openSections.has("methodology")} onToggle={() => toggleSection("methodology")}
                  staggerDelayMs={staggerDelayFor("methodology")}
                  kicker={t("project.methodology.kicker")} heading={t("project.methodology.heading")}>
                  <Prose text={meta.methodology} rail>
                    <SectionMedia items={meta.figures?.methodology} />
                    
                    {/* Research Methods and Tech Stack relocated here side by side */}
                    {((methods && methods.length > 0) || (meta.techStack && meta.techStack.length > 0)) && (
                      <div className="mt-8 flex flex-col gap-6 border-l-2 border-border pl-5">
                        
                        {/* Research Methods */}
                        {methods && methods.length > 0 && (
                          <div>
                            <span className="block font-mono text-2xs uppercase tracking-wider text-text-meta mb-2">
                              {t("project.meta.methods")}
                            </span>
                            <div className="text-sm text-text/80 tracking-wide leading-relaxed">
                              {methods.map((m, i, arr) => (
                                <span key={m.en || m}>
                                  <span className="font-medium text-text/70">{m.en || m}</span>
                                  {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Tech Stack */}
                        {meta.techStack && meta.techStack.length > 0 && (
                          <div>
                            <span className="block font-mono text-2xs uppercase tracking-wider text-text-meta mb-2">
                              {t("project.methodology.techStack")}
                            </span>
                            <div className="text-sm text-text/80 tracking-wide leading-relaxed">
                              {meta.techStack.map((tech, i, arr) => (
                                <span key={tech}>
                                  <span className="font-medium text-text/70">{tech}</span>
                                  {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                      </div>
                    )}

                  </Prose>
                </ContentSection>
              )}

              {(meta.results || meta.outcome?.body) && (
                <ContentSection id="results" number={sectionNumber("results")}
                  isOpen={openSections.has("results")} onToggle={() => toggleSection("results")}
                  staggerDelayMs={staggerDelayFor("results")}
                  kicker={t("project.results.kicker")} heading={t("project.results.heading")}>
                  {/* A project still in flight can set `resultsDetail: false` to
                      state that plainly without the metrics strip and participant
                      quotes contradicting it. `metrics` stays in the data either
                      way — the project card reads it for "Impact at a glance". */}
                  <div className={showResultsDetail && meta.verbatims?.length > 0 ? "xl:grid xl:grid-cols-[1fr_240px] xl:gap-10 items-start" : ""}>
                    <div className="max-w-[68ch]">
                      {showResultsDetail && meta.metrics?.some((m) => m.pending) && (
                        <p className="mb-6 border-l-2 border-border pl-4 text-sm text-text-meta leading-relaxed">
                          {t("project.results.pendingNotice")}
                        </p>
                      )}
                      {meta.results && (
                        <ClampedText>
                          <p className="text-[17px] leading-[1.7] text-text/90">
                            {getBodyText(meta.results)}
                          </p>
                        </ClampedText>
                      )}
                      <SectionMedia items={meta.figures?.results} />

                      {showResultsDetail && (
                        <>
                          <MetricsStrip metrics={meta.metrics} />

                          <VerbatimInline verbatims={meta.verbatims} />
                        </>
                      )}
                    </div>
                    {showResultsDetail && <VerbatimRail verbatims={meta.verbatims} />}
                  </div>

                  <OutcomeBlock outcome={meta.outcome} />
                </ContentSection>
              )}

              {meta.implications && (
                <ContentSection id="implications" number={sectionNumber("implications")}
                  isOpen={openSections.has("implications")} onToggle={() => toggleSection("implications")}
                  staggerDelayMs={staggerDelayFor("implications")}
                  kicker={t("project.implications.kicker")} heading={t("project.implications.heading")}>
                  <ClampedText className="max-w-[68ch]">
                    <p className="text-[17px] leading-[1.7] text-text/90">
                      {getBodyText(meta.implications)}
                    </p>
                  </ClampedText>
                </ContentSection>
              )}

              {meta.phases && meta.phases.length > 0 && (
                <ResearchPhases
                  phases={meta.phases}
                  intro={getBodyText(meta.phasesIntro)}
                  number={sectionNumber("phases")}
                  isOpen={openSections.has("phases")}
                  onToggle={() => toggleSection("phases")}
                  staggerDelayMs={staggerDelayFor("phases")}
                />
              )}

              {meta.conclusion && (
                <ContentSection id="conclusion" number={sectionNumber("conclusion")}
                  isOpen={openSections.has("conclusion")} onToggle={() => toggleSection("conclusion")}
                  staggerDelayMs={staggerDelayFor("conclusion")}
                  kicker={t("project.conclusion.kicker")} heading={t("project.conclusion.heading")}>
                  <SectionMedia items={meta.conclusion} />
                </ContentSection>
              )}

              {/* Escape hatch for per-project custom content */}
              {children}

              {/* Prev / next — lateral navigation instead of a dead end */}
              {(prevProject || nextProject) && (
                <nav
                  aria-label={t("project.nav.label")}
                  className="pt-10 mt-10 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {prevProject ? <ProjectNavCard project={prevProject} direction="prev" /> : <div aria-hidden="true" />}
                  {nextProject && <ProjectNavCard project={nextProject} direction="next" />}
                </nav>
              )}

              {/* Footer back link */}
              <div className="pt-10 border-t border-border">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-2xs font-black uppercase
                             tracking-[0.2em] text-text-meta hover:text-primary-600
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
      </div>
    </main>
  );
}