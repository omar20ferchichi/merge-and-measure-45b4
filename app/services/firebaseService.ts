import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
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

// State for current user
const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return user;
};

// Save progress to Firebase
const saveProgress = async (progress: any) => {
  const user = useFirebaseAuth();
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  try {
    await setDoc(userRef, { progress }, { mergeFields: true });
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

// Load progress from Firebase
const loadProgress = async () => {
  const user = useFirebase,auth();
  if (!user) return null;

  const userRef = doc(db, 'users', user.uid);
  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().progress;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
    return null;
  }
};

// Update progress in Firebase
const updateProgress = async (progress: any) => {
  const user = useFirebaseAuth();
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  try {
    await updateDoc(userRef, { progress });
  } catch (error) {
    console.error('Error updating progress:', error);
  }
};

// Delete progress from Firebase
const deleteProgress = async () => {
  const user = useFirebaseAuth();
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  try {
    await deleteDoc(userRef);
  } catch (error) {
    console.error('Error deleting progress:', error);
  }
};

export { saveProgress, loadProgress, updateProgress, deleteProgress, useFirebaseAuth };