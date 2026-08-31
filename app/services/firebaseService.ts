import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
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

// Sync difficulty state with Firebase
export const syncDifficultyState = async (userId: string, difficulty: number) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, { difficulty }, { mergeFields: true });
    console.log('Difficulty state synced with Firebase');
  } catch (error) {
    console.error('Error syncing difficulty state with Firebase:', error);
  }
};

// Get difficulty state from Firebase
export const getDifficultyState = async (userId: string): Promise<number | null> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDoc
    if (docSnap.exists()) {
      const difficulty = docSnap.data().difficulty || 0;
      return difficulty;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching difficulty state from Firebase:', error);
    return null;
  }
};

// Listen for difficulty state changes
export const listenForDifficultyState = (userId: string, onUpdate: (difficulty: number) => void) => {
  const userDocRef = doc(db, 'users', userId);
  return onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const difficulty = doc
      onUpdate(difficulty);
    } else {
      console.log('No such document!');
    }
  });
};

// Update difficulty state after merge
export const updateDifficultyAfterMerge = async (userId: string, currentDifficulty: number) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { difficulty: currentDifficulty + 1 });
    console.log('Difficulty state updated after merge');
  } catch (error) {
    console.error('Error updating difficulty state after merge:', error);
  }
};

// Delete difficulty state (for testing)
export const deleteDifficultyState = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);
    console.log('Difficulty state deleted');
  } catch (error) {
    console.error('Error deleting difficulty state:', error);
  }
};