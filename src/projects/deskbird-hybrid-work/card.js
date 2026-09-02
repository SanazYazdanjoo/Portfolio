// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract:
// the aggregator eagerly globs card.js; the prose stays in <slug>.data.js, which
// spreads this object and loads with the detail route's chunk.
import thumbnailImg from './Project-2.png';
import thumbnailWebp from './Project-2.webp';
import cardInterestPicker from './media/card-interest-picker.webp';

export default {
  id: "deskbird-hybrid-work",
  status: "published",
  order: 2,
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
  cardOutcome: {
    en: "Socialising happens in breaks, so the concept connects colleagues by shared interest rather than by shared calendar.",
    de: "Sozialer Austausch passiert in Pausen — das Konzept verbindet Kolleg:innen über gemeinsame Interessen statt über gemeinsame Kalender.",
  },
  cardImage: cardInterestPicker,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["User-Centered Design", "Mixed-Methods Research", "Stakeholder Interviews", "Contextual Inquiry", "Survey Design", "Competitive Analysis", "Affinity Diagramming", "Requirements Engineering", "Concept Development", "Interaction Design", "High-Fidelity Prototyping", "Usability Testing", "Figma", "B2B SaaS"],
};
