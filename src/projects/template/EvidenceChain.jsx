// The evidence chain: research → synthesis → requirements → design →
// implementation → quality → validation, one line per link, rendered under
// a case study's About copy. Data-gated on `evidenceChain` (constants.js,
// RENDERED_FIELDS), so only a project that writes it renders it and every
// other case study is untouched.
//
// A link may carry `pending: true`: it renders with a mono "Pending" badge
// and dimmed ink, so a stage that has not happened yet — a summative
// evaluation waiting on deployment — is visibly not a claim of completion.
// The list is ordered semantics, an <ol>, because the order IS the point.

import { useTranslation } from "../../context/LanguageContext";

export function EvidenceChain({ items }) {
  const { t } = useTranslation();
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="mt-8 max-w-measure transition-[max-width] duration-300 ease-smooth">
      <p className="mb-3 font-mono text-2xs uppercase text-text-meta">
        {t("project.evidenceChain.label")}
      </p>
      <ol className="m-0 list-none border-t rule-t p-0">
        {items.map((item, i) => (
          <li
            key={item.stage}
            className={`grid grid-cols-[2ch_1fr] items-baseline gap-x-3 gap-y-1 border-b rule-b py-3 sm:grid-cols-[2ch_minmax(9ch,10rem)_1fr] sm:gap-x-4 sm:gap-y-0 ${
              item.pending ? "text-dim" : "text-text"
            }`}
          >
            <span className="font-mono text-2xs text-primary-600" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-bold">
              {item.stage}
              {item.pending && (
                <span
                  className="ml-2 inline-block border rule-frame px-1.5 py-0.5 align-middle font-mono text-2xs uppercase text-primary-600"
                  style={{ "--rule-line-color": "var(--primary-600)" }}
                >
                  {t("project.evidenceChain.pending")}
                </span>
              )}
            </span>
            {/* Below sm the note drops under the stage, full width, instead of
                sharing a three-column row on a 390px screen. */}
            <span className="col-start-2 text-sm leading-relaxed text-text-meta sm:col-start-3">{item.note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
