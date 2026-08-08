// The content column (index → title → methods → CTA) spans the full row
// width — no right-hand stat column stealing space from the title. The
// chevron that signals the hover-expand panel is absolutely positioned so
// it costs the title zero layout width, and stays aria-hidden since the
// row itself is the accessible link. All of a project's metrics (not just
// one) surface inside the hover-expand panel under "Impact at a glance."

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useInView, animate as animateValue } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

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

// Counts 0 → value once the row scrolls into view. Only pure integers
// ("57", "19") animate; word/mixed values ("TypeScript", "60%") render
// immediately — counting them up would be meaningless.
function MetricValue({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const isPureInteger = /^\d+$/.test(String(value));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isPureInteger || !inView || reduce) return;
    const controls = animateValue(0, Number(value), {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, isPureInteger, value, reduce]);

  const shown = !isPureInteger || reduce ? value : (inView ? display : 0);
  return <span ref={ref} className={className}>{shown}</span>;
}

export function StackedProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const isInProgress = project.status === "in-progress";
  const hasImage = project.thumbnail && !imgError;
  const metrics = project.metrics || [];
  const methods = project.methods || project.tags || [];

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.06, duration: reduce ? 0 : 0.4, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <div
          className="relative px-6 md:px-8 py-7 bg-bg border-t border-border
                     transition-colors duration-200 ease-smooth hover:bg-primary/[0.03] group"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-2
                       transition-all duration-200 ease-smooth"
            style={{ backgroundColor: "var(--accent-spine)" }}
          />

          {/* Chevron — announces the hover-expand panel. Absolutely
              positioned so it costs the title zero layout width. */}
          <motion.svg
            aria-hidden="true"
            className="absolute right-8 md:right-16 top-8 w-4 h-4 text-text/30
                       transition-colors duration-200 group-hover:text-primary-600"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </motion.svg>

          <div className="flex items-start gap-6">
            <span className="font-mono text-xs font-bold text-primary-600 tabular-nums mt-2 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0 pr-8">
              {/* Badge sits inline with the title so it never pushes rows
                  without one out of baseline alignment with rows that have it. */}
              <div className="flex items-start gap-3 flex-wrap">
                <h2
                  className="font-display font-extrabold text-2xl md:text-3xl
                             tracking-[-0.01em] uppercase leading-tight text-text
                             line-clamp-2 transition-colors duration-300 group-hover:text-primary-600"
                >
                  {project.title}
                </h2>
                {isInProgress && (
                  <span
                    className="shrink-0 mt-0.5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-primary-600"
                    style={{ border: "1px solid var(--primary-600)" }}
                  >
                    {t("projects.inProgress")}
                  </span>
                )}
              </div>

              {/* Methods — quiet ink, mid-dot separated. */}
              {methods.length > 0 && (
                <p className="mt-3 text-[15px] tracking-wide">
                  {methods.slice(0, 4).map((m, i, arr) => (
                    <span key={m}>
                      <span className="font-medium text-text-meta">{m}</span>
                      {i < arr.length - 1 && <span className="mx-2 text-text/30">·</span>}
                    </span>
                  ))}
                </p>
              )}

              {/* Explicit CTA — same affordance on every row, works on touch */}
              <p
                className="mt-4 mb-0 inline-flex items-center gap-1.5 text-xs font-black
                           uppercase tracking-[0.2em] text-primary-600
                           transition-transform duration-200 ease-smooth group-hover:translate-x-1"
              >
                {isInProgress ? t("project.card.readInProgress") : t("project.card.readCaseStudy")}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </p>
            </div>
          </div>
        </div>

        {/* Expanded panel */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{
            height: { duration: reduce ? 0 : 0.3, ease: [0.22, 0.61, 0.36, 1] },
            opacity: { duration: reduce ? 0 : 0.3, delay: open ? 0.05 : 0 },
          }}
          className="overflow-hidden bg-muted/40"
        >
          <div className="px-6 md:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border">
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
              {metrics.length > 0 && (
                <Field label={t("project.meta.impactAtGlance")}>
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-2xs uppercase tracking-wider text-text/60">{m.label}</span>
                        <MetricValue
                          value={m.value}
                          className="mt-1 font-display font-extrabold text-lg text-primary-600 tabular-nums"
                        />
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
