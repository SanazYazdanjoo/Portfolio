// Router-level errorElement: renders when a route module throws during
// render or load, so it CANNOT assume the App shell (Nav/Footer) exists.
// It can assume LanguageProvider — that wraps RouterProvider in main.jsx.
// Unknown URLs never land here any more (the "*" route renders NotFound);
// this page is for genuine errors only.

import { useRouteError } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";
import { HandBang } from "./HandIcons";
import { CoralCtaButton } from "./Button";

export default function ErrorPage() {
  const error = useRouteError();
  if (import.meta.env.DEV) console.error(error);

  const detail = error?.statusText || error?.message || "";
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg flex items-center">
      <div className="container mx-auto px-4 md:px-8 py-24 text-center">
        <HandBang className="mx-auto mb-6 block h-10 w-10 rotate-6 text-primary" />
        <h1 className="font-display font-extrabold text-h2 text-text mb-4">
          {t("error.title")}
        </h1>
        <p className="text-lg text-dim mb-2">{t("error.body")}</p>
        {detail && (
          <p className="text-sm text-dim font-mono mb-8 break-all">{detail}</p>
        )}
        {/* Gains rule-fill and the focus ring the inline copy was missing —
            the extraction is exactly so this page can't fall behind. */}
        <CoralCtaButton to="/">{t("notFound.cta")}</CoralCtaButton>
      </div>
    </div>
  );
}
