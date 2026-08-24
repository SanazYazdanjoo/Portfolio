import React from "react";
import { VoluntaryList } from "../components/VoluntaryList";
import { voluntaryItems as rawVoluntary } from "../data/voluntary";
import { ScribbleUnderline, FlowerDoodle } from "../components/DoodleLibrary";
import { useTranslation } from "../context/LanguageContext";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { profileData as rawProfile } from "../data/profile";
import { useLocalizedProfile } from "../hooks/useLocalizedProfile";

export default function Voluntary() {
  const { t } = useTranslation();
  const profileData = useLocalizedProfile(rawProfile);
  // Raw items carry { en, de } objects — rendering them unlocalized throws
  // "Objects are not valid as a React child" (About.jsx localizes the same
  // list; this page must too).
  const voluntaryItems = useLocalizedProfile(rawVoluntary);

  useDocumentMeta({
    title: `${t("voluntary.heading")} — ${profileData.name}`,
    description: t("voluntary.description"),
  });
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 relative overflow-hidden bg-transparent">
      
      {/* Background Decor */}
      <FlowerDoodle className="absolute top-32 -left-20 w-96 h-96 text-accent opacity-10 -rotate-12 pointer-events-none" />

      <div className="container relative z-10 max-w-4xl px-4">
        
        <header className="mb-20 relative inline-block">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-text mb-4">
            {t("voluntary.heading")}<span className="text-primary">.</span>
          </h1>
          <ScribbleUnderline className="absolute -bottom-2 left-0 w-full h-5 text-accent opacity-80" />
          <p className="text-xl text-dim mt-6 font-medium">
            {t("voluntary.description")}
          </p>
        </header>

        <VoluntaryList items={voluntaryItems} />

      </div>
    </div>
  );
}