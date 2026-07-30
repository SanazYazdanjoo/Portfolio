// src/projects/project-4/data.js
// ─── Evidence-locked to UX_Case_Study_Master_Report_v1.2 ──────────────────────
//
// ANONYMISATION (report §8.3) applied to every string in this file:
//   • Institution → "a publicly-funded qualification programme in Thuringia"
//   • Internal system names (DMS / accounting process / network paths) → described
//     by function only, never named
//   • Vacancy written as "the approval role became vacant, with no deputy
//     arrangement defined" — never as a named person leaving
//   • Persona names are fictional; the observed cases behind P3/P4 are
//     generalised, not portraits
//   • No participant first names, no ticket-type attributions, no IBAN fragments
//   • The flow diagram's source image had a real first name baked into its
//     pixels ("Kristin"); redacted to "She" before the file was ever added here
//     — see media/current-flow.webp and the anonymisation test guard
//
// NO ESTIMATED FIGURES. Every number below is a count of evidence that exists
// (problems, roles, lanes, months), not a claimed impact. Baseline measurement
// is a declared open gap (report Part VII) and is stated as such.
//
// WRITING STYLE: plain language on purpose. This page is public and most
// readers are not UX researchers — recruiters, hiring managers, other
// designers skimming quickly. Every fact below still traces back to the
// report; only the wording was simplified. If you need the denser,
// methods-vocabulary version for an academic audience, that's what the
// source report is for — this page doesn't need to also be that document.
// ─────────────────────────────────────────────────────────────────────────────

import stakeholderMap from './media/stakeholder-map.webp';
import currentFlow from './media/current-flow.webp';
import informationArchitecture from './media/information-architecture.webp';
import personaSelin from './media/persona-p1-selin-admin.webp';
import personaYusuf from './media/persona-p2-yusuf-online-ticket.webp';
import personaAesha from './media/persona-p3-aesha-abo-karte.webp';
import personaSylvia from './media/persona-p4-sylvia-pkw.webp';
import personaDozent from './media/persona-p5-dozent.webp';
import personaApprover from './media/persona-p6-approver.webp';
import personaFinance from './media/persona-p7-finance-compliance.webp';

export const projectData = {
  id: "project-4",
  status: "Published",
  // Display position 1 (the numeral on the card comes from list position, not
  // the folder name). The folder stays `project-4` deliberately: the folder
  // name is the URL, and renaming it would repoint /projects/project-3 at this
  // case study while moving EmbraceMe to a new address.
  order: 1,

  stage: "In progress",

  title: "Digitalizing the Travel-Reimbursement Process",
  subtitle: "Turning a paper-based process into working software — mapped from the inside, then engineered with the people who run it",
  tagline: "I ran this process myself for a year. Then I let the two problems nobody could solve set what I'd build.",

  role: "UX Engineer — I ran this process myself, mapped it, and I'm now building the software that replaces it",
  timeline: "2025 – 2026 · ongoing, research wrapping up",

  tags: [
    "System Design",
    "Requirements Writing",
    "Service Design",
    "Process Mapping",
    "User Research",
    "Stakeholder Interviews",
    "Public Sector",
    "Accessibility",
  ],

  // First four are the card-visible line (ProjectCard slices to 4) — leads
  // with the engineering work (mapping, requirements, architecture) to match
  // the retitle and tag order, research methods follow.
  methods: [
    "Mapping the Process",
    "Writing the Requirements",
    "Designing the System",
    "Reading the Rules",
    "12 Months on the Job",
    "Finding the Patterns",
    "Checking with an Expert",
    "Building the Personas",
    "Mapping the Journeys",
    "Planning a Survey",
  ],

  metrics: [
    { value: "16/16", label: "problems confirmed by someone who used to do this job" },
    { value: "10/16", label: "problems that land on one person — the Admin" },
    { value: "2", label: "problems nobody could solve — these set my starting point" },
    { value: "12 mo", label: "I spent doing this job myself before I started" },
  ],

  techStack: [
    "React",
    "TypeScript",
    "SQLite (one simple file, no server to run)",
    "Single sign-on (log in with an account people already have)",
    "WebDAV (connects to folders people already use)",
    "Spreadsheet export",
    "Single container",
  ],

  // ── Challenge ──────────────────────────────────────────────────────────────
  challenge:
    "Every month, people in a publicly funded training programme get their travel costs paid back. Right now, that runs on a spreadsheet, a shared folder, a printer, a signed paper form, and sticky notes. Nine different people touch each claim before it's done.\n\nIf someone misses the deadline, or their documents are incomplete, they lose the money — no exceptions. And there's no way for them to check if their claim is even on track. They only find out something went wrong when the payment doesn't arrive.\n\nThat's the real problem: the people with the most to lose can see the least. The underlying rules — who qualifies, what proof is needed, who has to sign off — are fixed and legally binding, so simplifying the rules isn't an option. The goal is to make the existing rules easy to follow, not to rewrite them.",

  // ── Solution ───────────────────────────────────────────────────────────────
  solution:
    "The plan is simple to describe: turn this into working software that shows people what's happening with their own claim. I'm building it in stages, as a real tool people will actually use — not a demo that only looks finished.\n\nStage 1 is a dashboard for the Admin, the person running this process today. It shows every claim at a glance: what's missing, what's approved, what's overdue. It needs no extra permission, so it can start immediately.\n\nStage 2 gives participants visibility without a whole new app to learn. Once a month, a simple status file appears in the same cloud folder they already use — what arrived, what's missing, how much they'll get and why, and the next deadline. No new login, no new interface. That choice also solves an accessibility problem for anyone who struggles with new tools.\n\nStage 3 closes the loop: backup approvers so nothing stalls if someone's away, and a proper connection to the paperwork system already in place.",

  // ── Methodology ────────────────────────────────────────────────────────────
  methodology:
    "I didn't just complain about the process — I studied it properly, in this order:\n\n1. Read the four official documents that set the actual rules.\n2. Logged every problem I ran into over 12 months, and who it really hurt — not just me.\n3. Mapped the whole process, step by step, and pinned every problem to the exact point it happens.\n4. Grouped those problems into a handful of clear patterns.\n5. Showed everything to someone who used to have my job, before deciding what to build.\n\nThe obvious risk: I built this list from the one role that suffers most from these problems, so of course it looked like a strong case for fixing them. That's why I checked it with someone else before deciding what to build, not after. I still owe interviews with 5 of the other 9 people involved, and nobody outside my own head has checked the process map itself yet.",

  // ── Results ────────────────────────────────────────────────────────────────
  results:
    "I found five clear patterns in the sixteen problems, and one big one underneath them all: almost everything runs through the Admin. One person is the only link connecting every other role.\n\nThen I showed my findings to the current Manager — the only person who has done both her job and mine. She agreed with every single problem, all 16, and rejected none. When she sorted them by who they actually hurt, she put 10 of the 16 on the Admin — matching what I'd found completely separately, using a different method.\n\nShe had a fix for almost everything, except two problems. Both came down to the same thing: people can't see the status of their own claim. She had no real idea how to solve that without building something new.\n\nThat's how I picked what to build first. She even worked out, on her own, that fixing the endless reminder emails needs a status system in place first — you can't stop chasing people until they can check things themselves.\n\nI don't have hard numbers yet on time or money saved. That's the next thing to measure, not something I'm claiming today.",

  // ── Implications ───────────────────────────────────────────────────────────
  implications:
    "A few things changed my plan along the way, and they're worth stating plainly.\n\nThe person with the least paperwork turned out to be the most likely to lose her claim — because her real problem isn't the paperwork, it's that she can't use the upload system. She emails her documents instead, which isn't allowed, and it doesn't show up anywhere the Admin checks. That's not her fault. A rule only works if the people it applies to can actually follow it.\n\nThe cheapest fix on the table — swapping email reminders for an announcement in class — would quietly leave out the people who barely attend in person. Nobody would even notice, because the people it fails aren't in the room to say so.\n\nA risk I'd written down as 'this could happen someday' actually happened three weeks later: the approver's role sat empty, with no backup plan. A good process map should help you see that coming, not just describe the process after the fact.\n\nOne thing I got wrong, and I'm keeping it in this write-up on purpose: I assumed my own written instructions had already solved the handover problem. They hadn't — the real issue was that nobody had time to read them. Being wrong, and then getting corrected by the evidence, is exactly what this kind of check is for.",

  // ── Figures ────────────────────────────────────────────────────────────────
  // All zoomable: these are 1600–1800px research artefacts, so inline they are
  // previews and the detail lives behind a click.
  figures: {
    challenge: [
      {
        src: stakeholderMap,
        span: 2,
        label: "Who's Involved",
        title: "Nine people, and where the attention needs to go",
        description:
          "Two ways of looking at the same nine people. On the left: how close each person sits to the day-to-day process. On the right: how much say each person has, versus how much they care — which shows where to spend the most attention.",
        alt:
          "Stakeholder map in two views. Left: circles showing how close each role sits to the process — the Admin at the centre, then the Manager, Dozent and participants, with Finance, Accounting and IT further out. Right: a grid sorting the same nine roles by how much influence they have and how interested they are, split into four zones for how closely to manage each one.",
        caption: "Nine people, two ways to see who matters most",
        takeaway:
          "The Admin sits at the centre because nearly everything in this process runs through that one role. The map also shows a gap worth noticing: the Finance team is drawn as distant and low-involvement, but they're actually the ones who decide whether the biggest fixes — like digital signatures — are even allowed. That's a decision-maker the original process map had completely missed.",
      },
    ],

    solution: [
      {
        src: informationArchitecture,
        span: 2,
        label: "How It's Organised",
        title: "One tool, four simple views",
        description:
          "Each person only sees the part of the process that's theirs. Participants submit their documents and check their claim. The Admin runs the process day to day. An approver signs off on each case. Accounting pays out.",
        alt:
          "Diagram showing one tool split into four views by role. Participant view: submit documents, check claims and status, get notifications. Admin view: dashboard, import attendance, review documents, calculate the amount, log and archive. Approver view: approval queue, case history, backup settings. Accounting view: payment queue, paid and reconciled.",
        caption: "One tool, four views — one for each role",
        takeawayLabel: "Worth knowing",
        takeaway:
          "The Admin's view is the biggest one here, because that's where most of the day-to-day work happens today — and it's the first piece I'm actually building. The participant view shown is the plan for a future full app, if it's ever needed. For now, participants get the same information a simpler way: a status file in the folder they already use, with no new login required.",
      },
    ],

    methodology: [
      {
        src: currentFlow,
        span: 2,
        label: "How It Works Today",
        title: "The process, simplified",
        description:
          "The real process runs to about thirty steps across seven teams — too much to put on one page and still make sense. This is the short version: the handoffs that actually matter, from submitting a document to getting paid.",
        alt:
          "Flow diagram titled 'the simple version', eight numbered steps. 1: the participant submits travel documents to a shared cloud folder by the 15th. 2: the teacher logs monthly attendance. 3: Admin collects and checks the documents. 4: Admin works out the amount from attendance and the ticket rule. 5: Admin and the participant fill in and sign the form. 6: the Manager reviews and approves, with a dashed line labelled 'needs a fix' looping back to the earlier collection and calculation steps if something's wrong. 7: Admin logs and files the case. 8: Accounting pays out.",
        caption: "Eight steps, one loop back when something's wrong",
        takeawayLabel: "The interesting part",
        takeaway:
          "See the dashed line? That's what happens when the Manager rejects a claim — it gets sent back on paper, and the person who submitted it has no way of knowing why. It's the same underlying gap showing up twice: paper causes delays, and nobody downstream can see what's actually happening.",
      },
      {
        src: personaSelin,
        span: 2,
        label: "Persona P1",
        title: "The Admin — the one person everything runs through",
        description:
          "Built from a year of doing this job myself, then checked against someone else's experience of the same role.",
        alt: "Persona board for the Admin: her goals, frustrations, needs, and a note confirming that someone who used to have this job agreed with every problem on the list.",
        caption: "The Admin — confirmed by someone who used to do this job",
        takeawayLabel: "Why this one matters",
        takeaway:
          "This is the only profile here that isn't just my own opinion — someone who's actually done this job before confirmed every part of it. Her own words say it best: nothing moves unless she pushes it.",
      },
      {
        src: personaYusuf,
        span: 2,
        label: "Persona P2",
        title: "Online ticket — the most paperwork",
        description:
          "Buys his ticket online and works away from the office for weeks at a time. Because of that, he has to submit more documents than anyone else, every single month.",
        alt: "Persona board for a participant who buys an online ticket: the heaviest monthly paperwork, often away on placement for weeks at a time.",
        caption: "The most paperwork · not yet confirmed",
        takeawayLabel: "Status",
        takeaway:
          "This one is my best guess based on the rules, not a confirmed real case yet. He's also, a little ironically, not the one most likely to fail — the rules were basically written with him in mind.",
      },
      {
        src: personaAesha,
        span: 2,
        label: "Persona P3",
        title: "Subscription card — least paperwork, most risk",
        description:
          "In her 50s, not confident with technology, and German isn't her first language. Her ticket type means she only has to submit one document a month — the lightest paperwork of anyone in the process.",
        alt: "Persona board for a participant with a monthly subscription ticket: the lightest paperwork of the three ticket types, but the highest real risk of losing her claim.",
        caption: "Least paperwork, highest risk · a real case",
        takeawayLabel: "Why she matters most",
        takeaway:
          "She's proof that less paperwork doesn't mean less risk. Her actual problem is that she can't use the upload system, so she emails her bank statement instead — which isn't allowed, and which nobody ever sees. That's not a paperwork problem. It's a design problem, and it's the strongest reason the new upload flow has to work without anyone's help.",
      },
      {
        src: personaSylvia,
        span: 2,
        label: "Persona P4",
        title: "Drives her own car — hard to reach",
        description:
          "Only comes in a handful of days a month, and German isn't her first language either. She has no transport ticket at all — she just drives.",
        alt: "Persona board for a participant with irregular attendance who drives her own car: rarely on site, and hard to reach through classroom announcements.",
        caption: "Rarely on site · a real case",
        takeawayLabel: "Why she matters",
        takeaway:
          "The cheapest fix on the table — swap emails for an announcement in class — simply doesn't reach her, because she's almost never in class to hear it. She also costs the Admin the most time per case, since her irregular attendance triggers extra manual checks.",
      },
      {
        src: personaDozent,
        span: 2,
        label: "Persona P5",
        title: "The teacher who tracks attendance",
        description:
          "Comfortable with spreadsheets, less comfortable with admin work — and everyone's payment depends on the attendance list she keeps.",
        alt: "Persona board for the teacher who owns the attendance list that every payment calculation depends on.",
        caption: "Owns the attendance list · not yet confirmed",
        takeawayLabel: "Status",
        takeaway:
          "His frustration isn't laziness, it's timing — he gets asked about a specific day weeks after it happened, once he's already forgotten the details.",
      },
      {
        src: personaApprover,
        span: 2,
        label: "Persona P6",
        title: "The Approver — an empty quote, on purpose",
        description:
          "Wants a short summary for each case, not a stack of paper or a messy email thread with nothing clear to approve against.",
        alt: "Persona board for the Approver role, with an intentionally empty quote because the role is currently vacant.",
        caption: "Role currently empty",
        takeawayLabel: "Why there's no quote",
        takeaway:
          "There's no quote here because there's genuinely no one in the role right now — it became vacant during this project, with no backup plan in place. Rather than invent something, I left it blank.",
      },
      {
        src: personaFinance,
        span: 2,
        label: "Persona P7",
        title: "Finance — the decision-maker nobody had drawn",
        description:
          "Decides whether digital signatures and paperless records are even allowed — a decision that shapes what this whole project is allowed to become.",
        alt: "Persona board for Finance and Compliance, who decide whether digital signatures and paperless records are permitted. Marked as not yet interviewed.",
        caption: "Not yet interviewed, and this board says so",
        takeawayLabel: "Why include a persona with no data?",
        takeaway:
          "Honestly, because this role turned out to matter more than anyone realised. It didn't even appear in the original process map, despite holding the two decisions that matter most. This board is really a list of questions to ask, not a finished profile — and I'd rather show that clearly than fake it.",
      },
    ],
  },

  // ── Where things stand ─────────────────────────────────────────────────────
  // Left deliberately visible: most portfolios only show the finished result.
  // Showing an honest, unfinished plan is more useful than hiding it.
  phasesIntro:
    "This project is still going. The research is nearly done, but nothing has been built yet. Below is where things actually stand — nothing here is dressed up to look more finished than it is.",

  phases: [
    {
      phase: "Reading the rules",
      status: "complete",
      note: "Read the four official documents to find the actual rules.",
    },
    {
      phase: "12 months on the job",
      status: "complete",
      note: "Logged every problem I ran into for a year, as it happened — not from memory afterwards.",
    },
    {
      phase: "Mapping the process",
      status: "complete",
      note: "Needs an update — the review turned up two people and one system missing from the first version.",
    },
    {
      phase: "Finding the patterns",
      status: "complete",
    },
    {
      phase: "Checking with an expert",
      status: "complete",
      note: "She agreed with everything I found, but I'd still like to ask what I might have missed.",
    },
    {
      phase: "Personas & journeys",
      status: "complete",
      note: "Two of the participant profiles are real cases; one is still just an educated guess, and says so.",
    },
    {
      phase: "Requirements & how it's built",
      status: "complete",
      note: "Decided what to build and how, given a small budget and the chance I won't be around to maintain it forever.",
    },
    {
      phase: "Talking to participants",
      status: "in-progress",
      note: "Survey is being written. It'll go out through the class itself, not from me directly, so people don't feel pressured.",
    },
    {
      phase: "Talking to the other 5 people",
      status: "planned",
      note: "Still haven't spoken with 5 of the 9 people in this process. This is the biggest open question right now.",
    },
    {
      phase: "Measuring the real impact",
      status: "planned",
      note: "No real numbers yet on time or money saved. This has to happen before I can claim any results.",
    },
    {
      phase: "Data protection check",
      status: "planned",
      note: "Has to happen before this touches anyone's real documents — not a formality to leave until the end.",
    },
    {
      phase: "Building the Admin dashboard",
      status: "planned",
      note: "First thing to actually build. Doesn't need anyone's permission I don't already have.",
    },
    {
      phase: "Getting sign-off on digital signatures",
      status: "blocked",
      note: "Not my decision to make. I've designed around it so the project can move forward without it, and switch it on later if it's approved.",
    },
  ],

  // ── Process gallery ────────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: "Reading the Rules",
      title: "Finding the Real Rules",
      annotation:
        "I compared four official documents to work out the actual rules — who qualifies, what proof is needed, and how approval works.",
      insight:
        "The rules weren't bad, they were just scattered across four documents. And since they're legally binding, the real goal became making them easy to follow, not simplifying them away.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "12 Months on the Job",
      title: "Living the Problem for a Year",
      annotation:
        "Instead of just remembering my complaints, I wrote them down as they happened — 16 problems, each tagged with who it actually hurts.",
      insight:
        "Tagging who each problem hurts is what turns a personal complaint list into real evidence.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Mapping the Process",
      title: "Every Step, One Month",
      annotation:
        "I drew out one full reimbursement cycle, step by step, and marked exactly where each of the 16 problems happens.",
      insight:
        "Three patterns fell out of the map: one person does almost everything, paper and email cause delays at several points, and nothing can start until two things arrive late — both chased by a human, every single time.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Checking with an Expert",
      title: "Asking Someone Who's Done Both Jobs",
      annotation:
        "I showed the list of 16 problems to the current Manager, who used to do my job. I asked who's responsible for each one, and how she'd fix it.",
      insight:
        "She agreed with all 16 and rejected none. Sorting them her own way, she put 10 on the Admin — matching my map, from a completely different angle. I also noted a weakness: she only reacted to my list, so next time I'll ask what she'd add that I missed.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Scoping from Evidence",
      title: "The Two Problems Nobody Could Fix",
      annotation:
        "Every problem had someone who could fix it — except two. Both came down to the same thing: nobody can see where their claim stands.",
      insight:
        "So that became the rule: build what nobody else can fix, and let normal policy fixes handle the rest. The calculation tool would have been more fun to build first — but that's exactly the trap this whole exercise exists to avoid.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Building the Personas",
      title: "Seven People, Labelled Honestly",
      annotation:
        "I built a profile for everyone in the process, and labelled how solid each one actually is — confirmed, a real case, my best guess, or just a hypothesis.",
      insight:
        "Most persona sets pretend every profile is equally solid. Mine doesn't. One board is left honestly blank rather than made up, because there simply wasn't evidence for it yet.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Designing Around What I Can't Control",
      title: "Building for Today, Ready for Tomorrow",
      annotation:
        "Digital signatures would remove the biggest delay in this process — but that's not my decision to make. So I designed two versions: one that works today with paper, and one that switches on instantly if it's ever approved.",
      insight:
        "That way, paper stops being a black hole even before anything officially changes — and the project doesn't have to sit and wait for permission to make progress.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Planning for the Long Run",
      title: "Building Something That Can Outlive Me",
      annotation:
        "The budget is small, and I might not be around to maintain this in a few years. So I kept it as simple as possible: no servers to manage, log in with an account people already have, and a spreadsheet copy always available as a plain-text backup.",
      insight:
        "If this app ever stops working, the process still has to be doable by hand, with nothing trapped inside it.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Only Showing What's True",
      title: "No Status That Can Lie",
      annotation:
        "Once I decided this had to be a real working tool, not a demo, I dropped the plan to fake a 'Paid' status with placeholder data. It turns out the actual payment records might only update every couple of months — so promising a real-time status there would just be untrue.",
      insight:
        "A status that's sometimes wrong is worse than no status at all. It's better to honestly say 'sent for payment' than to guess and be wrong later.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "What's Still Not Done",
      title: "Being Honest About the Gaps",
      annotation:
        "Since this will handle real bank statements and medical certificates, data protection has to be sorted out before anything goes live — not left until the end. Also still open: talking to participants, five more stakeholder interviews, and any real numbers on impact.",
      insight:
        "I'm listing what's unfinished on purpose. A method you only get to see once everything is polished isn't really a method at all.",
      imagePath: null,
    },
  ],
};

export default projectData;
