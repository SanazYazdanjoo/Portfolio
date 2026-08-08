// Each row's right-hand stat shows an uppercase label above the value,
// pulled from headline.label in projects.js. Every value uses the same
// size and weight (font-display extrabold text-2xl) regardless of type —
// numeric or word. Meta text is text-xs (12px) at text-text/70 for WCAG AA
// contrast. The chevron signals the hover-expand panel and stays
// aria-hidden since the row itself is the accessible link. The stat column
// sits in a fixed w-[190px] track with a min-height so row height, padding,
// and border stay identical whether the value is a number or a word.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const DOMAIN_SPINES = {
  attention:     { fallback: "var(--primary)" },
  collaboration: { fallback: "var(--highlight)" },
  affective:     { fallback: "var(--secondary)" },
  _default:      { fallback: "var(--blush)" },
};

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      {/* 12px min + /70 ink — AA on white */}
      <span className="block font-mono text-xs uppercase tracking-wider text-text/70 mb-2">
        {label}
      </span>
      <div className="border-t border-border pt-2.5">{children}</div>
    </div>
  );
}

/* One metric treatment for every row: label above, uniform value below. */
function HeadlineMetric({ metric, className = "" }) {
  if (!metric) return null;
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-text/70 leading-tight">
        {metric.label}
      </span>
      <span
        className="mt-1.5 font-display font-extrabold text-2xl leading-none text-text
                   transition-colors duration-300 group-hover:text-primary-600"
      >
        {metric.value}
      </span>
    </div>
  );
}

export function StackedProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const isInProgress = project.status === "in-progress";
  const spine = DOMAIN_SPINES[project.domain] || DOMAIN_SPINES._default;
  const hasImage = project.thumbnail && !imgError;
  const headline = project.metrics?.[0];
  const rest = (project.metrics || []).slice(1);
  const methods = project.methods || project.tags || [];

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <div
          className="relative px-8 md:px-16 py-7 bg-bg border-t border-border
                     transition-colors duration-300 hover:bg-blush-weak group"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2
                       transition-all duration-300 group-hover:w-3"
            style={{ backgroundColor: spine.fallback }}
          />

          <div className="flex items-start gap-6">
            <span className="font-mono text-xs font-bold text-primary-600 tabular-nums mt-2 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">
              {isInProgress && (
                <span
                  className="inline-block mb-2 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-primary-600"
                  style={{ border: "1px solid var(--primary-600)" }}
                >
                  {t("projects.inProgress")}
                </span>
              )}
              <h2
                className="font-display font-extrabold text-2xl
                           tracking-[-0.01em] uppercase leading-tight text-text
                           transition-colors duration-300 group-hover:text-primary-600"
              >
                {project.title}
              </h2>

              {/* Methods — quiet ink, mid-dot separated. /70 for AA. */}
              {methods.length > 0 && (
                <p className="mt-3 text-sm tracking-wide">
                  {methods.slice(0, 4).map((m, i, arr) => (
                    <span key={m}>
                      <span className="font-medium text-text/70">{m}</span>
                      {i < arr.length - 1 && <span className="mx-2 text-text/30">·</span>}
                    </span>
                  ))}
                </p>
              )}

              {/* Explicit CTA — same affordance on every row, works on touch */}
              <p
                className="mt-4 mb-0 inline-flex items-center gap-1.5 text-xs font-black
                           uppercase tracking-[0.2em] text-primary-600
                           transition-transform duration-300 group-hover:translate-x-1"
              >
                {isInProgress ? t("project.card.readInProgress") : t("project.card.readCaseStudy")}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </p>
            </div>

            {/* Stat column — fixed width + min-height = identical row anatomy
                whether the value is "16/16" or "TypeScript". */}
            <div className="hidden sm:flex w-[190px] min-h-[72px] shrink-0 flex-col items-end text-right self-start pt-1">
              <HeadlineMetric metric={headline} className="items-end" />
              {/* Chevron — announces the hover-expand panel. Bigger + bolder
                  so it reads as interactive, not lint. */}
              <motion.svg
                aria-hidden="true"
                className="mt-3 w-5 h-5 text-primary-600"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </motion.svg>
            </div>
          </div>

          {/* Mobile stat — same label-above-value treatment, same sizes */}
          {headline && (
            <div className="sm:hidden mt-4 pl-[calc(1rem+10px)]">
              <HeadlineMetric metric={headline} className="items-start" />
            </div>
          )}
        </div>

        {/* Expanded panel */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{
            height: { duration: reduce ? 0 : 0.6, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: reduce ? 0 : 0.35, delay: open ? 0.1 : 0 },
          }}
          className="overflow-hidden bg-muted/40"
        >
          <div className="px-8 md:px-16 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border">
            <div className="md:col-span-3 flex flex-col gap-5">
              {project.role && (
                <Field label={t("project.meta.role")}>
                  <p className="text-sm font-semibold text-text/85 leading-snug">{project.role}</p>
                </Field>
              )}
              {project.timeline && (
                <Field label={t("project.meta.timeline")}>
                  <p className="font-mono text-xs text-text/70">{project.timeline}</p>
                </Field>
              )}
            </div>

            <div className="md:col-start-5 md:col-span-4 flex flex-col gap-5">
              {project.tagline && (
                <Field label={t("project.meta.context")}>
                  <p className="text-xs text-text/70 leading-relaxed">{project.tagline}</p>
                </Field>
              )}
              {rest.length > 0 && (
                <Field label={t("project.meta.furtherImpact")}>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {rest.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-1.5">
                        <span className="font-display font-extrabold text-sm text-primary-600">{m.value}</span>
                        <span className="text-xs text-text/70 uppercase tracking-wider">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </Field>
              )}
            </div>

            {/* Thumbnail + CTA — cols 9–12 */}
            <div className="md:col-start-9 md:col-span-4 flex flex-col gap-4">
              {hasImage && (
                <div className="photo-frame aspect-video overflow-hidden bg-primary/[0.03]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover
                               transition-all duration-700"
                  />
                </div>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold
                               uppercase tracking-[0.18em] text-primary-600">
                {t("projects.viewProject")}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                     strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
