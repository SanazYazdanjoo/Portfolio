// The card anatomy with nothing to link to: the plate holds cols 1-5 so the
// column is never empty, and the text keeps cols 6-12 on the shared title
// axis. Muted by tokens, never by opacity.

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";

export function ComingSoonRow({ project, index }) {
  const { t } = useTranslation();
  const tags = project.cardTags || [];

  return (
    <div aria-disabled="true" className="grid-12 py-s48 border-t border-border">
      <div className="md:col-span-5">
        <div className="card-figure card-figure--plate">
          <span className="text-plate uppercase font-mono text-text-dim">
            {t("projects.comingSoon")}
          </span>
        </div>
      </div>
      <div className="md:col-start-6 md:col-span-7 flex flex-col gap-s16 mt-s24 md:mt-0">
        <div className="flex items-center gap-s12">
          <span className="text-num font-mono text-text-dim">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-badge font-mono uppercase text-text-dim border border-border px-s8 py-s3">
            {t("projects.comingSoon")}
          </span>
        </div>
        <h3 className="text-card-title font-display font-bold text-text-meta">{project.title}</h3>
        <SkillTagRow tags={tags} className="mt-s8" />
      </div>
    </div>
  );
}
