import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
import { useTranslation } from '../context/LanguageContext';
import { ProjectTile } from '../components/ProjectTile';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { profileData as rawProfile } from '../data/profile';
import { EmptyState } from "../components/EmptyState";

const SingleTagPage = () => {
  const { tagName } = useParams();
  const { t } = useTranslation();
  const localizedProjects = useLocalizedProfile(projects);
  const profileData = useLocalizedProfile(rawProfile);

  useDocumentMeta({
    title: `${tagName} — ${t("tags.single.heading")} — ${profileData.name}`,
    description: t("tags.single.subheading"),
  });

  const relatedItems = localizedProjects.filter(item =>
    item.tags && item.tags.includes(tagName)
  );

  return (
    <div className="min-h-screen bg-bg pt-20 md:pt-24 pb-16">
      <div className="w-full px-4 md:px-8 max-w-wide mx-auto">
        <Link
          to="/tags"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary mb-8"
        >
          &larr; {t("tags.single.backToAll")}
        </Link>

        <header className="mb-10 border-t rule-t pt-6">
          <p className="text-2xs font-black uppercase text-primary-600 mb-3">
            {t("tags.single.heading")}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text tracking-tighter leading-tight mb-4">
            {tagName}
          </h1>
          <p className="text-base text-dim max-w-xl leading-relaxed">
            {t("tags.single.subheading")}
          </p>
        </header>

        {relatedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 min-[1440px]:grid-cols-3 gap-6 md:gap-8">
            {relatedItems.map((project, index) => (
              <ProjectTile key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState title={t("tags.single.empty")} />
        )}
      </div>
    </div>
  );
};

export default SingleTagPage;