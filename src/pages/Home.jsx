// src/pages/Home.jsx
import React from "react";
import { Hero } from "../components/Hero";
import { AboutMe } from "../components/AboutMe";
import { ProjectList } from "../components/ProjectList";
import { projects } from "../data/projects";
import { profileData } from "../data/profile"; // Import your new data

export default function Home() {
  return (
    <div className="w-full h-full">
      <section
        id="Hero-Section"
        className="bg-bg relative w-full h-screen snap-start shrink-0 flex flex-col justify-center border-b border-border overflow-hidden pt-10 pb-20"
      >
        <div className="container"  >
        <Hero data={profileData} />
        </div>
      </section>
      <section
        id="AboutMe-Section"
        className="bg-bg py-20 relative overflow-hidden h-screen w-full snap-start shrink-0 flex items-center"
      >
        <div className="container"  >
        <AboutMe data={profileData} />
        </div>
      </section>

      <section
        id="projects"
        className="bg-bg py-20 relative overflow-hidden h-screen w-full snap-start shrink-0 flex items-center"
      >
        <div className="container relative z-10 mx-auto flex items-center h-full px-4 md:px-8">
          <div className="flex-shrink-0 flex items-center justify-center relative w-24 md:w-40 h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center pointer-events-none">
              <img
                src="/assets/case-studies-doodle.png"
                alt="Case Studies"
                className="object-contain w-auto h-[120px] md:h-[180px] max-w-[80vh] mix-blend-multiply opacity-90"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-10 md:gap-14 pl-6 md:pl-16 h-full overflow-y-auto py-24">
            <ProjectList items={projects} />
          </div>
        </div>
      </section>

      <section
        id="Thanks-Section"
        className="bg-bg py-20 relative overflow-hidden h-screen w-full snap-start shrink-0 flex items-center"
      >

        <div className="container relative z-10 mx-auto flex items-center h-full px-4 md:px-8">
                  <div className="flex-shrink-0 flex items-center justify-center relative w-full h-full">

                  <img 
                    src="/assets/thank-you.png" 
                    alt="Thank You for visiting" 
                    // w-full and max-w-md ensure it looks great on mobile, scaling up slightly on desktop
                    className="w-full max-w-md md:max-w-lg h-auto object-contain hover:scale-105 transition-transform duration-500"
                  />
                  </div>
                </div>

      </section>

    </div>
  );
}