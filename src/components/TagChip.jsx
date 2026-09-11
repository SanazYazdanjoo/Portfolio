import { Link } from 'react-router-dom';
import { HandClose } from './HandIcons';
import { getSkillFilterHref } from '../utils/skillEvidence';

const TagChip = ({ name, count, onRemove }) => {
  const href = getSkillFilterHref(name);
  const interactive = Boolean(href);

  return (
    <div
      className={`group inline-flex items-center rounded-full border-[1.5px] rule-pill bg-transparent text-xs font-semibold tracking-wide m-1
                  ${interactive
                    ? "[--rule-line-color:var(--primary-600)] text-primary-600 transition-colors duration-200 ease-smooth hover:[--rule-fill-color:var(--primary-600)] hover:[color:var(--on-primary-600)]"
                    : "[--rule-line-color:var(--text-meta)] text-text-meta"}`}
    >
      {interactive ? (
        <Link to={href} className="px-3 py-1 rounded-full focus-ring">
          {name}
        </Link>
      ) : (
        <span className="px-3 py-1">{name}</span>
      )}

      {typeof count === "number" && (
        <span
          className={`pr-3 font-mono text-2xs ${interactive
            ? "text-primary-600 transition-colors duration-200 group-hover:[color:var(--on-primary-600)] group-hover:opacity-75"
            : "text-text-meta"}`}
        >
          {count}
        </span>
      )}

      {onRemove && (
        <button
          onClick={() => onRemove(name)}
          aria-label={`Remove ${name}`}
          className="pr-3 pl-1 font-bold text-primary-600 transition-colors duration-200 group-hover:text-white hover:!text-danger focus-ring"
        >
          <HandClose className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default TagChip;
