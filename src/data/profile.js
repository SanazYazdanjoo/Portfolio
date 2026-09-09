import data from './data.json';
import { careerPath, professionalNarrative } from './positioning';

const baseProfile = data.profile;

// profileData remains the public data interface for the app, but the top-level
// professional narrative now comes from positioning.js so the hero, About,
// metadata and future CV/social exports cannot drift into different identities.
export const profileData = {
  ...baseProfile,
  role: professionalNarrative.role,
  roleSub: professionalNarrative.workflow,
  tagline: professionalNarrative.tagline,
  positioning: professionalNarrative.workflow,
  heroNarrative: {
    ...professionalNarrative,
    careerPath,
  },
  careerPath,
  profileSummary: professionalNarrative.profileSummary,
  bio: professionalNarrative.aboutBio,
  bioParagraphs: [professionalNarrative.homeBio],
  heroMeta: {
    ...baseProfile.heroMeta,
    focus: professionalNarrative.focus,
  },
  impactStats: (baseProfile.impactStats ?? []).map((stat, index) =>
    index === 2 ? professionalNarrative.experienceStat : stat
  ),
};
