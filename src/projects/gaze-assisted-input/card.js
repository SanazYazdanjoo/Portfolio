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
  order: 3,
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
    en: "UX Engineer (Master's Thesis)",
    de: "UX Engineer (Masterarbeit)",
  },
  year: "2025–2026",
  context: {
    en: "M.Sc. thesis",
    de: "Masterarbeit",
  },
  cardTags: ["Experimental Design", "Mixed-Methods Research", "TypeScript", "Eye-Tracking"],
  cardOutcome: {
    en: "Gaze wins over long cross-screen distances and loses over short ones; trust in the cursor decided preference.",
    de: "Blicksteuerung gewinnt über große bildschirmübergreifende Distanzen und verliert über kurze; entschieden hat das Vertrauen in den Cursor.",
  },
  cardImage: cardLargeTargetPanel,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: ["TypeScript", "React", "Python", "Eye-Tracking", "Real-Time API Integration", "Mixed-Methods Research", "Experimental Design", "Semi-Structured Interviews", "Thematic Analysis", "Quantitative UX Research", "Statistical Analysis (ANOVA)", "SUS Evaluation", "Figma"],
};
