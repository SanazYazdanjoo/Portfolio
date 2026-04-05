// src/pages/CurriculumVitae.jsx
import React from "react";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';

export default function CV() {
  const profileData = useLocalizedProfile(rawProfile);
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
          Save as PDF
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          A4 DOCUMENT — single page target
          Screen: simulated A4 with shadow + padding
          Print: @page handles outer margins,
                 container keeps small inner padding
      ═══════════════════════════════════════════ */}
      <div
        id="curriculum-vitae"
        className="
          max-w-[850px] mx-auto bg-white text-black shadow-xl
          px-10 py-8
          print:shadow-none print:max-w-none print:m-0
          print:px-2 print:py-2
        "
      >

        {/* ── CV HEADER (<div> to survive print CSS) ── */}
        <div className="cv-header flex items-end justify-between gap-5 pb-4 mb-3 border-b-[3px] border-primary">

          <div className="flex items-center gap-5">
            {/* Photo */}
            {photo && (
              <img
                src={photo}
                alt={name}
                className="
                  w-[72px] h-[72px] rounded-full object-cover shrink-0
                  border-2 border-gray-200
                  print:w-[60px] print:h-[60px]
                "
              />
            )}

            {/* Stacked Name + Role */}
            <div>
              <h1 className="font-black text-primary uppercase leading-[1.1] tracking-normal">
                <span className="block text-[28px] print:text-[24px]">{firstName}</span>
                <span className="block text-[28px] print:text-[24px]">{lastName}</span>
              </h1>
              <p className="text-[11px] font-semibold text-gray-500 mt-1 tracking-[0.15em] uppercase print:text-[10px]">
                {role}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="text-right text-[10px] leading-[1.6] text-gray-600 shrink-0 print:text-[9px]">
            {contact.location && <p>{contact.location}</p>}
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            {contact.linkedinHandle && (
              <p className="text-primary font-medium">{contact.linkedinHandle}</p>
            )}
            {contact.githubHandle && (
              <p className="text-primary font-medium">{contact.githubHandle}</p>
            )}
          </div>
        </div>

        {/* ── PROFILE SUMMARY ── */}
        {profileSummary && (
          <p className="text-[10px] leading-relaxed text-gray-600 mb-4 print:text-[9px] print:leading-snug print:mb-3">
            {profileSummary}
          </p>
        )}

        {/* ── BODY: 65 / 35 grid ── */}
        <div className="grid grid-cols-[1.7fr_1fr] gap-8 print:gap-5">

          {/* ══════════════ LEFT COLUMN ══════════════ */}
          <div>

            {/* ── Work Experience ── */}
            <SectionHeading>Work Experience</SectionHeading>
            <div className="space-y-3.5 print:space-y-2.5">
              {experience.map((job, i) => (
                <article key={i} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-black text-[11px] text-black uppercase tracking-wide print:text-[10px]">
                      {job.company}
                    </h3>
                    <span className="text-[9px] font-semibold text-gray-400 uppercase shrink-0 ml-2 print:text-[8.5px]">
                      {job.date}
                    </span>
                  </div>

                  <p className="text-[10px] font-bold text-primary mb-1 print:text-[9px]">
                    {job.role}
                  </p>

                  {job.impactMetrics && job.impactMetrics.length > 0 && (
                    <div className="flex flex-wrap gap-x-1 gap-y-0.5 mb-1.5">
                      {job.impactMetrics.map((m, mi) => (
                        <span
                          key={mi}
                          className="
                            text-[7.5px] font-bold uppercase tracking-wider
                            bg-primary/8 text-primary border border-primary/20
                            px-1.5 py-[1px]
                            print:text-[7px] print:border-primary/30
                          "
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="list-disc list-outside ml-3 space-y-0.5 text-[9.5px] leading-snug text-gray-700 print:text-[8.5px]">
                    {job.tasks.map((task, t) => (
                      <li key={t}>{task}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* ── Education ── */}
            <div className="mt-5 print:mt-3">
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-2 print:space-y-1.5">
                {education.map((edu, i) => (
                  <div key={i} className="break-inside-avoid">
                    <div className="flex justify-between items-baseline">
                      <p className="font-black text-[10.5px] text-black print:text-[9.5px]">
                        {edu.degree}
                      </p>
                      <span className="text-[8.5px] text-gray-400 shrink-0 ml-2 print:text-[8px]">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-gray-600 print:text-[8.5px]">
                      {edu.school}
                    </p>
                    {edu.awards?.map((a, ai) => (
                      <p key={ai} className="text-primary font-semibold text-[8.5px] mt-0.5 print:text-[8px]">
                        ★ {a}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT SIDEBAR ══════════════ */}
          <aside className="border-l border-gray-100 pl-6 print:pl-4 space-y-4 print:space-y-3">

            <section>
              <SectionHeading sidebar>Skills</SectionHeading>
              <div className="space-y-2 print:space-y-1.5">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-[8px] font-black uppercase text-gray-400 tracking-widest mb-0.5 print:text-[7.5px]">
                      {category}
                    </h3>
                    <p className="text-[9px] leading-snug text-gray-700 print:text-[8.5px]">
                      {Array.isArray(items) ? items.join(", ") : items}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading sidebar>Certificates</SectionHeading>
              <div className="space-y-1.5 print:space-y-1">
                {certifications.map((cert, i) => (
                  <div key={i} className="text-[9.5px] leading-snug print:text-[8.5px]">
                    <p className="font-bold">{cert.title}</p>
                    <p className="text-gray-500 text-[8.5px] print:text-[8px]">
                      {cert.provider} ({cert.year})
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading sidebar>Languages</SectionHeading>
              <div className="space-y-0.5">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-[9.5px] print:text-[8.5px]">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-gray-500 italic">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {volunteerWork && volunteerWork.length > 0 && (
              <section>
                <SectionHeading sidebar>Volunteer Work</SectionHeading>
                <div className="space-y-0.5">
                  {volunteerWork.map((item, i) => (
                    <p key={i} className="text-[9px] leading-snug text-gray-700 print:text-[8.5px]">
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
          ? "text-[9px] text-primary border-gray-200 pb-1 mb-2 print:text-[8px] print:mb-1.5"
          : "text-[12px] text-primary border-primary/30 pb-1.5 mb-3 print:text-[10px] print:mb-2"
        }
      `}
    >
      {children}
    </h2>
  );
}