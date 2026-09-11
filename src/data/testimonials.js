import data from './data.json';

// Endorsements and their publish gate are content, so data.json owns both.
// The About page still requires `published` AND at least one item before it
// renders anything; no quote is invented as a placeholder.
export const TESTIMONIALS_PUBLISHED = Boolean(data.testimonials?.published);
export const testimonialItems = data.testimonials?.items ?? [];
