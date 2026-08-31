import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Firebase service for difficulty scaling tracking
export const FirebaseService = {
  init: () => {
    // Initialize Firebase
  },
  
  // Track difficulty scaling state
  trackDifficultyScaling: async (userId: string, difficultyLevel: number, progress: number) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        difficultyLevel: difficultyLevel,
        progress: progress,
        lastUpdated: new Date()
      }, { merge: true });
    } catch (error) {
      console.error('Error tracking difficulty scaling:', error);
    }
  },
  
  // Get user difficulty scaling state
  getUserDifficultyScaling: async (userId: string) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDocs(query(collection(db, 'users'), where('userId', '==', userId)));
      if (!userDoc.empty) {
        const userDocData = userDoc.docs[0].data();
        return {
          difficultyLevel: userDocData.difficultyLevel || 1,
          progress: userDocData.progress || 0,
          lastUpdated: userDocData.lastUpdated || new Date()
        };
      }
      return { difficultyLevel: 1, progress: 0, lastUpdated: new Date() };
    } catch (error) {
      console.error('Error fetching user difficulty scaling:', error);
      return { difficultyLevel: 1, progress: 0, lastUpdated: new Date() };
    }
  },
  
  // Update user difficulty scaling state
  updateUserDifficultyScaling: async (userId: string, difficultyLevel: number, progress: number) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        difficultyLevel: difficultyLevel,
        progress: progress,
        lastUpdated: new Date()
      }, { merge: true });
    } catch (error) {
      console.error('Error updating difficulty scaling:', error);
    }
  },
  
  // Delete user difficulty scaling data
  deleteUserDifficultyScaling: async (userId: string) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await deleteDoc(userDocRef);
    } catch (error) {
      console.error('Error deleting difficulty scaling data:', error);
    }
  }
};

// Firebase auth state listener
export const useAuth = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  
  return user;
};