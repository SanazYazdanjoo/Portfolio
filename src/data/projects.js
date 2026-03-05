const autoImportedProjects = import.meta.glob('../projects/**/data.js', { eager: true });

export const projects = Object.values(autoImportedProjects)
  .map((module) => module.projectData)
  .filter((project) => project !== undefined);