import PortfolioCard from './PortfolioCard';

const PortfolioGrid = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        등록된 포트폴리오가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <PortfolioCard key={item.id} project={item} />
      ))}
    </div>
  );
};

export default PortfolioGrid;
