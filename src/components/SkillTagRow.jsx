// Outline-only, grey micro-chips for a project's full skill-tag list. Same
// chip language as the Bridge skill chips on About (CareerArc.jsx) — border-
// border + text/65, since that CSS var already bakes in its own alpha
// (rgba(...)), unlike Tailwind's color/NN opacity modifier which can't be
// generated for a custom color that isn't split into channel components.
// Deliberately quieter than Badge/TagChip at rest (grey, no color) since a
// card can carry many tags at once — but still fills on hover like every
// other tag chip site-wide, since these sit inside the card's own link.
import React from "react";

export function SkillTagRow({ tags, className = "" }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block rounded-full border rule-pill [--rule-cap:14px] px-2 py-1 text-2xs font-bold uppercase tracking-wide text-text/65
                     transition-colors duration-200 ease-smooth hover:[--rule-line-color:var(--primary-600)] hover:[--rule-fill-color:var(--primary-600)] hover:text-white"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
