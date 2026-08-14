// Suspense fallback for lazy-loaded routes (see main.jsx). Reduced-motion
// users get a static ring instead of a spinner — same element, no animation.
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
      className="w-full min-h-[60vh] flex items-center justify-center"
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
