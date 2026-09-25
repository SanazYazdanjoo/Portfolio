// The research base as evidence cards: what each source found, and the
// source itself in mono underneath, so a number is never read without where
// it came from. Rendered under the Challenge prose for the case study that
// writes `researchEvidence` (IBS); data-gated, every other page untouched.
//
// Deliberately not the MetricsStrip: those are counted-up figures under a
// Results heading, and these are findings with a sample size attached. A
// small survey reads as a count ("4/6"), never as a percentage.

export function ResearchEvidence({ evidence }) {
  const items = evidence?.items || [];
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      {evidence.title && (
        <p className="m-0 mb-4 font-mono text-2xs uppercase text-text-meta">{evidence.title}</p>
      )}
      <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={i} className="flex flex-col gap-2 border-t-2 rule-t pt-4">
            <span className="font-display text-3xl font-extrabold tracking-tight text-text tabular-nums">
              {item.value}
            </span>
            <p className="m-0 text-sm leading-relaxed text-text">{item.label}</p>
            {item.source && (
              <p className="m-0 mt-auto font-mono text-2xs leading-relaxed text-text-meta">{item.source}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
