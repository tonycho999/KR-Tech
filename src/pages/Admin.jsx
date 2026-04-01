import { useState, useEffect } from 'react';
import usePortfolio from '../hooks/usePortfolio';
import Button from '../components/common/Button';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const Admin = () => {
  const { projects, loading, createNewProject, removeProject } = usePortfolio();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // 파일 대신 Image URL 상태 사용

  // 로그인 상태 유지 확인 (새로고침해도 풀리지 않음)
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  // 진짜 Firebase 로그인
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      // 로그인 성공 시 onAuthStateChanged가 감지하여 isAuthenticated를 true로 바꿈
    } catch (error) {
      alert("Login failed: Check your email and password.");
      setLoginPassword('');
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    // imageUrl을 포함하여 전송 (파일 업로드 없음)
    const success = await createNewProject({ title, description, projectUrl, imageUrl });
    
    if (success) {
      alert("Successfully uploaded!");
      setTitle('');
      setDescription('');
      setProjectUrl('');
      setImageUrl('');
    } else {
      alert("Upload failed. You might not have permission.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" required
                value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" required
                value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
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
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-red-600">Admin Only: Portfolio Management</h2>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
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

          {/* 파일 첨부 대신 이미지 링크를 넣는 곳으로 변경 */}
          <input 
            type="url" placeholder="Image URL (Required, e.g., https://imgur.com/.../img.jpg)" required
            value={imageUrl} onChange={e => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded" 
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
                  </div>
                </div>
                <Button 
                  onClick={() => handleDelete(project.id)}
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
