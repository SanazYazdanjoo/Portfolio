// src/pages/CurriculumVitae.jsx
import React from "react";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
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

  // Split "Sanaz Yazdanjoo" → stacked lines
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="bg-bg min-h-screen py-10 px-4 print:p-0 print:m-0 print:bg-white print:min-h-0">

      {/* ── Download Button — hidden on print ── */}
      <div className="max-w-[850px] mx-auto mb-6 flex justify-end no-print">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-primary text-white font-bold text-sm rounded-sm shadow-md hover:bg-primary/90 transition-all tracking-wider uppercase"
        >
          {t("cv.saveAsPdf")}
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          DOCUMENT CONTAINER
          Allows content to flow naturally over multiple pages
      ═══════════════════════════════════════════ */}
      <div
        id="curriculum-vitae"
        className="
          max-w-[850px] mx-auto bg-white text-black shadow-xl
          px-10 py-12
          print:shadow-none print:max-w-none print:m-0
          print:px-8 print:py-8
        "
      >

        {/* ── CV HEADER ── */}
        <div className="cv-header flex items-end justify-between gap-6 pb-6 mb-6 border-b-[3px] border-primary">

          <div className="flex items-center gap-6">
            {/* Photo */}
            {photo && (
              <img
                src={photo}
                alt={name}
                className="
                  w-24 h-24 rounded-full object-cover shrink-0
                  border-2 border-gray-200
                  print:w-20 print:h-20
                "
              />
            )}

            {/* Stacked Name + Role */}
            <div>
              <h1 className="font-black text-primary uppercase leading-tight tracking-normal">
                <span className="block text-4xl print:text-3xl">{firstName}</span>
                <span className="block text-4xl print:text-3xl">{lastName}</span>
              </h1>
              <p className="text-sm font-bold text-gray-500 mt-2 tracking-[0.15em] uppercase">
                {role}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="text-right text-sm leading-relaxed text-gray-600 shrink-0">
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

        {/* ── PROFILE SUMMARY ── */}
        {profileSummary && (
          <p className="text-sm leading-relaxed text-gray-700 mb-8 print:mb-6">
            {profileSummary}
          </p>
        )}

        {/* ── BODY: 65 / 35 grid ── */}
        <div className="grid grid-cols-[1.7fr_1fr] gap-10 print:gap-8">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div>

            {/* ── Work Experience ── */}
            <SectionHeading>{t("cv.experience")}</SectionHeading>
            <div className="space-y-6 print:space-y-5">
              {experience.map((job, i) => (
                <article key={i} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-black text-lg text-black uppercase tracking-wide print:text-base">
                      {job.company}
                    </h3>
                    <span className="text-xs font-bold text-gray-500 uppercase shrink-0 ml-4 print:text-[11px]">
                      {job.date}
                    </span>
                  </div>

                  <p className="text-base font-bold text-primary mb-2 print:text-sm">
                    {job.role}
                  </p>

                  {job.impactMetrics && job.impactMetrics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
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

                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm leading-relaxed text-gray-700 print:text-[13px]">
                    {job.tasks.map((task, t) => (
                      <li key={t}>{task}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* ── Education ── */}
            <div className="mt-8 print:mt-6">
              <SectionHeading>{t("cv.education")}</SectionHeading>
              <div className="space-y-5 print:space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                      <p className="font-black text-base text-black print:text-sm">
                        {edu.degree}
                      </p>
                      <span className="text-xs text-gray-500 shrink-0 ml-4 print:text-[11px]">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 print:text-[13px] mb-1">
                      {edu.school}
                    </p>
                    {edu.awards?.map((a, ai) => (
                      <p key={ai} className="text-primary font-semibold text-sm mt-1 print:text-[13px]">
                        ★ {a}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT SIDEBAR ══════════════ */}
          <aside className="border-l border-gray-200 pl-8 print:pl-6 space-y-8 print:space-y-6">

            <section>
              <SectionHeading sidebar>{t("cv.skills")}</SectionHeading>
              <div className="space-y-4 print:space-y-3">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="break-inside-avoid">
                    <h3 className="text-xs font-black uppercase text-gray-500 tracking-widest mb-1 print:text-[11px]">
                      {category}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700 print:text-[13px]">
                      {Array.isArray(items) ? items.join(", ") : items}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading sidebar>{t("cv.certificates")}</SectionHeading>
              <div className="space-y-3 print:space-y-2">
                {certifications.map((cert, i) => (
                  <div key={i} className="text-sm leading-snug print:text-[13px] break-inside-avoid">
                    <p className="font-bold text-gray-900">{cert.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {cert.provider} ({cert.year})
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading sidebar>{t("cv.languages")}</SectionHeading>
              <div className="space-y-2">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-baseline text-sm print:text-[13px]">
                    <span className="font-bold text-gray-900">{lang.name}</span>
                    <span className="text-gray-500 italic text-xs">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {volunteerWork && volunteerWork.length > 0 && (
              <section>
                <SectionHeading sidebar>{t("cv.volunteerWork")}</SectionHeading>
                <div className="space-y-2">
                  {volunteerWork.map((item, i) => (
                    <p key={i} className="text-sm leading-snug text-gray-700 print:text-[13px] break-inside-avoid">
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
  );
}

function SectionHeading({ children, sidebar = false }) {
  return (
    <h2
      className={`
        font-black uppercase tracking-widest border-b
        ${sidebar
          ? "text-sm text-primary border-gray-200 pb-2 mb-4 print:text-[13px] print:mb-3"
          : "text-xl text-primary border-primary/30 pb-2 mb-5 print:text-lg print:mb-4"
        }
      `}
    >
      {children}
    </h2>
  );
}