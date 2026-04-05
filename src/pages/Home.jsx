// src/pages/Home.jsx
import React from "react";
import { Hero } from "../components/Hero";
import { AboutMe } from "../components/AboutMe";
import { ProjectCard } from "../components/ProjectCard";
import { ScribbleDivider } from "../components/ScribbleDivider";
import { projects } from "../data/projects";
import { profileData } from "../data/profile";
import { ScrollArrow } from "../components/Scrollarrow";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className=" w-full relative snap-y snap-mandatory">

      {/* ── Hero ── */}
      <section
        id="Hero-Section"
        className="snap-center bg-bg relative w-full min-h-screen flex flex-col z-10 justify-center items-center overflow-hidden pt-10 pb-10">
        <div className="container w-full relative">
          <Hero data={profileData} />

          {/* Arrow: vertically centered, right edge */}
          <div className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-20">
            <ScrollArrow />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="AboutMe-Section"
        className="snap-center bg-bg relative w-full min-h-screen flex items-start pt-5 pb-5 z-20"
      >
        <div className="container w-full">
          <AboutMe data={profileData} />
        </div>
      </section>

      <ScribbleDivider />

      {/* ----------------------------── Projects — ------------------------------------- ── */}
      <section
        id="projects"
        className="snap-center bg-bg relative w-full min-h-screen flex items-center py-20 z-10"
      >
        <div className="container relative z-10 mx-auto px-4 md:px-8 w-full">

          {/* Section header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative inline-block">
              <h2 className="font-display text-xl md:text-8xl text-text mt-2">
                Case Studies
              </h2>
            </div>
          </motion.div>

          {/* Project cards */}
          {projects.length > 0 ? (
            <div className="flex flex-col gap-px bg-border/20">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="border border-border/30 px-12 py-20 text-center">
              <p className="font-black text-lg text-text/30 uppercase tracking-widest mb-2">
                Work in Progress
              </p>
              <p className="text-sm text-text/40 max-w-xs mx-auto leading-relaxed">
                Case studies are being documented. Check back soon.
              </p>
            </div>
          )}

        </div>
      </section>

    

    </div>
  );
}