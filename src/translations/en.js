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
  "about.career.phase1.summary": "Built 10+ production sites from the ground up. Learned that code is easy; knowing what to build is hard.",
  "about.career.phase2.label": "QA Engineering",
  "about.career.phase2.years": "2020 – 2022",
  "about.career.phase2.summary": "Shifted from building to breaking — and realised every bug was a user insight waiting to be heard.",
  "about.career.phase3.label": "UX Engineering",
  "about.career.phase3.years": "2023 – Now",
  "about.career.phase3.summary": "This is where research and engineering merge. I design methodologically sound studies and build the architecture (e.g., in TypeScript) to run them.",
  "about.career.group.research": "Research",
  "about.career.group.build": "Build",

  // Double Diamond — the frame the four process steps below sit inside
  "about.doubleDiamond.intro": "As a UX Engineer, the Double Diamond is my favourite way to work: diverge to understand, converge to decide — twice over. The first diamond keeps me in the problem long enough to frame the right one; the second turns that frame into something built, tested, and measured.",
  "about.doubleDiamond.intro2": "What I value is the discipline it enforces — never converging too early, and never designing for a problem nobody validated. Working across research and engineering, I get to walk both diamonds: the studies that decide what to build, and the code that proves it holds up.",
  "about.doubleDiamond.caption": "The Double Diamond, as framed by the British Design Council. The tangled line is the honest part — discovery is never a straight path.",
  "about.doubleDiamond.alt": "Hand-drawn Double Diamond diagram: two diamonds labelled Discover, Define, Develop and Deliver, with a line that loops and wanders through the first diamond, then straightens out on its way to delivery.",

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
  "cv.sectionsAriaLabel": "CV sections",

  // Skill-group headings on the CV. Keyed off the English category name in
  // data.json (see SKILL_CATEGORY_KEYS in CurriculumVitae.jsx); a category
  // added later without a key here simply falls back to its raw name.
  "cv.skillCategory.frontendEngineering": "Frontend Engineering & Design",
  "cv.skillCategory.aiAssistedDevelopment": "AI-Assisted Development",
  "cv.skillCategory.uxResearchDesign": "UX Research & Testing",
  "cv.skillCategory.qaTesting": "QA & Testing",
  "cv.skillCategory.analysisTools": "Analysis & Tools",

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
  "common.readLess": "Read Less",
  "common.language": "Language",
  "common.skipToContent": "Skip to main content",
  "common.loading": "Loading…",
  // Language switcher: labelled in the language it switches *to*, so a reader
  // who can't read the current one still understands the control.
  "common.switchToOther": "Auf Deutsch wechseln",

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
  "project.sidebar.hide": "Hide section list",
  "project.sidebar.show": "Show section list",
  "project.sidebar.expandAll": "Expand all",
  "project.sidebar.about": "About",
  "project.sidebar.process": "Process",
  "project.sidebar.challenge": "Challenge",
  "project.sidebar.solution": "Solution",
  "project.sidebar.design": "Design",
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

  "project.design.kicker": "How It Was Made",
  "project.design.heading": "Design",

  "project.prototype.kicker": "See It In Action",
  "project.prototype.heading": "Prototype",
  "project.prototype.openLink": "Open the prototype",

  "project.methodology.kicker": "How I Studied It",
  "project.methodology.heading": "Methodology & Approach",
  "project.methodology.techStack": "Tech Stack",

  "project.results.kicker": "What the Data Showed",
  "project.results.heading": "Key Findings & Outcome",
  "project.results.glance": "Study at a Glance",

  "project.outcome.kicker": "What Changed",
  "project.outcome.decisions": "Decisions this research drove",
  "project.outcome.adoption.shipped": "Shipped",
  "project.outcome.adoption.roadmapped": "Roadmapped",
  "project.outcome.adoption.notAdopted": "Not Adopted",
  "project.outcome.adoption.unknown": "Outcome Unknown",
  "project.outcome.adoption.academic": "Academic Project",

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
  "project.meta.contribution": "My Contribution",
  "project.meta.aiAssistance": "AI Assistance",

  "project.contribution.owned": "Owned",
  "project.contribution.shared": "Shared",
  "project.contribution.notMine": "Not Mine",

  "project.results.verbatim": "Participant quote",
  "project.results.pending": "Measurement pending",
  "project.results.pendingNotice": "The protocol is defined; these numbers are deliberately absent until the sessions run.",

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
  "project.media.closeLabel": "Close enlarged figure",
  "project.media.enlarge": "Enlarge figure",
  "project.media.enlargedDefault": "Enlarged figure",
  "project.media.clickToEnlarge": "click to enlarge",
  "project.media.whatItShows": "What it shows",
  "project.media.openFullPage": "Open full page",
  "project.media.opensNewTab": "opens the full document in a new tab",
  "project.media.heroCredit": "Image generated by Nanobanana.",

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
  // {title} / {provider} are substituted at render time (Credentials.jsx)
  "credentials.imageAlt": "Certificate: {title} — {provider}",

  // Credentials — topic filter
  "credentials.filter.label": "Filter credentials by topic",
  "credentials.filter.all": "All",
  // {count} / {total} are substituted at render time (Credentials.jsx)
  "credentials.showing": "Showing {count} of {total}",
  "credentials.noMatch": "No credentials match this filter.",
  "credentials.reset": "Show all",
  "credentials.topic.research": "Research & Testing",
  "credentials.topic.strategy": "Process & Strategy",
  "credentials.topic.design": "Design & Prototyping",
  "credentials.topic.accessibility": "Accessibility",
  "credentials.topic.ai": "AI",
  "credentials.topic.engineering": "Engineering",
  "credentials.topic.academic": "Academic & Service",

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

  // Nav — extra link not covered by the short nav.* set above
  "nav.designSystem": "Design System",

  // Design System — the page body stays English on purpose (it documents CSS
  // tokens, class names and code), so only its navigation chrome is localised.
  "designSystem.sectionsAriaLabel": "Design System sections",

  // CV sidebar
  "cv.onThisPage": "On this page",

  // Project template — sidebar nav landmark
  "project.sidebar.ariaLabel": "Page sections",

  // Home — empty state when there are no projects at all (edge case)
  "home.projects.empty": "Case studies are being inked — check back soon.",

  // Privacy Policy
  "privacy.title": "Privacy Policy",
  "privacy.intro": "Information on how your data is handled when you visit this portfolio, complying with the GDPR (DSGVO).",
  "privacy.section1.heading": "1. An Overview of Data Protection",
  "privacy.section1.generalInfo.heading": "General Information",
  "privacy.section1.generalInfo.body": "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you could be personally identified.",
  "privacy.section1.controller.heading": "Data Controller",
  "privacy.section1.controller.body": "The data processing on this website is carried out by the website operator:",
  "privacy.section2.heading": "2. Data Collection on this Website",
  "privacy.section2.serverLogs.heading": "Server Log Files",
  "privacy.section2.serverLogs.intro": "The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:",
  "privacy.section2.serverLogs.item1": "Browser type and browser version",
  "privacy.section2.serverLogs.item2": "Operating system used",
  "privacy.section2.serverLogs.item3": "Referrer URL",
  "privacy.section2.serverLogs.item4": "Hostname of the accessing computer",
  "privacy.section2.serverLogs.item5": "Time of the server request",
  "privacy.section2.serverLogs.item6": "IP address",
  "privacy.section2.serverLogs.legal": "This data is not merged with other data sources. The basis for data processing is Art. 6 (1) (f) GDPR — the legitimate interest in the technically error-free presentation and optimization of this website.",
  "privacy.section2.email.heading": "Contact via Email",
  "privacy.section2.email.body": "If you send me an email, your details, including the contact details you provided, will be stored by me for the purpose of processing the inquiry and in case of follow-up questions. I do not share this data without your consent.",
  // Analytics & consent — the tools this site actually loads (Cookiebot,
  // Google Analytics after consent, Vercel hosting + cookie-free analytics).
  "privacy.sectionAnalytics.heading": "3. Cookies, Consent & Analytics",
  "privacy.sectionAnalytics.cookiebot.heading": "Consent Management (Cookiebot)",
  "privacy.sectionAnalytics.cookiebot.body": "This website uses Cookiebot (Usercentrics A/S, Havnegade 39, 1058 Copenhagen, Denmark) as its consent management platform. On your first visit you are asked whether you consent to statistics cookies; analytics scripts are loaded only after you have given that consent. Your decision is stored in a consent cookie so it can be remembered on later visits. Storing this choice is technically necessary and based on Art. 6 (1) (c) GDPR and § 25 (2) TDDDG.",
  "privacy.sectionAnalytics.ga.heading": "Google Analytics",
  "privacy.sectionAnalytics.ga.body": "Only if you consent, this website uses Google Analytics 4, a web analytics service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Google Analytics uses cookies and similar technologies to analyse how visitors use the site; IP addresses are processed in truncated (anonymised) form. Data may be transferred to servers of Google LLC in the USA; Google is certified under the EU-U.S. Data Privacy Framework. The legal basis is your consent (Art. 6 (1) (a) GDPR, § 25 (1) TDDDG). You can withdraw your consent at any time with effect for the future via the cookie settings.",
  "privacy.sectionAnalytics.vercel.heading": "Hosting & Vercel Web Analytics",
  "privacy.sectionAnalytics.vercel.body": "This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel processes the server log data described above to deliver the site securely and reliably. In addition, the site uses Vercel Web Analytics, a cookie-free measurement tool that collects aggregated usage data (such as page views, country, browser, and device type) without storing identifiers on your device and without tracking you across websites. The legal basis for both is my legitimate interest in the secure operation and improvement of this website (Art. 6 (1) (f) GDPR).",
  "privacy.sectionAnalytics.manageHint": "You can change or withdraw your cookie consent at any time:",
  "privacy.sectionAnalytics.manage": "Open cookie settings",

  "privacy.section3.heading": "4. Your Rights",
  "privacy.section3.body": "You have the right to receive information about the origin, recipient, and purpose of your stored personal data free of charge at any time. You also have a right to request the correction or deletion of this data. If you have given your consent to data processing, you can revoke this consent at any time for the future. Furthermore, under certain circumstances, you have the right to request the restriction of the processing of your personal data. You can contact me at any time at the email address provided above for this purpose.",

  // Impressum
  "impressum.title": "Impressum",
  "impressum.subtitle": "Legal notice and disclosure according to § 5 DDG.",
  "impressum.section1.heading": "Information according to § 5 DDG",
  "impressum.address.street": "Jakobsplan 1",
  "impressum.address.zip": "99423 Weimar",
  "impressum.address.country": "Germany",
  "impressum.contact.heading": "Contact",
  "impressum.contact.phoneLabel": "Phone",
  "impressum.contact.phonePlaceholder": "+491639742175",
  "impressum.contact.emailLabel": "Email",
  "impressum.liabilityContent.heading": "Liability for Content",
  "impressum.liabilityContent.body": "As a service provider, I am responsible for my own content on these pages in accordance with general laws. However, I am not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.",
  "impressum.liabilityLinks.heading": "Liability for Links",
  "impressum.liabilityLinks.body": "My website contains links to external websites of third parties, on whose contents I have no influence. Therefore, I cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages.",
  "impressum.copyright.heading": "Copyright",
  "impressum.copyright.body": "The content and works created by the site operator on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of commercialization of such material beyond the scope of the copyright law require the prior written consent of its respective author or creator.",

  // Sitemap
  "sitemap.kicker": "Architecture",
  "sitemap.title": "Sitemap",
  "sitemap.subtitle": "Auto-generated from live route and project data. Updates automatically as new projects and pages are added.",
  "sitemap.stats.totalRoutes": "Total routes",
  "sitemap.stats.navPages": "Nav pages",
  "sitemap.stats.publishedProjects": "Published projects",
  "sitemap.stats.legalPages": "Legal pages",
  "sitemap.section.mainNav": "Main Navigation",
  "sitemap.section.credentials": "Credential Gallery",
  "sitemap.section.projectDetail": "Project Detail Pages — auto-generated from",
  "sitemap.section.legal": "Legal",
  "sitemap.show": "Show",
  "sitemap.hide": "Hide",
  "sitemap.subsections": "sub-sections",
  "sitemap.credentials.label": "Credentials",
  "sitemap.credentials.certGrid.label": "Certificate Grid",
  "sitemap.credentials.certGrid.desc": "Thumbnail cards with type & skill tags",
  "sitemap.credentials.lightbox.label": "Lightbox",
  "sitemap.credentials.lightbox.desc": "Full document preview + download",
  "sitemap.sections.hero.label": "Hero",
  "sitemap.sections.hero.desc": "Name, role, year",
  "sitemap.sections.aboutMe.label": "About Me",
  "sitemap.sections.aboutMe.desc": "Bio, photo, skills",
  "sitemap.sections.projectsIndex.label": "Projects",
  "sitemap.sections.projectsIndex.desc": "Snap-scroll project index",
  "sitemap.sections.bio.label": "Bio",
  "sitemap.sections.bio.desc": "Photo & intro",
  "sitemap.sections.bridge.label": "The Bridge",
  "sitemap.sections.bridge.desc": "Career arc: SE → QA → UX, skills grouped by era",
  "sitemap.sections.howIWork.label": "How I Work",
  "sitemap.sections.howIWork.desc": "4-step research process",
  "sitemap.sections.voluntaryWork.label": "Voluntary Work",
  "sitemap.sections.voluntaryWork.desc": "Mentorship & workshops",
  "sitemap.sections.workExperience.label": "Work Experience",
  "sitemap.sections.workExperience.desc": "With impact metrics",
  "sitemap.sections.portfolioHighlights.label": "Portfolio Highlights",
  "sitemap.sections.portfolioHighlights.desc": "3 projects with metrics",
  "sitemap.sections.skillsEduLang.label": "Skills / Education / Languages",
  "sitemap.sections.skillsEduLang.desc": "Sidebar",
  "sitemap.sections.saveAsPdf.label": "Save as PDF",
  "sitemap.sections.saveAsPdf.desc": "A4 print-optimised",
};

export default en;