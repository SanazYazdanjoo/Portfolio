export function Badge({ tone="accent", children }) {
  const tones = {
    accent: "bg-[color:var(--accent)] text-black",
    success:"bg-[color:var(--success)] text-black",
    danger: "bg-[color:var(--danger)] text-black",
    muted:  "bg-muted text-text",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
