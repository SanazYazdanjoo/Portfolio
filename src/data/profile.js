import data from './data.json';

const baseProfile = data.profile;

// Canonical professional narrative. Keep reusable positioning here so the
// homepage, About, CV, metadata and future social/profile exports read the
// same story instead of maintaining parallel copies.
export const professionalNarrative = {
  role: {
    en: "UX Engineer",
    de: "UX Engineerin",
  },
  intro: {
    en: "Hi, I'm Sanaz.",
    de: "Hi, ich bin Sanaz.",
  },
  workflow: {
    en: "Research → Usability Engineering → Implementation",
    de: "Research → Usability Engineering → Umsetzung",
  },
  statement: {
    en: "I study how people use technology, turn evidence into product decisions, and build the interfaces that put those decisions into practice.",
    de: "Ich untersuche, wie Menschen Technologie nutzen, übersetze Evidenz in Produktentscheidungen und setze die daraus entstehenden Interfaces selbst um.",
  },
  careerPathLabel: {
    en: "My path",
    de: "Mein Weg",
  },
  tagline: {
    en: "I speak both ‘user’ & ‘developer’.",
    de: "Ich spreche sowohl ‚User‘ als auch ‚Entwickler‘.",
  },
  ctas: {
    work: {
      en: "View Case Studies",
      de: "Case Studies ansehen",
    },
    cv: {
      en: "View CV",
      de: "CV ansehen",
    },
  },
  homeBio: {
    en: "I'm a UX Engineer with an M.Sc. in Human-Computer Interaction and a B.E. in Software Engineering. My path through frontend development and QA shaped how I approach UX: research tells me what matters, usability engineering turns that evidence into requirements and design decisions, and my engineering background lets me carry those decisions into working software.",
    de: "Ich bin UX Engineerin mit einem M.Sc. in Human-Computer Interaction und einem B.E. in Software Engineering. Mein Weg über Frontend-Entwicklung und QA prägt meine UX-Arbeit: Research zeigt mir, was wirklich relevant ist, Usability Engineering übersetzt diese Evidenz in Anforderungen und Designentscheidungen, und mein Engineering-Hintergrund hilft mir, diese Entscheidungen bis in funktionierende Software zu tragen.",
  },
  aboutBio: {
    en: "I'm a UX Engineer with an M.Sc. in Human-Computer Interaction (Bauhaus-Universität Weimar) and a B.E. in Software Engineering. I started on the engineering side of digital products, moved through frontend development and QA/usability, and then into HCI research. Today those perspectives meet in my work: I can investigate a problem, evaluate what matters for users, translate evidence into requirements and design decisions, and understand what it takes to implement them well.",
    de: "Ich bin UX Engineerin mit einem M.Sc. in Human-Computer Interaction (Bauhaus-Universität Weimar) und einem B.E. in Software Engineering. Ich bin auf der Engineering-Seite digitaler Produkte gestartet, habe mich über Frontend-Entwicklung und QA/Usability zur HCI-Forschung weiterentwickelt. Heute kommen diese Perspektiven in meiner Arbeit zusammen: Ich kann ein Problem untersuchen, bewerten, was für Nutzende relevant ist, Evidenz in Anforderungen und Designentscheidungen übersetzen und einschätzen, was für eine gute Umsetzung nötig ist.",
  },
  profileSummary: {
    en: "UX Engineer bridging research, usability engineering and implementation. With an M.Sc. in Human-Computer Interaction and a Software Engineering background, I move from evidence about user needs to product decisions and working interfaces.",
    de: "UX Engineerin an der Schnittstelle von Research, Usability Engineering und Umsetzung. Mit einem M.Sc. in Human-Computer Interaction und einem Hintergrund in Software Engineering verbinde ich Evidenz über Nutzerbedürfnisse mit Produktentscheidungen und funktionierenden Interfaces.",
  },
  bridgeDescription: {
    en: "Software engineering → frontend → QA/usability → HCI research → UX engineering. Each phase changed the questions I ask and carried its toolkit into the next.",
    de: "Software Engineering → Frontend → QA/Usability → HCI-Forschung → UX Engineering. Jede Phase hat meine Fragen verändert und ihr Werkzeug in die nächste mitgenommen.",
  },
  focus: {
    en: "Research · Usability Engineering · React & TypeScript",
    de: "Research · Usability Engineering · React & TypeScript",
  },
  experienceStat: {
    value: {
      en: "Since 2015",
      de: "Seit 2015",
    },
    label: {
      en: "Digital-product experience across frontend, QA/usability & UX engineering",
      de: "Erfahrung mit digitalen Produkten: Frontend, QA/Usability & UX Engineering",
    },
  },
};

export const careerPath = [
  {
    id: "software-engineering",
    phase: "01",
    label: { en: "Software Engineering", de: "Software Engineering" },
    years: { en: "2010 – 2015", de: "2010 – 2015" },
    summary: {
      en: "Built the technical foundation: systems, software structure and the discipline of turning requirements into working code.",
      de: "Technisches Fundament aufgebaut: Systeme, Softwarestruktur und die Disziplin, Anforderungen in funktionierenden Code zu übersetzen.",
    },
  },
  {
    id: "frontend-development",
    phase: "02",
    label: { en: "Frontend Development", de: "Frontend-Entwicklung" },
    years: { en: "2015 – 2020", de: "2015 – 2020" },
    summary: {
      en: "Moved closer to the human-facing layer of software by shipping interfaces across real client projects.",
      de: "Näher an die menschenzugewandte Seite von Software gerückt und Interfaces für reale Kundenprojekte umgesetzt.",
    },
  },
  {
    id: "qa-usability",
    phase: "03",
    label: { en: "QA & Usability", de: "QA & Usability" },
    years: { en: "2020 – 2022", de: "2020 – 2022" },
    summary: {
      en: "Shifted from only asking ‘Does it work?’ toward ‘Does it work well for people?’ through testing and heuristic evaluation.",
      de: "Die Frage verschob sich von „Funktioniert es?“ zu „Funktioniert es gut für Menschen?“ — durch Testing und heuristische Evaluation.",
    },
  },
  {
    id: "hci-research",
    phase: "04",
    label: { en: "HCI Research", de: "HCI-Forschung" },
    years: { en: "2021 – 2026", de: "2021 – 2026" },
    summary: {
      en: "Learned to answer those questions empirically through mixed-methods research, controlled studies and quantitative analysis.",
      de: "Gelernt, diese Fragen empirisch zu beantworten — mit Mixed-Methods-Research, kontrollierten Studien und quantitativer Analyse.",
    },
  },
  {
    id: "ux-engineering",
    phase: "05",
    label: { en: "UX Engineering", de: "UX Engineering" },
    years: { en: "2024 – Present", de: "2024 – heute" },
    summary: {
      en: "Research and engineering converge: investigate, evaluate, specify and implement within the same product loop.",
      de: "Research und Engineering laufen zusammen: untersuchen, evaluieren, spezifizieren und im selben Produktzyklus umsetzen.",
    },
    highlight: true,
  },
];

export const profileData = {
  ...baseProfile,
  role: professionalNarrative.role,
  roleSub: professionalNarrative.workflow,
  tagline: professionalNarrative.tagline,
  positioning: professionalNarrative.workflow,
  heroNarrative: {
    ...professionalNarrative,
    careerPath,
  },
  careerPath,
  profileSummary: professionalNarrative.profileSummary,
  bio: professionalNarrative.aboutBio,
  bioParagraphs: [professionalNarrative.homeBio],
  heroMeta: {
    ...baseProfile.heroMeta,
    focus: professionalNarrative.focus,
  },
  impactStats: (baseProfile.impactStats ?? []).map((stat, index) =>
    index === 2 ? professionalNarrative.experienceStat : stat
  ),
};
