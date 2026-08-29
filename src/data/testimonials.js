// Third-party endorsements — colleagues, managers, clients vouching for the
// work (repurposed LinkedIn recommendations are the expected source).
//
// UNPUBLISHED. The About page renders this section only when
// TESTIMONIALS_PUBLISHED is true AND at least one item exists. Both gates are
// deliberate: the flag is the owner's explicit "go", the empty array means no
// quote can ever be invented to fill space. Real quotes come from the owner —
// never paraphrase, never draft one on her behalf.
//
// Item shape (bilingual fields resolve via useLocalizedProfile):
//   {
//     id: 1,
//     quote: { en: "…", de: "…" },   // the endorsement, in the endorser's words
//     name: "Firstname Lastname",     // real name, with the endorser's consent
//     role: { en: "…", de: "…" },     // their role at the time of working together
//     company: "Company GmbH",
//     source: "https://…",            // optional: link to the public LinkedIn
//                                     // recommendation, for provenance
//   }
//
// If a quote exists only in one language, supply the original in both fields
// rather than translating it — a translated endorsement is no longer a quote.

export const TESTIMONIALS_PUBLISHED = false;

export const testimonialItems = [];
