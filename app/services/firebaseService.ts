import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export const logMergeSuccess = () => {
  logEvent(analytics, 'merge_success');
};

export const logMergeFailed = () => {
  logEvent(analytics, 'merge_failed');
};

export const logRandomEventTriggered = () => {
  logEvent(analytics, 'random_event_triggered');
};

export const logAdRewarded = () => {
  logEvent(analytics, 'ad_rewarded');
};

export const logAdInterstitialShown = () => {
  log,analytics, 'ad_interstitial_shown');
};

export const logAdsRemovedPurchased = () => {
  logEvent(analytics, 'ads_removed_purchased');
};

export const saveProgress = (userId: string, progress: number) => {
  const progressRef = ref(database, `users/${userId}/progress`);
  set(progressRef, progress);
};

export const getProgress = (userId: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const progressRef = ref(database, `users/${userId}/progress`);
    onValue(progressRef, (snapshot) => {
      const progress = snapshot.val();
      if (progress !== null) {
        resolve(progress);
      } else {
        reject(new Error('Progress not found'));
      }
    });
  });
};

export const saveRandomEvent = (userId: string, event: string) => {
  const eventRef = ref(database, `users/${userId}/events`);
  push(eventRef, event);
};

export const getRandomEvents = (userId: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const eventRef = ref(database, `users/${userId}/events`);
    onValue(eventRef, (snapshot) => {
      const events = snapshot.val() || [];
      resolve(events);
    });
  });
};