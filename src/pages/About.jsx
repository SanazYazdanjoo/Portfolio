// About is the narrative page: current positioning first, then the career path
// that produced it, then the way that combination shows up in practice.
// Human-facing profile copy stays in data.json; this page only composes it.

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { voluntaryItems as rawVoluntary } from "../data/voluntary";
import { TESTIMONIALS_PUBLISHED, testimonialItems as rawTestimonials } from "../data/testimonials";
import { useTranslation } from "../context/LanguageContext";
import CareerArc from "../components/CareerArc";
import { HandArrow } from "../components/HandArrow";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { EASE } from "../utils/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <motion.div
      className="mb-12"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <p className="mb-2 text-2xs font-extrabold uppercase text-primary-600">
        {eyebrow}
      </p>
      <h2 className="type-section">{title}</h2>
      {sub && <p className="mt-5 max-w-xl text-sm leading-relaxed text-dim">{sub}</p>}
    </motion.div>
  );
}

export default function About() {
  const profileData = useLocalizedProfile(rawProfile);
  const voluntaryItems = useLocalizedProfile(rawVoluntary);
  const testimonials = useLocalizedProfile(rawTestimonials);
  const { t } = useTranslation();

  useDocumentMeta({
    title: `${t("about.heading")} — ${profileData.name}`,
    description: profileData.bio,
  });

  const workflowSteps = (profileData.roleSub || "")
    .split(/\s*→\s*/)
    .map((step) => step.trim())
    .filter(Boolean);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      {/* Identity: who I am now. */}
      <section className="relative w-full px-[6%] pb-24 font-sans text-text md:px-[8%] md:pb-32">
        <div className="relative mx-auto grid w-full max-w-page grid-cols-1 items-start gap-y-12 md:grid-cols-12 md:gap-x-10">
          <motion.div
            className="z-10 flex flex-col pt-12 md:col-span-7 md:pt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-4 text-2xs font-extrabold uppercase tracking-caps text-primary-600">
              {profileData.role}
            </p>
            <h1
              className="relative z-10 mb-7 font-display text-display font-extrabold text-text"
              style={{ fontVariationSettings: "'opsz' 96" }}
            >
              {t("about.heading")}
            </h1>
            <p className="max-w-[62ch] text-lg font-normal leading-relaxed text-text">
              {profileData.bio}
            </p>
          </motion.div>

          <motion.div
            id="AboutAvatarImg"
            className="relative z-20 flex justify-end md:col-span-5 md:-mt-16 lg:-mt-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <div className="relative w-full max-w-[360px]">
              <div className="photo-frame rule-frame-in -rotate-1 transition-transform duration-500 hover:rotate-0">
                <img
                  src={profileData.aboutImage}
                  alt={profileData.name}
                  className="h-auto w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why this profile exists: the career progression behind the current role. */}
      <section className="relative border-t py-20 rule-t">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.howIGotHere")}
            title={t("about.theBridge")}
            sub={profileData.heroNarrative?.bridgeDescription}
          />
          <CareerArc variant="full" />
        </div>
      </section>

      {/* How the positioning works in practice. This intentionally mirrors the
          canonical Research → Design & Usability → Implementation & Validation
          narrative instead of presenting a generic design-process framework. */}
      <section className="border-t py-20 rule-t">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.methodology")}
            title={t("about.howIWork")}
            sub={profileData.roleSub}
          />

          <motion.div
            className="mb-12 max-w-3xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-lg leading-[1.8] text-text">
              {profileData.positioning}
            </p>
          </motion.div>

          {workflowSteps.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
              {workflowSteps.map((step, i) => (
                <React.Fragment key={step}>
                  <motion.article
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="border-t px-2 py-7 rule-t md:px-6 md:py-9"
                  >
                    <span className="mb-5 block font-hand text-4xl font-bold leading-none text-blush" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`font-display text-2xl font-black leading-tight ${i === 1 ? "text-primary-600" : "text-text"}`}>
                      {step}
                    </h3>
                  </motion.article>

                  {i < workflowSteps.length - 1 && (
                    <div className="hidden items-center justify-center px-2 text-dim md:flex" aria-hidden="true">
                      <HandArrow className="w-8" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {profileData.tagline && (
            <motion.p
              className="mt-10 max-w-max -rotate-1 font-hand text-hand leading-tight text-primary-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {profileData.tagline}
            </motion.p>
          )}
        </div>
      </section>

      {/* Credentials are supporting proof, not the main narrative, so they sit
          after the career + working-method story. */}
      {profileData.certifications && profileData.certifications.length > 0 && (
        <section className="border-t py-20 rule-t">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              eyebrow={t("cv.certifications")}
              title={t("credentials.heading")}
            />
            <ul className="max-w-2xl space-y-3">
              {profileData.certifications.slice(0, 4).map((cert, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-baseline gap-x-2 text-sm text-text-meta"
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
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-caps text-primary-600 hover:text-primary-500"
            >
              {t("credentials.viewAll")} <HandArrow />
            </Link>
          </div>
        </section>
      )}

      {TESTIMONIALS_PUBLISHED && testimonials.length > 0 && (
        <section className="border-t py-20 rule-t">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              eyebrow={t("about.testimonials.eyebrow")}
              title={t("about.testimonials.heading")}
            />
            <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map((item, i) => (
                <motion.blockquote
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="border-l-2 pl-5 pt-1 rule-edge-l [--rule-line-color:var(--primary-600)]"
                >
                  <p className="font-hand text-quote leading-snug text-text-meta">
                    “{item.quote}”
                  </p>
                  <cite className="mt-4 block not-italic">
                    <span className="block text-sm font-black text-text">{item.name}</span>
                    <span className="mt-1 block text-2xs font-bold uppercase text-dim">
                      {item.role}
                      {item.company && <> · {item.company}</>}
                    </span>
                  </cite>
                  {item.source && (
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-2xs font-bold uppercase tracking-caps text-primary-600 hover:text-primary-500"
                    >
                      {t("about.testimonials.source")}
                    </a>
                  )}
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {voluntaryItems.length > 0 && (
        <section className="border-t py-20 rule-t">
          <div className="container mx-auto px-4 md:px-8">
            <motion.p
              className="mb-8 text-2xs font-extrabold uppercase text-primary-600"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t("about.beyondTheBrief")}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {voluntaryItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`group border-t bg-bg px-5 py-5 rule-t transition-colors duration-300 hover:bg-blush-weak dark:hover:bg-[var(--color-blush-100)] ${
                    i % 2 === 1 ? "md:border-l md:rule-l" : ""
                  }`}
                >
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <h3 className="text-sm font-black text-text transition-colors duration-300 dark:group-hover:text-[var(--color-ink-900)]">{item.title}</h3>
                    <span className="ml-4 shrink-0 text-2xs font-semibold uppercase text-secondary-600 transition-colors duration-300 dark:group-hover:text-[var(--color-rose-600)]">
                      {item.year}
                    </span>
                  </div>
                  <p className="mb-1.5 text-2xs font-bold uppercase text-dim transition-colors duration-300 dark:group-hover:text-[var(--color-ink-700)]">{item.org}</p>
                  {item.desc && <p className="text-xs leading-relaxed text-dim transition-colors duration-300 dark:group-hover:text-[var(--color-ink-700)]">{item.desc}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t py-20 rule-t">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div>
              <p className="mb-2 text-2xs font-extrabold uppercase text-primary-600">
                {t("about.whatsNext")}
              </p>
              <h2 className="type-section">
                <span
                  className="ink-highlight dark:[background-size:100%_1em] dark:[background-position:0_50%]"
                >
                  {profileData.roleSub}
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="bg-primary px-8 py-3 text-xs font-black uppercase tracking-caps text-white rule-fill transition-all duration-200 hover:bg-primary-600 hover:[color:var(--on-primary-600)]"
              >
                {t("about.viewProjects")}
              </Link>
              <Link
                to="/cv"
                className="border px-8 py-3 text-xs font-black uppercase tracking-caps text-text rule-frame [--rule-line-color:rgb(var(--text-rgb)/0.3)] transition-all duration-200 hover:border-secondary hover:text-secondary-600"
              >
                {t("about.viewCV")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
