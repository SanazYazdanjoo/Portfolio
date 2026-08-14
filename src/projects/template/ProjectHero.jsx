// Hero photo — sticky parallax implementation. The banner stays pinned
// under the nav while the content wrapper (solid bg, higher z-index)
// slides over it; scrolling fades, blurs and slightly shrinks the image.
// Only mounted when the project has a thumbnail, so the transforms never
// run for hero-less projects.

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { ProjectPicture } from "../../components/ProjectPicture";
import { useTranslation } from "../../context/LanguageContext";
import { EASE } from "./constants";

export function ProjectHero({ meta, scrollY }) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();

  // Parallax overlay transformations
  const bannerOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);
  const bannerBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(12px)"]);
  const bannerScale = useTransform(scrollY, [0, 600], [1, 0.96]);

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
        }}
      >
        <div className="photo-frame w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-muted shadow-sm">
          <ProjectPicture
            src={meta.thumbnail}
            webpSrc={meta.thumbnailWebp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-3 text-right text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-meta">
          {t("project.media.heroCredit")}
        </p>
      </motion.div>
    </div>
  );
}
