// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../context/LanguageContext";

export function Hero({ data }) {
  const { t, localize } = useTranslation();
  const reduce = useReducedMotion();

  const stats = data.heroStats || [];

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" },
  });

  const scrollToProjects = (e) => {
    const el = document.getElementById("projects");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <section
      className="relative w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center"
      style={{ minHeight: "calc(72vh - 6rem)" }}
    >
      {/* ── Left: statement (~65%) ── */}
      <div className="md:col-span-7 flex flex-col">
        <motion.p
          {...rise(0)}
          className="text-[13px] uppercase tracking-[0.18em] text-primary font-semibold mb-5"
        >
          {localize(data.role)}
        </motion.p>

        <motion.h2
          {...rise(0.05)}
          className="font-display text-text leading-[1.15] text-2xl md:text-[2.1rem] lg:text-[2.5rem] tracking-[-0.01em] max-w-[20ch]"
        >
          {t("hero.tagline")}
        </motion.h2>

        {stats.length > 0 && (
          <motion.dl {...rise(0.12)} className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="font-display font-black text-2xl md:text-3xl text-text leading-none">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-text/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}

        <motion.div {...rise(0.18)} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-text border-b-2 border-primary pb-1 transition-colors hover:text-primary"
          >
            {t("hero.ctaWork")}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <Link
            to="/cv"
            className="text-sm font-medium text-text/55 hover:text-text transition-colors"
          >
            {t("hero.ctaCv")}
          </Link>
        </motion.div>
      </div>

      {/* ── Right: photo (~35%) ── */}
      <motion.div {...rise(0.1)} className="md:col-span-5 flex justify-center md:justify-end">
        <div className="relative">
          <img
            src={data.aboutImage}
            alt={`Portrait of ${data.name}`}
            className="object-cover w-[230px] h-[290px] md:w-[260px] md:h-[330px] grayscale hover:grayscale-0 transition-all duration-700"
          />
          <span className="absolute -bottom-3 -left-3 font-display text-[11px] tracking-[0.2em] text-text/55">
            Portfolio [{data.year || "2026"}]
          </span>
        </div>
      </motion.div>
    </section>
  );
}
