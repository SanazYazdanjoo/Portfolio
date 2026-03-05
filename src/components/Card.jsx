export function Card({ title, subtitle, children, className="" }) {
  return (
    <section className={`rounded-2xl bg-panel p-6 lift ${className}`}>
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      {subtitle && <p className="mt-1 text-dim">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
