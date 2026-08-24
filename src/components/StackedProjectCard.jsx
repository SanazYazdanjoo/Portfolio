// The case-study card, matching the design reference plate for plate.
//
//   article   grid-12, 48px top and bottom, one hairline above
//   figure    cols 1-5   — fixed 4:3, paper tint, 1px border, CONTAIN
//   text      cols 6-12  — num/badge, title, meta, outcome, tags, CTA
//
// Every card has the same anatomy: there is no lead variant and no
// text-only variant, so every title starts on the same x-axis and no grid
// column is ever left empty. A card whose asset does not exist yet renders
// the reference's own plate in cols 1-5 — the same box, carrying the crop
// the plate specifies — rather than collapsing the column.
//
// The figure never crops. `object-fit: contain` is the rule; the assets are
// pre-cropped to the named detail and already 4:3 by
// scripts/generate-card-crops.mjs, so contain fills the box exactly.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";
import { HandArrow } from "./HandArrow";
import { EASE } from "../utils/motion";

export function StackedProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const isInProgress = project.status === "in-progress";
  const figure = project.cardImage && !imgError ? project.cardImage : null;
  const tags = project.cardTags || [];
  const meta = [project.year, project.context, project.role].filter(Boolean);

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
      className="grid-12 relative group py-s48 border-t rule-t"
    >
      {/* A card with no asset renders no figure column and no plate. Its text
          takes all twelve columns rather than leaving cols 1-5 standing
          empty — an empty column reads as a missing image, which is the same
          defect a placeholder box was. */}
      {figure && (
        <div className="md:col-span-5">
          <div className="card-figure rule-frame-in">
            <img
              src={figure}
              /* Decorative: the title beside it already names the case study. */
              alt=""
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      )}

      <div
        className={`flex flex-col gap-s16 ${
          figure ? "md:col-start-6 md:col-span-7 mt-s24 md:mt-0" : "md:col-span-12"
        }`}
      >
        <div className="flex items-center gap-s12">
          <span className="text-num font-mono text-primary-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          {isInProgress && (
            <span className="text-badge font-mono uppercase text-primary-600 border rule-frame px-s8 py-s3"
              style={{ "--rule-line-color": "var(--primary-600)" }}>
              {t("projects.inProgress")}
            </span>
          )}
        </div>

        <h3 className="text-card-title font-display font-bold text-text">
          <Link to={`/projects/${project.id}`} className="stretched-link focus-ring">
            {project.title}
          </Link>
        </h3>

        {meta.length > 0 && (
          <p className="text-meta font-mono text-dim">{meta.join(" · ")}</p>
        )}

        {project.cardOutcome && (
          <p className="text-outcome text-text">{project.cardOutcome}</p>
        )}

        <SkillTagRow tags={tags} className="mt-s8" />

        {/* Visual affordance only — the stretched title link is the control. */}
        <span
          aria-hidden="true"
          className="mt-s12 text-cta font-medium uppercase text-primary-600 inline-flex items-center gap-s8"
        >
          {isInProgress ? t("project.card.readInProgress") : t("project.card.readCaseStudy")}
          <HandArrow />
        </span>
      </div>
    </motion.article>
  );
}
