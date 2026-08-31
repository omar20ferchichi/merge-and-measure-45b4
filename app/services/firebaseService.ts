import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, query, where, updateDoc } from 'firebase/firestore';
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

// Track merge success
export const trackMergeSuccess = async (userId: string, mergeCount: number) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      mergeCount: mergeCount,
      lastMergeTimestamp: new Date().toISOString()
    });
    console.log('Merge success tracked for user:', userId);
  } catch (error) {
    console.error('Error tracking merge success:', error);
  }
};

// Track merge failure
export const trackMergeFailure = async (userId: string, mergeCount: number) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      mergeCount: mergeCount,
      lastMergeTimestamp: new Date().toISOString()
    });
    console.log('Merge failure tracked for user:', userId);
  } catch (error) {
    console.error('Error tracking merge failure:', error);
  }
};

// Get user progress
export const getUserProgress = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDocs(query(collection(db, 'users'), where('userId', '==', userId)));
    const userDoc = userSnap.docs[0];
    return userDoc.data();
  } catch (error) {
    console.error('Error getting user progress:', error);
    return null;
  }
};

// Listen for auth state changes
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  
  return user;
};