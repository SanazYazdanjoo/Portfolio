import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { profileData as rawProfile } from "../data/profile";
import { getProject } from "../data/projects";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useTranslation } from "../context/LanguageContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

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

  // Compact highlight rows: name + ONE metric + case-study URL per project.
  // `cvMetric` in data.json picks which metric renders here — the criterion
  // is a decision or a finding, never a headcount; the full metric set stays
  // in the data. A highlight without `cvMetric` (EmbraceMe, pending its
  // Phase 4 verdict) doesn't render a row. Links come from the aggregator's
  // canonical `href`, not a hand-built path.
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

  // The CV lists the credentials flagged `featured` in data.json, not all of
  // them — the full set (every LinkedIn Learning course included) would run
  // longer than the experience section and pushes the print layout onto an
  // extra page. "View all" below the list goes to the /credentials gallery.
  // No entry flagged → show everything, so the section never renders empty.
  const cvCertifications = useMemo(() => {
    const featured = (certifications || []).filter((cert) => cert.featured);
    return featured.length > 0 ? featured : certifications || [];
  }, [certifications]);

  const cvSections = useMemo(
    () => [
      { id: "about", label: t("nav.about") },
      { id: "experience", label: t("cv.experience") },
      { id: "highlights", label: t("cv.portfolioHighlights") },
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

  return (
    <div className="rule-light bg-white min-h-screen w-full print:min-h-0">
      <div className="flex items-start print:block">
        <aside className="hidden md:block w-[180px] lg:w-[220px] shrink-0 no-print sticky top-36 self-start pr-6 lg:pr-8">
          <div className="border-l rule-edge-l pl-3 py-2">
            <CVSidebarNav sections={cvSections} activeId={activeId} />
          </div>
        </aside>

        <div
          id="curriculum-vitae"
          className="
            w-full bg-white text-black md:border-l md:rule-edge-l
            px-6 py-12 md:px-16 lg:px-24 xl:px-32
            print:max-w-none print:px-8 print:py-8 print:m-0 print:border-0
          "
        >
          <div className="max-w-doc">
            {/* Name + contact — the one line that must survive both screen and
                print, so a forwarded/printed PDF is still attributable to a
                person, not just a role. `.cv-header` is exempt from the
                print stylesheet's chrome-kill rules (see index.css) on
                purpose — this block is content, not UI chrome. */}
            <header className="cv-header flex items-center gap-5 mb-6 print:mb-5">
              {aboutImage && (
                <img
                  src={aboutImage}
                  alt={name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full rule-disc object-cover shrink-0 grayscale"
                />
              )}
              <div>
                <p className="font-black text-black uppercase tracking-normal text-xl md:text-2xl print:text-xl leading-tight">
                  {name}
                </p>
                {contact && (
                  <p className="text-sm text-gray-600 mt-1 print:text-xs">
                    {[contact.email, contact.phone, contact.location].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </header>

            <h1 className="font-black text-primary uppercase leading-tight tracking-normal text-4xl md:text-5xl print:text-4xl mb-10 print:mb-8">
              {role}
            </h1>

          {/* Opaque, no backdrop-blur, own compositing layer — the same
              treatment as the project pages' MobilePillBar (see SectionNav.jsx
              for the iOS mid-scroll layer-ordering and repaint story). */}
          <div className="md:hidden sticky top-0 z-40 bg-white border-b rule-edge-b -mx-6 px-6 py-3 no-print"
               style={{ transform: "translateZ(0)" }}>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {cvSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`shrink-0 px-3 py-1.5 text-2xs font-black uppercase border rule-frame transition-colors duration-200 ${
                    activeId === section.id
                      ? "text-white [--rule-line-color:var(--primary)] [--rule-fill-color:var(--primary)]"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          </div>

          <div className="space-y-12 print:space-y-8 mt-6 md:mt-0">
            <section id="about" className="scroll-mt-32">
              <SectionHeading>{t("nav.about")}</SectionHeading>
              <div className="w-full">
                {(bio || profileSummary) && (
                  <p className="text-base md:text-lg leading-relaxed text-gray-700 print:text-sm font-medium w-full">
                    {bio || profileSummary}
                  </p>
                )}
              </div>
            </section>

            <section id="experience" className="scroll-mt-32">
              <SectionHeading>{t("cv.experience")}</SectionHeading>
              <div className="space-y-5 print:space-y-4">
                {experience.map((job, i) => (
                  <article
                    key={i}
                    className={`break-inside-avoid ${i > 0 ? "border-t rule-edge-t rule-faint pt-5" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="font-black text-xl text-black uppercase tracking-caps print:text-lg">
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
                              text-xs font-bold uppercase tracking-caps
                              text-primary border rule-frame [--rule-line-color:rgb(var(--primary-rgb)/0.2)]
                              [--rule-fill-color:rgb(var(--primary-rgb)/0.1)]
                              px-2 py-1
                              print:text-2xs
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

            {/* Portfolio Highlights — the compact bridge from CV to case
                studies: one line per project, one decisive metric, and the
                visible URL (a printed page can't click, so the address IS
                the content). Phase 6 has standing authority to cut this to
                two projects, or drop it, if the one-A4-page print test
                cannot hold it. */}
            {highlightRows.length > 0 && (
              <section id="highlights" className="mt-12 print:mt-8 scroll-mt-32">
                <SectionHeading>{t("cv.portfolioHighlights")}</SectionHeading>
                <ul className="space-y-3 print:space-y-2">
                  {highlightRows.map(({ h, metric, href }) => (
                    <li key={h.id} className="text-base print:text-sm leading-relaxed break-inside-avoid">
                      <Link to={href} className="font-bold text-gray-900 hover:text-primary">
                        {h.title}
                      </Link>
                      <span className="text-gray-700">
                        {" — "}
                        <span className="font-bold text-primary">{metric.value}</span> {metric.label}
                      </span>{" "}
                      <span className="text-sm print:text-xs text-gray-500 break-all">
                        · {contact.websiteHandle}
                        {href}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

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

            <section id="skills" className="scroll-mt-32">
              <SectionHeading sidebar>{t("cv.skills")}</SectionHeading>
              <div className="space-y-5 print:space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="break-inside-avoid">
                    <h3 className="text-sm font-black uppercase text-gray-500 tracking-caps mb-1.5 print:text-xs">
                      {SKILL_CATEGORY_KEYS[category]
                        ? t(SKILL_CATEGORY_KEYS[category], category)
                        : category}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-700 print:text-sm">
                      {Array.isArray(items) ? items.join(", ") : items}
                    </p>
                  </div>
                ))}
                {/* The former "AI-Assisted Development" chip category,
                    replaced by one evidence-pointing line: the IBS
                    aiAssistance paragraph is the claim's backing, so the
                    line links there instead of restating it as chips.
                    Printed, the link renders as plain text and the sentence
                    still names where the record lives. */}
                <p className="text-base leading-relaxed text-gray-700 print:text-sm break-inside-avoid">
                  {t("cv.aiAssisted.text")}{" "}
                  <Link
                    to="/projects/digitalising-ibs-travel-reimbursements"
                    className="text-primary font-semibold hover:underline"
                  >
                    → {t("cv.aiAssisted.link")}
                  </Link>
                </p>
              </div>
            </section>

            <section id="certificates" className="scroll-mt-32">
              <SectionHeading sidebar>{t("cv.certificates")}</SectionHeading>
              <div className="space-y-4 print:space-y-3">
                {cvCertifications.map((cert, i) => (
                  <div key={i} className="text-base leading-snug print:text-sm break-inside-avoid">
                    <p className="font-bold text-gray-900">{cert.title}</p>
                    <p className="text-gray-500 text-sm mt-1 print:text-xs">
                      {cert.provider} ({cert.year})
                      {(cert.file || cert.verifyUrl) && (
                        <a
                          href={cert.file || cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-print ml-2 text-primary-600 rule-underline"
                        >
                          {t("credentials.viewCredential")} &#8599;
                        </a>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                to="/credentials"
                className="no-print mt-5 inline-block text-sm font-bold text-primary-600 rule-underline"
              >
                {t("credentials.viewAll")} &rarr;
              </Link>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function CVSidebarNav({ sections, activeId }) {
  const { t } = useTranslation();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label={t("cv.sectionsAriaLabel")} className="pt-1">
      <p className="text-2xs font-black uppercase text-gray-500 mb-5 pl-3">
        {t("cv.onThisPage")}
      </p>
      <ul className="space-y-0.5">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-current={isActive ? "true" : undefined}
                className={`w-full text-left flex items-baseline gap-3 px-3 py-2 transition-colors duration-200 relative border-l-2
                  rule-edge-l ${
                  isActive
                    ? "[--rule-line-color:var(--primary)] text-primary"
                    : "[--rule-line-color:transparent] text-gray-500 hover:text-gray-900 hover:[--rule-line-color:rgb(209_213_219)]"
                }`}
              >
                <span className={`font-mono text-2xs font-bold uppercase tabular-nums shrink-0 ${
                  isActive ? "text-primary" : "text-gray-500"
                }`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`text-2xs font-bold uppercase leading-tight ${
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
        font-black uppercase tracking-caps border-b rule-edge-b
        ${sidebar
          ? "text-base text-primary pb-2 mb-6 print:text-sm print:mb-4"
          : "text-2xl text-primary [--rule-line-color:rgb(var(--primary-rgb)/0.3)] pb-3 mb-8 print:text-xl print:mb-6"
        }
      `}
    >
      {children}
    </h2>
  );
}