// <picture> wrapper for project thumbnails: WebP source, PNG fallback for
// browsers/tools that don't support it. `contents` on <picture> keeps it out
// of layout so the parent's aspect-ratio box sizes the <img> exactly as
// before — <picture> itself generates no box.
//
// Lazy by default: every call site wraps this in a fixed-aspect box, so
// deferring the fetch can't shift layout — and the homepage's four
// hover-panel thumbnails (~600KB) stop loading for visitors who never
// hover. Pass `eager` only where the image is above the fold at page load
// (ProjectHero — the case-study LCP), which also flags it fetchpriority
// high so the preload scanner grabs it before the JS settles.
import React from "react";

export function ProjectPicture({ webpSrc, src, alt, className, onError, eager = false }) {
  const loadingProps = eager
    ? { loading: "eager", fetchPriority: "high" }
    : { loading: "lazy", decoding: "async" };
  if (!webpSrc) {
    return <img src={src} alt={alt} className={className} onError={onError} {...loadingProps} />;
  }
  return (
    <picture className="contents">
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} className={className} onError={onError} {...loadingProps} />
    </picture>
  );
}
