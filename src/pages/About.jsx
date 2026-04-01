const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
      
      {/* 1. Hero Section (Introduction) */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          We don't just write code.<br className="hidden sm:block" />
          <span className="text-blue-600">We build your business.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          KR-Tech is a specialized team of veteran developers and strategists. We broke away from the slow, bureaucratic processes of large agencies to focus on what truly matters: <strong className="font-semibold text-gray-900">delivering real, measurable results for your project.</strong>
        </p>
      </div>

      {/* 2. Core Values (3 Pillars of Trust) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        
        {/* Value 1: Focus */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Dedicated Focus</h3>
          <p className="text-gray-600 leading-relaxed">
            We are not a coding factory. We take on a limited number of projects at a time so we can treat your business with the deep focus, care, and ownership it deserves. Your success is our reputation.
          </p>
        </div>

        {/* Value 2: Tech-Agnostic */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m14 0a2 2 0 00-2-2H5a2 2 0 00-2 2m0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Architecture</h3>
          <p className="text-gray-600 leading-relaxed">
            We don’t force you into a specific platform. Whether it’s AWS, Google Cloud, or modern Edge computing, we design the most cost-effective and scalable architecture tailored to your exact needs.
          </p>
        </div>

        {/* Value 3: Direct Communication */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">No Middlemen</h3>
          <p className="text-gray-600 leading-relaxed">
            Say goodbye to account managers who don't understand technology. You will communicate directly with the senior engineers building your product, ensuring zero miscommunication and fast execution.
          </p>
        </div>

      </div>

      {/* 3. Closing / Philosophy statement */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          The Engineering Standard
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We refuse to deliver code that "just works." From rock-solid security to intuitive UI/UX design, our standard for completion is a product that runs flawlessly without technical debt. <br className="hidden sm:block mt-2" />
          <span className="font-medium text-blue-600">Experience the difference of working with true professionals.</span>
        </p>
      </div>

    </div>
  );
};

export default About;
