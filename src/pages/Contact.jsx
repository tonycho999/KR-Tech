import Button from '../components/common/Button';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your inquiry has been submitted! (Functionality integration required)");
    // TODO: Save to Firebase DB or send via EmailJS
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company / Name</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact (Email or Phone)</label>
          <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
          <textarea rows="5" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Please describe your budget, timeline, and requirements."></textarea>
        </div>
        <Button type="submit" variant="primary" className="w-full py-3">Submit Inquiry</Button>
      </form>
    </div>
  );
};

export default Contact;
