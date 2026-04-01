const Services = () => {
  const services = [
    { title: "Web Development", desc: "We build fast, SEO-optimized responsive corporate websites, e-commerce platforms, and landing pages." },
    { title: "App Development", desc: "We develop high-performance native and cross-platform applications covering both iOS and Android." },
    { title: "Custom Solutions", desc: "We create customized systems like ERP, CRM, and back-office solutions that maximize your business efficiency." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
