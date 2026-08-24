import { useTranslation } from "../../context/LanguageContext";
import { Badge } from "../../components/Badge";
import { ClampedText } from "./ClampedText";
import { MaybeText } from "./MaybeText";

// The defined outcome vocabulary — one term per situation, so five projects
// with pending outcomes read as a convention, not five separate apologies:
//   shipped / roadmapped / not-adopted — a verdict exists.
//   unknown  — handed over, never verified (deskbird).
//   academic — adoption doesn't apply in the product sense (gaze, embraceme).
//   deferred — the work is running and evaluation is designed but pending;
//              the outcome is withheld on purpose, not missing (IBS,
//              designing-this-site).
// Exported: /designsystem renders this exact table as the vocabulary's
// user-facing definition — one source, no drift between the pills a case
// study shows and the terms the style guide documents.
export const ADOPTION_META = {
  shipped:      { labelKey: "project.outcome.adoption.shipped",    defKey: "project.outcome.def.shipped",    tone: "success" },
  roadmapped:   { labelKey: "project.outcome.adoption.roadmapped", defKey: "project.outcome.def.roadmapped", tone: "accent"  },
  "not-adopted":{ labelKey: "project.outcome.adoption.notAdopted", defKey: "project.outcome.def.notAdopted", tone: "muted"   },
  unknown:      { labelKey: "project.outcome.adoption.unknown",    defKey: "project.outcome.def.unknown",    tone: "muted"   },
  academic:     { labelKey: "project.outcome.adoption.academic",   defKey: "project.outcome.def.academic",   tone: "highlight" },
  deferred:     { labelKey: "project.outcome.adoption.deferred",   defKey: "project.outcome.def.deferred",   tone: "accent"  },
};

function AdoptionPill({ adoption }) {
  const { t } = useTranslation();
  const meta = ADOPTION_META[adoption];
  if (!meta) return null;
  return (
    <div>
      <Badge tone={meta.tone} className="mt-1">
        {t(meta.labelKey)}
      </Badge>
      {/* The term's one-line definition, as VISIBLE rendered text — not a
          tooltip or title attribute — so it reaches print and screen
          readers the same as any prose. A pill without its definition is
          an unexplained verdict. */}
      <p className="mt-2 text-sm text-dim leading-relaxed max-w-measure">
        {t(meta.defKey)}
      </p>
    </div>
  );
}

// Outcome — what happened after the findings. It used to be a section of its
// own, directly under Results, which read as two headings for one story: the
// findings and what they changed. It's now the closing block of the Results
// section, marked by the same quiet dim label the metrics strip uses rather
// than a second coral kicker, so the section keeps one heading.
export function OutcomeBlock({ outcome }) {
  const { t } = useTranslation();
  if (!outcome?.body) return null;
  const decisions = outcome.decisions || [];

  return (
    <div className="mt-12 border-t rule-t pt-8 max-w-measure transition-[max-width] duration-300 ease-smooth">
      <p className="text-2xs font-black uppercase text-dim mb-5">
        {t("project.outcome.kicker")}
      </p>

      <ClampedText>
        <MaybeText
          value={outcome.body}
          path="outcome.body"
          as="p"
          className="text-lg leading-[1.7] text-text"
        />
      </ClampedText>

      {outcome.adoption && (
        <div className="mt-5">
          <AdoptionPill adoption={outcome.adoption} />
        </div>
      )}

      {decisions.length > 0 && (
        <div className="mt-8">
          <p className="text-2xs font-black uppercase text-dim mb-3">
            {t("project.outcome.decisions")}
          </p>
          <ul className="border-t rule-t">
            {decisions.map((decision, i) => (
              <li key={i} className="border-b rule-b py-3">
                <MaybeText
                  value={decision}
                  path={`outcome.decisions[${i}]`}
                  as="p"
                  className="text-sm text-text-meta leading-relaxed"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
