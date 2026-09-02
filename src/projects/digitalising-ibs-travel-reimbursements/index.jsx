import React from 'react';
import ProjectTemplate from '../ProjectTemplate';
import { PrototypeFab } from './PrototypeFab';
import { projectData } from './digitalising-ibs-travel-reimbursements.data';

// The floating prototype badge is mounted here rather than inside
// ProjectTemplate on purpose: it is a one-project affordance (this is the
// only case study with a deployed build behind it), and a template that
// rendered it from `prototypeUrl` would put it on every future project that
// links anywhere. It reads the same two data fields the inline CTA does, so
// the link and its label never drift apart.
export default function Project4() {
  return (
    <>
      <ProjectTemplate meta={projectData} />
      <PrototypeFab href={projectData.prototypeUrl} label={projectData.prototypeUrlLabel} />
    </>
  );
}
