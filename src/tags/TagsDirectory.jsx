import { useState } from 'react';
import { getTagData } from '../data/projects';
import TagChip from '../components/TagChip';
import { useTranslation } from '../context/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { profileData as rawProfile } from '../data/profile';
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
import { EmptyState } from "../components/EmptyState";

const TagsDirectory = () => {
  const { t } = useTranslation();
  const profileData = useLocalizedProfile(rawProfile);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'count'

  useDocumentMeta({
    title: `${t("tags.directory.title")} — ${profileData.name}`,
    description: t("tags.directory.subheading"),
  });

  const rawTags = getTagData();

  const filteredTags = rawTags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTags = [...filteredTags].sort((a, b) => {
    if (sortBy === 'count') return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-bg pt-20 md:pt-24 pb-16">
      <div className="w-full px-4 md:px-8 max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text tracking-tighter leading-tight mb-4">
            {t("tags.directory.title")}
          </h1>
          <p className="text-base text-dim max-w-xl leading-relaxed">
            {t("tags.directory.subheading")}
          </p>
        </header>

        {/* Top Controls */}
        <div className="flex flex-wrap gap-3 mb-8 border-t rule-t pt-6">
          {/* The drawn outline lives on a wrapper, not on the field itself:
              a replaced element (input, select, iframe, img) never renders a
              pseudo-element, so .rule-frame has nothing to draw into. */}
          <span className="inline-block border rule-frame">
            <input
              type="text"
              placeholder={t("tags.directory.searchPlaceholder")}
              aria-label={t("tags.directory.searchPlaceholder")}
              className="block bg-bg px-3 py-2 text-sm text-text w-64 max-w-full focus-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </span>
          <span className="inline-block border rule-frame">
            <select
              aria-label={t("tags.directory.sortLabel")}
              className="block bg-bg px-3 py-2 text-sm text-text focus-ring"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">{t("tags.directory.sortByName")}</option>
              <option value="count">{t("tags.directory.sortByCount")}</option>
            </select>
          </span>
        </div>

        {/* Tag Grid */}
        {sortedTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {sortedTags.map(tag => (
              <TagChip key={tag.name} name={tag.name} count={tag.count} />
            ))}
          </div>
        ) : (
          <EmptyState title={t("tags.directory.empty")} />
        )}
      </div>
    </div>
  );
};

export default TagsDirectory;
