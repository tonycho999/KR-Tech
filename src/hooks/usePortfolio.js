import { useState, useEffect } from 'react';

const usePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. 포트폴리오 목록 불러오기
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      // DB에 저장된 fileName을 바탕으로 화면에 띄울 이미지 URL 조합
      const formattedData = data.map(item => ({
        ...item,
        imageUrl: `/api/images/${item.fileName}`
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

  // 2. 새 포트폴리오 추가
  const createNewProject = async (projectData, file) => {
    setLoading(true);
    try {
      // 이미지 파일과 텍스트를 한 번에 서버로 전송할 수 있도록 포장
      const formData = new FormData();
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      formData.append('projectUrl', projectData.projectUrl);
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload');
      
      await fetchProjects();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 3. 포트폴리오 삭제
  const removeProject = async (id, imageUrl) => {
    setLoading(true);
    try {
      // 이미지 URL에서 실제 파일명(fileName)만 뽑아내기
      const fileName = imageUrl.split('/').pop();
      
      const response = await fetch(`/api/delete?id=${id}&fileName=${fileName}`, {
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
