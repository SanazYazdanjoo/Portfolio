// src/projects/project-2/data.js
export const projectData = {
  id: "project-2",
  status: "published",
  title: "UCD4UX: Encouraging Social Interactions in Hybrid Work",
  subtitle: "Designing for Social Connection in Hybrid Work Environments",
  tagline: "Reconnecting hybrid teams through evidence-based social feature design.",
  role: "UX Researcher & Interaction Designer",
  timeline: "10/2023 – 03/2024",
  tags: ["User-Centered Design", "HCI Research", "Usability Engineering", "Interaction Design"],
  thumbnail: "/assets/projects/ucd4ux-thumb.png",
  heroImage: "/assets/projects/ucd4ux-hero.png",

  methods: [
    "Online Survey",
    "Remote Contextual Inquiry",
    "Stakeholder Interviews",
    "Usability Testing",
    "Iterative Prototyping",
  ],

  metrics: [
    { value: "50", label: "survey respondents" },
    { value: "6", label: "contextual inquiries" },
    { value: "4", label: "stakeholder interviews" },
    { value: "Hi-Fi", label: "Figma prototype" },
  ],

  techStack: ["Figma", "FigJam", "Miro", "Online Survey Tools"],

  // ── Process Gallery ──────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: "Online Survey",
      title: "Quantifying Social Disconnection",
      annotation: "50 participants completed a structured survey measuring perceived belonging, frequency of spontaneous interactions, and barriers to connection in hybrid work environments.",
      insight: "67% reported fewer spontaneous interactions since switching to hybrid. New joiners were disproportionately affected — directly shaping the feature scope.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "Remote Contextual Inquiry",
      title: "Observing Hybrid Collaboration In-Context",
      annotation: "6 participants observed during their actual hybrid workday — screen-shared sessions revealing real tool usage, communication patterns, and social workarounds.",
      insight: "Employees had built homemade social infrastructure: informal Slack channels, lunch calendar invites. The platform had no designed space for this.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Stakeholder Interviews",
      title: "Aligning on Problem Scope with deskbird",
      annotation: "4 structured interviews with deskbird stakeholders to understand business constraints, technical feasibility, and strategic priorities before defining the solution space.",
      insight: "Social features were on the roadmap but lacked user evidence. Our research provided the justification and scope definition needed to prioritise the work.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Wireframes",
      title: "Interest-Based Communities Feature",
      annotation: "Low-fidelity wireframes exploring core interaction flows: creating a community, discovering events, tagging profiles with interests. Iterated through 3 rounds before high-fidelity.",
      insight: "Early wireframes exposed a discoverability problem — users couldn't find communities unless they already knew they existed.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "High-Fidelity Prototype",
      title: "Interactive Figma Prototype",
      annotation: "Full interaction prototype covering the complete user journey from discovering an interest group to attending an event. Used directly in usability testing sessions.",
      insight: "Interest tagging felt invasive when prompted on first login — users preferred to add interests voluntarily after exploring the platform.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Usability Testing",
      title: "Validating with Real Users",
      annotation: "Moderated usability testing with target users navigating the high-fidelity prototype. Think-aloud protocol used to surface friction points and moments of confusion.",
      insight: "Positive SUS scores and qualitative feedback after the discoverability fix. Users reported a genuine improvement in perceived belonging.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Stakeholder Presentation",
      title: "Research-to-Roadmap Handoff",
      annotation: "Final presentation to deskbird stakeholders translating all research findings and prototype validation into a prioritised feature roadmap.",
      insight: "Stakeholders accepted the full social feature proposal. The research documentation served as the evidence base for the decision.",
      imagePath: null,
    },
  ],

  challenge: "Hybrid work increases flexibility and productivity, but it reduces spontaneous social interactions. Employees reported difficulty connecting with colleagues, especially new joiners, leading to loneliness and weaker team belonging.",
  solution: "We designed an 'Interest-Based Communities & Events' feature for the deskbird hybrid workspace platform. This feature empowers employees to initiate events, discover shared hobbies, and connect beyond project-based collaboration through user-created groups and profile-based interest tagging.",
  methodology: "We applied a mixed-methods approach including surveys to quantify social challenges, remote contextual inquiry to observe workflows, stakeholder interviews, and iterative usability testing to validate our interactive Figma prototypes.",
  results: "The evaluation showed positive usability feedback and an improved perceived sense of belonging among users. We also achieved clear stakeholder alignment on the social feature roadmap.",
  implications: "Designing for hybrid environments requires balancing asynchronous flexibility with intentional social opportunities. This project demonstrated the importance of translating qualitative insights into structured, feasible system features.",
};