import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { HandArrow } from "../components/HandArrow";

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
  } = profileData;

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
      { id: "education", label: t("cv.education") },
      { id: "skills", label: t("cv.skills") },
      { id: "certificates", label: t("cv.certificates") },
      { id: "languages", label: t("cv.languages") },
      ...(volunteerWork && volunteerWork.length > 0
        ? [{ id: "volunteerWork", label: t("cv.volunteerWork") }]
        : []),
    ],
    [t, volunteerWork]
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
        { rootMargin: "-14% 0px -64% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [cvSections]);

  return (
    <div className="rule-light min-h-screen w-full bg-white text-black print:min-h-0">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8 lg:px-12 xl:px-16 print:max-w-none print:px-0">
        <div className="md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-16 print:block">
          <aside className="hidden md:block no-print">
            <div className="sticky top-20 py-14 lg:py-16">
              <div className="border-l rule-edge-l pl-6 [--rule-line-color:var(--primary-600)]">
                {aboutImage && (
                  <img
                    src={aboutImage}
                    alt={name}
                    className="h-24 w-24 rounded-full object-cover grayscale rule-disc lg:h-28 lg:w-28"
                  />
                )}

                <h1 className="mt-5 font-display text-2xl font-black leading-tight text-black lg:text-[1.7rem]">
                  {name}
                </h1>
                <p className="mt-2 text-sm font-bold text-primary lg:text-base">
                  {role}
                </p>

                {contact && (
                  <div className="mt-6 space-y-2 text-xs leading-5 text-gray-500">
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="block break-all transition-colors hover:text-primary"
                      >
                        {contact.email}
                      </a>
                    )}
                    {contact.phone && (
                      <a
                        href={`tel:${String(contact.phone).replace(/\s+/g, "")}`}
                        className="block transition-colors hover:text-primary"
                      >
                        {contact.phone}
                      </a>
                    )}
                    {contact.location && <p>{contact.location}</p>}
                  </div>
                )}
              </div>

              <div className="my-9 rule-line rule-soft" />
              <CVSidebarNav sections={cvSections} activeId={activeId} />
            </div>
          </aside>

          <main
            id="curriculum-vitae"
            className="min-w-0 py-10 md:py-14 lg:py-16 print:p-0"
          >
            <header className="cv-header no-print border-b rule-b rule-soft pb-8 md:hidden">
              <div className="flex items-center gap-5">
                {aboutImage && (
                  <img
                    src={aboutImage}
                    alt={name}
                    className="h-16 w-16 shrink-0 rounded-full object-cover grayscale rule-disc"
                  />
                )}
                <div className="min-w-0">
                  <h1 className="font-display text-2xl font-black leading-tight text-black">
                    {name}
                  </h1>
                  <p className="mt-1 text-sm font-bold text-primary">{role}</p>
                  {contact && (
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {[contact.email, contact.phone, contact.location].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            </header>

            <header className="cv-header hidden print:flex print:items-center print:gap-5 print:border-b print:border-gray-300 print:pb-5">
              {aboutImage && (
                <img
                  src={aboutImage}
                  alt={name}
                  className="h-14 w-14 rounded-full object-cover grayscale rule-disc"
                />
              )}
              <div>
                <h1 className="font-display text-2xl font-black leading-tight text-black">
                  {name}
                </h1>
                <p className="mt-1 text-sm font-bold text-primary">{role}</p>
                {contact && (
                  <p className="mt-1 text-xs text-gray-500">
                    {[contact.email, contact.phone, contact.location].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </header>

            <div
              className="md:hidden sticky top-0 z-40 -mx-6 border-b rule-b rule-soft bg-white px-6 py-3 no-print"
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
                    className={`relative shrink-0 py-1.5 text-xs font-bold uppercase tracking-caps transition-colors ${
                      activeId === section.id
                        ? "text-primary"
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {section.label}
                    {activeId === section.id && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-1 h-[5px] bg-primary rule-stroke"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-[960px] pt-9 md:pt-0 print:max-w-none print:pt-6">
              <section id="about" className="scroll-mt-28">
                <SectionHeading>{t("nav.about")}</SectionHeading>
                {bio && (
                  <div className="border-l rule-edge-l pl-5 md:pl-7 [--rule-line-color:var(--primary-600)]">
                    <p className="max-w-[70ch] text-[1.05rem] leading-8 text-gray-700 md:text-[1.14rem] md:leading-8 print:max-w-none print:text-sm print:leading-relaxed">
                      {bio}
                    </p>
                  </div>
                )}
              </section>

              <section id="experience" className="mt-14 scroll-mt-28 print:mt-8">
                <SectionHeading>{t("cv.experience")}</SectionHeading>
                <div className="border-b rule-b rule-soft">
                  {(experience || []).map((job, i) => (
                    <ExperienceEntry key={i} job={job} t={t} first={i === 0} />
                  ))}
                </div>
              </section>

              <section id="education" className="mt-14 scroll-mt-28 print:mt-8">
                <SectionHeading>{t("cv.education")}</SectionHeading>
                <div className="grid gap-x-10 gap-y-6 md:grid-cols-2 print:grid-cols-2 print:gap-x-6 print:gap-y-4">
                  {(education || []).map((edu, i) => (
                    <article key={i} className="border-t rule-t rule-soft pt-4">
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 print:text-2xs">
                        {edu.date}
                      </p>
                      <h3 className="mt-2 font-display text-base font-black leading-snug text-black">
                        {edu.degree}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-primary">
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

              <section id="skills" className="mt-14 scroll-mt-28 print:mt-8">
                <SectionHeading>{t("cv.skills")}</SectionHeading>
                <div className="grid gap-x-10 gap-y-7 md:grid-cols-2 print:grid-cols-2 print:gap-x-6 print:gap-y-4">
                  {Object.entries(skills || {}).map(([category, items]) => (
                    <div key={category} className="border-t rule-t rule-soft pt-4">
                      <h3 className="text-xs font-black uppercase tracking-caps text-primary print:text-2xs">
                        {SKILL_CATEGORY_KEYS[category]
                          ? t(SKILL_CATEGORY_KEYS[category])
                          : category}
                      </h3>
                      <p className="mt-2 text-[0.94rem] leading-6 text-gray-600 print:text-xs print:leading-relaxed">
                        {items.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="certificates" className="mt-14 scroll-mt-28 print:mt-8">
                <SectionHeading>{t("cv.certificates")}</SectionHeading>
                <div className="grid gap-x-8 gap-y-5 md:grid-cols-2 print:grid-cols-2 print:gap-y-2">
                  {cvCertifications.map((cert, i) => (
                    <article key={i} className="border-t rule-t rule-soft pt-4">
                      <h3 className="text-sm font-bold leading-5 text-black print:text-xs">
                        {cert.title}
                      </h3>
                      {(cert.provider || cert.year) && (
                        <p className="mt-1 text-xs leading-5 text-gray-500 print:text-2xs">
                          {[cert.provider, cert.year].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
                <Link
                  to="/credentials"
                  className="no-print mt-6 inline-flex items-center gap-1 text-xs font-black uppercase tracking-caps text-primary"
                >
                  {t("credentials.viewAll")} <HandArrow />
                </Link>
              </section>

              <section id="languages" className="mt-14 scroll-mt-28 print:mt-8">
                <SectionHeading>{t("cv.languages")}</SectionHeading>
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-x-5 print:gap-y-2">
                  {(languages || []).map((language, i) => (
                    <div
                      key={i}
                      className="flex items-baseline justify-between gap-4 border-t rule-t rule-soft pt-4 text-sm print:text-xs"
                    >
                      <span className="font-bold text-black">{language.language}</span>
                      <span className="text-gray-500">{language.level}</span>
                    </div>
                  ))}
                </div>
              </section>

              {volunteerWork && volunteerWork.length > 0 && (
                <section id="volunteerWork" className="mt-14 scroll-mt-28 print:mt-8">
                  <SectionHeading>{t("cv.volunteerWork")}</SectionHeading>
                  <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2 print:gap-4">
                    {volunteerWork.map((item, i) => (
                      <article key={i} className="border-t rule-t rule-soft pt-4">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 print:text-2xs">
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
          </main>
        </div>
      </div>
    </div>
  );
}

function ExperienceEntry({ job, t, first = false }) {
  const tasks = job.tasks || [];
  const [expanded, setExpanded] = useState(false);
  const hasMore = tasks.length > 2;
  const visibleTasks = expanded || !hasMore ? tasks : tasks.slice(0, 2);

  return (
    <article
      className={`py-9 print:py-4 ${
        first ? "" : "border-t rule-t rule-soft"
      }`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-black leading-snug text-black md:text-[1.4rem] print:text-base">
            {job.company}
          </h3>
          <p className="mt-1 text-sm font-bold text-primary md:text-base print:text-sm">
            {job.role}
          </p>
        </div>
        <p className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 sm:pt-1 print:text-2xs">
          {job.date}
        </p>
      </div>

      {job.impactMetrics && job.impactMetrics.length > 0 && (
        <div className="mt-4 border-l rule-l rule-soft pl-4 print:mt-2 print:border-0 print:pl-0">
          <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 print:flex print:flex-wrap print:gap-x-3">
            {job.impactMetrics.map((metric, metricIndex) => (
              <span
                key={metricIndex}
                className="text-xs font-semibold leading-5 text-gray-600 print:text-2xs"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      )}

      {tasks.length > 0 && (
        <>
          <ul className="no-print mt-5 ml-4 max-w-[76ch] list-disc space-y-2.5 text-[0.92rem] leading-6 text-gray-700 marker:text-gray-400">
            {visibleTasks.map((task, taskIndex) => (
              <li key={taskIndex} className="pl-1">{task}</li>
            ))}
          </ul>

          <ul className="hidden mt-3 ml-4 list-disc space-y-1 text-xs leading-relaxed text-gray-700 print:block">
            {tasks.map((task, taskIndex) => (
              <li key={taskIndex} className="pl-1">{task}</li>
            ))}
          </ul>

          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="no-print mt-4 text-xs font-bold uppercase tracking-caps text-primary transition-colors hover:text-black focus-ring"
              aria-expanded={expanded}
            >
              {expanded ? t("common.readLess") : t("common.readMore")}
            </button>
          )}
        </>
      )}
    </article>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="mb-7 flex items-end gap-4 print:mb-4">
      <h2 className="shrink-0 font-display text-[0.78rem] font-black uppercase tracking-[0.17em] text-primary print:text-xs">
        {children}
      </h2>
      <span aria-hidden="true" className="mb-0.5 flex-1 rule-line rule-soft" />
    </div>
  );
}

export function CVSidebarNav({ sections, activeId }) {
  return (
    <nav aria-label="CV sections">
      <ul className="space-y-1">
        {sections.map((section, index) => {
          const active = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                aria-current={active ? "true" : undefined}
                className={`group relative flex w-full items-baseline gap-3 py-2 pl-4 text-left transition-colors ${
                  active ? "text-primary" : "text-gray-400 hover:text-black"
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 top-1 w-[5px] bg-primary rule-stroke-v"
                  />
                )}
                <span className="font-mono text-2xs tracking-[0.14em] text-gray-300 group-hover:text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-bold uppercase tracking-caps">
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
