import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Area: public/images/logo.png 파일을 불러옵니다 */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="KR-Tech Logo" 
                className="h-12 w-auto" // 로고 높이를 40px(h-10)로 고정. 필요에 따라 h-8, h-12 등으로 조절하세요.
              />
              {/* 로고 이미지 옆에 텍스트를 남기고 싶다면 아래 코드를 유지하고, 이미지만 쓰고 싶다면 아래 span 태그를 지우세요. */}
              {/* <span className="text-xl font-bold text-gray-900 hidden sm:block">KR-Tech</span> */}
            </Link>
          </div>
          
          {/* PC Navigation Menu (English) */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Services</Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Portfolio</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
