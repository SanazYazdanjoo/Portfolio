// Career arc data is derived from the canonical path in profile.js.
// Skill chips stay evidence-backed and are grouped by the phase where they
// became central to the narrative; the phases are not intended as mutually
// exclusive employment buckets.

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
      items: ['HTML / CSS / JS', 'React', 'WordPress', 'Responsive Design'],
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
      groupKey: 'about.career.group.research',
      items: ['Usability Testing', 'Heuristic Evaluation'],
    },
    {
      groupKey: 'about.career.group.build',
      items: [
        'TypeScript',
        'React',
        'Tailwind CSS',
        'Framer Motion',
        'Web Accessibility (WCAG)',
        'Unit & Integration Testing (Vitest)',
        'Figma',
      ],
    },
  ],
};

export const careerPhases = careerPath.map((phase) => ({
  ...phase,
  skillGroups: skillsByPhase[phase.id] ?? [],
}));
