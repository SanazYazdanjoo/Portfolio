import { useTranslation } from "../../context/LanguageContext";
import { MaybeText } from "./MaybeText";

export function ContributionRow({ contribution }) {
  const { t } = useTranslation();
  const groups = [
    { key: "owned", items: contribution.owned, labelKey: "project.contribution.owned", muted: false },
    { key: "shared", items: contribution.shared, labelKey: "project.contribution.shared", muted: false },
    { key: "notMine", items: contribution.notMine, labelKey: "project.contribution.notMine", muted: true },
  ].filter((g) => g.items && g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-[140px_1fr] sm:gap-4 py-4 border-b border-border"
         style={{ breakInside: "avoid" }}>
      <dt className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-600 pt-0.5">
        {t("project.meta.contribution")}
      </dt>
      <dd className="space-y-3 max-w-[var(--measure,68ch)] transition-[max-width] duration-300 ease-out">
        {groups.map((g) => (
          <div key={g.key}>
            <p className={`text-[10px] font-black uppercase tracking-[0.15em] mb-1 ${g.muted ? "text-dim" : "text-text-meta"}`}>
              {t(g.labelKey)}
            </p>
            <ul className={`text-sm leading-relaxed space-y-0.5 ${g.muted ? "text-dim" : "text-text font-medium"}`}>
              {g.items.map((item, i) => (
                <li key={i}>
                  <MaybeText value={item} path={`myContribution.${g.key}[${i}]`} as="span" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </dd>
    </div>
  );
}
