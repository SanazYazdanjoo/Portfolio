// src/projects/project-4/data.js
// ─── Evidence-locked to the IBS Fahrtkostenerstattung project documents ───
// Sources: 5W1H, Stakeholders, Overview UML, Detailed UML, Current Problems,
// Persona, Information Architecture, Design System, README/DECISIONS/REQUIREMENTS.
//
// ⚠️ Phase 4 (evaluation) has not completed. Nothing in `metrics` or `results`
// claims an outcome. Anything not yet evidenced is marked TODO and left null.
import thumbnailImg from './project4-Thumbnail.png';

export const projectData = {
  id: 'project-4',
  status: 'in-progress', // Phase 3 shipped · Phase 4 evaluation running
  order: 1,
  title: 'IBS Fahrtkostenerstattung',
  subtitle: 'Digitalizing a nine-actor, paper-heavy reimbursement workflow',
  tagline:
    'Nineteen documented failures, seven personas each carrying its own confidence rating, and a requirement trail that a build-time test refuses to let me break. Then I built the thing.',
  role: 'Solo — UX Research, UI Design, and Frontend Development',
  timeline: '2026 · four phases · ongoing',
  tags: [
    'UX Research',
    'Service Design',
    'Information Architecture',
    'Design System',
    'React / TypeScript',
    'Public Sector',
    'Accessibility',
    'GDPR / DSGVO',
  ],
  thumbnail: thumbnailImg,
  heroImage: '/projects/project-4/hero-overview-uml.png', // TODO: export from Overview UML

  methods: [
    'Insider process observation (AS-IS)',
    'Expert validation interview',
    'Document & artefact analysis',
    'Thematic analysis / affinity clustering',
    'Stakeholder mapping',
    'UML activity diagrams (swimlane)',
    '5W1H problem framing',
    'Persona development with provenance labelling',
    'Requirements traceability (FR / NFR / P-IDs)',
    'Information architecture & state modelling',
    'Task-based evaluation build (Phase 4, in progress)',
  ],

  metrics: [
    { value: '19', label: 'problems documented, clustered into 5 themes' },
    { value: '7', label: 'personas, each with its provenance stated' },
    { value: '9', label: 'actors mapped across 13 steps and 4 return loops' },
    { value: '4+ wks', label: 'AS-IS submission-to-payout, as measured' },
    { value: '~90%', label: 'of PKW claims initially missed — no trigger existed' },
    { value: '100%', label: 'of requirements cited in code traced to a source problem' },
    { value: '5', label: 'role-based interfaces built and wired' },
    { value: '158', label: 'automated tests across 25 files' },
  ],

  techStack: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Vitest',
    'SheetJS / Excel adapters',
    'IndexedDB',
    'SVG (hand-authored diagrams)',
    'Claude Design (wireframes)',
  ],

  challenge:
    'Every month, participants in a state-funded qualification programme claim back their travel costs. On paper it is a form. In practice it was a thirteen-step process spanning nine actors, three unconnected intake channels, and four backward return loops — held together by one administrator who intervened at four separate lane crossings per claim. Nothing moved without her manual push, and when she was away, nobody else could see why sixteen people had not been paid. Participants submitted into a void: no confirmation, no visible calculation, and often more than four weeks before the money appeared. The failure was structural, not clerical — and the people it hurt most were the ones least able to absorb it.',

  solution:
    'A role-based web application that replaces the shared spreadsheet with five purpose-built views and replaces the manual chase loop with an explicit claim state machine (Under Review → Pending Approval → Approved → Paid). Participants get a mobile-first upload path with camera capture, German/English switching, and an optional guided step-by-step mode for the lowest-fluency users. Every reimbursement amount carries a full formula trace, so the participant, the admin, and the approver read the same number from the same computation — no black-box deductions to explain verbally. All persistence sits behind adapters, so the identical interface runs on demo data, a real Excel workbook, or an institute-owned backend, and participant data never leaves the institute.',

  methodology:
    'Phase 1 began from insider practice rather than a clean-room brief: I already knew the workflow from the inside, so the first task was to make that knowledge falsifiable. I reconstructed the AS-IS process as swimlane activity diagrams, framed the problem space with 5W1H, mapped nine stakeholders, and clustered nineteen observed problems into five structural themes. An independent former occupant of the administrator role confirmed the full failure set, which moved that persona from self-report to validated. The other six did not get that treatment, and the persona set says so on every board — provenance and confidence are printed alongside the content, and the two personas resting on no evidence at all are labelled hypothesis-only. Phase 2 turned the clustered problems into numbered requirements, a role-based sitemap, a claim state machine, and the "Ink Bloom" design system: a nine-colour role palette carried consistently from the research diagrams through to the shipped UI, so a lane colour in an activity diagram means the same thing as a badge colour in the app. Phase 3 built it, with the calculation rules as pure, unit-tested TypeScript rather than logic buried in components. Phase 4 — a task-based evaluation with real reviewers in each of the five roles — is running now.',

  results:
    'The prototype is functional across all five roles and covered by 158 tests, with a build-time check that fails if any requirement cited in code has no traceable acceptance criterion. Two screens remain explicit, labelled placeholders rather than hidden gaps. Evaluation has not concluded, so there are no outcome metrics yet, and this case study will not claim any until there are. What the work has already produced is a decision record: the settled reading of the attendance-legend rule, the reason the digital-signature path stays blocked pending a Data Protection Officer ruling, and the handling of a data-protection incident in which an early demo seed was generated from a real export and carried real participant data — regenerated from two fictional workbooks, with an automated test that now requires every name to trace back to them.',

  // ── Process Gallery ──────────────────────────────────────────────────────
  process: [
    {
      phase: 'Discovery',
      type: 'Framing',
      title: '5W1H — bounding the problem before touching a screen',
      annotation:
        'Six lenses on one monthly cycle: who is involved, where claims physically enter, what the baseline actually is, why it fails, and how it could be different. Built first, so that later research had a shape to fill rather than a blank page.',
      insight:
        'The WHERE lens did the most work: claims arrive through cloud, e-mail, and paper, but only cloud uploads leave a traceable record. The channel — not the paperwork — was the barrier.',
      imagePath: '/projects/project-4/01-5w1h.png',
    },
    {
      phase: 'Discovery',
      type: 'Stakeholder Map',
      title: 'Nine actors, one integration point',
      annotation:
        'Mapping each stakeholder by category, position, and system focus, then tracing where structural placement turns into a bottleneck rather than a handover.',
      insight:
        'The Admin sits at the centre of all nine roles by structure, not by seniority. Every friction point downstream traces back to that single crossing.',
      imagePath: '/projects/project-4/02-stakeholders.png',
    },
    {
      phase: 'Discovery',
      type: 'Process Model',
      title: 'AS-IS activity diagram — the shape of one cycle',
      annotation:
        'Thirteen steps, nine actors, four return loops, drawn as a swimlane activity diagram. The overview version is the argument; the detailed version underneath it is the evidence.',
      insight:
        'The approval chain runs forward in a line but is broken backward. An error caught late routes to KST 0098 — one lane short of the person who actually produced the claim.',
      imagePath: '/projects/project-4/03-overview-uml.png',
    },
    {
      phase: 'Discovery',
      type: 'Process Model',
      title: 'Detailed swimlane — every branch and rejection path',
      annotation:
        'The full decision tree, including the internship distance check, the sub-3-km exception, and each point where a claim can be sent back. This is the document the requirement IDs were extracted from.',
      insight:
        'Validating a distance rule meant printing a Google Maps route and physically attaching it to a form. That single step justified an entire automated eligibility check.',
      imagePath: '/projects/project-4/04-detailed-uml.png',
    },
    {
      phase: 'Synthesis',
      type: 'Thematic Analysis',
      title: 'Nineteen problems, five clusters',
      annotation:
        'Every observed failure written as a tagged note, colour-coded to the role that owns it, then clustered: submission friction, admin overload, information silos, approval-chain disconnects, and governance risk.',
      insight:
        'Proof volume does not predict failure. The participant owing the fewest documents carried the highest risk of the process breaking, because her only viable channel was the untracked one.',
      imagePath: '/projects/project-4/05-problems.png',
    },
    {
      phase: 'Synthesis',
      type: 'Personas',
      title: 'Seven personas — with their confidence printed on them',
      annotation:
        'One validated, two from observed cases, two constructed, two hypothesis-only. Avatars are initial monograms rather than stock photography: a stock face on an unvalidated persona implies a specificity the research does not yet support.',
      insight:
        'One quote slot is deliberately left empty. The role is currently vacant and no verbatim was captured, so nothing was invented to fill it.',
      imagePath: '/projects/project-4/06-personas.png',
    },
    {
      phase: 'Synthesis',
      type: 'Requirements Traceability',
      title: 'From an observed problem to a line of code, and back',
      annotation:
        'Each clustered problem became a numbered requirement with an acceptance criterion and named implementing files. The citations live as comments in the source, and a build-time test scans every file and fails if a cited requirement has no row in the traceability table.',
      insight:
        'This is the part I would defend hardest. It means no requirement can quietly drift out of the codebase, and any reviewer can walk backwards from a function to the participant whose problem justified it. Where a citation could not be verified against the source report, it is flagged in the table rather than presented as settled.',
      imagePath: '/projects/project-4/07-traceability.png',
    },
    {
      phase: 'Design',
      type: 'Information Architecture',
      title: 'From Excel rows to a real application',
      annotation:
        'Role-based views replace the single shared spreadsheet; an explicit claim state machine replaces the manual chase loop and the sticky notes. Each persona sees only the screens their role needs — a mobile-first surface for participants, a dense data grid for the Admin.',
      insight:
        'Making status a first-class object, not a column someone updates, is what turns "I wait until the money arrives" into a screen that answers the question directly.',
      imagePath: '/projects/project-4/08-ia.png',
    },
    {
      phase: 'Design',
      type: 'Design System',
      title: 'Ink Bloom — one palette from diagram to production UI',
      annotation:
        'Brand core, a nine-colour role palette, a four-state annotation system (note, problem, gate, win), and a spacing scale. Deliberately built so the research artefacts and the shipped interface share one visual language.',
      insight:
        'Carrying the role colours from the swimlane diagrams into the app means a stakeholder who reviewed the research can read the interface without relearning anything.',
      imagePath: '/projects/project-4/09-design-system.png',
    },
    {
      phase: 'Build',
      type: 'Frontend Development',
      title: 'Five role interfaces, one tested calculation engine',
      annotation:
        'React and TypeScript, with the reimbursement rules, attendance logic, and comparison calculation as pure functions under a 158-test suite. Persistence and identity sit behind adapters, and access control is enforced at the adapter, not in the UI.',
      insight:
        'Every computed amount returns its own formula trace. That single architectural choice is what removed the administrator from the job of explaining deductions verbally, every month, to every person.',
      imagePath: '/projects/project-4/10-prototype.png',
    },
    {
      phase: 'Evaluation',
      type: 'In Progress',
      title: 'Phase 4 — task-based review build',
      annotation:
        'A dedicated build gives each of the five roles a real login and a scripted task, including one deliberately seeded exception a Manager has to find before bulk-approving the rest. External data sources are force-disabled in this build.',
      insight:
        'TODO — evaluation is running. This section will be written from results, not predictions.',
      imagePath: null,
    },
  ],
};

export default projectData;