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

// Firebase service for progress tracking
export const useFirebaseService = () => {
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        getDocs(query(collection(db, 'users'), where('uid', '==', user.uid))).then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setProgress(userData.progress || 0);
          } else {
            // Create new user document if not exists
            setDoc(userRef, { progress: 0, uid: user.uid });
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Update progress in Firebase
  const updateProgress = async (newProgress: number) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await setDoc(userRef, { progress: newProgress, uid: user.uid });
        setProgress(new, 0);
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  // Delete user document from Firebase
  const deleteUserDocument = async () => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await deleteDoc(userRef);
        setUser(null);
      } catch (error) {
        console.error('Error deleting user document:', error);
      }
    }
  };

  return {
    user,
    progress,
    updateProgress,
    deleteUserDocument
  };
};