import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { getProject } from "../data/projects";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { HandArrow } from "../components/HandArrow";

// The skill groups are object keys in data.json, so they can't carry an
// { en, de } pair like every other field. Same shape as credentials.type.*:
// a known category resolves through the translation table, an unknown one
// (added later via /admin) falls back to the raw English key.
const SKILL_CATEGORY_KEYS = {
  "Frontend Engineering & Design": "cv.skillCategory.frontendEngineering",
  "Backend & Data": "cv.skillCategory.backendData",
  "UX Research & Testing": "cv.skillCategory.uxResearchDesign",
  "QA & Testing": "cv.skillCategory.qaTesting",
  "Analysis & Tools": "cv.skillCategory.analysisTools",
};

export default function CV() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();
  const {
    name,
    contact,
    aboutImage,
    role,
    profileSummary,
    bio,
    experience,
    skills,
    education,
    languages,
    certifications,
    volunteerWork,
    portfolioHighlights,
  } = profileData;

  const highlightRows = useMemo(
    () =>
      (portfolioHighlights || [])
        .map((h) => {
          const metric = Number.isInteger(h.cvMetric) ? h.metrics?.[h.cvMetric] : null;
          const href = getProject(h.id)?.href;
          return metric && href ? { h, metric, href } : null;
        })
        .filter(Boolean),
    [portfolioHighlights]
  );

  useDocumentMeta({
    title: `${role} — ${name}`,
    description: bio || profileSummary,
  });

  const cvCertifications = useMemo(() => {
    const featured = (certifications || []).filter((cert) => cert.featured);
    return featured.length > 0 ? featured : certifications || [];
  }, [certifications]);

  const cvSections = useMemo(
    () => [
      { id: "about", label: t("nav.about") },
      { id: "experience", label: t("cv.experience") },
      ...(highlightRows.length > 0
        ? [{ id: "highlights", label: t("cv.portfolioHighlights") }]
        : []),
      { id: "education", label: t("cv.education") },
      { id: "skills", label: t("cv.skills") },
      { id: "certificates", label: t("cv.certificates") },
      { id: "languages", label: t("cv.languages") },
      ...(volunteerWork && volunteerWork.length > 0
        ? [{ id: "volunteerWork", label: t("cv.volunteerWork") }]
        : []),
    ],
    [t, volunteerWork, highlightRows]
  );

  const [activeId, setActiveId] = useState(cvSections[0]?.id ?? null);

  useEffect(() => {
    if (cvSections.length === 0) return undefined;

    const observers = [];

    cvSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id);
        },
        { rootMargin: "-12% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [cvSections]);

  return (
    <div className="rule-light min-h-screen w-full bg-white text-black print:min-h-0">
      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-8 lg:px-12 print:max-w-none print:px-0">
        <div className="md:grid md:grid-cols-[170px_minmax(0,1fr)] lg:grid-cols-[190px_minmax(0,1fr)] md:gap-8 lg:gap-12 print:block">
          <aside className="hidden md:block no-print">
            <div className="sticky top-28 pt-16">
              <p className="mb-5 text-xs font-mono uppercase tracking-caps text-gray-400">
                CV
              </p>
              <CVSidebarNav sections={cvSections} activeId={activeId} />
            </div>
          </aside>

          <main
            id="curriculum-vitae"
            className="min-w-0 py-12 md:py-16 lg:py-20 print:p-0"
          >
            <div className="max-w-[940px]">
              <header className="cv-header border-b rule-edge-b pb-9 md:pb-10 print:pb-5">
                <div className="flex items-center gap-5 md:gap-6">
                  {aboutImage && (
                    <img
                      src={aboutImage}
                      alt={name}
                      className="h-16 w-16 shrink-0 rounded-full object-cover grayscale rule-disc md:h-20 md:w-20 print:h-14 print:w-14"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <h1 className="font-display text-2xl font-black leading-tight text-black md:text-3xl print:text-2xl">
                      {name}
                    </h1>
                    <p className="mt-1 text-base font-bold text-primary md:text-lg print:text-base">
                      {role}
                    </p>

                    {contact && (
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 md:text-sm print:mt-2 print:text-xs">
                        {contact.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="no-print-link transition-colors hover:text-primary"
                          >
                            {contact.email}
                          </a>
                        )}
                        {contact.email && contact.phone && <span aria-hidden="true">·</span>}
                        {contact.phone && (
                          <a
                            href={`tel:${String(contact.phone).replace(/\s+/g, "")}`}
                            className="no-print-link transition-colors hover:text-primary"
                          >
                            {contact.phone}
                          </a>
                        )}
                        {(contact.email || contact.phone) && contact.location && (
                          <span aria-hidden="true">·</span>
                        )}
                        {contact.location && <span>{contact.location}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </header>

              <div
                className="md:hidden sticky top-0 z-40 -mx-6 border-b rule-edge-b bg-white px-6 py-3 no-print"
                style={{ transform: "translateZ(0)" }}
              >
                <div className="flex gap-5 overflow-x-auto">
                  {cvSections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      aria-current={activeId === section.id ? "true" : undefined}
                      onClick={() =>
                        document
                          .getElementById(section.id)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className={`shrink-0 border-b-2 py-1 text-xs font-bold uppercase tracking-caps transition-colors ${
                        activeId === section.id
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-400 hover:text-black"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-14 pt-10 md:pt-12 print:space-y-8 print:pt-6">
                <section id="about" className="scroll-mt-28">
                  <SectionHeading>{t("nav.about")}</SectionHeading>
                  {bio && (
                    <p className="max-w-[76ch] text-base leading-7 text-gray-700 md:text-lg md:leading-8 print:max-w-none print:text-sm print:leading-relaxed">
                      {bio}
                    </p>
                  )}
                </section>

                <section id="experience" className="scroll-mt-28">
                  <SectionHeading>{t("cv.experience")}</SectionHeading>
                  <div className="divide-y divide-gray-200">
                    {(experience || []).map((job, i) => (
                      <article
                        key={i}
                        className="grid gap-3 py-7 first:pt-0 lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-8 print:grid-cols-[7rem_minmax(0,1fr)] print:gap-5 print:py-4"
                      >
                        <div className="pt-1">
                          <p className="font-mono text-xs font-semibold uppercase tracking-caps text-gray-400 print:text-2xs">
                            {job.date}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-black leading-snug text-black md:text-xl print:text-base">
                            {job.company}
                          </h3>
                          <p className="mt-1 text-sm font-bold text-primary md:text-base print:text-sm">
                            {job.role}
                          </p>

                          {job.impactMetrics && job.impactMetrics.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 print:mt-2 print:gap-x-3">
                              {job.impactMetrics.map((metric, metricIndex) => (
                                <span
                                  key={metricIndex}
                                  className="text-xs font-semibold leading-5 text-gray-600 print:text-2xs"
                                >
                                  <span aria-hidden="true" className="mr-1.5 text-primary">—</span>
                                  {metric}
                                </span>
                              ))}
                            </div>
                          )}

                          <ul className="mt-4 ml-4 list-disc space-y-2 text-sm leading-6 text-gray-700 marker:text-gray-400 print:mt-3 print:space-y-1 print:text-xs print:leading-relaxed">
                            {(job.tasks || []).map((task, taskIndex) => (
                              <li key={taskIndex} className="pl-1">
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                {highlightRows.length > 0 && (
                  <section id="highlights" className="scroll-mt-28">
                    <SectionHeading>{t("cv.portfolioHighlights")}</SectionHeading>
                    <div className="grid gap-4 md:grid-cols-3 print:grid-cols-3 print:gap-3">
                      {highlightRows.map(({ h, metric, href }) => (
                        <article
                          key={h.id}
                          className="flex min-h-full flex-col border-t-2 border-primary pt-4 print:pt-3"
                        >
                          <p className="font-mono text-xs font-semibold uppercase tracking-caps text-primary print:text-2xs">
                            {metric.value} {metric.label}
                          </p>
                          <h3 className="mt-2 font-display text-base font-black leading-snug text-black print:text-sm">
                            {h.title}
                          </h3>
                          {h.cvContext && (
                            <p className="mt-2 text-xs leading-5 text-gray-500 print:text-2xs">
                              {h.cvContext}
                            </p>
                          )}
                          <Link
                            to={href}
                            className="no-print mt-auto pt-4 text-xs font-bold text-primary underline decoration-primary/40 underline-offset-4"
                          >
                            {t("projects.readCaseStudy")}
                          </Link>
                          <span className="hidden pt-2 text-2xs text-gray-500 print:block">
                            {href}
                          </span>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                <section id="education" className="scroll-mt-28">
                  <SectionHeading>{t("cv.education")}</SectionHeading>
                  <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2 print:gap-4">
                    {(education || []).map((edu, i) => (
                      <article key={i} className="border-t border-gray-200 pt-4">
                        <p className="font-mono text-xs font-semibold uppercase tracking-caps text-gray-400 print:text-2xs">
                          {edu.date}
                        </p>
                        <h3 className="mt-2 font-display text-base font-black leading-snug text-black print:text-sm">
                          {edu.degree}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-primary print:text-xs">
                          {edu.institution}
                        </p>
                        {edu.details && (
                          <p className="mt-2 text-sm leading-6 text-gray-600 print:text-xs print:leading-relaxed">
                            {edu.details}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </section>

                <section id="skills" className="scroll-mt-28">
                  <SectionHeading>{t("cv.skills")}</SectionHeading>
                  <div className="grid gap-x-10 gap-y-7 md:grid-cols-2 print:grid-cols-2 print:gap-x-6 print:gap-y-4">
                    {Object.entries(skills || {}).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="text-xs font-black uppercase tracking-caps text-primary print:text-2xs">
                          {SKILL_CATEGORY_KEYS[category]
                            ? t(SKILL_CATEGORY_KEYS[category])
                            : category}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600 print:text-xs print:leading-relaxed">
                          {items.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="certificates" className="scroll-mt-28">
                  <SectionHeading>{t("cv.certificates")}</SectionHeading>
                  <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 print:grid-cols-2 print:gap-y-2">
                    {cvCertifications.map((cert, i) => (
                      <article key={i} className="border-t border-gray-200 pt-3 text-sm text-gray-600 print:text-xs">
                        <span className="font-bold text-black">{cert.title}</span>
                        {cert.provider && <span> · {cert.provider}</span>}
                        {cert.year && <span className="text-gray-400"> · {cert.year}</span>}
                      </article>
                    ))}
                  </div>
                  <Link
                    to="/credentials"
                    className="no-print mt-5 inline-flex items-center gap-1 text-xs font-black uppercase tracking-caps text-primary"
                  >
                    {t("credentials.viewAll")} <HandArrow />
                  </Link>
                </section>

                <section id="languages" className="scroll-mt-28">
                  <SectionHeading>{t("cv.languages")}</SectionHeading>
                  <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 print:grid-cols-2">
                    {(languages || []).map((language, i) => (
                      <div
                        key={i}
                        className="flex items-baseline justify-between gap-4 border-t border-gray-200 pt-3 text-sm print:text-xs"
                      >
                        <span className="font-bold text-black">{language.language}</span>
                        <span className="text-gray-500">{language.level}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {volunteerWork && volunteerWork.length > 0 && (
                  <section id="volunteerWork" className="scroll-mt-28">
                    <SectionHeading>{t("cv.volunteerWork")}</SectionHeading>
                    <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2 print:gap-4">
                      {volunteerWork.map((item, i) => (
                        <article key={i} className="border-t border-gray-200 pt-4">
                          <p className="font-mono text-xs font-semibold uppercase tracking-caps text-gray-400 print:text-2xs">
                            {item.date}
                          </p>
                          <h3 className="mt-2 font-display text-base font-black text-black print:text-sm">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm font-bold text-primary print:text-xs">
                            {item.organization}
                          </p>
                          {item.description && (
                            <p className="mt-2 text-sm leading-6 text-gray-600 print:text-xs print:leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </article>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="mb-6 flex items-center gap-4 print:mb-4">
      <h2 className="shrink-0 text-xs font-black uppercase tracking-[0.18em] text-primary print:text-2xs">
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

export function CVSidebarNav({ sections, activeId }) {
  return (
    <nav aria-label="CV sections">
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              aria-current={activeId === section.id ? "true" : undefined}
              className={`w-full border-l-2 py-2 pl-3 text-left text-xs font-bold uppercase tracking-caps transition-colors ${
                activeId === section.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:border-gray-300 hover:text-black"
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
