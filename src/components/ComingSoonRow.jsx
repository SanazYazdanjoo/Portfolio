// Shared by Home and Projects. Same anatomy as StackedProjectCard (index,
// title, methods) so the list reads as one system, but muted and inert —
// no spine, no hover, no route.
//
// "Muted" is carried by the tokens (text-meta title, grey spine, no accent),
// not by opacity. A 60% wash on the row multiplied with a second 60% on the
// tag chips inside it, which put those chips at ~36% ink — roughly 2:1 on
// white. Unbuilt is not the same as unreadable.

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";

export function ComingSoonRow({ project, index }) {
  const { t } = useTranslation();
  const tags = project.tags || [];

  return (
    <div
      aria-disabled="true"
      className="relative flex items-center gap-5 md:gap-8 px-8 md:px-16 py-6 bg-bg border-t rule-t"
    >
      <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-[5px] bg-border rule-stroke-v" />

      <span className="font-mono text-xs font-bold text-text-meta tabular-nums shrink-0 self-start mt-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex-1 min-w-0">
        <h2 className="font-display font-extrabold text-2xl line-clamp-2 tracking-[-0.01em]
                       uppercase leading-tight text-text-meta">
          {project.title}
        </h2>
        <SkillTagRow tags={tags} className="mt-2" />
      </div>

      <span className="hidden sm:inline-block shrink-0 text-xs font-black uppercase tracking-caps
                       text-text-meta border rule-frame px-2.5 py-1">
        {t("projects.comingSoon")}
      </span>
    </div>
  );
}