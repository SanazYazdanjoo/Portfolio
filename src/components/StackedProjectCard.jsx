// src/components/StackedProjectCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Ink & Bloom edition — clean white rows, palette on the things that matter.
//
// The color system survives, but inverted: instead of full-bleed tinted bands
// (which read as dead grey stripes on a white page), each row is a white sheet
// with a colored SPINE on its left edge. Color still encodes research DOMAIN:
//
//   attention     → coral  (gaze, multi-display, attention)
//   collaboration → gold   (hybrid work, social, CSCW)
//   affective     → rose   (emotion, care, HRI)
//
// Add `domain` to each project in projects.js. Without it, the spine falls
// back to blush — visible, but clearly "unclassified".
//
// Impact metrics get the gold highlighter (your signature + your content
// goal: evidence-based impact, literally highlighted). Methods are listed
// in rose — the HCI expertise proof, per your roadmap.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/* Color encodes the research DOMAIN, not list position — a system, not decoration. */
const DOMAIN_COLORS = {
  attention: "var(--primary)",      // coral
  collaboration: "var(--highlight)",// gold
  affective: "var(--secondary)",    // rose
  _default: "var(--blush)",         // unclassified → blush
};

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-text/55 mb-2">
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

  const spine = DOMAIN_COLORS[project.domain] || DOMAIN_COLORS._default;
  const hasImage = project.thumbnail && !imgError;
  const headline = project.metrics?.[0];          // the one number that ALWAYS shows
  const rest = (project.metrics || []).slice(1);  // the others live in the expand
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
        {/* ── Always-visible summary row: white sheet + domain spine ── */}
        <div
          className="relative px-8 md:px-16 py-7 bg-bg border-t border-border
                     transition-colors duration-300 hover:bg-blush-weak group"
        >
          {/* Domain spine — the color system, now a clean 4px edge */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1 md:w-[5px]
                       transition-all duration-300 group-hover:w-2"
            style={{ backgroundColor: spine }}
          />

          <div className="flex items-start gap-6">
            {/* Index — coral, the pen numbering the notebook pages */}
            <span className="font-mono text-[10px] font-bold text-primary-600 tabular-nums mt-2 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">
              <h2
                className="font-display font-black text-2xl md:text-[1.9rem]
                           tracking-[-0.02em] uppercase leading-tight text-text
                           transition-colors duration-300 group-hover:text-primary-600"
              >
                {project.title}
              </h2>

              {/* Methods — the HCI proof, in rose with coral separators */}
              {methods.length > 0 && (
                <p className="mt-3 text-[11px] tracking-wide">
                  {methods.slice(0, 4).map((m, i, arr) => (
                    <span key={m}>
                      <span className="font-semibold text-secondary-600">{m}</span>
                      {i < arr.length - 1 && <span className="mx-2 text-primary/40">·</span>}
                    </span>
                  ))}
                </p>
              )}
            </div>

            {/* Headline metric — YOUR impact, gold-highlighted, never hidden */}
            <div className="hidden sm:flex flex-col items-end shrink-0 self-center">
              {headline && (
                <div className="flex items-baseline gap-2">
                  <span className="ink-highlight font-display font-black text-2xl md:text-3xl leading-none">
                    {headline.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-text/55 max-w-[8ch] leading-tight">
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

          {/* Mobile: headline metric on its own row (no hover on touch) */}
          {headline && (
            <div className="flex sm:hidden items-baseline gap-2 mt-4 pl-[calc(1rem+10px)]">
              <span className="ink-highlight font-display font-black text-2xl leading-none">
                {headline.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-text/55">
                {headline.label}
              </span>
            </div>
          )}
        </div>

        {/* ── Expand: supplementary detail only (desktop hover bonus) ── */}
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
                  <p className="text-[13px] font-semibold text-text/85 leading-snug">{project.role}</p>
                </Field>
              )}
              {project.timeline && (
                <Field label="Timeline">
                  <p className="font-mono text-[11px] text-text/55">{project.timeline}</p>
                </Field>
              )}
            </div>

            <div className="md:col-start-5 md:col-span-4 flex flex-col gap-5">
              {project.tagline && (
                <Field label="Context">
                  <p className="text-[12px] text-text/60 leading-relaxed">{project.tagline}</p>
                </Field>
              )}
              {rest.length > 0 && (
                <Field label="Further impact">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {rest.map((m) => (
                      <div key={m.label} className="flex items-baseline gap-1.5">
                        <span className="font-display font-black text-sm text-primary-600">{m.value}</span>
                        <span className="text-[10px] text-text/55 uppercase tracking-wider">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </Field>
              )}
            </div>

            <div className="md:col-start-9 md:col-span-4 self-end">
              <div className="photo-frame aspect-[16/9] overflow-hidden">
                {hasImage ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover grayscale opacity-90"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-hand text-4xl text-blush">
                    {index + 1}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}