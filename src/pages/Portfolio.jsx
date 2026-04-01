import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

const categories = ['All', 'Web & App', 'Solution', 'Game', 'Design', 'Others'];

const Portfolio = () => {
  const { projects, loading, error } = usePortfolio();
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('All'); 
  
  // 🚨 모달에서 현재 보여주는 이미지의 인덱스 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0); // 모달 닫을 때 인덱스 초기화
  };

  // 🚨 다음 이미지로 넘기는 함수
  const nextImage = (e) => {
    e.stopPropagation(); // 모달 닫힘 방지
    if (!selectedProject || !selectedProject.imageUrls) return;
    setCurrentImageIndex((prev) => 
      (prev + 1) % selectedProject.imageUrls.length
    );
  };

  // 🚨 이전 이미지로 넘기는 함수
  const prevImage = (e) => {
    e.stopPropagation(); // 모달 닫힘 방지
    if (!selectedProject || !selectedProject.imageUrls) return;
    setCurrentImageIndex((prev) => 
      (prev - 1 + selectedProject.imageUrls.length) % selectedProject.imageUrls.length
    );
  };

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
      <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-100 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="text-center py-12 text-gray-500 font-medium">Loading masterpieces...</div>}
      {error && <div className="text-center py-12 text-red-500 bg-red-50 rounded-xl">An error occurred: {error}</div>}
      
      {!loading && !error && filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m14 0a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 font-medium text-lg">No projects found in this category.</p>
          <p className="text-gray-400 mt-1">Please check other technology stacks!</p>
        </div>
      ) : (
        !loading && !error && (
          <PortfolioGrid items={filteredProjects} onProjectClick={setSelectedProject} />
        )
      )}

      {/* 모달 영역 (갤러리 기능 추가) */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={closeModal} 
        title={selectedProject?.title}
      >
        {selectedProject && selectedProject.imageUrls && (
          <div className="flex flex-col gap-6">
            
            {/* 🚨 이미지 갤러리 영역 */}
            <div className="relative group bg-gray-950 rounded-xl overflow-hidden shadow-inner aspect-[4/3] flex items-center justify-center">
              
              {/* 현재 이미지 */}
              <img 
                src={selectedProject.imageUrls[currentImageIndex]} 
                alt={`${selectedProject.title} - ${currentImageIndex + 1}`} 
                className="max-w-full max-h-full object-contain transition-opacity duration-300"
              />

              {/* 🚨 이미지가 2장 이상일 때만 네비게이션 버튼 표시 */}
              {selectedProject.imageUrls.length > 1 && (
                <>
                  {/* 이전 버튼 */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* 다음 버튼 */}
                  <button 
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* 인디케이터 (점) */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 p-1.5 bg-black/30 rounded-full backdrop-blur-sm">
                    {selectedProject.imageUrls.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="px-1">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-semibold">
                        {selectedProject.category || 'Others'}
                    </span>
                    {selectedProject.imageUrls.length > 1 && (
                         <span className="text-xs text-gray-500">
                            Image {currentImageIndex + 1} of {selectedProject.imageUrls.length}
                         </span>
                    )}
                </div>
                
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {selectedProject.description}
                </p>
            </div>
            
            {selectedProject.projectUrl && (
              <div className="mt-2 pt-5 border-t border-gray-100 flex justify-end">
                <a 
                  href={selectedProject.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" className="w-full px-8 py-3">
                    Visit Live Website
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
