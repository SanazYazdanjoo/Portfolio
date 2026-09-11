// Card-level fields only. The detail-page prose lives in
// digitalising-ibs-travel-reimbursements.data.js and spreads this object.
import thumbnailImg from './Project-4.png';
import thumbnailWebp from './Project-4.webp';
import cardClaimTable from './card-claim-table.webp';

export default {
  id: 'digitalising-ibs-travel-reimbursements',
  status: 'in-progress',
  order: 2,
  title: {
    en: 'Digitalising IBS Travel Reimbursements',
    de: 'Digitalisierung der IBS Fahrtkostenerstattung',
  },
  subtitle: {
    en: 'From paper forms and scattered Excel files to one traceable reimbursement workflow',
    de: 'Von Papierformularen und verstreuten Excel-Dateien zu einem nachvollziehbaren Erstattungsworkflow',
  },
  tagline: {
    en: 'A reimbursement process researched from the inside, translated into requirements, and rebuilt as a working application.',
    de: 'Ein Erstattungsprozess, von innen erforscht, in Anforderungen übersetzt und als funktionierende Anwendung neu gebaut.',
  },
  role: {
    en: 'Solo — UX Research, Usability Engineering, UI Design & Frontend Development',
    de: 'Alleinverantwortlich — UX Research, Usability Engineering, UI-Design & Frontend-Entwicklung',
  },
  year: '2026',
  context: {
    en: 'In-house project',
    de: 'Internes Projekt',
  },
  // One tag per link of the chain the card argues: research → requirements
  // → build → quality. Every label is in `tags`, and the four together fit
  // the one-line width rule in design-system.test.js.
  cardTags: ['UX Research', 'Requirements Traceability', 'React', 'Automated Testing (Vitest)'],
  // Proof points the chain rests on — each a metric the case study states:
  // the evidence base, the map it produced, the tests that guard the build.
  cardStats: [
    { value: '25', label: { en: 'evidence-graded problems', de: 'Probleme mit Evidenzgrad' } },
    { value: '9', label: { en: 'actors · 13 steps · 4 loops', de: 'Akteure · 13 Schritte · 4 Schleifen' } },
    { value: '1,734', label: { en: 'automated tests', de: 'automatisierte Tests' } },
  ],
  cardOutcome: {
    en: 'Research mapped 13 steps, reversed a priority, surfaced 6 missed problems, and carried the 9-actor colour model into the demo.',
    de: 'Research kartierte 13 Schritte, änderte eine Priorität, ergänzte 6 übersehene Probleme und übertrug das 9-Akteure-Farbmodell in die Demo.',
  },
  cardImage: cardClaimTable,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: [
    'UX Research',
    'Stakeholder Interviews',
    'Survey Design',
    'Thematic Analysis',
    'Process Mapping (UML)',
    'Requirements Engineering',
    'Requirements Traceability',
    'Information Architecture',
    'State Machine Modelling',
    'Wireframing',
    'Design Systems',
    'Prototyping',
    'Usability Evaluation (instrumented)',
    'React',
    'TypeScript',
    'Node.js / Fastify',
    'Automated Testing (Vitest)',
    'Privacy by Design',
    'GDPR / DSGVO',
  ],
};
