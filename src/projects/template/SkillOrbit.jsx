// Skill pills that follow the reader.
//
// The Skills row in the header lists every tag at once, which answers "what
// did this take?" but not "what is she doing *here*?". The orbit answers the
// second question: as a section scrolls into view, the tags that section
// actually evidences leave the header row and settle in a rail beside it,
// then fly home when the reader returns to the top. There is exactly ONE
// element per tag on the page at any moment — the header renders a tag only
// while the orbit does not — so the flight is a shared-layout animation
// (framer-motion `layoutId`) rather than a crossfade between duplicates,
// and a screen reader or a keyboard tab order never meets the same link
// twice.
//
// Which tags belong to which section is derived from `tagEvidence`, not
// declared a second time — see ./tagSections.js.
//
// Gates, in order of how load-bearing they are:
//
//   • 2xl and up (1536px). The rail is a real third layout track, so it
//     takes width from the prose column. At 1536px the column still lands
//     within ~44px of its own cap, and below that the gutter genuinely is
//     not there to spend — the honest answer on a 1440px laptop is no rail,
//     not a squeezed one. Mount is JS-gated (useMediaQuery), because a
//     Tailwind `hidden` class would leave the pills mounted in the orbit,
//     hence missing from the header row, on every phone.
//   • prefers-reduced-motion. The pills still move to the rail — that is
//     information, not ornament — but they cut rather than fly.
//   • Print: no-print. A printed page has no active section.
//
// No idle motion. The pills used to bob ±3px on a 6s loop, and even that
// read as "the page is shaking" to a reader on a Windows laptop (2026-09-05,
// noticed right after opening a Key insight, which merely drew the eye to
// the rail). Motion here is reserved for arrivals, departures and flights.

import { createContext, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Badge } from "../../components/Badge";
import { useMediaQuery } from "../../hooks/useIsMobile";
import { useTranslation } from "../../context/LanguageContext";
import { deriveTagSections } from "./tagSections";
import { EASE } from "./constants";

const ORBIT_QUERY = "(min-width: 1536px)";

// Four is what fits the rail without scrolling at the pill sizes this system
// uses, and past four the rail stops reading as "the few that matter here".
const MAX_PILLS = 4;

const FlownTagsContext = createContext(null);

/** Tags currently living in the orbit — the header row skips these. */
export function useFlownTags() {
  return useContext(FlownTagsContext) ?? EMPTY;
}
const EMPTY = new Set();

export function FlownTagsProvider({ value, children }) {
  return <FlownTagsContext.Provider value={value}>{children}</FlownTagsContext.Provider>;
}

/**
 * Resolves the tags in flight for the section currently being read.
 * Returns { pills, flown } — `flown` is the Set the header consults.
 */
export function useSkillOrbit({ tags, tagEvidence, activeId, activeSections }) {
  const enabled = useMediaQuery(ORBIT_QUERY);

  const bySection = useMemo(
    () => deriveTagSections(tags, tagEvidence),
    [tags, tagEvidence]
  );

  // The first section is "the top of the page" for this purpose: it sits
  // directly under the header, the Skills row is still on screen, and the
  // pills belong at home there. Scrolling back up therefore returns them by
  // the same route they left by, which is the whole effect.
  const homeId = activeSections?.[0]?.id ?? null;

  const pills = useMemo(() => {
    if (!enabled || !activeId || activeId === homeId) return [];
    return (bySection[activeId] ?? []).slice(0, MAX_PILLS);
  }, [enabled, activeId, homeId, bySection]);

  const flown = useMemo(() => new Set(pills), [pills]);

  return { pills, flown, enabled };
}

function OrbitPill({ tag, index, reduced }) {
  return (
    <motion.div
      layoutId={`skill-pill-${tag}`}
      layout={reduced ? false : "position"}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12, transition: { duration: 0.18, ease: EASE } }}
      transition={{ duration: 0.5, delay: reduced ? 0 : index * 0.06, ease: EASE }}
    >
      <Link to={`/tags/${encodeURIComponent(tag)}`} className="inline-block focus-ring rounded-full">
        <Badge tone="accent">{tag}</Badge>
      </Link>
    </motion.div>
  );
}

/**
 * The rail. Renders as a third layout track inside the page's flex row;
 * mounts only above 2xl, and only while it has something to say.
 */
export function SkillOrbitRail({ pills, enabled }) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  if (!enabled) return null;

  return (
    <aside
      className="no-print shrink-0 w-[200px] pl-8 sticky top-36 self-start"
      /* No visible caption. The pills carry the same styling as the Skills
         row they flew out of, and arriving beside the section they belong to
         is itself the sentence a caption would have written out — a label
         over four chips reads as instructions for something obvious. The
         name stays for anyone navigating by landmark, where the arrival
         cannot be seen. */
      aria-label={t("project.orbit.label")}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {pills.length > 0 && (
          <motion.div
            key="orbit"
            className="flex flex-col items-start gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {pills.map((tag, i) => (
              <OrbitPill key={tag} tag={tag} index={i} reduced={reduced} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
