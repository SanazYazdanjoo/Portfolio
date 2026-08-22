import React, { useState } from "react";
import { Link } from "react-router-dom";

// The ring is drawn, not plotted: the radius wanders by a few units and the
// pen carries ~26 degrees past where it started, crossing its own line — which
// is what a hand does and what four symmetric beziers never did.
// `pathLength` normalises the path to the 560 units .animate-sketch-oval
// counts in, so the draw-on stays exact if the geometry is ever redrawn.
const SketchOval = () => (
  <svg
    viewBox="0 0 200 100"
    fill="none"
    preserveAspectRatio="none"
    className="absolute -inset-x-6 -inset-y-5 w-[calc(100%+56px)] h-[calc(100%+40px)] text-primary pointer-events-none z-0 drop-shadow-[0_0_12px_rgba(196,67,34,0.18)]"
  >
    <path
      d="M15.3,36.3C18.5,33.5 25.6,24.3 34.7,19.8C43.7,15.2 56.8,11 69.7,8.9C82.6,6.9 98.4,6.5 111.9,7.5C125.3,8.4 139.5,11.3 150.6,14.9C161.6,18.4 171.7,23.5 178.1,28.7C184.6,33.9 188.6,40.4 189.2,46.1C189.9,51.9 186.9,58.1 182,63.2C177,68.3 168.7,73 159.6,76.8C150.5,80.5 139,83.7 127.2,85.7C115.4,87.7 101.4,89.1 88.7,88.7C76,88.4 61.7,86.6 50.8,83.6C39.9,80.6 29.8,75.5 23.5,70.6C17.1,65.6 13.7,59.3 12.8,53.7C11.8,48 14,42.2 17.8,36.7C21.6,31.1 32.5,22.9 35.5,20.2"
      pathLength="560"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="animate-sketch-oval"
    />
  </svg>
);

const ArrowIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M5.2 12.1c2.2 0 4.1-.1 6.3-.1h4.4"
      stroke="currentColor"
      strokeWidth="2.15"
      strokeLinecap="round"
    />
    <path
      d="M12.1 6.4 17.8 12l-5.8 5.4"
      stroke="currentColor"
      strokeWidth="2.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.7 11.9h1.1"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Plain text/link button, used where the doodle styling of SolidButton isn't wanted.
export const Button = ({ children, to, href, className = "", ...props }) => {
  const baseStyles = "inline-block text-text hover:text-primary transition-colors font-medium";
  const combinedClasses = `${baseStyles} ${className}`;

  if (to) return <Link to={to} className={combinedClasses} {...props}>{children}</Link>;
  if (href) return <a href={href} className={combinedClasses} {...props}>{children}</a>;
  
  return <button className={combinedClasses} {...props}>{children}</button>;
};

// Primary button with doodle-text styling and the hand-drawn SketchOval on hover.
export const SolidButton = ({ children, to, href, className = "", ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "relative inline-block z-10 doodle-text text-3xl font-bold transition-all duration-300";
  const hoverStyles = isHovered ? "text-primary scale-[1.04]" : "text-text";
  const combinedClasses = `${baseStyles} ${hoverStyles} ${className}`;

  const content = (
    <span
      className="relative flex items-center justify-center px-3 py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && <SketchOval />}
      <span className={`relative z-10 flex items-center gap-2 transition-all duration-300 ${isHovered ? "-translate-y-0.5" : ""}`}>
        <span className="relative z-10">{children}</span>
        <ArrowIcon className={`h-4 w-4 transition-all duration-300 ${isHovered ? "translate-x-1.5 scale-110" : ""}`} />
      </span>
    </span>
  );

  if (to) return <Link to={to} className={combinedClasses} {...props}>{content}</Link>;
  if (href) return <a href={href} className={combinedClasses} {...props}>{content}</a>;
  
  return <button className={combinedClasses} {...props}>{content}</button>;
};