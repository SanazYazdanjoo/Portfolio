import { Link } from 'react-router-dom';

const TagChip = ({ name, count, onRemove }) => {
  return (
    <div className="group inline-flex items-center rounded-full border-[1.5px] border-primary-600 bg-transparent text-xs font-semibold tracking-wide text-primary-600 m-1
                    transition-colors duration-200 ease-smooth hover:bg-primary-600 hover:border-primary-600 hover:text-white">
      <Link to={`/tags/${encodeURIComponent(name)}`} className="px-3 py-1">
        {name}
      </Link>

      {typeof count === "number" && (
        <span className="pr-3 font-mono text-2xs text-primary-600 transition-colors duration-200 group-hover:text-white/75">
          {count}
        </span>
      )}

      {onRemove && (
        <button
          onClick={() => onRemove(name)}
          className="pr-3 pl-1 font-bold text-primary-600 transition-colors duration-200 group-hover:text-white hover:!text-danger"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TagChip;