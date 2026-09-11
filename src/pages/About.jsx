// About is the narrative page: who she is now, the career path that produced
// that position (and why each stage led to the next), how the combination
// works in practice, then the supporting proof. It does not repeat the
// homepage: the bio opens it once, the career arc carries the story, and
// the working-method section has its own copy rather than the hero's.
// Human-facing profile copy stays in data.json; this page only composes it.

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { profileData as rawProfile, coreExpertise } from "../data/profile";
import { SkillTagRow } from "../components/SkillTagRow";
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

// The one label role, sitewide: 12px mono caps (see theme.css --fs-label).
const EYEBROW = "font-mono text-label uppercase text-primary-600";

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <motion.div
      className="mb-12"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <p className={`mb-2 ${EYEBROW}`}>{eyebrow}</p>
      <h2 className="type-section">{title}</h2>
      {sub && <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-meta">{sub}</p>}
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
            <p className={`mb-4 ${EYEBROW}`}>{profileData.role}</p>
            <h1
              className="relative z-10 mb-7 font-display text-display font-extrabold text-text"
              style={{ fontVariationSettings: "'opsz' 96" }}
            >
              {t("about.heading")}
            </h1>
            <p className="max-w-[62ch] text-lg font-normal leading-relaxed text-text">
              {profileData.bio}
            </p>
            {/* What to hire her for, before the career story explains why:
                the first skills category in data.json, as the same chips the
                project cards use. The supporting breadth stays on the CV. */}
            {coreExpertise.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 font-mono text-label uppercase text-text-meta">
                  {t("cv.skillCategory.core")}
                </p>
                <SkillTagRow tags={coreExpertise} />
              </div>
            )}
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
              {/* The portrait keeps its one gesture — the print straightens
                  and colours in under the pointer. Decorative, not a control. */}
              <div className="photo-frame rule-frame-in -rotate-1 transition-transform duration-500 hover:rotate-0">
                <img
                  src={profileData.aboutImage}
                  alt={profileData.name}
                  width="880"
                  height="880"
                  className="h-auto w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why this profile exists: the career progression behind the current
          role. The sub-line is the causal thread the five cards then
          unfold — each stage changed the question, and kept the toolkit. */}
      <section className="relative border-t py-20 rule-t">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.howIGotHere")}
            title={t("about.theBridge")}
            sub={profileData.bridgeDescription}
          />
          <CareerArc variant="full" />
        </div>
      </section>

      {/* How the positioning works in practice: the Double Diamond, in her
          own words — not the hero's positioning sentence again. */}
      <section className="border-t py-20 rule-t">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow={t("about.methodology")}
            title={t("about.howIWork")}
          />

          <motion.div
            className="mb-10 max-w-3xl space-y-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-lg leading-[1.8] text-text">{t("about.doubleDiamond.intro")}</p>
            <p className="text-base leading-[1.8] text-text-meta">{t("about.doubleDiamond.intro2")}</p>
          </motion.div>

          <motion.figure
            className="mx-auto w-fit max-w-full"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* White mat in both themes: the drawing is ink on white paper,
                and inverting it would invert the coral annotations too. */}
            <div className="border rule-frame-in bg-white p-3 md:p-5">
              <img
                src="/assets/How-I-Work.jpg"
                alt={t("about.doubleDiamond.alt")}
                width="1672"
                height="652"
                className="mx-auto block h-auto w-auto max-w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 font-mono text-label uppercase leading-relaxed text-text-meta">
              {t("about.doubleDiamond.caption")}
            </figcaption>
          </motion.figure>
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
              className={`mt-6 inline-flex items-center gap-1.5 ${EYEBROW} hover:text-primary-500 focus-ring`}
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
                    <span className="mt-1 block font-mono text-label uppercase text-dim">
                      {item.role}
                      {item.company && <> · {item.company}</>}
                    </span>
                  </cite>
                  {item.source && (
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-2 inline-block ${EYEBROW} hover:text-primary-500`}
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
              className={`mb-8 ${EYEBROW}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t("about.beyondTheBrief")}
            </motion.p>

            {/* Plain ruled rows. These are not links, so they carry no
                hover surface — nothing here changes under the pointer. */}
            <ul className="grid grid-cols-1 list-none m-0 p-0 md:grid-cols-2">
              {voluntaryItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className={`border-t px-5 py-5 rule-t ${
                    i % 2 === 1 ? "md:border-l md:rule-l" : ""
                  }`}
                >
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <h3 className="text-sm font-black text-text">{item.title}</h3>
                    <span className="ml-4 shrink-0 font-mono text-label uppercase text-secondary-600">
                      {item.year}
                    </span>
                  </div>
                  <p className="mb-1.5 font-mono text-label uppercase text-dim">{item.org}</p>
                  {item.desc && <p className="text-xs leading-relaxed text-dim">{item.desc}</p>}
                </motion.li>
              ))}
            </ul>
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
              <p className={`mb-2 ${EYEBROW}`}>{t("about.whatsNext")}</p>
              <h2 className="type-section">
                <span
                  className="ink-highlight dark:[background-size:100%_1em] dark:[background-position:0_50%]"
                >
                  {profileData.roleSub}
                </span>
              </h2>
            </div>

            {/* One primary action, one quiet one — the same pair the hero
                offers, so the site never asks a reader to choose between
                two equally loud buttons. */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-text rule-fill-r text-bg px-6 py-3 rounded-sm text-base font-medium hover:opacity-90 transition-opacity duration-200 focus-ring"
              >
                {t("about.viewProjects")} <HandArrow />
              </Link>
              <Link
                to="/cv"
                className="relative text-base font-medium text-text pb-0.5 rule-underline hover:text-primary-600 transition-colors duration-200 focus-ring"
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
