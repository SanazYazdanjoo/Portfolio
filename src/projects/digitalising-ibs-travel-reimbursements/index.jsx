import React from 'react';
import ProjectTemplate from '../ProjectTemplate';
import { PrototypeFab } from './PrototypeFab';
import { projectData } from './digitalising-ibs-travel-reimbursements.data';

const FIGMA_WIREFRAMES = {
  type: 'embed',
  src: 'https://embed.figma.com/design/YFlosgDXt11K17RIvVa0bL/IBS-Wireframes-Admin-and-TN?node-id=0-1&embed-host=share',
  span: 2,
  label: {
    en: 'Low-fidelity system wireframes',
    de: 'Low-Fidelity-Systemwireframes',
  },
  title: {
    en: 'One workflow, two role-specific views',
    de: 'Ein Workflow, zwei rollenspezifische Ansichten',
  },
  description: {
    en: 'The complete wireframe board connects the participant mobile flow with the admin desktop workflow around the same reimbursement lifecycle. Participants are guided by status and next actions; administrators work with cases, attendance, approvals, rates, and exceptions.',
    de: 'Das vollständige Wireframe-Board verbindet den mobilen Ablauf für Teilnehmende mit dem Desktop-Workflow der Verwaltung entlang desselben Erstattungsprozesses. Teilnehmende werden über Status und nächste Schritte geführt; die Verwaltung arbeitet mit Vorgängen, Anwesenheit, Freigaben, Tarifen und Ausnahmen.',
  },
  alt: {
    en: 'Interactive Figma board containing the IBS participant mobile wireframes and admin desktop wireframes',
    de: 'Interaktives Figma-Board mit den mobilen IBS-Wireframes für Teilnehmende und den Desktop-Wireframes für die Verwaltung',
  },
  caption: {
    en: 'Interactive Figma wireframes · participant + admin views',
    de: 'Interaktive Figma-Wireframes · Teilnehmenden- + Verwaltungsansichten',
  },
};

const originalWireframes = projectData.figures?.wireframe || [];
const hasLegacyLowFi = originalWireframes.some(
  (figure) => figure?.label?.en === 'Low-fidelity wireframe'
);

const wireframeFigures = hasLegacyLowFi
  ? originalWireframes.map((figure) =>
      figure?.label?.en === 'Low-fidelity wireframe' ? FIGMA_WIREFRAMES : figure
    )
  : [...originalWireframes, FIGMA_WIREFRAMES];

const projectDataWithFigmaWireframes = {
  ...projectData,
  figures: {
    ...projectData.figures,
    wireframe: wireframeFigures,
  },
};

// The floating prototype badge is mounted here rather than inside
// ProjectTemplate on purpose: it is a one-project affordance (this is the
// only case study with a deployed build behind it), and a template that
// rendered it from `prototypeUrl` would put it on every future project that
// links anywhere. It reads the same two data fields the inline CTA does, so
// the link and its label never drift apart.
export default function Project4() {
  return (
    <>
      <ProjectTemplate meta={projectDataWithFigmaWireframes} />
      <PrototypeFab
        href={projectData.prototypeUrl}
        label={projectData.prototypeUrlLabel}
      />
    </>
  );
}
