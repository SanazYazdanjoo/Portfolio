import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "../../context/LanguageContext";
import { ContentSection } from "./CollapsibleSection";
import { ClampedText } from "./ClampedText";
import { EASE } from "./constants";

const PHASE_STATUS = {
  complete: { labelKey: "project.status.complete", dot: "bg-text", text: "text-text" },
  "in-progress": { labelKey: "project.status.inProgress", dot: "bg-primary-600", text: "text-primary-600" },
  planned: { labelKey: "project.status.planned", dot: "bg-transparent border border-dim", text: "text-dim" },
  blocked: { labelKey: "project.status.blocked", dot: "bg-danger", text: "text-danger" },
};

export function ResearchPhases({ phases, intro, number, isOpen, onToggle, staggerDelayMs }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  return (
    <ContentSection
      id="phases"
      number={number}
      kicker={t("project.phases.kicker")}
      heading={t("project.phases.heading")}
      isOpen={isOpen}
      onToggle={onToggle}
      staggerDelayMs={staggerDelayMs}
    >
      {intro && (
        <ClampedText className="max-w-[68ch] mb-8">
          <p className="text-[17px] leading-[1.7] text-text/90">
            {intro}
          </p>
        </ClampedText>
      )}

      <ol className="list-none p-0 m-0 max-w-[68ch]">
        {phases.map((p, i) => {
          const s = PHASE_STATUS[p.status] ?? PHASE_STATUS.planned;
          return (
            <motion.li
              key={p.phase}
              className="border-t border-border py-4 first:border-t-0 first:pt-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
            >
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-2 h-2 rounded-full translate-y-[-1px] ${s.dot}`}
                />
                <span className="text-sm md:text-base font-semibold text-text">
                  {p.phase}
                </span>
                <span
                  className={`text-2xs font-black uppercase tracking-[0.2em] ${s.text}`}
                >
                  {t(s.labelKey)}
                </span>
              </div>
              {p.note && (
                <p className="mt-1.5 ml-5 text-sm text-text/60 leading-relaxed">
                  {p.note}
                </p>
              )}
            </motion.li>
          );
        })}
      </ol>
    </ContentSection>
  );
}
