// src/pages/About.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Ink & Bloom edition. Data flow, translation keys, and section structure are
// IDENTICAL to before — only the visual language changed:
//
//   • Headings set in Bricolage Grotesque (font-display); the rotated "About Me" is
//     roman + −2° (Bricolage has no italic; rotation alone carries the gesture)
//   • Big decorative numerals: blush pink, warming to rose on hover
//   • Eyebrows / small accents: primary-600 & secondary-600 (AA-safe shades)
//   • Hover fills: blush wash instead of coral tint
//   • Current career phase stays the ONE loud coral moment on the page
//   • The closing CTA line carries the gold highlighter signature
//
// ★ FIX (skills): uses resolveSkillColumns() from AboutMe.jsx — the same 
//   single-source mapping the homepage uses, so both pages automatically inherit
//   the new UX Engineer column ordering.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { voluntaryItems as rawVoluntary } from "../data/voluntary";
import { useTranslation } from "../context/LanguageContext";
import { resolveSkillColumns } from "../components/AboutMe";
import CareerArc from "../components/CareerArc";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

/* Shared section eyebrow + title — appears 4× on this page (composition
   over duplication). Small text → primary-600 for AA contrast. */
function SectionHeader({ eyebrow, title, sub }) {
  return (
    <motion.div
      className="mb-12"
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
    >
      <p className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-2">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-extrabold text-text">
        {title}
      </h2>
      {sub && <p className="text-sm text-text/60 mt-5 max-w-md">{sub}</p>}
    </motion.div>
  );
}

/* Skills column — ink heading over a short coral rule */
function SkillColumn({ title, items }) {
  return (
    <div>
      <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-text mb-2">
        {title}
      </h3>
      <div className="w-8 border-b-2 border-primary mb-4" aria-hidden="true" />
      <ul className="text-sm text-text/70 space-y-2 font-medium leading-relaxed">
        {(items || []).map((s) => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}

export default function About() {
  const profileData = useLocalizedProfile(rawProfile);
  const voluntaryItems = useLocalizedProfile(rawVoluntary);
  const { t } = useTranslation();

  const processSteps = [
    { number: "01", title: t("about.process.discover.title"), desc: t("about.process.discover.desc") },
    { number: "02", title: t("about.process.define.title"),   desc: t("about.process.define.desc") },
    { number: "03", title: t("about.process.design.title"),   desc: t("about.process.design.desc") },
    { number: "04", title: t("about.process.deliver.title"),  desc: t("about.process.deliver.desc") },
  ];

  // Uses the shared mapping from AboutMe.jsx to guarantee the new [Technical, Research, Analysis] order
  const skillColumns = resolveSkillColumns(profileData.skills);

  return (
    <main className="bg-bg min-h-screen relative overflow-hidden">

      {/* ══════════════════════════════════════════════
          SECTION 1 — Bio, Photo & Skills
      ══════════════════════════════════════════════ */}
      <section className="relative w-full px-[6%] md:px-[8%] pb-24 md:pb-32 font-sans text-text">
        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">

          {/* ── Left Column ── */}
          <motion.div
            className="md:col-span-7 flex flex-col pt-12 md:pt-24 z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative inline-block w-max mb-6 md:mb-10">
              <h2
                className="font-display font-extrabold text-text
                           text-display -rotate-2 relative z-10"
                style={{ fontVariationSettings: "'opsz' 96" }}
              >
                {t("about.heading")}
              </h2>
            </div>

            <p className="text-lg text-text/90 font-normal max-w-xl">
              {profileData.bio}
            </p>
          </motion.div>

          {/* ── Right Column: Photo ── */}
          <motion.div
            id="AboutAvatarImg"
            className="md:col-span-5 relative -mt-10 md:-mt-20 lg:-mt-32 z-20 flex justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-[400px]">
              <div className="photo-frame -rotate-1 transition-transform duration-500 hover:rotate-0">
                <img
                  src={profileData.aboutImage}
                  alt={profileData.name}
                  className="w-full h-auto object-cover grayscale
                             transition-all duration-700 hover:grayscale-0"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Skills — the scannable 3-column read ── */}
        <motion.div
          className="w-full max-w-[1400px] mx-auto mt-20 md:mt-32 pt-10 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <span className="block text-2xs md:text-xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-10">
            {t("about.whatIBring")}
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {skillColumns.map(({ labelKey, items }) => (
              <SkillColumn key={labelKey} title={t(labelKey)} items={items} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — Career Arc
      ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border relative">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.howIGotHere")}
            title={t("about.theBridge")}
            sub={t("about.theBridgeDesc")}
          />
          <CareerArc variant="full" />
     
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — Research Process
      ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.methodology")}
            title={t("about.howIWork")}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-bg px-7 py-8 group hover:bg-blush-weak transition-colors duration-300"
              >
                <span
                  className="block font-hand font-bold text-4xl text-blush mb-3 select-none
                             group-hover:text-secondary transition-colors duration-300"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="font-black text-base text-text mb-3 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-text/60">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — Voluntary Work
      ══════════════════════════════════════════════ */}
      {voluntaryItems.length > 0 && (
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              eyebrow={t("about.beyondTheBrief")}
              title={t("about.voluntaryWork")}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {voluntaryItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-bg px-8 py-8 group hover:bg-blush-weak transition-colors duration-300"
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-black text-base text-text">{item.title}</h3>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-secondary-600 shrink-0 ml-4">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[10.5px] font-bold uppercase tracking-widest text-text/40 mb-3">
                    {item.org}
                  </p>
                  <p className="text-sm leading-relaxed text-text/65">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          SECTION 5 — CTA
      ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <div>
              <p className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-2">
                {t("about.whatsNext")}
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-black text-text tracking-tight">
                {/* Gold highlighter — the page's closing signature */}
                <span className="ink-highlight">{t("about.seeResearch")}</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/#projects"
                className="px-8 py-3 bg-primary text-white text-xs font-black uppercase tracking-widest
                           hover:bg-primary-600 transition-all duration-200"
              >
                {t("about.viewProjects")}
              </Link>
              <Link
                to="/cv"
                className="px-8 py-3 border border-text/30 text-text text-xs font-black uppercase tracking-widest
                           hover:border-secondary hover:text-secondary-600 transition-all duration-200"
              >
                {t("about.viewCV")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}