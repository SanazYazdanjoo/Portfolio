import { Link } from "react-router-dom";
import { useTranslation } from "../../context/LanguageContext";
import { ProjectPicture } from "../../components/ProjectPicture";

export function ProjectNavCard({ project, direction }) {
  const { t } = useTranslation();
  const isNext = direction === "next";
  return (
    <Link
      to={project.href}
      className={`group flex items-center gap-4 border border-border p-4 transition-colors duration-200
                 hover:border-primary-600 ${isNext ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      {project.thumbnail && (
        <div className="w-20 aspect-[16/10] shrink-0 overflow-hidden border border-border bg-muted">
          <ProjectPicture
            src={project.thumbnail}
            webpSrc={project.thumbnailWebp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`min-w-0 flex-1 flex flex-col ${isNext ? "sm:items-end" : ""}`}>
        <p className={`flex items-center gap-1.5 text-2xs font-black uppercase tracking-[0.2em] text-text-meta mb-1 ${isNext ? "sm:flex-row-reverse" : ""}`}>
          <svg aria-hidden="true" className={`w-3 h-3 transition-transform duration-200 ${isNext ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={isNext ? "M14 5l7 7m0 0l-7 7m7-7H3" : "M10 19l-7-7m0 0l7-7m-7 7h18"} />
          </svg>
          {isNext ? t("project.nav.next") : t("project.nav.previous")}
        </p>
        <p className="font-display font-bold text-sm text-text uppercase leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {project.title}
        </p>
      </div>
    </Link>
  );
}
