// ONE card anatomy, on the page's 12-column grid.
//
//   figure   cols 1-5      text   cols 6-12
//
// A card with no figure leaves cols 1-5 empty and keeps its text in cols
// 6-12, so every title in the list starts on the same x-axis. Text never
// reflows leftward to fill a missing image — a ragged left edge down the list
// costs more than the whitespace saves.
//
// The one exception is the lead card, the page's single deliberate emphasis
// (see `lead`): its figure takes cols 1-7 and its title steps up one type
// step, h3 to h2. That does move the lead's title off the shared axis, and
// it is the only card allowed to.
//
// Every length here is a scale token (p-s24, gap-s16, mt-s12) or a type step
// (type-h2, text-body, type-label). There are no other values.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";
import { EASE } from "../utils/motion";

export function StackedProjectCard({ project, index, lead = false }) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const isInProgress = project.status === "in-progress";
  const hasFigure = project.cardImage && !imgError;
  const crop = project.cardCrop || {};
  const tags = project.cardTags || [];
  const meta = [project.year, project.context, project.role].filter(Boolean);

  const figureCols = lead ? "md:col-span-7" : "md:col-span-5";
  const textCols = lead ? "md:col-start-8 md:col-span-5" : "md:col-start-6 md:col-span-7";

  return (
    <motion.article
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        delay: reduce ? 0 : Math.min(index, 2) * 0.05,
        duration: reduce ? 0 : 0.35,
        ease: EASE,
      }}
      className="grid-12 relative group"
    >
      {hasFigure && (
        <div className={`${figureCols} mb-s24 md:mb-0`}>
          <div className="card-figure">
            <img
              src={project.cardImage}
              /* Decorative: the title beside it already names the case study. */
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              style={{
                "--crop-x": crop.x,
                "--crop-y": crop.y,
                "--crop-zoom": crop.zoom,
              }}
            />
          </div>
        </div>
      )}

      <div className={textCols}>
        <p className="type-label text-primary-600">
          {String(index + 1).padStart(2, "0")}
          {isInProgress && (
            <span className="ml-s12 text-text-meta">{t("projects.inProgress")}</span>
          )}
        </p>

        {/* Sentence case: capitals belong to the label step and nowhere else. */}
        <h2
          className={`mt-s12 ${lead ? "type-h2" : "type-h3"} text-text
                      transition-colors duration-200 group-hover:text-primary-600`}
        >
          <Link to={`/projects/${project.id}`} className="stretched-link focus-ring">
            {project.title}
          </Link>
        </h2>

        {/* 24px under the title block, then 16px between everything below it. */}
        {meta.length > 0 && (
          <p className="mt-s24 text-small text-text-meta">
            {meta.map((value, i) => (
              <React.Fragment key={value}>
                {i > 0 && <span aria-hidden="true" className="px-s8">·</span>}
                {value}
              </React.Fragment>
            ))}
          </p>
        )}

        {project.cardOutcome && (
          <p className="mt-s16 text-body text-text">{project.cardOutcome}</p>
        )}

        <SkillTagRow tags={tags} className="mt-s16" />

        {/* Visual affordance only — the stretched title link is the control. */}
        <p
          aria-hidden="true"
          className="mt-s24 inline-flex items-center gap-s8 type-label text-primary-600"
        >
          {isInProgress ? t("project.card.readInProgress") : t("project.card.readCaseStudy")}
          <svg className="w-s16 h-s16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </p>
      </div>
    </motion.article>
  );
}
