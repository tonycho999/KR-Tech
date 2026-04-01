import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // 모바일 메뉴의 열림/닫힘 상태를 관리하는 State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 메뉴 토글 (열기/닫기) 함수
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 링크 클릭 시 메뉴를 닫아주는 함수
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 기존 h-16(고정 높이)을 지우고 py-4(상하 패딩)를 주어 로고 크기에 맞춰 자동 조절되게 합니다 */}
        <div className="flex justify-between py-4 items-center">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <img 
                src="/images/logo.png" 
                alt="KR-Tech Logo" 
                className="h-28 w-auto" 
              />
            </Link>
          </div>
          
          {/* PC Navigation Menu (hidden on mobile, flex on md and up) */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Portfolio</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
          </nav>

          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* 상태에 따라 햄버거(☰) 아이콘과 닫기(X) 아이콘을 번갈아 보여줍니다 */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  // X 아이콘
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // 햄버거 메뉴 아이콘
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/about" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">About</Link>
            <Link to="/services" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Services</Link>
            <Link to="/portfolio" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Portfolio</Link>
            <Link to="/contact" onClick={closeMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
