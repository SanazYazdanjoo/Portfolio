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
  order: 3, // research depth; follows the two applied projects (2026-11-24)
  title: {
    en: "Gaze-Assisted Input in Dual-Display Environments",
    de: "Blickgestützte Eingabe in Dual-Display-Umgebungen",
  },
  subtitle: {
    en: "A Comparative Evaluation of MAGIC Pointing, Ninja Cursors, and a Mouse Baseline",
    de: "Eine vergleichende Evaluation von MAGIC Pointing, Ninja Cursors und einer Maus-Baseline",
  },
  tagline: {
    en: "Can gaze make cross-screen pointing faster — without sacrificing predictability and control?",
    de: "Kann Blicksteuerung bildschirmübergreifendes Zeigen beschleunigen — ohne Vorhersagbarkeit und Kontrolle zu kosten?",
  },
  role: {
    en: "UX Engineer (Master's Thesis)",
    de: "UX Engineer (Masterarbeit)",
  },
  year: "2025–2026",
  context: {
    en: "M.Sc. thesis",
    de: "Masterarbeit",
  },
  cardTags: ["Experimental Design", "Mixed-Methods Research", "TypeScript", "Eye-Tracking"],
  // The hero and the Projects list lead with these core skills; the rest sit
  // behind "+N more" (ProjectHeader) and stay in the DOM. React stays a tag of
  // its own there: each pill links to /tags/<skill>, so a combined
  // "TypeScript & React" pill would link to nothing.
  coreTags: ["Mixed-Methods Research", "Experimental Design", "Eye-Tracking", "TypeScript", "Python", "Statistical Analysis (R)"],
  cardOutcome: {
    en: "Gaze wins over long cross-screen distances and loses over short ones; predictability, not speed, decided preference.",
    de: "Blicksteuerung gewinnt über große bildschirmübergreifende Distanzen und verliert über kurze; entschieden hat die Vorhersagbarkeit, nicht das Tempo.",
  },
  // Compact proof points for the homepage card — scale, rigour, result.
  // Optional: cards without cardStats render exactly as before.
  cardStats: [
    { value: "N=30", label: { en: "controlled eye-tracking experiment", de: "kontrolliertes Eye-Tracking-Experiment" } },
    { value: "20", label: { en: "formative interviews", de: "formative Interviews" } },
    { value: "60%", label: { en: "preferred the gaze technique", de: "bevorzugten die Blick-Technik" } },
  ],
  cardImage: cardLargeTargetPanel,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["TypeScript", "React", "Python", "Eye-Tracking", "Real-Time API Integration", "Mixed-Methods Research", "Experimental Design", "Semi-Structured Interviews", "Thematic Analysis", "Quantitative UX Research", "Statistical Analysis (R)", "SUS Evaluation", "Figma"],
};
