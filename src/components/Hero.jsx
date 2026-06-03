// src/components/Hero.jsx
import React from "react";
import { useTranslation } from "../context/LanguageContext";

export function Hero({ data }) {
  const { t } = useTranslation();

  return (
    <div
      className="relative w-full flex flex-col justify-between"
      style={{ height: "calc(70vh - 6rem)" }}
    >
      {/* ── Photo on the right half of the 12-col grid, 
             vertically aligned with bio text below ── */}
      <div className="flex-1 grid grid-cols-12 items-center">
        <div className="col-start-1 md:col-start-6 col-span-12 md:col-span-5 flex justify-center md:justify-start">
          <img
            src={data.aboutImage}
            alt={data.name}
            className="object-cover"
            style={{ width: "230px", height: "290px" }}
          />
        </div>
      </div>

      {/* ── Thin line + bottom info ── */}
      <div className="mt-auto">
        <div className="w-full h-px bg-text/20" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 py-4 text-[13px] text-text/40 font-light">
          <span>{data.role || "UX Engineer"}</span>
          <span>{t("hero.tagline")}</span>
          <span>Portfolio [{data.year || "2026"}]</span>
        </div>
      </div>
    </div>
  );
}