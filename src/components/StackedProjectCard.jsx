// src/components/StackedProjectCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Updated with specified design refinements
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
      {/* Updated font size and tracking per spec */}
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
            {/* Updated font-mono sizing */}
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

              {methods.length > 0 && (
                <p className="mt-3 text-sm tracking-wide">
                  {methods.slice(0, 4).map((m, i, arr) => (
                    <span key={m}>
                      <span className="font-semibold text-secondary-600">{m}</span>
                      {i < arr.length - 1 && <span className="mx-2 text-primary/40">·</span>}
                    </span>
                  ))}
                </p>
              )}
            </div>

            <div className="hidden sm:flex flex-col items-end shrink-0 self-center">
              {headline && (
                <div className="flex items-baseline gap-2">
                  <span className="ink-highlight font-display font-extrabold text-2xl leading-none">
                    {headline.value}
                  </span>
                  <span className="text-2xs uppercase tracking-wider text-text/55 max-w-[8ch] leading-tight">
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

          {headline && (
            <div className="flex sm:hidden items-baseline gap-2 mt-4 pl-[calc(1rem+10px)]">
              <span className="ink-highlight font-display font-extrabold text-2xl leading-none">
                {headline.value}
              </span>
              <span className="text-2xs uppercase tracking-wider text-text/55">
                {headline.label}
              </span>
            </div>
          )}
        </div>

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
            
            {/* ... remaining image logic ... */}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}