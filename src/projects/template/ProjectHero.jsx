// Hero photo — sticky parallax implementation. The banner stays pinned
// under the nav while the content wrapper (solid bg, higher z-index)
// slides over it; scrolling fades, blurs and slightly shrinks the image.
// Only mounted when the project has a thumbnail, so the transforms never
// run for hero-less projects.
//
// The effect is bounded, and has to be. This element's containing block is
// the page's <main>, so `sticky` pins it for the WHOLE document — measured
// on the IBS case study, it sat at the same screen position for all 17,195px
// of scroll. Past FADE_PX the content wrapper covers it completely, so every
// one of those pixels was spent compositing a blurred, scaled, filtered
// layer nobody can see — exactly the kind of permanently pinned filter layer
// mobile GPUs smear and ghost. `visibility: hidden` past the fade drops the
// layer while leaving layout — and therefore the sticky behaviour on the way
// back up — untouched.

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { ProjectPicture } from "../../components/ProjectPicture";
import { useTranslation } from "../../context/LanguageContext";
import { EASE } from "./constants";

// Scroll distance the banner fades over — and, past it, the point where the
// banner stops being painted at all.
const FADE_PX = 600;

export function ProjectHero({ meta, scrollY }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  // Parallax overlay transformations. The banner is fully covered by the
  // content wrapper well before FADE_PX, so ending the fade at 0 rather than
  // 0.15 changes nothing on screen and lets the layer switch off cleanly.
  const bannerOpacity = useTransform(scrollY, [0, FADE_PX], [1, 0]);
  const bannerBlur = useTransform(scrollY, [0, FADE_PX], ["blur(0px)", "blur(12px)"]);
  const bannerScale = useTransform(scrollY, [0, FADE_PX], [1, 0.96]);
  const bannerVisibility = useTransform(scrollY, (y) => (y > FADE_PX ? "hidden" : "visible"));

  return (
    <div className="sticky top-[80px] md:top-[100px] z-0 w-full px-4 md:px-8 max-w-[1500px] mx-auto mb-10 md:mb-20">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          opacity: prefersReducedMotion ? 1 : bannerOpacity,
          filter: prefersReducedMotion ? "none" : bannerBlur,
          scale: prefersReducedMotion ? 1 : bannerScale,
          visibility: prefersReducedMotion ? "visible" : bannerVisibility,
        }}
      >
        {/* Dotted paper mat. The photo is object-cover and fills its frame
            edge to edge, so a pattern BEHIND it would never be seen — the
            mat is what gives the texture somewhere to show. Its width is
            the whole effect: a band narrower than a mark or two just clips
            rings into crescents, which is why the padding steps up with the
            breakpoint rather than staying fixed.

            .bg-dots is the design system's transparent variant — no
            ground of its own — so it goes on as its own layer over the mat's
            bg-surface rather than replacing it. */}
        <div className="relative bg-surface p-4 sm:p-5 md:p-8 shadow-sm">
          <div
            aria-hidden="true"
            className="bg-dots absolute inset-0"
            /* The card's 200px assumes a large field — its own specimen is a
               400px square. Across a 32px mat that lands about a sixth of a
               tile and reads as dust, so this use takes the size knob down.
               The utility keeps the card's default for everyone else. */
            style={{ "--dots-size": "130px" }}
          />
          <div className="photo-frame rule-frame-in relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-transparent shadow-sm">
            <ProjectPicture
              src={meta.thumbnail}
              webpSrc={meta.thumbnailWebp}
              alt=""
              eager
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="mt-3 text-right text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-meta">
          {t("project.media.heroCredit")}
        </p>
      </motion.div>
    </div>
  );
}
