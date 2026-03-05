import { Link } from "react-router-dom";

export function ProjectList({ items = [] }) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-16 md:gap-24 pl-6 md:pl-16 h-full py-24">
      {items.map((p, index) => (
        <Link to={`/projects/${p.id}`} key={p.id} className="group project-item flex items-start gap-8 focus-visible:outline-none">
          <div className="project-item-number ">
          <span className="text-6xl md:text-8xl font-black text-text/10 group-hover:text-primary transition-colors leading-none pt-1">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-6xl md:text-6xl text-primary transition-colors">.</span>


          </div>
          <div className="project-item-content">
            <div className="flex flex-col max-w-full mt-4">
            <h3 className="text-2xl md:text-42xl font-bold text-text group-hover:text-primary transition-colors mb-4">
              {p.title}
            </h3>
            
            <p className="text-lg md:text-lg text-dim leading-relaxed line-clamp-2">
              {p.subtitle || p.tagline || p.challenge || "No description available."}
            </p>
          </div>
          </div>
          
        </Link>
      ))}
    </div>
  );
}