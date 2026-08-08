import data from './data.json';

export const profileData = data.profile;

export const getTagData = () => {
  const tagCounts = {};
  
  // Tag counts are derived from portfolioHighlights, not a separate projects list
  if (profileData.portfolioHighlights) {
    profileData.portfolioHighlights.forEach(item => {
      // Safety check: only map if the item actually has a tags array
      if (item.tags && Array.isArray(item.tags)) { 
        item.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
  }
  
  return Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
};