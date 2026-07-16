// src/pages/CurriculumVitae.jsx
import React, { useEffect, useMemo, useState } from "react";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";

export default function CV() {
  const profileData = useLocalizedProfile(rawProfile);
  const { t } = useTranslation();
  const {
    name,
    role,
    contact,
    profileSummary,
    experience,
    skills,
    education,
    languages,
    certifications,
    volunteerWork,
    photo,
  } = profileData;

  const cvSections = useMemo(
    () => [
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
          if (entry.isIntersecting) {
            setActiveId(section.id);
          }
        },
        { rootMargin: "-12% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [cvSections]);

  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="bg-white min-h-screen w-full print:min-h-0">
      <div
        id="curriculum-vitae"
        className="
          w-full max-w-screen-2xl mx-auto bg-white text-black
          px-6 py-12 md:px-16 lg:px-24 xl:px-32
          print:max-w-none print:px-8 print:py-8 print:m-0
        "
      >
        <div className="cv-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b-[3px] border-primary">
          <div className="flex items-center gap-6">
            {photo && (
              <img
                src={photo}
                alt={name}
                className="
                  w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shrink-0
                  border-2 border-gray-200
                  print:w-24 print:h-24
                "
              />
            )}

            <div>
              <h1 className="font-black text-primary uppercase leading-tight tracking-normal">
                <span className="block text-4xl md:text-5xl print:text-4xl">{firstName}</span>
                <span className="block text-4xl md:text-5xl print:text-4xl">{lastName}</span>
              </h1>
              <p className="text-sm md:text-base font-bold text-gray-500 mt-2 tracking-[0.15em] uppercase">
                {role}
              </p>
            </div>
          </div>

          <div className="text-left md:text-right text-sm md:text-base leading-relaxed text-gray-600 shrink-0 mt-4 md:mt-0">
            {contact.location && <p>{contact.location}</p>}
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            {contact.linkedinHandle && (
              <p className="text-primary font-medium">{contact.linkedinHandle}</p>
            )}
            {contact.githubHandle && (
              <p className="text-primary font-medium">{contact.githubHandle}</p>
            )}
            {contact.website && (
              <p className="text-primary font-medium">{contact.website}</p>
            )}
          </div>
        </div>

        {profileSummary && (
          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-10 print:text-sm print:mb-8 max-w-5xl">
            {profileSummary}
          </p>
        )}

        <div className="flex gap-10 lg:gap-14 items-start print:block">
          <aside className="hidden md:block w-[180px] lg:w-[220px] shrink-0 no-print sticky top-36 self-start">
            <div className="border-l border-gray-200 pl-3">
              <CVSidebarNav sections={cvSections} activeId={activeId} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="md:hidden sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 -mx-6 px-6 py-3 no-print">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {cvSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`shrink-0 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] border transition-colors duration-200 ${
                      activeId === section.id
                        ? "bg-primary text-white border-primary"
                        : "text-gray-500 border-gray-200 hover:text-primary"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2.5fr_1fr] gap-12 lg:gap-16 print:grid-cols-[2fr_1fr] print:gap-8 mt-6 md:mt-0">
              <div>
                <section id="experience" className="scroll-mt-32">
                  <SectionHeading>{t("cv.experience")}</SectionHeading>
                  <div className="space-y-8 print:space-y-6">
                    {experience.map((job, i) => (
                      <article key={i} className="break-inside-avoid">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                          <h3 className="font-black text-xl text-black uppercase tracking-wide print:text-lg">
                            {job.company}
                          </h3>
                          <span className="text-sm font-bold text-gray-500 uppercase shrink-0 mt-1 sm:mt-0 sm:ml-4 print:text-xs">
                            {job.date}
                          </span>
                        </div>

                        <p className="text-lg font-bold text-primary mb-3 print:text-base">
                          {job.role}
                        </p>

                        {job.impactMetrics && job.impactMetrics.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.impactMetrics.map((m, mi) => (
                              <span
                                key={mi}
                                className="
                                  text-xs font-bold uppercase tracking-wider
                                  bg-primary/10 text-primary border border-primary/20
                                  px-2 py-1 rounded-sm
                                  print:text-[10px]
                                "
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        <ul className="list-disc list-outside ml-5 space-y-2 text-base leading-relaxed text-gray-700 print:text-sm">
                          {job.tasks.map((task, tIndex) => (
                            <li key={tIndex}>{task}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="education" className="mt-12 print:mt-8 scroll-mt-32">
                  <SectionHeading>{t("cv.education")}</SectionHeading>
                  <div className="space-y-6 print:space-y-5">
                    {education.map((edu, i) => (
                      <div key={i} className="break-inside-avoid">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                          <p className="font-black text-lg text-black print:text-base">
                            {edu.degree}
                          </p>
                          <span className="text-sm text-gray-500 shrink-0 mt-1 sm:mt-0 sm:ml-4 print:text-xs">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-base text-gray-600 print:text-sm mb-1">
                          {edu.school}
                        </p>
                        {edu.grade && (
                          <p className="text-sm text-gray-600 print:text-xs">{edu.grade}</p>
                        )}
                        {edu.awards?.map((a, ai) => (
                          <p key={ai} className="text-primary font-semibold text-sm mt-1 print:text-xs">
                            ★ {a}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="md:border-l border-gray-200 md:pl-8 lg:pl-10 print:border-l print:pl-6 space-y-10 print:space-y-8">
                <section id="skills" className="scroll-mt-32">
                  <SectionHeading sidebar>{t("cv.skills")}</SectionHeading>
                  <div className="space-y-5 print:space-y-4">
                    {Object.entries(skills).map(([category, items]) => (
                      <div key={category} className="break-inside-avoid">
                        <h3 className="text-sm font-black uppercase text-gray-500 tracking-widest mb-1.5 print:text-xs">
                          {category}
                        </h3>
                        <p className="text-base leading-relaxed text-gray-700 print:text-sm">
                          {Array.isArray(items) ? items.join(", ") : items}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="certificates" className="scroll-mt-32">
                  <SectionHeading sidebar>{t("cv.certificates")}</SectionHeading>
                  <div className="space-y-4 print:space-y-3">
                    {certifications.map((cert, i) => (
                      <div key={i} className="text-base leading-snug print:text-sm break-inside-avoid">
                        <p className="font-bold text-gray-900">{cert.title}</p>
                        <p className="text-gray-500 text-sm mt-1 print:text-xs">
                          {cert.provider} ({cert.year})
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="languages" className="scroll-mt-32">
                  <SectionHeading sidebar>{t("cv.languages")}</SectionHeading>
                  <div className="space-y-3">
                    {languages.map((lang, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-base print:text-sm">
                        <span className="font-bold text-gray-900">{lang.name}</span>
                        <span className="text-gray-500 italic text-sm mt-0.5 sm:mt-0 print:text-xs">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {volunteerWork && volunteerWork.length > 0 && (
                  <section id="volunteerWork" className="scroll-mt-32">
                    <SectionHeading sidebar>{t("cv.volunteerWork")}</SectionHeading>
                    <div className="space-y-3">
                      {volunteerWork.map((item, i) => (
                        <p key={i} className="text-base leading-snug text-gray-700 print:text-sm break-inside-avoid">
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CVSidebarNav({ sections, activeId }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="CV sections">
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gray-500 mb-4">
        On this page
      </p>
      <ul className="space-y-1">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2 border-l-2 transition-all duration-200 ${
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-[0.24em] tabular-nums shrink-0 ${
                  isActive ? "text-primary" : "text-gray-500"
                }`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
                  isActive ? "text-primary" : "text-gray-600"
                }`}>
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

function SectionHeading({ children, sidebar = false }) {
  return (
    <h2
      className={`
        font-black uppercase tracking-widest border-b
        ${sidebar
          ? "text-base text-primary border-gray-200 pb-2 mb-6 print:text-sm print:mb-4"
          : "text-2xl text-primary border-primary/30 pb-3 mb-8 print:text-xl print:mb-6"
        }
      `}
    >
      {children}
    </h2>
  );
}