// Content is sourced from UCD4UX_FINAL PRESENTATION.pdf, the "Requirements &
// User Problems" deck, the UCD4UX research report, and the project's FigJam
// boards (interpretation sessions, affinity walls, requirements matrix v1/v2,
// user story map, user flows, UI components) — deskbird x Bauhaus-Universität
// Weimar.
// Card-level fields (id/status/title/tags/thumbnails/card*) live in
// ./card.js — eagerly aggregated site-wide — and are spread here so the
// detail page sees one object. This file carries only the prose and media
// that load with the route's own chunk.
//
// ─────────────────────────────────────────────────────────────────────────────
// REVISION NOTES — read before merging
//
// 1. SCHEMA CHANGE: process[].imagePath (string|null) → process[].figures
//    (array of the same figure object shape already used by `figures.solution`).
//    Steps carry one or two images, so a single path could not hold them.
//    The rendering component needs a one-line change: iterate `step.figures`
//    with the same figure renderer the Solution and Methodology sections use.
//
// 2. FACTUAL CORRECTION in process[0].insight — see the comment there. The
//    previous claim was contradicted by the project's own competitor review.
//
// 3. CLAIM SOFTENED in process[6].insight — see the comment there. Restore the
//    stronger wording only once the concept-vs-requirements comparison is
//    findable.
//
// 4. Media filenames below are placeholders following the existing
//    ./media/ convention. Rename to match your exports.
// ─────────────────────────────────────────────────────────────────────────────
import card from './card';
import thumbnailImg from './Project-2.png';

// ─────────────────────────────────────────────────────────────────────────────
// MEDIA RESOLUTION — read this before adding images
//
// Figures resolve their file through media('exact-filename.png') rather than a
// static import. Vite globs ./media at build time, so a file that is not there
// yet resolves to null instead of throwing. The build never breaks on a
// missing asset, and every figure below carries a comment naming the exact
// file it is waiting for.
//
// TO ADD AN IMAGE
//   1. Rename your export to the filename in the comment above the figure.
//   2. Drop it in ./media/
//   3. Rebuild. Nothing else to change.
//
// Filenames are prefixed by where they appear so ./media sorts in reading
// order: met_ = methodology section, p01_ … p10_ = process step 1 … 10.
//
// Figures whose src is null should render a labelled placeholder rather than a
// broken image. See RENDERER NOTE at the foot of this file.
//
// CREATE REACT APP instead of Vite? Replace the two lines below with:
//   const ctx = require.context('./media', false, /\.(png|jpe?g|webp|svg)$/);
//   const media = (f) => { try { return ctx('./' + f); } catch { return null; } };
// ─────────────────────────────────────────────────────────────────────────────
const mediaFiles = import.meta.glob('./media/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

const media = (filename) => mediaFiles[`./media/${filename}`] ?? null;

export const projectData = {
  ...card,
  timeline: "10/2023 – 03/2024",
  heroImage: thumbnailImg,
  heroIsGenerated: true, // hero generated with Google Gemini — renders the credit

  partners: {
    client: "deskbird",
    institution: "Bauhaus-Universität Weimar",
  },

  // Six-person student research team. Names appear on the client presentation
  // title slide but are not surfaced here — ask the others before publishing
  // them. (Previous comment referenced a `members` field that did not exist.)
  team: {
    size: 6,
  },

  // Milestone schedule from the project plan. Added because "10/2023 – 03/2024"
  // gives a duration but not a shape, and the shape is what shows the work was
  // sequenced rather than improvised.
  milestones: [
    { date: "24 Oct 2023",     label: { en: "M1 — Requirements kick-off",                                    de: "M1 — Kick-off Anforderungen" } },
    { date: "6–12 Nov 2023",   label: { en: "M2 — Study design",                                             de: "M2 — Studiendesign" } },
    { date: "13–19 Nov 2023",  label: { en: "Pilot studies",                                                 de: "Pilotstudien" } },
    { date: "21 Nov 2023",     label: { en: "M3 — Interim presentation",                                     de: "M3 — Zwischenpräsentation" } },
    { date: "27 Nov–3 Dec 23", label: { en: "Fieldwork: survey and contextual inquiries",                    de: "Feldphase: Umfrage und Contextual Inquiries" } },
    { date: "4–10 Dec 2023",   label: { en: "M4 — Analysis",                                                 de: "M4 — Analyse" } },
    { date: "19 Dec 2023",     label: { en: "M5 — Requirements presentation",                                de: "M5 — Anforderungspräsentation" } },
    { date: "9 Jan 2024",      label: { en: "M6 — Prototyping kick-off",                                     de: "M6 — Kick-off Prototyping" } },
    { date: "Feb–Mar 2024",    label: { en: "Testing with users, iteration, final prototype presentation",   de: "Nutzertests, Iteration, Abschlusspräsentation des Prototyps" } },
  ],

  methods: [
    { en: "Heuristic Evaluation (admin & end user)",        de: "Heuristische Evaluation (Admin & Endnutzer:in)" },
    { en: "Competitive & State-of-the-Art Review",          de: "Wettbewerbs- und State-of-the-Art-Analyse" },
    { en: "Stakeholder Interviews",                         de: "Stakeholder-Interviews" },
    { en: "Online Survey",                                  de: "Online-Umfrage" },
    { en: "Pilot Studies (think-aloud survey pilot, two contextual inquiry pilots)", de: "Pilotstudien (Think-aloud-Umfragepilot, zwei Contextual-Inquiry-Piloten)" },
    { en: "Remote Contextual Inquiry (90 min)",             de: "Remote Contextual Inquiry (90 Min.)" },
    { en: "Semi-structured Follow-up Interviews (30 min)",  de: "Semi-strukturierte Folgeinterviews (30 Min.)" },
    { en: "Interpretation Sessions & Contextual Design Models", de: "Interpretationssitzungen & Contextual-Design-Modelle" },
    { en: "Affinity Diagramming",                           de: "Affinity Diagramming" },
    { en: "Requirements Engineering",                       de: "Anforderungsanalyse" },
    { en: "User Story Mapping & Release Planning",          de: "User Story Mapping & Release-Planung" },
    { en: "Concept Development & Prototyping",              de: "Konzeptentwicklung & Prototyping" },
    { en: "Usability Testing & Iteration",                  de: "Usability-Testing & Iteration" },
  ],

  metrics: [
    { value: "57", label: { en: "survey respondents", de: "Umfrageteilnehmende" } },
    { value: "6", label: { en: "contextual inquiries + follow-ups", de: "Contextual Inquiries + Folgeinterviews" } },
    { value: "~75%", label: { en: "say they relate more to colleagues whose personal details they know", de: "fühlen sich Kolleg:innen näher, deren persönliche Details sie kennen" } },
    { value: "3 → 1", label: { en: "concepts presented to deskbird; one selected by vote", de: "Konzepte an deskbird präsentiert; eines per Abstimmung ausgewählt" } },
  ],

  techStack: ["Figma", "FigJam", "Online Survey Tools"],

  // Both instruments were piloted before fieldwork. Recorded because "we ran a
  // survey" and "we piloted the survey and revised it from what we saw" are
  // different claims, and the second one is the one that shows care.
  pilots: [
    {
      en: "The survey was piloted using the think-aloud method, which refined wording and section order before it went live.",
      de: "Die Umfrage wurde mit der Think-aloud-Methode pilotiert; das schärfte Formulierungen und Abschnittsreihenfolge vor dem Launch.",
    },
    {
      en: "Two contextual inquiry pilots were run before the six recorded sessions, to test the observation protocol and the remote setup.",
      de: "Vor den sechs dokumentierten Sitzungen liefen zwei Contextual-Inquiry-Piloten, um Beobachtungsprotokoll und Remote-Setup zu erproben.",
    },
  ],

  // Ten-section instrument. Listed because the consent block and the privacy
  // section are the two that matter, and neither is visible from "we ran a survey".
  surveySections: [
    { en: "Introduction & consent",              de: "Einführung & Einwilligung" },
    { en: "Demographics",                        de: "Demografie" },
    { en: "Working conditions",                  de: "Arbeitsbedingungen" },
    { en: "Social preferences",                  de: "Soziale Präferenzen" },
    { en: "Social interaction in work life",     de: "Soziale Interaktion im Arbeitsleben" },
    { en: "Role of the company",                 de: "Rolle des Unternehmens" },
    { en: "Communication channels",              de: "Kommunikationskanäle" },
    { en: "Emotional aspects",                   de: "Emotionale Aspekte" },
    { en: "Privacy preferences",                 de: "Datenschutzpräferenzen" },
    { en: "Close & optional email signup",       de: "Abschluss & optionale E-Mail-Anmeldung" },
  ],

  // Five study areas were planned; three were run. Kept visible rather than
  // quietly dropped — see limitations[4].
  studyPlans: [
    { en: "Social interaction at the workplace",   de: "Soziale Interaktion am Arbeitsplatz",        status: "completed" },
    { en: "Communication channel preferences",     de: "Präferenzen bei Kommunikationskanälen",       status: "completed" },
    { en: "Privacy preferences / social data",     de: "Datenschutzpräferenzen / soziale Daten",      status: "completed" },
    { en: "Emotional aspects of hybrid work",      de: "Emotionale Aspekte hybriden Arbeitens",       status: "not-run" },
    { en: "Social events and team building",       de: "Social Events und Teambuilding",              status: "not-run" },
  ],

  // Two landscapes were reviewed, not one. The engagement-platform set framed
  // "what a social feature is"; the desk-booking set framed "what deskbird's
  // direct competitors already ship". Only the first was previously recorded,
  // and the second is the one that constrained the concept.
  competitiveReview: {
    engagementPlatforms: [
      "Microsoft Viva Engage", "Workvivo", "Happeo", "Haiilo", "Staffbase",
      "Donut for Slack", "Donut Watercooler", "Sococo", "Gather Town",
      "Workplace by Facebook", "Officevibe", "Lattice", "Culture Amp",
      "TINYpulse", "15Five", "Peakon", "Bonusly", "Betterworks",
    ],
    deskBookingCompetitors: [
      "Flexopus", "Condeco", "Deskly", "Robin", "Pult", "Kadence", "Yoffix",
      "Officely", "edenworkplace", "Envoy", "Seatti", "Locatee", "OfficeRnD",
    ],
  },

  // The five model types built per participant during interpretation sessions.
  // Named because "we ran contextual inquiries" and "we built the model set"
  // are different claims, and only the second one is checkable.
  //
  // OWNERSHIP: the model set was the one part of the research divided by
  // person rather than done together. Per the project note:
  //   Collaboration model — Sanaz
  //   Identity model      — Juwon
  //   Sequence model      — Layla
  //   Relationship model  — Gabriela
  //   Physical model      — unattributed in the note
  // `owner: "self"` is rendered as a marker; colleagues stay unnamed in the
  // published output. Names live in this comment only.
  //
  // ⚠ The note attributes four of five models and names four of six team
  // members. Confirm the Physical model and the two unlisted members before
  // publishing anything that implies a complete division of labour.
  contextualDesignModels: [
    { en: "Sequence Model",      de: "Sequenzmodell",        owner: "team" },
    { en: "Relationship Model",  de: "Beziehungsmodell",     owner: "team" },
    { en: "Collaboration Model", de: "Kollaborationsmodell", owner: "self" },
    { en: "Identity Model",      de: "Identitätsmodell",     owner: "team" },
    { en: "Physical Model",      de: "Physisches Modell",    owner: "unconfirmed" },
  ],

  // Where each requirement came from. Kept because a requirement without a
  // source is an opinion.
  requirementSources: [
    { en: "Marketing interview",           de: "Marketing-Interview" },
    { en: "Product manager interview",     de: "Product-Manager-Interview" },
    { en: "Product designer interview",    de: "Product-Designer-Interview" },
    { en: "Customer support interview",    de: "Customer-Support-Interview" },
    { en: "Stakeholder mindmap",           de: "Stakeholder-Mindmap" },
    { en: "Social interaction brainstorm", de: "Social-Interaction-Brainstorm" },
    { en: "Own explorations",              de: "Eigene Explorationen" },
  ],

  // Verbatims carried forward from the contextual inquiries into the concept
  // background board. Added because the case study previously ran twelve
  // sessions and quoted nobody — the findings were all reported in our voice,
  // never in theirs.
  participantVoices: [
    {
      en: "I … want to know my colleagues' likes and dislikes …",
      de: "Ich … möchte wissen, was meine Kolleg:innen mögen und was nicht …",
    },
    {
      en: "I prefer interactions that are genuine and not forced.",
      de: "Ich bevorzuge Interaktionen, die echt sind und nicht erzwungen.",
    },
    {
      en: "I don't live in the same city as my colleagues, but thanks to video calls I can interact with them and subsequently feel connected to them.",
      de: "Ich lebe nicht in derselben Stadt wie meine Kolleg:innen, aber dank Videocalls kann ich mit ihnen interagieren und fühle mich dadurch verbunden.",
    },
    {
      en: "I base my decision to go to office events after checking with my friends from the office.",
      de: "Ob ich zu Büro-Events gehe, entscheide ich, nachdem ich mich mit meinen Freund:innen aus dem Büro abgestimmt habe.",
    },
  ],

  // What the concept pack had to contain before a concept could be defended at
  // the Prototyping Kick-Off. Recorded because "I had a concept" and "I took a
  // concept through a product-definition pack and a review round" are different
  // claims.
  conceptPack: [
    { en: "Background: participant verbatims clustered into sub-jobs", de: "Hintergrund: Teilnehmenden-Zitate, geclustert zu Teil-Jobs" },
    { en: "Jobs-to-be-done statement",                                de: "Jobs-to-be-done-Statement" },
    { en: "Target users",                                             de: "Zielnutzende" },
    { en: "Target companies",                                         de: "Zielunternehmen" },
    { en: "Concept-level competitor review",                          de: "Wettbewerbsanalyse auf Konzeptebene" },
    { en: "Feature MVP breakdown",                                    de: "Feature-MVP-Aufschlüsselung" },
    { en: "Storyboard",                                               de: "Storyboard" },
  ],

  // Five concept directions came out of ideation, one owner each. Three went to
  // the client. The mapping is recorded because "we developed three concepts"
  // hides both the merge and the cut — and because the reason for the cut is a
  // more useful thing for a reader to know than a rigour we did not have.
  // There was no scoring round. The narrowing was a scoping call taken in a
  // brainstorming session as the project ran out of time.
  conceptLineage: [
    {
      concept: { en: "Efficient and Engaging Communication", de: "Effiziente und ansprechende Kommunikation" },
      outcome: "carried-forward",
      as: "Chat2Meet",
      owner: "team",
    },
    {
      concept: { en: "Interest-based Events or Social Networking", de: "Interessenbasierte Events oder Social Networking" },
      outcome: "carried-forward",
      as: "Interest-Based Communities",
      owner: "self",
    },
    {
      concept: { en: "Personalized and Optimized Breaks", de: "Personalisierte und optimierte Pausen" },
      outcome: "merged",
      as: "Flows & Breaks",
      owner: "team",
      note: {
        en: "Merged with Well-being and Productivity by their owners into Flows & Breaks — the focus half became \"Flow\" time, the well-being half became personalised breaks. The concept's name records the merge.",
        de: "Von den Verantwortlichen mit Wohlbefinden und Produktivität zu Flows & Breaks zusammengeführt — die Fokus-Hälfte wurde zur „Flow“-Zeit, die Wohlbefindens-Hälfte zu individualisierten Pausen. Der Name des Konzepts hält die Zusammenführung fest.",
      },
    },
    {
      concept: { en: "Intelligent Notification and Alert system", de: "Intelligentes Benachrichtigungs- und Hinweissystem" },
      outcome: "dropped",
      owner: "team",
      note: {
        en: "Dropped by group consensus during the narrowing session.",
        de: "In der Verdichtungssitzung im Konsens verworfen.",
      },
    },
    {
      concept: { en: "Well-being and Productivity", de: "Wohlbefinden und Produktivität" },
      outcome: "merged",
      as: "Flows & Breaks",
      owner: "team",
      note: {
        en: "Merged with Personalized and Optimized Breaks by their owners.",
        de: "Von den Verantwortlichen mit personalisierten und optimierten Pausen zusammengeführt.",
      },
    },
  ],

  // Stated rather than omitted. The sample is what it is.
  limitations: [
    {
      en: "Survey respondents were recruited by convenience and snowball sampling, which biases the sample toward the team's own networks.",
      de: "Die Umfrageteilnehmenden wurden per Convenience- und Schneeball-Sampling rekrutiert, was die Stichprobe in Richtung der eigenen Netzwerke des Teams verzerrt.",
    },
    {
      en: "Roughly three-quarters of respondents were aged 25–34 and about two-thirds worked in technology, so the sample under-represents deskbird's wider enterprise customer base.",
      de: "Rund drei Viertel der Teilnehmenden waren zwischen 25 und 34 Jahre alt und etwa zwei Drittel arbeiteten in der Technologiebranche — die Stichprobe bildet deskbirds breitere Enterprise-Kundschaft damit nur eingeschränkt ab.",
    },
    {
      en: "All six contextual inquiry participants worked in the IT industry, so the observed workday patterns are specific to that setting.",
      de: "Alle sechs Contextual-Inquiry-Teilnehmenden arbeiteten in der IT-Branche; die beobachteten Arbeitstagmuster sind daher auf diesen Kontext bezogen.",
    },
    {
      en: "Usability testing validated feature understanding and interaction, not adoption or effect on actual social connection — that would need a longitudinal study after launch.",
      de: "Das Usability-Testing validierte Verständlichkeit und Interaktion, nicht Adoption oder die tatsächliche Wirkung auf soziale Verbindung — dafür wäre eine Längsschnittstudie nach dem Launch nötig.",
    },
    // Added: two of five planned study areas were never run. Disclosed rather
    // than dropped, since the study plan is published alongside this.
    {
      en: "Two of the five planned study areas — emotional aspects of hybrid work, and social events and team building — were not run. Those questions were answered from survey responses alone rather than from dedicated study.",
      de: "Zwei der fünf geplanten Studienbereiche — emotionale Aspekte hybriden Arbeitens sowie Social Events und Teambuilding — wurden nicht durchgeführt. Diese Fragen wurden allein aus Umfrageantworten beantwortet, nicht aus eigenen Studien.",
    },
  ],

  figures: {
    solution: [
      {
        type: "image",
        src: media('p10_interests-modal.png'),
        pendingFile: 'p10_interests-modal.png',
        // UPLOAD → p10_interests-modal.png
        //   from: existing ./media/interests-modal.png — just rename
        alt: {
          en: "Interest-Based Communities prototype — the Interests modal in deskbird, where employees pick shared interests and see how many colleagues share each one",
          de: "Interest-Based-Communities-Prototyp — das Interessen-Modal in deskbird, in dem Mitarbeitende geteilte Interessen wählen und sehen, wie viele Kolleg:innen jedes Interesse teilen",
        },
        caption: {
          en: "The prototype's Interests modal: pick your interests, with counts showing how many colleagues share each one",
          de: "Das Interessen-Modal des Prototyps: Interessen wählen — Zahlen zeigen, wie viele Kolleg:innen jedes Interesse teilen",
        },
        span: 2,
        className: "w-full h-auto block",
      },
      {
        type: "image",
        src: media('p10_add-event_by-interest.png'),
        pendingFile: 'p10_add-event_by-interest.png',
        // UPLOAD → p10_add-event_by-interest.png
        //   from: ADD_EVENT.jpg — crop the frame where Invitees is set to 'By interests'
        //          with Yoga selected
        alt: {
          en: "Add event modal with the invitees field set to 'By interests', an interest dropdown showing Movies with ten colleagues and Yoga with eight, and Yoga selected as the audience for the event",
          de: "Modal „Add event“ mit dem Einladungsfeld auf „By interests“, einem Interessen-Dropdown mit Movies (zehn Kolleg:innen) und Yoga (acht) sowie Yoga als ausgewähltem Publikum für das Event",
        },
        caption: {
          en: "Invitees can be chosen by name or team, by interest, or all employees — inviting by interest is the part that reaches past the org chart",
          de: "Eingeladen wird nach Name oder Team, nach Interesse oder alle Mitarbeitenden — die Einladung nach Interesse ist der Teil, der über das Organigramm hinausreicht",
        },
        span: 2,
        className: "w-full h-auto block",
      },
      // TODO — still missing from the prototype set: the colleague profile with
      // interests visible (the "see colleagues' interests" capability), and the
      // Slack side panel. The side panel is the sharpest product decision in
      // the case study — "so it did not become another browser tab" — and it
      // has no image behind it.
    ],
    methodology: [
      {
        type: "image",
        src: media('met_ucd-process.png'),
        pendingFile: 'met_ucd-process.png',
        // UPLOAD → met_ucd-process.png
        //   from: existing ./media/ucd-process.jpg — just rename
        alt: {
          en: "UCD process of the project: Explore Requirements, Ideate Solutions, then Prototype and Test in iteration",
          de: "UCD-Prozess des Projekts: Anforderungen erkunden, Lösungen entwickeln, dann Prototyp und Test in Iteration",
        },
        caption: {
          en: "The project's UCD process — prototype and test ran as an iterative loop",
          de: "Der UCD-Prozess des Projekts — Prototyp und Test liefen als iterative Schleife",
        },
        span: 2,
        className: "w-full h-auto block",
      },
      {
        type: "image",
        src: media('met_methodology-overview.png'),
        pendingFile: 'met_methodology-overview.png',
        // UPLOAD → met_methodology-overview.png
        //   from: 13Methodology_2_-_Sanaz.pdf — export at 2x (3840px wide)
        alt: {
          en: "Methodology overview: online survey, remote contextual inquiry of 90 minutes, and a 30-minute follow-up interview, each with what it was designed to establish",
          de: "Methodenüberblick: Online-Umfrage, 90-minütige Remote Contextual Inquiry und 30-minütiges Folgeinterview, jeweils mit dem, was sie klären sollten",
        },
        caption: {
          en: "What each instrument was for — the survey explored, the inquiry observed, the interview clarified",
          de: "Wozu jedes Instrument diente — die Umfrage explorierte, die Inquiry beobachtete, das Interview klärte",
        },
        span: 2,
        className: "w-full h-auto block",
      },
      {
        type: "image",
        src: media('met_project-timeline.png'),
        pendingFile: 'met_project-timeline.png',
        // UPLOAD → met_project-timeline.png
        //   from: INTERIM_PRESENTATION…pdf p.3 — export at 2x
        alt: {
          en: "Project timeline from requirements kick-off in October 2023 to final prototype presentation in March 2024, with six milestones",
          de: "Projektzeitplan vom Kick-off der Anforderungen im Oktober 2023 bis zur Abschlusspräsentation des Prototyps im März 2024, mit sechs Meilensteinen",
        },
        caption: {
          en: "Six months, six milestones — pilot studies had their own week before fieldwork began",
          de: "Sechs Monate, sechs Meilensteine — die Pilotstudien hatten eine eigene Woche vor Beginn der Feldphase",
        },
        span: 2,
        className: "w-full h-auto block",
      },
    ],
    // New: the concept set. This is the section the case study most needed and
    // least had.
    concepts: [
      {
        type: "image",
        src: media('p08_three-concepts.png'),
        pendingFile: 'p08_three-concepts.png',
        // UPLOAD → p08_three-concepts.png
        //   from: COMPOSE: 19Slide_14_Gabi.pdf (Chat2Meet + Flows and Breaks) beside 20.
        //         pdf (Interest based communities), one three-up frame, winner marked
        //   redact: REQUIRED: strip the live Figma URL from the footer of 20.pdf
        alt: {
          en: "The three concepts presented to deskbird side by side: Chat2Meet, Flows and Breaks, and Interest-Based Communities, with the selected concept marked",
          de: "Die drei deskbird präsentierten Konzepte nebeneinander: Chat2Meet, Flows and Breaks und Interest-Based Communities, mit Markierung des ausgewählten Konzepts",
        },
        caption: {
          en: "The three concepts as presented to deskbird's stakeholders — Interest-Based Communities was selected by vote",
          de: "Die drei Konzepte, wie sie deskbirds Stakeholdern präsentiert wurden — Interest-Based Communities wurde per Abstimmung ausgewählt",
        },
        span: 2,
        className: "w-full h-auto block",
      },
    ],
    // TODO — results figures. The ~75% figure and the privacy split are quoted
    // in `results` and in process[2].insight but have no chart behind them.
    // Re-export "Survey" and "Survey cross analysis" from the Survey Analysis
    // document; the current export is a table of contents only.
    results: [
      {
        type: "image",
        src: media('p04_survey-open-questions.png'),
        pendingFile: 'p04_survey-open-questions.png',
        // UPLOAD → p04_survey-open-questions.png
        //   from: Summary_of_Survey__open-questions_.pdf — recompose into a tighter grid
        //          first; the board is mostly whitespace at native size
        alt: {
          en: "Synthesis of the survey's open-ended responses, grouped into home office versus office preferences, socialising with colleagues, company programmes, communication channels, and avoiding distractions",
          de: "Synthese der offenen Umfrageantworten, gruppiert nach Homeoffice- versus Büropräferenzen, Sozialisierung mit Kolleg:innen, Unternehmensprogrammen, Kommunikationskanälen und Vermeidung von Ablenkung",
        },
        caption: {
          en: "The open-ended survey responses, clustered — these set the focus for what the contextual inquiries went looking for",
          de: "Die offenen Umfrageantworten, geclustert — sie bestimmten, wonach die Contextual Inquiries suchten",
        },
        span: 2,
        className: "w-full h-auto block",
      },
    ],
  },

  about: {
    en: "An industry UX research project with deskbird and Bauhaus-Universität Weimar on why hybrid teams lose their everyday social connection. In a team of six we ran the full user-centred design process — stakeholder interviews, a 57-person survey, and six contextual inquiries — to establish how a social feature should work before it reached the roadmap. The outcome is 'Interest-Based Communities', my concept, selected by deskbird's stakeholders and delivered as a research-backed high-fidelity prototype.",
    de: "Ein Industrie-UX-Research-Projekt mit deskbird und der Bauhaus-Universität Weimar zur Frage, warum hybride Teams ihre alltägliche soziale Verbindung verlieren. In einem sechsköpfigen Team haben wir den vollständigen User-Centered-Design-Prozess durchlaufen — Stakeholder-Interviews, eine Umfrage mit 57 Teilnehmenden und sechs Contextual Inquiries —, um vor der Roadmap-Aufnahme zu klären, wie ein Social Feature funktionieren sollte. Das Ergebnis sind „Interest-Based Communities“ — mein Konzept, von den deskbird-Stakeholdern ausgewählt und als forschungsbasierter High-Fidelity-Prototyp übergeben.",
  },

  challenge: {
    en: "Hybrid work reduced spontaneous social interactions: employees felt less integrated and new joiners struggled to connect. deskbird — a B2B SaaS platform for desk booking and hybrid week planning — wanted evidence, not assumptions, on how a social feature should work before committing it to the product roadmap.",
    de: "Hybrides Arbeiten reduzierte spontane soziale Interaktionen: Mitarbeitende fühlten sich weniger integriert, und neue Kolleg:innen taten sich schwer, Anschluss zu finden. deskbird — eine B2B-SaaS-Plattform für Deskbuchung und hybride Wochenplanung — wollte Evidenz statt Annahmen darüber, wie ein Social Feature funktionieren sollte, bevor es in die Produkt-Roadmap aufgenommen wird.",
  },

  solution: {
    en: "We designed 'Interest-Based Communities': employees add interests to their profile, see colleagues' interests, and create or get invited to interest-based events. The concept connects both office-based and remote staff and was delivered as a high-fidelity prototype with development recommendations, grounded in every research finding along the way.",
    de: "Wir gestalteten „Interest-Based Communities“: Mitarbeitende fügen ihrem Profil Interessen hinzu, sehen die Interessen von Kolleg:innen und erstellen interessenbasierte Events oder werden dazu eingeladen. Das Konzept verbindet Büro- und Remote-Mitarbeitende und wurde als High-Fidelity-Prototyp mit Entwicklungsempfehlungen übergeben, durchgehend auf den Forschungsergebnissen aufgebaut.",
  },

  methodology: {
    // Amended: adds the second competitor landscape (direct desk-booking
    // competitors), the pilots, and the survey's consent block. Everything else
    // is unchanged — the 90/30 timings and the ~25 others count both check out
    // against the final presentation and the state-of-the-art slide.
    en: "We followed the full UCD process in an industry setting. Two competitive reviews framed the scope: the hybrid-work engagement landscape (Microsoft Viva, Workvivo, Donut for Slack, Happeo, and ~25 others) to establish what a social feature could be, and deskbird's direct desk-booking competitors (Flexopus, Condeco, Deskly, Robin, Kadence, Yoffix, Seatti, and others) to establish what was already shipping. A heuristic evaluation of the existing deskbird app — walked through as both admin and end user, with user-flow analysis — mapped the product itself. A literature review of social features in workplace systems, working from Lyons and Lessard's distinction between key and supportive social features, gave the concept work a vocabulary. Stakeholder interviews across marketing, product management, product design, and customer support defined brand identity, consumer aspirations, and the social-feature scope. A ten-section online survey opening with a consent block (57 respondents, mainly aged 25–34, IT industry, hybrid workers recruited via convenience and snowball sampling) quantified work conditions, social interaction states, communication channels, and privacy preferences; it was piloted with the think-aloud method before launch, and its open-ended responses set the focus for what came next. Six 90-minute remote contextual inquiries — observing product managers, engineers, designers, and analysts in their real hybrid workday, half from home and half from the office — were each paired with a 30-minute semi-structured follow-up interview, then worked through in team interpretation sessions. Two inquiry pilots preceded the recorded sessions.",
    de: "Wir durchliefen den vollständigen UCD-Prozess im Industrie-Setting. Zwei Wettbewerbsanalysen steckten den Rahmen ab: die Hybrid-Work-Engagement-Landschaft (Microsoft Viva, Workvivo, Donut for Slack, Happeo und ~25 weitere), um zu klären, was ein Social Feature sein kann, und deskbirds direkte Deskbuchungs-Wettbewerber (Flexopus, Condeco, Deskly, Robin, Kadence, Yoffix, Seatti und andere), um zu klären, was bereits am Markt war. Eine heuristische Evaluation der bestehenden deskbird-App — durchlaufen sowohl als Admin als auch als Endnutzer:in, mit User-Flow-Analyse — kartierte das Produkt selbst. Eine Literaturrecherche zu Social Features in Workplace-Systemen, ausgehend von Lyons und Lessards Unterscheidung zwischen Key und Supportive Social Features, lieferte das Vokabular für die Konzeptarbeit. Stakeholder-Interviews in Marketing, Produktmanagement, Produktdesign und Customer Support definierten Markenidentität, Nutzerwünsche und den Umfang des Social Features. Eine zehnteilige Online-Umfrage mit vorangestellter Einwilligungserklärung (57 Teilnehmende, überwiegend 25–34 Jahre, IT-Branche, hybride Mitarbeitende, rekrutiert per Convenience- und Schneeball-Sampling) quantifizierte Arbeitsbedingungen, den Stand sozialer Interaktion, Kommunikationskanäle und Datenschutzpräferenzen; sie wurde vor dem Launch mit der Think-aloud-Methode pilotiert, und ihre offenen Antworten bestimmten den Fokus der nächsten Schritte. Sechs 90-minütige Remote-Contextual-Inquiries — Beobachtung von Product Managern, Entwickler:innen, Designer:innen und Analyst:innen im realen hybriden Arbeitsalltag, zur Hälfte aus dem Homeoffice, zur Hälfte aus dem Büro — wurden jeweils mit einem 30-minütigen semi-strukturierten Folgeinterview gepaart und anschließend in gemeinsamen Interpretationssitzungen aufgearbeitet. Den dokumentierten Sitzungen gingen zwei Piloten voraus.",
  },

  results: {
    en: "Socialisation happens during breaks, and office breaks differ fundamentally from home-office breaks; the office is preferred for real interactions and faster communication while home office wins on convenience and fewer distractions; and nearly three-quarters of survey respondents agreed that knowing personal details about a colleague makes them relate more. Interaction across seniority levels and departments emerged as a persistent barrier. These findings shaped three competing concepts (Chat2Meet, Flows & Breaks, Interest-Based Communities); Interest-Based Communities was selected, refined into the final prototype, and validated in user testing sessions that returned positive feedback on usability and feature understanding.",
    de: "Sozialisierung findet in Pausen statt, und Büropausen unterscheiden sich grundlegend von Homeoffice-Pausen; das Büro wird für echte Interaktionen und schnellere Kommunikation bevorzugt, während das Homeoffice bei Bequemlichkeit und weniger Ablenkung punktet; und fast drei Viertel der Umfrageteilnehmenden stimmten zu, dass persönliche Details über Kolleg:innen sie verbundener fühlen lassen. Interaktion über Senioritäts- und Abteilungsgrenzen hinweg erwies sich als hartnäckige Hürde. Diese Erkenntnisse formten drei konkurrierende Konzepte (Chat2Meet, Flows & Breaks, Interest-Based Communities); Interest-Based Communities wurde ausgewählt, zum finalen Prototyp verfeinert und in Usability-Tests validiert, die positives Feedback zu Bedienbarkeit und Verständlichkeit des Features ergaben.",
  },

  // Process gallery
  process: [
    {
      phase: "discover",
      type: { en: "Heuristic Evaluation & Competitive Review", de: "Heuristische Evaluation & Wettbewerbsanalyse" },
      title: { en: "Learning the Product and the Landscape", de: "Produkt und Wettbewerbsumfeld verstehen" },
      annotation: {
        // Amended to name both reviews and the heuristic colour-coding, since
        // the evaluation board is now shown alongside.
        en: "Before talking to anyone we walked the existing deskbird app end to end, once as an admin and once as an end user, mapping its user flows and its existing social surface — annotating every screen against Nielsen's heuristics, colour-coded by which one was in question. In parallel we reviewed two landscapes: the engagement-platform set (Microsoft Viva Engage, Workvivo, Happeo, Haiilo, Staffbase, Donut for Slack, Sococo, Gather Town and others) and deskbird's direct desk-booking competitors (Flexopus, Deskly, Kadence, Seatti, Envoy, Yoffix and others), feature by feature.",
        de: "Bevor wir mit irgendjemandem sprachen, gingen wir die bestehende deskbird-App vollständig durch — einmal als Admin, einmal als Endnutzer:in —, kartierten ihre User Flows und ihre vorhandene soziale Oberfläche und annotierten jeden Screen entlang der Nielsen-Heuristiken, farblich nach betroffener Heuristik codiert. Parallel analysierten wir zwei Landschaften: die Engagement-Plattformen (Microsoft Viva Engage, Workvivo, Happeo, Haiilo, Staffbase, Donut for Slack, Sococo, Gather Town und weitere) und deskbirds direkte Deskbuchungs-Wettbewerber (Flexopus, Deskly, Kadence, Seatti, Envoy, Yoffix und andere) — Feature für Feature.",
      },
      insight: {
        // ── CORRECTED ─────────────────────────────────────────────────────────
        // The previous version read: "deskbird's opening was different — it
        // already knew who was in the office on which day, which is a starting
        // point none of the others had."
        //
        // The project's own competitor review contradicts this. Flexopus
        // ("Search & find colleagues"), Deskly ("Who's in the office"), Kadence
        // ("Friend Finder", "Check Who's in Each Day"), Seatti ("see at a
        // glance who's in the office and when"), Envoy ("find coworkers") and
        // Yoffix ("syncing your office days with your favorite colleagues") all
        // shipped presence data. The review even annotates several of them with
        // "This is a feature that Deskbird also has."
        //
        // The defensible differentiator is not the data — it is what nobody
        // was doing with it.
        // ──────────────────────────────────────────────────────────────────────
        en: "Presence data was not the gap: Flexopus, Deskly, Kadence, Seatti, Envoy and Yoffix all shipped some form of colleague finder, and our own review notes deskbird had the equivalent. What none of them did was use that data to create a connection. The social layer sat on top of work as a feed, a channel, or a chat — separate from the planning flow people were already in. The opening was to build the social feature into the scheduling surface rather than beside it.",
        de: "Anwesenheitsdaten waren nicht die Lücke: Flexopus, Deskly, Kadence, Seatti, Envoy und Yoffix boten alle eine Form von Kolleg:innen-Finder, und unsere eigene Analyse hält fest, dass deskbird das Äquivalent bereits hatte. Was keiner tat: diese Daten nutzen, um Verbindung herzustellen. Die soziale Ebene lag als Feed, Kanal oder Chat über der Arbeit — getrennt von dem Planungsfluss, in dem die Menschen ohnehin schon waren. Der Ansatzpunkt war, das Social Feature in die Planungsoberfläche hinein zu bauen statt daneben.",
      },
      figures: [
        {
          type: "image",
          src: media('p01_heuristic-evaluation_board.png'),
          pendingFile: 'p01_heuristic-evaluation_board.png',
          // UPLOAD → p01_heuristic-evaluation_board.png
          //   from: Heuristic_Evaluation.jpg (23448x32768) — export ONE desktop/mobile ban
          //         d, not the whole board
          //   redact: blur the colleague avatar photos in the Kitchen and Stand up area ca
          //           rds
          alt: {
            en: "Heuristic evaluation board: deskbird desktop and mobile screens across four flows, annotated with colour-coded sticky notes",
            de: "Board der heuristischen Evaluation: deskbird-Screens für Desktop und Mobile über vier Flows hinweg, annotiert mit farbcodierten Haftnotizen",
          },
          caption: {
            en: "Heuristic evaluation of the existing deskbird app, desktop and mobile, across four flows",
            de: "Heuristische Evaluation der bestehenden deskbird-App, Desktop und Mobile, über vier Flows hinweg",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p01_heuristic-evaluation_detail.png'),
          pendingFile: 'p01_heuristic-evaluation_detail.png',
          // UPLOAD → p01_heuristic-evaluation_detail.png
          //   from: Heuristic_Evaluation.jpg — crop the 'Book a space' screen with its six
          //          colour-coded stickies
          //   redact: blur avatar photos if any fall inside the crop
          alt: {
            en: "Close-up of the Book a space screen with six heuristic annotations: error prevention, consistency and standards, recognition rather than recall, flexibility and efficiency of use, visibility of system status, and match between system and the real world",
            de: "Nahaufnahme des Screens „Book a space“ mit sechs heuristischen Annotationen: Fehlervermeidung, Konsistenz und Standards, Wiedererkennung statt Erinnerung, Flexibilität und Effizienz, Sichtbarkeit des Systemstatus sowie Übereinstimmung von System und realer Welt",
          },
          caption: {
            en: "Sticky colour encodes the heuristic in question — one screen, six findings",
            de: "Die Farbe der Notiz codiert die betroffene Heuristik — ein Screen, sechs Befunde",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p01_state-of-the-art.png'),
          pendingFile: 'p01_state-of-the-art.png',
          // UPLOAD → p01_state-of-the-art.png
          //   from: 04State_of_art.pdf — export at 2x
          alt: {
            en: "State of the art slide mapping reason, challenge, goal and solution, alongside the competitor landscape and deskbird's four social opportunity areas",
            de: "State-of-the-Art-Folie mit Grund, Herausforderung, Ziel und Lösung, daneben die Wettbewerbslandschaft und deskbirds vier soziale Ansatzpunkte",
          },
          caption: {
            en: "The landscape, and the four social openings deskbird's existing product already implied",
            de: "Die Landschaft — und die vier sozialen Ansatzpunkte, die deskbirds bestehendes Produkt bereits nahelegte",
          },
          span: 1,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "discover",
      type: { en: "Stakeholder Interviews", de: "Stakeholder-Interviews" },
      title: { en: "Aligning on Scope with deskbird", de: "Scope-Abstimmung mit deskbird" },
      annotation: {
        en: "Interviews across marketing, product management, product design, and customer support surfaced three insight clusters: brand identity (minimalist, usability-driven UX), consumer aspirations (fewer clicks, no extra browser tabs), and the social-feature mandate — transparent, non-intrusive, attracting people back to the office.",
        de: "Interviews in Marketing, Produktmanagement, Produktdesign und Customer Support ergaben drei Erkenntnis-Cluster: Markenidentität (minimalistische, usability-getriebene UX), Nutzerwünsche (weniger Klicks, keine zusätzlichen Browser-Tabs) und der Auftrag für das Social Feature — transparent, unaufdringlich, Menschen zurück ins Büro locken.",
      },
      insight: {
        en: "The business goal ('attract people back to the office') and the user goal ('meaningful connection') were not the same thing — the requirements had to answer both.",
        de: "Das Geschäftsziel („Menschen zurück ins Büro locken“) und das Nutzerziel („bedeutsame Verbindung“) waren nicht dasselbe — die Anforderungen mussten beide beantworten.",
      },
      figures: [
        {
          type: "image",
          src: media('p02_stakeholder-themes.png'),
          pendingFile: 'p02_stakeholder-themes.png',
          // UPLOAD → p02_stakeholder-themes.png
          //   from: Interview_Analysis.jpg — the three-panel left-to-right layout
          //   redact: REQUIRED: remove the ICP block (enterprise 1500-2000, MS Teams/Googl
          //           e), the USP list, the competitor-differentiation notes, and the cont
          //           ributor names on stickies
          alt: {
            en: "Stakeholder interview synthesis: observations clustered into three themes — brand identity, consumer aspiration, and social features",
            de: "Synthese der Stakeholder-Interviews: Beobachtungen geclustert in drei Themen — Markenidentität, Nutzerwünsche und Social Features",
          },
          caption: {
            // Redaction note kept in the caption so the reader knows why the
            // board has gaps, rather than assuming the work does.
            en: "Interview synthesis, from individual observations to three themes — commercially sensitive detail redacted",
            de: "Interview-Synthese, von einzelnen Beobachtungen zu drei Themen — geschäftlich sensible Details geschwärzt",
          },
          span: 2,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      // NEW STEP. The definition of "social feature" and the five candidate
      // types were a scoping act with no representation in the case study.
      // It is the link between the brief and the concept.
      //
      // NOTE: the source slide sits in the Background section of the FINAL
      // deck, so the highlight on "customisable user profiles" may be
      // retrospective rather than an early decision. Phrased below so it holds
      // either way — verify against your notes and tighten if it was early.
      phase: "discover",
      type: { en: "Scoping", de: "Scoping" },
      title: { en: "Defining What a Social Feature Meant Here", de: "Definieren, was ein Social Feature hier heißt" },
      annotation: {
        en: "Before scoping anything we wrote our own working definition: social features within deskbird are the functionalities that facilitate communication, collaboration, and community-building among employees in a hybrid workspace. Five candidate types sat inside it — centralised activity feeds, virtual or physical collaboration spaces, in-app messaging, customisable user profiles, and automated notifications and alerts.",
        de: "Bevor wir irgendetwas eingrenzten, formulierten wir eine eigene Arbeitsdefinition: Social Features innerhalb von deskbird sind die Funktionen, die Kommunikation, Zusammenarbeit und Gemeinschaftsbildung unter Mitarbeitenden in einem hybriden Arbeitsraum ermöglichen. Fünf Kandidatentypen fielen darunter — zentrale Aktivitäts-Feeds, virtuelle oder physische Kollaborationsräume, In-App-Messaging, anpassbare Nutzerprofile sowie automatisierte Benachrichtigungen und Hinweise.",
      },
      insight: {
        en: "Naming the five types made the trade-off visible. Three of them — feeds, messaging, notifications — add a channel, which ran against the stakeholder mandate for something non-intrusive and free of extra browser tabs. Customisable user profiles was the type the concept work ended up building on.",
        de: "Die fünf Typen zu benennen machte den Zielkonflikt sichtbar. Drei davon — Feeds, Messaging, Benachrichtigungen — fügen einen weiteren Kanal hinzu und liefen damit dem Stakeholder-Auftrag nach etwas Unaufdringlichem ohne zusätzliche Browser-Tabs zuwider. Auf dem Typ „anpassbare Nutzerprofile“ baute die Konzeptarbeit schließlich auf.",
      },
      figures: [
        {
          type: "image",
          src: media('p03_social-feature-types.png'),
          pendingFile: 'p03_social-feature-types.png',
          // UPLOAD → p03_social-feature-types.png
          //   from: 05What_is_the_focus_of_our_work__1.pdf — export at 2x
          alt: {
            en: "Objective slide: the team's own definition of social features, with five candidate types listed and customisable user profiles highlighted",
            de: "Zielfolie: die eigene Definition von Social Features des Teams, mit fünf Kandidatentypen und hervorgehobenen anpassbaren Nutzerprofilen",
          },
          caption: {
            en: "Five candidate social feature types — three of them would have added another channel",
            de: "Fünf Kandidatentypen für Social Features — drei davon hätten einen weiteren Kanal hinzugefügt",
          },
          span: 2,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "discover",
      type: { en: "Online Survey", de: "Online-Umfrage" },
      title: { en: "Quantifying Hybrid Social Life (N=57)", de: "Hybrides Sozialleben quantifizieren (N=57)" },
      annotation: {
        // Amended: adds the ten-section structure, the consent block, and the
        // think-aloud pilot.
        en: "A ten-section instrument opening with a consent block: multiple-choice, rating, and open-ended questions across work conditions, social preferences, social interaction in work life, the role of the company, communication channels, emotional aspects, and privacy preferences. It was piloted with the think-aloud method and revised before launch. Respondents were mainly juniors aged 25–34 in the IT industry, across various company sizes. Participation was screened on currently or recently working in a hybrid setting.",
        de: "Ein zehnteiliges Instrument, eröffnet mit einer Einwilligungserklärung: Multiple-Choice-, Bewertungs- und offene Fragen zu Arbeitsbedingungen, sozialen Präferenzen, sozialer Interaktion im Arbeitsleben, der Rolle des Unternehmens, Kommunikationskanälen, emotionalen Aspekten und Datenschutzpräferenzen. Es wurde mit der Think-aloud-Methode pilotiert und vor dem Launch überarbeitet. Die Teilnehmenden waren überwiegend Berufseinsteiger:innen im Alter von 25–34 in der IT-Branche, über verschiedene Unternehmensgrößen hinweg. Voraussetzung für die Teilnahme war aktuelle oder kürzliche Arbeit im hybriden Setting.",
      },
      insight: {
        en: "Nearly three-quarters agreed that knowing personal details about a colleague makes them relate more — the single strongest signal pointing toward interest-based connection. Respondents were open about gender, relationship status, and birthday, but split on age, hobbies, and personal milestones, which set a boundary for what any profile could ask for.",
        de: "Fast drei Viertel stimmten zu, dass persönliche Details über Kolleg:innen sie verbundener fühlen lassen — das stärkste Einzelsignal für eine interessenbasierte Verbindung. Angaben zu Geschlecht, Beziehungsstatus und Geburtstag teilten die Befragten offen, bei Alter, Hobbys und persönlichen Meilensteinen waren die Reaktionen gemischt. Das setzte die Grenze dafür, was ein Profil überhaupt abfragen durfte.",
      },
      figures: [
        {
          type: "image",
          src: media('p04_survey-participants.png'),
          pendingFile: 'p04_survey-participants.png',
          // UPLOAD → p04_survey-participants.png
          //   from: 14Methodology_3_-_Sanaz.pdf — export at 2x
          alt: {
            en: "Survey participants: 57 respondents, mainly aged 25 to 34, mainly juniors in the IT industry, across various company sizes, recruited by convenience and snowball sampling",
            de: "Umfrageteilnehmende: 57 Personen, überwiegend 25 bis 34 Jahre, überwiegend Berufseinsteiger:innen in der IT-Branche, über verschiedene Unternehmensgrößen hinweg, rekrutiert per Convenience- und Schneeball-Sampling",
          },
          caption: {
            en: "Who answered, and how they were recruited — the sampling method is also the first limitation",
            de: "Wer geantwortet hat und wie rekrutiert wurde — die Sampling-Methode ist zugleich die erste Limitation",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p04_survey-open-questions.png'),
          pendingFile: 'p04_survey-open-questions.png',
          // UPLOAD → p04_survey-open-questions.png
          //   from: Summary_of_Survey__open-questions_.pdf — recompose into a tighter grid
          //          first; the board is mostly whitespace at native size
          alt: {
            en: "Clustered synthesis of the survey's open-ended responses across home office versus office, socialising with colleagues, company programmes, social events, communication channels and avoiding distractions",
            de: "Geclusterte Synthese der offenen Umfrageantworten zu Homeoffice versus Büro, Sozialisierung mit Kolleg:innen, Unternehmensprogrammen, Social Events, Kommunikationskanälen und Vermeidung von Ablenkung",
          },
          caption: {
            en: "The open responses, clustered — these set what the contextual inquiries went looking for",
            de: "Die offenen Antworten, geclustert — sie bestimmten, wonach die Contextual Inquiries suchten",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p04_survey-charts.png'),
          pendingFile: 'p04_survey-charts.png',
          // UPLOAD → p04_survey-charts.png
          //   from: STILL NEEDED — re-export the "Survey" and "Survey cross
          //         analysis" pages. The current Survey_Analysis.pdf exported
          //         as a table of contents only. Must include the ~75% item
          //         and the privacy split (open on gender/status/birthday,
          //         divided on age/hobbies/milestones).
          alt: {
            en: "Survey charts showing that nearly three-quarters of respondents relate more to colleagues whose personal details they know, and the split in willingness to share different kinds of personal information",
            de: "Umfrage-Diagramme: Fast drei Viertel der Befragten fühlen sich Kolleg:innen näher, deren persönliche Details sie kennen, sowie die geteilte Bereitschaft, verschiedene persönliche Informationen zu teilen",
          },
          caption: {
            en: "The two findings the concept rests on — personal details create closeness, and people draw a line at hobbies",
            de: "Die beiden Erkenntnisse, auf denen das Konzept ruht — persönliche Details schaffen Nähe, und bei Hobbys ziehen Menschen eine Grenze",
          },
          span: 2,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "discover",
      type: { en: "Remote Contextual Inquiry", de: "Remote Contextual Inquiry" },
      title: { en: "Observing the Hybrid Workday in Context (N=6)", de: "Den hybriden Arbeitstag im Kontext beobachten (N=6)" },
      annotation: {
        // Amended: adds the recruitment criteria (office at least once a week,
        // half home / half office, gender distribution) and the pilots.
        en: "Six 90-minute remote observations of hybrid workers in their real workplace — product manager, software engineer, customer success manager, product designer, UX working student, business analyst — followed by 30-minute semi-structured interviews to clarify observations and capture desires for improvement. Participants had to be in the office at least once a week, gender was distributed evenly, and half were observed from home and half from the office so the two settings could be compared directly. Two pilots preceded the recorded sessions. The open-ended survey answers set what we went looking for: how people decide between home and office, how they feel about office events, how they connect with colleagues.",
        de: "Sechs 90-minütige Remote-Beobachtungen hybrider Mitarbeitender an ihrem realen Arbeitsplatz — Product Manager, Software Engineer, Customer Success Manager, Product Designer, UX-Werkstudentin, Business Analyst — gefolgt von 30-minütigen semi-strukturierten Interviews zur Klärung der Beobachtungen und zur Erfassung von Verbesserungswünschen. Teilnehmende mussten mindestens einmal wöchentlich im Büro sein, das Geschlechterverhältnis war ausgewogen, und die Hälfte wurde im Homeoffice, die Hälfte im Büro beobachtet, damit sich beide Settings direkt vergleichen ließen. Den dokumentierten Sitzungen gingen zwei Piloten voraus. Die offenen Umfrageantworten gaben vor, wonach wir suchten: wie Menschen zwischen Homeoffice und Büro entscheiden, wie sie zu Büro-Events stehen, wie sie Kontakt zu Kolleg:innen halten.",
      },
      insight: {
        en: "Breaks are when socialisation happens — and breaks at the office differ fundamentally from breaks at home. Participants wanted variety and meaningful social breaks — and to be left undisturbed when they needed focus.",
        de: "Sozialisierung findet in Pausen statt — und Pausen im Büro unterscheiden sich grundlegend von Pausen zu Hause. Teilnehmende wollten Abwechslung und bedeutsame soziale Pausen — und ungestört bleiben, wenn sie Fokus brauchten.",
      },
      figures: [
        {
          type: "image",
          src: media('p05_ci-participants.png'),
          pendingFile: 'p05_ci-participants.png',
          // UPLOAD → p05_ci-participants.png
          //   from: 15Methodology_4_-_Sanaz.pdf — export at 2x
          //   redact: FIX FIRST: the slide reads 'aged 23-20'
          alt: {
            en: "Contextual inquiry participants: six people in diverse roles, all in the IT industry, working hybrid and in the office at least once a week",
            de: "Contextual-Inquiry-Teilnehmende: sechs Personen in unterschiedlichen Rollen, alle in der IT-Branche, hybrid arbeitend und mindestens einmal wöchentlich im Büro",
          },
          caption: {
            en: "Six participants, six roles — all in IT, which is the third limitation",
            de: "Sechs Teilnehmende, sechs Rollen — alle in der IT, was die dritte Limitation ist",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p05_p3-home-office.png'),
          pendingFile: 'p05_p3-home-office.png',
          // UPLOAD → p05_p3-home-office.png
          //   from: p3_at_home.jpg
          //   redact: REQUIRED: the participant's full name is legible on the MacBook lock
          //            screen. Blur the screen, the date/time, the notebook handwriting, a
          //           nd the window view. Confirm consent covers publishing a photo of the
          //           ir home
          alt: {
            en: "Participant 3's home office setup: a single external monitor and laptop by a window, with a notebook, water carafe and a lamp",
            de: "Homeoffice-Setup von Teilnehmer:in 3: ein externer Monitor und Laptop am Fenster, dazu Notizbuch, Wasserkaraffe und Lampe",
          },
          caption: {
            en: "The same participant's home setup — identifying detail blurred",
            de: "Das Homeoffice-Setup derselben Person — identifizierende Details unkenntlich gemacht",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p05_p3-at-office.png'),
          pendingFile: 'p05_p3-at-office.png',
          // UPLOAD → p05_p3-at-office.png
          //   from: p3_at_office.jpg
          //   redact: REQUIRED: check the lock screen for the same name at full resolution
          //           ; blur colleagues' desks in the background
          alt: {
            en: "The same participant's office setup: the same laptop and peripherals on a shared desk, with empty desks and chairs behind",
            de: "Das Büro-Setup derselben Person: derselbe Laptop und dieselbe Peripherie an einem geteilten Schreibtisch, dahinter leere Tische und Stühle",
          },
          caption: {
            en: "…and the office setup. Same laptop, same keyboard, different room — the difference the whole study turned on",
            de: "…und das Büro-Setup. Derselbe Laptop, dieselbe Tastatur, ein anderer Raum — genau der Unterschied, um den die Studie kreiste",
          },
          span: 1,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "define",
      type: { en: "Interpretation Sessions & Affinity Diagram", de: "Interpretationssitzungen & Affinity-Diagramm" },
      title: { en: "Six Workdays into One Picture", de: "Sechs Arbeitstage zu einem Bild" },
      annotation: {
        en: "Each inquiry was worked through in a team interpretation session. Observations became numbered affinity notes tagged to the participant they came from, and each participant's workday was modelled from five angles — sequence, relationship, collaboration, identity, and physical setup. The five model types were divided across the team so that each one was built consistently across all six participants; I owned the collaboration model. The wall was then built in five passes: gather every note, group by observed pattern, write blue labels, consolidate blue into pink, and read actionable ideas off the top.",
        de: "Jede Inquiry wurde in einer gemeinsamen Interpretationssitzung aufgearbeitet. Beobachtungen wurden zu nummerierten Affinity Notes, die der jeweiligen teilnehmenden Person zugeordnet blieben; der Arbeitstag jeder Person wurde aus fünf Blickwinkeln modelliert — Sequenz, Beziehung, Kollaboration, Identität und physischer Aufbau. Die fünf Modelltypen wurden im Team aufgeteilt, damit jeder Typ über alle sechs Teilnehmenden hinweg einheitlich entstand; das Kollaborationsmodell lag bei mir. Die Wand entstand dann in fünf Durchgängen: alle Notizen sammeln, nach beobachteten Mustern gruppieren, blaue Labels schreiben, Blau zu Pink verdichten und die umsetzbaren Ideen von oben ablesen.",
      },
      insight: {
        en: "Six themes came out of the wall: interruption and focus, work breaks, socialising at the workplace, what drives the choice between home and office, communication habits, and bonding at work. Because every note stayed tagged to its participant, any requirement could be walked back to the observation behind it.",
        de: "Aus der Wand ergaben sich sechs Themen: Unterbrechung und Fokus, Arbeitspausen, Sozialisierung am Arbeitsplatz, Faktoren der Entscheidung zwischen Homeoffice und Büro, Kommunikationsgewohnheiten und Bindung im Team. Da jede Notiz ihrer Quelle zugeordnet blieb, ließ sich jede Anforderung auf die dahinterliegende Beobachtung zurückführen.",
      },
      figures: [
        {
          type: "image",
          src: media('p06_affinity-wall_full.png'),
          pendingFile: 'p06_affinity-wall_full.png',
          // UPLOAD → p06_affinity-wall_full.png
          //   from: affinity_mapping.jpg (8000x1477) — export as the full wide strip
          alt: {
            en: "The full affinity wall: three domains of clustered sticky notes rising from yellow observations through blue labels and pink consolidations to green themes",
            de: "Die vollständige Affinity-Wand: drei Domänen geclusterter Haftnotizen, von gelben Beobachtungen über blaue Labels und pinke Verdichtungen bis zu grünen Themen",
          },
          caption: {
            en: "The affinity wall after the final pass — yellow observations, blue labels, pink consolidations, green themes",
            de: "Die Affinity-Wand nach dem letzten Durchgang — gelbe Beobachtungen, blaue Labels, pinke Verdichtungen, grüne Themen",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p06_affinity-wall_detail.png'),
          pendingFile: 'p06_affinity-wall_detail.png',
          // UPLOAD → p06_affinity-wall_detail.png
          //   from: affinity_mapping.jpg — crop one green to pink to blue to yellow chain 
          //         with the (P1)-(P6) participant tags legible
          //   redact: read the notes inside the crop before publishing; observation notes 
          //           sometimes name a company or a colleague
          alt: {
            en: "Close-up of one affinity chain under the theme 'what people want for their work breaks', showing numbered notes each tagged with a participant identifier",
            de: "Nahaufnahme einer Affinity-Kette unter dem Thema „Was Menschen sich für ihre Arbeitspausen wünschen“, mit nummerierten Notizen, die jeweils eine Teilnehmenden-Kennung tragen",
          },
          caption: {
            en: "One chain in detail — every note keeps its number and its participant tag, which is what made requirements traceable",
            de: "Eine Kette im Detail — jede Notiz behält Nummer und Teilnehmenden-Kennung; genau das machte Anforderungen rückverfolgbar",
          },
          span: 2,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "define",
      type: { en: "Requirements Synthesis", de: "Anforderungssynthese" },
      title: { en: "From Findings to Requirement Categories", de: "Von Erkenntnissen zu Anforderungskategorien" },
      annotation: {
        en: "Findings were synthesised into functional, environmental, user, and data requirements: foster interaction across seniority levels and around shared interests, integrate seamlessly on every platform, stay accessible to both remote and on-site staff, stay intuitive for all users, and collect data privacy-first. Each entry carried the interview or exploration it came from, and the matrix went through a second pass after critique — one round mixed ideas in with requirements, and those were pulled back out into the ideation phase where they belonged.",
        de: "Die Erkenntnisse wurden zu funktionalen, umgebungsbezogenen, nutzer- und datenbezogenen Anforderungen verdichtet: Interaktion über Senioritätsstufen hinweg und über geteilte Interessen fördern, nahtlose Integration auf jeder Plattform, Zugänglichkeit für Remote- und Vor-Ort-Mitarbeitende, intuitive Bedienung für alle Nutzenden und datenschutzorientierte Datenerhebung. Jeder Eintrag trug das Interview oder die Exploration, aus der er stammte, und die Matrix durchlief nach Kritik eine zweite Fassung — in einer Runde waren Ideen unter die Anforderungen geraten und wurden zurück in die Ideation-Phase geholt, wo sie hingehörten.",
      },
      insight: {
        en: "Interaction between different seniority levels and departments was where connecting stayed hardest — any concept had to lower that threshold, not just add another chat channel. The questions the matrix could not answer became three scoped follow-up studies: social interaction at the workplace, privacy preferences around social data, and communication channels.",
        de: "Interaktion zwischen unterschiedlichen Senioritätsstufen und Abteilungen blieb die schwierigste Stelle beim Verbinden — jedes Konzept musste diese Schwelle senken, statt nur einen weiteren Chat-Kanal hinzuzufügen. Die Fragen, die die Matrix nicht beantworten konnte, wurden zu drei abgegrenzten Folgestudien: soziale Interaktion am Arbeitsplatz, Datenschutzpräferenzen bei sozialen Daten und Kommunikationskanäle.",
      },
      figures: [
        {
          type: "image",
          src: media('p07_requirements-matrix_v1-v2.png'),
          pendingFile: 'p07_requirements-matrix_v1-v2.png',
          // UPLOAD → p07_requirements-matrix_v1-v2.png
          //   from: Requirements_brainstorm.jpg — V1 above V2 so the second pass is visibl
          //         e
          alt: {
            en: "The requirements matrix in two versions stacked, each column carrying its source label, with open questions beneath and arrows converging into three follow-up studies",
            de: "Die Anforderungsmatrix in zwei übereinanderliegenden Fassungen, jede Spalte mit Quellenangabe, darunter offene Fragen und Pfeile, die in drei Folgestudien zusammenlaufen",
          },
          caption: {
            en: "The matrix, v1 above v2 — the second pass separated ideas that had been mixed into the requirements and returned them to ideation",
            de: "Die Matrix, v1 über v2 — der zweite Durchgang trennte Ideen, die unter die Anforderungen geraten waren, und gab sie an die Ideation zurück",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p07_requirements-scope.png'),
          pendingFile: 'p07_requirements-scope.png',
          // UPLOAD → p07_requirements-scope.png
          //   from: 08Scope_of_requirements.pdf — export at 2x
          alt: {
            en: "Scope of requirements: functional, environmental, user and data requirements as four cards",
            de: "Anforderungsumfang: funktionale, umgebungsbezogene, nutzer- und datenbezogene Anforderungen als vier Karten",
          },
          caption: {
            en: "The scoped set as presented to deskbird — four categories out of a wider working matrix",
            de: "Der eingegrenzte Satz, wie er deskbird präsentiert wurde — vier Kategorien aus einer breiteren Arbeitsmatrix",
          },
          span: 1,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "design",
      type: { en: "Concept Development", de: "Konzeptentwicklung" },
      title: { en: "Three Concepts, One Winner", de: "Drei Konzepte, ein Gewinner" },
      annotation: {
        // Rewritten. The previous version compressed the whole ideation arc
        // into "we developed and compared three concepts". The actual pipeline
        // ran: three affinity sections → visioning per section → concepts per
        // section → consolidation into five concepts → one owner each → a
        // stakeholder review round on all five → narrowing to three.
        en: "Each of the three affinity sections was taken through visioning and then into concepts, and the pooled results were consolidated into five directions: efficient and engaging communication, interest-based events and social networking, personalised and optimised breaks, intelligent notifications and alerts, and well-being and productivity. Each direction was owned by one team member, who took it through a concept pack — background verbatims, a jobs-to-be-done statement, target users, target companies, a concept-level competitor review, a feature MVP breakdown, and a storyboard — and defended it in a review round where every concept received written feedback and a clarity check. Interest-based events and social networking was mine. Narrowing five to three was a scoping decision made in a brainstorming session as the project neared its end, not a scored comparison: personalised breaks and well-being overlapped enough to be merged by their owners into Flows & Breaks, intelligent notifications was dropped by group consensus, and the remaining three went to deskbird's stakeholders as Chat2Meet, Flows & Breaks, and Interest-Based Communities.",
        de: "Jede der drei Affinity-Sektionen durchlief Visioning und anschließend die Konzeptphase; die gebündelten Ergebnisse wurden zu fünf Richtungen verdichtet: effiziente und ansprechende Kommunikation, interessenbasierte Events und Social Networking, personalisierte und optimierte Pausen, intelligente Benachrichtigungen und Hinweise sowie Wohlbefinden und Produktivität. Jede Richtung lag bei einer Person im Team, die sie in einem Konzeptpaket ausarbeitete — Hintergrundzitate, Jobs-to-be-done-Statement, Zielnutzende, Zielunternehmen, Wettbewerbsanalyse auf Konzeptebene, Feature-MVP-Aufschlüsselung und Storyboard — und in einer Review-Runde vertrat, in der jedes Konzept schriftliches Feedback und eine Verständlichkeitsprüfung erhielt. Interessenbasierte Events und Social Networking war meines. Die Verdichtung von fünf auf drei war eine Scoping-Entscheidung aus einer Brainstorming-Sitzung gegen Projektende, kein bewerteter Vergleich: Personalisierte Pausen und Wohlbefinden überschnitten sich so weit, dass ihre Verantwortlichen sie zu Flows & Breaks zusammenführten, intelligente Benachrichtigungen entfiel im Konsens, und die verbleibenden drei gingen als Chat2Meet, Flows & Breaks und Interest-Based Communities an deskbirds Stakeholder.",
      },
      insight: {
        // Replaced. The earlier softened version was fine but generic; this one
        // is a specific, documented design decision with a paper trail, which
        // is stronger than any comparative claim would have been.
        //
        // The storyboard proposed a matching mechanic — paired profiles, a
        // flame, "It's a Match!" — and a reviewer's note on the board read
        // "Not too much dating up". The shipped concept has no matching. That
        // is the decision, and both ends of it are on the board.
        en: "My first storyboard proposed a matching mechanic: the system compares two profiles for shared interests and announces a match. A reviewer's note on the board read \"not too much dating up\", and the concern held — an interest feature that reads as a dating app is not something people will put a real hobby into at work. The matching mechanic was cut and the concept kept the parts that survived scrutiny: interests on the profile, colleagues' interests visible, and events built from what people already share. Groups, channels, buddy matching, and in-app calling all went with it.",
        de: "Mein erstes Storyboard sah einen Matching-Mechanismus vor: Das System vergleicht zwei Profile auf geteilte Interessen und verkündet einen Treffer. Eine Reviewer-Notiz auf dem Board lautete „not too much dating up“ — und der Einwand trug: Ein Interessen-Feature, das sich wie eine Dating-App liest, ist nichts, wo Menschen bei der Arbeit ein echtes Hobby eintragen. Der Matching-Mechanismus entfiel, und das Konzept behielt, was der Prüfung standhielt: Interessen im Profil, sichtbare Interessen der Kolleg:innen und Events, die aus dem Geteilten entstehen. Gruppen, Kanäle, Buddy-Matching und In-App-Anrufe fielen mit weg.",
      },
      figures: [
        {
          type: "image",
          src: media('p08_social-preferences.png'),
          pendingFile: 'p08_social-preferences.png',
          // UPLOAD → p08_social-preferences.png
          //   from: 18Slide_24.pdf — export at 2x
          alt: {
            en: "Social preferences findings: breaks are when socialisation happens, interaction across seniority is challenging, and people want to connect through shared interests and attend interest-based hybrid events",
            de: "Erkenntnisse zu sozialen Präferenzen: Sozialisierung findet in Pausen statt, Interaktion über Senioritätsstufen hinweg ist schwierig, und Menschen wollen sich über geteilte Interessen verbinden und an interessenbasierten hybriden Events teilnehmen",
          },
          caption: {
            en: "The findings the concept came from — connect through shared interests, attend interest-based events, bridge office and remote",
            de: "Die Erkenntnisse, aus denen das Konzept entstand — über geteilte Interessen verbinden, interessenbasierte Events besuchen, Büro und Remote verbinden",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p08_concept-background-jtbd.png'),
          pendingFile: 'p08_concept-background-jtbd.png',
          // UPLOAD → p08_concept-background-jtbd.png
          //   from: my_concept__background_and_job_to_be_done.jpg
          alt: {
            en: "Concept background board: four participant quotes in sketch-style speech bubbles, clustered into sub-jobs, with disincentive factors and organisational limitations, resolving into a jobs-to-be-done statement",
            de: "Board zum Konzept-Hintergrund: vier Teilnehmenden-Zitate in Sprechblasen im Skizzenstil, geclustert zu Teil-Jobs, mit hemmenden Faktoren und organisatorischen Grenzen, mündend in ein Jobs-to-be-done-Statement",
          },
          caption: {
            en: "The concept's background — participant words first, then the sub-jobs, then the job statement the whole concept answers to",
            de: "Der Hintergrund des Konzepts — zuerst die Worte der Teilnehmenden, dann die Teil-Jobs, dann das Job-Statement, an dem sich das ganze Konzept messen lässt",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p08_concept-storyboard.png'),
          pendingFile: 'p08_concept-storyboard.png',
          // UPLOAD → p08_concept-storyboard.png
          //   from: my_concept_storyboard.jpg
          alt: {
            en: "Sketch-style storyboard for the concept, built from Figma stickers, running from completing a profile with interests, through tag pages and system matching, to groups, matched colleagues, event creation and online events",
            de: "Storyboard des Konzepts im Skizzenstil, aus Figma-Stickern aufgebaut, vom Ausfüllen des Profils mit Interessen über Tag-Seiten und System-Matching bis zu Gruppen, gematchten Kolleg:innen, Event-Erstellung und Online-Events",
          },
          caption: {
            en: "The storyboard as first presented — including the matching mechanic that review would remove",
            de: "Das Storyboard in seiner ersten Fassung — einschließlich des Matching-Mechanismus, den das Review entfernen würde",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p08_concept-features-mvp.png'),
          pendingFile: 'p08_concept-features-mvp.png',
          // UPLOAD → p08_concept-features-mvp.png
          //   from: my_concept_features_MVP.jpg
          //   redact: the reviewer's name appears on the yellow stickies — decide whether 
          //           to keep or blur
          alt: {
            en: "Feature MVP breakdown across user profiles, tag page, tag directory, creation, invitation and connection suggestions, annotated with open questions and reviewer notes",
            de: "Feature-MVP-Aufschlüsselung über Nutzerprofile, Tag-Seite, Tag-Verzeichnis, Erstellung, Einladung und Verbindungsvorschläge, annotiert mit offenen Fragen und Reviewer-Notizen",
          },
          caption: {
            en: "The MVP breakdown, with my open questions in purple and reviewer notes in yellow — including the one asking how any of it would be measured",
            de: "Die MVP-Aufschlüsselung, meine offenen Fragen in Lila und Reviewer-Notizen in Gelb — darunter die Frage, wie sich das alles messen ließe",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p08_flows-and-breaks_merged.png'),
          pendingFile: 'p08_flows-and-breaks_merged.png',
          // UPLOAD → p08_flows-and-breaks_merged.png
          //   from: merged_concept__from_3_and_5_.jpg — teammates' concept; the caption al
          //         ready attributes it
          alt: {
            en: "Flows and Breaks concept board: research grounding, four feature pillars covering flow time, customised breaks, automatic room booking and remote-inclusive activities, and a storyboard following a character through a focus session into a shared break",
            de: "Konzeptboard Flows and Breaks: Forschungsgrundlage, vier Feature-Säulen zu Fokuszeit, individualisierten Pausen, automatischer Raumbuchung und remote-inklusiven Aktivitäten sowie ein Storyboard, das eine Figur von einer Fokussitzung in eine gemeinsame Pause begleitet",
          },
          caption: {
            // Attribution matters here. This is a teammate's concept, published
            // to show what the selected concept was weighed against — not as
            // my own work. On a page whose strength is precise attribution, an
            // unlabelled colleague's board would be the one inconsistency.
            en: "Flows & Breaks, the merged concept by teammates — shown for comparison, not as my work. It answered the same finding mine did: breaks are when socialisation happens",
            de: "Flows & Breaks, das zusammengeführte Konzept von Teamkolleg:innen — zum Vergleich gezeigt, nicht als meine Arbeit. Es beantwortete dieselbe Erkenntnis wie meines: Sozialisierung findet in Pausen statt",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p08_three-concepts.png'),
          pendingFile: 'p08_three-concepts.png',
          // UPLOAD → p08_three-concepts.png
          //   from: COMPOSE: 19Slide_14_Gabi.pdf (Chat2Meet + Flows and Breaks) beside 20.
          //         pdf (Interest based communities), one three-up frame, winner marked
          //   redact: REQUIRED: strip the live Figma URL from the footer of 20.pdf
          alt: {
            en: "The three concepts side by side: Chat2Meet, Flows and Breaks, and Interest-Based Communities, with the selected concept marked",
            de: "Die drei Konzepte nebeneinander: Chat2Meet, Flows and Breaks und Interest-Based Communities, mit Markierung des ausgewählten Konzepts",
          },
          caption: {
            en: "The three that went to deskbird's stakeholders — Interest-Based Communities was selected by vote",
            de: "Die drei, die zu deskbirds Stakeholdern gingen — Interest-Based Communities wurde per Abstimmung ausgewählt",
          },
          span: 2,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "design",
      type: { en: "Story Mapping & User Flows", de: "Story Mapping & User Flows" },
      title: { en: "Slicing the Concept into Three Releases", de: "Das Konzept in drei Releases schneiden" },
      annotation: {
        en: "The selected concept was mapped as a user story map across four epics — customising the profile, managing interests as admin, creating events as admin, and connecting users — sliced into three releases. User flows were drawn for the first release covering three paths: the end user selecting interests, a second user viewing someone's profile, and the admin creating a tagged event with its invitation and notification logic.",
        de: "Das ausgewählte Konzept wurde als User Story Map über vier Epics abgebildet — Profil anpassen, Interessen als Admin verwalten, Events als Admin erstellen und Nutzende verbinden — und in drei Releases geschnitten. Für das erste Release entstanden User Flows für drei Pfade: Endnutzer:in bei der Auswahl von Interessen, zweite:r Nutzer:in beim Ansehen eines Profils und Admin beim Erstellen eines getaggten Events samt Einladungs- und Benachrichtigungslogik.",
      },
      insight: {
        en: "Privacy was scoped into the first release rather than deferred — interest visibility could be switched off at the profile level from the start, with finer per-interest controls held back for release three. That sequencing came straight out of the survey's split reaction to sharing personal details.",
        de: "Datenschutz wurde ins erste Release aufgenommen statt vertagt — die Sichtbarkeit von Interessen ließ sich von Anfang an auf Profilebene abschalten, feinere Einstellungen pro Interesse blieben Release drei vorbehalten. Diese Reihenfolge folgte direkt aus der gemischten Reaktion der Umfrage auf das Teilen persönlicher Details.",
      },
      figures: [
        {
          type: "image",
          src: media('p09_story-map.png'),
          pendingFile: 'p09_story-map.png',
          // UPLOAD → p09_story-map.png
          //   from: Features_MVP.jpg — the MVP SCOPE region with the four epics, three rel
          //         ease bands and grey metric stickies
          //   redact: crop out or blur the stakeholder comment thread (real names and time
          //           stamps)
          alt: {
            en: "User story map: four epics across the top, three release bands below, with grey notes marking the success indicators defined for each area",
            de: "User Story Map: vier Epics in der Kopfzeile, darunter drei Release-Bänder, mit grauen Notizen für die je Bereich definierten Erfolgsindikatoren",
          },
          caption: {
            en: "The story map — grey notes are the success indicators; profile-level privacy sits in release one, per-interest controls in release three",
            de: "Die Story Map — graue Notizen sind die Erfolgsindikatoren; Datenschutz auf Profilebene liegt in Release eins, Einstellungen pro Interesse in Release drei",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p09_user-flow-release-1.png'),
          pendingFile: 'p09_user-flow-release-1.png',
          // UPLOAD → p09_user-flow-release-1.png
          //   from: Features_MVP.jpg — the USER FLOW Release 1 / MVP region
          alt: {
            en: "Release one user flow covering the end user selecting interests, a second user viewing a profile, and the admin creating a tagged event with invitation and notification logic",
            de: "User Flow für Release eins mit Endnutzer:in bei der Interessenauswahl, zweite:r Nutzer:in beim Profilansehen und Admin beim Erstellen eines getaggten Events samt Einladungs- und Benachrichtigungslogik",
          },
          caption: {
            en: "Release one, three paths — the privacy branch is the one the survey dictated",
            de: "Release eins, drei Pfade — der Datenschutz-Zweig ist der, den die Umfrage vorgab",
          },
          span: 2,
          className: "w-full h-auto block",
        },
      ],
    },
    {
      phase: "deliver",
      type: { en: "High-Fidelity Prototype", de: "High-Fidelity-Prototyp" },
      title: { en: "Interest-Based Communities Prototype", de: "Prototyp Interest-Based Communities" },
      annotation: {
        en: "Final prototype: add your own interests, see colleagues' interests, get invited to events, and create events for like-minded people — accessible to both remote and on-site staff, and extended into the Slack side panel so it did not become another browser tab. Adding interests runs as a three-step flow — an onboarding prompt, a picker showing how many colleagues share each interest, and a confirmation that explains what changes as a result. Event creation lets an organiser choose invitees by name or team, by interest, or all employees, and the events list splits into all events and my interests events with RSVP counts on each. Validated in user testing sessions (feature understanding, usability issues), iteratively refined, and delivered to deskbird with documentation and development recommendations.",
        de: "Finaler Prototyp: eigene Interessen hinzufügen, die Interessen von Kolleg:innen sehen, zu Events eingeladen werden und Events für Gleichgesinnte erstellen — zugänglich für Remote- und Vor-Ort-Mitarbeitende und bis in das Slack-Seitenpanel geführt, damit kein weiterer Browser-Tab entsteht. Das Hinzufügen von Interessen läuft als dreistufiger Ablauf — ein Onboarding-Hinweis, ein Auswahldialog mit der Anzahl der Kolleg:innen pro Interesse und eine Bestätigung, die erklärt, was sich dadurch ändert. Bei der Event-Erstellung wählen Organisierende die Eingeladenen nach Name oder Team, nach Interesse oder alle Mitarbeitenden; die Event-Liste teilt sich in alle Events und meine Interessen-Events mit Zusagezahlen je Eintrag. In Usability-Tests validiert (Verständlichkeit des Features, Usability-Probleme), iterativ verfeinert und mit Dokumentation und Entwicklungsempfehlungen an deskbird übergeben.",
      },
      insight: {
        // Amended: the indicators were not invented in a vacuum — they were
        // written to fit the client's own feature-launch process, which had a
        // metric-definition step. Phrased without disclosing the client's
        // internal process or tooling.
        en: "Success indicators were defined up front and written to fit deskbird's own feature-launch process, which included a metric-definition step: number of interests created, profiles with interests, interest-based events, and attendees — making the feature's impact measurable post-launch.",
        de: "Erfolgsindikatoren wurden vorab definiert und auf deskbirds eigenen Feature-Launch-Prozess zugeschnitten, der einen Schritt zur Metrikdefinition vorsah: Anzahl erstellter Interessen, Profile mit Interessen, interessenbasierte Events und Teilnehmende — das macht die Wirkung des Features nach dem Launch messbar.",
      },
      // TODO — two screens still missing: the colleague profile showing another
      // person's interests, and the Slack side panel. Everything else in the
      // annotation above now has an image behind it.
      figures: [
        {
          type: "image",
          src: media('p10_interests-prompt.png'),
          pendingFile: 'p10_interests-prompt.png',
          // UPLOAD → p10_interests-prompt.png
          //   from: Selection_1.png
          alt: {
            en: "Onboarding prompt over the schedule page inviting the user to add their interests, with a first set of interest chips to choose from",
            de: "Onboarding-Hinweis über der Wochenplanung, der zum Hinzufügen eigener Interessen einlädt, mit einer ersten Auswahl an Interessen-Chips",
          },
          caption: {
            en: "Step one — the prompt sits over the schedule people already open, rather than in a settings page they would have to find",
            de: "Schritt eins — der Hinweis liegt über der ohnehin geöffneten Wochenplanung statt in Einstellungen, die man erst finden müsste",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_interests-picker.png'),
          pendingFile: 'p10_interests-picker.png',
          // UPLOAD → p10_interests-picker.png
          //   from: Web_popup.png
          alt: {
            en: "Interests picker showing interest chips each with the number of colleagues who share it, a tip suggesting at least three selections, and three interests selected",
            de: "Interessen-Auswahl mit Chips, die jeweils die Anzahl der Kolleg:innen mit demselben Interesse anzeigen, einem Hinweis, mindestens drei zu wählen, und drei ausgewählten Interessen",
          },
          caption: {
            en: "Step two — the counts answer \"is anyone else into this?\" before you commit to sharing it",
            de: "Schritt zwei — die Zahlen beantworten „interessiert das sonst jemanden?“, bevor man etwas von sich preisgibt",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_interests-confirmation.png'),
          pendingFile: 'p10_interests-confirmation.png',
          // UPLOAD → p10_interests-confirmation.png
          //   from: Selection_2.png
          alt: {
            en: "Confirmation modal reading Interests Updated, explaining that interests now appear on profiles and that invitations to related events will follow, with a pointer to profile settings",
            de: "Bestätigungsdialog „Interests Updated“, der erklärt, dass Interessen nun im Profil erscheinen und Einladungen zu passenden Events folgen, mit Verweis auf die Profileinstellungen",
          },
          caption: {
            en: "Step three — the confirmation states what changes as a result, including where to change it back",
            de: "Schritt drei — die Bestätigung benennt, was sich dadurch ändert, samt Hinweis, wo es sich zurücknehmen lässt",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_add-event_by-interest.png'),
          pendingFile: 'p10_add-event_by-interest.png',
          // UPLOAD → p10_add-event_by-interest.png
          //   from: ADD_EVENT.jpg — crop the frame where Invitees is set to 'By interests'
          //          with Yoga selected
          alt: {
            en: "Add event modal with invitees set to By interests and Yoga selected as the audience, showing eight colleagues share that interest",
            de: "Modal „Add event“ mit Eingeladenen nach Interesse und Yoga als gewähltem Publikum; acht Kolleg:innen teilen dieses Interesse",
          },
          caption: {
            en: "Inviting by interest rather than by team — the mechanism that answers the requirement interaction across seniority and departments was hardest to meet",
            de: "Einladen nach Interesse statt nach Team — der Mechanismus, der die am schwersten erfüllbare Anforderung beantwortet: Interaktion über Senioritätsstufen und Abteilungen hinweg",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_add-event_flow-states.png'),
          pendingFile: 'p10_add-event_flow-states.png',
          // UPLOAD → p10_add-event_flow-states.png
          //   from: ADD_EVENT.jpg — the full board, all eleven frames
          alt: {
            en: "The full add-event flow across eleven frames, from the empty modal through each field, the invitee options, the enabled publish button, and the resulting events list",
            de: "Der vollständige Ablauf „Add event“ über elf Frames, vom leeren Dialog über jedes Feld, die Einladungsoptionen und den aktivierten Publish-Button bis zur resultierenden Event-Liste",
          },
          caption: {
            en: "Every state of the add-event flow, including the disabled publish button until the required fields are filled",
            de: "Jeder Zustand des Add-Event-Ablaufs, einschließlich des deaktivierten Publish-Buttons, solange Pflichtfelder fehlen",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_events-list_rsvp.png'),
          pendingFile: 'p10_events-list_rsvp.png',
          // UPLOAD → p10_events-list_rsvp.png
          //   from: ADD_EVENT.jpg — crop the two right-hand frames showing the success toa
          //         st and the RSVP counts
          alt: {
            en: "Events list after publishing, showing a success toast, tabs for all events and my interests events, the new event tagged with its interest, and yes and maybe counts per event",
            de: "Event-Liste nach dem Veröffentlichen, mit Erfolgsmeldung, Tabs für alle Events und meine Interessen-Events, dem neuen, mit seinem Interesse getaggten Event und Zusage-/Vielleicht-Zahlen je Event",
          },
          caption: {
            en: "The events list — the yes and maybe counts are the attendee indicator from the story map, surfaced in the interface rather than left to analytics",
            de: "Die Event-Liste — die Zusage- und Vielleicht-Zahlen sind der Teilnehmenden-Indikator aus der Story Map, sichtbar in der Oberfläche statt nur in der Analytik",
          },
          span: 2,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_colleague-profile.png'),
          pendingFile: 'p10_colleague-profile.png',
          // UPLOAD → p10_colleague-profile.png
          //   from: STILL NEEDED — a colleague's profile with their interests
          //         visible. "See colleagues' interests" is one of the four
          //         capabilities named in the annotation above and it is the
          //         only one with no screen behind it.
          alt: {
            en: "A colleague's profile in deskbird showing the interests they have chosen to make visible",
            de: "Das Profil einer Kollegin oder eines Kollegen in deskbird mit den Interessen, die sie oder er sichtbar gemacht hat",
          },
          caption: {
            en: "Seeing a colleague's interests — the half of the feature that makes the other half worth filling in",
            de: "Die Interessen einer Kollegin oder eines Kollegen sehen — jene Hälfte des Features, die das Ausfüllen der anderen erst lohnend macht",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_slack-side-panel.png'),
          pendingFile: 'p10_slack-side-panel.png',
          // UPLOAD → p10_slack-side-panel.png
          //   from: STILL NEEDED — the Slack side panel. Stakeholders asked for
          //         no extra browser tabs; this is where that constraint was
          //         answered in the architecture rather than in the copy. It is
          //         the strongest claim on the page with nothing behind it.
          alt: {
            en: "The feature extended into the Slack side panel, so interests and interest-based events are reachable without opening another browser tab",
            de: "Das Feature im Slack-Seitenpanel, sodass Interessen und interessenbasierte Events erreichbar sind, ohne einen weiteren Browser-Tab zu öffnen",
          },
          caption: {
            en: "In the Slack side panel — stakeholders asked for no extra browser tabs, and this is where that was answered",
            de: "Im Slack-Seitenpanel — die Stakeholder wollten keine zusätzlichen Browser-Tabs; hier wurde das beantwortet",
          },
          span: 1,
          className: "w-full h-auto block",
        },
        {
          type: "image",
          src: media('p10_usability-before-after.png'),
          pendingFile: 'p10_usability-before-after.png',
          // UPLOAD → p10_usability-before-after.png
          //   from: STILL NEEDED — one screen as tested, the finding as a short
          //         annotation, the screen as revised. A single pair turns
          //         "iteratively refined" from an assertion into a fact, and
          //         lifts the Usability Testing tag out of stated-not-shown.
          alt: {
            en: "A screen as tested beside the same screen after revision, with the usability finding that prompted the change annotated between them",
            de: "Ein getesteter Screen neben demselben Screen nach der Überarbeitung, dazwischen die Usability-Erkenntnis, die die Änderung ausgelöst hat",
          },
          caption: {
            en: "One usability finding and what it changed",
            de: "Eine Usability-Erkenntnis und was sie verändert hat",
          },
          span: 2,
          className: "w-full h-auto block",
        },
      ],
    },
  ],

  // Role is "UX Researcher (team of 6)". The team ran every phase collectively
  // by working agreement, so `shared` carries most of the work — but the
  // concept selection was a discrete, attributable event: three research-derived
  // concepts were illustrated and presented, deskbird's stakeholders voted, and
  // the winning concept was mine. That is what `owned` records. `notMine` is
  // deliberately absent: nothing was another member's exclusive work, and a
  // "Not Mine" block saying so read as a double negative.
  myContribution: {
    owned: [
      {
        // ILLUSTRATION CLAIM — RESOLVED AND REMOVED.
        // The original file claimed "I also produced the illustrations used to
        // communicate all three concepts in that session." That is not what
        // happened. The storyboards are composed from Figma's sticker library,
        // not drawn; each concept owner built their own. What is true is
        // narrower and is recorded as a separate item below: I used the sticker
        // format first and the team adopted it.
        //
        // Do not reinstate the illustration sentence.
        en: "Interest-Based Communities — the concept deskbird selected — was mine. Five concept directions came out of ideation, one owned by each team member; I owned interest-based events and social networking, and took it through a full concept pack: background verbatims, a jobs-to-be-done statement, target users and companies, a concept-level competitor review, a feature MVP breakdown, and a storyboard. Three of the five went to deskbird's stakeholders, who chose one by vote; mine won and became the delivered high-fidelity prototype.",
        de: "Interest-Based Communities — das von deskbird ausgewählte Konzept — stammt von mir. Aus der Ideation gingen fünf Konzeptrichtungen hervor, je eine pro Teammitglied; interessenbasierte Events und Social Networking lag bei mir, und ich arbeitete es zu einem vollständigen Konzeptpaket aus: Hintergrundzitate, Jobs-to-be-done-Statement, Zielnutzende und Zielunternehmen, Wettbewerbsanalyse auf Konzeptebene, Feature-MVP-Aufschlüsselung und ein Storyboard. Drei der fünf gingen an deskbirds Stakeholder, die per Abstimmung eines auswählten; meines gewann und wurde zum ausgelieferten High-Fidelity-Prototyp.",
      },
      {
        // The accurate version of what the removed illustration claim was
        // reaching for. Setting a format the group then used is a real
        // contribution; it is just not the same as making the artifacts.
        en: "I presented my concept as a sketch-style storyboard built from Figma's sticker library rather than as wireframes. The team adopted the same format for their own concepts, so it became how the group communicated concepts in that round.",
        de: "Mein Konzept habe ich als Storyboard im Skizzenstil präsentiert, aufgebaut aus Figmas Sticker-Bibliothek statt als Wireframes. Das Team übernahm dasselbe Format für die eigenen Konzepte; so wurde es zur Art, wie die Gruppe Konzepte in dieser Runde kommunizierte.",
      },
      {
        // Added. Evidenced by the final presentation source files, where five
        // consecutive methodology slides carry my name. This was a distinct,
        // attributable contribution and the file previously did not record it.
        en: "I authored and presented the methodology section of the final client presentation: the study overview, the survey and contextual inquiry designs, both participant profiles, and the results framing.",
        de: "Den Methodik-Teil der Abschlusspräsentation beim Kunden habe ich erstellt und präsentiert: den Studienüberblick, die Designs von Umfrage und Contextual Inquiry, beide Teilnehmendenprofile sowie die Ergebnisrahmung.",
      },
      {
        // Added. The five contextual design model types were divided across the
        // team; this one was mine. Worth stating plainly: on a project about
        // social interaction, the Collaboration model is the model type closest
        // to the research question.
        //
        // TODO — this is now a named personal deliverable with no artifact
        // behind it. Find the collaboration models built for the six
        // participants and publish one. It follows the form set out in
        // Holtzblatt and Beyer's Contextual Design (Fig. 4.9), which is the
        // reference the team worked from — cite that in text; do not reproduce
        // the textbook figure itself.
        en: "I built the Collaboration model — the contextual design model that maps who a participant works with, in what configuration, when they are together and when they are apart. The five model types were divided across the team and this one was mine; on a study about social interaction it was the model sitting closest to the research question.",
        de: "Das Kollaborationsmodell habe ich erstellt — jenes Contextual-Design-Modell, das abbildet, mit wem eine teilnehmende Person zusammenarbeitet, in welcher Konstellation, wann gemeinsam und wann getrennt. Die fünf Modelltypen wurden im Team aufgeteilt, und dieser war meiner; in einer Studie über soziale Interaktion war es das Modell, das der Forschungsfrage am nächsten lag.",
      },
    ],
    shared: [
      {
        // CORRECTED. The previous wording ended: "each phase was completed
        // together rather than split into individual workstreams." A project
        // note shows the contextual design model set *was* divided by person —
        // one model type each. The rule held for the phases; the model set is
        // the exception, and stating it is cheaper than being caught by it.
        en: "Every research phase was run collectively by the six-person team, by explicit working agreement — competitor research, stakeholder interviews, survey design and analysis, contextual inquiries, affinity diagramming and synthesis, high-fidelity prototyping, usability testing, and the final client presentation. The team's rule was that each phase was completed together rather than split into individual workstreams. The one exception was the contextual design model set, where each of the five model types was owned by a different team member and built across all six participants.",
        de: "Jede Forschungsphase wurde nach ausdrücklicher Absprache gemeinsam vom sechsköpfigen Team durchgeführt — Wettbewerbsanalyse, Stakeholder-Interviews, Konzeption und Auswertung der Umfrage, Contextual Inquiries, Affinity Diagramming und Synthese, High-Fidelity-Prototyping, Usability-Testing sowie die Abschlusspräsentation beim Kunden. Die Teamregel lautete, jede Phase gemeinsam abzuschließen statt sie in individuelle Arbeitspakete aufzuteilen. Die einzige Ausnahme war der Satz der Contextual-Design-Modelle: Jeder der fünf Modelltypen lag bei einer anderen Person im Team und wurde über alle sechs Teilnehmenden hinweg erstellt.",
      },
    ],
  },

  // The two candidate "decisions" drafted earlier (concept eliminations,
  // scoping to remote+office) were findings from during the research —
  // already stated in `results` above — not post-handover consequences.
  // Removed rather than left as duplication. `adoption` stays "unknown"
  // deliberately: deskbird stated an intention at handover, which is not
  // the same as confirmed delivery, and nothing since has verified it.
  outcome: {
    body: {
      en: "At the final presentation, deskbird's stakeholders said they liked the concept and intended to build it in upcoming sprints. That is a stated intention recorded at handover — not confirmed delivery. The research team had no visibility into deskbird's backlog after the project ended, and I have not since verified whether the feature shipped. It is listed here as unconfirmed rather than claimed as adoption.",
      de: "In der Abschlusspräsentation erklärten die deskbird-Stakeholder, dass ihnen das Konzept gefalle und sie es in kommenden Sprints umsetzen wollten. Das ist eine bei der Übergabe geäußerte Absicht — keine bestätigte Umsetzung. Das Forschungsteam hatte nach Projektende keinen Einblick in deskbirds Backlog, und ich habe seither nicht verifiziert, ob das Feature ausgeliefert wurde. Es steht hier als unbestätigt und wird nicht als Adoption behauptet.",
    },
    adoption: "unknown",
  },

  // Published client artifacts are shown with commercially sensitive content
  // removed. Stated once here so the reader knows the gaps in the boards are
  // deliberate rather than evidence of thin work.
  assetDisclosure: {
    en: "Client artifacts are reproduced with commercially sensitive content and participant-identifying detail redacted.",
    de: "Kundenartefakte sind mit geschwärzten geschäftlich sensiblen Inhalten und teilnehmenden-identifizierenden Details wiedergegeben.",
  },

  tagEvidence: [
    { tag: "User-Centered Design", evidence: "methodology: \"We followed the full UCD process in an industry setting.\"; milestones records the six-milestone schedule from requirements kick-off to final prototype presentation", status: "evidenced" },
    { tag: "Mixed-Methods Research", evidence: "methodology: a 57-respondent online survey quantifying work conditions and privacy preferences, run alongside six 90-minute contextual inquiries and 30-minute semi-structured follow-ups — a quantitative and a qualitative strand feeding one synthesis, with the survey's open-ended answers setting the inquiry focus; pilots records that both instruments were piloted first", status: "evidenced" },
    { tag: "Stakeholder Interviews", evidence: "process:Aligning on Scope with deskbird — marketing, product management, product design, and customer support; requirementSources records the four functions each requirement was traced to", status: "evidenced" },
    { tag: "Contextual Inquiry", evidence: "process:Observing the Hybrid Workday in Context (N=6); process:Six Workdays into One Picture — interpretation sessions and the five-model set recorded in contextualDesignModels, where the collaboration model is marked as mine; participants split half home and half office, shown in the paired setup figures", status: "evidenced" },
    { tag: "Survey Design", evidence: "process:Quantifying Hybrid Social Life (N=57) — a ten-section instrument opening with consent, piloted think-aloud, screened on hybrid work, convenience and snowball sampling; surveySections records the structure and limitations records the resulting sample bias", status: "evidenced" },
    { tag: "Competitive Analysis", evidence: "methodology: two reviews — the engagement-platform landscape and deskbird's direct desk-booking competitors — plus heuristic evaluation and user-flow analysis of the existing app; competitiveReview names both sets; process:Learning the Product and the Landscape", status: "evidenced" },
    { tag: "Affinity Diagramming", evidence: "process:Six Workdays into One Picture — the five-pass build from participant-tagged notes to blue labels to pink groups to actionable ideas, producing the six themes; the wall figures show the numbering and participant tags", status: "evidenced" },
    { tag: "Requirements Engineering", evidence: "process:From Findings to Requirement Categories — functional, environmental, user, and data requirements, each traced to its source, revised across two passes after critique, with unanswered questions scoped into three follow-up studies; the v1/v2 figure shows both passes", status: "evidenced" },
    // "scored" → "compared": no scoring artifact has surfaced, and the process
    // annotation says compared. Keep the two consistent.
    { tag: "Concept Development", evidence: "process:Three Concepts, One Winner — Chat2Meet, Flows & Breaks, and Interest-Based Communities developed and compared against the requirements; myContribution.owned records the selected concept as mine", status: "evidenced" },
    { tag: "Interaction Design", evidence: "process:Slicing the Concept into Three Releases — story map across four epics and user flows for the end user, second user, and admin paths; process:Interest-Based Communities Prototype", status: "evidenced" },
    { tag: "High-Fidelity Prototyping", evidence: "solution: \"delivered as a high-fidelity prototype with development recommendations\"; process:Interest-Based Communities Prototype; methods: \"Concept Development & Prototyping\"", status: "evidenced" },
    // Downgraded: the claim is true and the limitation states its boundary, but
    // no testing artifact exists on the page — no participant count, no tasks,
    // no findings, no before/after. This is the weakest tag on the page.
    { tag: "Usability Testing", evidence: "process:Interest-Based Communities Prototype — user testing sessions evaluating feature understanding and usability, iterated into the prototype; results and limitations record what the testing did and did not establish. No testing artifact is currently published.", status: "stated-not-shown" },
    { tag: "Figma", evidence: "techStack: [\"Figma\", \"FigJam\", \"Online Survey Tools\"] — rendered as Tech Stack chips under Methodology", status: "evidenced" },
    { tag: "B2B SaaS", evidence: "challenge: \"deskbird — a B2B SaaS platform for desk booking and hybrid week planning\"", status: "evidenced" },
  ],
};

export default projectData;

// ─────────────────────────────────────────────────────────────────────────────
// RENDERER NOTE — one change needed in the figure component
//
// Figures now carry `src: null` until their file is uploaded. Guard for it so a
// pending figure shows what is missing instead of a broken image:
//
//   {figure.src ? (
//     <img src={figure.src} alt={figure.alt[lang]} className={figure.className} />
//   ) : (
//     <div
//       role="img"
//       aria-label={figure.alt[lang]}
//       className="flex min-h-[12rem] items-center justify-center rounded-lg
//                  border border-dashed border-stone-300 bg-stone-50 p-6
//                  text-center text-xs uppercase tracking-wide text-stone-400"
//     >
//       Image pending — {figure.pendingFile}
//     </div>
//   )}
//
// In development you may also want the console list of what is still missing:
//
//   if (import.meta.env.DEV) {
//     const missing = projectData.process
//       .flatMap((s) => s.figures ?? [])
//       .concat(Object.values(projectData.figures).flat())
//       .filter((f) => !f.src)
//       .map((f) => f.pendingFile);
//     if (missing.length) console.warn('[case study] media pending:', missing);
//   }
// ─────────────────────────────────────────────────────────────────────────────