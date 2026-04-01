import { useState, useEffect, useCallback } from 'react';
import { getProjects, addProject, deleteProject } from '../lib/portfolioService';

export const usePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from DB
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Wrapper for adding a project (updates UI immediately)
  const createNewProject = async (projectData, file) => {
    try {
      setLoading(true);
      const newProject = await addProject(projectData, file);
      // Update local state without re-fetching everything
      setProjects(prev => [newProject, ...prev]); 
      return true;
    } catch (err) {
      setError(err.message || 'Failed to upload portfolio');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Wrapper for deleting a project (updates UI immediately)
  const removeProject = async (id, imageUrl) => {
    try {
      setLoading(true);
      await deleteProject(id, imageUrl);
      // Remove from local state
      setProjects(prev => prev.filter(project => project.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete portfolio');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    refreshProjects: fetchProjects,
    createNewProject,
    removeProject
  };
};

export default usePortfolio;
