import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';
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

// Firebase service for difficulty scaling tracking
export class FirebaseService {
  private user: any = null;
  private userId: string = '';

  constructor() {
    this.init();
  }

  private async init() {
    // Listen for auth state changes
    onAuthStateChanged(auth, async (user) => {
      this.user = user;
      if (user) {
        this.userId = user.uid;
        // Sync difficulty data on user login
        await this.syncDifficultyData();
      }
    });
  }

  // Sync difficulty data from Firebase
  private async syncDifficultyData() {
    if (!this.userId) return;
    const difficultyRef = doc(db, 'difficulty', this.userId);
    const docSnap = await getDocs(query(collection(db, 'difficulty'), where('userId', '==', this.userId)));
    if (!docSnap.empty) {
      const difficultyData = docSnap.docs[0].data();
      // Update local state with difficulty data
      // You can add logic here to update game state based on difficulty data
    }
  }

  // Save difficulty scaling state to Firebase
  public async saveDifficultyState(difficultyLevel: number, mergeCount: number) {
    if (!this.userId) return;
    const difficultyRef = doc(db, 'difficulty', this.userId);
    await setDoc(difficultyRef, {
      userId: this.userId,
      difficultyLevel: difficultyLevel,
      mergeCount: mergeCount,
      timestamp: new Date().toISOString()
    });
  }

  // Update difficulty level based on merge count
  public async updateDifficultyLevel(difficultyLevel: number) {
    if (!this.userId) return;
    const difficultyRef = doc(db, 'difficulty', this.userId);
    await updateDoc(diff
