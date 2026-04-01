const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          From modern web applications to cutting-edge AI integrations, we provide end-to-end technology solutions designed to scale your business.
        </p>
      </div>

      {/* Services Grid (3 columns on large screens, 2 on medium, 1 on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* 1. Web Development */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Web Development</h3>
          <p className="text-gray-600 leading-relaxed">
            We build lightning-fast, SEO-optimized corporate websites, high-converting landing pages, and robust e-commerce platforms tailored to your target audience.
          </p>
        </div>

        {/* 2. Mobile App Development */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">App Development</h3>
          <p className="text-gray-600 leading-relaxed">
            Deliver seamless mobile experiences with high-performance native and cross-platform applications covering both iOS and Android ecosystems.
          </p>
        </div>

        {/* 3. Custom Solutions (ERP/CRM) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Solutions</h3>
          <p className="text-gray-600 leading-relaxed">
            Maximize your operational efficiency with tailor-made back-office systems, ERPs, and CRMs that fit your unique workflows perfectly.
          </p>
        </div>

        {/* 4. UI/UX Design */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">UI/UX Design</h3>
          <p className="text-gray-600 leading-relaxed">
            Create stunning, intuitive user interfaces that elevate your brand identity. We design user-centric experiences that keep your customers engaged.
          </p>
        </div>

        {/* 5. Business Automation */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Business Automation</h3>
          <p className="text-gray-600 leading-relaxed">
            Stop wasting time on repetitive tasks. We build powerful Python scripts, web scrapers, and automated workflows to save you hundreds of hours.
          </p>
        </div>

        {/* 6. AI-Powered Solutions */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2M4.929 4.929l1.414 1.414M17.657 17.657l1.414 1.414M2 12h2m16 0h2M4.929 19.071l1.414-1.414M17.657 6.343l1.414-1.414" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">AI Integration</h3>
          <p className="text-gray-600 leading-relaxed">
            Future-proof your business with cutting-edge AI. From smart customer support chatbots to automated data analysis, we put AI to work for you.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Services;
