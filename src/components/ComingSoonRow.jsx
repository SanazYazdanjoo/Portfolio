// Shared by Home and Projects. Same anatomy as StackedProjectCard (index,
// title, methods) so the list reads as one system, but muted and inert —
// no spine, no hover, no route.

import React from "react";
import { useTranslation } from "../context/LanguageContext";

export function ComingSoonRow({ project, index }) {
  const { t } = useTranslation();
  const methods = project.methods || project.tags || [];

  return (
    <div
      aria-disabled="true"
      className="relative px-8 md:px-16 py-7 bg-bg border-t border-border opacity-60"
    >
      <div className="flex items-start gap-6">
        <span className="font-mono text-2xs font-bold text-text/30 tabular-nums mt-2 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <h2 className="font-display font-extrabold text-2xl tracking-[-0.01em]
                         uppercase leading-tight text-text/45">
            {project.title}
          </h2>
          {methods.length > 0 && (
            <p className="mt-3 text-sm tracking-wide text-text/35">
              {methods.slice(0, 4).join(" · ")}
            </p>
          )}
        </div>

        <span className="shrink-0 mt-2 text-[9px] font-black uppercase tracking-[0.2em]
                         text-text/35 border border-border px-2.5 py-1">
          {t("projects.comingSoon")}
        </span>
      </div>
    </div>
  );
}