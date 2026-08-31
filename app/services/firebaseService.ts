import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
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

// Firebase service for merge tracking
export class FirebaseService {
  private userId: string | null = null;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.userId = user?.uid || null;
      console.log('Firebase auth state changed, user ID:', this.userId);
    });
  }

  // Track merge success
  public async trackMergeSuccess(mergeData: { mergeId: string, timestamp: number, success: boolean }) {
    if (!this.userId) {
      console.error('User not authenticated, cannot track merge success');
      return;
    }

    try {
      const mergeRef = doc(db, 'users', this.userId, 'merges', mergeData.mergeId);
      await setDoc(mergeRef, {
        ...mergeData,
        timestamp: mergeData.timestamp,
        success: mergeData.success,
        timestamp: Date.now()
      });
      console.log('Merge success tracked successfully');
    } catch (error) {
      console.error('Error tracking merge success:', error);
    }
  }

  // Track merge failure
  public async trackMergeFailure(mergeData: { mergeId: string, timestamp: number, reason: string }) {
    if (!this.userId) {
      console.error('User not authenticated, cannot track merge failure');
      return;
    }

    try {
      const mergeRef = doc(db, 'users', this, 'merges', mergeData.mergeId);
      await setDoc(mergeRef, {
        ...mergeData,
        timestamp: mergeData.timestamp,
        reason: mergeData.reason,
        timestamp: Date.now()
      });
      console.log('Merge failure tracked successfully');
    } catch (error) {
      console.error('Error tracking merge failure:', error);
    }
  }

  // Get all merge data for a user
  public async getMergeData() {
    if (!this.userId) {
      console.error('User not authenticated, cannot retrieve merge data');
      return [];
    }

    try {
      const mergeQuery = query(collection(db, 'users', this.userId, 'merges'));
      const querySnapshot = await getDocs(mergeQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error retrieving merge data:', error);
      return [];
    }
  }

  // Delete merge data
  public async deleteMergeData(mergeId: string) {
    if (!this.userId) {
      console.error('User not authenticated, cannot delete merge data');
      return;
    }

    try {
      const mergeRef = doc(db, 'users', this.userId, 'merges', mergeId);
      await deleteDoc(mergeRef);
      console.log('Merge data deleted successfully');
    } catch (error) {
      console.error('Error deleting merge data:', error);
    }
  }

  // Get user ID
  public getUserId(): string | null {
    return this.userId;
  }

  // Track analytics event
  public async trackAnalyticsEvent(eventName: string, eventData: Record<string, any>) {
    if (!this.userId) {
      console.error('User not authenticated, cannot track analytics event');
      return;
    }

    try {
      const eventRef = doc(db, 'users', this.userId, 'events', eventName);
      await setDoc(eventRef, {
        ...eventData,
        timestamp: Date.now()
      });
      console.log('Analytics event tracked successfully');
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }
}

// Singleton instance of FirebaseService
export const firebaseService = new FirebaseService();