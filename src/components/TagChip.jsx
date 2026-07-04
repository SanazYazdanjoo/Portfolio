import { Link } from 'react-router-dom';

const TagChip = ({ name, count, onRemove }) => {
  return (
    <div className="inline-flex items-center border border-gray-300 rounded bg-[#f4f7ed] text-sm text-gray-800 m-1">
      {/* Count Section */}
      <span className="px-3 py-1 border-r border-gray-300 bg-white font-mono">
        {count}
      </span>
      
      {/* Tag Name (Clickable link to its dedicated page) */}
      <Link to={`/tags/${encodeURIComponent(name)}`} className="px-3 py-1 hover:underline">
        {name}
      </Link>
      
      {/* 'X' Button */}
      {onRemove && (
        <button 
          onClick={() => onRemove(name)}
          className="pr-2 pl-1 text-green-700 hover:text-green-900 font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};