import { useState } from 'react';
import { getTagData } from '../data/projects';
import TagChip from '../components/TagChip';

const TagsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'count'
  
  const rawTags = getTagData();

  // 1. Filter based on search
  const filteredTags = rawTags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Sort based on selection
  const sortedTags = [...filteredTags].sort((a, b) => {
    if (sortBy === 'count') return b.count - a.count; // Highest count first
    return a.name.localeCompare(b.name); // Alphabetical
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Top Controls */}
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search tags..." 
          className="border border-gray-300 p-2 rounded w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="border border-gray-300 p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="count">Sort by Count</option>
        </select>
      </div>

      {/* Tag Grid */}
      <div className="flex flex-wrap gap-2 mt-8">
        {sortedTags.map(tag => (
          <TagChip key={tag.name} name={tag.name} count={tag.count} />
        ))}
      </div>
    </div>
  );
};

export default TagsDirectory;