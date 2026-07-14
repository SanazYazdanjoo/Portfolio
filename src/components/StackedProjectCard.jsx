// src/components/StackedProjectCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MESSINESS FIX v3 — three targeted changes:
//
//   1. HEADLINE STAT: no more ink-highlight. The gold highlighter is reserved
//      for ONE moment per page (the hero tagline). Stats are now big Fraunces
//      numerals in ink — they still land, without shouting.
//   2. ALIGNED STAT COLUMN: the badges (N=30 / 50 / Public) used to float at
//      different positions per card (self-center + variable width = ragged
//      right edge). Now: fixed w-[190px] column, top-aligned to the title
//      baseline. All three cards snap to the same vertical axis.
//   3. METHOD TAGS: were secondary-600 (rose) — they read as links/errors and
//      competed with every other accent. Now muted ink (text-text/55), so the
//      TITLE and the METRIC carry the card, in that order.
//
// NOTE: the expanded panel's image column was rebuilt (the original block
// wasn't in project knowledge) — photo-frame thumbnail + "View Case Study"
// hint, cols 9–12. Diff against your local version before replacing if you
// had custom logic there.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const DOMAIN_SPINES = {
  attention:     { fallback: "var(--primary)" },
  collaboration: { fallback: "var(--highlight)" },
  affective:     { fallback: "var(--secondary)" },
  _default:      { fallback: "var(--blush)" },
};

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <span className="block font-mono text-2xs uppercase tracking-wider text-text/55 mb-2">
        {label}
      </span>
      <div className="border-t border-border pt-2.5">{children}</div>
    </div>
  );
}

export function StackedProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();

  if (!project || project.status === "coming-soon" || !project.id) return null;

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
            <span className="font-mono text-2xs font-bold text-primary-600 tabular-nums mt-2 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">
              <h2
                className="font-display font-extrabold text-2xl
                           tracking-[-0.01em] uppercase leading-tight text-text
                           transition-colors duration-300 group-hover:text-primary-600"
              >
                {project.title}
              </h2>

{/* Methods — quiet ink, mid-dot separated. Proof, not decoration. */}
              {methods.length > 0 && (
                <p className="mt-3 text-sm tracking-wide">
                  {methods.slice(0, 4).map((m, i, arr) => (
                    <span key={m}>
                      <span className="font-medium text-text/55">{m}</span>
                      {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                    </span>
                  ))}
                </p>
              )}

              {/* Explicit CTA — same affordance on every row, works on touch */}
              <p
                className="mt-4 mb-0 inline-flex items-center gap-1.5 text-2xs font-black
                           uppercase tracking-[0.2em] text-primary-600
                           transition-transform duration-300 group-hover:translate-x-1"
              >
                Read case study
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </p>
            </div>

            {/* Headline stat — FIXED-WIDTH column, top-aligned.
                Every card's number now sits on the same vertical axis. */}
            <div className="hidden sm:flex w-[190px] shrink-0 flex-col items-end self-start pt-1">
              {headline && (
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-3xl leading-none text-text
                                   transition-colors duration-300 group-hover:text-primary-600">
                    {headline.value}
                  </span>
                  <span className="text-2xs uppercase tracking-wider text-text/55 max-w-[10ch] leading-tight text-right">
                    {headline.label}
                  </span>
                </div>
              )}
              <motion.svg
                className="mt-3 w-4 h-4 text-primary-600"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </motion.svg>
            </div>
          </div>

          {/* Mobile headline stat — same quiet treatment */}
          {headline && (
            <div className="flex sm:hidden items-baseline gap-2 mt-4 pl-[calc(1rem+10px)]">
              <span className="font-display font-extrabold text-2xl leading-none text-text">
                {headline.value}
              </span>
              <span className="text-2xs uppercase tracking-wider text-text/55">
                {headline.label}
              </span>
            </div>
          )}
        </div>

        {/* ── Expanded panel ── */}
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
                <Field label="Role">
                  <p className="text-sm font-semibold text-text/85 leading-snug">{project.role}</p>
                </Field>
              )}
              {project.timeline && (
                <Field label="Timeline">
                  <p className="font-mono text-xs text-text/55">{project.timeline}</p>
                </Field>
              )}
            </div>

            <div className="md:col-start-5 md:col-span-4 flex flex-col gap-5">
              {project.tagline && (
                <Field label="Context">
                  <p className="text-xs text-text/60 leading-relaxed">{project.tagline}</p>
                </Field>
              )}
              {rest.length > 0 && (
                <Field label="Further impact">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {rest.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-1.5">
                        <span className="font-display font-extrabold text-sm text-primary-600">{m.value}</span>
                        <span className="text-2xs text-text/55 uppercase tracking-wider">{m.label}</span>
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
                    className="w-full h-full object-cover grayscale
                               transition-all duration-700 group-hover:grayscale-0"
                  />
                </div>
              )}
              <span className="inline-flex items-center gap-1.5 text-2xs font-extrabold
                               uppercase tracking-[0.18em] text-primary-600">
                View Case Study
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor"
                     strokeWidth="2" viewBox="0 0 24 24">
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