// Participant voices — verbatims carried forward from the contextual
// inquiries. Rendered inside the Challenge section, under the prose and
// before the figures: the quotes are the problem statement in the
// participants' own words, so they belong where the problem is argued, not
// with the results (which is where `verbatims` go — those are evidence for
// findings, these are evidence for the brief).
//
// Same blockquote vocabulary as Verbatims.jsx — hand face, primary rule on
// the left — set two-up so four short quotes read as a chorus rather than a
// column. No attribution line: the data carries none, and inventing "P3"
// labels would claim a mapping the source board does not record.

import { useTranslation } from "../../context/LanguageContext";

export function ParticipantVoices({ voices }) {
  const { t } = useTranslation();
  if (!voices || voices.length === 0) return null;

  return (
    <div className="mt-10 max-w-measure transition-[max-width] duration-300 ease-smooth">
      <p className="m-0 mb-1 text-2xs font-black uppercase text-primary-600">
        {t("project.voices.kicker")}
      </p>
      <p className="m-0 mb-6 font-mono text-2xs uppercase text-text-meta">
        {t("project.voices.source")}
      </p>
      <ul className="m-0 grid list-none gap-x-8 gap-y-6 p-0 sm:grid-cols-2">
        {voices.map((quote, i) => (
          <li key={i}>
            <blockquote
              className="m-0 border-l-2 rule-edge-l [--rule-line-color:var(--primary-600)] pl-5 pt-1"
              aria-label={t("project.results.verbatim")}
              style={{ breakInside: "avoid" }}
            >
              <p className="m-0 font-hand text-quote leading-snug text-text-meta">“{quote}”</p>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
