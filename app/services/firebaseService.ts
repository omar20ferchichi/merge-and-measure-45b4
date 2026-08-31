import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Firebase service for tracking random events
export class FirebaseService {
  static async logRandomEventTriggered() {
    logEvent(analytics, 'random_event_triggered');
  }

  static async logMergeSuccess() {
    logEvent(analytics, 'merge_success');
  }

  static async logMergeFailed() {
    log,Event(analytics, 'merge_failed');
  }

  static async logAdRewarded() {
    logEvent(analytics, 'ad_rewarded');
  }

  static async logAdInterstitialShown() {
    logEvent(analytics, 'ad_interstitial_shown');
  }

  static async logAdsRemovedPurchased() {
    logEvent(analytics, 'ads_removed_purchased');
  }

  static async savePlayerProgress(progress: number) {
    try {
      const playerRef = doc(db, 'players', 'current');
      await setDoc(playerRef, { progress });
    } catch (error) {
      console.error('Error saving player progress:', error);
    }
  }

  static async getPlayerProgress(): Promise<number | null> {
    try {
      const playerRef = doc(db, 'players', 'current');
      const docSnap = await getDoc(playerRef);
      if (docSnap.exists()) {
        return docSnap.data().progress || 0;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching player progress:', error);
      return null;
    }
  }

  static async clearPlayerProgress() {
    try {
      const playerRef = doc(db, 'players', 'current');
      await deleteDoc(playerRef);
    } catch (error) {
      console.error('Error clearing player progress:', error);
    }
  }
}