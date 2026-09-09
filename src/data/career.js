// The career arc is derived from the canonical path in profile.js so the
// homepage, About page and future CV/social exports cannot drift into different
// versions of the same story. Skill chips remain evidence-backed and are
// grouped by the phase where they became central to the narrative.

import { careerPath } from './profile';

const skillsByPhase = {
  'software-engineering': [
    {
      groupKey: null,
      items: ['RESTful APIs', 'Git & GitHub'],
    },
  ],
  'frontend-development': [
    {
      groupKey: null,
      items: [
        'HTML / CSS / JS',
        'React',
        'WordPress',
        'Responsive Design',
        'Performance Optimization',
      ],
    },
  ],
  'qa-usability': [
    {
      groupKey: null,
      items: ['Acceptance Testing', 'Postman', 'Heuristic Evaluation'],
    },
  ],
  'hci-research': [
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
  'ux-engineering': [
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
};

export const careerPhases = careerPath.map((phase) => ({
  ...phase,
  skillGroups: skillsByPhase[phase.id] ?? [],
}));
