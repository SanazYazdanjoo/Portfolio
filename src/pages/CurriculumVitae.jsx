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

  // Highlights is conditional on the same test that renders the section, so
  // the nav can't offer a link to an element that isn't in the document —
  // the rule volunteerWork already followed. A project losing its `cvMetric`
  // now removes the nav item with the section, not just the section.
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

            <div className="mb-10 print:mb-8">
              <h1 className="font-black text-primary uppercase leading-tight tracking-normal text-4xl md:text-5xl print:text-4xl">
                {role}
              </h1>
            </div>

          {/* Opaque, no backdrop-blur, own compositing layer — the treatment
              the project pages' pill bar had before phones there went to an
              in-flow index (git log: e64998c, 8e6a8c4 for the iOS mid-scroll
              layer-ordering and repaint story). */}
          <div className="md:hidden sticky top-0 z-40 bg-white border-b rule-edge-b -mx-6 px-6 py-3 no-print"
               style={{ transform: "translateZ(0)" }}>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {cvSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  aria-current={activeId === section.id ? "true" : undefined}
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
                {bio && (
                  <p className="text-base md:text-lg leading-relaxed text-gray-700 print:text-sm font-medium w-full">
                    {bio}
                  </p>
                )}
              </div>
            </section>

            <section id="experience" className="scroll-mt-32">
              <SectionHeading>{t("cv.experience")}</SectionHeading>
              <div className="space-y-5 print:space-y-4">
                {(experience || []).map((job, i) => (
                  <article
                    key={i}
                    className={`break-inside-avoid ${i > 0 ? "border-t rule-edge-t rule-faint pt-5" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 className="font-black text-lg text-black uppercase tracking-caps print:text-lg">
                        {job.company}
                      </h3>
                      <span className="text-xs font-bold text-gray-500 uppercase shrink-0 mt-1 sm:mt-0 sm:ml-4 print:text-xs">
                        {job.date}
                      </span>
                    </div>

                    <p className="text-base font-bold text-primary mb-3 print:text-base">
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

                    <ul className="list-disc list-outside ml-5 space-y-2 text-sm leading-relaxed text-gray-700 print:text-sm">
                      {(job.tasks || []).map((task, tIndex) => (
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
                cannot hold it.

                `cvContext` carries the attribution the case study states in
                full — team size, and what was mine within it. Without it a
                row reads as solo work, which for the six-person deskbird
                study it wasn't; the project page says so and a forwarded PDF
                has to say so too. Optional: projects that were solo simply
                omit the field and the row renders as before. */}
            {highlightRows.length > 0 && (
              <section id="highlights" className="mt-12 print:mt-8 scroll-mt-32">
                <SectionHeading>{t("cv.portfolioHighlights")}</SectionHeading>
                <div className="space-y-4 print:space-y-3">
                  {highlightRows.map(({ h, metric, href }) => (
                    <article key={h.id} className="break-inside-avoid">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                        <h3 className="font-black text-base text-black">
                          {h.title}
                        </h3>
                        <span className="text-xs font-bold text-primary uppercase tracking-caps">
                          {metric.value} {metric.label}
                        </span>
                      </div>
                      {h.cvContext && (
                        <p className="text-xs text-gray-600 mt-1">{h.cvContext}</p>
                      )}
                      <a
                        href={href}
                        className="text-xs text-primary underline underline-offset-2 mt-1 inline-block"
                      >
                        {href}
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section id="education" className="scroll-mt-32">
              <SectionHeading>{t("cv.education")}</SectionHeading>
              <div className="space-y-4 print:space-y-3">
                {(education || []).map((edu, i) => (
                  <article key={i} className="break-inside-avoid">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <div>
                        <h3 className="font-black text-base text-black uppercase tracking-caps">{edu.degree}</h3>
                        <p className="text-sm text-primary font-bold mt-1">{edu.institution}</p>
                      </div>
                      <span className="text-xs font-bold text-gray-500 uppercase mt-1 sm:mt-0 sm:ml-4 shrink-0">{edu.date}</span>
                    </div>
                    {edu.details && <p className="text-sm text-gray-700 mt-2">{edu.details}</p>}
                  </article>
                ))}
              </div>
            </section>

            <section id="skills" className="scroll-mt-32">
              <SectionHeading>{t("cv.skills")}</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:grid-cols-2 print:gap-4">
                {Object.entries(skills || {}).map(([category, items]) => (
                  <div key={category} className="break-inside-avoid">
                    <h3 className="font-black text-sm uppercase tracking-caps text-primary mb-2">
                      {SKILL_CATEGORY_KEYS[category] ? t(SKILL_CATEGORY_KEYS[category]) : category}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700">{items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="certificates" className="scroll-mt-32">
              <SectionHeading>{t("cv.certificates")}</SectionHeading>
              <div className="space-y-3">
                {cvCertifications.map((cert, i) => (
                  <article key={i} className="break-inside-avoid text-sm text-gray-700">
                    <span className="font-bold text-black">{cert.title}</span>
                    {cert.provider && <span> — {cert.provider}</span>}
                    {cert.year && <span className="text-gray-500"> ({cert.year})</span>}
                  </article>
                ))}
              </div>
              <Link to="/credentials" className="no-print inline-flex items-center gap-1 mt-4 text-xs font-black uppercase tracking-caps text-primary">
                {t("credentials.viewAll")} <HandArrow />
              </Link>
            </section>

            <section id="languages" className="scroll-mt-32">
              <SectionHeading>{t("cv.languages")}</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(languages || []).map((language, i) => (
                  <div key={i} className="flex justify-between gap-4 text-sm">
                    <span className="font-bold text-black">{language.language}</span>
                    <span className="text-gray-600">{language.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {volunteerWork && volunteerWork.length > 0 && (
              <section id="volunteerWork" className="scroll-mt-32">
                <SectionHeading>{t("cv.volunteerWork")}</SectionHeading>
                <div className="space-y-4">
                  {volunteerWork.map((item, i) => (
                    <article key={i} className="break-inside-avoid">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                        <div>
                          <h3 className="font-black text-base text-black uppercase tracking-caps">{item.role}</h3>
                          <p className="text-sm text-primary font-bold mt-1">{item.organization}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-500 uppercase mt-1 sm:mt-0 sm:ml-4 shrink-0">{item.date}</span>
                      </div>
                      {item.description && <p className="text-sm text-gray-700 mt-2">{item.description}</p>}
                    </article>
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

function SectionHeading({ children }) {
  return (
    <h2 className="font-black uppercase tracking-caps text-sm text-primary mb-4 border-b rule-edge-b pb-2">
      {children}
    </h2>
  );
}

export function CVSidebarNav({ sections, activeId }) {
  return (
    <nav aria-label="CV sections">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              aria-current={activeId === section.id ? "true" : undefined}
              className={`w-full text-left text-xs font-bold uppercase tracking-caps transition-colors ${
                activeId === section.id ? "text-primary" : "text-gray-500 hover:text-black"
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
