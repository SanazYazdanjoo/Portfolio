// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract:
// the aggregator eagerly globs card.js; the prose stays in <slug>.data.js, which
// spreads this object and loads with the detail route's chunk.
import thumbnailImg from './Project-2.png';
import thumbnailWebp from './Project-2.webp';
import cardInterestPicker from './media/card-interest-picker.webp';

export default {
  id: "deskbird-hybrid-work",
  status: "published",
  order: 3,
  title: {
    en: "Encouraging Social Interactions in Hybrid Work",
    de: "Soziale Interaktion im Hybrid Work fördern",
  },
  subtitle: {
    en: "Industry UX Research Project with deskbird × Bauhaus-Universität Weimar",
    de: "Industrie-UX-Research-Projekt mit deskbird × Bauhaus-Universität Weimar",
  },
  tagline: {
    en: "Reconnecting hybrid teams through evidence-based social feature design.",
    de: "Hybride Teams durch evidenzbasiertes Social-Feature-Design wieder verbinden.",
  },
  role: {
    en: "UX Researcher (team of 6)",
    de: "UX Researcherin (6-köpfiges Team)",
  },
  year: "2023–2024",
  context: {
    en: "Industry project · deskbird",
    de: "Industrieprojekt · deskbird",
  },
  // Keep the homepage signal set focused on the research-to-product bridge:
  // one field method, one synthesis/requirements skill, one tool, one domain.
  cardTags: ["Contextual Inquiry", "Requirements Engineering", "Figma", "B2B SaaS"],
  cardOutcome: {
    en: "My Interest-Based Communities concept was selected by deskbird stakeholders and delivered as a research-backed high-fidelity prototype.",
    de: "Mein Konzept Interest-Based Communities wurde von deskbird-Stakeholdern ausgewählt und als forschungsbasierter High-Fidelity-Prototyp übergeben.",
  },
  // Recruiter-facing proof points: breadth, depth, and the product decision.
  cardStats: [
    { value: "57", label: { en: "survey respondents", de: "Umfrageteilnehmende" } },
    { value: "6", label: { en: "contextual inquiries + follow-up interviews", de: "Contextual Inquiries + Folgeinterviews" } },
    { value: "3 → 1", label: { en: "client concepts; mine selected by stakeholder vote", de: "Kundenkonzepte; meines per Stakeholder-Votum ausgewählt" } },
  ],
  cardImage: cardInterestPicker,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["User-Centered Design", "Mixed-Methods Research", "Stakeholder Interviews", "Contextual Inquiry", "Survey Design", "Competitive Analysis", "Affinity Diagramming", "Requirements Engineering", "Concept Development", "Interaction Design", "High-Fidelity Prototyping", "Usability Testing", "Figma", "B2B SaaS"],
};
