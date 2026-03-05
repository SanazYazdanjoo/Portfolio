// src/projects/project-2/index.jsx
import React from 'react';
import ProjectTemplate from '../../projects/ProjectTemplate';
import { projectData } from './data';

export default function Project2() {
  return <ProjectTemplate meta={projectData} />;
}