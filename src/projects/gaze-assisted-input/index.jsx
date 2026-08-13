import React from 'react';
import ProjectTemplate from '../../projects/ProjectTemplate';
import { projectData } from './data';

export default function Project1() {
  return (
    <ProjectTemplate meta={projectData} />
  );
}