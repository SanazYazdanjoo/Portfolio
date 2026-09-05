import React from 'react';
import ProjectTemplate from '../../projects/ProjectTemplate';
import { projectData } from './deskbird-hybrid-work.data';

// Dev-only: list every figure still waiting for its file in ./media. The
// data file resolves media by filename and returns null for a missing one,
// so the build never fails on an absent asset — this is the one place that
// says which are absent. Deduplicated, since a few files appear in two
// sections. Runs once at module load, like the checks in data/projects.js.
if (import.meta.env.DEV) {
  const missing = [
    ...new Set(
      projectData.process
        .flatMap((s) => s.figures ?? [])
        .concat(Object.values(projectData.figures ?? {}).flat())
        .filter((f) => !f.src)
        .map((f) => f.pendingFile)
    ),
  ];
  if (missing.length) console.warn('[case study] media pending:', missing);
}

export default function Project2() {
  return <ProjectTemplate meta={projectData} />;
}
