const PortfolioCard = ({ project }) => {
  // project 객체 예시: { id, title, description, imageUrl, tags: ['React', 'Firebase'] }
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <img 
          src={project.imageUrl || '/images/placeholder.png'} 
          alt={project.title} 
          className="object-cover w-full h-48"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 line-clamp-2 text-sm mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags && project.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
