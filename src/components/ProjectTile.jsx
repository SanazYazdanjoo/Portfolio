// Grid-view counterpart to StackedProjectCard: same data and domain-spine
// language, but a self-contained tile instead of a full-bleed row. Used by
// the Projects page's tile-grid view so every case study is visible at a
// glance without hover-to-expand.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";
import { ProjectPicture } from "./ProjectPicture";
import { EASE } from "../utils/motion";


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
      className={`group relative flex h-full flex-col border rule-frame [--rule-fill-color:var(--bg)]
                 transition-all duration-[250ms] ease-smooth
                 ${isComingSoon ? "opacity-60" : "hover:-translate-y-1 hover:shadow-lg"}`}
    >
      {/* Domain spine — neutral at rest, colors in on hover. Its width never
          changes: one nib drew this site, and a mark that fattens under the
          pointer is a second one. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-[5px] w-full bg-border rule-stroke transition-colors duration-200
                   group-hover:bg-[var(--card-spine)]"
      />

      {/* Thumbnail well. The artwork is a transparent PNG, so the box paints
          no fill of its own and the dot pattern behind it shows through the
          illustration instead of being hidden by it. The pattern is its own
          layer rather than a class on the box because .bg-dots inverts
          itself in dark mode, and that filter would drag the artwork with it
          if the two shared an element. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-transparent border-b">
        <div
          aria-hidden="true"
          className="bg-dots absolute inset-0"
          /* The utility's 200px default assumes a full-width field; across a
             tile this wide that leaves barely two marks and reads as noise,
             so this use takes the size knob down. */
          style={{ "--dots-size": "140px" }}
        />
        {hasImage ? (
          <ProjectPicture
            src={project.thumbnail}
            webpSrc={project.thumbnailWebp}
            alt={project.title}
            onError={() => setImgError(true)}
            className={`relative h-full w-full object-cover transition-transform duration-[250ms] ease-smooth group-hover:scale-[1.04] ${
              isComingSoon ? "grayscale" : ""
            }`}
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center">
            <span className="font-mono text-2xs uppercase text-dim">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* The rule under the thumbnail rides on THIS block, not on the well
          above: the well clips to its own box, and a photo would cover a line
          drawn inside it. Here the tile lands in the padding, clear of both. */}
      <div className="rule-t flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs font-bold tabular-nums text-primary-600 shrink-0 mt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          {isComingSoon && (
            <span
              className="shrink-0 border rule-frame px-2.5 py-1 text-2xs font-black uppercase text-dim"
            >
              {t("projects.comingSoon")}
            </span>
          )}
          {isInProgress && (
            <span
              className="shrink-0 border rule-frame px-2.5 py-1 text-2xs font-black uppercase text-primary-600"
              style={{ "--rule-line-color": "var(--primary-600)" }}
            >
              {t("projects.inProgress")}
            </span>
          )}
        </div>

        <h2
          className={`font-display text-xl font-extrabold uppercase leading-tight tracking-[-0.01em] line-clamp-3 transition-colors duration-200
                     ${isComingSoon ? "text-text-meta" : "text-text group-hover:text-primary-600"}`}
        >
          {project.title}
        </h2>

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
        className="block h-full outline-none focus-ring"
      >
        {inner}
      </Link>
    </motion.div>
  );
}
