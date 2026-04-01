import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

const Portfolio = () => {
  const { projects, loading, error } = usePortfolio();
  
  // 선택된 포트폴리오의 상태를 관리 (null이면 모달 닫힘, 객체가 있으면 모달 열림)
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Our Work</h2>
      <p className="text-center text-gray-600 mb-12">
        Explore the projects successfully delivered by KR-Tech.
      </p>
      
      {loading && <div className="text-center py-12 text-gray-500">Loading data...</div>}
      {error && <div className="text-center py-12 text-red-500">An error occurred: {error}</div>}
      
      {/* 카드를 클릭하면 setSelectedProject에 해당 프로젝트 데이터를 담습니다 */}
      {!loading && !error && (
        <PortfolioGrid items={projects} onProjectClick={setSelectedProject} />
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
            
            {/* 프로젝트 URL이 존재할 때만 Visit Website 버튼을 렌더링합니다 */}
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
