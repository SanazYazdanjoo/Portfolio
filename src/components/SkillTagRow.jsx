// Tag chips: mono 12px at .08em, uppercase, a 1px hairline in the border
// token, fully rounded. Capitals are legitimate here because this is the
// label role — the only role in the system allowed them.
//
// Horizontal padding is 6px, not the reference's 12px. Four tags have to sit
// on one line in a 649px column, and at 12px mono with .08em the text alone
// is most of that: the padding is the only slack there is. Measured against
// the three mono faces this stack can resolve to (Cascadia .586em, Consolas
// .550em, Courier New .600em), 6px leaves the longest row the same headroom
// the shortest one had at 12px.
import React from "react";

// `rule-pill` draws the outline instead of stroking it; --rule-cap tunes the
// curvature of the drawn cap to this chip's radius. The box is the
// reference's: 12px/5px padding, fully rounded, 1px border — transparent,
// because the visible line is painted over it.
const CHIP =
  "inline-block text-tag font-mono uppercase text-text-meta " +
  "border rule-pill [--rule-cap:14px] rounded-full px-s6 py-s5 " +
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
