// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract.
// The homepage never shows this project (excludeFromHome), so no card fields;
// the thumbnail drives the detail page's hero banner, the /projects row and
// the prev/next nav cards. It is a generated illustration, and <slug>.data.js
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
    en: "A Case Study in Designing Under Constraint — One Person as Researcher, Designer, Engineer, and QA",
    de: "Eine Fallstudie über Gestalten unter Beschränkung — eine Person als Researcherin, Designerin, Entwicklerin und QA",
  },
  tagline: {
    en: "The site itself, documented as a case study: one codebase for screen, print, and two languages — every claim measured or marked pending.",
    de: "Die Website selbst, dokumentiert als Fallstudie: eine Codebasis für Bildschirm, Druck und zwei Sprachen — jede Aussage gemessen oder als ausstehend markiert.",
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
    "OpenAI API",
    "Prompt Engineering",
    "Design Systems",
    "Component Architecture",
    "Information Architecture",
    "Responsive Design",
    "Accessibility",
    "Performance Optimization",
    "SEO",
    "Internationalization (i18n)",
    "Print CSS",
    "Automated Testing (Vitest)",
  ],
};
