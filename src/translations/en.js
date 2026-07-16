// src/translations/en.js
// ─── English UI Strings ────────────────────────────────────────────────────────
// Flat key-value map. Use dot-notation keys for logical grouping.
// Content that lives in profile.js uses the bilingual { en, de } pattern instead.

const en = {
  // ── Navigation ──
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.about": "About",
  "nav.cv": "CV",
  "nav.contact": "Contact",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",

  // ── Hero ──
  "hero.portfolio": "PORTFOLIO",
  "hero.tagline": "I speak both 'user' and 'developer'.",
  "hero.ctaWork": "View my work",
  "hero.ctaCv": "View CV",

  // ── Projects ──
  "projects.heading": "Case Studies",
  "projects.viewProject": "View Case Study",
  "projects.comingSoon": "Coming Soon",
  "projects.methods": "Methods",
  "projects.metrics": "Key Metrics",
  "projects.allProjects": "All Projects",
  "projects.wip": "Work in Progress",
  "projects.wipDesc": "Case studies are being documented. Check back soon.",
  "projects.wipDescLong": "Case studies are being documented. Check back soon — good research takes time to tell properly.",

  // ── About ──
  "about.heading": "About Me",
  "about.whatIBring": "What I Bring",
  // Adjusted to match the new UX Engineer constants in AboutMe.jsx
  "about.skillsTechnical": "Frontend Engineering, AI-Assisted Development & QA",
  "about.skillsResearch": "UX Research & Design",
  "about.skillsAnalysis": "Analysis & Tools",
  
  "about.howIGotHere": "How I Got Here",
  "about.theBridge": "The Bridge",
  "about.theBridgeDesc": "My path wasn't linear — it was deliberate. Every phase built the one after it.",
  "about.methodology": "Methodology",
  "about.howIWork": "How I Work",
  "about.beyondTheBrief": "Beyond the Brief",
  "about.voluntaryWork": "Voluntary Work",
  "about.whatsNext": "What's next?",
  "about.seeResearch": "See the research in action.",
  "about.viewProjects": "View Projects",
  "about.viewCV": "View CV",

  // ── Career arc ──
  "about.career.phase1.label": "Software Engineering",
  "about.career.phase1.years": "2015 – 2020",
  "about.career.phase1.summary": "Built 20+ products from the ground up. Learned that code is easy; knowing what to build is hard.",
  "about.career.phase2.label": "QA Engineering",
  "about.career.phase2.years": "2020 – 2023",
  "about.career.phase2.summary": "Shifted from building to breaking — and realised every bug was a user insight waiting to be heard.",
  "about.career.phase3.label": "UX Engineering", // Updated
  "about.career.phase3.years": "2023 – Now",
  "about.career.phase3.summary": "This is where research and engineering merge. I design methodologically sound studies and build the architecture (e.g., in TypeScript) to run them.", // Updated

  // ── Research process ──
  "about.process.discover.title": "Discover",
  "about.process.discover.desc": "Stakeholder interviews, contextual inquiry, and desk research to frame the right problem before any solution is considered.",
  "about.process.define.title": "Define",
  "about.process.define.desc": "Synthesise findings into actionable insights — personas, user flows, and evidence-backed problem statements.",
  "about.process.design.title": "Design",
  "about.process.design.desc": "Storyboards, wireframes, and high-fidelity Figma prototypes that translate research directly into testable artefacts.",
  "about.process.deliver.title": "Deliver",
  "about.process.deliver.desc": "Usability testing, iteration, and stakeholder alignment — with measurable outcomes documented at every stage.",

  // ── CV ──
  "cv.heading": "Curriculum Vitae",
  "cv.experience": "Work Experience",
  "cv.education": "Education",
  "cv.skills": "Skills",
  "cv.languages": "Languages",
  "cv.certifications": "Certifications",
  "cv.certificates": "Certificates",
  "cv.portfolioHighlights": "Portfolio Highlights",
  "cv.volunteerWork": "Volunteer Work",
  "cv.download": "Download PDF",
  "cv.saveAsPdf": "Save as PDF",

  // ── Contact ──
  "contact.heading": "Get in Touch",
  "contact.hi": "Hi",
  "contact.email": "Email",
  "contact.locationPhone": "Location & Phone",
  "contact.socials": "Socials",
  "contact.collaborate": "Let's collaborate in:",
  "contact.location": "Currently based in Weimar, Germany, and open to interdisciplinary UX and Tech roles.", // Updated

  // ── Footer ──
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.impressum": "Legal Notice",
  "footer.sitemap": "Sitemap",
  "footer.letsWork": "Let's work together.",
  "footer.openTo": "Open to {role} roles in Germany",

  // ── Voluntary ──
  "voluntary.heading": "Voluntary",
  "voluntary.description": "Community building, mentorship, and extracurricular initiatives.",

  // ── Common ──
  "common.backToPortfolio": "← Back to Portfolio",
  "common.readMore": "Read More",
  "common.language": "Language",

  // ── Hero meta strip ──
  "hero.kicker": "UX Research × Engineering",

  "hero.meta.background": "Background",
  "hero.meta.focus": "Focus",
  "hero.meta.status": "Status",
  "hero.meta.location": "Location",

  // These values now mirror the exact length and meaning of the German translation
  "hero.meta.backgroundValue": "M.Sc. HCI · B.E. Software Engineering · QA",
  "hero.meta.focusValue": "Frontend Development · UI Architecture · Mixed-methods",
  "hero.meta.statusValue": "Open to interdisciplinary UX & Tech roles",
  "hero.meta.locationValue": "Weimar, DE · Open to relocation",
  
  // ── Footer ──
  "footer.status": "Status",
  "footer.directContact": "Direct Contact",
  "footer.basedIn": "Currently based in {location}.",
  "footer.openToRoles": "Open to {role} roles.",

  // ── Scroll indicator ──
  "scroll.hero": "Hero",
  "scroll.about": "About Me",
  "scroll.projects": "Projects",
};

export default en;