import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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

// Firebase service for merge count tracking
export const useFirebase = () => {
  const [user, setUser] = useState<any>(null);
  const [mergeCount, setMergeCount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setMergeCount(docSnap.data().mergeCount || 0);
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const incrementMergeCount = async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        mergeCount: mergeCount + 1
      });
      setMergeCount(mergeCount + 1);
    }
  };

  const getMergeCount = () => mergeCount;

  return { user, mergeCount, incrementMergeCount, getMergeCount };
};