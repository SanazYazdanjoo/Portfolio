export const skillDirectoryCopy = {
  title: {
    en: "Skills & Methods",
    de: "Fähigkeiten & Methoden",
  },
  subheading: {
    en: "Explore the methods, tools, technologies, and domains behind my case studies. Select a skill to see the projects where I used it.",
    de: "Entdecke die Methoden, Tools, Technologien und Themenfelder hinter meinen Fallstudien. Wähle eine Fähigkeit aus, um die Projekte zu sehen, in denen ich sie eingesetzt habe.",
  },
  searchPlaceholder: {
    en: "Search skills & methods...",
    de: "Fähigkeiten & Methoden durchsuchen...",
  },
  sortLabel: {
    en: "Sort skills & methods",
    de: "Fähigkeiten & Methoden sortieren",
  },
  sortByName: {
    en: "Sort by name",
    de: "Nach Name sortieren",
  },
  sortByCount: {
    en: "Sort by project count",
    de: "Nach Projektanzahl sortieren",
  },
  empty: {
    en: "No skills or methods match your search.",
    de: "Keine Fähigkeiten oder Methoden passen zu deiner Suche.",
  },
  links: {
    about: {
      en: "Explore all skills & methods",
      de: "Alle Fähigkeiten & Methoden ansehen",
    },
    cv: {
      en: "See where I used these skills",
      de: "Sehen, wo ich diese Fähigkeiten eingesetzt habe",
    },
    projects: {
      en: "Browse by skill",
      de: "Nach Fähigkeit durchsuchen",
    },
  },
  groups: {
    research: {
      en: "Research & Testing",
      de: "Research & Testing",
    },
    design: {
      en: "Design & Product",
      de: "Design & Produkt",
    },
    technical: {
      en: "Engineering & Technical",
      de: "Engineering & Technik",
    },
    domain: {
      en: "Domains & Context",
      de: "Domänen & Kontext",
    },
  },
};

export const skillGroupOrder = ["research", "design", "technical", "domain"];

const RESEARCH_TAGS = new Set([
  "Mixed-Methods Research",
  "Experimental Design",
  "Semi-Structured Interviews",
  "Thematic Analysis",
  "Quantitative UX Research",
  "Statistical Analysis (ANOVA)",
  "SUS Evaluation",
  "UX Research",
  "Stakeholder Interviews",
  "Contextual Inquiry",
  "Survey Design",
  "Competitive Analysis",
  "Usability Testing",
  "Usability Evaluation (instrumented)",
  "Literature Review",
  "Exhibition Research",
  "Questionnaire Study",
  "Think-Aloud Testing",
  "Qualitative Coding",
  "Material Testing",
]);

const DESIGN_TAGS = new Set([
  "User-Centered Design",
  "Affinity Diagramming",
  "Requirements Engineering",
  "Concept Development",
  "Interaction Design",
  "High-Fidelity Prototyping",
  "Figma",
  "Process Mapping (UML)",
  "Requirements Traceability",
  "Information Architecture",
  "Wireframing",
  "Design Systems",
  "Prototyping",
  "Privacy by Design",
  "Physical Prototyping",
  "Data Physicalization",
  "Paper Prototyping",
  "User Flow Mapping",
  "Iterative Design",
  "Accessibility",
]);

const TECHNICAL_TAGS = new Set([
  "TypeScript",
  "React",
  "Python",
  "Eye-Tracking",
  "Real-Time API Integration",
  "State Machine Modelling",
  "Node.js / Fastify",
  "Automated Testing (Vitest)",
  "Arduino",
  "Sensor Integration",
  "Google Forms",
]);

export function getSkillGroup(tag) {
  if (RESEARCH_TAGS.has(tag)) return "research";
  if (DESIGN_TAGS.has(tag)) return "design";
  if (TECHNICAL_TAGS.has(tag)) return "technical";
  return "domain";
}
