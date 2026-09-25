import { Badge } from "../../components/Badge";

// What the internal checks guard, and what their last run said. Rendered in
// the Methodology section for the case study that writes `qualityChecks`
// (IBS); data-gated.
//
// A row carries `state: "pass" | "open"` and a dated `result`, because a
// check that currently fails is still evidence of the discipline — and
// reporting it as green would be exactly the claim this block exists to
// keep honest. These are internal checks on the build, never user outcomes.

const TONE = { pass: "success", open: "danger" };

export function QualityChecks({ checks }) {
  const items = checks?.items || [];
  if (items.length === 0) return null;
  const { columns = {}, stateLabels = {} } = checks;

  return (
    <div className="mt-10">
      {checks.title && (
        <p className="m-0 mb-3 font-mono text-2xs uppercase text-text-meta">{checks.title}</p>
      )}
      <ul className="m-0 list-none border-t rule-t p-0">
        {items.map((item, i) => (
          <li key={i} className="grid grid-cols-1 gap-2 border-b rule-b py-4 md:grid-cols-[minmax(10rem,14rem)_1fr_minmax(10rem,16rem)] md:gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-text">{item.check}</span>
              {item.state && stateLabels[item.state] && (
                <span><Badge tone={TONE[item.state] || "muted"}>{stateLabels[item.state]}</Badge></span>
              )}
            </div>
            <p className="m-0 text-sm leading-relaxed text-text-meta">
              <span className="sr-only">{columns.guards}: </span>{item.guards}
            </p>
            <p className="m-0 font-mono text-2xs leading-relaxed text-text-meta">
              <span className="sr-only">{columns.result}: </span>{item.result}
            </p>
          </li>
        ))}
      </ul>
      {checks.note && (
        <p className="m-0 mt-4 max-w-measure text-sm leading-relaxed text-text-meta">{checks.note}</p>
      )}
    </div>
  );
}
