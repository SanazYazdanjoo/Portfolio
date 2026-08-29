// Catch-all route ("*" in main.jsx). Before this existed, an unknown URL fell
// through to the router's errorElement — an unstyled page with no nav, no
// footer, and English-only copy. This renders inside the App shell like any
// other page, so a mistyped or stale link keeps the site around it.
//
// Note the limit of an SPA behind a catch-all rewrite (vercel.json): the
// HTTP status is still 200, not 404 — only the content says "not found".

import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { HandQuestion } from "../components/HandIcons";
import { CoralCtaButton } from "../components/Button";

export default function NotFound() {
  const { t } = useTranslation();
  const profileData = useLocalizedProfile(rawProfile);
  const location = useLocation();

  useDocumentMeta({
    title: `${t("notFound.title")} — ${profileData.name}`,
    description: t("notFound.body"),
  });

  return (
    <div className="min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <p className="flex items-center gap-3 font-hand text-4xl text-blush mb-4 select-none" aria-hidden="true">
          {t("notFound.kicker")} <HandQuestion className="h-9 w-9 -rotate-6" />
        </p>
        <h1 className="font-display font-extrabold text-display text-text mb-6">
          {t("notFound.title")}
        </h1>
        <p className="text-lg text-dim max-w-xl mb-4">{t("notFound.body")}</p>
        <p className="text-sm text-dim max-w-xl mb-10 font-mono break-all">
          {location.pathname}
        </p>
        <CoralCtaButton to="/">{t("notFound.cta")}</CoralCtaButton>
      </div>
    </div>
  );
}
