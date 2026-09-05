// Dated milestones — the calendar a research process ran along. Rendered at
// the top of the Process section, before the stepper: the steps say what
// was done and in which order, the rail says when, and neither has to
// carry the other's job.
//
// A wrapping grid of dated cells rather than a horizontal scroller: nine
// entries fit three rows on a phone and one or two on a desktop without any
// scroll affordance, and every cell is a `border-t` rule with the date in
// mono above the label — the MetaField vocabulary, so the rail reads as
// metadata, not as a second stepper competing with the one below it.

import { useTranslation } from "../../context/LanguageContext";

export function MilestoneRail({ milestones }) {
  const { t } = useTranslation();
  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="mb-10 max-w-measure transition-[max-width] duration-300 ease-smooth" style={{ breakInside: "avoid" }}>
      <span className="mb-3 block font-mono text-2xs uppercase text-text-meta">
        {t("project.process.timeline")}
      </span>
      <ol className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-5 p-0 sm:grid-cols-3">
        {milestones.map((m, i) => (
          <li key={i} className="border-t rule-t pt-2.5">
            <p className="m-0 font-mono text-2xs font-bold uppercase tabular-nums text-primary-600">
              {m.date}
            </p>
            <p className="m-0 mt-1 text-sm leading-snug text-text-meta">{m.label}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
