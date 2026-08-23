// Same anatomy as StackedProjectCard — no figure, so cols 1-5 stay empty and
// the text holds cols 6-12 on the shared title axis — but inert: no link, no
// hover, no accent. Muted by tokens, never by opacity.

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";

export function ComingSoonRow({ project, index }) {
  const { t } = useTranslation();
  const tags = project.cardTags || [];

  return (
    <div aria-disabled="true" className="grid-12">
      <div className="md:col-start-6 md:col-span-7">
        <p className="type-label text-text-meta">
          {String(index + 1).padStart(2, "0")}
          <span className="ml-s12">{t("projects.comingSoon")}</span>
        </p>
        <h2 className="mt-s12 type-h3 text-text-meta">{project.title}</h2>
        <SkillTagRow tags={tags} className="mt-s16" />
      </div>
    </div>
  );
}
