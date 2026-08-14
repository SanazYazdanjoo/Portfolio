// Shared template config. EASE is the one easing curve every template
// animation uses. SECTIONS is the fixed content model: the ids the sidebar
// TOC, the mobile pill bar and the section renderers all resolve against.
//
// NOTE: this folder must never contain an `index.jsx` or a `data.js` —
// main.jsx auto-routes `src/projects/*/index.jsx` and src/data/projects.js
// auto-discovers `src/projects/*/data.js`, so either name would make the
// template folder register as a project.

export const EASE = [0.22, 0.61, 0.36, 1];

// Content section definitions. `labelKey` drives the sidebar/mobile-pill text (short form).
export const SECTIONS = [
  { id: "about",        labelKey: "project.sidebar.about",        dataKey: "about"        },
  { id: "process",      labelKey: "project.sidebar.process",      dataKey: "process"      },
  { id: "challenge",    labelKey: "project.sidebar.challenge",    dataKey: "challenge"    },
  { id: "solution",     labelKey: "project.sidebar.solution",     dataKey: "solution"     },
  { id: "prototype",    labelKey: "project.sidebar.prototype",    dataKey: "prototype"    },
  { id: "methodology",  labelKey: "project.sidebar.methodology",  dataKey: "methodology"  },
  { id: "results",      labelKey: "project.sidebar.results",      dataKey: "results"      },
  { id: "implications", labelKey: "project.sidebar.implications", dataKey: "implications" },
  { id: "phases",       labelKey: "project.sidebar.status",       dataKey: "phases"       },
  { id: "conclusion",   labelKey: "project.sidebar.conclusion",   dataKey: "conclusion"   },
];
