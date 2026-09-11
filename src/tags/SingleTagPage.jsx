import { Navigate, useParams } from 'react-router-dom';

// Legacy compatibility: old bookmarks and indexed /tags/:tagName URLs now
// land in the evidence-first Projects filter instead of a separate tag page.
const SingleTagPage = () => {
  const { tagName = '' } = useParams();

  return (
    <Navigate
      replace
      to={`/projects?skill=${encodeURIComponent(tagName)}`}
    />
  );
};

export default SingleTagPage;
