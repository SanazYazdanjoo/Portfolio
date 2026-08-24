// Single source of truth for the career arc ("The Bridge"). label/years/summary
// are translation keys (resolved via useTranslation() in CareerArc.jsx) so the
// copy stays in src/translations/{en,de}.js. Skill chips are language-neutral
// proper nouns and stay as-is in both locales. skillGroups is an array so a
// phase can carry more than one skill cluster.

export const careerPhases = [
  {
    phase: "01",
    labelKey: "about.career.phase1.label",
    yearsKey: "about.career.phase1.years",
    summaryKey: "about.career.phase1.summary",
    skillGroups: [
      { groupKey: null, items: [
        "HTML / CSS / JS", "React", "WordPress",
        "RESTful APIs", "Responsive Design", "Git & GitHub"
      ]}
    ],
  },
  {
    phase: "02",
    labelKey: "about.career.phase2.label",
    yearsKey: "about.career.phase2.years",
    summaryKey: "about.career.phase2.summary",
    // Trimmed 2026-08 by the evidence rule: chips named in neither a case
    // study (Tier 1) nor an experience entry's task text (Tier 2) were
    // deleted, not evidenced after the fact — Test Plan Creation, Jira,
    // TestLink, and End-to-End Testing (whose only textual match was IBS's
    // "end-to-end AS-IS cycle", a false positive).
    skillGroups: [
      { groupKey: null, items: [
        "Unit & Integration Testing (Vitest)",
        "Acceptance Testing", "Postman",
        "Performance Optimization"
      ]}
    ],
  },
  {
    phase: "03",
    labelKey: "about.career.phase3.label",
    yearsKey: "about.career.phase3.years",
    summaryKey: "about.career.phase3.summary",
    highlight: true,
    skillGroups: [
      { groupKey: "about.career.group.research", items: [
        "Mixed-Methods Research", "Contextual Inquiry", "Usability Testing",
        "Controlled Experiments", "Eye-Tracking (Pupil Labs Neon)",
        "Questionnaire Design", "Heuristic Evaluation",
        "Python"
      ]},
      { groupKey: "about.career.group.build", items: [
        "TypeScript", "React", "Tailwind CSS", "Framer Motion",
        "Web Accessibility (WCAG)", "Figma"
      ]},
    ],
  },
];
