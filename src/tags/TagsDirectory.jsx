import { useState } from 'react';
import { getTagData } from '../data/projects';
import { getSkillProjectCount } from '../utils/skillEvidence';
import { getSkillGroup, skillDirectoryCopy, skillGroupOrder } from '../data/skillDirectory';
import TagChip from '../components/TagChip';
import { useTranslation } from '../context/LanguageContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { profileData as rawProfile } from '../data/profile';
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';
import { EmptyState } from "../components/EmptyState";

const TagsDirectory = () => {
  const { localize } = useTranslation();
  const profileData = useLocalizedProfile(rawProfile);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'count'

  const title = localize(skillDirectoryCopy.title);
  const subheading = localize(skillDirectoryCopy.subheading);

  useDocumentMeta({
    title: `${title} — ${profileData.name}`,
    description: subheading,
  });

  // Only expose tags backed by a case study the recruiter can actually open.
  // Coming-soon cards are not counted yet, so they do not make a skill
  // clickable or inflate its project count.
  const rawTags = getTagData()
    .map(({ name }) => ({ name, count: getSkillProjectCount(name) }))
    .filter(({ count }) => count > 0);

  const filteredTags = rawTags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTags = [...filteredTags].sort((a, b) => {
    if (sortBy === 'count') return b.count - a.count || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });

  const groupedTags = skillGroupOrder
    .map((group) => ({
      group,
      label: localize(skillDirectoryCopy.groups[group]),
      tags: sortedTags.filter((tag) => getSkillGroup(tag.name) === group),
    }))
    .filter(({ tags }) => tags.length > 0);

  return (
    <div className="min-h-screen bg-bg pt-20 md:pt-24 pb-16">
      <div className="w-full px-4 md:px-8 max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text tracking-tighter leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base text-dim max-w-2xl leading-relaxed">
            {subheading}
          </p>
        </header>

        {/* Top Controls */}
        <div className="flex flex-wrap gap-3 mb-10 border-t rule-t pt-6">
          {/* The drawn outline lives on a wrapper, not on the field itself:
              a replaced element (input, select, iframe, img) never renders a
              pseudo-element, so .rule-frame has nothing to draw into. */}
          <span className="inline-block border rule-frame">
            <input
              type="text"
              placeholder={localize(skillDirectoryCopy.searchPlaceholder)}
              aria-label={localize(skillDirectoryCopy.searchPlaceholder)}
              className="block bg-bg px-3 py-2 text-sm text-text w-64 max-w-full focus-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </span>
          <span className="inline-block border rule-frame">
            <select
              aria-label={localize(skillDirectoryCopy.sortLabel)}
              className="block bg-bg px-3 py-2 text-sm text-text focus-ring"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">{localize(skillDirectoryCopy.sortByName)}</option>
              <option value="count">{localize(skillDirectoryCopy.sortByCount)}</option>
            </select>
          </span>
        </div>

        {groupedTags.length > 0 ? (
          <div className="space-y-10">
            {groupedTags.map(({ group, label, tags }) => (
              <section key={group} aria-labelledby={`skill-group-${group}`}>
                <div className="mb-4 flex items-end justify-between gap-4 border-b rule-b rule-soft pb-3">
                  <h2
                    id={`skill-group-${group}`}
                    className="font-display text-xl md:text-2xl font-black text-text"
                  >
                    {label}
                  </h2>
                  <span className="font-mono text-2xs font-bold text-dim" aria-label={`${tags.length} items`}>
                    {String(tags.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <TagChip key={tag.name} name={tag.name} count={tag.count} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState title={localize(skillDirectoryCopy.empty)} />
        )}
      </div>
    </div>
  );
};

export default TagsDirectory;
