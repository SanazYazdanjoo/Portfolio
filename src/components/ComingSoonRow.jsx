// Shared by Home and Projects. Same anatomy as StackedProjectCard (index,
// title, methods) so the list reads as one system, but muted and inert —
// no spine, no hover, no route.

import React from "react";
import { useTranslation } from "../context/LanguageContext";
import { SkillTagRow } from "./SkillTagRow";

export function ComingSoonRow({ project, index }) {
  const { t } = useTranslation();
  const tags = project.tags || [];

  return (
    <div
      aria-disabled="true"
      className="relative flex items-center gap-5 md:gap-8 px-8 md:px-16 py-6 bg-bg border-t border-border opacity-60"
    >
      <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-border" />

      <span className="font-mono text-xs font-bold text-text-meta tabular-nums shrink-0 self-start mt-1">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex-1 min-w-0">
        <h2 className="font-display font-extrabold text-[24px] line-clamp-2 tracking-[-0.01em]
                       uppercase leading-tight text-text-meta">
          {project.title}
        </h2>
        <SkillTagRow tags={tags} className="mt-2 opacity-60" />
      </div>

      <span className="hidden sm:inline-block shrink-0 text-[9px] font-black uppercase tracking-[0.2em]
                       text-text/35 border border-border px-2.5 py-1">
        {t("projects.comingSoon")}
      </span>
    </div>
  );
}