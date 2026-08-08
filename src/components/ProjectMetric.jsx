// Single metric treatment shared by ProjectListRow and ProjectTile: value
// first at a fixed size, label clamped to two lines beneath it. Value comes
// first (not the label) specifically so every row/card's value sits on the
// same baseline regardless of how many lines the label wraps to — a longer
// label pushes nothing, since there's nothing below the value that needs to
// stay aligned.
import React from "react";

export function ProjectMetric({ metric, align = "left", className = "" }) {
  if (!metric) return null;
  const isLong = String(metric.value).length > 4;

  return (
    <div className={`flex flex-col ${align === "right" ? "items-end text-right" : "items-start"} ${className}`}>
      <span
        className={`font-display font-extrabold leading-none text-text tabular-nums
                    transition-colors duration-300 group-hover:text-primary-600
                    ${isLong ? "text-[20px] md:text-[22px]" : "text-[28px] md:text-[32px]"}`}
      >
        {metric.value}
      </span>
      <span className="mt-1.5 line-clamp-2 min-h-[2.4em] text-[11px] font-extrabold uppercase tracking-[0.14em] text-text/60 leading-tight">
        {metric.label}
      </span>
    </div>
  );
}
