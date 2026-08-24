// Tag chips, exactly as the reference draws them: mono 12px at .08em,
// uppercase, a 1px hairline in the border token, fully rounded, 5/12
// padding. Capitals are legitimate here because this is the label role —
// the only role in the system allowed them.
import React from "react";

const CHIP =
  "inline-block text-tag font-mono uppercase text-text-meta " +
  "border border-border rounded-full px-s12 py-s5";

export function SkillTagRow({ tags, className = "" }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-s8 ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className={CHIP}>{tag}</span>
      ))}
    </div>
  );
}
