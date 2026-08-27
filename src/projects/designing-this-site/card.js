// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract.
// The homepage never shows this project (excludeFromHome), so no card fields;
// the thumbnail drives the detail page's hero banner, the /projects row and
// the prev/next nav cards. It is a generated illustration, and data.js
// carries the visible generation credit via heroIsGenerated.
import thumbnailImg from './Project-5.png';
import thumbnailWebp from './Project-5.webp';

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
  thumbnail: thumbnailImg,
  thumbnailWebp,
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
