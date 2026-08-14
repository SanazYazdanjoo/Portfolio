import { useState, useEffect, useRef } from "react";
import { useReducedMotion, useInView, animate as animateValue } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";

// Counts a metric's numeric part up from 0 once it scrolls into view.
function AnimatedMetricValue({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const target = Number(match[1]);
    const controls = animateValue(0, target, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  if (!match) return <span ref={ref}>{value}</span>;
  const shown = reduce ? match[1] : inView ? display : 0;
  return (
    <span ref={ref}>
      <span className="print:hidden">{shown}</span>
      <span className="hidden print:inline">{match[1]}</span>
      {match[2]}
    </span>
  );
}

// Metrics strip
export function MetricsStrip({ metrics }) {
  const { t } = useTranslation();
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="mt-8">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-5">
        {t("project.results.glance")}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 border border-border divide-x divide-y divide-border">
        {metrics.map((m, i) => {
          if (m.pending) {
            return (
              <div key={i} className="p-5 min-w-0">
                <p className="font-display font-extrabold leading-none text-dim text-[15px] md:text-[17px] uppercase tracking-wide">
                  {t("project.results.pending")}
                </p>
                <p className="text-[11px] uppercase tracking-wider text-text-meta font-semibold mt-3 leading-snug">
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
                           ${isLong ? "text-[22px] md:text-[26px]" : "text-[36px] md:text-[44px]"}`}
              >
                <AnimatedMetricValue value={m.value} />
              </p>
              <p className="text-[11px] uppercase tracking-wider text-text-meta font-semibold mt-3 leading-snug">
                {m.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
