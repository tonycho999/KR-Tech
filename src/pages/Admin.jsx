import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import Button from '../components/common/Button';

const Admin = () => {
  const { projects, loading, createNewProject, removeProject } = usePortfolio();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  
  const [category, setCategory] = useState('Web & App'); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  // 🚨 단일 file 대신 files 배열 상태 사용
  const [files, setFiles] = useState([]); 

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginPassword === '202604' || loginPassword === '2580') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password. Please try again.");
      setLoginPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginPassword('');
  };

  // 🚨 파일 선택 핸들러 수정
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // 1. 장수 제한 체크
    if (selectedFiles.length > 4) {
      alert("You can upload a maximum of 4 images.");
      e.target.value = ''; // 입력창 초기화
      setFiles([]);
      return;
    }

    // 2. 각 파일 용량 체크 (700KB)
    for (let file of selectedFiles) {
      if (file.size > 700 * 1024) {
        alert(`File "${file.name}" exceeds 700KB. Please optimize and try again.`);
        e.target.value = '';
        setFiles([]);
        return;
      }
    }

    setFiles(selectedFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    // 🚨 파일 배열 체크
    if (files.length === 0) {
      alert("Please select at least one image file!");
      return;
    }
    
    // 🚨 createNewProject에 files 배열 전달
    const success = await createNewProject({ title, description, projectUrl, category }, files);
    
    if (success) {
      alert("Successfully uploaded!");
      setTitle('');
      setDescription('');
      setProjectUrl('');
      setCategory('Web & App'); 
      setFiles([]); // 파일 상태 초기화
      document.getElementById('file-upload-input').value = ''; 
    }
    // 실패 시 처리는 hook 내부 얼럿에서 수행함
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      // 🚨 ID만 전달
      await removeProject(id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" required
                value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full mt-6">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-red-600 tracking-tight">Portfolio Management</h2>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-2xl mb-12 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Add New Project</h3>
        <form onSubmit={handleUpload} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
            >
              <option value="Web & App">Web & App</option>
              <option value="Solution">Solution</option>
              <option value="Game">Game</option>
              <option value="Design">Design</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input 
              type="text" placeholder="e.g., Corporate Website Redesign" required 
              value={title} onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              placeholder="Describe the project goal, your role, and results..." required 
              value={description} onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400" rows="4"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project URL (Optional)</label>
            <input 
              type="url" placeholder="https://example.com" 
              value={projectUrl} onChange={e => setProjectUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400" 
            />
          </div>

          <div className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-600 block mb-1 font-medium">Upload Project Images</span>
            <span className="text-xs text-gray-500 block mb-4">Max 4 images, 700KB each. First image will be the cover.</span>
            
            {/* 🚨 multiple 속성 추가, handleFileChange 연결 */}
            <input 
              id="file-upload-input"
              type="file" accept="image/*" required multiple
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {/* 선택된 파일 개수 표시 */}
            {files.length > 0 && (
                <p className="text-sm text-blue-600 mt-3 font-medium">{files.length} files selected.</p>
            )}
          </div>
          
          <Button type="submit" variant="primary" className={loading ? "opacity-50 w-full py-3" : "w-full py-3"} disabled={loading}>
            {loading ? "Uploading Project..." : "Upload Project"}
          </Button>
        </form>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Registered Projects</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No portfolios registered yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {projects.map((project) => (
              <li key={project.id} className="py-5 flex justify-between items-center gap-4">
                <div className="flex items-center gap-4 overflow-hidden">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-100" />
                  )}
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                            {project.category || 'Others'}
                        </span>
                        {/* 🚨 이미지 장수 표시 */}
                        <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">
                            {project.imageUrls?.length || 0} Images
                        </span>
                    </div>
                    <span className="font-semibold text-gray-900 block truncate">{project.title}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleDelete(project.id)}
                  variant="outline" 
                  className="text-sm px-4 py-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 flex-shrink-0"
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
