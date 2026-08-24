// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract.
// No images: the homepage never shows this project (excludeFromHome), and no
// real artefact asset exists yet — no placeholder is rendered anywhere.
export default {
  id: "designing-this-site",
  status: "published",
  order: 99,
  excludeFromHome: true,
  title: {
    en: "Designing This Portfolio",
    de: "Dieses Portfolio gestalten",
  },
  subtitle: {
    en: "A Case Study in Designing Under Constraint — Researcher, Designer, Engineer, and QA on the Same Artefact",
    de: "Eine Fallstudie über Gestalten unter Beschränkung — Researcherin, Designerin, Entwicklerin und QA am selben Artefakt",
  },
  tagline: {
    en: "A recruiter gets thirty seconds. An engineer reads the source. A printer gets one page. Same site, three tests.",
    de: "Eine Recruiterin bekommt dreißig Sekunden. Ein Engineer liest den Quellcode. Ein Drucker bekommt eine Seite. Dieselbe Website, drei Prüfungen.",
  },
  role: {
    en: "Researcher, Designer, Frontend Engineer & QA (solo)",
    de: "Researcherin, Designerin, Frontend-Entwicklerin & QA (alleinverantwortlich)",
  },
  tags: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "React Router",
    "Design Systems",
    "Component Architecture",
    "Information Architecture",
    "Responsive Design",
    "Accessibility",
    "Internationalization (i18n)",
    "Print CSS",
    "Automated Testing (Vitest)",
  ],
};
