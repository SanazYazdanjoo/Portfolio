// Content is sourced from UCD4UX_FINAL PRESENTATION.pdf, the "Requirements &
// User Problems" deck, the UCD4UX research report, and the project's FigJam
// boards (interpretation sessions, affinity walls, requirements matrix v1/v2,
// user story map, user flows, UI components) — deskbird x Bauhaus-Universität
// Weimar.
// Card-level fields (id/status/title/tags/thumbnails/card*) live in
// ./card.js — eagerly aggregated site-wide — and are spread here so the
// detail page sees one object. This file carries only the prose and media
// that load with the route's own chunk.
import card from './card';
import thumbnailImg from './Project-2.png';
import interestsModal from './media/interests-modal.png';
import ucdProcess from './media/ucd-process.jpg';

export const projectData = {
  ...card,
  timeline: "10/2023 – 03/2024",
  heroImage: thumbnailImg,
  heroIsGenerated: true, // the hero is a generated illustration — renders the credit

  partners: {
    client: "deskbird",
    institution: "Bauhaus-Universität Weimar",
  },

  // Six-person student research team. Named because they did the work with me.
  // Ask them before publishing full names if you haven't already.
  team: {
    size: 6,
  },

  methods: [
    { en: "Heuristic Evaluation (admin & end user)",        de: "Heuristische Evaluation (Admin & Endnutzer:in)" },
    { en: "Competitive & State-of-the-Art Review",          de: "Wettbewerbs- und State-of-the-Art-Analyse" },
    { en: "Stakeholder Interviews",                         de: "Stakeholder-Interviews" },
    { en: "Online Survey",                                  de: "Online-Umfrage" },
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

  // The five model types built per participant during interpretation sessions.
  // Named because "we ran contextual inquiries" and "we built the model set"
  // are different claims, and only the second one is checkable.
  contextualDesignModels: [
    { en: "Sequence Model",     de: "Sequenzmodell" },
    { en: "Relationship Model", de: "Beziehungsmodell" },
    { en: "Collaboration Model", de: "Kollaborationsmodell" },
    { en: "Identity Model",     de: "Identitätsmodell" },
    { en: "Physical Model",     de: "Physisches Modell" },
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
  ],

  figures: {
    solution: [
      {
        type: "image",
        src: interestsModal,
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
    ],
    methodology: [
      {
        type: "image",
        src: ucdProcess,
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
    en: "We followed the full UCD process in an industry setting. A state-of-the-art review of the hybrid-work tool landscape (Microsoft Viva, Workvivo, Donut for Slack, Happeo, and ~25 others) and a heuristic evaluation of the existing deskbird app — walked through as both admin and end user, with user-flow analysis — framed the scope. A literature review of social features in workplace systems, working from Lyons and Lessard's distinction between key and supportive social features, gave the concept work a vocabulary. Stakeholder interviews across marketing, product management, product design, and customer support defined brand identity, consumer aspirations, and the social-feature scope. An online survey (57 respondents, mainly aged 25–34, IT industry, hybrid workers recruited via convenience and snowball sampling) quantified work conditions, social interaction states, communication channels, and privacy preferences; its open-ended responses set the focus for what came next. Six 90-minute remote contextual inquiries — observing product managers, engineers, designers, and analysts in their real hybrid workday — were each paired with a 30-minute semi-structured follow-up interview, then worked through in team interpretation sessions.",
    de: "Wir durchliefen den vollständigen UCD-Prozess im Industrie-Setting. Eine State-of-the-Art-Analyse der Hybrid-Work-Tool-Landschaft (Microsoft Viva, Workvivo, Donut for Slack, Happeo und ~25 weitere) sowie eine heuristische Evaluation der bestehenden deskbird-App — durchlaufen sowohl als Admin als auch als Endnutzer:in, mit User-Flow-Analyse — steckten den Rahmen ab. Eine Literaturrecherche zu Social Features in Workplace-Systemen, ausgehend von Lyons und Lessards Unterscheidung zwischen Key und Supportive Social Features, lieferte das Vokabular für die Konzeptarbeit. Stakeholder-Interviews in Marketing, Produktmanagement, Produktdesign und Customer Support definierten Markenidentität, Nutzerwünsche und den Umfang des Social Features. Eine Online-Umfrage (57 Teilnehmende, überwiegend 25–34 Jahre, IT-Branche, hybride Mitarbeitende, rekrutiert per Convenience- und Schneeball-Sampling) quantifizierte Arbeitsbedingungen, den Stand sozialer Interaktion, Kommunikationskanäle und Datenschutzpräferenzen; ihre offenen Antworten bestimmten den Fokus der nächsten Schritte. Sechs 90-minütige Remote-Contextual-Inquiries — Beobachtung von Product Managern, Entwickler:innen, Designer:innen und Analyst:innen im realen hybriden Arbeitsalltag — wurden jeweils mit einem 30-minütigen semi-strukturierten Folgeinterview gepaart und anschließend in gemeinsamen Interpretationssitzungen aufgearbeitet.",
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
        en: "Before talking to anyone we walked the existing deskbird app end to end, once as an admin and once as an end user, mapping its user flows and its existing social surface. In parallel we reviewed the hybrid-work tool landscape — Microsoft Viva Engage, Workvivo, Happeo, Haiilo, Staffbase, Donut for Slack, Sococo, Gather Town and others — feature by feature.",
        de: "Bevor wir mit irgendjemandem sprachen, gingen wir die bestehende deskbird-App vollständig durch — einmal als Admin, einmal als Endnutzer:in —, kartierten ihre User Flows und ihre vorhandene soziale Oberfläche. Parallel analysierten wir die Hybrid-Work-Tool-Landschaft — Microsoft Viva Engage, Workvivo, Happeo, Haiilo, Staffbase, Donut for Slack, Sococo, Gather Town und weitere — Feature für Feature.",
      },
      insight: {
        en: "The competitors mostly added a social layer on top of work: a feed, a channel, a chat. deskbird's opening was different — it already knew who was in the office on which day, which is a starting point none of the others had.",
        de: "Die Wettbewerber legten Soziales überwiegend als Schicht über die Arbeit: ein Feed, ein Kanal, ein Chat. deskbirds Ausgangslage war eine andere — die App wusste bereits, wer an welchem Tag im Büro ist. Diesen Ansatzpunkt hatte kein anderes Tool.",
      },
      imagePath: null,
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
      imagePath: null,
    },
    {
      phase: "discover",
      type: { en: "Online Survey", de: "Online-Umfrage" },
      title: { en: "Quantifying Hybrid Social Life (N=57)", de: "Hybrides Sozialleben quantifizieren (N=57)" },
      annotation: {
        en: "Multiple-choice, rating, and open-ended questions exploring work conditions, current state of social interactions, communication channels, and privacy preferences. Respondents were mainly juniors aged 25–34 in the IT industry, across various company sizes. Participation was screened on currently or recently working in a hybrid setting.",
        de: "Multiple-Choice-, Bewertungs- und offene Fragen zu Arbeitsbedingungen, dem aktuellen Stand sozialer Interaktion, Kommunikationskanälen und Datenschutzpräferenzen. Die Teilnehmenden waren überwiegend Berufseinsteiger:innen im Alter von 25–34 in der IT-Branche, über verschiedene Unternehmensgrößen hinweg. Voraussetzung für die Teilnahme war aktuelle oder kürzliche Arbeit im hybriden Setting.",
      },
      insight: {
        en: "Nearly three-quarters agreed that knowing personal details about a colleague makes them relate more — the single strongest signal pointing toward interest-based connection. Respondents were open about gender, relationship status, and birthday, but split on age, hobbies, and personal milestones, which set a boundary for what any profile could ask for.",
        de: "Fast drei Viertel stimmten zu, dass persönliche Details über Kolleg:innen sie verbundener fühlen lassen — das stärkste Einzelsignal für eine interessenbasierte Verbindung. Angaben zu Geschlecht, Beziehungsstatus und Geburtstag teilten die Befragten offen, bei Alter, Hobbys und persönlichen Meilensteinen waren die Reaktionen gemischt. Das setzte die Grenze dafür, was ein Profil überhaupt abfragen durfte.",
      },
      imagePath: null,
    },
    {
      phase: "discover",
      type: { en: "Remote Contextual Inquiry", de: "Remote Contextual Inquiry" },
      title: { en: "Observing the Hybrid Workday in Context (N=6)", de: "Den hybriden Arbeitstag im Kontext beobachten (N=6)" },
      annotation: {
        en: "Six 90-minute remote observations of hybrid workers in their real workplace — product manager, software engineer, customer success manager, product designer, UX working student, business analyst — followed by 30-minute semi-structured interviews to clarify observations and capture desires for improvement. The open-ended survey answers set what we went looking for: how people decide between home and office, how they feel about office events, how they connect with colleagues.",
        de: "Sechs 90-minütige Remote-Beobachtungen hybrider Mitarbeitender an ihrem realen Arbeitsplatz — Product Manager, Software Engineer, Customer Success Manager, Product Designer, UX-Werkstudentin, Business Analyst — gefolgt von 30-minütigen semi-strukturierten Interviews zur Klärung der Beobachtungen und zur Erfassung von Verbesserungswünschen. Die offenen Umfrageantworten gaben vor, wonach wir suchten: wie Menschen zwischen Homeoffice und Büro entscheiden, wie sie zu Büro-Events stehen, wie sie Kontakt zu Kolleg:innen halten.",
      },
      insight: {
        en: "Breaks are when socialisation happens — and breaks at the office differ fundamentally from breaks at home. Participants wanted variety and meaningful social breaks — and to be left undisturbed when they needed focus.",
        de: "Sozialisierung findet in Pausen statt — und Pausen im Büro unterscheiden sich grundlegend von Pausen zu Hause. Teilnehmende wollten Abwechslung und bedeutsame soziale Pausen — und ungestört bleiben, wenn sie Fokus brauchten.",
      },
      imagePath: null,
    },
    {
      phase: "define",
      type: { en: "Interpretation Sessions & Affinity Diagram", de: "Interpretationssitzungen & Affinity-Diagramm" },
      title: { en: "Six Workdays into One Picture", de: "Sechs Arbeitstage zu einem Bild" },
      annotation: {
        en: "Each inquiry was worked through in a team interpretation session. Observations became numbered affinity notes tagged to the participant they came from, and each participant's workday was modelled from several angles — sequence, relationship, collaboration, identity, and physical setup. The wall was then built in five passes: gather every note, group by observed pattern, write blue labels, consolidate blue into pink, and read actionable ideas off the top.",
        de: "Jede Inquiry wurde in einer gemeinsamen Interpretationssitzung aufgearbeitet. Beobachtungen wurden zu nummerierten Affinity Notes, die der jeweiligen teilnehmenden Person zugeordnet blieben; der Arbeitstag jeder Person wurde aus mehreren Blickwinkeln modelliert — Sequenz, Beziehung, Kollaboration, Identität und physischer Aufbau. Die Wand entstand dann in fünf Durchgängen: alle Notizen sammeln, nach beobachteten Mustern gruppieren, blaue Labels schreiben, Blau zu Pink verdichten und die umsetzbaren Ideen von oben ablesen.",
      },
      insight: {
        en: "Six themes came out of the wall: interruption and focus, work breaks, socialising at the workplace, what drives the choice between home and office, communication habits, and bonding at work. Because every note stayed tagged to its participant, any requirement could be walked back to the observation behind it.",
        de: "Aus der Wand ergaben sich sechs Themen: Unterbrechung und Fokus, Arbeitspausen, Sozialisierung am Arbeitsplatz, Faktoren der Entscheidung zwischen Homeoffice und Büro, Kommunikationsgewohnheiten und Bindung im Team. Da jede Notiz ihrer Quelle zugeordnet blieb, ließ sich jede Anforderung auf die dahinterliegende Beobachtung zurückführen.",
      },
      imagePath: null,
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
      imagePath: null,
    },
    {
      phase: "design",
      type: { en: "Concept Development", de: "Konzeptentwicklung" },
      title: { en: "Three Concepts, One Winner", de: "Drei Konzepte, ein Gewinner" },
      annotation: {
        en: "We developed and compared three concepts against the requirements: Chat2Meet (template-based event messaging), Flows & Breaks (focus/break status synced across tools), and Interest-Based Communities.",
        de: "Wir entwickelten und verglichen drei Konzepte gegen die Anforderungen: Chat2Meet (vorlagenbasiertes Event-Messaging), Flows & Breaks (Fokus-/Pausenstatus, toolübergreifend synchronisiert) und Interest-Based Communities.",
      },
      insight: {
        en: "Interest-Based Communities satisfied the requirements most completely — cross-seniority interaction, access for remote and on-site staff — and directly operationalised the survey's strongest finding on personal connection. deskbird's stakeholders selected it.",
        de: "Interest-Based Communities erfüllte die Anforderungen am vollständigsten — Interaktion über Senioritätsstufen hinweg, Zugang für Remote- und Vor-Ort-Mitarbeitende — und setzte das stärkste Umfrageergebnis zu persönlicher Verbindung direkt um. deskbirds Stakeholder wählten es aus.",
      },
      imagePath: null,
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
      imagePath: null,
    },
    {
      phase: "deliver",
      type: { en: "High-Fidelity Prototype", de: "High-Fidelity-Prototyp" },
      title: { en: "Interest-Based Communities Prototype", de: "Prototyp Interest-Based Communities" },
      annotation: {
        en: "Final prototype: add your own interests, see colleagues' interests, get invited to events, and create events for like-minded people — accessible to both remote and on-site staff, and extended into the Slack side panel so it did not become another browser tab. Validated in user testing sessions (feature understanding, usability issues), iteratively refined, and delivered to deskbird with documentation and development recommendations.",
        de: "Finaler Prototyp: eigene Interessen hinzufügen, die Interessen von Kolleg:innen sehen, zu Events eingeladen werden und Events für Gleichgesinnte erstellen — zugänglich für Remote- und Vor-Ort-Mitarbeitende und bis in das Slack-Seitenpanel geführt, damit kein weiterer Browser-Tab entsteht. In Usability-Tests validiert (Verständlichkeit des Features, Usability-Probleme), iterativ verfeinert und mit Dokumentation und Entwicklungsempfehlungen an deskbird übergeben.",
      },
      insight: {
        en: "Success indicators were defined up front: number of interests created, profiles with interests, interest-based events, and attendees — making the feature's impact measurable post-launch.",
        de: "Erfolgsindikatoren wurden vorab definiert: Anzahl erstellter Interessen, Profile mit Interessen, interessenbasierte Events und Teilnehmende — das macht die Wirkung des Features nach dem Launch messbar.",
      },
      imagePath: null,
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
        en: "Interest-Based Communities — the concept deskbird selected — was mine. Three research-derived concepts were developed, illustrated, and presented to deskbird's stakeholders, who chose one by vote; mine won and became the delivered high-fidelity prototype. I also produced the illustrations used to communicate all three concepts in that session.",
        de: "Interest-Based Communities — das von deskbird ausgewählte Konzept — stammt von mir. Drei aus der Forschung abgeleitete Konzepte wurden entwickelt, illustriert und den deskbird-Stakeholdern vorgestellt, die per Abstimmung eines auswählten; meines gewann und wurde zum ausgelieferten High-Fidelity-Prototyp. Die Illustrationen zur Vermittlung aller drei Konzepte in dieser Session stammen ebenfalls von mir.",
      },
    ],
    shared: [
      {
        en: "Every research phase was run collectively by the six-person team, by explicit working agreement — competitor research, stakeholder interviews, survey design and analysis, contextual inquiries, affinity diagramming and synthesis, high-fidelity prototyping, usability testing, and the final client presentation. The team's rule was that each phase was completed together rather than split into individual workstreams.",
        de: "Jede Forschungsphase wurde nach ausdrücklicher Absprache gemeinsam vom sechsköpfigen Team durchgeführt — Wettbewerbsanalyse, Stakeholder-Interviews, Konzeption und Auswertung der Umfrage, Contextual Inquiries, Affinity Diagramming und Synthese, High-Fidelity-Prototyping, Usability-Testing sowie die Abschlusspräsentation beim Kunden. Die Teamregel lautete, jede Phase gemeinsam abzuschließen statt sie in individuelle Arbeitspakete aufzuteilen.",
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

  tagEvidence: [
    { tag: "User-Centered Design", evidence: "methodology: \"We followed the full UCD process in an industry setting.\"", status: "evidenced" },
    { tag: "Mixed-Methods Research", evidence: "methodology: a 57-respondent online survey quantifying work conditions and privacy preferences, run alongside six 90-minute contextual inquiries and 30-minute semi-structured follow-ups — a quantitative and a qualitative strand feeding one synthesis, with the survey's open-ended answers setting the inquiry focus", status: "evidenced" },
    { tag: "Stakeholder Interviews", evidence: "process:Aligning on Scope with deskbird — marketing, product management, product design, and customer support; requirementSources records the four functions each requirement was traced to", status: "evidenced" },
    { tag: "Contextual Inquiry", evidence: "process:Observing the Hybrid Workday in Context (N=6); process:Six Workdays into One Picture — interpretation sessions and the per-participant model set recorded in contextualDesignModels", status: "evidenced" },
    { tag: "Survey Design", evidence: "process:Quantifying Hybrid Social Life (N=57) — multiple-choice, rating, and open-ended items, screened on hybrid work, convenience and snowball sampling; limitations records the resulting sample bias", status: "evidenced" },
    { tag: "Competitive Analysis", evidence: "methodology: state-of-the-art review of the hybrid-work tool landscape (Microsoft Viva, Workvivo, Donut for Slack, Happeo, and ~25 others) plus heuristic evaluation and user-flow analysis of the existing deskbird app; process:Learning the Product and the Landscape; myContribution.shared: \"competitor research\"", status: "evidenced" },
    { tag: "Affinity Diagramming", evidence: "process:Six Workdays into One Picture — the five-pass build from participant-tagged notes to blue labels to pink groups to actionable ideas, producing the six themes; myContribution.shared: \"affinity diagramming and synthesis\"", status: "evidenced" },
    { tag: "Requirements Engineering", evidence: "process:From Findings to Requirement Categories — functional, environmental, user, and data requirements, each traced to its source, revised across two passes after critique, with unanswered questions scoped into three follow-up studies", status: "evidenced" },
    { tag: "Concept Development", evidence: "process:Three Concepts, One Winner — Chat2Meet, Flows & Breaks, and Interest-Based Communities developed and scored against the requirements; myContribution.owned records the selected concept as mine", status: "evidenced" },
    { tag: "Interaction Design", evidence: "process:Slicing the Concept into Three Releases — story map across four epics and user flows for the end user, second user, and admin paths; process:Interest-Based Communities Prototype", status: "evidenced" },
    { tag: "High-Fidelity Prototyping", evidence: "solution: \"delivered as a high-fidelity prototype with development recommendations\"; process:Interest-Based Communities Prototype; methods: \"Concept Development & Prototyping\"", status: "evidenced" },
    { tag: "Usability Testing", evidence: "process:Interest-Based Communities Prototype — user testing sessions evaluating feature understanding and usability, iterated into the prototype; results: \"validated in user testing sessions that returned positive feedback on usability and feature understanding\"; limitations records what the testing did not establish", status: "evidenced" },
    { tag: "Figma", evidence: "techStack: [\"Figma\", \"FigJam\", \"Online Survey Tools\"] — rendered as Tech Stack chips under Methodology", status: "evidenced" },
    { tag: "B2B SaaS", evidence: "challenge: \"deskbird — a B2B SaaS platform for desk booking and hybrid week planning\"", status: "evidenced" },
  ],
};

export default projectData;