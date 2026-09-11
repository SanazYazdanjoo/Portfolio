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
  cardTags: ["Contextual Inquiry", "Usability Testing", "Figma", "B2B SaaS"],
  // The card argues research → product direction: the study became three
  // concepts and the client chose hers. The finding itself (breaks, shared
  // interests) is the case study's job.
  cardOutcome: {
    en: "A survey and six contextual inquiries became three concepts; deskbird's stakeholders chose mine as the high-fidelity prototype.",
    de: "Aus Umfrage und sechs Contextual Inquiries wurden drei Konzepte; deskbirds Stakeholder wählten meines als High-Fidelity-Prototyp.",
  },
  cardStats: [
    { value: "57", label: { en: "survey respondents", de: "Umfrageteilnehmende" } },
    { value: "6", label: { en: "contextual inquiries", de: "Contextual Inquiries" } },
    { value: "1 of 3", label: { en: "concepts chosen by the client — mine", de: "Konzepte vom Kunden gewählt — meines" } },
  ],
  cardImage: cardInterestPicker,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["User-Centered Design", "Mixed-Methods Research", "Stakeholder Interviews", "Contextual Inquiry", "Survey Design", "Competitive Analysis", "Affinity Diagramming", "Requirements Engineering", "Concept Development", "Interaction Design", "High-Fidelity Prototyping", "Usability Testing", "Figma", "B2B SaaS"],
};
