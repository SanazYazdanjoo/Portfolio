// src/pages/Sitemap.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { profileData } from "../data/profile";
import { projects } from "../data/projects";
import { ScribbleUnderline } from "../components/DoodleLibrary";

// ─── Static route tree ────────────────────────────────────────────────────────
// Top-level routes are pulled from profileData.navLinks automatically.
// Sub-routes and legal pages are defined here — update as you add new pages.
const STATIC_SECTIONS = {
  "/": [
    { label: "Hero", description: "Name, role, year" },
    { label: "About Me", description: "Bio, photo, skills" },
    { label: "Projects", description: "Snap-scroll project index" },
  ],
  "/about": [
    { label: "Bio + Skills", description: "Research, Design, Technical columns" },
    { label: "The Bridge", description: "Career arc: SE → QA → UX" },
    { label: "How I Work", description: "4-step research process" },
    { label: "Voluntary Work", description: "Mentorship & workshops" },
  ],
  "/projects": [], // children generated dynamically from projects data
  "/cv": [
    { label: "Work Experience", description: "With impact metrics" },
    { label: "Portfolio Highlights", description: "3 projects with metrics" },
    { label: "Skills / Education / Languages", description: "Sidebar" },
    { label: "Save as PDF", description: "A4 print-optimised" },
  ],
  "/contact": [],
};

const LEGAL_ROUTES = [
  { path: "/impressum", label: "Impressum" },
  { path: "/privacy", label: "Privacy Policy" },
];

const PROJECT_SECTIONS = [
  "Challenge",
  "Solution",
  "Methodology",
  "Results",
  "Implications",
];

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

// ─── Single route node ────────────────────────────────────────────────────────
function RouteNode({ path, label, description, children, index, isActive }) {
  const [open, setOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="border-l-2 border-border/30 pl-5 mb-3"
    >
      {/* Route row */}
      <div className="flex items-start gap-3 group">
        {/* Dot on the timeline */}
        <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 -ml-[25px] mr-3 border-2
          ${isActive ? "bg-primary border-primary" : "bg-bg border-primary/40 group-hover:border-primary"}`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-3">
            {/* Path */}
            <Link
              to={path}
              className="font-black text-xs text-primary hover:underline underline-offset-4 tracking-widest uppercase"
            >
              {path}
            </Link>
            {/* Label */}
            <span className="font-semibold text-sm text-text/80">{label}</span>
            {/* Description */}
            {description && (
              <span className="text-[11px] text-text/40">{description}</span>
            )}
          </div>

          {/* Children toggle */}
          {hasChildren && (
            <button
              onClick={() => setOpen(p => !p)}
              className="mt-2 text-[9px] font-black uppercase tracking-widest text-primary/50
                         hover:text-primary transition-colors flex items-center gap-1"
            >
              <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
                ▶
              </motion.span>
              {open ? "Hide" : "Show"} {children.length} sub-section{children.length !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      </div>

      {/* Sub-sections */}
      {hasChildren && open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 ml-4 space-y-2"
        >
          {children.map((child, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-primary/30 text-[10px] mt-0.5 shrink-0">└</span>
              <div>
                <span className="text-[11px] font-bold text-text/70">{child.label}</span>
                {child.description && (
                  <span className="text-[10px] text-text/35 ml-2">{child.description}</span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Sitemap() {
  // Build the main nav routes from profileData — stays in sync automatically
  const mainRoutes = profileData.navLinks.map((link) => {
    const path = link.path;
    const sections = STATIC_SECTIONS[path] || [];

    // Inject dynamic project children under /projects
    const children = path === "/projects"
      ? projects.map((p) => ({
          label: p.title,
          description: p.role,
          subItems: PROJECT_SECTIONS,
        }))
      : sections;

    return { path, label: link.name, children };
  });

  // Dynamic project detail routes
  const projectRoutes = projects.map((p) => ({
    path: `/projects/${p.id}`,
    label: p.title,
    description: p.role,
    children: PROJECT_SECTIONS.map((s) => ({ label: s })),
  }));

  // Stats
  const totalRoutes = mainRoutes.length + projectRoutes.length + LEGAL_ROUTES.length;
  const totalProjects = projects.filter(p => p.status !== "coming-soon").length;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-bg">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Header */}
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2">
            Architecture
          </p>
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-6xl font-black text-text tracking-tighter">
              Sitemap<span className="text-primary">.</span>
            </h1>
            <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-4 text-primary opacity-60" />
          </div>
          <p className="text-sm text-text/45 mt-6">
            Auto-generated from live route and project data.
            Updates automatically as new projects and pages are added.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mt-8 pt-6 border-t border-border/20">
            {[
              { value: totalRoutes, label: "Total routes" },
              { value: mainRoutes.length, label: "Nav pages" },
              { value: totalProjects, label: "Published projects" },
              { value: LEGAL_ROUTES.length, label: "Legal pages" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-black text-2xl text-primary leading-none">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-widest text-text/40 font-semibold mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.header>

        {/* ── Main navigation routes ── */}
        <section className="mb-12">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">
            Main Navigation
          </p>
          {mainRoutes.map((route, i) => (
            <RouteNode
              key={route.path}
              index={i}
              path={route.path}
              label={route.label}
              children={route.children}
            />
          ))}
        </section>

        {/* ── Project detail routes (dynamic) ── */}
        <section className="mb-12">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">
            Project Detail Pages — auto-generated from{" "}
            <code className="text-[9px] bg-primary/8 px-1.5 py-0.5 text-primary">
              src/projects/**/data.js
            </code>
          </p>
          {projectRoutes.map((route, i) => (
            <RouteNode
              key={route.path}
              index={i}
              path={route.path}
              label={route.label}
              description={route.description}
              children={route.children}
            />
          ))}
        </section>

        {/* ── Legal routes ── */}
        <section>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">
            Legal
          </p>
          {LEGAL_ROUTES.map((route, i) => (
            <RouteNode
              key={route.path}
              index={i}
              path={route.path}
              label={route.label}
            />
          ))}
        </section>

      </div>
    </main>
  );
}