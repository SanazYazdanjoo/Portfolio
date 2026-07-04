import data from './data.json';

export const profileData = data.profile;
// --- Hero Meta (homepage scan-strip) ---
export const getTagData = () => {
  const tagCounts = {};
  
  // Update "profileData.projects" to match exactly what your array is called!
  profileData.projects.forEach(item => {
    // Safety check: only map if the item actually has a tags array
    if (item.tags) { 
      item.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });
  
  return Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
};