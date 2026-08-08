import React from "react";

export function StatusDot({ label, className = "" }) {
  return (
    <span
      className={`relative flex h-2 w-2 mt-1.5 shrink-0 ${className}`}
      role="img"
      aria-label={label}
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
  );
}
