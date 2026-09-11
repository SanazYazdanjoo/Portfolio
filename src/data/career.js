import data from './data.json';

// data.json owns the complete career arc, including the skill chips attached
// to each phase. This file is only the stable import path used by CareerArc.
export const careerPhases = data.profile.careerPath ?? [];
