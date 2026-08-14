// The header caps its reading measure at 720px, but the title is
// deliberately let out to the full content column: it has to hold one line
// whatever its length, and every extra pixel of width buys it type size.

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "../../components/Badge";
import { useTranslation } from "../../context/LanguageContext";
import { FitTitle } from "./FitTitle";
import { ContributionRow } from "./ContributionRow";
import { EASE } from "./constants";

export function ProjectHeader({ meta, tags }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

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
          <span className="inline-flex items-center gap-2 border border-border px-2.5 py-1">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-primary-600"
            />
            <span className="text-2xs font-black uppercase tracking-[0.2em] text-primary-600">
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
        <p className="max-w-[720px] text-lg md:text-xl text-text/60 font-medium leading-relaxed mb-8">
          {meta.tagline}
        </p>
      )}

      {/* Meta block — Role, Timeline, Skills. Runs the full content
          column rather than the 720px reading measure: its values are
          short labels and chips, and giving the skill tags the whole
          width lets them wrap into far fewer rows. The one long-form
          value in here, the contribution lists, keeps its own measure. */}
      {(meta.role || meta.timeline || tags.length > 0) && (
        <dl className="border-t border-border">
          {meta.role && (
            <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4 border-b border-border">
              <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
                {t("project.meta.role")}
              </dt>
              <dd className="text-sm text-text font-medium">{meta.role}</dd>
            </div>
          )}
          {meta.myContribution && <ContributionRow contribution={meta.myContribution} />}
          {meta.timeline && (
            <div className={`grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4 ${tags.length > 0 ? "border-b border-border" : ""}`}>
              <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
                {t("project.meta.timeline")}
              </dt>
              <dd className="font-mono text-sm text-text">{meta.timeline}</dd>
            </div>
          )}
          {tags.length > 0 && (
            <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-4">
              <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
                {t("project.meta.skills")}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`}>
                    <Badge tone="accent">{tag}</Badge>
                  </Link>
                ))}
              </dd>
            </div>
          )}
        </dl>
      )}
    </motion.header>
  );
}
