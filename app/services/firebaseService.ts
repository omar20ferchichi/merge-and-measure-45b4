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

// Firebase service for merge success and failure sync
export class FirebaseService {
  private user: any = null;

  constructor() {
    this.init();
  }

  private async init() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (this.user) {
        // Sync merge data on user login
        this.syncMergeData();
      }
    });
  }

  // Sync merge success state
  public async syncMergeSuccess(mergeId: string, success: boolean) {
    if (!this.user) return;

    const mergeDocRef = doc(db, 'users', this.user.uid, 'merges', mergeId);
    try {
      await setDoc(mergeDocRef, {
        mergeId,
        success,
        timestamp: new Date(),
        status: 'success'
      });
      console.log(`Merge ${mergeId} success synced to Firebase`);
    } catch (error) {
      console.error('Error syncing merge success:', error);
    }
  }

  // Sync merge failure state
  public async syncMergeFailure(mergeId: string, reason: string) {
    if (!this.user) return;

    const mergeDocRef = doc(db, 'users', this.user.uid, 'merges', mergeId);
    try {
      await setDoc(mergeDoc, {
        mergeId,
        reason,
        timestamp: new Date(),
        status: 'failure'
      });
      console.log(`Merge ${mergeId} failure synced to Firebase`);
    } catch (error) {
      console.error('Error syncing merge failure:', error);
    }
  }

  // Sync merge data on user login
  private async syncMergeData() {
    if (!this.user) return;

    // Get all merge data for the user
    const mergeQuery = query(collection(db, 'users', this.user.uid, 'merges'));
    const mergeSnapshot = await getDocs(mergeQuery);

    mergeSnapshot.forEach((doc) => {
      const mergeData = doc.data();
      const mergeId = mergeData.mergeId;
      const status = mergeData.status;
      const reason = mergeData.reason || '';

      // Update local state based on Firebase data
      // This is where you would integrate with your local state management
      console.log(`Syncing merge ${mergeId} with status ${status} and reason ${reason}`);
    });
  }

  // Get merge data for a specific merge ID
  public async getMergeData(mergeId: string) {
    if (!this.user) return null;

    const mergeDocRef = doc(db, 'users', this.user.uid, 'merges', mergeId);
    const mergeDoc = await getDoc(mergeDocRef);
    return mergeDoc.exists() ? mergeDoc.data() : null;
  }

  // Update merge status (e.g., after a retry)
  public async updateMergeStatus(mergeId: string, status: string) {
    if (!this.user) return;

    const mergeDocRef = doc(db, 'users', this.user.uid, 'merges', mergeId);
    try {
      await updateDoc(mergeDocRef, {
        status,
        timestamp: new Date()
      });
      console.log(`Merge ${mergeId} status updated to ${status}`);
    } catch (error) {
      console.error('Error updating merge status:', error);
    }
  }

  // Delete a merge entry (e.g., for cleanup)
  public async deleteMerge(mergeId: string) {
    if (!this.user) return;

    const mergeDocRef = doc(db, 'users', this.user.uid, 'merges', mergeId);
    try {
      await deleteDoc(mergeDocRef);
      console.log(`Merge ${mergeId} deleted from Firebase`);
    } catch (error) {
      console.error('Error deleting merge:', error);
    }
  }

  // Get all merge data for the user
  public async getAllMergeData() {
    if (!this.user) return [];

    const mergeQuery = query(collection(db, 'users', this.user.uid, 'merges'));
    const mergeSnapshot = await getDocs(mergeQuery);
    const mergeData = [];

    mergeSnapshot.forEach((doc) => {
      mergeData.push(doc.data());
    });

    return mergeData;
  }

  // Track analytics event for merge success
  public trackMergeSuccess(mergeId: string) {
    // Implement analytics tracking here
    console.log(`Tracking merge success event for merge ${mergeId}`);
  }

  // Track analytics event for merge failure
  public trackMergeFailure(mergeId: string, reason: string) {
    // Implement analytics tracking here
    console.log(`Tracking merge failure event for merge ${mergeId} with reason: ${reason}`);
  }

  // Track analytics event for random event trigger
  public trackRandomEventTriggered(eventId: string) {
    // Implement analytics tracking here
    console.log(`Tracking random event triggered event for event ${eventId}`);
  }

  // Track analytics event for ad rewarded
  public trackAdRewarded(adType: string) {
    // Implement analytics tracking here
    console.log(`Tracking ad rewarded event for ad type: ${adType}`);
  }

  // Track analytics event for ad interstitial shown
  public trackAdInterstitialShown(adType: string) {
    // Implement analytics tracking here
    console.log(`Tracking ad interstitial shown event for ad type: ${adType}`);
  }

  // Track analytics event for ads removed purchased
  public trackAdsRemovedPurchased() {
    // Implement analytics tracking here
    console.log('Tracking ads removed purchased event');
  }

  // Get current user
  public getCurrentUser() {
    return this.user;
  }

  // Initialize Firebase and set up real-time updates
  public initFirebase() {
    // Firebase is already initialized in the constructor
    // Additional setup can be added here if needed
  }
}

// Initialize Firebase service
export const firebaseService = new FirebaseService();