import { projects } from "../data/projects";

const normalizeSkill = (value) => String(value ?? "").trim().toLowerCase();

export function projectHasSkill(project, skill) {
  const target = normalizeSkill(skill);
  if (!target || !Array.isArray(project?.tags)) return false;

  return project.tags.some((tag) => normalizeSkill(tag) === target);
}

export function projectProvidesSkillEvidence(project, skill) {
  return project?.status !== "coming-soon" && projectHasSkill(project, skill);
}

export function getSkillProjectCount(skill) {
  return projects.filter((project) => projectProvidesSkillEvidence(project, skill)).length;
}

export function getSkillFilterHref(skill) {
  const cleanSkill = String(skill ?? "").trim();
  if (!cleanSkill || getSkillProjectCount(cleanSkill) === 0) return null;

  return `/projects?skill=${encodeURIComponent(cleanSkill)}`;
}
