import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const logRandomEvent = async (eventId: string, eventData: Record<string, any>) => {
  logEvent(analytics, 'random_event_triggered', {
    event_id: eventId,
    ...eventData
  });
};

export const savePlayerProgress = async (userId: string, progress: number) => {
  const docRef = doc(db, 'players', userId);
  await setDoc(docRef, { progress: progress });
};

export const getPlayerProgress = async (userId: string) => {
  const docRef = doc(db, 'players', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().progress : 0;
};

export const updatePlayerProgress = async (userId: string, progress: number) => {
  const docRef = doc(db, 'players', userId);
  await updateDoc(docRef, { progress: progress });
};