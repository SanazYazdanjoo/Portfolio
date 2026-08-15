// Suspense fallback for lazy-loaded routes (see main.jsx). Reduced-motion
// users get a static ring instead of a spinner — same element, no animation.
// min-h-screen, not 60vh: the Footer renders directly below this fallback,
// and at 60vh it sat inside the viewport during the chunk load, then got
// shoved down when the real page mounted — a 0.27 layout shift, nearly the
// site's entire CLS. Full viewport height keeps the Footer below the fold
// on both sides of the swap, so the swap costs zero CLS.
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

export function RouteSkeleton() {
  const reduce = useReducedMotion();
  const { t } = useTranslation();
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-screen flex items-center justify-center"
    >
      <span className="sr-only">{t("common.loading")}</span>
      <motion.div
        aria-hidden="true"
        className="w-9 h-9 rounded-full border-2 border-border border-t-primary-600"
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
