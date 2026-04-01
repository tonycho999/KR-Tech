import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 로고 영역 */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              KR-Tech
            </Link>
          </div>
          
          {/* PC 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">회사소개</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">서비스</Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">포트폴리오</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">문의하기</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
