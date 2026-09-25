import { Badge } from "../../components/Badge";

// Evidence → Requirement → Decision → Implementation, one row per traced
// chain. Rendered under the Solution prose for the case study that writes
// `traceChains` (IBS); data-gated like EvidenceChain, so every other page is
// untouched.
//
// The chain is the argument of that case study, so it is drawn as a
// sequence rather than a list of paragraphs: four cells in reading order,
// joined by arrows at lg+, stacked with the same order below. Featured
// chains render in full; the rest sit behind one disclosure so the page
// shows the pattern at full weight once and keeps the remaining evidence
// one click away instead of at equal weight.
//
// `status` is the build state of the chain's last link, never a claim about
// users: built / partial / modelled. Validation with users is stated once,
// in the block's intro, because it is the same for every chain.

const STATUS_TONE = { built: "success", partial: "highlight", modelled: "muted" };
const LINKS = ["evidence", "requirement", "decision", "implementation"];

function ChainCell({ label, cell, last, compact }) {
  if (!cell) return null;
  return (
    <li className="relative flex min-w-0 flex-col gap-2 border-t-2 rule-t pt-3 lg:pr-6">
      <span className="font-mono text-2xs uppercase text-primary-600">{label}</span>
      {cell.code && (
        <span className="font-mono text-xs font-bold text-text">{cell.code}</span>
      )}
      <p className={`m-0 leading-relaxed text-text ${compact ? "text-sm" : "text-sm md:text-base"}`}>
        {cell.text}
      </p>
      {cell.source && (
        <p className="m-0 font-mono text-2xs leading-relaxed text-text-meta">{cell.source}</p>
      )}
      {!last && (
        <span
          aria-hidden="true"
          className="absolute right-1 top-2 hidden font-display text-lg text-primary-600 lg:block"
        >
          →
        </span>
      )}
    </li>
  );
}

function Chain({ chain, index, columns, statusLabels, compact }) {
  return (
    <article className={compact ? "py-6" : "border-t rule-t py-8"}>
      <header className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="font-mono text-2xs text-primary-600" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className={`m-0 font-display font-extrabold tracking-tight text-text ${compact ? "text-lg" : "text-xl md:text-2xl"}`}>
          {chain.title}
        </h4>
        {chain.status && statusLabels?.[chain.status] && (
          <Badge tone={STATUS_TONE[chain.status] || "muted"}>{statusLabels[chain.status]}</Badge>
        )}
      </header>
      <ol className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {LINKS.map((kind, i) => (
          <ChainCell key={kind} label={columns?.[kind]} cell={chain[kind]}
            last={i === LINKS.length - 1} compact={compact} />
        ))}
      </ol>
      {chain.gap && (
        <p className="m-0 mt-5 max-w-measure border-l-2 rule-edge-l [--rule-line-color:var(--text-dim)] pl-4 text-sm leading-relaxed text-text-meta">
          {chain.gap}
        </p>
      )}
    </article>
  );
}

export function TraceChains({ chains }) {
  const items = chains?.items || [];
  if (items.length === 0) return null;
  const featured = items.filter((c) => c.featured);
  const rest = items.filter((c) => !c.featured);
  const { columns, statusLabels } = chains;

  return (
    <div className="mt-12" data-trace-chains="">
      {chains.title && (
        <p className="m-0 mb-3 font-mono text-2xs uppercase text-text-meta">{chains.title}</p>
      )}
      {chains.intro && (
        <p className="m-0 mb-4 max-w-measure text-base leading-relaxed text-text-meta">{chains.intro}</p>
      )}

      {featured.map((chain, i) => (
        <Chain key={chain.id} chain={chain} index={i} columns={columns} statusLabels={statusLabels} />
      ))}

      {rest.length > 0 && (
        <details className="group border-t border-b rule-t rule-b">
          <summary className="flex cursor-pointer list-none items-center gap-3 py-4 font-mono text-2xs font-bold uppercase text-text hover:text-primary-600 focus-ring [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-open:rotate-90">▸</span>
            {chains.moreLabel}
          </summary>
          {rest.map((chain, i) => (
            <Chain key={chain.id} chain={chain} index={featured.length + i} columns={columns}
              statusLabels={statusLabels} compact />
          ))}
        </details>
      )}
    </div>
  );
}
