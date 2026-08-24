// Tag chips, exactly as the reference draws them: mono 12px at .08em,
// uppercase, a 1px hairline in the border token, fully rounded, 5/12
// padding. Capitals are legitimate here because this is the label role —
// the only role in the system allowed them.
import React from "react";

// `rule-pill` draws the outline instead of stroking it; --rule-cap tunes the
// curvature of the drawn cap to this chip's radius. The box is the
// reference's: 12px/5px padding, fully rounded, 1px border — transparent,
// because the visible line is painted over it.
const CHIP =
  "inline-block text-tag font-mono uppercase text-text-meta " +
  "border rule-pill [--rule-cap:14px] rounded-full px-s12 py-s5 " +
  "transition-colors duration-200 ease-smooth " +
  "hover:[--rule-line-color:var(--primary-600)] hover:text-primary-600";

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
