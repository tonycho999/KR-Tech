import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import Button from '../components/common/Button';

const Admin = () => {
  // Fetch functions and project list from the hook
  const { projects, loading, createNewProject, removeProject } = usePortfolio();
  
  // Form input states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  // Function triggered when the upload button is clicked
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image file!");
      return;
    }

    // Execute the creation function from the hook
    const success = await createNewProject({ title, description }, file);
    
    if (success) {
      alert("Successfully uploaded!");
      setTitle(''); // Reset form fields
      setDescription('');
      setFile(null);
    }
  };

  // Function triggered when the delete button is clicked
  const handleDelete = async (id, imageUrl) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await removeProject(id, imageUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8 text-red-600">Admin Only: Portfolio Management</h2>
      
      {/* 1. Upload Form Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12 border border-gray-200">
        <h3 className="text-lg font-bold mb-4">Add New Portfolio</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <input 
            type="text" placeholder="Project Title" required 
            value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded" 
          />
          <textarea 
            placeholder="Project Description" required 
            value={description} onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded" rows="3"
          ></textarea>
          <input 
            type="file" accept="image/*" required 
            onChange={e => setFile(e.target.files[0])}
            className="w-full"
          />
          <Button type="submit" variant="primary" className={loading ? "opacity-50" : ""}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>

      {/* 2. Registered Portfolio List Section (For Deletion) */}
      <div>
        <h3 className="text-lg font-bold mb-4">Registered Projects</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500">No portfolios registered.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border-t border-b">
            {/* Map over the projects array fetched from the DB to create the list */}
            {projects.map((project) => (
              <li key={project.id} className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded" />
                  )}
                  <span className="font-medium">{project.title}</span>
                </div>
                <Button 
                  onClick={() => handleDelete(project.id, project.imageUrl)}
                  variant="outline" 
                  className="text-sm px-3 py-1 text-red-600 border-red-600 hover:bg-red-50"
                  disabled={loading}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;
