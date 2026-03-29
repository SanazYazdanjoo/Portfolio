// src/data/projects.js
const autoImportedProjects = import.meta.glob('../projects/**/data.js', { eager: true });

// Deduplicate by project id — glob can match nested paths that resolve to the same file
const seen = new Set();
export const projects = Object.values(autoImportedProjects)
  .map((module) => module.projectData)
  .filter((project) => {
    if (!project) return false;
    if (seen.has(project.id)) return false;
    seen.add(project.id);
    return true;
  });