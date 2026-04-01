const PortfolioCard = ({ project, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
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
        <p className="text-gray-600 line-clamp-2 text-sm">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default PortfolioCard;
