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
// Default export is ProjectTemplate({ meta, children }). All data comes
// from src/projects/*/data.js. This file is only the composition layer:
// each building block lives in ./template/ (one concern per file — see
// template/constants.js for the folder's naming constraints).

import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionMedia from "./SectionMedia";
import { useTranslation } from "../context/LanguageContext";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { profileData as rawProfile } from "../data/profile";
import { projects as allProjects } from "../data/projects";

import { SECTIONS } from "./template/constants";
import { ClampedText } from "./template/ClampedText";
import { ContentSection } from "./template/CollapsibleSection";
import { Prose } from "./template/Prose";
import { ProcessGallerySection } from "./template/ProcessGallery";
import { SidebarNav, MobilePillBar } from "./template/SectionNav";
import { MetricsStrip } from "./template/MetricsStrip";
import { VerbatimRail, VerbatimInline } from "./template/Verbatims";
import { OutcomeBlock } from "./template/OutcomeBlock";
import { ResearchPhases } from "./template/ResearchPhases";
import { PrototypeLink } from "./template/PrototypeLink";
import { ProjectNavCard } from "./template/ProjectNavCard";
import { ProjectHeader } from "./template/ProjectHeader";
import { ProjectHero } from "./template/ProjectHero";
import { useSectionState } from "./template/useSectionState";
import { useScrollProgress } from "./template/useScrollProgress";

export default function ProjectTemplate({ meta: rawMeta, children }) {
  const { t } = useTranslation();
  const mainRef = useRef(null);

  const meta = useLocalizedProfile(rawMeta);
  const profileData = useLocalizedProfile(rawProfile);

  // Opt-out, not opt-in: every existing project keeps its metrics strip and
  // participant quotes without touching its data.js.
  const showResultsDetail = meta.resultsDetail !== false;

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
        // Results carries the outcome block, so it stands on either one.
        if (s.id === "results") {
          return hasValue || !!meta.outcome?.body;
        }
        return hasValue;
      }),
    [meta]
  );

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

  return (
    <main ref={mainRef} className="min-h-screen bg-bg pt-20 md:pt-24">
      {/* Scroll-progress bar */}
      <motion.div
        aria-hidden="true"
        className="no-print fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[70]"
        style={{ scaleX: scrollProgress }}
      />

      {/* Hero photo — Sticky Parallax Implementation */}
      {hasHeroImage && <ProjectHero meta={meta} scrollY={scrollY} />}

      {/* Main Content Wrapper — Added solid bg and z-10 so it slides OVER the sticky banner */}
      <div className="relative z-10 w-full bg-bg pb-16 pt-8 md:pt-12">
        <div className="w-full px-4 md:px-8 max-w-[1500px] mx-auto">
          <div className="flex items-start">
            <aside className="hidden md:block w-[180px] lg:w-[220px] shrink-0 no-print sticky top-36 self-start pr-8 lg:pr-10">
              <SidebarNav sections={activeSections} activeId={activeId}
                onNavigate={navigateToSection} allOpen={allOpen} onToggleAll={toggleAllSections} />
            </aside>

            <div className="flex-1 min-w-0 max-w-[1060px] md:border-l md:border-border md:pl-8 lg:pl-10">
              <ProjectHeader meta={meta} tags={tags} />

              {/* Mobile pill bar */}
              <MobilePillBar sections={activeSections} activeId={activeId} onNavigate={navigateToSection} />

              <article className="min-w-0">

              {meta.about && (
                <ContentSection id="about" number={sectionNumber("about")}
                  isOpen={openSections.has("about")} onToggle={() => toggleSection("about")}
                  staggerDelayMs={staggerDelayFor("about")}
                  kicker={t("project.about.kicker")} heading={t("project.about.heading")}>
                  <ClampedText className="max-w-[68ch]">
                    <p className="text-[17px] leading-relaxed about-project text-text/90">
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
                  className="photo-frame text-text w-full aspect-video bg-muted mb-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <img src={meta.heroImage} alt={meta.title}
                    className="w-full h-full object-cover contrast-110" />
                </motion.div>
              )}

              {meta.challenge && (
                <ContentSection id="challenge" number={sectionNumber("challenge")}
                  isOpen={openSections.has("challenge")} onToggle={() => toggleSection("challenge")}
                  staggerDelayMs={staggerDelayFor("challenge")}
                  kicker={t("project.challenge.kicker")} heading={t("project.challenge.heading")}>
                  <Prose text={meta.challenge} quote={meta.challengeQuote} rail>
                    <SectionMedia items={meta.figures?.challenge} />
                  </Prose>
                </ContentSection>
              )}

              {meta.solution && (
                <ContentSection id="solution" number={sectionNumber("solution")}
                  isOpen={openSections.has("solution")} onToggle={() => toggleSection("solution")}
                  staggerDelayMs={staggerDelayFor("solution")}
                  kicker={t("project.solution.kicker")} heading={t("project.solution.heading")}>
                  <Prose text={meta.solution} quote={meta.solutionQuote} rail>
                    <SectionMedia items={meta.figures?.solution} />
                  </Prose>
                </ContentSection>
              )}

              {(meta.prototype || meta.prototypeUrl || (meta.figures?.prototype?.length > 0)) && (
                <ContentSection id="prototype" number={sectionNumber("prototype")}
                  isOpen={openSections.has("prototype")} onToggle={() => toggleSection("prototype")}
                  staggerDelayMs={staggerDelayFor("prototype")}
                  kicker={t("project.prototype.kicker")} heading={t("project.prototype.heading")}>
                  {meta.prototype && (
                    <ClampedText className="max-w-[68ch]">
                      <p className="text-[17px] leading-[1.7] text-text/90">
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
                </ContentSection>
              )}

              {meta.methodology && (
                <ContentSection id="methodology" number={sectionNumber("methodology")}
                  isOpen={openSections.has("methodology")} onToggle={() => toggleSection("methodology")}
                  staggerDelayMs={staggerDelayFor("methodology")}
                  kicker={t("project.methodology.kicker")} heading={t("project.methodology.heading")}>
                  <Prose text={meta.methodology} quote={meta.methodologyQuote} rail>
                    <SectionMedia items={meta.figures?.methodology} />

                    {/* Research Methods and Tech Stack relocated here side by side */}
                    {((methods && methods.length > 0) || (meta.techStack && meta.techStack.length > 0)) && (
                      <div className="mt-8 flex flex-col gap-6 border-l-2 border-border pl-5">

                        {/* Research Methods */}
                        {methods && methods.length > 0 && (
                          <div>
                            <span className="block font-mono text-2xs uppercase tracking-wider text-text-meta mb-2">
                              {t("project.meta.methods")}
                            </span>
                            <div className="text-sm text-text/80 tracking-wide leading-relaxed">
                              {methods.map((m, i, arr) => (
                                <span key={m.en || m}>
                                  <span className="font-medium text-text/70">{m.en || m}</span>
                                  {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack */}
                        {meta.techStack && meta.techStack.length > 0 && (
                          <div>
                            <span className="block font-mono text-2xs uppercase tracking-wider text-text-meta mb-2">
                              {t("project.methodology.techStack")}
                            </span>
                            <div className="text-sm text-text/80 tracking-wide leading-relaxed">
                              {meta.techStack.map((tech, i, arr) => (
                                <span key={tech}>
                                  <span className="font-medium text-text/70">{tech}</span>
                                  {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                  </Prose>
                </ContentSection>
              )}

              {(meta.results || meta.outcome?.body) && (
                <ContentSection id="results" number={sectionNumber("results")}
                  isOpen={openSections.has("results")} onToggle={() => toggleSection("results")}
                  staggerDelayMs={staggerDelayFor("results")}
                  kicker={t("project.results.kicker")} heading={t("project.results.heading")}>
                  {/* A project still in flight can set `resultsDetail: false` to
                      state that plainly without the metrics strip and participant
                      quotes contradicting it. `metrics` stays in the data either
                      way — the project card reads it for "Impact at a glance". */}
                  <div className={showResultsDetail && meta.verbatims?.length > 0 ? "xl:grid xl:grid-cols-[1fr_240px] xl:gap-10 items-start" : ""}>
                    <div className="max-w-[68ch]">
                      {showResultsDetail && meta.metrics?.some((m) => m.pending) && (
                        <p className="mb-6 border-l-2 border-border pl-4 text-sm text-text-meta leading-relaxed">
                          {t("project.results.pendingNotice")}
                        </p>
                      )}
                      {meta.results && (
                        <ClampedText>
                          <p className="text-[17px] leading-[1.7] text-text/90">
                            {meta.results}
                          </p>
                        </ClampedText>
                      )}
                      <SectionMedia items={meta.figures?.results} />

                      {showResultsDetail && (
                        <>
                          <MetricsStrip metrics={meta.metrics} />

                          <VerbatimInline verbatims={meta.verbatims} />
                        </>
                      )}
                    </div>
                    {showResultsDetail && <VerbatimRail verbatims={meta.verbatims} />}
                  </div>

                  <OutcomeBlock outcome={meta.outcome} />
                </ContentSection>
              )}

              {meta.implications && (
                <ContentSection id="implications" number={sectionNumber("implications")}
                  isOpen={openSections.has("implications")} onToggle={() => toggleSection("implications")}
                  staggerDelayMs={staggerDelayFor("implications")}
                  kicker={t("project.implications.kicker")} heading={t("project.implications.heading")}>
                  <ClampedText className="max-w-[68ch]">
                    <p className="text-[17px] leading-[1.7] text-text/90">
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
                  kicker={t("project.conclusion.kicker")} heading={t("project.conclusion.heading")}>
                  <SectionMedia items={meta.conclusion} />
                </ContentSection>
              )}

              {/* Escape hatch for per-project custom content */}
              {children}

              {/* Prev / next — lateral navigation instead of a dead end */}
              {(prevProject || nextProject) && (
                <nav
                  aria-label={t("project.nav.label")}
                  className="pt-10 mt-10 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {prevProject ? <ProjectNavCard project={prevProject} direction="prev" /> : <div aria-hidden="true" />}
                  {nextProject && <ProjectNavCard project={nextProject} direction="next" />}
                </nav>
              )}

              {/* Footer back link */}
              <div className="pt-10 border-t border-border">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-2xs font-black uppercase
                             tracking-[0.2em] text-text-meta hover:text-primary-600
                             transition-colors duration-200 group"
                >
                  <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform"
                    fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {t("project.footer.back")}
                </Link>
              </div>

              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
