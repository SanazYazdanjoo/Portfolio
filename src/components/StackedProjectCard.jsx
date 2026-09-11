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
// The figure uses the illustrated project thumbnail as its first impression.
// On fine-pointer hover, or keyboard focus within the card, it dissolves into
// the real project artefact with a gentle settling motion. Touch devices never
// depend on this preview: they keep the illustration and navigate on tap.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInViewReveal, revealClass } from "../hooks/useReveal";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";
import { HandArrow } from "./HandArrow";

export function StackedProjectCard({ project, index }) {
  const [illustrationSrc, setIllustrationSrc] = useState(
    project?.thumbnailWebp || project?.thumbnail || null
  );
  const [artefactAvailable, setArtefactAvailable] = useState(Boolean(project?.cardImage));
  const [pointerPreview, setPointerPreview] = useState(false);
  const [focusPreview, setFocusPreview] = useState(false);
  const { t } = useTranslation();
  const [ref, inView] = useInViewReveal({ amount: 0.05 });

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const isInProgress = project.status === "in-progress";
  const artefact = artefactAvailable ? project.cardImage : null;
  const figure = illustrationSrc || artefact;
  const canPreviewArtefact = Boolean(illustrationSrc && artefact);
  const showArtefact = canPreviewArtefact && (pointerPreview || focusPreview);
  const tags = project.cardTags || [];
  const meta = [project.year, project.context, project.role].filter(Boolean);
  const previewTransition = {
    transitionProperty: "opacity, transform",
    transitionDuration: "1400ms",
    transitionTimingFunction: "var(--timing-smooth)",
  };

  const supportsFineHover = () =>
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches);

  const handleMouseEnter = () => {
    if (canPreviewArtefact && supportsFineHover()) setPointerPreview(true);
  };

  const handleMouseLeave = () => setPointerPreview(false);

  const handleFocusCapture = () => {
    if (canPreviewArtefact) setFocusPreview(true);
  };

  const handleBlurCapture = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusPreview(false);
  };

  const handleIllustrationError = () => {
    if (
      illustrationSrc === project.thumbnailWebp &&
      project.thumbnail &&
      project.thumbnail !== project.thumbnailWebp
    ) {
      setIllustrationSrc(project.thumbnail);
      return;
    }
    setIllustrationSrc(null);
  };

  return (
    <article
      ref={ref}
      style={{ "--reveal-delay": `${Math.min(index, 2) * 0.05}s` }}
      className={`${revealClass(inView)} grid-12 relative group py-s48 border-t rule-t`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
    >
      {/* A card with no asset renders no figure column and no plate. Its text
          takes all twelve columns rather than leaving cols 1-5 standing
          empty — an empty column reads as a missing image, which is the same
          defect a placeholder box was. */}
      {figure && (
        <div className="md:col-span-5">
          <div className="card-figure rule-frame-in">
            <div className="relative w-full h-full">
              {illustrationSrc ? (
                <img
                  src={illustrationSrc}
                  /* Decorative: the title beside it already names the case study. */
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={handleIllustrationError}
                  style={previewTransition}
                  className={`block w-full h-full object-contain motion-reduce:transform-none ${
                    showArtefact
                      ? "opacity-0 scale-[0.97] -translate-y-[4px]"
                      : "opacity-100 scale-100 translate-y-0"
                  }`}
                />
              ) : (
                <img
                  src={artefact}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => setArtefactAvailable(false)}
                  className="block w-full h-full object-contain"
                />
              )}

              {canPreviewArtefact && (
                <img
                  src={artefact}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => setArtefactAvailable(false)}
                  style={previewTransition}
                  className={`absolute inset-0 block w-full h-full object-contain pointer-events-none motion-reduce:transform-none ${
                    showArtefact
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-[1.03] translate-y-[4px]"
                  }`}
                />
              )}
            </div>
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

        {/* Proof points, data-gated: only a card that declares cardStats
            grows this row, so the other cards keep their anatomy. */}
        {Array.isArray(project.cardStats) && project.cardStats.length > 0 && (
          <dl className="flex flex-wrap gap-x-s24 gap-y-s8">
            {project.cardStats.map((stat) => (
              <div key={stat.value} className="flex items-baseline gap-s6">
                <dt className="text-num font-mono text-primary-600">{stat.value}</dt>
                <dd className="text-meta font-mono text-dim">{stat.label}</dd>
              </div>
            ))}
          </dl>
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
    </article>
  );
}
