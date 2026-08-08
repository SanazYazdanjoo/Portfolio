// Content is sourced from UCD4UX_FINAL_PRESENTATION.pdf (deskbird x Bauhaus-Universität Weimar).
import thumbnailImg from './Project-2.png';

export const projectData = {
  id: "project-2",
  status: "Published",
  order: 3,
  title: {
    en: "UCD4UX: Encouraging Social Interactions in Hybrid Work",
    de: "UCD4UX: Soziale Interaktion im Hybrid Work fördern",
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
  timeline: "10/2023 – 03/2024",
  tags: ["User-Centered Design", "HCI Research", "Stakeholder Interviews", "Contextual Inquiry", "Survey Design", "Requirements Engineering", "Interaction Design", "Rapid Prototyping", "Figma", "B2B SaaS"],
  thumbnail: thumbnailImg,
  heroImage: thumbnailImg,

  methods: [
    { en: "Stakeholder Interviews",                       de: "Stakeholder-Interviews" },
    { en: "Online Survey",                                 de: "Online-Umfrage" },
    { en: "Remote Contextual Inquiry (90 min)",           de: "Remote Contextual Inquiry (90 Min.)" },
    { en: "Semi-structured Follow-up Interviews (30 min)", de: "Semi-strukturierte Folgeinterviews (30 Min.)" },
    { en: "Requirements Engineering",                      de: "Anforderungsanalyse" },
    { en: "Concept Development & Prototyping",             de: "Konzeptentwicklung & Prototyping" },
  ],

  metrics: [
    { value: "57", label: { en: "survey respondents", de: "Umfrageteilnehmende" } },
    { value: "6", label: { en: "contextual inquiries + follow-ups", de: "Contextual Inquiries + Folgeinterviews" } },
    { value: "~75%", label: { en: "relate more when knowing personal details", de: "fühlen sich verbundener bei bekannten persönlichen Details" } },
    { value: "3 → 1", label: { en: "concepts refined into final prototype", de: "Konzepte zum finalen Prototyp verdichtet" } },
  ],

  techStack: ["Figma", "FigJam", "Online Survey Tools"],

  challenge: {
    en: "Hybrid work reduced spontaneous social interactions: employees felt less integrated and new joiners struggled to connect. deskbird — a B2B SaaS platform for desk booking and hybrid week planning — wanted evidence, not assumptions, on how a social feature should work before committing it to the product roadmap.",
    de: "Hybrides Arbeiten reduzierte spontane soziale Interaktionen: Mitarbeitende fühlten sich weniger integriert, und neue Kolleg:innen taten sich schwer, Anschluss zu finden. deskbird — eine B2B-SaaS-Plattform für Deskbuchung und hybride Wochenplanung — wollte Evidenz statt Annahmen darüber, wie ein Social Feature funktionieren sollte, bevor es in die Produkt-Roadmap aufgenommen wird.",
  },

  solution: {
    en: "We designed 'Interest-Based Communities': employees add interests to their profile, see colleagues' interests, and create or get invited to interest-based events. The concept connects both office-based and remote staff and was delivered as a high-fidelity prototype with development recommendations, grounded in every research finding along the way.",
    de: "Wir gestalteten 'Interest-Based Communities': Mitarbeitende fügen ihrem Profil Interessen hinzu, sehen die Interessen von Kolleg:innen und erstellen interessenbasierte Events oder werden dazu eingeladen. Das Konzept verbindet Büro- und Remote-Mitarbeitende und wurde als High-Fidelity-Prototyp mit Entwicklungsempfehlungen übergeben, durchgehend auf den Forschungsergebnissen aufgebaut.",
  },

  methodology: {
    en: "We followed the full UCD process in an industry setting. Stakeholder interviews with deskbird defined brand identity, consumer aspirations, and the social-feature scope. An online survey (57 respondents, mainly aged 25–34, IT industry, hybrid workers recruited via convenience and snowball sampling) quantified work conditions, social interaction states, communication channels, and privacy preferences. Six 90-minute remote contextual inquiries — observing product managers, engineers, designers, and analysts in their real hybrid workday — were each paired with a 30-minute semi-structured follow-up interview.",
    de: "Wir durchliefen den vollständigen UCD-Prozess im Industrie-Setting. Stakeholder-Interviews mit deskbird definierten Markenidentität, Nutzerwünsche und den Umfang des Social Features. Eine Online-Umfrage (57 Teilnehmende, überwiegend 25–34 Jahre, IT-Branche, hybride Mitarbeitende, rekrutiert per Convenience- und Schneeball-Sampling) quantifizierte Arbeitsbedingungen, den Stand sozialer Interaktion, Kommunikationskanäle und Datenschutzpräferenzen. Sechs 90-minütige Remote-Contextual-Inquiries — Beobachtung von Product Managern, Entwickler:innen, Designer:innen und Analyst:innen im realen hybriden Arbeitsalltag — wurden jeweils mit einem 30-minütigen semi-strukturierten Folgeinterview gepaart.",
  },

  results: {
    en: "The research produced clear, actionable requirements: socialization happens during breaks, not meetings; the office is preferred for real interactions and faster communication while home office wins on focus; and nearly three-quarters of survey respondents agreed that knowing personal details about a colleague makes them relate more. Cross-seniority and cross-department interaction emerged as the hardest barrier. These findings eliminated two competing concepts (Chat2Meet, Flows & Breaks) and shaped the final Interest-Based Communities prototype.",
    de: "Die Forschung lieferte klare, umsetzbare Anforderungen: Sozialisierung findet in Pausen statt, nicht in Meetings; das Büro wird für echte Interaktionen und schnellere Kommunikation bevorzugt, während das Homeoffice bei der Fokussierung punktet; und fast drei Viertel der Umfrageteilnehmenden stimmten zu, dass persönliche Details über Kolleg:innen sie verbundener fühlen lassen. Interaktion über Senioritäts- und Abteilungsgrenzen hinweg erwies sich als die größte Hürde. Diese Erkenntnisse eliminierten zwei konkurrierende Konzepte (Chat2Meet, Flows & Breaks) und formten den finalen Interest-Based-Communities-Prototyp.",
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
        en: "The business goal ('attract people back to the office') and the user goal ('meaningful connection') were not the same thing. Framing our requirements around both kept the project honest.",
        de: "Das Geschäftsziel ('Menschen zurück ins Büro locken') und das Nutzerziel ('bedeutsame Verbindung') waren nicht dasselbe. Unsere Anforderungen an beiden auszurichten hielt das Projekt ehrlich.",
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
      title: { en: "Observing the Hybrid Workday In-Context (N=6)", de: "Den hybriden Arbeitstag im Kontext beobachten (N=6)" },
      annotation: {
        en: "Six 90-minute remote observations of hybrid workers in their real workplace — product manager, software engineer, customer success manager, product designer, UX working student, business analyst — followed by 30-minute semi-structured interviews to clarify observations and capture desires for improvement.",
        de: "Sechs 90-minütige Remote-Beobachtungen hybrider Mitarbeitender an ihrem realen Arbeitsplatz — Product Manager, Software Engineer, Customer Success Manager, Product Designer, UX-Werkstudentin, Business Analyst — gefolgt von 30-minütigen semi-strukturierten Interviews zur Klärung der Beobachtungen und zur Erfassung von Verbesserungswünschen.",
      },
      insight: {
        en: "Breaks are when socialization happens — and breaks at the office differ fundamentally from breaks at home. Participants wanted variety and meaningful social breaks, not more scheduled meetings.",
        de: "Sozialisierung findet in Pausen statt — und Pausen im Büro unterscheiden sich grundlegend von Pausen zu Hause. Teilnehmende wollten Abwechslung und bedeutsame soziale Pausen, keine zusätzlichen Meetings.",
      },
      imagePath: null,
    },
    {
      phase: "define",
      type: { en: "Requirements Synthesis", de: "Anforderungssynthese" },
      title: { en: "From Findings to Four Requirement Categories", de: "Von Erkenntnissen zu vier Anforderungskategorien" },
      annotation: {
        en: "Findings were synthesized into functional, environmental, user, and data requirements: foster interaction across seniority levels, integrate seamlessly on every platform, stay intuitive for all users, and collect data privacy-first.",
        de: "Die Erkenntnisse wurden zu funktionalen, umgebungsbezogenen, nutzer- und datenbezogenen Anforderungen verdichtet: Interaktion über Senioritätsstufen hinweg fördern, nahtlose Integration auf jeder Plattform, intuitive Bedienung für alle Nutzenden und datenschutzorientierte Datenerhebung.",
      },
      insight: {
        en: "Interaction between different seniority levels and departments was the hardest barrier — any concept had to lower that threshold, not just add another chat channel.",
        de: "Interaktion zwischen unterschiedlichen Senioritätsstufen und Abteilungen war die größte Hürde — jedes Konzept musste diese Schwelle senken, statt nur einen weiteren Chat-Kanal hinzuzufügen.",
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
        en: "Interest-Based Communities was the only concept satisfying both functional requirements (interaction across teams, remote and on-site) and the survey's strongest finding on personal connection.",
        de: "Interest-Based Communities war das einzige Konzept, das sowohl die funktionalen Anforderungen (teamübergreifende Interaktion, remote und vor Ort) als auch das stärkste Umfrageergebnis zu persönlicher Verbindung erfüllte.",
      },
      imagePath: null,
    },
    {
      phase: "deliver",
      type: { en: "High-Fidelity Prototype", de: "High-Fidelity-Prototyp" },
      title: { en: "Interest-Based Communities Prototype", de: "Prototyp Interest-Based Communities" },
      annotation: {
        en: "Final prototype: add your own interests, see colleagues' interests, get invited to events, and create events for like-minded people — accessible to both remote and on-site staff. Delivered with documentation and development recommendations to deskbird.",
        de: "Finaler Prototyp: eigene Interessen hinzufügen, die Interessen von Kolleg:innen sehen, zu Events eingeladen werden und Events für Gleichgesinnte erstellen — zugänglich für Remote- und Vor-Ort-Mitarbeitende. Übergeben an deskbird mit Dokumentation und Entwicklungsempfehlungen.",
      },
      insight: {
        en: "Success indicators were defined up front: number of interests created, profiles with interests, interest-based events, and attendees — making the feature's impact measurable post-launch.",
        de: "Erfolgsindikatoren wurden vorab definiert: Anzahl erstellter Interessen, Profile mit Interessen, interessenbasierte Events und Teilnehmende — das macht die Wirkung des Features nach dem Launch messbar.",
      },
      imagePath: null,
    },
  ],
};

export default projectData;
