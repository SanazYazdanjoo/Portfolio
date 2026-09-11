import data from './data.json';

// data.json is the canonical source for profile/content data.
// This module only exposes compatibility aliases used by existing components;
// it must not contain its own human-facing profile copy.
const baseProfile = data.profile;

export const professionalNarrative = {
  role: baseProfile.role,
  intro: baseProfile.heroIntro,
  workflow: baseProfile.roleSub,
  statement: baseProfile.positioning,
  careerPathLabel: baseProfile.careerPathLabel,
  bridgeDescription: baseProfile.bridgeDescription,
  tagline: baseProfile.tagline,
  ctas: baseProfile.ctas,
  bio: baseProfile.bio,
  profileSummary: baseProfile.profileSummary,
  focus: baseProfile.heroMeta?.focus,
};

export const careerPath = baseProfile.careerPath ?? [];

// The skills hierarchy is the ORDER of the categories in data.json: the
// first category is what she is hired for, the last is the quiet breadth
// line. These two names are the only ones a renderer treats specially; the
// categories between them render as equal supporting groups.
export const CORE_SKILLS_CATEGORY = "Core Expertise";
export const ADDITIONAL_SKILLS_CATEGORY = "Additional Technical Experience";

// Language-neutral labels, so the homepage and About can show the core row
// without walking the whole skills object.
export const coreExpertise = baseProfile.skills?.[CORE_SKILLS_CATEGORY] ?? [];

// Skill groups are object keys in data.json, so they cannot carry an
// { en, de } pair like every other field. A known category resolves through
// the translation table; an unknown one (added later via /admin) falls back
// to its raw English key wherever this map is consulted.
export const SKILL_CATEGORY_KEYS = {
  [CORE_SKILLS_CATEGORY]: "cv.skillCategory.core",
  "Research & Evaluation": "cv.skillCategory.research",
  "Technical Implementation": "cv.skillCategory.technical",
  "Quality Assurance": "cv.skillCategory.qa",
  [ADDITIONAL_SKILLS_CATEGORY]: "cv.skillCategory.additional",
};

// CurriculumVitae.jsx still reads `language.language`, while the canonical
// data model uses `language.name`. Derive the compatibility alias here so the
// displayed CV stays correct without duplicating any human-facing content.
const compatibleLanguages = (baseProfile.languages ?? []).map((language) => ({
  ...language,
  language: language.name,
}));

export const profileData = {
  ...baseProfile,
  // Compatibility object consumed by Hero.jsx. Every value above points back
  // to data.json; editing data.json changes all consumers together.
  heroNarrative: professionalNarrative,
  careerPath,
  languages: compatibleLanguages,
  // Older homepage components expect an array. Derive it from the one
  // canonical bio instead of maintaining a second copy.
  bioParagraphs: baseProfile.bio ? [baseProfile.bio] : [],
};
