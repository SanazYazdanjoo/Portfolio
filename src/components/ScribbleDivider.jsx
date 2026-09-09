import { useInViewReveal, revealClass } from "../hooks/useReveal";

// A full-width hand-drawn rule that draws itself on scroll-in. The path
// carries pathLength="1" so theme.css's .reveal-draw can animate the dash
// offset unit-free; the three ink dots pop in after it, staggered.
export function ScribbleDivider() {
  const [ref, inView] = useInViewReveal({ amount: 0, margin: "-40px" });
  return (
    <div className="relative w-full py-1 no-print">
      <svg
        ref={ref}
        viewBox="0 0 1200 6"
        preserveAspectRatio="none"
        className={`${revealClass(inView, "reveal-draw")} w-full h-[1px]`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Full-width line with very subtle hand-drawn wobble */}
        <path
          pathLength="1"
          d="M0 3 C 80 2.2, 160 3.8, 240 3 C 320 2.3, 400 3.6, 480 3
             C 560 2.4, 640 3.5, 720 3 C 800 2.5, 880 3.4, 960 3
             C 1040 2.6, 1120 3.3, 1200 3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="text-text/20"
        />

        {/* Tiny ink imperfections along the line */}
        <circle cx="300" cy="3" r="0.8" className="fill-text/15" style={{ "--reveal-delay": "0.9s" }} />
        <circle cx="720" cy="3" r="0.6" className="fill-text/10" style={{ "--reveal-delay": "1.02s" }} />
        <circle cx="1050" cy="3" r="0.7" className="fill-text/12" style={{ "--reveal-delay": "1.14s" }} />
      </svg>
    </div>
  );
}
