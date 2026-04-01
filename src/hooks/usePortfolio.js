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

  const createNewProject = async (projectData, file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      formData.append('projectUrl', projectData.projectUrl);
      // 카테고리 데이터를 포장에 추가합니다
      formData.append('category', projectData.category); 
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

  const removeProject = async (id, imageUrl) => {
    setLoading(true);
    try {
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
