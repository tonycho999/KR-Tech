import { useState, useEffect } from 'react';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';

const Portfolio = () => {
  // TODO: Fetch data from Firebase (use usePortfolio hook later)
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Dummy data for testing
    setProjects([
      { id: 1, title: 'O2O Service App', description: 'Native app development for location-based services.', tags: ['React Native', 'Firebase'] },
      { id: 2, title: 'B2B Corporate Website', description: 'High-performance, SEO-optimized website built with Next.js.', tags: ['Next.js', 'Tailwind'] },
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Our Work</h2>
      <p className="text-center text-gray-600 mb-12">Explore the projects successfully delivered by KR-Tech.</p>
      
      <PortfolioGrid items={projects} />
    </div>
  );
};

export default Portfolio;
