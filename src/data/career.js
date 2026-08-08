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
    skillGroups: [
      { groupKey: null, items: [
        "Test Plan Creation", "Unit & Integration Testing (Vitest)",
        "End-to-End Testing", "Acceptance Testing", "Postman",
        "Jira", "TestLink", "Performance Optimization"
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
        "R / Python", "Behavioural Analytics (GA, Hotjar)"
      ]},
      { groupKey: "about.career.group.build", items: [
        "TypeScript", "React", "Tailwind CSS", "Framer Motion",
        "Web Accessibility (WCAG)", "Figma", "AI-Assisted Development"
      ]},
    ],
  },
];
