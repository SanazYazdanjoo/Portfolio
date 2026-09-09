// Card-level fields ONLY — everything the homepage grid, the /projects
// index, the tag pages, the sitemap, and the meta/sitemap generators need.
// The aggregator (src/data/projects.js) eagerly globs card.js files, so this
// module ships to every page; the full case-study prose stays in <slug>.data.js,
// which loads with the detail route's own chunk. <slug>.data.js spreads this object,
// so a field lives in exactly one of the two files, never both.
import thumbnailImg from './Project-1.png';
import thumbnailWebp from './Project-1.webp';
import cardLargeTargetPanel from './media/card-large-target-panel.webp';

export default {
  id: "gaze-assisted-input",
  status: "published",
  order: 1, // flagship: leads Selected Work (Sept 2026 recruiter review)
  title: {
    en: "Gaze-Assisted Input in Dual-Display Environments",
    de: "Blickgestützte Eingabe in Dual-Display-Umgebungen",
  },
  subtitle: {
    en: "A Comparative Evaluation of MAGIC Pointing, Ninja Cursors, and a Mouse Baseline",
    de: "Eine vergleichende Evaluation von MAGIC Pointing, Ninja Cursors und einer Maus-Baseline",
  },
  tagline: {
    en: "Can gaze make cross-screen pointing faster — without sacrificing user trust?",
    de: "Kann Blicksteuerung bildschirmübergreifendes Zeigen beschleunigen — ohne das Vertrauen der Nutzer:innen zu kosten?",
  },
  role: {
    en: "UX Researcher & UX Engineer (Master's Thesis)",
    de: "UX Researcher & UX Engineer (Masterarbeit)",
  },
  year: "2025–2026",
  context: {
    en: "M.Sc. thesis",
    de: "Masterarbeit",
  },
  cardTags: ["Experimental Design", "Mixed-Methods Research", "TypeScript", "Eye-Tracking"],
  cardOutcome: {
    en: "In an N=30 within-subjects study, Ninja beat the mouse at intermediate cross-screen distances; 60% preferred the gaze hybrid.",
    de: "Im N=30-Within-Subjects-Vergleich übertraf Ninja die Maus bei mittleren Cross-Screen-Distanzen; 60 % bevorzugten den Blick-Hybrid.",
  },
  // Compact proof points for the homepage card — scale, rigour, result.
  // Optional: cards without cardStats render exactly as before.
  cardStats: [
    { value: "N=30", label: { en: "controlled eye-tracking experiment", de: "kontrolliertes Eye-Tracking-Experiment" } },
    { value: "20", label: { en: "formative interviews", de: "formative Interviews" } },
    { value: "60%", label: { en: "preferred the gaze-hybrid", de: "bevorzugten den Blick-Hybrid" } },
  ],
  cardImage: cardLargeTargetPanel,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["TypeScript", "React", "Python", "Eye-Tracking", "Real-Time API Integration", "Mixed-Methods Research", "Experimental Design", "Semi-Structured Interviews", "Thematic Analysis", "Quantitative UX Research", "Statistical Analysis (ANOVA)", "SUS Evaluation", "Figma"],
};
