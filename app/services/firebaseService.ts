import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Track random event triggers
export const trackRandomEventTriggered = (eventId: string, effect: string) => {
  logEvent(analytics, 'random_event_triggered', {
    event_id: eventId,
    effect: effect
  });
  
  // Save event to Firebase
  const eventsRef = ref(db, 'random_events');
  const newEventRef = push(eventsRef);
  set(newEventRef, {
    event_id: eventId,
    effect: effect,
    timestamp: new Date().toISOString()
  });
};

// Track merge success
export const trackMergeSuccess = (mergeCount: number) => {
  logEvent(analytics, 'merge_success', {
    merge_count: mergeCount
  });
  
  // Save merge count to Firebase
  const mergeCountRef = ref(db, 'merge_counts');
  set(mergeCountRef, {
    count: mergeCount,
    timestamp: new Date().toISOString()
  });
};

// Track merge failure
export const trackMergeFailed = (mergeCount: number) => {
  log,analytics, 'merge_failed', {
    merge_count: mergeCount
  });
  
  // Save merge count to Firebase
  const mergeCountRef = ref(db, 'merge_counts');
  set(mergeCountRef, {
    count: mergeCount,
    timestamp: new Date().toISOString()
  });
};

// Track ad rewarded
export const trackAdRewarded = (rewardType: string) => {
  logEvent(analytics, 'ad_rewarded', {
    reward_type: rewardType
  });
};

// Track ad interstitial shown
export const trackAdInterstitialShown = () => {
  logEvent(analytics, 'ad_interstitial_shown');
};

// Track ads removed purchase
export const trackAdsRemovedPurchased = () => {
  logEvent(analytics, 'ads_removed_purchased');
};

// Listen for random events
export const listenForRandomEvents = (callback: (event: any) => void) => {
  const eventsRef = ref(db, 'random_events');
  onValue(eventsRef, (snapshot) => {
    const events = snapshot.val();
    if (events) {
      callback(events);
    }
  });
};