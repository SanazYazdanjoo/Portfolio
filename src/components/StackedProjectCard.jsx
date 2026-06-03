// src/components/StackedProjectCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/* Color encodes the research DOMAIN, not list position — a system, not decoration.
   Add `domain` to each project in your data:
   "attention" | "collaboration" | "affective" (extend freely). */
const DOMAIN_COLORS = {
  attention: "var(--peach)",        // gaze, multi-display, attention
  collaboration: "var(--gold)",     // hybrid work, social, CSCW
  affective: "var(--accent-weak)",  // emotion, care, HRI
  _default: "var(--muted)",
};

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-text/55 mb-2">
        {label}
      </span>
      <div className="border-t border-text/10 pt-2.5">{children}</div>
    </div>
  );
}

export function StackedProjectCard({ project, index }) {
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const color = DOMAIN_COLORS[project.domain] || DOMAIN_COLORS._default;
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
        className="block outline-none focus-visible:ring-2 focus-visible:ring-text/30"
      >
        {/* ── Always-visible summary band: title + methods + headline metric ── */}
        <div
          className="px-8 md:px-16 py-6 border-t border-black/[0.06]"
          style={{ backgroundColor: color }}
        >
          <div className="flex items-start gap-6">
            <span className="font-mono text-[10px] text-black/40 tabular-nums mt-2 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1 min-w-0">
              <h2 className="font-display font-black text-2xl md:text-[1.9rem] tracking-[-0.03em] uppercase leading-tight text-text-display">
                {project.title}
              </h2>

              {methods.length > 0 && (
                <p className="mt-3 text-[11px] tracking-wide text-black/55">
                  {methods.slice(0, 4).map((m, i, arr) => (
                    <span key={m}>
                      <span className="font-semibold text-black/70">{m}</span>
                      {i < arr.length - 1 && <span className="mx-2 text-black/25">·</span>}
                    </span>
                  ))}
                </p>
              )}
            </div>

            {/* Headline metric + chevron — your impact, never hidden */}
            <div className="hidden sm:flex flex-col items-end shrink-0 self-center">
              {headline && (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-black text-2xl md:text-3xl text-black leading-none">
                    {headline.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-black/55 max-w-[8ch] leading-tight">
                    {headline.label}
                  </span>
                </div>
              )}
              <motion.svg
                className="mt-3 w-4 h-4 text-black/40"
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
            <div className="flex sm:hidden items-baseline gap-1.5 mt-4 pl-[calc(1rem+10px)]">
              <span className="font-display font-black text-2xl text-black leading-none">
                {headline.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-black/55">
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
          className="overflow-hidden bg-surface"
        >
          <div className="px-8 md:px-16 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-text/[0.07]">
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
                        <span className="font-display font-black text-sm text-primary">{m.value}</span>
                        <span className="text-[10px] text-text/55 uppercase tracking-wider">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </Field>
              )}
            </div>

            <div className="md:col-start-9 md:col-span-4 self-end">
              <div className="aspect-[16/9] overflow-hidden bg-text/5">
                {hasImage ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover grayscale opacity-80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-4xl italic text-text/[0.05]">
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