import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import Button from '../components/common/Button';

const Admin = () => {
  const { projects, loading, createNewProject, removeProject } = usePortfolio();
  
  // 로그인 상태 관리 (이메일 삭제, 비밀번호만 남김)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  
  // 폼 상태 관리 (카테고리 추가)
  const [category, setCategory] = useState('(웹, 앱)'); // 기본값 설정
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [file, setFile] = useState(null);

  // 비밀번호만 확인하는 로그인
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

  // 업로드 함수
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an image file!");
      return;
    }

    if (file.size > 700 * 1024) {
      alert("Image size exceeds 700KB. Please optimize the image and try again.");
      return; 
    }
    
    // 백엔드로 보낼 때 category도 함께 묶어서 보냅니다.
    const success = await createNewProject({ title, description, projectUrl, category }, file);
    
    if (success) {
      alert("Successfully uploaded!");
      setTitle('');
      setDescription('');
      setProjectUrl('');
      setCategory('(웹, 앱)'); // 초기화
      setFile(null);
      document.getElementById('file-upload-input').value = ''; 
    } else {
      alert("Upload failed. Please try again.");
    }
  };

  const handleDelete = async (id, imageUrl) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await removeProject(id, imageUrl);
    }
  };

  // 1. 비로그인 상태 (심플해진 비밀번호 창)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              {/* 힌트 안보이게 placeholder 수정 */}
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

  // 2. 로그인 성공 시 화면
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-red-600">Admin Only: Portfolio Management</h2>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-12 border border-gray-200">
        <h3 className="text-lg font-bold mb-4">Add New Portfolio</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          
          {/* 카테고리 선택 드롭다운 추가 */}
          <div>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded bg-white"
            >
              <option value="(웹, 앱)">(웹, 앱)</option>
              <option value="(솔루션)">(솔루션)</option>
              <option value="(게임)">(게임)</option>
              <option value="(디자인)">(디자인)</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <input 
            type="text" placeholder="Project Title (Required)" required 
            value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded" 
          />
          <textarea 
            placeholder="Project Description (Required)" required 
            value={description} onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded" rows="3"
          ></textarea>
          
          <input 
            type="url" placeholder="Project Link URL (Optional, e.g., https://kr-tech.com)" 
            value={projectUrl} onChange={e => setProjectUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded" 
          />

          <div className="border border-gray-300 bg-white rounded p-2">
            <span className="text-sm text-gray-500 block mb-2">Max file size: 700KB</span>
            <input 
              id="file-upload-input"
              type="file" accept="image/*" required 
              onChange={e => setFile(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>
          
          <Button type="submit" variant="primary" className={loading ? "opacity-50 w-full" : "w-full"}>
            {loading ? "Uploading..." : "Upload Project"}
          </Button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Registered Projects</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500">No portfolios registered.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border-t border-b">
            {projects.map((project) => (
              <li key={project.id} className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title} className="w-16 h-12 object-cover rounded" />
                  )}
                  <div>
                    <span className="font-medium flex items-center gap-2">
                      {project.title}
                      {/* 관리자 목록에서도 카테고리를 작게 보여줍니다 */}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {project.category || '기타'}
                      </span>
                    </span>
                    {project.projectUrl && (
                      <span className="text-xs text-blue-500">{project.projectUrl}</span>
                    )}
                  </div>
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
