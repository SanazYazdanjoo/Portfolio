// Router-level errorElement: renders when a route module throws during
// render or load, so it CANNOT assume the App shell (Nav/Footer) exists.
// It can assume LanguageProvider — that wraps RouterProvider in main.jsx.
// Unknown URLs never land here any more (the "*" route renders NotFound);
// this page is for genuine errors only.

import { useRouteError, Link } from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

export default function ErrorPage() {
  const error = useRouteError();
  if (import.meta.env.DEV) console.error(error);

  const detail = error?.statusText || error?.message || "";
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg flex items-center">
      <div className="container mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="font-display font-extrabold text-h2 text-text mb-4">
          {t("error.title")}
        </h1>
        <p className="text-lg text-dim mb-2">{t("error.body")}</p>
        {detail && (
          <p className="text-sm text-dim font-mono mb-8 break-all">{detail}</p>
        )}
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-primary text-white text-xs font-black uppercase tracking-caps
                     hover:bg-primary-600 transition-all duration-200"
        >
          {t("notFound.cta")}
        </Link>
      </div>
    </div>
  );
}
