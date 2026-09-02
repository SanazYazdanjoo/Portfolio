// Content is sourced from UCD4UX_FINAL PRESENTATION.pdf and the UCD4UX
// research report (deskbird x Bauhaus-Universität Weimar).
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

  methods: [
    { en: "Stakeholder Interviews",                       de: "Stakeholder-Interviews" },
    { en: "Online Survey",                                 de: "Online-Umfrage" },
    { en: "Remote Contextual Inquiry (90 min)",           de: "Remote Contextual Inquiry (90 Min.)" },
    { en: "Semi-structured Follow-up Interviews (30 min)", de: "Semi-strukturierte Folgeinterviews (30 Min.)" },
    { en: "Requirements Engineering",                      de: "Anforderungsanalyse" },
    { en: "Concept Development & Prototyping",             de: "Konzeptentwicklung & Prototyping" },
    { en: "Usability Testing & Iteration",                 de: "Usability-Testing & Iteration" },
  ],

  metrics: [
    { value: "57", label: { en: "survey respondents", de: "Umfrageteilnehmende" } },
    { value: "6", label: { en: "contextual inquiries + follow-ups", de: "Contextual Inquiries + Folgeinterviews" } },
    { value: "~75%", label: { en: "say they relate more to colleagues whose personal details they know", de: "fühlen sich Kolleg:innen näher, deren persönliche Details sie kennen" } },
    { value: "3 → 1", label: { en: "concepts refined into final prototype", de: "Konzepte zum finalen Prototyp verdichtet" } },
  ],

  techStack: ["Figma", "FigJam", "Online Survey Tools"],

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
    en: "We followed the full UCD process in an industry setting. A state-of-the-art review of the hybrid-work tool landscape (Microsoft Viva, Workvivo, Donut for Slack, Happeo, and ~25 others) and a heuristic evaluation with user-flow analysis of the existing deskbird app framed the scope. Stakeholder interviews with deskbird defined brand identity, consumer aspirations, and the social-feature scope. An online survey (57 respondents, mainly aged 25–34, IT industry, hybrid workers recruited via convenience and snowball sampling) quantified work conditions, social interaction states, communication channels, and privacy preferences. Six 90-minute remote contextual inquiries — observing product managers, engineers, designers, and analysts in their real hybrid workday — were each paired with a 30-minute semi-structured follow-up interview.",
    de: "Wir durchliefen den vollständigen UCD-Prozess im Industrie-Setting. Eine State-of-the-Art-Analyse der Hybrid-Work-Tool-Landschaft (Microsoft Viva, Workvivo, Donut for Slack, Happeo und ~25 weitere) sowie eine heuristische Evaluation mit User-Flow-Analyse der bestehenden deskbird-App steckten den Rahmen ab. Stakeholder-Interviews mit deskbird definierten Markenidentität, Nutzerwünsche und den Umfang des Social Features. Eine Online-Umfrage (57 Teilnehmende, überwiegend 25–34 Jahre, IT-Branche, hybride Mitarbeitende, rekrutiert per Convenience- und Schneeball-Sampling) quantifizierte Arbeitsbedingungen, den Stand sozialer Interaktion, Kommunikationskanäle und Datenschutzpräferenzen. Sechs 90-minütige Remote-Contextual-Inquiries — Beobachtung von Product Managern, Entwickler:innen, Designer:innen und Analyst:innen im realen hybriden Arbeitsalltag — wurden jeweils mit einem 30-minütigen semi-strukturierten Folgeinterview gepaart.",
  },

  results: {
    en: "Socialisation happens during breaks, and office breaks differ fundamentally from home-office breaks; the office is preferred for real interactions and faster communication while home office wins on convenience and fewer distractions; and nearly three-quarters of survey respondents agreed that knowing personal details about a colleague makes them relate more. Interaction across seniority levels and departments emerged as a persistent barrier. These findings shaped three competing concepts (Chat2Meet, Flows & Breaks, Interest-Based Communities); Interest-Based Communities was selected, refined into the final prototype, and validated in user testing sessions that returned positive feedback on usability and feature understanding.",
    de: "Sozialisierung findet in Pausen statt, und Büropausen unterscheiden sich grundlegend von Homeoffice-Pausen; das Büro wird für echte Interaktionen und schnellere Kommunikation bevorzugt, während das Homeoffice bei Bequemlichkeit und weniger Ablenkung punktet; und fast drei Viertel der Umfrageteilnehmenden stimmten zu, dass persönliche Details über Kolleg:innen sie verbundener fühlen lassen. Interaktion über Senioritäts- und Abteilungsgrenzen hinweg erwies sich als hartnäckige Hürde. Diese Erkenntnisse formten drei konkurrierende Konzepte (Chat2Meet, Flows & Breaks, Interest-Based Communities); Interest-Based Communities wurde ausgewählt, zum finalen Prototyp verfeinert und in Usability-Tests validiert, die positives Feedback zu Bedienbarkeit und Verständlichkeit des Features ergaben.",
  },

  // Process gallery
  process: [
    {
      phase: "discover",
      type: { en: "Stakeholder Interviews", de: "Stakeholder-Interviews" },
      title: { en: "Aligning on Scope with deskbird", de: "Scope-Abstimmung mit deskbird" },
      annotation: {
        en: "Interviews with deskbird stakeholders surfaced three insight clusters: brand identity (minimalist, usability-driven UX), consumer aspirations (fewer clicks, no extra browser tabs), and the social-feature mandate — transparent, non-intrusive, attracting people back to the office.",
        de: "Interviews mit deskbird-Stakeholdern ergaben drei Erkenntnis-Cluster: Markenidentität (minimalistische, usability-getriebene UX), Nutzerwünsche (weniger Klicks, keine zusätzlichen Browser-Tabs) und der Auftrag für das Social Feature — transparent, unaufdringlich, Menschen zurück ins Büro locken.",
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
        en: "Multiple-choice, rating, and open-ended questions exploring work conditions, current state of social interactions, communication channels, and privacy preferences. Respondents were mainly juniors aged 25–34 in the IT industry, across various company sizes.",
        de: "Multiple-Choice-, Bewertungs- und offene Fragen zu Arbeitsbedingungen, dem aktuellen Stand sozialer Interaktion, Kommunikationskanälen und Datenschutzpräferenzen. Die Teilnehmenden waren überwiegend Berufseinsteiger:innen im Alter von 25–34 in der IT-Branche, über verschiedene Unternehmensgrößen hinweg.",
      },
      insight: {
        en: "Nearly three-quarters agreed that knowing personal details about a colleague makes them relate more — the single strongest signal pointing toward interest-based connection.",
        de: "Fast drei Viertel stimmten zu, dass persönliche Details über Kolleg:innen sie verbundener fühlen lassen — das stärkste Einzelsignal für eine interessenbasierte Verbindung.",
      },
      imagePath: null,
    },
    {
      phase: "discover",
      type: { en: "Remote Contextual Inquiry", de: "Remote Contextual Inquiry" },
      title: { en: "Observing the Hybrid Workday in Context (N=6)", de: "Den hybriden Arbeitstag im Kontext beobachten (N=6)" },
      annotation: {
        en: "Six 90-minute remote observations of hybrid workers in their real workplace — product manager, software engineer, customer success manager, product designer, UX working student, business analyst — followed by 30-minute semi-structured interviews to clarify observations and capture desires for improvement.",
        de: "Sechs 90-minütige Remote-Beobachtungen hybrider Mitarbeitender an ihrem realen Arbeitsplatz — Product Manager, Software Engineer, Customer Success Manager, Product Designer, UX-Werkstudentin, Business Analyst — gefolgt von 30-minütigen semi-strukturierten Interviews zur Klärung der Beobachtungen und zur Erfassung von Verbesserungswünschen.",
      },
      insight: {
        en: "Breaks are when socialisation happens — and breaks at the office differ fundamentally from breaks at home. Participants wanted variety and meaningful social breaks — and to be left undisturbed when they needed focus.",
        de: "Sozialisierung findet in Pausen statt — und Pausen im Büro unterscheiden sich grundlegend von Pausen zu Hause. Teilnehmende wollten Abwechslung und bedeutsame soziale Pausen — und ungestört bleiben, wenn sie Fokus brauchten.",
      },
      imagePath: null,
    },
    {
      phase: "define",
      type: { en: "Requirements Synthesis", de: "Anforderungssynthese" },
      title: { en: "From Findings to Four Requirement Categories", de: "Von Erkenntnissen zu vier Anforderungskategorien" },
      annotation: {
        en: "Findings were synthesised into functional, environmental, user, and data requirements: foster interaction across seniority levels and around shared interests, integrate seamlessly on every platform, stay accessible to both remote and on-site staff, stay intuitive for all users, and collect data privacy-first.",
        de: "Die Erkenntnisse wurden zu funktionalen, umgebungsbezogenen, nutzer- und datenbezogenen Anforderungen verdichtet: Interaktion über Senioritätsstufen hinweg und über geteilte Interessen fördern, nahtlose Integration auf jeder Plattform, Zugänglichkeit für Remote- und Vor-Ort-Mitarbeitende, intuitive Bedienung für alle Nutzenden und datenschutzorientierte Datenerhebung.",
      },
      insight: {
        en: "Interaction between different seniority levels and departments was where connecting stayed hardest — any concept had to lower that threshold, not just add another chat channel.",
        de: "Interaktion zwischen unterschiedlichen Senioritätsstufen und Abteilungen blieb die schwierigste Stelle beim Verbinden — jedes Konzept musste diese Schwelle senken, statt nur einen weiteren Chat-Kanal hinzuzufügen.",
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
      phase: "deliver",
      type: { en: "High-Fidelity Prototype", de: "High-Fidelity-Prototyp" },
      title: { en: "Interest-Based Communities Prototype", de: "Prototyp Interest-Based Communities" },
      annotation: {
        en: "Final prototype: add your own interests, see colleagues' interests, get invited to events, and create events for like-minded people — accessible to both remote and on-site staff. Validated in user testing sessions (feature understanding, usability issues), iteratively refined, and delivered to deskbird with documentation and development recommendations.",
        de: "Finaler Prototyp: eigene Interessen hinzufügen, die Interessen von Kolleg:innen sehen, zu Events eingeladen werden und Events für Gleichgesinnte erstellen — zugänglich für Remote- und Vor-Ort-Mitarbeitende. In Usability-Tests validiert (Verständlichkeit des Features, Usability-Probleme), iterativ verfeinert und mit Dokumentation und Entwicklungsempfehlungen an deskbird übergeben.",
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
    { tag: "Mixed-Methods Research", evidence: "methodology: a 57-respondent online survey quantifying work conditions and privacy preferences, run alongside six 90-minute contextual inquiries and 30-minute semi-structured follow-ups — a quantitative and a qualitative strand feeding one synthesis", status: "evidenced" },
    { tag: "Stakeholder Interviews", evidence: "process:Aligning on Scope with deskbird", status: "evidenced" },
    { tag: "Contextual Inquiry", evidence: "process:Observing the Hybrid Workday in Context (N=6)", status: "evidenced" },
    { tag: "Survey Design", evidence: "process:Quantifying Hybrid Social Life (N=57) — multiple-choice, rating, and open-ended items, convenience and snowball sampling", status: "evidenced" },
    { tag: "Competitive Analysis", evidence: "methodology: state-of-the-art review of the hybrid-work tool landscape (Microsoft Viva, Workvivo, Donut for Slack, Happeo, and ~25 others) plus heuristic evaluation and user-flow analysis of the existing deskbird app; myContribution.shared: \"competitor research\"", status: "evidenced" },
    { tag: "Affinity Diagramming", evidence: "myContribution.shared: \"affinity diagramming and synthesis\"; process:From Findings to Four Requirement Categories is the clustered output it produced", status: "evidenced" },
    { tag: "Requirements Engineering", evidence: "process:From Findings to Four Requirement Categories — functional, environmental, user, and data requirements", status: "evidenced" },
    { tag: "Concept Development", evidence: "process:Three Concepts, One Winner — Chat2Meet, Flows & Breaks, and Interest-Based Communities developed and scored against the requirements; myContribution.owned records the selected concept as mine", status: "evidenced" },
    { tag: "Interaction Design", evidence: "process:Interest-Based Communities Prototype — add/see interests, create/get invited to events", status: "evidenced" },
    { tag: "High-Fidelity Prototyping", evidence: "solution: \"delivered as a high-fidelity prototype with development recommendations\"; process:Interest-Based Communities Prototype; methods: \"Concept Development & Prototyping\"", status: "evidenced" },
    { tag: "Usability Testing", evidence: "process:Interest-Based Communities Prototype — user testing sessions evaluating feature understanding and usability, iterated into the prototype; results: \"validated in user testing sessions that returned positive feedback on usability and feature understanding\"", status: "evidenced" },
    { tag: "Figma", evidence: "techStack: [\"Figma\", \"FigJam\", \"Online Survey Tools\"] — rendered as Tech Stack chips under Methodology", status: "evidenced" },
    { tag: "B2B SaaS", evidence: "challenge: \"deskbird — a B2B SaaS platform for desk booking and hybrid week planning\"", status: "evidenced" },
  ],
};

export default projectData;
