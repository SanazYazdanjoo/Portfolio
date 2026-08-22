// Static (non-expanding) list row for the Projects page's List view. Same
// data and domain-spine language as StackedProjectCard, but a single row
// that routes straight to the case study instead of a hover-to-expand
// panel.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";
import { ProjectPicture } from "./ProjectPicture";

const EASE = [0.22, 0.61, 0.36, 1];

const DOMAIN_SPINES = {
  attention:     "var(--primary)",
  collaboration: "var(--highlight)",
  affective:     "var(--secondary)",
  _default:      "var(--blush)",
};

export function ProjectListRow({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const isInProgress = project.status === "in-progress";
  const spine = DOMAIN_SPINES[project.domain] || DOMAIN_SPINES._default;
  const hasImage = project.thumbnail && !imgError;
  const tags = project.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index, 10) * 0.06, duration: 0.4, ease: EASE }}
    >
      <Link
        to={`/projects/${project.id}`}
        style={{ "--row-spine": spine }}
        className="group relative flex items-center gap-5 md:gap-8 px-8 md:px-16 py-6 bg-bg border-t rule-t
                   transition-colors duration-200 hover:bg-primary/[0.03] outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {/* Domain spine — neutral at rest, fills with its color on hover so
            the color reads as a hover affordance, not a permanent decoration. */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1 bg-border rule-bar-v transition-all duration-200
                     group-hover:w-1.5 group-hover:bg-[var(--row-spine)]"
        />

        <span className="font-mono text-xs font-bold text-primary-600 tabular-nums shrink-0 self-start mt-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        {isInProgress && (
          <span
            className="hidden md:inline-block shrink-0 self-start mt-0.5 border rule-frame rule-fine px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-primary-600"
            style={{ "--rule-line-color": "var(--primary-600)" }}
          >
            {t("projects.inProgress")}
          </span>
        )}

        {/* Thumbnail well — same treatment as the grid tile: no fill of its
            own, so the transparent-PNG artwork sits on the dot pattern
            rather than on the row's ground. The pattern stays a separate
            layer because .bg-dots inverts itself in dark mode and would
            otherwise invert the artwork along with it. */}
        {hasImage && (
          <div className="relative hidden sm:block w-[220px] md:w-[280px] aspect-[16/10] shrink-0 overflow-hidden bg-transparent border rule-frame-in">
            <div
              aria-hidden="true"
              className="bg-dots absolute inset-0"
              style={{ "--dots-size": "140px" }}
            />
            <ProjectPicture
              src={project.thumbnail}
              webpSrc={project.thumbnailWebp}
              alt={project.title}
              onError={() => setImgError(true)}
              className="relative w-full h-full object-cover transition-transform duration-200 ease-smooth group-hover:scale-[1.04]"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {isInProgress && (
            <span
              className="md:hidden inline-block mb-1.5 border rule-frame rule-fine px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-primary-600"
              style={{ "--rule-line-color": "var(--primary-600)" }}
            >
              {t("projects.inProgress")}
            </span>
          )}
          <h2
            className="font-display font-extrabold text-[24px] uppercase leading-tight text-text
                       line-clamp-2 transition-all duration-200 ease-smooth
                       group-hover:translate-x-0.5 group-hover:text-primary-600"
          >
            {project.title}
          </h2>
          <SkillTagRow tags={tags} className="mt-2" />
        </div>

        <svg
          aria-hidden="true"
          className="hidden sm:block w-5 h-5 text-primary-600 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  );
}
