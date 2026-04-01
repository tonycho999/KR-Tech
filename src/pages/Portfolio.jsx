import usePortfolio from '../hooks/usePortfolio';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';

const Portfolio = () => {
  // Fetch data (projects) and status states from the custom hook
  const { projects, loading, error } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Our Work</h2>
      <p className="text-center text-gray-600 mb-12">
        Explore the projects successfully delivered by KR-Tech.
      </p>
      
      {/* Conditionally render based on data status */}
      {loading && <div className="text-center py-12 text-gray-500">Loading data...</div>}
      {error && <div className="text-center py-12 text-red-500">An error occurred: {error}</div>}
      
      {/* Show the grid when loading is finished and there are no errors */}
      {!loading && !error && <PortfolioGrid items={projects} />}
    </div>
  );
};

export default Portfolio;
