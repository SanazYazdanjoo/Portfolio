// Outline-only, grey micro-chips for a project's skill tags. Same chip
// language as the Bridge skill chips on About (CareerArc.jsx) — a hairline
// pill that fills on hover like every other tag chip site-wide, at the 12px
// floor every caps label on this site holds to.
//
// No cap, no counter, no expansion. The homepage card passes the four tags
// it wants shown (`cardTags`) and that is the whole list as far as this
// component is concerned; the full set lives on the detail page and on
// /tags. The "+N more" disclosure this used to render was a second control
// competing with the card's own link for a payload nobody asked for on a
// triage surface.
import React from "react";

const CHIP =
  "inline-block rounded-full border rule-pill [--rule-cap:14px] px-2.5 py-1 " +
  "text-xs font-bold uppercase tracking-caps text-text-meta " +
  "transition-colors duration-200 ease-smooth " +
  "hover:[--rule-line-color:var(--primary-600)] hover:[--rule-fill-color:var(--primary-600)] hover:text-white";

export function SkillTagRow({ tags, className = "" }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span key={tag} className={CHIP}>
          {tag}
        </span>
      ))}
    </div>
  );
}
