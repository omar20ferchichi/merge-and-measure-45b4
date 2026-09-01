import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Track analytics events
export const trackEvent = (eventType: string, eventData: Record<string, any>) => {
  logEvent(analytics, eventType, eventData);
};

// Save player progress to Firebase
export const saveProgress = async (playerId: string, progress: number) => {
  try {
    const docRef = doc(db, 'players', playerId);
    await setDoc(docRef, { progress: progress });
    trackEvent('merge_success', { playerId, progress });
  } catch (error) {
    console.error('Error saving progress:', error);
    trackEvent('merge_failed', { playerId, error: error.message });
  }
};

// Load player progress from Firebase
export const loadProgress = async (playerId: string): Promise<number | null> => {
  try {
    const docRef = doc(db, 'players', playerId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().progress || 0;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
    trackEvent('merge_failed', { playerId, error: error.message });
    return null;
  }
};

// Update player progress
export const updateProgress = async (playerId: string, progress: number) => {
  try {
    const docRef = doc(db, 'players', playerId);
    await updateDoc(doc
