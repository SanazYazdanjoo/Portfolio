import React, { useRef, useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { SketchTrail } from './components/SketchTrail';
import { profileData as rawProfile } from "./data/profile";
import { useLocalizedProfile } from "./hooks/useLocalizedProfile";

export default function App() {
  const profileData = useLocalizedProfile(rawProfile);
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => setIsScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-bg relative">

      {/* No border, no fixed height — just padding */}
      <header className="w-full z-50 shrink-0 px-8 md:px-12 lg:px-16 pt-6 md:pt-8 bg-bg no-print">
        <Nav isScrolled={isScrolled} />
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 px-8 md:px-12 lg:px-16"
        style={{ scrollBehavior: 'smooth' }}
      >
        <main>
          <Outlet />
        </main>

        <div className="w-full flex flex-col justify-center shrink-0 relative z-10">
          <Footer data={profileData} />
        </div>

        <SketchTrail />
      </div>
    </div>
  );
}