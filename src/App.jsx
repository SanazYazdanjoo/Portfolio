import React, { useState, useEffect, useRef } from "react";
import { Outlet } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { SketchTrail } from './components/SketchTrail';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleBrokenImages = (event) => {
      const target = event.target;
      if (target && target.tagName === 'IMG') {
        if (target.src.includes('sketch-placeholder.png')) return;
        target.src = '/assets/icons/photo-placeholder.svg';
        target.className = "w-full h-full object-cover grayscale";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener('error', handleBrokenImages, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('error', handleBrokenImages, true);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-bg bg-grid-editorial relative">

      {/* Paper texture overlay */}
      <div className="fixed inset-0 bg-paper-texture pointer-events-none z-[9]"></div>

      {/* Moving ink speckle overlay */}
      <div
        className="fixed inset-[-50px] bg-ink-speckles pointer-events-none z-[100] transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      ></div>

      {/* Frame border */}
      <div className="fixed inset-0 border border-border/40 pointer-events-none z-[100] m-3"></div>

      {/* ── HEADER — outside scroll container, always full width ── */}
      <header className="w-full z-50 shrink-0 border-b border-border h-20 flex flex-col justify-center bg-bg no-print">
        <Nav />
      </header>

      {/* ── SCROLLABLE CONTENT ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-proximity relative z-10 scroll-smooth Xcursor-pen"
      >
        <main>
          <Outlet />
        </main>

        <div className="snap-start w-full flex flex-col justify-center shrink-0 relative z-10">
          <Footer />
        </div>

        <SketchTrail />
      </div>

    </div>
  );
}