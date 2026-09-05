// How N ideation directions became the concepts the client saw.
//
// A lineage, not a list: each source concept sits on the left, an arrow
// carries it to what it became on the right — a concept carried forward
// under its final name, two concepts merged into one shared card, or a
// dashed "dropped" frame that records the cut rather than hiding it.
// Merged sources are grouped so the two-into-one reads as a shape, not as
// two rows that happen to name the same target. Notes from the data sit
// under the group they explain.
//
// The rendering is a CSS grid, no SVG: it has to reflow to a single column
// on phones (arrow turns downward), print without losing the connectors,
// and stay legible in both themes without a second colour system.
//
// `owner: "self"` renders as the same "mine" marker StudyDesign uses for
// the contextual-design models — one vocabulary for authorship across the
// page. Colleagues stay unnamed; the data file keeps names in comments only.

import { useTranslation } from "../../context/LanguageContext";
import { HandArrow } from "../../components/HandArrow";

export function OwnerMark({ owner }) {
  const { t } = useTranslation();
  if (owner === "self") {
    return (
      <span className="ml-2 inline-block align-middle font-mono text-2xs font-bold uppercase text-primary-600">
        {t("project.owner.self")}
      </span>
    );
  }
  if (owner === "unconfirmed") {
    return (
      <span className="ml-2 inline-block align-middle font-mono text-2xs uppercase text-dim">
        {t("project.owner.unconfirmed")}
      </span>
    );
  }
  return null;
}

const OUTCOME_KEY = {
  "carried-forward": "project.concepts.carriedForward",
  merged: "project.concepts.merged",
  dropped: "project.concepts.dropped",
};

// Group consecutive-or-not sources that merged into the same target; every
// other source is its own group. Order follows the first appearance.
function groupLineage(lineage) {
  const groups = [];
  const byKey = new Map();
  lineage.forEach((item, i) => {
    const key = item.outcome === "merged" && item.as ? `merged:${item.as}` : `solo:${i}`;
    if (!byKey.has(key)) {
      const g = { key, outcome: item.outcome, as: item.as, items: [] };
      byKey.set(key, g);
      groups.push(g);
    }
    byKey.get(key).items.push(item);
  });
  return groups;
}

function SourceCard({ item }) {
  return (
    <div className="border rule-frame-in [--rule-fill-color:rgb(var(--muted-rgb)/0.3)] px-4 py-3">
      <p className="m-0 font-display text-sm font-bold leading-snug text-text">
        {item.concept}
        <OwnerMark owner={item.owner} />
      </p>
    </div>
  );
}

function ResultCard({ group }) {
  const { t } = useTranslation();
  const dropped = group.outcome === "dropped";
  return (
    <div
      className={
        dropped
          ? "border border-dashed border-text/25 px-4 py-3"
          : "border rule-frame-in [--rule-line-color:var(--primary-600)] [--rule-fill-color:var(--bg)] px-4 py-3"
      }
    >
      <p className={`m-0 font-mono text-2xs uppercase ${dropped ? "text-dim" : "text-primary-600"}`}>
        {t(OUTCOME_KEY[group.outcome] || OUTCOME_KEY.dropped)}
      </p>
      {!dropped && group.as && (
        <p className="m-0 mt-1 font-display text-sm font-bold leading-snug text-text">{group.as}</p>
      )}
    </div>
  );
}

export function ConceptLineage({ lineage }) {
  const { t } = useTranslation();
  if (!lineage || lineage.length === 0) return null;

  const groups = groupLineage(lineage);
  const sources = lineage.length;
  const forward = groups.filter((g) => g.outcome !== "dropped").length;

  return (
    <div className="max-w-measure transition-[max-width] duration-300 ease-smooth">
      <p className="m-0 text-lg leading-[1.7] text-text">
        {t("project.concepts.summary").replace("{from}", sources).replace("{to}", forward)}
      </p>

      {/* Column labels — only where the two columns exist. */}
      <div className="mt-8 hidden md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-x-4">
        <p className="m-0 font-mono text-2xs uppercase text-text-meta">{t("project.concepts.sources")}</p>
        <span aria-hidden="true" />
        <p className="m-0 font-mono text-2xs uppercase text-text-meta">{t("project.concepts.results")}</p>
      </div>

      <ol className="m-0 mt-4 flex list-none flex-col gap-8 p-0" aria-label={t("project.concepts.ariaLabel")}>
        {groups.map((group) => (
          <li key={group.key} style={{ breakInside: "avoid" }}>
            <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-x-4">
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <SourceCard key={item.concept} item={item} />
                ))}
              </div>
              {/* The connector. Turns downward when the grid stacks. */}
              <span
                aria-hidden="true"
                className="flex justify-center text-text-meta md:justify-self-center"
              >
                <HandArrow className="h-3 w-7 rotate-90 md:rotate-0" />
              </span>
              <ResultCard group={group} />
            </div>

            {group.items.some((item) => item.note) && (
              <ul className="m-0 mt-3 list-none p-0 text-sm leading-relaxed text-text-meta">
                {group.items
                  .filter((item) => item.note)
                  .map((item) => (
                    <li key={item.concept} className="border-l-2 rule-edge-l [--rule-line-color:rgb(var(--primary-rgb)/0.4)] pl-3 mt-2 first:mt-0">
                      {group.items.length > 1 && (
                        <span className="font-medium text-text">{item.concept} — </span>
                      )}
                      {item.note}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// What each concept had to contain before it could be defended — the pack
// the lineage above was narrowed with. A numbered checklist, two columns
// where the width allows.
export function ConceptPack({ items }) {
  const { t } = useTranslation();
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-10 max-w-measure border-l-2 rule-l pl-5 transition-[max-width] duration-300 ease-smooth" style={{ breakInside: "avoid" }}>
      <span className="mb-3 block font-mono text-2xs uppercase text-text-meta">
        {t("project.concepts.pack")}
      </span>
      <ol className="m-0 grid list-none gap-x-6 gap-y-1.5 p-0 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-baseline gap-3 text-sm leading-relaxed text-text-meta">
            <span className="shrink-0 font-mono text-2xs font-bold tabular-nums text-primary-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
