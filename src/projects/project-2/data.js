// src/projects/project-2/data.js
// ─── Evidence-locked to UCD4UX_FINAL_PRESENTATION.pdf (deskbird × Bauhaus-Universität Weimar) ───
import thumbnailImg from './project-thumbnail.png';

export const projectData = {
  id: "project-2",
  status: "published",
  title: "UCD4UX: Encouraging Social Interactions in Hybrid Work",
  subtitle: "Industry UX Research Project with deskbird × Bauhaus-Universität Weimar",
  tagline: "Reconnecting hybrid teams through evidence-based social feature design.",
  role: "UX Researcher (team of 6)",
  timeline: "10/2023 – 03/2024",
  tags: ["User-Centered Design", "HCI Research", "Mixed-Methods", "B2B SaaS", "Interaction Design"],
  thumbnail: thumbnailImg,
  heroImage: thumbnailImg,

  methods: [
    "Stakeholder Interviews",
    "Online Survey",
    "Remote Contextual Inquiry (90 min)",
    "Semi-structured Follow-up Interviews (30 min)",
    "Requirements Engineering",
    "Concept Development & Prototyping",
  ],

  metrics: [
    { value: "57", label: "survey respondents" },
    { value: "6", label: "contextual inquiries + follow-ups" },
    { value: "~75%", label: "relate more when knowing personal details" },
    { value: "3 → 1", label: "concepts refined into final prototype" },
  ],

  techStack: ["Figma", "FigJam", "Online Survey Tools"],

  challenge:
    "Hybrid work reduced spontaneous social interactions: employees felt less integrated and new joiners struggled to connect. deskbird — a B2B SaaS platform for desk booking and hybrid week planning — wanted evidence, not assumptions, on how a social feature should work before committing it to the product roadmap.",

  solution:
    "We designed 'Interest-Based Communities': employees add interests to their profile, see colleagues' interests, and create or get invited to interest-based events. The concept connects both office-based and remote staff and was delivered as a high-fidelity prototype with development recommendations, grounded in every research finding along the way.",

  methodology:
    "We followed the full UCD process in an industry setting. Stakeholder interviews with deskbird defined brand identity, consumer aspirations, and the social-feature scope. An online survey (57 respondents, mainly aged 25–34, IT industry, hybrid workers recruited via convenience and snowball sampling) quantified work conditions, social interaction states, communication channels, and privacy preferences. Six 90-minute remote contextual inquiries — observing product managers, engineers, designers, and analysts in their real hybrid workday — were each paired with a 30-minute semi-structured follow-up interview.",

  results:
    "The research produced clear, actionable requirements: socialization happens during breaks, not meetings; the office is preferred for real interactions and faster communication while home office wins on focus; and nearly three-quarters of survey respondents agreed that knowing personal details about a colleague makes them relate more. Cross-seniority and cross-department interaction emerged as the hardest barrier. These findings eliminated two competing concepts (Chat2Meet, Flows & Breaks) and shaped the final Interest-Based Communities prototype.",

  // ── Process Gallery ──────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: "Stakeholder Interviews",
      title: "Aligning on Scope with deskbird",
      annotation:
        "Interviews with deskbird stakeholders surfaced three insight clusters: brand identity (minimalist, usability-driven UX), consumer aspirations (fewer clicks, no extra browser tabs), and the social-feature mandate — transparent, non-intrusive, attracting people back to the office.",
      insight:
        "The business goal ('attract people back to the office') and the user goal ('meaningful connection') were not the same thing. Framing our requirements around both kept the project honest.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "Online Survey",
      title: "Quantifying Hybrid Social Life (N=57)",
      annotation:
        "Multiple-choice, rating, and open-ended questions exploring work conditions, current state of social interactions, communication channels, and privacy preferences. Respondents were mainly juniors aged 25–34 in the IT industry, across various company sizes.",
      insight:
        "Nearly three-quarters agreed that knowing personal details about a colleague makes them relate more — the single strongest signal pointing toward interest-based connection.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "Remote Contextual Inquiry",
      title: "Observing the Hybrid Workday In-Context (N=6)",
      annotation:
        "Six 90-minute remote observations of hybrid workers in their real workplace — product manager, software engineer, customer success manager, product designer, UX working student, business analyst — followed by 30-minute semi-structured interviews to clarify observations and capture desires for improvement.",
      insight:
        "Breaks are when socialization happens — and breaks at the office differ fundamentally from breaks at home. Participants wanted variety and meaningful social breaks, not more scheduled meetings.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Requirements Synthesis",
      title: "From Findings to Four Requirement Categories",
      annotation:
        "Findings were synthesized into functional, environmental, user, and data requirements: foster interaction across seniority levels, integrate seamlessly on every platform, stay intuitive for all users, and collect data privacy-first.",
      insight:
        "Interaction between different seniority levels and departments was the hardest barrier — any concept had to lower that threshold, not just add another chat channel.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Concept Development",
      title: "Three Concepts, One Winner",
      annotation:
        "We developed and compared three concepts against the requirements: Chat2Meet (template-based event messaging), Flows & Breaks (focus/break status synced across tools), and Interest-Based Communities.",
      insight:
        "Interest-Based Communities was the only concept satisfying both functional requirements (interaction across teams, remote and on-site) and the survey's strongest finding on personal connection.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "High-Fidelity Prototype",
      title: "Interest-Based Communities Prototype",
      annotation:
        "Final prototype: add your own interests, see colleagues' interests, get invited to events, and create events for like-minded people — accessible to both remote and on-site staff. Delivered with documentation and development recommendations to deskbird.",
      insight:
        "Success indicators were defined up front: number of interests created, profiles with interests, interest-based events, and attendees — making the feature's impact measurable post-launch.",
      imagePath: null,
    },
  ],
};