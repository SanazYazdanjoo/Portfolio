// Participant quotes.
//
// Two presentations, picked by where the quotes sit:
//
//   VerbatimRail + VerbatimInline — the Results pairing. The rail is the xl+
//   right-hand track; the inline block is the same content under the prose
//   below xl. One or the other renders, never both.
//
//   VerbatimList — a single always-visible block, for a section whose right
//   rail is already spoken for by a pull-quote (Challenge). Quotes are
//   evidence, and evidence that only appears above 1280px is not evidence.

import { useTranslation } from "../../context/LanguageContext";
import { NeedsInputMarker } from "../../components/NeedsInputMarker";
import { isNeedsInput } from "../../data/needsInput";

function VerbatimBlock({ item, index }) {
  const { t } = useTranslation();
  if (isNeedsInput(item)) return <NeedsInputMarker path={`verbatims[${index}]`} />;
  if (isNeedsInput(item.quote)) return <NeedsInputMarker path={`verbatims[${index}].quote`} />;
  if (!item.quote) return null;
  return (
    <blockquote
      className="border-l-2 border-primary-600 pl-5 pt-1"
      aria-label={t("project.results.verbatim")}
      style={{ breakInside: "avoid" }}
    >
      <p className="font-hand text-[28px] leading-snug text-text/80">“{item.quote}”</p>
      {item.attribution && !isNeedsInput(item.attribution) && (
        <cite className="block not-italic text-2xs font-bold uppercase tracking-wider text-text-meta mt-2">
          — {item.attribution}
        </cite>
      )}
      {isNeedsInput(item.attribution) && <NeedsInputMarker path={`verbatims[${index}].attribution`} />}
    </blockquote>
  );
}

export function VerbatimRail({ verbatims }) {
  if (!verbatims || verbatims.length === 0) return null;
  return (
    <div className="hidden xl:flex xl:flex-col xl:gap-8">
      {verbatims.map((item, i) => (
        <VerbatimBlock key={i} item={item} index={i} />
      ))}
    </div>
  );
}

export function VerbatimInline({ verbatims }) {
  if (!verbatims || verbatims.length === 0) return null;
  return (
    <div className="xl:hidden mt-8 flex flex-col gap-6 max-w-[var(--measure,68ch)] transition-[max-width] duration-300 ease-out">
      {verbatims.map((item, i) => (
        <VerbatimBlock key={i} item={item} index={i} />
      ))}
    </div>
  );
}

export function VerbatimList({ verbatims }) {
  if (!verbatims || verbatims.length === 0) return null;
  return (
    <div className="mt-8 flex flex-col gap-6 max-w-[var(--measure,68ch)] transition-[max-width] duration-300 ease-out">
      {verbatims.map((item, i) => (
        <VerbatimBlock key={i} item={item} index={i} />
      ))}
    </div>
  );
}
