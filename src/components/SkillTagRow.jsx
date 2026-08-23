// Outline-only, grey micro-chips for a project's skill tags. Same chip
// language as the Bridge skill chips on About (CareerArc.jsx) — a hairline
// pill that fills on hover like every other tag chip site-wide.
//
// `max` caps how many chips render before a "+N more" disclosure. It is a
// real disclosure, not a mobile-only affordance like ProjectHeader's: the
// hidden chips are unmounted rather than display:none, and the toggle
// carries aria-expanded, because on a card the full list is genuinely
// somewhere else (the detail page) rather than one breakpoint away.
//
// The toggle is a <button>. Call sites that sit inside a stretched card link
// must give it `relative z-10` (see StackedProjectCard) so the overlay does
// not swallow its clicks — a button nested inside an <a> would be invalid,
// which is why the card uses a stretched link in the first place.
import React, { useState } from "react";
import { useTranslation } from "../context/LanguageContext";

const CHIP =
  "inline-block rounded-full border rule-pill [--rule-cap:14px] px-2.5 py-1 " +
  "text-xs font-bold uppercase tracking-caps text-text-meta " +
  "transition-colors duration-200 ease-smooth";

export function SkillTagRow({ tags, className = "", max }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  if (!tags || tags.length === 0) return null;

  const capped = typeof max === "number" && max > 0 && tags.length > max;
  const shown = capped && !expanded ? tags.slice(0, max) : tags;
  const hiddenCount = capped ? tags.length - max : 0;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {shown.map((tag) => (
        <span
          key={tag}
          className={`${CHIP} hover:[--rule-line-color:var(--primary-600)] hover:[--rule-fill-color:var(--primary-600)] hover:text-white`}
        >
          {tag}
        </span>
      ))}

      {capped && (
        <button
          type="button"
          onClick={(e) => {
            // The chip row can sit under a stretched card link; without this
            // the toggle would navigate instead of expanding.
            e.preventDefault();
            e.stopPropagation();
            setExpanded((open) => !open);
          }}
          aria-expanded={expanded}
          aria-label={
            expanded
              ? t("project.meta.fewerSkills")
              : t("project.meta.showAllSkills").replace("{n}", tags.length)
          }
          className={`${CHIP} no-print [--rule-line-color:var(--text-meta)] focus-ring
                      hover:[--rule-line-color:var(--primary-600)] hover:text-primary-600`}
        >
          {expanded ? t("project.meta.fewerSkills") : `+${hiddenCount} ${t("project.meta.moreSkills")}`}
        </button>
      )}
    </div>
  );
}
