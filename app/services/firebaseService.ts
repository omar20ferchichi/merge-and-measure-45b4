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

export interface PlayerProgress {
  mergeCount: number;
  currentMeasurement: number;
  difficultyLevel: number;
  lastEventTimestamp: number;
  eventsHistory: string[];
}

export const useFirebaseSync = () => {
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<PlayerProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const userRef = doc(db, 'players', user.uid);
        getDocs(query(collection(db, 'players'), where('uid', '==', user.uid))).then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const playerData = querySnapshot.docs[0].data() as PlayerProgress;
            setProgress(playerData);
          } else {
            // Create new player record if not exists
            setDoc(userRef, {
              mergeCount: 0,
              currentMeasurement: 0,
              difficultyLevel: 1,
              lastEventTimestamp: Date.now(),
              eventsHistory: []
            });
            setProgress({
              mergeCount: 0,
              currentMeasurement: 0,
              difficultyLevel: 1,
              lastEventTimestamp: Date.now(),
              eventsHistory: []
            });
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateProgress = (newProgress: Partial<PlayerProgress>) => {
    if (user) {
      const userRef = doc(db, 'players', user.uid);
      setDoc(userRef, {
        ...progress,
        ...newProgress,
        lastEventTimestamp: Date.now()
      });
    }
  };

  const triggerRandomEvent = async () => {
    if (user) {
      const userRef = doc(db, 'players', user.uid);
      const eventsHistory = [...(progress?.eventsHistory || []), `Random Event Triggered at ${new Date().toISOString()}`];
      await setDoc(userRef, {
        ...progress,
        eventsHistory,
        lastEventTimestamp: Date.now()
      });
    }
  };

  return { user, progress, loading, updateProgress, triggerRandomEvent };
};