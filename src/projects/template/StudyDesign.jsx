// Study design — the structured record behind a Methodology paragraph.
//
// Five optional blocks, each gated on its own field and each answering a
// question the prose only asserts: which study areas were planned and which
// actually ran; what the survey instrument contained; that both instruments
// were piloted; which models were built per participant and whose the
// authored one was; and which two competitive landscapes were reviewed.
// Sits beside the Research Methods / Tech Stack block and borrows its
// left-rule anatomy, so the two read as one panel.
//
// `studyPlans[].status === "not-run"` renders in the muted register the
// NotBuilt block uses — the same rule that a thing deliberately not done is
// shown as such, never silently dropped.
//
// `studyPlans` and `models` arrive RAW (rawMeta, not the localized meta):
// their entries are bilingual objects that also carry `status` / `owner`,
// and useLocalizedProfile collapses any object with en/de strings to the
// string alone, which would drop the status and the owner on the floor.
// They are localized here with `localize` instead.

import { useTranslation } from "../../context/LanguageContext";
import { OwnerMark } from "./ConceptLineage";

function Label({ children }) {
  return (
    <span className="mb-2 block font-mono text-2xs uppercase text-text-meta">{children}</span>
  );
}

function Dotted({ items }) {
  return (
    <div className="text-sm leading-relaxed text-text-meta">
      {items.map((item, i, arr) => (
        <span key={i}>
          <span className="font-medium">{item}</span>
          {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
        </span>
      ))}
    </div>
  );
}

export function StudyDesign({ studyPlans, surveySections, pilots, models, competitiveReview }) {
  const { t, localize } = useTranslation();
  const landscapes = competitiveReview
    ? [
        { key: "engagementPlatforms", items: competitiveReview.engagementPlatforms, labelKey: "project.study.engagementPlatforms" },
        { key: "deskBookingCompetitors", items: competitiveReview.deskBookingCompetitors, labelKey: "project.study.deskBooking" },
      ].filter((l) => l.items?.length > 0)
    : [];

  const hasAny =
    studyPlans?.length > 0 ||
    surveySections?.length > 0 ||
    pilots?.length > 0 ||
    models?.length > 0 ||
    landscapes.length > 0;
  if (!hasAny) return null;

  return (
    <div className="mt-8 flex max-w-measure flex-col gap-6 border-l-2 rule-l pl-5 transition-[max-width] duration-300 ease-smooth">
      {studyPlans?.length > 0 && (
        <div style={{ breakInside: "avoid" }}>
          <Label>{t("project.study.plan")}</Label>
          <ul className="m-0 list-none border-t rule-t p-0">
            {studyPlans.map((plan, i) => {
              const ran = plan.status !== "not-run";
              return (
                <li
                  key={i}
                  className={`flex items-baseline justify-between gap-4 border-b rule-b py-2 text-sm leading-relaxed ${ran ? "text-text-meta" : "text-dim"}`}
                >
                  <span className={ran ? "font-medium" : ""}>{localize(plan)}</span>
                  <span className={`shrink-0 font-mono text-2xs uppercase ${ran ? "text-primary-600" : "text-dim"}`}>
                    {ran ? t("project.study.completed") : t("project.study.notRun")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {surveySections?.length > 0 && (
        <div style={{ breakInside: "avoid" }}>
          <Label>
            {t("project.study.survey")}
            <span className="ml-2 text-dim">
              {t("project.study.sections").replace("{n}", surveySections.length)}
            </span>
          </Label>
          <ol className="m-0 grid list-none gap-x-6 gap-y-1 p-0 sm:grid-cols-2">
            {surveySections.map((section, i) => (
              <li key={i} className="flex items-baseline gap-3 text-sm leading-relaxed text-text-meta">
                <span className="shrink-0 font-mono text-2xs font-bold tabular-nums text-primary-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{section}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {pilots?.length > 0 && (
        <div style={{ breakInside: "avoid" }}>
          <Label>{t("project.study.pilots")}</Label>
          <ul className="m-0 flex list-disc flex-col gap-1 pl-4 text-sm leading-relaxed text-text-meta marker:text-primary-500">
            {pilots.map((pilot, i) => (
              <li key={i}>{pilot}</li>
            ))}
          </ul>
        </div>
      )}

      {models?.length > 0 && (
        <div style={{ breakInside: "avoid" }}>
          <Label>{t("project.study.models")}</Label>
          <div className="text-sm leading-relaxed text-text-meta">
            {models.map((model, i, arr) => (
              <span key={i}>
                <span className="font-medium">{localize(model)}</span>
                <OwnerMark owner={model.owner} />
                {i < arr.length - 1 && <span className="mx-2 text-text/25">·</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {landscapes.length > 0 && (
        <div style={{ breakInside: "avoid" }}>
          <Label>{t("project.study.landscapes")}</Label>
          <div className="flex flex-col gap-4">
            {landscapes.map((l) => (
              <div key={l.key}>
                <span className="mb-1 block text-2xs font-black uppercase text-text-meta">
                  {t(l.labelKey)}
                  <span className="ml-2 font-mono font-normal text-dim">{l.items.length}</span>
                </span>
                <Dotted items={l.items} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
