import { describe, expect, it } from 'vitest';
import data from './data.json';
import { careerPath, professionalNarrative, profileData } from './profile';
import { careerPhases } from './career';
import { REPO_URL } from './site';
import { TESTIMONIALS_PUBLISHED, testimonialItems } from './testimonials';
import { voluntaryItems } from './voluntary';

describe('data.json single source of truth', () => {
  it('drives the professional narrative without a second copy in JS', () => {
    expect(professionalNarrative.role).toEqual(data.profile.role);
    expect(professionalNarrative.intro).toEqual(data.profile.heroIntro);
    expect(professionalNarrative.workflow).toEqual(data.profile.roleSub);
    expect(professionalNarrative.statement).toEqual(data.profile.positioning);
    expect(professionalNarrative.tagline).toEqual(data.profile.tagline);
    expect(professionalNarrative.bio).toEqual(data.profile.bio);
    expect(professionalNarrative.profileSummary).toEqual(data.profile.profileSummary);
    expect(professionalNarrative.careerPathLabel).toEqual(data.profile.careerPathLabel);
    expect(professionalNarrative.bridgeDescription).toEqual(data.profile.bridgeDescription);
    expect(professionalNarrative.ctas).toEqual(data.profile.ctas);
    expect(professionalNarrative.focus).toEqual(data.profile.heroMeta.focus);
  });

  it('uses the exact same bio for homepage About, full About and CV profile', () => {
    expect(profileData.bio).toEqual(data.profile.bio);
    expect(profileData.bioParagraphs).toEqual([data.profile.bio]);
    expect(profileData.heroNarrative.bio).toEqual(data.profile.bio);
  });

  it('drives the complete career arc from data.json', () => {
    expect(careerPath).toEqual(data.profile.careerPath);
    expect(careerPhases).toEqual(data.profile.careerPath);
  });

  it('drives auxiliary content/configuration from data.json', () => {
    expect(voluntaryItems).toEqual(data.voluntary);
    expect(REPO_URL).toBe(data.site.repositoryUrl);
    expect(TESTIMONIALS_PUBLISHED).toBe(Boolean(data.testimonials.published));
    expect(testimonialItems).toEqual(data.testimonials.items);
  });
});
