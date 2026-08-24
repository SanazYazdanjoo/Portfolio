// Card-level fields ONLY — see gaze-assisted-input/card.js for the contract:
// the aggregator eagerly globs card.js; the prose stays in data.js, which
// spreads this object and loads with the detail route's chunk.
import thumbnailImg from './Project-4.png';
import thumbnailWebp from './Project-4.webp';
import cardClaimTable from './card-claim-table.webp';

export default {
  id: 'digitalising-ibs-travel-reimbursements',
  status: 'in-progress', // Phase 3 shipped · demo delivered · evaluation pending deployment
  order: 1,
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
    en: 'Solo — UX Research, UI Design, and Frontend Development',
    de: 'Alleinverantwortlich — UX Research, UI-Design und Frontend-Entwicklung',
  },
  year: '2026',
  context: {
    en: 'In-house · public sector',
    de: 'Intern · öffentlicher Sektor',
  },
  cardTags: ['Service Design', 'Stakeholder Interviews', 'React', 'Public Sector'],
  // Worded to match `stage` and `results`: the app is a deployed demo the
  // team works with — NOT yet the system of record. (Evaluation caveat lives
  // in `results`; the cardOutcome tests forbid hedging on the card.)
  cardOutcome: {
    en: 'Rebuilt a 13-step paper reimbursement process as a working application the team now uses as a deployed demo.',
    de: 'Ein 13-stufiger Papierprozess, neu gebaut als funktionierende Anwendung — das Team arbeitet bereits mit der bereitgestellten Demo.',
  },
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
    'Excel Automation (SheetJS)',
    'Automated Testing (Vitest)',
    'Product Instrumentation',
    'Privacy by Design',
    'GDPR / DSGVO',
    'Public Sector',
  ],
};
