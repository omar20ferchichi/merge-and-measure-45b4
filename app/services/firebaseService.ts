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

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return user;
};

export const saveDifficultyScalingState = async (userId: string, difficultyScaling: number) => {
  const userDocRef = doc(db, 'users', userId);
  try {
    await setDoc(userDocRef, { difficultyScaling }, { mergeFields: true });
  } catch (error) {
    console.error('Error saving difficulty scaling state:', error);
  }
};

export const getDifficultyScalingState = async (userId: string): Promise<number | null> => {
  const userDocRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data().difficultyScaling || 0;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting difficulty scaling state:', error);
    return null;
  }
};

export const updateDifficultyScaling = async (userId: string, difficultyScaling: number) => {
  const userDocRef = doc(db, 'users', userId);
  try {
    await updateDoc(userDoc, { difficultyScaling });
  } catch (error) {
    console.error('Error updating difficulty scaling:', error);
  }
};

export const deleteDifficultyScaling = async (userId: string) => {
  const userDocRef = doc(db, 'users', userId);
  try {
    await deleteDoc(userDocRef);
  } catch (error) {
    console.error('Error deleting difficulty scaling:', error);
  }
};