// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract:
// the aggregator eagerly globs card.js; the prose stays in <slug>.data.js, which
// spreads this object and loads with the detail route's chunk.
import thumbnailImg from './Project-4.png';
import thumbnailWebp from './Project-4.webp';
import cardClaimTable from './card-claim-table.webp';

export default {
  id: 'digitalising-ibs-travel-reimbursements',
  status: 'in-progress', // Phase 3 shipped · demo delivered · evaluation pending deployment
  order: 2,
  title: {
    en: 'Digitalising IBS Travel Reimbursements',
    de: 'Digitalisierung der IBS Fahrtkostenerstattung',
  },
  subtitle: {
    en: 'From paper forms and a folder of Excel files to one traceable application',
    de: 'Von Papierformularen und einem Ordner voller Excel-Dateien zu einer nachvollziehbaren Anwendung',
  },
  tagline: {
    en: 'A reimbursement process whose only status update is the money arriving — researched from the inside, rebuilt from the evidence.',
    de: 'Ein Erstattungsprozess, dessen einzige Statusmeldung das eintreffende Geld ist — von innen erforscht, aus der Evidenz neu gebaut.',
  },
  role: {
    en: 'Solo UX Researcher & UX Engineer',
    de: 'Solo UX Researcher & UX Engineer',
  },
  year: '2026',
  context: {
    en: 'In-house project',
    de: 'Internes Projekt',
  },
  cardTags: ['UX Research', 'Requirements Engineering', 'React', 'Privacy by Design'],
  // The project is still a deployed demo rather than the system of record.
  // Describe what was demonstrably built without implying measured adoption.
  cardOutcome: {
    en: 'Mapped the legacy workflow end to end and rebuilt it as a deployed role-based demo with traceable calculation rules.',
    de: 'Den bisherigen Ablauf durchgängig kartiert und als bereitgestellte, rollenbasierte Demo mit nachvollziehbaren Berechnungsregeln neu gebaut.',
  },
  // Recruiter-facing proof points: process complexity → evidence → engineering.
  // These are all counts already substantiated in the detail-page source.
  cardStats: [
    { value: '13', label: { en: 'paper-process steps mapped across 9 actors and 4 return loops', de: 'Papierprozess-Schritte über 9 Akteure und 4 Rückschleifen kartiert' } },
    { value: '25', label: { en: 'evidence-linked problems documented', de: 'evidenzverknüpfte Probleme dokumentiert' } },
    { value: '1,734', label: { en: 'automated tests guarding rules and traceability', de: 'automatisierte Tests für Regeln und Traceability' } },
  ],
  cardImage: cardClaimTable,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: [
    'UX Research',
    'Stakeholder Interviews',
    'Survey Design',
    'Thematic Analysis',
    'Persona Development',
    'Process Mapping (UML)',
    'Service Design',
    'Requirements Engineering',
    'Requirements Traceability',
    'Information Architecture',
    'State Machine Modelling',
    'Wireframing',
    'Low-Fidelity Wireframe',
    'High-Fidelity Wireframe',
    'Interaction Design',
    'Design Systems',
    'Prototyping',
    'Usability Evaluation (instrumented)',
    'Accessibility',
    'Data Visualization',
    'React',
    'TypeScript',
    'Node.js / Fastify',
    'SQLite',
    'Excel Automation (ExcelJS)',
    'Automated Testing (Vitest)',
    'Claude Code',
    'Claude Design',
    'Figma Make',
    'Product Instrumentation',
    'Privacy by Design',
    'GDPR / DSGVO',
  ],
};
