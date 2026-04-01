const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-center text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">KR-Tech</h2>
        <p className="text-gray-400 text-sm mb-2">
          최고의 웹/앱/솔루션 개발 파트너
        </p>
        <p className="text-gray-500 text-xs mt-8">
          &copy; {new Date().getFullYear()} KR-Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
