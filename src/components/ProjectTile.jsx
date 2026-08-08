// Grid-view counterpart to StackedProjectCard: same data and domain-spine
// language, but a self-contained tile instead of a full-bleed row. Used by
// the Projects page's tile-grid view so every case study is visible at a
// glance without hover-to-expand.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";

const EASE = [0.22, 0.61, 0.36, 1];

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
  const isInProgress = project.status === "in-progress";
  const spine = DOMAIN_SPINES[project.domain] || DOMAIN_SPINES._default;
  const hasImage = project.thumbnail && !imgError;
  const tags = project.tags || [];

  const inner = (
    <div
      style={{ "--card-spine": spine }}
      className={`group relative flex h-full flex-col overflow-hidden border border-border bg-muted
                 transition-all duration-[250ms] ease-smooth
                 ${isComingSoon ? "opacity-60" : "hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(30,25,20,0.07)]"}`}
    >
      {/* Domain spine — neutral at rest, grows and colors in on hover. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[3px] w-full bg-border transition-all duration-200
                   group-hover:h-[5px] group-hover:bg-[var(--card-spine)]"
      />

      <div className="aspect-[16/10] w-full overflow-hidden bg-muted border-b border-border">
        {hasImage ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            onError={() => setImgError(true)}
            className={`h-full w-full object-cover transition-transform duration-[250ms] ease-smooth group-hover:scale-[1.04] ${
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

      <div className="flex flex-1 flex-col gap-3 p-6">
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
          {isInProgress && (
            <span
              className="shrink-0 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-primary-600"
              style={{ border: "1px solid var(--primary-600)" }}
            >
              {t("projects.inProgress")}
            </span>
          )}
        </div>

        <h3
          className={`font-display text-xl font-extrabold uppercase leading-tight tracking-[-0.01em] line-clamp-3 transition-colors duration-200
                     ${isComingSoon ? "text-text/45" : "text-text group-hover:text-primary-600"}`}
        >
          {project.title}
        </h3>

        <SkillTagRow tags={tags} className={isComingSoon ? "opacity-50" : ""} />
      </div>
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { delay: Math.min(index, 8) * 0.07, duration: 0.4, ease: EASE },
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
