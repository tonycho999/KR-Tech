import { useState, useEffect } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import Button from '../components/common/Button';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const Admin = () => {
  const { projects, loading, createNewProject, removeProject } = usePortfolio();
  
  // 로그인 상태 관리
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // 폼 상태 관리
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [file, setFile] = useState(null);

  // Firebase Auth 상태 감지 (새로고침해도 로그인 유지)
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  // 로그인 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert("Login failed: Check your email and password.");
      setLoginPassword('');
    }
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  // 업로드 함수 (700KB 제한 포함)
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an image file!");
      return;
    }

    // 🚨 700KB 용량 제한 체크 (700 * 1024 bytes = 716,800 bytes)
    if (file.size > 700 * 1024) {
      alert("Image size exceeds 700KB. Please optimize the image and try again.");
      return; // 조건에 맞지 않으면 업로드 중단
    }
    
    // 파일과 텍스트 데이터를 함께 전송
    const success = await createNewProject({ title, description, projectUrl }, file);
    
    if (success) {
      alert("Successfully uploaded!");
      setTitle('');
      setDescription('');
      setProjectUrl('');
      setFile(null);
      document.getElementById('file-upload-input').value = ''; // 파일 입력창 초기화
    } else {
      alert("Upload failed. You might not have permission.");
    }
  };

  // 삭제 함수
  const handleDelete = async (id, imageUrl) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await removeProject(id, imageUrl);
    }
  };

  // 1. 비로그인 상태일 때 보여줄 화면 (로그인 폼)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" required
                value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" required
                value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
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

  // 2. 로그인 성공 시 보여줄 관리자 대시보드 화면
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-red-600">Admin Only: Portfolio Management</h2>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      {/* 업로드 폼 영역 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12 border border-gray-200">
        <h3 className="text-lg font-bold mb-4">Add New Portfolio</h3>
        <form onSubmit={handleUpload} className="space-y-4">
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

      {/* 등록된 프로젝트 목록 영역 */}
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
