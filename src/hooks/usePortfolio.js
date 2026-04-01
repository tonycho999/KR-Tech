import { useState, useEffect } from 'react';

const usePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      
      // 🚨 백엔드에서 받은 imageNames 배열을 실제 URL 배열로 변환
      const formattedData = data.map(item => ({
        ...item,
        // 첫 번째 이미지를 대표 이미지로 사용 (목록화면용)
        imageUrl: item.imageNames && item.imageNames.length > 0 
          ? `/api/images/${item.imageNames[0]}` 
          : '/images/placeholder.png',
        // 전체 이미지 URL 배열 (모달 상세화면용)
        imageUrls: item.imageNames 
          ? item.imageNames.map(name => `/api/images/${name}`)
          : []
      }));
      setProjects(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 🚨 file 대신 files (배열)를 받도록 수정
  const createNewProject = async (projectData, files) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      formData.append('projectUrl', projectData.projectUrl);
      formData.append('category', projectData.category); 
      
      // 🚨 여러 파일을 'files'라는 이름으로 formData에 모두 추가
      files.forEach(file => {
        formData.append('files', file); 
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload');
      }
      
      await fetchProjects();
      return true;
    } catch (err) {
      setError(err.message);
      // 에러 메시지를 얼럿으로 띄워 사용자에게 알림 (예: 4장 초과 시)
      alert(err.message); 
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🚨 imageUrl 대신 imageUrls (배열)를 받지만, delete API는 ID만으로 처리하도록 수정됨
  const removeProject = async (id) => {
    setLoading(true);
    try {
      // 백엔드가 ID만 받으면 R2 이미지까지 다 지우도록 수정되었으므로 ID만 전송
      const response = await fetch(`/api/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');
      
      await fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, createNewProject, removeProject };
};

export default usePortfolio;
