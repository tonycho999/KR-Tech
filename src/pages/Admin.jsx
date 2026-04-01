import { useState } from 'react';
import Button from '../components/common/Button';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    // TODO: 1. Upload file to Firebase Storage -> Get URL
    // TODO: 2. Save { title, description, imageUrl, createdAt } to Firestore
    alert("Please connect the portfolio upload logic.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8 text-red-600">Admin Only: Portfolio Management</h2>
      
      {/* Upload Form */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12 border border-gray-200">
        <h3 className="text-lg font-bold mb-4">Add New Portfolio</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <input 
            type="text" placeholder="Project Title" required value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded" 
          />
          <textarea 
            placeholder="Project Description" required value={description} onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded" rows="3"
          ></textarea>
          <input 
            type="file" accept="image/*" required onChange={e => setFile(e.target.files[0])}
            className="w-full"
          />
          <Button type="submit" variant="primary">Upload</Button>
        </form>
      </div>

      {/* Portfolio List (For Deletion) */}
      <div>
        <h3 className="text-lg font-bold mb-4">Registered Projects</h3>
        <ul className="divide-y divide-gray-200">
          {/* TODO: Fetch from DB and map over the list */}
          <li className="py-4 flex justify-between items-center">
            <span>O2O Service App (Example)</span>
            <Button variant="outline" className="text-sm px-3 py-1 text-red-600 border-red-600 hover:bg-red-50">Delete</Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin;
