import { Link } from "react-router-dom";

const isInternalPath = (url) => /^\/(?!\/)/.test(url);

// The one gold mark on a case-study page. Nothing else here uses the
// highlighter, so a live, clickable build is the single thing wearing it —
// that is the point of the "once per page" rule, not an exception to it.
// Gold is a background token, never a text colour, so the label is ink in
// both themes (same reasoning as .ink-highlight in theme.css). Print drops
// the fill back to an outline rather than laying down a solid gold block.
export function PrototypeLink({ href, label }) {
  const className = "mt-6 inline-flex items-center gap-2 border-2 border-highlight bg-highlight px-5 py-3 " +
    "text-2xs font-black uppercase tracking-[0.2em] text-highlight-on " +
    "shadow-sm transition duration-200 " +
    "hover:bg-highlight/85 hover:-translate-y-0.5 hover:shadow-md " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-highlight focus-visible:ring-offset-bg " +
    "print:bg-transparent print:border-border print:text-text print:shadow-none";
  const icon = (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );

  if (isInternalPath(href)) {
    return (
      <Link to={href} className={className}>
        {label}
        {icon}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      {icon}
    </a>
  );
}
