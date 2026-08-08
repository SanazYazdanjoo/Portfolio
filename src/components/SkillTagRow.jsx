// Outline-only, grey micro-chips for a project's full skill-tag list. Same
// chip language as the Bridge skill chips on About (CareerArc.jsx) — border-
// border + text/65, since that CSS var already bakes in its own alpha
// (rgba(...)), unlike Tailwind's color/NN opacity modifier which can't be
// generated for a custom color that isn't split into channel components.
// Deliberately quieter than Badge/TagChip (no fill, no color) since a card
// can carry many tags at once — the row is meant to read as metadata, not
// as another set of colorful UI accents competing with the title.
import React from "react";

export function SkillTagRow({ tags, className = "" }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block rounded-full border border-border px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-text/65"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
