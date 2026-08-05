// src/components/ProjectTile.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Grid-view counterpart to StackedProjectCard — same data, same domain-spine
// language, but a self-contained tile instead of a full-bleed row. Used by
// the Projects page's 2-column "tile view" so every case study is visible
// at a glance without hover-to-expand.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

const DOMAIN_SPINES = {
  attention:     "var(--primary)",
  collaboration: "var(--highlight)",
  affective:     "var(--secondary)",
  _default:      "var(--blush)",
};

export function ProjectTile({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  if (!project) return null;

  const isComingSoon = project.status === "coming-soon";
  const spine = DOMAIN_SPINES[project.domain] || DOMAIN_SPINES._default;
  const hasImage = project.thumbnail && !imgError;
  const methods = project.methods || project.tags || [];
  const headline = project.metrics?.[0];
  const blurb = project.tagline || project.subtitle || project.challenge;

  const inner = (
    <div
      className={`group relative flex h-full flex-col overflow-hidden border border-border bg-bg
                 ${isComingSoon ? "opacity-60" : ""}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1.5 w-full transition-all duration-300 group-hover:h-2"
        style={{ backgroundColor: spine }}
      />

      <div className="aspect-video w-full overflow-hidden bg-primary/[0.03]">
        {hasImage ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover transition-all duration-700 ${
              isComingSoon ? "grayscale" : ""
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-2xs uppercase tracking-widest text-text/25">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col gap-3 p-6 bg-muted transition-colors duration-300
                   ${isComingSoon ? "" : "group-hover:bg-blush-weak"}`}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs font-bold tabular-nums text-primary-600 shrink-0 mt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          {isComingSoon && (
            <span
              className="shrink-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-dim"
              style={{ border: "1px solid var(--border)" }}
            >
              {t("projects.comingSoon")}
            </span>
          )}
        </div>

        <h3
          className={`font-display text-xl font-extrabold uppercase leading-tight tracking-[-0.01em] transition-colors duration-300
                     ${isComingSoon ? "text-text/45" : "text-text group-hover:text-primary-600"}`}
        >
          {project.title}
        </h3>

        {blurb && (
          <p className={`text-sm leading-relaxed line-clamp-2 ${isComingSoon ? "text-text/35" : "text-text/70"}`}>
            {blurb}
          </p>
        )}

        {methods.length > 0 && (
          <p className="mt-auto pt-2 text-xs tracking-wide">
            {methods.slice(0, 3).map((m, i, arr) => (
              <span key={m}>
                <span className={`font-medium ${isComingSoon ? "text-text/30" : "text-text/60"}`}>{m}</span>
                {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
              </span>
            ))}
          </p>
        )}

        {!isComingSoon && headline && (
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-display text-lg font-extrabold leading-none text-text transition-colors duration-300 group-hover:text-primary-600">
              {headline.value}
            </span>
            <span className="text-2xs uppercase tracking-[0.1em] text-text/60">
              {headline.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: Math.min(index, 5) * 0.06, duration: 0.45 },
  };

  if (isComingSoon) {
    return (
      <motion.div {...motionProps} aria-disabled="true">
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps}>
      <Link
        to={`/projects/${project.id}`}
        className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {inner}
      </Link>
    </motion.div>
  );
}
