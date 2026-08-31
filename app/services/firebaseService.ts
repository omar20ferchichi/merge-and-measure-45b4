import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Firebase service for progression sync
export const useFirebaseSync = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({
    mergeCount: 0,
    difficulty: 1,
    events: []
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setProgress(docSnap.data());
          } else {
            // Initialize default progress
            setProgress({
              mergeCount: 0,
              difficulty: 1,
              events: []
            });
            // Save initial progress
            setDoc(docRef, progress);
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Save progress to Firebase
  const saveProgress = async (newProgress: { mergeCount: number; difficulty: number; events: any[] }) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(docRef, newProgress);
        setProgress(new
          { mergeCount: newProgress.mergeCount, difficulty: newProgress.difficulty, events: newProgress.events });
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  };

  // Add event to progress
  const addEvent = async (event: any) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(docRef, {
          events: [...progress.events, event]
        });
        setProgress(prev => ({
          ...prev,
          events: [...prev.events, event]
        }));
      } catch (error) {
        console.error('Error adding event: ', error);
      }
    }
  };

  return { user, progress, saveProgress, addEvent };
};