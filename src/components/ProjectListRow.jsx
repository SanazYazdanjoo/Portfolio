// src/components/ProjectListRow.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Normal (non-expanding) list row for the Projects page's List view.
// Same data + domain-spine language as StackedProjectCard, but a single
// static row that routes straight to the case study — no hover-to-expand
// panel. Everything you need to decide is visible at a glance; click to
// read the rest.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const DOMAIN_SPINES = {
  attention:     "var(--primary)",
  collaboration: "var(--highlight)",
  affective:     "var(--secondary)",
  _default:      "var(--blush)",
};

export function ProjectListRow({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const spine = DOMAIN_SPINES[project.domain] || DOMAIN_SPINES._default;
  const hasImage = project.thumbnail && !imgError;
  const headline = project.metrics?.[0];
  const methods = project.methods || project.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 8) * 0.05, duration: 0.4 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group relative flex items-center gap-5 md:gap-8 px-8 md:px-16 py-6 bg-bg border-t border-border
                   transition-colors duration-300 hover:bg-blush-weak outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 transition-all duration-300 group-hover:w-3"
          style={{ backgroundColor: spine }}
        />

        <span className="font-mono text-xs font-bold text-primary-600 tabular-nums shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        {hasImage && (
          <div className="hidden sm:block w-28 md:w-36 aspect-video shrink-0 overflow-hidden border border-border">
            <img
              src={project.thumbnail}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h2
            className="font-display font-extrabold text-lg md:text-xl uppercase leading-tight text-text
                       transition-colors duration-300 group-hover:text-primary-600 truncate"
          >
            {project.title}
          </h2>
          {methods.length > 0 && (
            <p className="mt-1.5 text-xs md:text-sm tracking-wide truncate">
              {methods.slice(0, 3).map((m, i, arr) => (
                <span key={m}>
                  <span className="font-medium text-text/60">{m}</span>
                  {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                </span>
              ))}
            </p>
          )}
        </div>

        {headline && (
          <div className="hidden md:flex w-[150px] shrink-0 flex-col items-end text-right">
            <span className="text-2xs uppercase tracking-[0.1em] text-text/60">
              {headline.label}
            </span>
            <span
              className="mt-1 font-display font-extrabold text-lg leading-none text-text
                         transition-colors duration-300 group-hover:text-primary-600"
            >
              {headline.value}
            </span>
          </div>
        )}

        <svg
          aria-hidden="true"
          className="hidden sm:block w-4 h-4 text-primary-600 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  );
}
