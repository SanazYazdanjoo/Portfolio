import { MaybeText } from "./MaybeText";

// What a project deliberately hasn't built, or has built and switched off.
//
// This renders as the closing block of the Results section rather than a
// section of its own, for the same reason OutcomeBlock does: findings and the
// limits on those findings are one story, and giving the limits their own
// coral kicker in the sidebar would read as a second heading for it. It sits
// after the results and before the outcome — a reader arrives at "here is
// what happened" and immediately gets "and here is what I chose not to claim".
//
// Unlike every other block in this folder, its heading comes from the data
// (`notBuilt.title`) rather than a translation key. That is deliberate and
// the shape of the field asked for it: the title is a full sentence that
// changes per project ("What is deliberately not built (yet)"), not a fixed
// one-word label like "Outcome" that every project shares. Keeping it in the
// data module also keeps the copy where the rest of the case-study copy lives.
export function NotBuiltBlock({ notBuilt }) {
  const items = notBuilt?.items || [];
  if (!notBuilt?.title || items.length === 0) return null;

  return (
    <div className="mt-12 border-t rule-t pt-8 max-w-[var(--measure,68ch)] transition-[max-width] duration-300 ease-out">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-5">
        {notBuilt.title}
      </p>

      <ul className="border-t rule-t">
        {items.map((item, i) => (
          <li key={i} className="border-b rule-b py-3" style={{ breakInside: "avoid" }}>
            <MaybeText
              value={item}
              path={`notBuilt.items[${i}]`}
              as="p"
              className="text-sm text-text/80 leading-relaxed"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
