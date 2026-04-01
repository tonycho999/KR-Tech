import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

const COLLECTION_NAME = 'portfolios';

// 1. Fetch all portfolio projects
export const getProjects = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return projects;
  } catch (error) {
    console.error("Error fetching projects: ", error);
    throw error;
  }
};

// 2. Upload a new project (Image to Storage -> Data to Firestore)
export const addProject = async (projectData, imageFile) => {
  try {
    let imageUrl = '';

    // If there is an image, upload it to Firebase Storage first
    if (imageFile) {
      const uniqueFileName = `${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, `portfolio_images/${uniqueFileName}`);
      
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Save project details and image URL to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...projectData,
      imageUrl,
      createdAt: serverTimestamp()
    });

    return { id: docRef.id, ...projectData, imageUrl };
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// 3. Delete a project (Data from Firestore & Image from Storage)
export const deleteProject = async (projectId, imageUrl) => {
  try {
    // Delete document from Firestore
    await deleteDoc(doc(db, COLLECTION_NAME, projectId));

    // If an image URL exists, extract the file path and delete it from Storage
    if (imageUrl) {
      // Create a reference to the file to delete based on its URL
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw error;
  }
};
