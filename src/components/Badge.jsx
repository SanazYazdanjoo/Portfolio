// Notebook-tag chips. Outline by default (ink border, no fill) — the chip
// fills solid only on hover, so "filled" reads as an interaction cue rather
// than a resting state. Text always sits at AA contrast: ink or the -600
// accent shades at rest; white (or ink, for the pale highlight tone) once
// filled.
export function Badge({ tone = "accent", children, className = "" }) {
  // The outline is drawn, not stroked: .rule-pill masks a hand-drawn stadium
  // over --rule-line-color, so a tone sets that variable instead of a
  // border-color. The border itself stays (transparent) purely for layout.
  // The hover fill goes through --rule-fill-color for the same reason: a
  // `bg-*` would paint a hard pill underneath the drawn one.
  //
  // NOTE: no "/NN" opacity modifiers on these custom CSS-var colors — Tailwind
  // can't split var(--x) into channels, so e.g. border-primary-600/60 silently
  // generates no rule at all (invisible border). Use solid tones instead.
  const tones = {
    accent:    "text-primary-600 [--rule-line-color:var(--primary-600)] hover:[--rule-fill-color:var(--primary-600)] hover:text-white",
    rose:      "text-secondary-600 [--rule-line-color:var(--secondary-600)] hover:[--rule-fill-color:var(--secondary-600)] hover:text-white",
    highlight: "text-text [--rule-line-color:var(--highlight)] hover:[--rule-fill-color:var(--highlight)] hover:text-text",
    success:   "text-success [--rule-line-color:var(--success)] hover:[--rule-fill-color:var(--success)] hover:text-white",
    danger:    "text-danger [--rule-line-color:var(--danger)] hover:[--rule-fill-color:var(--danger)] hover:text-white",
    muted:     "text-dim [--rule-line-color:var(--text-dim)] hover:[--rule-fill-color:var(--text-dim)] hover:text-bg",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border-[1.5px] rule-pill bg-transparent px-3 py-1
                  text-xs font-semibold tracking-wide transition-colors duration-200 ease-smooth
                  ${tones[tone] || tones.accent} ${className}`}
    >
      {children}
    </span>
  );
}