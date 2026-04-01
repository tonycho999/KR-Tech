const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-blue-600 mb-4">"We Build Your Success"</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          KR-Tech is more than just an outsourcing agency. We are a technology partner that understands your business goals, proposes optimal IT solutions, and grows together with you. From stable architecture design to sleek UI/UX, our experts are with you every step of the way.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-8">
          <div className="p-4 bg-gray-50 rounded-lg"><span className="block font-bold text-2xl text-gray-900">50+</span>Projects</div>
          <div className="p-4 bg-gray-50 rounded-lg"><span className="block font-bold text-2xl text-gray-900">99%</span>Satisfaction</div>
          <div className="p-4 bg-gray-50 rounded-lg"><span className="block font-bold text-2xl text-gray-900">Modern</span>Tech Stack</div>
          <div className="p-4 bg-gray-50 rounded-lg"><span className="block font-bold text-2xl text-gray-900">Fast</span>Delivery</div>
        </div>
      </div>
    </div>
  );
};

export default About;
