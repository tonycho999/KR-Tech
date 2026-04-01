import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Your IT Partner for <span className="text-blue-600">Business Innovation</span><br />
        KR-Tech.
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
        From web and app development to custom solutions. We turn your ideas into reality with cutting-edge tech stacks and flawless planning.
      </p>
      <div className="flex gap-4">
        <Link to="/portfolio">
          <Button variant="outline" className="text-lg px-8 py-3">View Portfolio</Button>
        </Link>
        <Link to="/contact">
          <Button variant="primary" className="text-lg px-8 py-3">Start a Project</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
