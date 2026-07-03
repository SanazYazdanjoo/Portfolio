// src/components/Badge.jsx
// Notebook-tag chips. Ink outlines + soft washes — no heavy solid fills.
// Text always sits at AA contrast: ink or the -600 accent shades.
export function Badge({ tone = "accent", children }) {
  const tones = {
    accent:    "bg-blush-weak text-primary-600 border border-primary/25",
    rose:      "bg-blush-weak text-secondary-600 border border-secondary/25",
    highlight: "bg-highlight-weak text-text border border-highlight/40",
    success:   "bg-success/10 text-success border border-success/30",
    danger:    "bg-danger/10 text-danger border border-danger/30",
    muted:     "bg-muted text-text-muted border border-border",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1
                  text-xs font-semibold tracking-wide ${tones[tone] || tones.accent}`}
    >
      {children}
    </span>
  );
}