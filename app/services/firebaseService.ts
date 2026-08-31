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

export interface DifficultyState {
  currentDifficulty: number;
  mergeThreshold: number;
  eventFrequency: number;
}

export const useFirebaseSync = () => {
  const [user, setUser] = useState<any>(null);
  const [difficultyState, setDifficultyState] = useState<DifficultyState | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as DifficultyState;
            setDifficultyState(data);
          } else {
            // Initialize default difficulty state
            const defaultState: DifficultyState = {
              currentDifficulty: 1,
              mergeThreshold: 10,
              eventFrequency: 5
            };
            setDoc(docRef, defaultState);
            setDifficultyState(defaultState);
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const updateDifficultyState = async (newState: DifficultyState) => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      try {
        await updateDoc(docRef, newState);
        setDifficultyState(newState);
      } catch (error) {
        console.error('Error updating difficulty state:', error);
      }
    }
  };

  return { user, difficultyState, updateDifficultyState };
};