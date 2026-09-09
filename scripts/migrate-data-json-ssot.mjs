import { readFile, writeFile } from 'node:fs/promises';

const path = new URL('../src/data/data.json', import.meta.url);
const data = JSON.parse(await readFile(path, 'utf8'));
const p = data.profile;

const canonicalBio = {
  en: "I'm a UX Engineer with an M.Sc. in Human-Computer Interaction and a B.E. in Software Engineering. My path through frontend development, QA and HCI research taught me to look at digital products from both sides: what people need and what teams can realistically build. Today I bring those perspectives together in research, usability engineering and implementation.",
  de: 'Ich bin UX Engineerin mit einem M.Sc. in Human-Computer Interaction und einem B.E. in Software Engineering. Mein Weg über Frontend-Entwicklung, QA und HCI-Forschung hat mir gezeigt, digitale Produkte aus beiden Perspektiven zu betrachten: was Menschen brauchen und was Teams realistisch umsetzen können. Heute verbinde ich diese Perspektiven in Research, Usability Engineering und Umsetzung.',
};

p.role = {
  en: 'UX Engineer',
  de: 'UX Engineerin',
};
p.roleSub = {
  en: 'Research → Usability Engineering → Implementation',
  de: 'Research → Usability Engineering → Umsetzung',
};
p.positioning = {
  en: 'I study how people use technology, turn evidence into product decisions, and build the interfaces that put those decisions into practice.',
  de: 'Ich untersuche, wie Menschen Technologie nutzen, übersetze Evidenz in Produktentscheidungen und setze die daraus entstehenden Interfaces selbst um.',
};
p.tagline = {
  en: 'I speak both ‘user’ & ‘developer’.',
  de: 'Ich spreche sowohl ‚User‘ als auch ‚Entwickler‘.',
};
p.heroIntro = {
  en: "Hi, I'm Sanaz.",
  de: 'Hi, ich bin Sanaz.',
};
p.careerPathLabel = {
  en: 'My path',
  de: 'Mein Weg',
};
p.bridgeDescription = {
  en: 'Software engineering → frontend → QA/usability → HCI research → UX engineering. Each stage changed the questions I ask and carried its toolkit into the next.',
  de: 'Software Engineering → Frontend → QA/Usability → HCI-Forschung → UX Engineering. Jede Etappe hat meine Fragen verändert und ihr Werkzeug in die nächste mitgenommen.',
};
p.ctas = {
  work: {
    en: 'View Case Studies',
    de: 'Case Studies ansehen',
  },
  cv: {
    en: 'View CV',
    de: 'CV ansehen',
  },
};
p.bio = canonicalBio;
// Kept for compatibility with any older consumer, but runtime code now derives
// this array from `bio`, so editing `bio` is the only content change required.
p.bioParagraphs = [canonicalBio];
p.profileSummary = {
  en: 'UX Engineer bridging research, usability engineering and implementation. With an M.Sc. in Human-Computer Interaction and a Software Engineering background, I move from evidence about user needs to product decisions and working interfaces.',
  de: 'UX Engineerin an der Schnittstelle von Research, Usability Engineering und Umsetzung. Mit einem M.Sc. in Human-Computer Interaction und einem Hintergrund in Software Engineering verbinde ich Evidenz über Nutzerbedürfnisse mit Produktentscheidungen und funktionierenden Interfaces.',
};
p.heroMeta.focus = {
  en: 'Research · Usability Engineering · React & TypeScript',
  de: 'Research · Usability Engineering · React & TypeScript',
};

if (Array.isArray(p.impactStats) && p.impactStats[2]) {
  p.impactStats[2] = {
    value: { en: 'Since 2015', de: 'Seit 2015' },
    label: {
      en: 'Digital-product experience across frontend, QA/usability & UX engineering',
      de: 'Erfahrung mit digitalen Produkten: Frontend, QA/Usability & UX Engineering',
    },
  };
}

p.careerPath = [
  {
    id: 'software-engineering',
    phase: '01',
    label: { en: 'Software Engineering', de: 'Software Engineering' },
    years: { en: '2010 – 2015', de: '2010 – 2015' },
    summary: {
      en: 'Built the technical foundation through a B.E. in Software Engineering: systems, software structure and turning requirements into working code.',
      de: 'Technisches Fundament im B.E. Software Engineering aufgebaut: Systeme, Softwarestruktur und die Übersetzung von Anforderungen in funktionierenden Code.',
    },
    skillGroups: [
      { groupKey: null, items: ['RESTful APIs', 'Git & GitHub'] },
    ],
  },
  {
    id: 'frontend-development',
    phase: '02',
    label: { en: 'Frontend Development', de: 'Frontend-Entwicklung' },
    years: { en: '2015 – 2020', de: '2015 – 2020' },
    summary: {
      en: 'Moved closer to the human-facing layer of software by shipping interfaces across real client projects.',
      de: 'Näher an die menschenzugewandte Seite von Software gerückt und Interfaces für reale Kundenprojekte umgesetzt.',
    },
    skillGroups: [
      {
        groupKey: null,
        items: ['HTML / CSS / JS', 'React', 'WordPress', 'Responsive Design', 'Performance Optimization'],
      },
    ],
  },
  {
    id: 'qa-usability',
    phase: '03',
    label: { en: 'QA & Usability', de: 'QA & Usability' },
    years: { en: '2020 – 2022', de: '2020 – 2022' },
    summary: {
      en: 'Shifted from only asking “Does it work?” toward “Does it work well for people?” through testing and heuristic evaluation.',
      de: 'Die Frage verschob sich von „Funktioniert es?“ zu „Funktioniert es gut für Menschen?“ — durch Testing und heuristische Evaluation.',
    },
    skillGroups: [
      { groupKey: null, items: ['Acceptance Testing', 'Postman', 'Heuristic Evaluation'] },
    ],
  },
  {
    id: 'hci-research',
    phase: '04',
    label: { en: 'HCI Research', de: 'HCI-Forschung' },
    years: { en: '2021 – 2026', de: '2021 – 2026' },
    summary: {
      en: 'Learned to answer those questions empirically through mixed-methods research, controlled studies and quantitative analysis.',
      de: 'Gelernt, diese Fragen empirisch zu beantworten — mit Mixed-Methods-Research, kontrollierten Studien und quantitativer Analyse.',
    },
    skillGroups: [
      {
        groupKey: 'about.career.group.research',
        items: [
          'Mixed-Methods Research',
          'Contextual Inquiry',
          'Usability Testing',
          'Controlled Experiments',
          'Eye-Tracking (Pupil Labs Neon)',
          'Questionnaire Design',
          'Python',
        ],
      },
    ],
  },
  {
    id: 'ux-engineering',
    phase: '05',
    label: { en: 'UX Engineering', de: 'UX Engineering' },
    years: { en: '2024 – Present', de: '2024 – heute' },
    summary: {
      en: 'Research and engineering converge: investigate, evaluate, specify and implement within the same product loop.',
      de: 'Research und Engineering laufen zusammen: untersuchen, evaluieren, spezifizieren und im selben Produktzyklus umsetzen.',
    },
    skillGroups: [
      {
        groupKey: 'about.career.group.build',
        items: [
          'Unit & Integration Testing (Vitest)',
          'TypeScript',
          'Tailwind CSS',
          'Framer Motion',
          'Web Accessibility (WCAG)',
          'Figma',
        ],
      },
    ],
    highlight: true,
  },
];

data.site = {
  ...(data.site ?? {}),
  repositoryUrl: 'https://github.com/SanazYazdanjoo/Portfolio',
};

data.testimonials = {
  published: false,
  items: [],
};

await writeFile(path, `${JSON.stringify(data, null, 2)}\n`);
console.log('Migrated src/data/data.json to the canonical content SSOT schema.');
