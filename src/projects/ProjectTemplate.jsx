// Section headings follow one pattern: a border-t divider, a numbered
// kicker in primary-600, then a font-display heading in ink, matching the
// rhythm used elsewhere on the site. The process rail renders as a vertical
// numbered stepper (suits a research process better than a horizontal
// scroll rail, and reads naturally in the narrow content column below).
// Header tags render as a quiet, mid-dot-separated eyebrow line, and
// methods as a plain ink list, rather than chips. Metrics are font-display
// ink, with the kicker as the only coral accent.
//
// Layout is three tracks at xl+: a sticky section TOC, a capped-width prose
// column, and a right rail used for pull-quotes lifted out of the three
// long-form sections (Challenge/Solution/Methodology). Below xl the rail
// content simply doesn't render — it's a wide-screen enhancement, not new
// information (the same sentence already lives in the paragraph).
//
// The TOC collapses to an icon rail, and the content column's cap widens to
// match when it does — the freed 180-220px goes to the figures, which is the
// only reason to collapse a nav in the first place. The state is session-
// scoped (see template/useSessionState.js).
//
// Default export is ProjectTemplate({ meta, children }). All data comes
// from src/projects/*/<slug>.data.js. This file is only the composition layer:
// each building block lives in ./template/ (one concern per file — see
// template/constants.js for the folder's naming constraints).

import { useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionMedia from "./SectionMedia";
import { HandArrow } from "../components/HandArrow";
import { useTranslation } from "../context/LanguageContext";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { profileData as rawProfile } from "../data/profile";
import { projects as allProjects } from "../data/projects";

import {
  SECTIONS,
  PROSE_SECTIONS,
  VERBATIM_SECTIONS,
  DEFAULT_VERBATIM_SECTION,
} from "./template/constants";
import { ClampedText } from "./template/ClampedText";
import { ContentSection } from "./template/CollapsibleSection";
import { Prose } from "./template/Prose";
import { ProcessGallerySection } from "./template/ProcessGallery";
import { SidebarNav, MobilePillBar } from "./template/SectionNav";
import { MetricsStrip } from "./template/MetricsStrip";
import { DesignTokensPanel } from "./template/DesignTokensPanel";
import { VerbatimRail, VerbatimInline, VerbatimList } from "./template/Verbatims";
import { OutcomeBlock } from "./template/OutcomeBlock";
import { NotBuiltBlock } from "./template/NotBuiltBlock";
import { ResearchPhases } from "./template/ResearchPhases";
import { PrototypeLink } from "./template/PrototypeLink";
import { ProjectNavCard } from "./template/ProjectNavCard";
import { ProjectHeader } from "./template/ProjectHeader";
import { ProjectHero } from "./template/ProjectHero";
import { useSectionState } from "./template/useSectionState";
import { useScrollProgress } from "./template/useScrollProgress";
import { useSessionState } from "./template/useSessionState";

export default function ProjectTemplate({ meta: rawMeta, children }) {
  const { t } = useTranslation();
  const mainRef = useRef(null);

  const meta = useLocalizedProfile(rawMeta);
  const profileData = useLocalizedProfile(rawProfile);

  // The at-a-glance strip renders from whichever field is actually present,
  // rather than from a boolean. `resultsAtAGlance` is the per-project
  // override — its own title and its own items — for a case study whose
  // numbers are not study results; otherwise the strip falls back to
  // `metrics` under the default "Study at a Glance" heading. Absent both, it
  // renders nothing. This replaced a `resultsDetail` flag that was read as
  // `!== false`, i.e. opt-out: setting it to `true` did exactly what omitting
  // it did, so the flag could never actually turn the strip off for the one
  // project that set it, and a study-shaped heading sat above a set of
  // artefact counts. Presence of data is the gate now — there is no flag to
  // set truthfully and have nothing happen.
  const glance = meta.resultsAtAGlance;
  const glanceItems = glance?.items ?? meta.metrics;

  // Where participant quotes render. They are evidence, and which section
  // they are evidence *for* is a per-project judgement the data makes:
  // survey answers describing a broken process argue the Challenge, quotes
  // from a study that ran argue the Results. Unrecognised values fall back
  // rather than rendering nowhere — a typo in a data file must not silently
  // delete content, which is the whole failure mode this template keeps
  // relearning. Gated on the presence of `verbatims`, never on a flag.
  const hasVerbatims = meta.verbatims?.length > 0;
  const verbatimSection = VERBATIM_SECTIONS.includes(meta.verbatimsIn)
    ? meta.verbatimsIn
    : DEFAULT_VERBATIM_SECTION;
  const verbatimsIn = (id) => hasVerbatims && verbatimSection === id;

  const [navCollapsed, , toggleNav] = useSessionState("project-toc-collapsed", false);

  useDocumentMeta({
    title: `${meta.title} — ${profileData.name}`,
    description: meta.tagline || meta.challenge,
  });

  const activeSections = useMemo(
    () =>
      SECTIONS.filter((s) => {
        const value = meta[s.dataKey];
        const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
        if (s.id === "prototype") {
          return hasValue || !!meta.prototypeUrl || (meta.figures?.prototype?.length > 0);
        }
        // Results carries the outcome and not-built blocks too, so it stands
        // on any of the three. Keep this in sync with the render guard below.
        if (s.id === "results") {
          return hasValue || !!meta.outcome?.body || meta.notBuilt?.items?.length > 0;
        }
        return hasValue;
      }).map((s) => {
        // Per-project title override (meta.sectionTitles, localized by
        // useLocalizedProfile) — the sidebar and pill bar read `label`.
        const label = meta.sectionTitles?.[s.id]?.label;
        return label ? { ...s, label } : s;
      }),
    [meta]
  );

  // Section kicker/heading: the per-project override wins, the site-wide
  // translation key is the default. One resolver for every section so the
  // override mechanism cannot be half-wired for some heading and not another.
  const kickerFor = (id) => meta.sectionTitles?.[id]?.kicker || t(`project.${id}.kicker`);
  const headingFor = (id) => meta.sectionTitles?.[id]?.heading || t(`project.${id}.heading`);

  const {
    activeId,
    openSections,
    toggleSection,
    navigateToSection,
    allOpen,
    toggleAllSections,
    sectionNumber,
    staggerDelayFor,
  } = useSectionState(activeSections);

  const { scrollProgress, scrollY } = useScrollProgress(mainRef);

  const orderedProjects = useMemo(
    () => allProjects.filter((p) => p.status !== "coming-soon"),
    []
  );
  const currentIndex = orderedProjects.findIndex((p) => p.id === meta.id);
  const rawPrev = currentIndex > 0 ? orderedProjects[currentIndex - 1] : null;
  const rawNext =
    currentIndex >= 0 && currentIndex < orderedProjects.length - 1
      ? orderedProjects[currentIndex + 1]
      : null;
  const { prev: prevProject, next: nextProject } = useLocalizedProfile({ prev: rawPrev, next: rawNext });

  const methods = meta.methods || [];
  const tags = meta.tags || [];
  const hasHeroImage = !!meta.thumbnail;

  // Research Methods + Tech Stack. Home is the Methodology section; when a
  // project has no methodology prose (the portfolio case study dropped its
  // own), the block falls back into Prototype rather than silently holding
  // data nothing renders — `methods` is required by the data contract, so
  // "no methodology" must not mean "no methods anywhere".
  const methodsAndStack =
    ((methods && methods.length > 0) || (meta.techStack && meta.techStack.length > 0)) && (
      <div className="mt-8 flex flex-col gap-6 border-l-2 rule-l pl-5">

        {/* Research Methods */}
        {methods && methods.length > 0 && (
          <div>
            <span className="block font-mono text-2xs uppercase text-text-meta mb-2">
              {t("project.meta.methods")}
            </span>
            <div className="text-sm text-text-meta leading-relaxed">
              {methods.map((m, i, arr) => (
                <span key={m.en || m}>
                  <span className="font-medium text-text-meta">{m.en || m}</span>
                  {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {meta.techStack && meta.techStack.length > 0 && (
          <div>
            <span className="block font-mono text-2xs uppercase text-text-meta mb-2">
              {t("project.methodology.techStack")}
            </span>
            <div className="text-sm text-text-meta leading-relaxed">
              {meta.techStack.map((tech, i, arr) => (
                <span key={tech}>
                  <span className="font-medium text-text-meta">{tech}</span>
                  {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    );

  return (
    <div ref={mainRef} className="min-h-screen bg-bg pt-20 md:pt-24">
      {/* Scroll-progress bar — portaled to <body>, for two reasons that are
          really one. Rendered here it sat INSIDE the scroll container, and
          (a) its z-[70] only counted inside that container's own stacking
          context (`relative z-10` in App.jsx), which at the shell level is
          layer 10 entire — so the bar painted UNDERNEATH the opaque z-50
          header and was invisible on device, and (b) a position:fixed node
          inside iOS's async overflow scroller is exactly the layer type the
          engine repositions out of step with the content around it. At body
          level it is a plain viewport-fixed strip and its z-index means
          what it says. */}
      {createPortal(
        <motion.div
          aria-hidden="true"
          className="no-print fixed top-0 left-0 right-0 h-[5px] rule-stroke bg-primary origin-left z-[70]"
          style={{ scaleX: scrollProgress }}
        />,
        document.body
      )}

      {/* Hero photo — sticky parallax banner (see template/ProjectHero.jsx) */}
      {hasHeroImage && <ProjectHero meta={meta} scrollY={scrollY} />}

      {/* Content wrapper — solid bg + z-10 so it slides over the sticky banner */}
      <div className="relative z-10 w-full bg-bg pb-16 pt-8 md:pt-12">
        <div className="w-full px-4 md:px-8 max-w-wide mx-auto">
          <div className="flex items-start">
            {/* Widths are the collapse: the aside drops to a 56px rail and
                the content column's cap rises by roughly what the aside gave
                up. Hiding the nav without moving this cap would leave the
                reclaimed space empty, which is not reclaiming it. */}
            <aside
              className={`hidden md:block shrink-0 no-print sticky top-36 self-start
                          transition-[width,padding] duration-300 ease-smooth
                          ${navCollapsed
                            ? "w-14 pr-4"
                            : "w-[180px] lg:w-[220px] pr-8 lg:pr-10"}`}
            >
              <SidebarNav sections={activeSections} activeId={activeId}
                onNavigate={navigateToSection} allOpen={allOpen} onToggleAll={toggleAllSections}
                collapsed={navCollapsed} onToggleCollapsed={toggleNav} />
            </aside>

            <div
              className={`flex-1 min-w-0 md:border-l md:rule-l md:pl-8 lg:pl-10
                          transition-[max-width] duration-300 ease-smooth
                          ${navCollapsed ? "max-w-[1280px]" : "max-w-[1060px]"}`}
              /* The reading measure travels with the collapse. Widening the
                 column while every prose block stayed pinned to 68ch only grew
                 the empty gutter to its right, which is not reclaiming space.
                 Set once here; every prose block below reads it, with 68ch
                 as the fallback so the blocks still cap when rendered alone. */
              style={{ "--measure": navCollapsed ? "88ch" : "68ch" }}
            >
              <ProjectHeader meta={meta} tags={tags} />

              {/* Mobile pill bar */}
              <MobilePillBar sections={activeSections} activeId={activeId} onNavigate={navigateToSection} />

              {/* Deliberately NOT `isolate`: isolating this subtree while it
                  overlaps the composited pill bar made iOS composite the
                  ENTIRE article as one layer — a 17k-px tile set that
                  re-rasterized mid-scroll and showed stale ghost frames
                  ("two of everything", observed on-device). The layering fix
                  lives at the source instead: below md the sections animate
                  nothing that earns them a GPU layer (see ContentSection),
                  so there is no layer to hoist above the bar and no giant
                  layer to ghost. */}
              <article className="min-w-0">

              {meta.about && (
                <ContentSection id="about" number={sectionNumber("about")}
                  isOpen={openSections.has("about")} onToggle={() => toggleSection("about")}
                  staggerDelayMs={staggerDelayFor("about")}
                  kicker={kickerFor("about")} heading={headingFor("about")}>
                  <ClampedText className="max-w-measure transition-[max-width] duration-300 ease-smooth">
                    <p className="text-lg leading-relaxed about-project text-text">
                      {meta.about}
                    </p>
                  </ClampedText>
                </ContentSection>
              )}

              {/* Process gallery — replaces the hero image when present. Keep
                  this as one ternary: the two branches are alternatives for the
                  same slot, and splitting them into separate guards is how the
                  gallery branch went missing before. */}
              {meta.process && meta.process.length > 0 ? (
                <ProcessGallerySection items={meta.process} number={sectionNumber("process")}
                  isOpen={openSections.has("process")} onToggle={() => toggleSection("process")}
                  staggerDelayMs={staggerDelayFor("process")} />
              ) : meta.heroImage && !hasHeroImage && (
                <motion.div
                  className="photo-frame rule-frame-in text-text w-full aspect-video bg-muted mb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <img src={meta.heroImage} alt={meta.title}
                    className="w-full h-full object-cover contrast-110" />
                </motion.div>
              )}

              {/* Challenge, Solution and Design share one anatomy — heading,
                  prose, optional pull-quote, optional figure grid — so they
                  render from PROSE_SECTIONS rather than three near-identical
                  blocks. Adding the next one is a line in constants.js plus
                  two translation keys; it cannot be half-added, which is how
                  `design` came to sit in a data file rendering nothing.
                  Verbatims slot in after the prose and before the figures for
                  whichever section the data assigns them to. */}
              {PROSE_SECTIONS.map(({ id, textKey, quoteKey, rail }) =>
                meta[textKey] ? (
                  <ContentSection key={id} id={id} number={sectionNumber(id)}
                    isOpen={openSections.has(id)} onToggle={() => toggleSection(id)}
                    staggerDelayMs={staggerDelayFor(id)}
                    kicker={kickerFor(id)} heading={headingFor(id)}>
                    <Prose text={meta[textKey]} quote={meta[quoteKey]} rail={rail || !!meta[quoteKey]}>
                      {verbatimsIn(id) && <VerbatimList verbatims={meta.verbatims} />}
                      <SectionMedia items={meta.figures?.[id]} />
                    </Prose>
                  </ContentSection>
                ) : null
              )}

              {/* Design System — an intro paragraph over a compact token
                  panel whose values resolve from the live stylesheet, not
                  from a copy (see template/DesignTokensPanel.jsx). Sits
                  between the prose sections and Prototype to match its
                  position in SECTIONS. */}
              {meta.designSystem && (
                <ContentSection id="designSystem" number={sectionNumber("designSystem")}
                  isOpen={openSections.has("designSystem")} onToggle={() => toggleSection("designSystem")}
                  staggerDelayMs={staggerDelayFor("designSystem")}
                  kicker={kickerFor("designSystem")} heading={headingFor("designSystem")}>
                  <Prose text={meta.designSystem}>
                    <DesignTokensPanel />
                  </Prose>
                </ContentSection>
              )}

              {(meta.prototype || meta.prototypeUrl || (meta.figures?.prototype?.length > 0)) && (
                <ContentSection id="prototype" number={sectionNumber("prototype")}
                  isOpen={openSections.has("prototype")} onToggle={() => toggleSection("prototype")}
                  staggerDelayMs={staggerDelayFor("prototype")}
                  kicker={kickerFor("prototype")} heading={headingFor("prototype")}>
                  {meta.prototype && (
                    <ClampedText className="max-w-measure transition-[max-width] duration-300 ease-smooth">
                      <p className="text-lg leading-[1.7] text-text">
                        {meta.prototype}
                      </p>
                    </ClampedText>
                  )}

                  {meta.prototypeUrl && (
                    <PrototypeLink
                      href={meta.prototypeUrl}
                      label={meta.prototypeUrlLabel || t("project.prototype.openLink")}
                    />
                  )}

                  <SectionMedia items={meta.figures?.prototype} />

                  {/* Fallback home for Methods + Tech Stack when there is no
                      Methodology section to carry them (see methodsAndStack). */}
                  {!meta.methodology && methodsAndStack}
                </ContentSection>
              )}

              {/* Accessibility statement — prose only, same anatomy as the
                  other sections. Position matches its SECTIONS entry:
                  after Prototype, before Methodology/Results. */}
              {meta.accessibility && (
                <ContentSection id="accessibility" number={sectionNumber("accessibility")}
                  isOpen={openSections.has("accessibility")} onToggle={() => toggleSection("accessibility")}
                  staggerDelayMs={staggerDelayFor("accessibility")}
                  kicker={kickerFor("accessibility")} heading={headingFor("accessibility")}>
                  <Prose text={meta.accessibility} />
                </ContentSection>
              )}

              {meta.methodology && (
                <ContentSection id="methodology" number={sectionNumber("methodology")}
                  isOpen={openSections.has("methodology")} onToggle={() => toggleSection("methodology")}
                  staggerDelayMs={staggerDelayFor("methodology")}
                  kicker={kickerFor("methodology")} heading={headingFor("methodology")}>
                  <Prose text={meta.methodology} quote={meta.methodologyQuote} rail>
                    <SectionMedia items={meta.figures?.methodology} />

                    {/* Research Methods + Tech Stack */}
                    {methodsAndStack}

                  </Prose>
                </ContentSection>
              )}

              {(meta.results || meta.outcome?.body || meta.notBuilt?.items?.length > 0) && (
                <ContentSection id="results" number={sectionNumber("results")}
                  isOpen={openSections.has("results")} onToggle={() => toggleSection("results")}
                  staggerDelayMs={staggerDelayFor("results")}
                  kicker={kickerFor("results")} heading={headingFor("results")}>
                  {/* `metrics` always stays in the data even when the strip here
                      renders from `resultsAtAGlance` instead — the project card
                      reads `metrics` for its own "Impact at a glance" row. The
                      two surfaces are allowed to show different numbers: the
                      card counts artefacts, this strip reports measurements. */}
                  <div className={verbatimsIn("results") ? "xl:grid xl:grid-cols-[1fr_240px] xl:gap-10 items-start" : ""}>
                    <div className="max-w-measure transition-[max-width] duration-300 ease-smooth">
                      {/* Gated on the items the strip below actually renders,
                          not on `metrics`, so the notice can never describe a
                          strip the reader isn't looking at. */}
                      {glanceItems?.some((m) => m.pending) && (
                        <p className="mb-6 border-l-2 rule-l pl-4 text-sm text-text-meta leading-relaxed">
                          {t("project.results.pendingNotice")}
                        </p>
                      )}
                      {meta.results && (
                        <ClampedText>
                          <p className="text-lg leading-[1.7] text-text">
                            {meta.results}
                          </p>
                        </ClampedText>
                      )}
                      <SectionMedia items={meta.figures?.results} />

                      <MetricsStrip metrics={glanceItems} title={glance?.title}
                        intro={meta.metricsIntro} />

                      {verbatimsIn("results") && <VerbatimInline verbatims={meta.verbatims} />}
                    </div>
                    {verbatimsIn("results") && <VerbatimRail verbatims={meta.verbatims} />}
                  </div>

                  {/* Limits first, then outcome: what was deliberately not
                      built qualifies the results above it, and reads as a
                      caveat rather than an afterthought when it precedes the
                      closing outcome rather than trailing it. */}
                  <NotBuiltBlock notBuilt={meta.notBuilt} />

                  <OutcomeBlock outcome={meta.outcome} />
                </ContentSection>
              )}

              {meta.implications && (
                <ContentSection id="implications" number={sectionNumber("implications")}
                  isOpen={openSections.has("implications")} onToggle={() => toggleSection("implications")}
                  staggerDelayMs={staggerDelayFor("implications")}
                  kicker={kickerFor("implications")} heading={headingFor("implications")}>
                  <ClampedText className="max-w-measure transition-[max-width] duration-300 ease-smooth">
                    <p className="text-lg leading-[1.7] text-text">
                      {meta.implications}
                    </p>
                  </ClampedText>
                </ContentSection>
              )}

              {meta.phases && meta.phases.length > 0 && (
                <ResearchPhases
                  phases={meta.phases}
                  intro={meta.phasesIntro}
                  number={sectionNumber("phases")}
                  isOpen={openSections.has("phases")}
                  onToggle={() => toggleSection("phases")}
                  staggerDelayMs={staggerDelayFor("phases")}
                />
              )}

              {meta.conclusion && (
                <ContentSection id="conclusion" number={sectionNumber("conclusion")}
                  isOpen={openSections.has("conclusion")} onToggle={() => toggleSection("conclusion")}
                  staggerDelayMs={staggerDelayFor("conclusion")}
                  kicker={kickerFor("conclusion")} heading={headingFor("conclusion")}>
                  <SectionMedia items={meta.conclusion} />
                </ContentSection>
              )}

              {/* Escape hatch for per-project custom content */}
              {children}

              {/* Prev / next — lateral navigation instead of a dead end */}
              {(prevProject || nextProject) && (
                <nav
                  aria-label={t("project.nav.label")}
                  className="pt-10 mt-10 border-t rule-t grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {prevProject ? <ProjectNavCard project={prevProject} direction="prev" /> : <div aria-hidden="true" />}
                  {nextProject && <ProjectNavCard project={nextProject} direction="next" />}
                </nav>
              )}

              {/* Footer back link */}
              <div className="pt-10 border-t rule-t">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-2xs font-black uppercase
                             text-text-meta hover:text-primary-600
                             transition-colors duration-200 group"
                >
                  <HandArrow direction="back" className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
                  {t("project.footer.back")}
                </Link>
              </div>

              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
