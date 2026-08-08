import { Link } from 'react-router-dom';

const TagChip = ({ name, count, onRemove }) => {
  return (
    <div className="inline-flex items-center rounded-full border border-primary/25 bg-blush-weak text-xs font-semibold tracking-wide text-primary-600 m-1
                    transition-colors hover:bg-primary/15 hover:border-primary/40">
      {/* Tag Name (Clickable link to its dedicated page) */}
      <Link to={`/tags/${encodeURIComponent(name)}`} className="px-3 py-1">
        {name}
      </Link>

      {/* Count Section */}
      {typeof count === "number" && (
        <span className="pr-3 font-mono text-2xs text-primary-600/70">
          {count}
        </span>
      )}

      {/* 'X' Button */}
      {onRemove && (
        <button
          onClick={() => onRemove(name)}
          className="pr-3 pl-1 text-primary-600 hover:text-danger font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TagChip;