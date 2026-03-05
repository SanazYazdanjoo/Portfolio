// src/pages/CurriculumVitae.jsx
import React from "react";
import { profileData } from "../data/profile";

export default function CV() {
  const { name, role, contact, experience, portfolioHighlights, skills, education, languages, certifications } = profileData;

  return (
    <div className="bg-bg min-h-screen py-10 px-4 print:p-0 print:bg-white">

      {/* Download Button — hidden on print */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-end no-print">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-primary text-white font-bold text-sm rounded-sm shadow-md hover:bg-primary/90 transition-all tracking-wider uppercase"
        >
          Save as PDF
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          THE PRINTED DOCUMENT
          @page A4 is set in index.css
          padding: 2.5cm matches safe print margins
      ═══════════════════════════════════════════ */}
      <div
        id="curriculum-vitae"
        className="max-w-5xl mx-auto bg-white text-black shadow-xl
                   px-12 py-10
                   print:shadow-none print:px-0 print:py-0 print:max-w-none"
      >

        {/* ── HEADER: Name/Role left · Contact right ── */}
        <div className="flex justify-between items-end gap-6 pb-5 mb-6 border-b-[3px] border-primary">
          <div>
            <h1 className="text-[42px] font-black text-primary tracking-tighter uppercase leading-none print:text-[32px]">
              {name}
            </h1>
            <p className="text-lg font-semibold text-gray-500 mt-1 tracking-widest uppercase print:text-base">
              {role}
            </p>
          </div>

          {/* Contact block — now includes location, LinkedIn, GitHub */}
          <div className="text-right text-[10.5px] leading-[1.7] text-gray-600 print:text-[9.5px] shrink-0">
            <p>{contact.location}</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <p className="text-primary">{contact.linkedinHandle}</p>
            <p className="text-primary">{contact.githubHandle}</p>
          </div>
        </div>

        {/* ── BODY: 70/30 grid ── */}
        <div className="grid grid-cols-[1.8fr_1fr] gap-10 print:gap-6">

          {/* ══ LEFT COLUMN ══ */}
          <div className="space-y-7 print:space-y-5">

            {/* Work Experience */}
            <section>
              <SectionHeading>Work Experience</SectionHeading>
              <div className="space-y-5 print:space-y-4">
                {experience.map((job, i) => (
                  <div key={i}>
                    {/* Role + Date row */}
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-black text-[11.5px] text-black uppercase tracking-wide print:text-[10px]">
                        {job.company}
                      </h3>
                      <span className="text-[9.5px] font-semibold text-gray-400 uppercase shrink-0 ml-2 print:text-[9px]">
                        {job.date}
                      </span>
                    </div>
                    <p className="text-[10.5px] font-bold text-primary mb-1.5 print:text-[9.5px]">
                      {job.role}
                    </p>

                    {/* Impact metric chips */}
                    {job.impactMetrics && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {job.impactMetrics.map((m, mi) => (
                          <span
                            key={mi}
                            className="text-[8.5px] font-bold uppercase tracking-wide bg-primary/8 text-primary border border-primary/25 px-1.5 py-0.5 print:text-[8px] print:border-primary/30"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tasks */}
                    <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[10px] leading-relaxed text-gray-700 print:text-[9px] print:leading-snug">
                      {job.tasks.map((task, t) => (
                        <li key={t}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio Highlights */}
            <section>
              <SectionHeading>Portfolio Highlights</SectionHeading>
              <div className="space-y-4 print:space-y-3">
                {portfolioHighlights.map((p) => (
                  <div key={p.id}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-black text-[11px] text-black print:text-[10px]">{p.title}</h3>
                    </div>
                    <p className="text-[9.5px] font-semibold text-primary uppercase tracking-wide mb-1.5 print:text-[9px]">
                      {p.type}
                    </p>

                    {/* Metrics row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-1.5">
                      {p.metrics.map((m, mi) => (
                        <span key={mi} className="text-[9.5px] print:text-[9px]">
                          <span className="font-black text-primary">{m.value}</span>
                          <span className="text-gray-500 ml-1">{m.label}</span>
                        </span>
                      ))}
                    </div>

                    <p className="text-[9.5px] leading-relaxed text-gray-600 print:text-[9px] print:leading-snug">
                      {p.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ══ RIGHT SIDEBAR ══ */}
          <div className="space-y-6 border-l border-gray-100 pl-8 print:pl-6 print:space-y-4">

            {/* Skills */}
            <section>
              <SectionHeading sidebar>Skills</SectionHeading>
              <div className="space-y-2.5 print:space-y-2">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-[8.5px] font-black uppercase text-gray-400 tracking-widest mb-0.5">
                      {category}
                    </h3>
                    <p className="text-[9.5px] leading-snug text-gray-700 print:text-[9px]">
                      {items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <SectionHeading sidebar>Education</SectionHeading>
              <div className="space-y-3 print:space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="text-[10px] leading-snug print:text-[9px]">
                    <p className="font-bold">{edu.school}</p>
                    <p className="text-gray-600 italic">{edu.degree}</p>
                    <p className="text-gray-500 text-[9px]">{edu.year}</p>
                    {edu.awards?.map((a, ai) => (
                      <p key={ai} className="text-primary font-semibold text-[9px] mt-0.5">★ {a}</p>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <SectionHeading sidebar>Languages</SectionHeading>
              <div className="space-y-1 print:space-y-0.5">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-[10px] print:text-[9px]">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-gray-500 italic">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <SectionHeading sidebar>Certifications</SectionHeading>
              <div className="space-y-1.5 print:space-y-1">
                {certifications.map((cert, i) => (
                  <div key={i} className="text-[10px] leading-snug print:text-[9px]">
                    <p className="font-bold">{cert.title}</p>
                    <p className="text-gray-500">{cert.provider} · {cert.year}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ──────────────────────────────────────

function SectionHeading({ children, sidebar = false }) {
  return (
    <h2 className={`
      font-black uppercase tracking-widest border-b border-gray-200 mb-3
      ${sidebar
        ? "text-[9px] text-primary pb-1 print:text-[8.5px]"
        : "text-[11px] text-primary pb-2 print:text-[10px]"
      }
    `}>
      {children}
    </h2>
  );
}