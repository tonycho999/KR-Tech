import PortfolioCard from './PortfolioCard';

const PortfolioGrid = ({ items, onProjectClick }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No portfolios registered yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <PortfolioCard 
          key={item.id} 
          project={item} 
          onClick={() => onProjectClick(item)} 
        />
      ))}
    </div>
  );
};

export default PortfolioGrid;
