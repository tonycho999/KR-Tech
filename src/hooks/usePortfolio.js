import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase'; // storage는 가져오지 않음

const usePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'portfolios'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // file 관련 변수 제거, projectData(텍스트 모음)만 받음
  const createNewProject = async (projectData) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'portfolios'), {
        ...projectData,
        createdAt: new Date()
      });
      await fetchProjects(); // 등록 후 목록 새로고침
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Storage 이미지 삭제 로직 제거, DB 문서만 삭제
  const removeProject = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'portfolios', id));
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
