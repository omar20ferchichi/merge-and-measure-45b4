import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

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
  logEvent(analytics, 'ad_interstitial_shown');
};

export const logAdsRemovedPurchased = () => {
  logEvent(analytics, 'ads_removed_purchased');
};