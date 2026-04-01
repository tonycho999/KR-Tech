import { useState } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import Button from '../components/common/Button';

const Admin = () => {
  const { projects, loading, createNewProject, removeProject } = usePortfolio();
  
  // 1. 로그인 상태와 입력값 관리 State 추가
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // 포트폴리오 폼 State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [file, setFile] = useState(null);

  // 2. 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = (e) => {
    e.preventDefault();
    
    // WARNING: 프론트엔드 하드코딩은 실제 서비스에서는 절대 권장하지 않습니다!
    // 요청하신 계정(a@a.com / 202604) 또는 비밀번호(2580) 확인
    const isMasterAccount = loginEmail === 'a@a.com' && loginPassword === '202604';
    const isPinLogin = loginPassword === '2580';

    if (isMasterAccount || isPinLogin) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Please try again.");
      setLoginPassword(''); // 틀렸을 때 비밀번호 칸만 비워주기
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image file!");
      return;
    }

    const success = await createNewProject({ title, description, projectUrl }, file);
    
    if (success) {
      alert("Successfully uploaded!");
      setTitle('');
      setDescription('');
      setProjectUrl('');
      setFile(null);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await removeProject(id, imageUrl);
    }
  };

  // 3. 로그인이 안 되어있다면 '로그인 폼' 화면만 보여줍니다.
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional for PIN login)</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password / PIN</label>
              <input 
                type="password" 
                required
                value={loginPassword} 
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
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

  // 4. 로그인이 성공하면 아래의 원래 관리자 화면을 보여줍니다.
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-red-600">Admin Only: Portfolio Management</h2>
        {/* 로그아웃 버튼 (새로고침 효과) */}
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
      </div>
      
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
            type="url" placeholder="Project URL (Optional, e.g., https://kr-tech.com)" 
            value={projectUrl} onChange={e => setProjectUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded" 
          />
          
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
                    <span className="font-medium block">{project.title}</span>
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
