// The header caps its reading measure at 720px, but the title is
// deliberately let out to the full content column: it has to hold one line
// whatever its length, and every extra pixel of width buys it type size.

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "../../components/Badge";
import { useTranslation } from "../../context/LanguageContext";
import { FitTitle } from "./FitTitle";
import { ContributionRow } from "./ContributionRow";
import { EASE } from "./constants";
import { useFlownTags } from "./SkillOrbit";

// How many skill chips a phone shows before the "+N more" disclosure. The
// cap is a small-screen affordance only — from `sm` up the full list renders
// and the toggle is not there at all, because at that width the chips already
// pack into a few rows.
//
// A cap and not a cull: every tag is pinned to a `tagEvidence` entry (enforced
// both ways in data/projects.test.js), feeds the count on /tags, and is what
// puts this project on its tag page. Eleven of this case study's tags are
// shared with other projects — React, TypeScript, Thematic Analysis and
// Stakeholder Interviews among them — so deleting the ones that look like
// duplicates of `techStack` or `methods` would quietly drop the project out of
// eight tag pages that genuinely aggregate more than one project. The list
// being long is editorial; the header being 1,864px tall was the bug.
const MOBILE_TAG_CAP = 8;

export function ProjectHeader({ meta, tags }) {
  // Tags currently orbiting a section below leave a gap here on purpose:
  // one element per tag, so the pill in the rail IS this pill, moved.
  const flownTags = useFlownTags();
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const [allTagsShown, setAllTagsShown] = useState(false);
  const hiddenTagCount = Math.max(0, tags.length - MOBILE_TAG_CAP);

  return (
    <motion.header
      className="mb-12"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Live-stage chip */}
      {meta.stage && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 border rule-frame px-2.5 py-1">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rule-dot bg-primary-600"
            />
            <span className="text-2xs font-black uppercase text-primary-600">
              {meta.stage}
            </span>
          </span>
        </div>
      )}

      <FitTitle className="font-display text-4xl md:text-6xl font-extrabold text-text
                           tracking-tighter leading-tight mb-5">
        {meta.title}
      </FitTitle>

      {meta.tagline && (
        <p className="max-w-[720px] text-lg md:text-xl text-dim font-medium leading-relaxed mb-8">
          {meta.tagline}
        </p>
      )}

      {/* Meta block — Role, Timeline, Skills. Runs the full content
          column rather than the 720px reading measure: its values are
          short labels and chips, and giving the skill tags the whole
          width lets them wrap into far fewer rows. The one long-form
          value in here, the contribution lists, keeps its own measure.

          The label/value split is a two-column grid only from `sm` up. On a
          phone the fixed label column left roughly 200px for the value, which
          is narrower than most of the chips: 28 skill tags came out as 27
          separate rows, 1,159px of near-identical pills in a 665px viewport,
          and the header as a whole ran 1,864px before a reader reached any
          prose. Below `sm` the label now sits above its value and the chips
          get the full column. Note this is a layout fix only — how many tags
          there are is an editorial question, and each one is pinned to a
          `tagEvidence` entry (enforced in data/projects.test.js). */}
      {(meta.role || meta.timeline || tags.length > 0 || meta.aiAssistance) && (
        <dl className="border-t rule-t">
          {meta.role && (
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[140px_1fr] sm:gap-4 py-4 border-b rule-b">
              <dt className="text-2xs font-black uppercase text-primary-600 pt-0.5">
                {t("project.meta.role")}
              </dt>
              <dd className="text-sm text-text font-medium">{meta.role}</dd>
            </div>
          )}
          {meta.myContribution && <ContributionRow contribution={meta.myContribution} />}
          {meta.timeline && (
            <div className={`grid grid-cols-1 gap-1.5 sm:grid-cols-[140px_1fr] sm:gap-4 py-4 ${tags.length > 0 ? "border-b rule-b" : ""}`}>
              <dt className="text-2xs font-black uppercase text-primary-600 pt-0.5">
                {t("project.meta.timeline")}
              </dt>
              <dd className="font-mono text-sm text-text">{meta.timeline}</dd>
            </div>
          )}
          {tags.length > 0 && (
            <div className={`grid grid-cols-1 gap-1.5 sm:grid-cols-[140px_1fr] sm:gap-4 py-4 ${meta.aiAssistance ? "border-b rule-b" : ""}`}>
              <dt className="text-2xs font-black uppercase text-primary-600 pt-0.5">
                {t("project.meta.skills")}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  /* Hidden with `display: none` rather than clipped, so a
                     screen reader on a phone reads the same list a sighted
                     reader sees — the toggle is a real disclosure. The class
                     sits on the wrapper, not the link: a hidden link inside a
                     shown flex child would still spend a gap.

                     `flownTags` is the orbit's half of the same rule — a tag
                     that has flown to the section rail is not rendered twice,
                     it is rendered there. The shared layoutId is what carries
                     it between the two places. */
                  <motion.div
                    key={tag}
                    layout="position"
                    layoutId={`skill-pill-${tag}`}
                    className={
                      flownTags.has(tag)
                        ? "hidden"
                        : i >= MOBILE_TAG_CAP && !allTagsShown
                          ? "hidden sm:block"
                          : undefined
                    }
                  >
                    <Link to={`/tags/${encodeURIComponent(tag)}`}>
                      <Badge tone="accent">{tag}</Badge>
                    </Link>
                  </motion.div>
                ))}

                {hiddenTagCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setAllTagsShown((shown) => !shown)}
                    aria-expanded={allTagsShown}
                    aria-label={
                      allTagsShown
                        ? t("project.meta.fewerSkills")
                        : t("project.meta.showAllSkills").replace("{n}", tags.length)
                    }
                    className="sm:hidden no-print inline-flex items-center rounded-full border-[1.5px]
 rule-pill [--rule-line-color:var(--text-meta)] bg-transparent px-3 py-1 text-xs
 font-semibold tracking-wide text-text-meta transition-colors
 duration-200 ease-smooth hover:[--rule-line-color:var(--primary-600)] hover:text-primary-600 focus-ring"
                  >
                    {allTagsShown
                      ? t("project.meta.fewerSkills")
                      : `+${hiddenTagCount} ${t("project.meta.moreSkills")}`}
                  </button>
                )}
              </dd>
            </div>
          )}

          {/* AI-assistance disclosure. Last row of the metadata block rather
              than a footer note: a disclosure that has to be scrolled past the
              prev/next cards to be found is not a disclosure. It is deliberately
              styled as metadata — same <dt> as Role and Timeline, no warning
              colour, no icon, no toggle — because it states how the work was
              made, which is the same kind of fact as who made it and when. The
              long-form value keeps its own reading measure, following the
              ContributionRow precedent in this same list. Optional: projects
              without the field render nothing and get no empty row. */}
          {meta.aiAssistance && (
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[140px_1fr] sm:gap-4 py-4"
                 style={{ breakInside: "avoid" }}>
              <dt className="text-2xs font-black uppercase text-primary-600 pt-0.5">
                {t("project.meta.aiAssistance")}
              </dt>
              <dd className="max-w-measure transition-[max-width] duration-300 ease-smooth text-sm leading-relaxed text-text-meta">
                {meta.aiAssistance}
              </dd>
            </div>
          )}
        </dl>
      )}
    </motion.header>
  );
}
