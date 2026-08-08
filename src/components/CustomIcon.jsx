import React from 'react';

export function CustomIcon({ name, className = "", alt, ext = "svg" }) {
  const iconPath = `/assets/icons/${name}.${ext}`;

  return (
    <div 
      className={`custom-icon-img inline-block mix-blend-multiply ${className}`}
      role="img"
      aria-label={alt || `${name} icon`}
      style={{
        // currentColor resolves to the element's text color, so the icon inherits it.
        backgroundColor: 'currentColor',

        // Masks the background color with the icon's shape, so it renders as a filled icon.
        WebkitMaskImage: `url(${iconPath})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        
        maskImage: `url(${iconPath})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    />
  );
}