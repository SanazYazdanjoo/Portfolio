// <picture> wrapper for project thumbnails: WebP source, PNG fallback for
// browsers/tools that don't support it. `contents` on <picture> keeps it out
// of layout so the parent's aspect-ratio box sizes the <img> exactly as
// before — <picture> itself generates no box.
import React from "react";

export function ProjectPicture({ webpSrc, src, alt, className, onError }) {
  if (!webpSrc) {
    return <img src={src} alt={alt} className={className} onError={onError} />;
  }
  return (
    <picture className="contents">
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} className={className} onError={onError} />
    </picture>
  );
}
