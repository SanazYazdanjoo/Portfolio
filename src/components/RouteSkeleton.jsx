// Suspense fallback for lazy-loaded routes (see main.jsx). The spin is a CSS
// keyframe; the reduced-motion block in theme.css holds it still.
// min-h-screen, not 60vh: the Footer renders directly below this fallback,
// and at 60vh it sat inside the viewport during the chunk load, then got
// shoved down when the real page mounted — a 0.27 layout shift, nearly the
// site's entire CLS. Full viewport height keeps the Footer below the fold
// on both sides of the swap, so the swap costs zero CLS.
import React from "react";
import { useTranslation } from "../context/LanguageContext";

export function RouteSkeleton() {
  const { t } = useTranslation();
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-screen flex items-center justify-center"
    >
      <span className="sr-only">{t("common.loading")}</span>
      <div
        aria-hidden="true"
        className="w-9 h-9 rule-circle [--rule-line-color:var(--primary-600)] spin-ring"
      />
    </div>
  );
}
