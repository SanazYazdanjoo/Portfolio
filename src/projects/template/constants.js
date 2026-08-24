// Shared template config. EASE is re-exported from src/utils/motion. SECTIONS is the fixed content model: the ids the sidebar
// TOC, the mobile pill bar and the section renderers all resolve against.
//
// NOTE: this folder must never contain an `index.jsx` or a `data.js` —
// main.jsx auto-routes `src/projects/*/index.jsx` and src/data/projects.js
// auto-discovers `src/projects/*/data.js`, so either name would make the
// template folder register as a project.

// Re-exported so template modules can keep importing it from here; the
// curve itself lives in src/utils/motion.js, which is the only place it
// is written down.
export { EASE } from "../../utils/motion";

// Content section definitions. `labelKey` drives the sidebar/mobile-pill text (short form).
export const SECTIONS = [
  { id: "about",        labelKey: "project.sidebar.about",        dataKey: "about"        },
  { id: "process",      labelKey: "project.sidebar.process",      dataKey: "process"      },
  { id: "challenge",    labelKey: "project.sidebar.challenge",    dataKey: "challenge"    },
  { id: "solution",     labelKey: "project.sidebar.solution",     dataKey: "solution"     },
  { id: "design",       labelKey: "project.sidebar.design",       dataKey: "design"       },
  { id: "prototype",    labelKey: "project.sidebar.prototype",    dataKey: "prototype"    },
  { id: "methodology",  labelKey: "project.sidebar.methodology",  dataKey: "methodology"  },
  { id: "results",      labelKey: "project.sidebar.results",      dataKey: "results"      },
  { id: "implications", labelKey: "project.sidebar.implications", dataKey: "implications" },
  { id: "phases",       labelKey: "project.sidebar.status",       dataKey: "phases"       },
  { id: "conclusion",   labelKey: "project.sidebar.conclusion",   dataKey: "conclusion"   },
];

// ---------------------------------------------------------------------------
// The data/renderer contract.
//
// This portfolio has already shipped one documentation-drift defect: the
// `tagEvidence` pointers named fields that did not exist. The same class of
// bug runs in the other direction too — a field sitting in a data.js that no
// renderer reads is content the author believes is published and isn't.
//
// These two lists are the registry `projects.test.js` checks every data.js
// against. Adding a field to a data.js without adding it here fails the
// suite, which is the point: the failure asks "does anything render this?"
// at the moment the field is written, not months later.
//
// RENDERED_FIELDS — read by ProjectTemplate, its template/ components,
// SectionMedia, or the project cards. Every entry here is genuinely reachable
// on a page. All of them are optional: a project omitting one renders nothing
// for it, never an empty shell.
export const RENDERED_FIELDS = [
  // Header / card metadata
  "title", "subtitle", "tagline", "stage", "status", "role", "myContribution",
  "timeline", "tags", "thumbnail", "thumbnailWebp", "heroImage", "aiAssistance",
  // Homepage card only (StackedProjectCard.jsx) — `year` and `context` are the
  // metadata row, `cardTags` the capped signal subset of `tags`, `cardOutcome`
  // the one-sentence result line.
  "year", "context", "cardTags", "cardOutcome", "cardImage",
  // Body sections (see SECTIONS above for the ones with their own heading)
  "about", "process", "challenge", "challengeQuote", "solution", "solutionQuote",
  "design", "designQuote", "prototype", "prototypeUrl", "prototypeUrlLabel", "methodology",
  "methodologyQuote", "methods", "techStack", "results", "resultsAtAGlance",
  "metrics", "metricsIntro", "verbatims", "verbatimsIn", "outcome", "notBuilt",
  "implications", "phases", "phasesIntro", "conclusion", "figures",
];

// Sections whose body is a prose block plus an optional figure grid, keyed by
// the `figures` sub-key they read. ProjectTemplate renders each from this
// list rather than from a hand-written block per section, so adding the next
// one is a line here plus two translation keys — not a copy-pasted branch
// that can be forgotten. Order is the render order.
export const PROSE_SECTIONS = [
  { id: "challenge", textKey: "challenge", quoteKey: "challengeQuote", rail: true  },
  { id: "solution",  textKey: "solution",  quoteKey: "solutionQuote",  rail: true  },
  { id: "design",    textKey: "design",    quoteKey: "designQuote",    rail: false },
];

// Where a project's `verbatims` render. Participant quotes are evidence, and
// which section they are evidence *for* is a per-project judgement: survey
// answers about a broken process argue the Challenge, quotes from a study
// that ran argue the Results. Projects that omit `verbatimsIn` keep the
// original Results placement, so no existing page moves.
export const VERBATIM_SECTIONS = ["challenge", "results"];
export const DEFAULT_VERBATIM_SECTION = "results";

// Every `figures` sub-key ProjectTemplate passes to SectionMedia. A figure
// group under any other key is a set of images, alt text and captions that
// nothing renders — the same silent failure `notBuilt` had, one level down
// and harder to spot, since `figures` as a whole IS rendered and the
// registry check above therefore passes. projects.test.js checks each data
// file's figure keys against this list.
export const FIGURE_KEYS = [
  ...PROSE_SECTIONS.map((s) => s.id),
  "prototype",
  "methodology",
  "results",
];

// DATA_ONLY_FIELDS — deliberately never rendered. Each needs a reason, because
// "it's fine, it's just data" is exactly what an orphaned field looks like.
export const DATA_ONLY_FIELDS = [
  "id",          // routing + aggregator identity (id === slug === folder name)
  "order",       // sort key for the project grid
  "slug",        // ignored by the aggregator; folder name wins
  "tagEvidence", // consumed by projects.test.js, not by any page — by design
  "excludeFromHome", // read by Home.jsx to keep a project off the homepage list
];
