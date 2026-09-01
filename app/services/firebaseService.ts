import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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

// Firebase service class
export class FirebaseService {
  private user: any = null;

  constructor() {
    this.init();
  }

  private async init() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (this.user) {
        // User is signed in, see getAuth()
        console.log('User signed in:', this.user);
      } else {
        // User is signed out
        console.log('User signed out');
      }
    });
  }

  // Save player progress to Firebase
  async saveProgress(progress: { level: number; score: number; merges: number }) {
    if (!this.user) {
      console.error('User not authenticated');
      return;
    }

    const userDocRef = doc(db, 'users', this.user.uid);
    try {
      await setDoc(userDocRef, {
        level: progress.level,
        score: progress.score,
        merges: progress.merges,
        timestamp: new Date()
      }, { mergeFields: true });
      console.log('Progress saved successfully');
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Load player progress from Firebase
  async loadProgress(): Promise<{ level: number; score: number; merges: number } | null> {
    if (!this.user) {
      console.error('User not authenticated');
      return null;
    }

    const userDocRef = doc(db, 'users', this, user.uid);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          level: data.level || 0,
          score: data.score || 0,
          merges: data.merges || 0
        };
      } else {
        console.log('No such document');
        return null;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  }

  // Update player progress in Firebase
  async updateProgress(progress: { level: number; score: number; merges: number }) {
    if (!this.user) {
      console.error('User not authenticated');
      return;
    }

    const userDocRef = doc(db, 'users', this.user.uid);
    try {
      await updateDoc(userDocRef, {
        level: progress.level,
        score: progress.score,
        merges: progress.merges
      });
      console.log('Progress updated successfully');
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }

  // Get current user
  getUser(): any {
    return this.user;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.user;
  }

  // Sign out user
  signOut() {
    auth.signOut();
    console.log('User signed out');
  }
}

// Firebase service instance
export const firebaseService = new FirebaseService();