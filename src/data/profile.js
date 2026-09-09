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
