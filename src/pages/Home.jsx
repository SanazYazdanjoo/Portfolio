// src/pages/Home.jsx
import React from "react";
import { Hero } from "../components/Hero";
import { AboutMe } from "../components/AboutMe";
import { ProjectList } from "../components/ProjectList";
import { ScribbleDivider } from "../components/ScribbleDivider";
import { projects } from "../data/projects";
import { profileData } from "../data/profile";

export default function Home() {
  return (
    <div className="w-full relative">

      {/* ── Hero ── */}
      <section
        id="Hero-Section"
        className="bg-bg relative w-full min-h-screen flex flex-col
                   justify-center border-b border-border overflow-hidden
                   pt-10 pb-20"
      >
        <div className="container">
          <Hero data={profileData} />
        </div>
      </section>

      <ScribbleDivider />

      {/* ── About ── */}
      <section
        id="AboutMe-Section"
        className="bg-bg relative w-full min-h-screen flex items-center py-20"
      >
        <div className="container">
          <AboutMe data={profileData} />
        </div>
      </section>

      <ScribbleDivider />
     {/* ── Projects ── */}
      <section
        id="projects"
        className="bg-bg relative w-full min-h-screen flex items-center py-20"
      >
        <div className="container relative z-10 mx-auto flex items-center
                        px-4 md:px-8 gap-0">

          <div className="font-display text-xl md:text-8xl text-text mt-2 whitespace-nowrap"
     style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
  Case Studies
</div>

          {/* Project list — 3/4 */}
          <div className="w-3/4">
            <ProjectList items={projects} />
          </div>

        </div>
      </section>

      <ScribbleDivider />

    </div>
  );
}