// Headings use Bricolage Grotesque (font-display); the rotated "About Me" is
// roman plus a -2 degree rotation, since Bricolage has no italic and the
// rotation alone carries that gesture. Skills live inside The Bridge
// (CareerArc, variant="full") as chronologically-grouped chips rather than a
// flat list, so each skill carries its era.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { voluntaryItems as rawVoluntary } from "../data/voluntary";
import { useTranslation } from "../context/LanguageContext";
import CareerArc from "../components/CareerArc";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { EASE } from "../utils/motion";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

/* Shared section eyebrow + title — appears on Career Arc + How I Work.
   Small text → primary-600 for AA contrast. */
function SectionHeader({ eyebrow, title, sub }) {
  return (
    <motion.div
      className="mb-12"
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
    >
      <p className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-2">
        {eyebrow}
      </p>
      <h2 className="type-section">
        {title}
      </h2>
      {sub && <p className="text-sm text-text/65 mt-5 max-w-md">{sub}</p>}
    </motion.div>
  );
}

export default function About() {
  const profileData = useLocalizedProfile(rawProfile);
  const voluntaryItems = useLocalizedProfile(rawVoluntary);
  const { t } = useTranslation();

  useDocumentMeta({
    title: `${t("about.heading")} — ${profileData.name}`,
    description: profileData.bio,
  });

  const processSteps = [
    { number: "01", title: t("about.process.discover.title"), desc: t("about.process.discover.desc") },
    { number: "02", title: t("about.process.define.title"),   desc: t("about.process.define.desc") },
    { number: "03", title: t("about.process.design.title"),   desc: t("about.process.design.desc") },
    { number: "04", title: t("about.process.deliver.title"),  desc: t("about.process.deliver.desc") },
  ];

  return (
    <main className="bg-bg min-h-screen relative overflow-hidden">

      {/* Bio & Photo */}
      <section className="relative w-full px-[6%] md:px-[8%] pb-24 md:pb-32 font-sans text-text">
        <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">

          {/* Left Column */}
          <motion.div
            className="md:col-span-7 flex flex-col pt-12 md:pt-24 z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="relative inline-block w-max mb-6 md:mb-10">
              <h1
                className="font-display font-extrabold text-text
                           text-display relative z-10"
                style={{ fontVariationSettings: "'opsz' 96" }}
              >
                {t("about.heading")}
              </h1>
            </div>

            <p className="text-lg text-text/90 font-normal max-w-xl">
              {profileData.bio}
            </p>
          </motion.div>

          {/* Right Column: Photo */}
          <motion.div
            id="AboutAvatarImg"
            className="md:col-span-5 relative -mt-10 md:-mt-20 lg:-mt-32 z-20 flex justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <div className="relative w-full max-w-[400px]">
              <div className="photo-frame rule-frame-in -rotate-1 transition-transform duration-500 hover:rotate-0">
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
      </section>

      {/* Career Arc — skills grouped as chips */}
      <section className="py-20 border-t rule-t relative">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.howIGotHere")}
            title={t("about.theBridge")}
            sub={t("about.theBridgeDesc")}
          />
          <CareerArc variant="full" />

        </div>
      </section>

      {/* Credentials: compact one-line list, no thumbnails — the full gallery lives at /credentials */}
      {profileData.certifications && profileData.certifications.length > 0 && (
        <section className="py-20 border-t rule-t">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              eyebrow={t("cv.certifications")}
              title={t("credentials.heading")}
            />
            <ul className="space-y-3 max-w-2xl">
              {profileData.certifications.slice(0, 4).map((cert, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-baseline gap-x-2 text-sm text-text/75"
                >
                  <span className="font-bold text-text">{cert.title}</span>
                  <span className="text-text-meta" aria-hidden="true">&mdash;</span>
                  <span>{cert.provider}</span>
                  {cert.year && <span className="text-dim">({cert.year})</span>}
                </li>
              ))}
            </ul>
            <Link
              to="/credentials"
              className="mt-6 inline-block text-xs font-black uppercase tracking-widest text-primary-600 hover:underline"
            >
              {t("credentials.viewAll")} &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Research Process */}
      <section className="py-20 border-t rule-t">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.methodology")}
            title={t("about.howIWork")}
          />

          {/* Double Diamond: the frame the four steps below sit inside.
              Reading column for the copy, full width for the diagram. */}
          <motion.div
            className="max-w-2xl space-y-5 mb-12"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="text-[15px] md:text-base leading-[1.85] text-text">
              {t("about.doubleDiamond.intro")}
            </p>
            <p className="text-sm leading-[1.9] text-text/75">
              {t("about.doubleDiamond.intro2")}
            </p>
          </motion.div>

          <motion.figure
            className="mb-16"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <div className="photo-frame rule-frame-in">
              <picture>
                <source srcSet="/assets/double-diamond.webp" type="image/webp" />
                <img
                  src="/assets/double-diamond.png"
                  alt={t("about.doubleDiamond.alt")}
                  width="1800"
                  height="1120"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto"
                />
              </picture>
            </div>
            <figcaption className="mt-4 text-xs leading-relaxed text-text/60 max-w-xl">
              {t("about.doubleDiamond.caption")}
            </figcaption>
          </motion.figure>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-bg rule-fill px-7 py-8 group hover:bg-blush-weak transition-colors duration-300"
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
                <p className="text-[12px] leading-relaxed text-text/65">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voluntary Work — eyebrow only, no h2, dense two-column list so it doesn't compete with The Bridge */}
      {voluntaryItems.length > 0 && (
        <section className="py-20 border-t rule-t">
          <div className="container mx-auto px-4 md:px-8">
            <motion.p
              className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-8"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              {t("about.beyondTheBrief")}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {voluntaryItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-bg rule-fill px-5 py-4 group hover:bg-blush-weak transition-colors duration-300"
                >
                  <div className="flex justify-between items-baseline mb-1.5">
                    <h3 className="font-black text-sm text-text">{item.title}</h3>
                    <span className="text-2xs font-semibold uppercase tracking-widest text-secondary-600 shrink-0 ml-4">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-2xs font-bold uppercase tracking-widest text-dim mb-1.5">
                    {item.org}
                  </p>
                  <p className="text-xs leading-relaxed text-text/65">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 border-t rule-t">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <div>
              <p className="text-2xs font-extrabold uppercase tracking-[0.18em] text-primary-600 mb-2">
                {t("about.whatsNext")}
              </p>
              <h2 className="type-section">
                {/* Gold highlighter — the page's closing signature */}
                <span className="ink-highlight">{t("about.seeResearch")}</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="px-8 py-3 bg-primary rule-fill text-white text-xs font-black uppercase tracking-widest
                           hover:bg-primary-600 transition-all duration-200"
              >
                {t("about.viewProjects")}
              </Link>
              <Link
                to="/cv"
                className="px-8 py-3 border rule-frame [--rule-line-color:rgb(var(--text-rgb)/0.3)] text-text text-xs font-black uppercase tracking-widest
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
