
// One "nothing here" pattern.
//
// There were five: a bare grey line on the tags pages and on Credentials, a
// bare handwritten line on Home, a drawn panel with a pencil icon on Projects,
// and a fourth drawn panel on the Credentials filter. Same moment, four
// different answers — and the bare ones read as a rendering failure rather
// than a state, because nothing frames them.
//
// The panel is the site's own drawn box, and the line is in the hand font:
// an empty state is the one place a site gets to speak in its own voice, so
// it should not be set in the UI label style.
export function EmptyState({ title, children, action, className = "" }) {
  return (
    <div
      className={`enter-up border rule-box px-8 py-14 text-center ${className}`}
      style={{ "--enter-dur": "0.45s" }}
    >
      <p className="doodle-text m-0 text-3xl text-dim">{title}</p>
      {children && (
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-dim">{children}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
