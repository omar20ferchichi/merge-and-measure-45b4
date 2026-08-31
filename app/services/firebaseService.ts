import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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
export const useFirebaseMergeCount = () => {
  const [user, setUser] = useState(null);
  const [mergeCount, setMergeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setMergeCount(docSnap.data().mergeCount || 0);
            } else {
              // User document does not exist, create it with initial merge count
              setDoc(docRef, { mergeCount: 0 });
            }
            setLoading(false);
          })
          .catch((err) => {
            setError('Failed to fetch merge count: ' + err.message);
            setLoading(false);
          });
      } else {
        // User is signed out
        setMerge, setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const incrementMergeCount = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        mergeCount: mergeCount + 1
      });
      setMergeCount(mergeCount + 1);
      // Track merge success event
      // analytics.logEvent('merge_success');
    } catch (err) {
      setError('Failed to update merge count: ' + err.message);
    }
  };

  const resetMergeCount = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }
    try {
      const docRef = doc(db, 'users', user.uid);
      await deleteDoc(docRef);
      setMergeCount(0);
      // Track merge reset event
      // analytics.logEvent('merge_reset');
    } catch (err) {
      setError('Failed to reset merge count: ' + err.message);
    }
  };

  return {
    user,
    mergeCount,
    loading,
    error,
    incrementMergeCount,
    resetMergeCount
  };
};