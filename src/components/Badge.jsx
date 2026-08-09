// Notebook-tag chips. Outline by default (ink border, no fill) — the chip
// fills solid only on hover, so "filled" reads as an interaction cue rather
// than a resting state. Text always sits at AA contrast: ink or the -600
// accent shades at rest; white (or ink, for the pale highlight tone) once
// filled.
export function Badge({ tone = "accent", children, className = "" }) {
  // NOTE: no "/NN" opacity modifiers on these custom CSS-var colors — Tailwind
  // can't split var(--x) into channels, so e.g. border-primary-600/60 silently
  // generates no rule at all (invisible border). Use solid tones instead.
  const tones = {
    accent:    "text-primary-600 border-primary-600 hover:bg-primary-600 hover:border-primary-600 hover:text-white",
    rose:      "text-secondary-600 border-secondary-600 hover:bg-secondary-600 hover:border-secondary-600 hover:text-white",
    highlight: "text-text border-highlight hover:bg-highlight hover:border-highlight hover:text-text",
    success:   "text-success border-success hover:bg-success hover:border-success hover:text-white",
    danger:    "text-danger border-danger hover:bg-danger hover:border-danger hover:text-white",
    muted:     "text-text-muted border-text-muted hover:bg-text-muted hover:border-text-muted hover:text-bg",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border-[1.5px] bg-transparent px-3 py-1
                  text-xs font-semibold tracking-wide transition-colors duration-200 ease-smooth
                  ${tones[tone] || tones.accent} ${className}`}
    >
      {children}
    </span>
  );
}