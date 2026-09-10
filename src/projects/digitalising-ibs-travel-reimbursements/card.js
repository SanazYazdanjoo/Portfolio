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
  cardTags: ['UX Research', 'Requirements Engineering', 'React', 'GDPR / DSGVO'],
  cardOutcome: {
    en: 'Mapped a 13-step reimbursement process, documented 25 problems, and turned the evidence into a deployed working demo.',
    de: 'Einen 13-stufigen Erstattungsprozess kartiert, 25 Probleme dokumentiert und die Evidenz in eine bereitgestellte funktionierende Demo übersetzt.',
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
