// Flat key-value map. Use dot-notation keys for logical grouping.
// Content that lives in profile.js uses the bilingual { en, de } pattern instead.

const en = {
  // Navigation
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.about": "About",
  "nav.cv": "CV",
  "nav.contact": "Contact",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",

  // Hero
  "hero.portfolio": "PORTFOLIO",
  "hero.tagline": "I speak both 'user' and 'developer'.",
  "hero.ctaWork": "View my work",
  "hero.ctaCv": "View CV",

  // Projects
  "projects.heading": "Case Studies",
  "home.projects.kicker": "02 — Selected Work",
  "projects.title": "Projects",
  "projects.viewProject": "View Case Study",
  "projects.comingSoon": "Coming Soon",
  "projects.inProgress": "In Progress",
  "projects.methods": "Methods",
  "projects.metrics": "Key Metrics",
  "projects.allProjects": "All Projects",
  "projects.wip": "Work in Progress",
  "projects.wipDesc": "Case studies are being documented. Check back soon.",
  "projects.wipDescLong": "Case studies are being documented. Check back soon — good research takes time to tell properly.",
  "projects.view.label": "Switch view",
  "projects.view.list": "List",
  "projects.view.grid": "Grid",

  // About
  "about.heading": "About Me",
  "home.about.kicker": "01 — Who I Am",

  "about.howIGotHere": "How I Got Here",
  "about.theBridge": "The Bridge",
  "about.theBridgeDesc": "My path wasn't linear — it was deliberate. Each phase carried its toolkit into the next.",
  "about.methodology": "Methodology",
  "about.howIWork": "How I Work",
  "about.beyondTheBrief": "Beyond the Brief",
  "about.voluntaryWork": "Voluntary Work",
  "about.whatsNext": "What's next?",
  "about.seeResearch": "See the research in action.",
  "about.viewProjects": "View Projects",
  "about.viewCV": "View CV",

  // Career arc
  "about.career.phase1.label": "Software Engineering",
  "about.career.phase1.years": "2015 – 2020",
  "about.career.phase1.summary": "Built 20+ products from the ground up. Learned that code is easy; knowing what to build is hard.",
  "about.career.phase2.label": "QA Engineering",
  "about.career.phase2.years": "2020 – 2023",
  "about.career.phase2.summary": "Shifted from building to breaking — and realised every bug was a user insight waiting to be heard.",
  "about.career.phase3.label": "UX Engineering",
  "about.career.phase3.years": "2023 – Now",
  "about.career.phase3.summary": "This is where research and engineering merge. I design methodologically sound studies and build the architecture (e.g., in TypeScript) to run them.",
  "about.career.group.research": "Research",
  "about.career.group.build": "Build",

  // Research process
  "about.process.discover.title": "Discover",
  "about.process.discover.desc": "Stakeholder interviews, contextual inquiry, and desk research to frame the right problem before any solution is considered.",
  "about.process.define.title": "Define",
  "about.process.define.desc": "Synthesise findings into actionable insights — personas, user flows, and evidence-backed problem statements.",
  "about.process.design.title": "Design",
  "about.process.design.desc": "Storyboards, wireframes, and high-fidelity Figma prototypes that translate research directly into testable artefacts.",
  "about.process.deliver.title": "Deliver",
  "about.process.deliver.desc": "Usability testing, iteration, and stakeholder alignment — with measurable outcomes documented at every stage.",

  // CV
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

  // Contact
  "contact.heading": "Get in Touch",
  "contact.hi": "Hi",
  "contact.email": "Email",
  "contact.locationPhone": "Location & Phone",
  "contact.socials": "Socials",
  "contact.collaborate": "Let's collaborate in:",
  "contact.location": "Currently based in Weimar, Germany, and open to interdisciplinary UX and Tech roles.",
  "contact.kicker": "Contact",
  "contact.headline": "Let's talk",
  "contact.emailCta": "Write me an email",
  "contact.copyEmail": "Copy address",
  "contact.copied": "Copied",
  "contact.details": "Details",
  "contact.basedIn": "Based in",
  "contact.replyTime": "Reply time",
  "contact.phone": "Phone",
  "contact.goodToSend": "Good things to send me",
  "contact.viewCv": "View CV",

  // Footer
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.impressum": "Legal Notice",
  "footer.sitemap": "Sitemap",
  "footer.letsWork": "Let's work together.",
  "footer.openTo": "Open to {role} roles in Germany",

  // Voluntary
  "voluntary.heading": "Voluntary",
  "voluntary.description": "Community building, mentorship, and extracurricular initiatives.",

  // Common
  "common.backToPortfolio": "← Back to Portfolio",
  "common.readMore": "Read More",
  "common.language": "Language",

  // Hero meta strip
  "hero.kicker": "UX Research × Engineering",

  "hero.meta.background": "Background",
  "hero.meta.focus": "Focus",
  "hero.meta.status": "Status",
  "hero.meta.location": "Location",

  // These values mirror the length and meaning of the German translation
  "hero.meta.backgroundValue": "M.Sc. HCI · B.E. Software Engineering · QA",
  "hero.meta.focusValue": "Frontend Development · UI Architecture · Mixed-methods",
  "hero.meta.statusValue": "Open to interdisciplinary UX & Tech roles",
  "hero.meta.locationValue": "Weimar, DE · Open to relocation",
  
  // Footer
  "footer.status": "Status",
  "footer.directContact": "Direct Contact",
  "footer.basedIn": "Currently based in {location}.",
  "footer.openToRoles": "Open to {role} roles.",
  "footer.utility": "Utility",
  "footer.available": "Available",
  "footer.timezone": "Timezone: CET (UTC+1)",
  "footer.cvLink": "Curriculum Vitae (CV)",
  "footer.githubLink": "My GitHub",
  "footer.legalAriaLabel": "Legal",
  "footer.colophon": "Designed & engineered from scratch — React, Tailwind CSS, Framer Motion.",
  "footer.viewSource": "View source",

  // Scroll indicator
  "scroll.hero": "Hero",
  "scroll.about": "About Me",
  "scroll.projects": "Projects",

  // Project detail — sidebar / mobile pill labels (short form)
  "project.sidebar.allProjects": "All Projects",
  "project.sidebar.collapseAll": "Collapse all",
  "project.sidebar.expandAll": "Expand all",
  "project.sidebar.about": "About",
  "project.sidebar.process": "Process",
  "project.sidebar.challenge": "Challenge",
  "project.sidebar.solution": "Solution",
  "project.sidebar.prototype": "Prototype",
  "project.sidebar.methodology": "Methodology",
  "project.sidebar.results": "Results",
  "project.sidebar.implications": "Implications",
  "project.sidebar.status": "Status",
  "project.sidebar.conclusion": "Conclusion",

  // Project detail — section kickers + headings (long form)
  "project.about.kicker": "Project Overview",
  "project.about.heading": "About the Project",

  "project.process.kicker": "Behind the Work",
  "project.process.heading": "Research Process",
  "project.process.swipe": "Swipe to explore →",
  "project.process.keyInsight": "Key insight",
  "project.process.hideInsight": "Hide insight",
  "project.process.ariaLabel": "Research process steps",

  "project.phase.discover": "Discover",
  "project.phase.define": "Define",
  "project.phase.design": "Design",
  "project.phase.deliver": "Deliver",

  "project.challenge.kicker": "The Problem Space",
  "project.challenge.heading": "The Challenge",

  "project.solution.kicker": "What I Built",
  "project.solution.heading": "The Solution",

  "project.prototype.kicker": "See It In Action",
  "project.prototype.heading": "Prototype",
  "project.prototype.openLink": "Open the prototype",

  "project.methodology.kicker": "How I Studied It",
  "project.methodology.heading": "Methodology & Approach",
  "project.methodology.techStack": "Tech Stack",

  "project.results.kicker": "What the Data Showed",
  "project.results.heading": "Key Findings",
  "project.results.glance": "Study at a Glance",

  "project.implications.kicker": "So What",
  "project.implications.heading": "Design Implications",

  "project.phases.kicker": "Where This Stands",
  "project.phases.heading": "Research Phases",

  "project.conclusion.kicker": "Closing Reflection",
  "project.conclusion.heading": "Conclusion",

  "project.meta.role": "Role",
  "project.meta.timeline": "Timeline",
  "project.meta.methods": "Research Methods",
  "project.meta.skills": "Skills",
  "project.meta.context": "Context",
  "project.meta.furtherImpact": "Further impact",
  "project.meta.impactAtGlance": "Impact at a glance",

  "project.status.complete": "Complete",
  "project.status.inProgress": "In progress",
  "project.status.planned": "Planned",
  "project.status.blocked": "Blocked",

  "project.footer.back": "Back to All Projects",
  "project.nav.label": "Project navigation",
  "project.nav.previous": "Previous project",
  "project.nav.next": "Next project",
  "project.card.readCaseStudy": "Read case study",
  "project.card.readInProgress": "Read work in progress",

  // Project detail — figure viewer chrome
  "project.media.close": "Close",
  "project.media.enlarge": "Enlarge figure",
  "project.media.enlargedDefault": "Enlarged figure",
  "project.media.clickToEnlarge": "click to enlarge",
  "project.media.whatItShows": "What it shows",

  // Credentials
  "credentials.heading": "Credentials",
  "credentials.subheading": "Workshops, courses, and certifications — with the original documents on file.",
  "credentials.viewCredential": "View credential",
  "credentials.viewAll": "View all",
  "credentials.download": "Download PDF",
  "credentials.close": "Close",
  "credentials.verify": "Verify",
  "credentials.empty": "Credentials are being added — check back soon.",
  "credentials.type.workshop": "Workshop",
  "credentials.type.course": "Course",
  "credentials.type.internship": "Internship",
  "credentials.type.certification": "Certification",
  "credentials.type.degree": "Degree",
  "credentials.type.recognition": "Recognition",
  "credentials.type.language": "Language",

  // Tags
  "tags.directory.title": "Skills & Tags",
  "tags.directory.subheading": "Every tool, method, and domain used across my case studies — click a tag to see where it was applied.",
  "tags.directory.searchPlaceholder": "Search tags...",
  "tags.directory.sortByName": "Sort by Name",
  "tags.directory.sortByCount": "Sort by Count",
  "tags.directory.empty": "No tags match your search.",
  "tags.single.backToAll": "Back to all tags",
  "tags.single.heading": "Tagged",
  "tags.single.subheading": "Projects that used this skill or method.",
  "tags.single.empty": "No projects are tagged with this yet.",
};

export default en;