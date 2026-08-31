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

export interface ProgressData {
  mergeCount: number;
  difficultyLevel: number;
  lastMergeTimestamp: number;
  randomEvents: string[];
}

export const useFirebaseProgress = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setProgress(docSnap.data() as ProgressData);
          } else {
            // Initialize new progress
            const initialProgress: ProgressData = {
              mergeCount: 0,
              difficultyLevel: 1,
              lastMergeTimestamp: Date.now(),
              randomEvents: []
            };
            setDoc(docRef, initialProgress);
            setProgress(initial
