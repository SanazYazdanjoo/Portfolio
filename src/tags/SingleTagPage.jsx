import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useLocalizedProfile } from '../hooks/useLocalizedProfile';

const SingleTagPage = () => {
  const { tagName } = useParams();
  const localizedProjects = useLocalizedProfile(projects);

  // Safely find all items that include this specific tag
  const relatedItems = localizedProjects.filter(item =>
    item.tags && item.tags.includes(tagName)
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link to="/tags" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to all tags
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Items tagged with: "{tagName}"</h1>
      
      <div className="grid gap-6">
        {relatedItems.map(item => (
          <div key={item.id} className="border border-black p-4">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.type} • {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleTagPage;