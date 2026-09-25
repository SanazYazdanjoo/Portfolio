import { Badge } from "../../components/Badge";

// Three evidence tiers side by side: what is implemented, what has been
// tested internally, and what has not been validated with users. Rendered at
// the top of Results for the case study that writes `statusTiers` (IBS);
// data-gated.
//
// The tiers are kept apart on purpose. "It is built" and "the tests pass"
// are both true of a prototype nobody has used yet, and a reader should not
// have to infer which of the three a sentence belongs to.

const TONE = { implemented: "success", tested: "accent", notValidated: "muted" };

export function StatusTiers({ tiers }) {
  const items = tiers?.items || [];
  if (items.length === 0) return null;

  return (
    <div className="mt-10">
      {tiers.title && (
        <p className="m-0 mb-4 font-mono text-2xs uppercase text-text-meta">{tiers.title}</p>
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {items.map((tier) => (
          <section key={tier.key} className="flex flex-col gap-4 border-t-2 rule-t pt-4" aria-label={tier.title}>
            <span><Badge tone={TONE[tier.key] || "muted"}>{tier.title}</Badge></span>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {(tier.points || []).map((point, i) => (
                <li key={i} className="text-sm leading-relaxed text-text">{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
