import { useState, useEffect, useRef } from "react";
import { useReducedMotion, useInView, animate as animateValue } from "framer-motion";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useTranslation } from "../../context/LanguageContext";
import { EASE } from "../../utils/motion";

// The leading number a metric counts up to, with any thousands separators it
// carries ("1,234"). Matching only the digits before the separator would count
// 0 → 1 and leave ",234" pinned beside it, so the strip reads "0,234" for the
// length of the animation. Separators are the grouping characters only —
// a plain space is excluded so "3 → 1" still counts to 3 rather than 31.
const LEADING_NUMBER = /^(\d[\d,.\u00A0\u202F]*\d|\d)(.*)$/;

// Regroups a mid-animation value with the separator the metric was authored
// with, so every frame groups the way the final number does.
function group(n, separator) {
  const digits = String(n);
  if (!separator) return digits;
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

// Counts a metric's numeric part up from 0 once it scrolls into view.
//
// Not on phones: there the final number is printed outright. The count-up
// is a scroll-triggered rAF loop that rewrites text — and so reflows the
// strip — on every frame for most of a second, and the phone page carries
// no scroll-linked motion (see ContentSection). Folded into `reduce`, since
// that is exactly the static rendering reduced-motion already asks for.
function AnimatedMetricValue({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useIsMobile();
  const reduce = useReducedMotion() || isMobile;
  const match = String(value).match(LEADING_NUMBER);
  const [display, setDisplay] = useState(0);

  const numeric = match ? match[1] : "";
  const separator = numeric.replace(/\d/g, "")[0] || "";
  const target = Number(numeric.replace(/\D/g, ""));

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const controls = animateValue(0, target, {
      duration: 0.8,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  if (!match) return <span ref={ref}>{value}</span>;
  const shown = reduce ? numeric : group(inView ? display : 0, separator);
  return (
    <span ref={ref}>
      <span className="print:hidden">{shown}</span>
      <span className="hidden print:inline">{numeric}</span>
      {match[2]}
    </span>
  );
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
      <div className="grid grid-cols-2 sm:grid-cols-4 border rule-box divide-x divide-y rule-divide">
        {metrics.map((m, i) => {
          if (m.pending) {
            return (
              <div key={i} className="p-5 min-w-0">
                <p className="font-display font-extrabold leading-none text-dim text-base md:text-lg uppercase tracking-wide">
                  {t("project.results.pending")}
                </p>
                <p className="text-2xs uppercase text-text-meta font-semibold mt-3 leading-snug">
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
                <AnimatedMetricValue value={m.value} />
              </p>
              <p className="text-2xs uppercase text-text-meta font-semibold mt-3 leading-snug">
                {m.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
