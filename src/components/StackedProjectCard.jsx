// A homepage case-study row: thumbnail, then index → title → metadata →
// outcome → capped tags → CTA. Everything a reader needs to triage the
// project is on the collapsed card; nothing is behind a hover.
//
// The row used to be a single <Link> wrapping a hover-expand panel that
// carried role, timeline, context, metrics and the thumbnail. That panel is
// gone: it was unreachable on touch, it hid the only quantified thing on the
// card behind a pointer event, and its chevron promised an expansion that
// the tag disclosure now does honestly. Role, context and year moved into
// the metadata row; the metrics condensed into `cardOutcome`, one sentence
// per project (see each src/projects/*/data.js).
//
// Because the tag disclosure is a real <button>, the row can no longer be
// one big <a> — a button inside a link is invalid. The title link instead
// stretches over the card with an inset-0 ::after, and the tag row lifts
// above it with `relative z-10`. Same whole-row click target, one accessible
// name, no nested interactive content.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";
import { EASE } from "../utils/motion";

// How many tags the collapsed card shows. The rest are one click away here,
// and in full on the detail page.
const CARD_TAG_CAP = 5;

export function StackedProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  if (!project || project.status === "coming-soon" || !project.id) return null;

  const isInProgress = project.status === "in-progress";
  // `cardImage`, never `thumbnail`. See the note in each data.js: the
  // Project-N.png thumbnails are generated illustrations, and a card is
  // better with no image at all than with clipart standing in for evidence.
  // No image and no placeholder — the row simply has one column instead of
  // two.
  const hasImage = project.cardImage && !imgError;

  // One list, reordered — not a shortened one. The signal tags lead so the
  // five the card shows are the five worth showing, and the remainder keeps
  // its authored order behind the "+N more" disclosure. Reordering rather
  // than slicing is what makes that disclosure honest: it reveals the rest
  // of the project's tags instead of re-shuffling the same five.
  const allTags = project.tags || [];
  const signal = project.cardTags?.length ? project.cardTags : allTags.slice(0, CARD_TAG_CAP);
  const tags = [...signal, ...allTags.filter((tag) => !signal.includes(tag))];
  // year · context · role — a missing one is dropped rather than rendered as
  // a stray separator.
  const meta = [project.year, project.context, project.role].filter(Boolean);

  return (
    <motion.article
      // Reveal fires as soon as 5% of the row is visible, and settles at a
      // full opacity: 1. The old `margin: "-10%"` plus an uncapped
      // index * 0.06 stagger left the third and fourth rows sitting at a
      // partial opacity long enough to read as a rendering bug rather than
      // an entrance. The delay is capped at two steps for the same reason.
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        delay: reduce ? 0 : Math.min(index, 2) * 0.05,
        duration: reduce ? 0 : 0.35,
        ease: EASE,
      }}
      className="relative bg-bg border-t rule-t transition-colors duration-200 ease-smooth
                 hover:bg-primary/[0.03] group"
    >
      {/* A short accent at the card's top edge, not a full-height rule.
          Run down every card in a five-item list, the same stroke became one
          continuous red line the length of the page and read as the loudest
          element on it. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-10 w-[5px] rule-stroke-v"
        style={{ backgroundColor: "var(--accent-spine)" }}
      />

      {/* Two tracks from 900px up: the artefact at 40%, the text at 60% with
          a 55ch floor so the measure never collapses to fit the image. Below
          900px it is one column and the image stacks above the text. A card
          with no artefact is a single full-width track — nothing is reserved
          for an image that does not exist. */}
      <div
        className={`px-6 md:px-8 py-8 grid gap-6 min-[900px]:gap-10 ${
          hasImage
            ? "min-[900px]:grid-cols-[minmax(0,2fr)_minmax(min(55ch,100%),3fr)]"
            : "grid-cols-1"
        }`}
      >
        {/* Real artefact, or no column at all. */}
        {hasImage && (
          <div className="min-w-0">
            <div className="photo-frame rule-frame-in aspect-video overflow-hidden">
              <img
                src={project.cardImage}
                /* Decorative: the title link right beside it already names
                   the case study, so alt text here would only repeat it. */
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center
                           transition-transform duration-[400ms] ease-smooth
                           motion-safe:group-hover:scale-[1.03]"
              />
            </div>
          </div>
        )}

        {/* Text column */}
        <div className="min-w-0 flex items-start gap-4 md:gap-6">
          <span className="font-mono text-xs font-bold text-primary-600 tabular-nums mt-1 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 flex-wrap">
              {/* 24px floor, 40px on a desktop — the second-loudest thing
                  on the page after the name, and louder than the section
                  label above the list. */}
              <h2 className="font-display font-extrabold text-2xl md:text-3xl
                             tracking-[-0.01em] uppercase leading-tight text-text
                             transition-colors duration-300 group-hover:text-primary-600">
                {/* Stretched link — the whole card is the click target, and
                    the title is its accessible name. */}
                <Link
                  to={`/projects/${project.id}`}
                  className="stretched-link focus-ring"
                >
                  {project.title}
                </Link>
              </h2>
              {isInProgress && (
                <span
                  className="shrink-0 mt-0.5 border rule-frame px-2.5 py-1 text-xs font-black
                             uppercase tracking-caps text-primary-600"
                  style={{ "--rule-line-color": "var(--primary-600)" }}
                >
                  {t("projects.inProgress")}
                </span>
              )}
            </div>

            {/* Metadata — year · context · role */}
            {meta.length > 0 && (
              <p className="mt-2 text-xs text-text-meta leading-relaxed">
                {meta.map((value, i) => (
                  <React.Fragment key={value}>
                    {i > 0 && <span aria-hidden="true" className="mx-2">·</span>}
                    {value}
                  </React.Fragment>
                ))}
              </p>
            )}

            {/* Outcome — the one sentence a reader gets if they read nothing
                else on this card. */}
            {project.cardOutcome && (
              <p className="mt-3 text-body text-text max-w-[62ch]">
                {project.cardOutcome}
              </p>
            )}

            {/* z-10 lifts the "+N more" button above the stretched link. */}
            <SkillTagRow tags={tags} max={CARD_TAG_CAP} className="relative z-10 mt-4" />

            {/* Visual affordance only — the stretched link above is the
                actual control, and a second link here would list every case
                study twice in the tab order. */}
            <p
              aria-hidden="true"
              className="mt-4 mb-0 inline-flex items-center gap-1.5 text-xs font-black
                         uppercase tracking-caps text-primary-600
                         transition-transform duration-200 ease-smooth motion-safe:group-hover:translate-x-1"
            >
              {isInProgress ? t("project.card.readInProgress") : t("project.card.readCaseStudy")}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
