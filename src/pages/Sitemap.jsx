import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
import { projects } from "../data/projects";
import { ScribbleUnderline } from "../components/DoodleLibrary";
import { useTranslation } from "../context/LanguageContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// Static route tree. Top-level routes are pulled from profileData.navLinks
// automatically; sub-routes and legal pages are defined here. Labels/
// descriptions are translation keys, resolved at render time via t().
const STATIC_SECTIONS = {
  "/": [
    { labelKey: "sitemap.sections.hero.label", descKey: "sitemap.sections.hero.desc" },
    { labelKey: "sitemap.sections.aboutMe.label", descKey: "sitemap.sections.aboutMe.desc" },
    { labelKey: "sitemap.sections.projectsIndex.label", descKey: "sitemap.sections.projectsIndex.desc" },
  ],
  "/about": [
    { labelKey: "sitemap.sections.bio.label", descKey: "sitemap.sections.bio.desc" },
    { labelKey: "sitemap.sections.bridge.label", descKey: "sitemap.sections.bridge.desc" },
    { labelKey: "sitemap.sections.howIWork.label", descKey: "sitemap.sections.howIWork.desc" },
    { labelKey: "sitemap.sections.voluntaryWork.label", descKey: "sitemap.sections.voluntaryWork.desc" },
  ],
  "/projects": [], // children generated dynamically from projects data
  "/cv": [
    { labelKey: "sitemap.sections.workExperience.label", descKey: "sitemap.sections.workExperience.desc" },
    { labelKey: "sitemap.sections.portfolioHighlights.label", descKey: "sitemap.sections.portfolioHighlights.desc" },
    { labelKey: "sitemap.sections.skillsEduLang.label", descKey: "sitemap.sections.skillsEduLang.desc" },
    { labelKey: "sitemap.sections.saveAsPdf.label", descKey: "sitemap.sections.saveAsPdf.desc" },
  ],
  "/contact": [],
};

// /credentials isn't in profileData.navLinks (five nav items is the ceiling),
// so it's never picked up by the mainRoutes loop below like the sections
// above — it gets its own standalone entry, rendered the same way as the
// legal routes.
const CREDENTIALS_ROUTE = {
  path: "/credentials",
  labelKey: "sitemap.credentials.label",
  children: [
    { labelKey: "sitemap.credentials.certGrid.label", descKey: "sitemap.credentials.certGrid.desc" },
    { labelKey: "sitemap.credentials.lightbox.label", descKey: "sitemap.credentials.lightbox.desc" },
  ],
};

const LEGAL_ROUTES = [
  { path: "/impressum", labelKey: "footer.impressum" },
  { path: "/privacy", labelKey: "footer.privacy" },
];

// Same mapping Nav.jsx uses — profileData.navLinks[].name is English-only,
// so route labels are resolved through translation keys instead.
const NAV_LABEL_KEYS = {
  "/": "nav.home",
  "/projects": "nav.projects",
  "/about": "nav.about",
  "/contact": "nav.contact",
  "/cv": "nav.cv",
  "/designsystem": "nav.designSystem",
};

const PROJECT_SECTION_KEYS = [
  "project.sidebar.challenge",
  "project.sidebar.solution",
  "project.sidebar.methodology",
  "project.sidebar.results",
  "project.sidebar.implications",
];

// Animation
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

// Single route node
function RouteNode({ path, label, description, children, index, isActive }) {
  const { t } = useTranslation();
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
              <span className="text-[11px] text-dim">{description}</span>
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
              {open ? t("sitemap.hide") : t("sitemap.show")} {children.length} {t("sitemap.subsections")}
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

// Page
export default function Sitemap() {
  const { t } = useTranslation();
  const profileData = useLocalizedProfile(rawProfile);
  const localizedProjects = useLocalizedProfile(projects);
  const projectSectionLabels = PROJECT_SECTION_KEYS.map((k) => t(k));

  useDocumentMeta({
    title: `${t("sitemap.title")} — ${profileData.name}`,
    description: t("sitemap.subtitle"),
  });

  // Build the main nav routes from profileData — stays in sync automatically
  const mainRoutes = profileData.navLinks.map((link) => {
    const path = link.path;
    const sections = (STATIC_SECTIONS[path] || []).map((s) => ({
      label: t(s.labelKey),
      description: t(s.descKey),
    }));

    // Inject dynamic project children under /projects
    const children = path === "/projects"
      ? localizedProjects.map((p) => ({
          label: p.title,
          description: p.role,
          subItems: projectSectionLabels,
        }))
      : sections;

    const label = NAV_LABEL_KEYS[path] ? t(NAV_LABEL_KEYS[path]) : link.name;
    return { path, label, children };
  });

  // Dynamic project detail routes
  const projectRoutes = localizedProjects.map((p) => ({
    path: `/projects/${p.id}`,
    label: p.title,
    description: p.role,
    children: projectSectionLabels.map((label) => ({ label })),
  }));

  const legalRoutes = LEGAL_ROUTES.map((r) => ({ path: r.path, label: t(r.labelKey) }));
  const credentialsRoute = {
    path: CREDENTIALS_ROUTE.path,
    label: t(CREDENTIALS_ROUTE.labelKey),
    children: CREDENTIALS_ROUTE.children.map((c) => ({
      label: t(c.labelKey),
      description: t(c.descKey),
    })),
  };

  // Stats
  const totalRoutes = mainRoutes.length + projectRoutes.length + legalRoutes.length + 1; // +1 for /credentials
  const totalProjects = localizedProjects.filter(p => p.status !== "coming-soon").length;

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-24 bg-bg">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">

        {/* Header */}
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary mb-2">
            {t("sitemap.kicker")}
          </p>
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-6xl font-black text-text tracking-tighter">
              {t("sitemap.title")}<span className="text-primary">.</span>
            </h1>
            <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-4 text-primary opacity-60" />
          </div>
          <p className="text-sm text-text-meta mt-6">
            {t("sitemap.subtitle")}
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mt-8 pt-6 border-t border-border/20">
            {[
              { value: totalRoutes, label: t("sitemap.stats.totalRoutes") },
              { value: mainRoutes.length, label: t("sitemap.stats.navPages") },
              { value: totalProjects, label: t("sitemap.stats.publishedProjects") },
              { value: legalRoutes.length, label: t("sitemap.stats.legalPages") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-black text-2xl text-primary leading-none">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-widest text-dim font-semibold mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.header>

        {/* Main navigation routes */}
        <section className="mb-12">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">
            {t("sitemap.section.mainNav")}
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

        {/* Credentials — standalone, not part of primary nav */}
        <section className="mb-12">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">
            {t("sitemap.section.credentials")}
          </p>
          <RouteNode
            index={0}
            path={credentialsRoute.path}
            label={credentialsRoute.label}
            children={credentialsRoute.children}
          />
        </section>

        {/* Project detail routes (dynamic) */}
        <section className="mb-12">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">
            {t("sitemap.section.projectDetail")}{" "}
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

        {/* Legal routes */}
        <section>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-6">
            {t("sitemap.section.legal")}
          </p>
          {legalRoutes.map((route, i) => (
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