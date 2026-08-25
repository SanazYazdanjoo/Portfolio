// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract:
// the aggregator eagerly globs card.js; the prose stays in data.js, which
// spreads this object and loads with the detail route's chunk.
// Content is sourced from the SoSe 2023 Bauhaus-Universität Weimar course
// project documentation (team of 4). Evidence lock: every number on this
// card exists in that documentation; nothing is extrapolated.
import thumbnailImg from './media/v1/flow-map.jpg';
import thumbnailWebp from './media/v1/flow-map.webp';
import cardSelectedHome from './media/v2/card-selected-home.webp';

export default {
  id: "smart-home-control",
  status: "published",
  order: 5,
  title: {
    en: "Smart Home Control for Shared Households",
    de: "Smart-Home-Steuerung für den geteilten Haushalt",
  },
  subtitle: {
    en: "A Paper-Prototype Study of the Social Layer: Who May Add, Share, and Govern Devices",
    de: "Eine Papierprototyp-Studie zur sozialen Ebene: Wer darf Geräte hinzufügen, teilen und verwalten",
  },
  tagline: {
    en: "Who may add a device, remove a housemate, or override someone mid-use? The questions existing smart-home apps don't answer.",
    de: "Wer darf ein Gerät hinzufügen, eine:n Mitbewohner:in entfernen oder mitten in der Nutzung übersteuern? Die Fragen, die bestehende Smart-Home-Apps nicht beantworten.",
  },
  role: {
    en: "UX Researcher (team of 4)",
    de: "UX-Researcherin (4-köpfiges Team)",
  },
  year: "2023",
  context: {
    en: "University course project",
    de: "Universitäres Kursprojekt",
  },
  cardTags: ["Think-Aloud Testing", "Paper Prototyping", "Qualitative Coding", "Smart Home"],
  cardOutcome: {
    en: "Two think-aloud sessions turned verbatim quotes into four documented design changes, each shown as a before-and-after pair.",
    de: "Zwei Think-Aloud-Sitzungen machten wörtliche Zitate zu vier dokumentierten Designänderungen – jede als Vorher-Nachher-Paar belegt.",
  },
  cardImage: cardSelectedHome,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["Questionnaire Study", "Think-Aloud Testing", "Paper Prototyping", "Qualitative Coding", "Thematic Analysis", "Information Architecture", "User Flow Mapping", "Iterative Design", "Accessibility", "Smart Home", "Google Forms"],
};
