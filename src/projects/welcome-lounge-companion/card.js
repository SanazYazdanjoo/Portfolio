// Card-level fields only. The detail-page prose lives in
// welcome-lounge-companion.data.js and spreads this object.
// Source: the Welcome Lounge Companion case study (claude.ai artifact,
// Sep 2026). Every number here is stated there; nothing is extrapolated.
import thumbnailImg from './journey-hero.png';
import thumbnailWebp from './journey-hero.webp';
import cardToday from './card-today.webp';

export default {
  id: 'welcome-lounge-companion',
  status: 'in-progress',
  order: 3,
  title: {
    en: 'Welcome Lounge Companion',
    de: 'Welcome Lounge Companion',
  },
  subtitle: {
    en: 'A student journey and a staff workspace built around the spreadsheet the team already trusted',
    de: 'Eine Studierenden-Journey und ein Staff-Workspace rund um die Tabelle, der das Team bereits vertraute',
  },
  tagline: {
    en: 'Arrival information and team coordination broke down at the desk I work at. I turned what I saw into requirements and built both front doors to one workbook.',
    de: 'Ankunftsinformationen und Teamkoordination brachen an dem Tresen zusammen, an dem ich arbeite. Ich habe das Beobachtete in Anforderungen übersetzt und beide Zugänge zu einer Arbeitsmappe gebaut.',
  },
  role: {
    en: 'Solo — research, interaction design, front-end and back-end · also a tutor on the team',
    de: 'Alleinverantwortlich — Research, Interaktionsdesign, Front- und Backend · zugleich Tutorin im Team',
  },
  year: '2026',
  context: {
    en: 'Operational pilot · Bauhaus-Universität Weimar',
    de: 'Operativer Pilot · Bauhaus-Universität Weimar',
  },
  // research → requirements → interaction → build, as on the IBS card.
  cardTags: ['UX Research', 'Requirements Traceability', 'Interaction Design', 'React'],
  cardProves: { en: 'UX Engineering in live operation', de: 'UX Engineering im laufenden Betrieb' },
  cardStats: [
    { value: '4', label: { en: 'traced requirements', de: 'nachverfolgte Anforderungen' } },
    { value: '4', label: { en: 'server-enforced roles', de: 'serverseitig erzwungene Rollen' } },
    { value: '108', label: { en: 'automated tests', de: 'automatisierte Tests' } },
  ],
  cardOutcome: {
    en: 'Four traced requirements became a student journey and a staff workspace, used by the Welcome Lounge team.',
    de: 'Vier nachverfolgte Anforderungen wurden zu Studierenden-Journey und Staff-Workspace, genutzt vom Welcome-Lounge-Team.',
  },
  cardImage: cardToday,
  thumbnail: thumbnailImg,
  thumbnailWebp,
  tags: [
    'UX Research',
    'Requirements Engineering',
    'Requirements Traceability',
    'Interaction Design',
    'Information Architecture',
    'Iterative Design',
    'Responsive Design',
    'Privacy by Design',
    'Role-Based Access Control',
    'React',
    'Vite',
    'Node.js',
  ],
};
