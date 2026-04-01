import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

// 영어로 변경된 카테고리 목록
const categories = ['All', 'Web & App', 'Solution', 'Game', 'Design', 'Others'];

const Portfolio = () => {
  const { projects, loading, error } = usePortfolio();
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('All'); // 현재 선택된 탭 상태

  const closeModal = () => {
    setSelectedProject(null);
  };

  // 선택된 탭에 맞춰 프로젝트를 걸러내는(Filter) 함수
  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Work</h2>
        <p className="text-lg text-gray-600">
          Explore the successful projects delivered by KR-Tech.
        </p>
      </div>
      
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="text-center py-12 text-gray-500">Loading data...</div>}
      {error && <div className="text-center py-12 text-red-500">An error occurred: {error}</div>}
      
      {/* 데이터가 없을 때의 빈 화면 처리 */}
      {!loading && !error && filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500">No projects found in this category.</p>
        </div>
      ) : (
        !loading && !error && (
          <PortfolioGrid items={filteredProjects} onProjectClick={setSelectedProject} />
        )
      )}

      {/* 모달 영역 */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={closeModal} 
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="flex flex-col gap-4">
            <img 
              src={selectedProject.imageUrl || '/images/placeholder.png'} 
              alt={selectedProject.title} 
              className="w-full max-h-64 object-cover rounded-md"
            />
            <p className="text-gray-700 whitespace-pre-wrap">
              {selectedProject.description}
            </p>
            
            {selectedProject.projectUrl && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <a 
                  href={selectedProject.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" className="w-full">
                    Visit Website
                  </Button>
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Portfolio;
