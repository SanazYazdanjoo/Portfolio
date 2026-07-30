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
//
// NO ESTIMATED FIGURES. Every number below is a count of evidence that exists
// (problems, roles, lanes, months), not a claimed impact. Baseline measurement
// is a declared open gap (report Part VII) and is stated as such.
//
// STATUS: "Coming Soon" on purpose. Publication permission is a blocking item
// (§8.3) and is not yet in writing. There is deliberately no index.jsx in this
// folder, so main.jsx's route glob generates NO public route for it — the card
// renders as a teaser and the case study itself is unreachable until you add
// the six-line index.jsx and flip the status below.
// ─────────────────────────────────────────────────────────────────────────────

export const projectData = {
  id: "project-4",
  status: "Published",
  order: 1,

  stage: "In progress",

  title: "Redesigning a Public-Programme Reimbursement Service",
  subtitle:
    "A nine-role, paper-bound service — modelled from the inside, then scoped by the people inside it",
  tagline:
    "I spent a year operating the process I was studying, then let the two problems nobody could solve define the scope.",

  role: "UX Engineer & insider-practitioner — operator, researcher and builder of the same process",
  timeline: "2025 – 2026 · active, research phase closing",

  tags: [
    "Service Design",
    "Process Modelling",
    "Thematic Analysis",
    "Stakeholder Validation",
    "Requirements Engineering",
    "Public Sector",
    "Accessibility",
    "System Architecture",
  ],

  // First four are the card-visible line (ProjectCard slices to 4) — kept short
  // so the row stays scannable next to the other projects. The counts these
  // drop are all still carried by `metrics` and the methodology prose.
  methods: [
    "Document Analysis",
    "Practitioner Autoethnography (12 mo)",
    "Swimlane Process Modelling (7 lanes)",
    "Thematic Analysis",
    "Expert Stakeholder Validation",
    "Persona Development (7 boards, validation-status differentiated)",
    "Journey Mapping (3 journeys)",
    "Requirements Engineering (15 FR / 8 NFR)",
    "Participant Survey (in preparation)",
  ],

  metrics: [
    { value: "16/16", label: "problems confirmed by the former process owner — none rejected" },
    { value: "10/16", label: "independently sorted into the Admin lane, reproducing the structural finding" },
    { value: "2", label: "problems nobody could solve — these became the scope" },
    { value: "12 mo", label: "insider practice, captured as a register rather than anecdotes" },
  ],

  techStack: [
    "React",
    "TypeScript",
    "SQLite (single-file system of record)",
    "OIDC (institutional single sign-on)",
    "WebDAV",
    "Spreadsheet export",
    "Single container",
  ],

  // ── Challenge ──────────────────────────────────────────────────────────────
  challenge:
    "A monthly travel-cost reimbursement service inside a publicly-funded qualification programme in Thuringia spans nine roles and runs on a spreadsheet, a cloud folder, a network drive, printed paper, a wet-ink signature and sticky notes. Participants who miss the deadline or submit an incomplete set lose their claim entirely. The system therefore pushes the highest financial risk onto the actor with the least visibility: participants cannot see whether their upload arrived, whether it was complete, what was calculated, or why — they discover failure when the money does not come. That asymmetry, not the inefficiency, is the ethical centre of the case. The eligibility rules, proof requirements, approval chain and archiving obligations are legally binding constraints to design within, not UX friction to simplify away, so the design goal is to make compliance cheap, not optional.",

  // ── Solution ───────────────────────────────────────────────────────────────
  solution:
    "A status-visibility layer, delivered as a production system in increments rather than a prototype — scoped by an explicit rule derived from stakeholder evidence: build what the organisation cannot solve by policy, and let policy solve the rest. Increment 1 is an internal Admin dashboard (all participants × current month: document completeness, attendance state, amount, eligibility flags, process status) — the only increment that is simultaneously unblocked, immediately valuable and demonstrable, because it runs on data already under my control and needs no approval that does not already exist. Increment 2 delivers participant transparency without building a participant-facing application at all: a generated status file placed each month into the cloud folder each participant already uses, stating what arrived, what is missing, the amount with its arithmetic in plain German, the current state and the next deadline. That decision removed a login, a frontend, an authentication surface and the accessibility barrier the persona work had just surfaced. Increment 3 closes the chain — approval queue with deputy fallback, digital attendance entry, and a handoff that integrates with the document system already in the chain.",

  // ── Methodology ────────────────────────────────────────────────────────────
  methodology:
    "Multi-method and deliberately sequenced, so each stage constrains the next: rule extraction from four governing documents; twelve months of insider practice captured as a role-attributed problem register rather than anecdotes; a seven-lane swimlane with every failure point pinned to a step; thematic analysis clustering the register into five failure themes; then expert stakeholder validation before any scoping decision was made. The primary validity threat is that I built the problem list from inside the role that suffers most from it — the position from which every complaint looks like a requirement. Mitigations are stated rather than assumed: problems are attributed by affected role so Admin-only pain is visible as such, validation happened before scope was set, and the participant survey is scheduled before design freeze. Mitigations still outstanding are marked as outstanding: five of nine stakeholder roles remain uninterviewed, the process model itself has never been externally confirmed, and the expert review was reactive rather than generative — it confirmed all sixteen problems and added none, which is either a complete model or a response format that only permitted reaction.",

  // ── Results ────────────────────────────────────────────────────────────────
  results:
    "Two independent clusterings of the register converged on five themes — the Chasing Loop, Media Breaks, Status Opacity, Bus Factor of One, and Manual Rule Execution — and on one structural finding: the Admin is the system's only integration layer. Every arrow in the model passes through one human; no other pair of roles communicates directly. I then put the model in front of the one person more qualified to critique it than me: the current Manager, who held my role before me. She confirmed all sixteen problems, rejected none, and — sorting them independently by affected party — placed ten of sixteen in the Admin bucket, reproducing my structural finding by a different method. She proposed an organisational fix for every problem except two. Those two, both pure information-visibility problems, came back marked '?' and 'Keine Idee.' That became the scope. She also derived the dependency chain herself: she proposed abolishing manual reminders, then immediately identified the blocker — for that we would need a system where participants can check their own status. One system unlocks three problems, only one of which it addresses directly, and the argument is considerably stronger for having been made by a stakeholder rather than by the designer. There are currently no impact numbers in this project, and none are estimated anywhere: baseline capture over two to three cycles is defined but not yet started, and 'I redesigned a process' without a baseline is unfalsifiable.",

  // ── Implications ───────────────────────────────────────────────────────────
  implications:
    "Three results changed the brief rather than decorating it. First, completing the persona set inverted an assumption: the three participant variants map exactly onto the three proof branches in the governing document, and the participant with the lightest monthly paperwork — one bank statement — is the one most likely to fail, because her barrier is the submission channel, not the documentation. She cannot use the cloud link, so she sends documents by email, which the instructions forbid, which leaves no trace in the folder the Admin checks, and which is a live data-protection exposure in today's process independent of anything being built. A rule that can only be followed by users with a particular skill level is a design failure, not a compliance failure. Second, the cheapest organisational fix — replacing email reminders with a notice in the class hour — structurally excludes the participants who attend rarely, and does so invisibly, because the people it fails are the people who are not there. Visibility has to exist before reminders are withdrawn, not after. Third, a risk recorded as hypothetical materialised three weeks later when the approval role became vacant with no deputy arrangement defined — which demonstrated the model had predictive rather than merely descriptive value, and upgraded fallback logic from a nice-to-have to a live organisational need. The report also retains a correction: an earlier draft credited my own process documentation with solving the handover problem, and the stakeholder evidence contradicted it — a HowTo and an overview table already existed and went unused, because the binding constraint was staff capacity, not documentation. Being visibly wrong and then corrected by evidence is what validation is for, so the correction stayed in.",

  // ── Research phases ────────────────────────────────────────────────────────
  // Left deliberately visible, per the report's own portfolio brief: most
  // portfolios show polished outcomes, and showing a live plan with its
  // unfinished phases marked is what demonstrates the method.
  phasesIntro:
    "This is a live project, not a retrospective. The research phase is closing and the build has not started, so the phases below are marked as they actually stand — complete, in progress, planned, or blocked on a decision that belongs to someone else. Nothing here is padded to look finished, and no impact numbers are claimed anywhere in this case study, because the baseline has not been captured yet.",

  phases: [
    {
      phase: "Document analysis — rule extraction",
      status: "complete",
      note: "Four governing documents read against each other to recover the binding rule set.",
    },
    {
      phase: "Practitioner autoethnography — 12 months",
      status: "complete",
      note: "Sixteen failure points logged as a role-attributed register rather than recalled as anecdotes.",
    },
    {
      phase: "Process modelling — 7-lane swimlane",
      status: "complete",
      note: "Needs re-baselining: the review surfaced two actors missing from the model, and the approval chain has since changed.",
    },
    {
      phase: "Thematic analysis — five failure themes",
      status: "complete",
    },
    {
      phase: "Expert stakeholder validation",
      status: "complete",
      note: "Confirmation-only, which is weaker than independent elicitation. A generative round — which problems would you have listed that I didn't, and where is the map wrong — is still owed.",
    },
    {
      phase: "Personas & journey mapping",
      status: "complete",
      note: "Seven boards, each carrying its own validation status. Two participant boards are observed cases awaiting survey confirmation; one is hypothesis-only and says so.",
    },
    {
      phase: "Requirements & architecture",
      status: "complete",
      note: "15 functional and 8 non-functional requirements; architecture decided against continuity and budget constraints.",
    },
    {
      phase: "Participant survey",
      status: "in-progress",
      note: "Instrument in preparation, distributed through a channel the organisation proposed rather than solicited one-to-one by the person who processes their claims.",
    },
    {
      phase: "Stakeholder interviews — 5 remaining roles",
      status: "planned",
      note: "Five of nine roles are still uninterviewed. This is the largest open validity gap.",
    },
    {
      phase: "Baseline measurement",
      status: "planned",
      note: "The largest remaining gap in the project. There are currently no measured quantities, and 'I redesigned a process' without a baseline is unfalsifiable.",
    },
    {
      phase: "Data-protection review",
      status: "planned",
      note: "On the critical path, not a closing formality: production intent means this must complete before the system holds a single real file.",
    },
    {
      phase: "Increment 1 — Admin dashboard",
      status: "planned",
      note: "The one increment that is unblocked, immediately valuable and demonstrable without approval that doesn't already exist.",
    },
    {
      phase: "Digital sign-off authorisation",
      status: "blocked",
      note: "The highest-leverage requirement in the set, and the decision belongs to a role I don't control. Designed around rather than assumed — one state machine, two terminal implementations.",
    },
  ],

  // ── Process gallery ────────────────────────────────────────────────────────
  process: [
    {
      phase: "discover",
      type: "Document Analysis",
      title: "Extracting the Rules Nobody Had in One Place",
      annotation:
        "Four governing documents were read against each other to recover the actual rule set: the eligibility threshold, the ticket default and its cheaper-alternative proof, the comparison calculation triggered below a two-week attendance threshold, the required proof set per ticket type, the approval chain, the audit trail and the archiving obligation.",
      insight:
        "The rules were not wrong — they were scattered. And they are legally binding, which reframed the whole project: the target is not a simpler process but cheaper compliance with the process that must exist.",
      imagePath: null,
    },
    {
      phase: "discover",
      type: "Practitioner Autoethnography",
      title: "Twelve Months Inside the Failing Process",
      annotation:
        "Rather than recalling frustrations, I logged them: sixteen failure points, each attributed to the role it actually harms, versioned as a register. Attribution mattered more than the list — it makes items that only hurt the Admin visible as such.",
      insight:
        "Role-attribution is what converts an insider's complaint list into evidence. Without it, the register would simply have been a record of my own worst month, generalised.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Swimlane Process Modelling",
      title: "Seven Lanes, ~30 Steps, Sixteen Pinned Failures",
      annotation:
        "One reimbursement cycle modelled as a swimlane activity diagram with every problem localised to the step where it occurs, rather than listed separately from the process it breaks.",
      insight:
        "Three structural properties fell out of the model: a hub-and-spoke topology with a human hub, at least four paper/digital media breaks per cycle each of which destroys status information, and a critical path that is time-driven rather than work-driven — nothing can start until two chronically late inputs arrive, both enforced only by a person sending reminders.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Expert Stakeholder Validation",
      title: "Handing the Model to the Person Who Held My Role Before Me",
      annotation:
        "The former process owner — now Manager, and the only person to have occupied both the operational and the authority position — reviewed all sixteen problems along two dimensions: who can solve this, and what would the fix be.",
      insight:
        "Zero problems rejected or downgraded. Sorting by affected party, she put ten of sixteen in the Admin bucket — independently reproducing the hub-and-spoke finding I had derived from the swimlane. Two methods, one conclusion. I also logged the weakness: confirmation-only validation is weaker evidence than independent elicitation, so the next round asks which problems she would have listed that I did not.",
      imagePath: null,
    },
    {
      phase: "define",
      type: "Scoping from Evidence",
      title: "The Two Empty Cells That Became the Scope",
      annotation:
        "Every register item had an organisational answer available — stricter rules, a classroom notice, a team channel, a checklist, a legal ruling, a spreadsheet, a control point in the team meeting. Two did not: document status tracking came back '?', and payment status visibility came back 'Keine Idee.'",
      insight:
        "Build what the organisation cannot solve by policy; let policy solve the rest. That rule also forced a trade-off I recorded rather than made quietly: the calculation engine is the most enjoyable thing to build and is explicitly not first, because building the fun thing first is exactly the failure mode this exercise exists to prevent.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Persona Development",
      title: "Seven Boards, Each Carrying Its Own Validation Status",
      annotation:
        "Personas built by position in the service, with provenance and validation status stated on every board — validated, observed-case, constructed, or hypothesis-only. One board's quote slot was left deliberately empty because no verbatim was captured and the role is currently vacant; nothing was invented to fill it. Avatars are initial monograms, not stock photographs.",
      insight:
        "Persona sets normally present every profile as equally solid, which would quietly undo the evidentiary discipline of everything else. The board with no evidence at all names what would fill it and functions as interview preparation — a more honest artefact than a confident fabrication.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Designing Around a Blocked Requirement",
      title: "One State Machine, Two Terminal Implementations",
      annotation:
        "Digital sign-off is the highest-leverage requirement in the set — it removes the printing, the weeks-long signature wait and the physical-presence dependency in one move. It is also not authorised, and the decision belongs to a role I do not control. State A prepares a complete pre-filled print-ready form and tracks the signature as an explicit pending state visible to all parties; State B satisfies the same node in-app if authorisation arrives.",
      insight:
        "The signature stops being a black hole even while it remains paper. Designing for the constraint you have while remaining able to adopt the constraint you want is the difference between a demo and a deployable system.",
      imagePath: null,
    },
    {
      phase: "design",
      type: "Architecture Review",
      title: "Designing a System That Outlives Its Author",
      annotation:
        "The dominant constraint is not technical: the budget is small and I may not be maintaining this in a few years. Decisions follow from that — institutional single sign-on so no password is ever stored and access ends when someone leaves; a single-file database with no server to operate, backed up by copying a file and readable in fifteen years; spreadsheets demoted from storage to disposable output regenerated after every change; documents left in the folders they already occupy; versioned effective-dated rules so old months stay reproducible; one deployment per team, which removes multi-tenancy entirely.",
      insight:
        "Files could not be the system of record, and the reason is a direct conflict between two of my own requirements: 'anyone can edit the file directly' and 'every change is attributable to a person' cannot both be true. Moving spreadsheets from storage to output kept every convenience — familiarity, portability, survivability — and returned the audit trail. The design principle is graceful degradation to nothing: if the app stops running and nobody fixes it, the process must still be doable by hand, and no data may be trapped inside it.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Honest State Modelling",
      title: "Ship Fewer States, All True",
      annotation:
        "Confirming production intent invalidated the earlier plan to demonstrate attendance and payment panels with mock data. An upstream accounting-side process appears to refresh on a multi-week cycle — which is plausibly why payment visibility was the problem nobody could solve, since the data does not exist at the needed frequency. It is flagged as unverified and promoted to a build blocker rather than written into the spec.",
      insight:
        "A tracker with a 'Paid' state that nobody can update is worse than one that honestly ends at 'Sent to Accounting.' It teaches participants that the status is unreliable — and once they learn that, the system has lost the only thing it was built to provide. Interfaces must declare latency rather than imply freshness.",
      imagePath: null,
    },
    {
      phase: "deliver",
      type: "Ethics, Privacy & Open Gaps",
      title: "What Is Not Done Yet, Marked As Not Done",
      annotation:
        "Data protection moved onto the critical path the moment this became a production system touching bank statements and medical certificates: documented legal basis, retention and deletion concept, role-based access model, DPO review, and data minimisation designed into the upload flow rather than delegated to an instruction in a PDF. Also open: the participant survey, five stakeholder interviews, and every baseline metric. The power asymmetry is handled explicitly — I process these participants' reimbursements, so the survey is distributed through a channel the organisation proposed rather than solicited one-to-one by me.",
      insight:
        "The unfinished phases are marked as unfinished on purpose. A method you can only see once it has produced a polished result isn't a method. An internal tool stalling at 90% because approval was sought too late is one of the most common ways projects like this die — so the review is sequenced ahead of the participant-facing increment, deliberately.",
      imagePath: null,
    },
  ],
};

export default projectData;
