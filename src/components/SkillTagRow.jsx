// Outline-only chips for a project's tags. They are the label step — 13px,
// caps, 0.08em — which is what makes capitals legitimate here: the label
// step is the only place on the page they are allowed.
//
// No cap, no counter, no expansion. The card passes the four tags it shows;
// the full set lives on the detail page and on /tags.
import React from "react";

const CHIP =
  "inline-block rounded-full border rule-pill [--rule-cap:14px] px-s12 py-s4 " +
  "type-label text-text-meta transition-colors duration-200 ease-smooth " +
  "hover:[--rule-line-color:var(--primary-600)] hover:[--rule-fill-color:var(--primary-600)] hover:text-white";

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
