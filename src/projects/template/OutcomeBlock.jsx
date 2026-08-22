import { useTranslation } from "../../context/LanguageContext";
import { Badge } from "../../components/Badge";
import { ClampedText } from "./ClampedText";
import { MaybeText } from "./MaybeText";

const ADOPTION_META = {
  shipped:      { labelKey: "project.outcome.adoption.shipped",    tone: "success" },
  roadmapped:   { labelKey: "project.outcome.adoption.roadmapped", tone: "accent"  },
  "not-adopted":{ labelKey: "project.outcome.adoption.notAdopted", tone: "muted"   },
  unknown:      { labelKey: "project.outcome.adoption.unknown",    tone: "muted"   },
  academic:     { labelKey: "project.outcome.adoption.academic",   tone: "highlight" },
};

function AdoptionPill({ adoption }) {
  const { t } = useTranslation();
  const meta = ADOPTION_META[adoption];
  if (!meta) return null;
  return (
    <Badge tone={meta.tone} className="mt-1">
      {t(meta.labelKey)}
    </Badge>
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
    <div className="mt-12 border-t border-border pt-8 max-w-[var(--measure,68ch)] transition-[max-width] duration-300 ease-out">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-5">
        {t("project.outcome.kicker")}
      </p>

      <ClampedText>
        <MaybeText
          value={outcome.body}
          path="outcome.body"
          as="p"
          className="text-[17px] leading-[1.7] text-text/90"
        />
      </ClampedText>

      {outcome.adoption && (
        <div className="mt-5">
          <AdoptionPill adoption={outcome.adoption} />
        </div>
      )}

      {decisions.length > 0 && (
        <div className="mt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-dim mb-3">
            {t("project.outcome.decisions")}
          </p>
          <ul className="border-t border-border">
            {decisions.map((decision, i) => (
              <li key={i} className="border-b border-border py-3">
                <MaybeText
                  value={decision}
                  path={`outcome.decisions[${i}]`}
                  as="p"
                  className="text-sm text-text/80 leading-relaxed"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
