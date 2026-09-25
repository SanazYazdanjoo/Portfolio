import SectionMedia from "../SectionMedia";

// Secondary figures for a section, behind one disclosure. A case study with
// many real artefacts should not show them all at the weight of its primary
// figure: the primary evidence stays in `figures.<section>`, and whatever
// supports it goes in `supportingFigures.<section>` = { label, items }, still
// one click away and still the same SectionMedia rendering (zoom, captions,
// alt text) once opened. Data-gated: absent the field, nothing renders.

export function SupportingFigures({ group }) {
  const items = group?.items || [];
  if (items.length === 0) return null;

  return (
    <details className="group mt-10 border-t border-b rule-t rule-b">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-4 font-mono text-2xs font-bold uppercase text-text hover:text-primary-600 focus-ring [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-open:rotate-90">▸</span>
        {group.label}
        <span className="font-normal text-text-meta">· {items.length}</span>
      </summary>
      <div className="pb-8">
        <SectionMedia items={items} />
      </div>
    </details>
  );
}
