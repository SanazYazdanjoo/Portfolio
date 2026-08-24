// The card anatomy with nothing to link to and no asset: no figure column,
// text in cols 6-12 on the same title axis as every other card, and inert —
// no link, no hover, no accent. Muted by tokens, never by opacity.
//
// It renders no plate. A box whose content is a caption about which image
// belongs in it is instruction text, and instruction text is not UI.

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";

export function ComingSoonRow({ project, index }) {
  const { t } = useTranslation();
  const tags = project.cardTags || [];

  return (
    <div aria-disabled="true" className="grid-12 py-s48 border-t rule-t">
      <div className="md:col-start-6 md:col-span-7 flex flex-col gap-s16">
        <div className="flex items-center gap-s12">
          <span className="text-num font-mono text-text-dim">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-badge font-mono uppercase text-text-dim border rule-frame px-s8 py-s3">
            {t("projects.comingSoon")}
          </span>
        </div>
        <h3 className="text-card-title font-display font-bold text-text-meta">{project.title}</h3>
        <SkillTagRow tags={tags} className="mt-s8" />
      </div>
    </div>
  );
}
