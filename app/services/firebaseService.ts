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

export const useFirebaseMergeCount = () => {
  const [mergeCount, setMergeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMergeCount = async () => {
      try {
        // Get current user
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No authenticated user');
        }

        // Fetch merge count from Firestore
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMergeCount(data.mergeCount || 0);
        } else {
          // User document does not exist, initialize with 0
          await setDoc(docRef, { mergeCount: 0 });
          setMergeCount(0);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load merge count');
        setLoading(false);
      }
    };

    fetchMergeCount();
  }, []);

  const incrementMergeCount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user');
      }

      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        mergeCount: mergeCount + 1
      });
      setMergeCount(prev => prev + 1);
      // Track analytics event for merge success
      // analytics.logEvent('merge_success');
    } catch (err) {
      setError('Failed to update merge count');
    }
  };

  return { mergeCount, loading, error, incrementMergeCount };
};