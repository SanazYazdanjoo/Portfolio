import { useTranslation } from "../../context/LanguageContext";

// Values render exactly as authored, at every moment.
//
// They used to count up from 0 once the cell scrolled into view. That made
// the strip's resting state "0": any capture that didn't trigger or wait out
// the observer — a full-page screenshot, a link-preview render, a quick
// scroll past — froze on "0 documented problems" or "0/6 respondents", the
// opposite of what an evidence strip exists to say. A number that is only
// correct after an animation is not worth the animation (removed 2026-11).
function MetricValue({ value }) {
  return <span>{value}</span>;
}

// Column count follows the item count, so the grid never ends in a row of
// empty bordered cells: 3 or 6 items sit in threes, everything else in fours.
// Below lg it is two columns: the case-study measure leaves a four-up cell
// ~120px wide on a tablet, too narrow for a German compound like
// EXPERTENINTERVIEWS in spaced capitals, which ran through the cell border.
function gridCols(n) {
  return n % 3 === 0 && n % 4 !== 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";
}

// Metrics strip.
//
// Three ways to frame the numbers, in falling order of precedence:
//
//   `intro` (data: `metricsIntro`) — a prose block explaining how to read
//   them. It REPLACES the eyebrow rather than joining it: a project that has
//   to explain its numbers is exactly the project for which "Study at a
//   Glance" is a false label, and stacking a caption under a wrong heading
//   does not make the heading right. Set quieter than body copy — it is the
//   instructions for the grid, and must not out-shout what it introduces.
//
//   `title` (data: `resultsAtAGlance.title`) — a per-project replacement
//   eyebrow, for numbers that are real findings but not from a study.
//
//   neither — the default "Study at a Glance".
//
// Keeping all three in the data module keeps the judgement with the copy,
// instead of hardcoding a translation key per exception.
export function MetricsStrip({ metrics, title, intro }) {
  const { t } = useTranslation();
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="mt-8">
      {intro ? (
        <p className="mb-5 max-w-measure transition-[max-width] duration-300 ease-smooth text-sm leading-relaxed text-text-meta"
           style={{ breakInside: "avoid" }}>
          {intro}
        </p>
      ) : (
        <p className="text-2xs font-black uppercase text-dim mb-5">
          {title || t("project.results.glance")}
        </p>
      )}
      <div className={`grid grid-cols-2 ${gridCols(metrics.length)} border rule-box divide-x divide-y rule-divide`}>
        {metrics.map((m, i) => {
          if (m.pending) {
            return (
              <div key={i} className="p-5 min-w-0">
                <p className="font-display font-extrabold leading-none text-dim text-base md:text-lg uppercase tracking-wide">
                  {t("project.results.pending")}
                </p>
                <p className="text-2xs uppercase text-text-meta font-semibold mt-3 leading-snug hyphens-auto [overflow-wrap:anywhere]">
                  {m.label}
                </p>
              </div>
            );
          }
          const isLong = String(m.value).length > 5;
          return (
            <div key={i} className="p-5 min-w-0">
              <p
                className={`font-display font-extrabold leading-none text-text tabular-nums break-words
                           ${isLong ? "text-metric-long" : "text-metric"}`}
              >
                <MetricValue value={m.value} />
              </p>
              <p className="text-2xs uppercase text-text-meta font-semibold mt-3 leading-snug hyphens-auto [overflow-wrap:anywhere]">
                {m.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
