// Outline-only, grey micro-chips for a project's full skill-tag list.
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
          className="rounded-full border border-dim/35 px-2 py-0.5 text-[10px] font-medium leading-normal tracking-wide text-dim"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
