import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, collection, doc, setDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBz5qYkKx6z6X6X6X6X6X6X6X6X6X6X',
  authDomain: 'merge-measure-123.firebaseapp.com',
  projectId: 'merge-measure-123',
  storageBucket: 'merge-measure-123.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef1234567890',
  measurementId: 'G-1234567890',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Track merge success
export const trackMergeSuccess = async (userId: string, mergeCount: number) => {
  logEvent(analytics, 'merge_success', {
    userId,
    mergeCount,
  });
  // Optionally save to Firestore
  await setDoc(doc(db, 'mergeEvents', userId), {
    mergeCount,
    timestamp: new Date(),
  });
};

// Track merge failure
export const trackMergeFailure = async (userId: string, mergeCount: number) => {
  logEvent(analytics, 'merge_failed', {
    userId,
    mergeCount,
  });
  // Optionally save to Firestore
  await setDoc(doc(db, 'mergeEvents', userId), {
    merge,  mergeCount,
    timestamp: new Date(),
  });
};

// Get merge history
export const getMergeHistory = async (userId: string) => {
  const mergeRef = doc(db, 'mergeEvents', userId);
  const mergeSnap = await getDocs(mergeRef);
  return mergeSnap.data();
};

// Delete merge history
export const deleteMergeHistory = async (userId: string) => {
  const mergeRef = doc(db, 'mergeEvents', userId);
  await deleteDoc(mergeRef);
};