// src/data/profile.js
export const profileData = {
  // --- Navigation & Global Config ---
  navLinks: [
    { name : "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "CV", path: "/cv" },
    { name: "Contact", path: "/contact" }
  ],
  author: "Sanaz Yazdanjoo",

  // --- Personal Info ---
  name: "Sanaz Yazdanjoo",
  role: "UX Researcher",
  year: "2026",

  contact: {
    location: "Weimar, Germany",
    phone: "+49 1639742175",
    email: "sanaz.yazdanjoo@gmail.com",
    linkedin: "https://linkedin.com/in/sanaz",
    linkedinHandle: "linkedin.com/in/sanaz",
    github: "https://github.com/sanaz",
    githubHandle: "github.com/sanaz"
  },

  // --- Work Experience ---
  // Rule: Lead with OUTCOME, follow with METHOD. Numbers first where possible.
  experience: [
    {
      company: "deskbird Co. + Bauhaus University of Weimar",
      role: "UX Researcher (Research Project)",
      date: "10/2023 – 03/2024",
      impactMetrics: ["50 survey participants", "6 contextual inquiries", "4 stakeholder interviews"],
      tasks: [
        "Shaped MVP scope through 4 stakeholder interviews that surfaced 3 critical feature gaps, directly informing prototype direction.",
        "Ran mixed-methods research with 50 survey respondents and 6 remote contextual inquiries, generating the core insight dataset for feature design.",
        "Translated research findings into storyboards and high-fidelity Figma prototypes, accelerating stakeholder sign-off on the social features roadmap.",
        "Delivered usability-validated prototypes to stakeholders, achieving documented alignment on UX improvements at final presentation."
      ]
    },
    {
      company: "Bauhaus University of Weimar",
      role: "Web Designer & Content Manager (Scientific Assistant)",
      date: "04/2023 – 09/2023",
      impactMetrics: ["2 homepages redesigned", "Typo3 CMS"],
      tasks: [
        "Redesigned 2 department homepages using existing design system components, reducing visual inconsistency across the faculty web presence.",
        "Maintained and improved departmental websites in Typo3, ensuring content structure remained navigable and up-to-date."
      ]
    },
    {
      company: "TDSoftware Co.",
      role: "QA Engineer (Working Student)",
      date: "04/2022 – 06/2022",
      impactMetrics: ["Critical defects reported", "Test automation introduced"],
      tasks: [
        "Identified and documented critical usability and functionality defects, directly contributing to product stability before release.",
        "Expanded test coverage by introducing automated test scripts alongside systematic manual test execution."
      ]
    },
    {
      company: "Part Financial Data Processing Co.",
      role: "QA Engineer (Full Time)",
      date: "08/2020 – 08/2021",
      impactMetrics: ["5 agile projects", "1st company bug-tracking system", "Organisation-wide QA process"],
      tasks: [
        "Founded the acceptance testing function from scratch and built the company's first bug-tracking system, reducing recurring defect cycles.",
        "Embedded QA into sprint cycles across 5 agile projects, improving product usability delivery consistency.",
        "Authored comprehensive test plans and scenarios that standardised QA processes organisation-wide."
      ]
    },
    {
      company: "MegaTech Co.",
      role: "Frontend Developer & QA (Full Time)",
      date: "01/2016 – 08/2019",
      impactMetrics: ["20+ websites delivered", "Cross-browser QA", "Client training programme"],
      tasks: [
        "Delivered 20+ client websites end-to-end using HTML, CSS, JavaScript, Bootstrap, and WordPress.",
        "Reduced post-launch UI issues by systematically applying cross-browser testing and usability reviews during development.",
        "Reduced client support load through structured CMS training, empowering clients to self-manage web content."
      ]
    }
  ],

  // --- Portfolio Highlights (CV-optimised, with real metrics) ---
  portfolioHighlights: [
    {
      id: "project-1",
      title: "Gaze-Assisted Input in Dual-Display Environments",
      type: "Quantitative UX · Eye-Tracking · Python",
      metrics: [
        { value: "N=30", label: "within-subject experiment" },
        { value: "SUS 85.2", label: "Mouse baseline" },
        { value: "SUS 72.6", label: "Ninja Cursors condition" }
      ],
      summary: "Engineered a real-time gaze pipeline (Pupil Labs Neon + Python) and ran a controlled experiment comparing MAGIC Pointing and Ninja Cursors against a mouse baseline. Key finding: gaze assistance should trigger conditionally for large cross-screen relocations only."
    },
    {
      id: "project-2",
      title: "UCD4UX: Social Interactions in Hybrid Work",
      type: "User-Centered Design · Mixed Methods · Figma",
      metrics: [
        { value: "50", label: "survey respondents" },
        { value: "6", label: "contextual inquiries" },
        { value: "4", label: "stakeholder interviews" }
      ],
      summary: "Led end-to-end UX research for a social features concept on the deskbird platform. Achieved positive usability evaluation and full stakeholder alignment on the feature roadmap."
    },
    {
      id: "project-3",
      title: "EmbraceMe – Inflatable Human-Robot for Emotional Care",
      type: "HRI · Soft Robotics · Arduino · Affective Computing",
      metrics: [
        { value: "Public", label: "exhibition debut" },
        { value: "Repeatable", label: "pneumatic actuation" }
      ],
      summary: "Designed and built an inflatable soft-robotic hugging system using Arduino-controlled pneumatic actuators and capacitive sensors, demonstrated publicly with documented positive affective responses."
    }
  ],

  // --- Education ---
  education: [
    {
      school: "Bauhaus University of Weimar",
      degree: "MSc. Human-Computer Interaction",
      year: "2024 – 2026",
      awards: ["Dean's List 2025"]
    },
    {
      school: "Khayyam University of Mashhad",
      degree: "BE. Software Engineering",
      year: "2010 – 2015"
    }
  ],

  // --- Skills ---
  skills: {
    "Research": ["Qualitative Interviews", "Contextual Inquiry", "Survey Design", "Usability Testing", "Quantitative Analysis"],
    "Design": ["Design Thinking", "Wireframes & Prototypes", "User Flows", "Style Guides", "Behavioral Design"],
    "Technical": ["HTML / CSS / JS", "Python", "Bootstrap", "React", "CMS (WordPress, Typo3)", "Arduino"],
    "QA & Testing": ["Usability", "Functional", "Exploratory", "Regression", "API", "Blackbox"],
    "Tools": ["Figma", "FigJam", "Miro", "Jira", "Postman", "MySQL", "Selenium", "Google Analytics"]
  },

  languages: [
    { name: "English", level: "Professional Working" },
    { name: "German", level: "Limited Working" },
    { name: "French", level: "Elementary" }
  ],

  certifications: [
    { title: "Google UX Design Certificate", provider: "Google", year: "2025" },
    { title: "Python Programming", provider: "I.R.T.V.T.O", year: "2024" }
  ],

  bio: "I bridge the gap between complex human behavior and technical system design. As a UX Researcher with an Engineering foundation, I use qualitative data and behavioral design to build products that are both technically sound and deeply intuitive. Currently pursuing my MSc in HCI at Bauhaus University of Weimar, I am passionate about creating evidence-based interfaces that solve real-world interaction challenges.",
  heroImage: "/assets/hero-portfolio.png",
  aboutImage: "/assets/me.png",
  doodles: {
    logo: "/assets/logo.png",
    flower: "/assets/flower-doodle.svg",
    aboutMe: "/assets/about-me-doodle.png",
    caseStudies: "/assets/case-studies-doodle.png",
    contact: "/assets/contact-doodle.png"
  }
};