import data from './data.json';

// PENDING CONFIRMATION (2026-08, JSON can't carry this note itself): the
// Awareness Member entry (id 1) shows "2024 – Present". Whether the role is
// still active or ended is unverified — a "05/2026" end date circulated in a
// work order but was a placeholder, not a supplied fact. The owner will
// provide the real value at a later checkpoint; do not guess an end date.
export const voluntaryItems = data.voluntary;
