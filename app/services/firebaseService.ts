import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, collection, doc, setDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';

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

// Track merge success
export const trackMergeSuccess = async (playerId: string, mergeCount: number) => {
  logEvent(analytics, 'merge_success', {
    playerId,
    mergeCount,
    timestamp: new Date().toISOString()
  });
};

// Track merge failure
export const trackMergeFailure = async (playerId: string, mergeCount: number, errorMessage: string) => {
  logEvent(analytics, 'merge_failed', {
    playerId,
    merge, 
    mergeCount,
    errorMessage,
    timestamp: new Date().toISOString()
  });
};

// Track random event triggered
export const trackRandomEventTriggered = async (playerId: string, eventTypeId: string) => {
  logEvent(analytics, 'random_event_triggered', {
    playerId,
    eventTypeId,
    timestamp: new Date().toISOString()
  });
};

// Track ad rewarded
export const trackAdRewarded = async (playerId: string, rewardType: string) => {
  logEvent(analytics, 'ad_rewarded', {
    playerId,
    rewardType,
    timestamp: new Date().toISOString()
  });
};

// Track ad interstitial shown
export const trackAdInterstitialShown = async (playerId: string) => {
  logEvent(analytics, 'ad_interstitial_shown', {
    playerId,
    timestamp: new Date().toISOString()
  });
};

// Track ads removed purchased
export const trackAdsRemovedPurchased = async (playerId: string) => {
  logEvent(analytics, 'ads_removed_purchased', {
    playerId,
    timestamp: new Date().toISOString()
  });
};

// Get all merge success data for a player
export const getMergeSuccessData = async (playerId: string) => {
  try {
    const mergeSuccessRef = collection(db, 'merge_success');
    const q = query(mergeSuccessRef, where('playerId', '==', playerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching merge success data:', error);
    return [];
  }
};

// Get all merge failure data for a player
export const getMergeFailureData = async (playerId: string) => {
  try {
    const mergeFailureRef = collection(db, 'merge_failure');
    const q = query(mergeFailureRef, where('playerId', '==', playerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching merge failure data:', error);
    return [];
  }
};

// Get all random event data for a player
export const getRandomEventData = async (playerId: string) => {
  try {
    const randomEventRef = collection(db, 'random_events');
    const q = query(randomEventRef, where('playerId', '==', playerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching random event data:', error);
    return [];
  }
};

// Get all ad reward data for a player
export const getAdRewardData = async (playerId: string) => {
  try {
    const adRewardRef = collection(db, 'ad_rewards');
    const q = query(adRewardRef, where('playerId', '==', playerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching ad reward data:', error);
    return [];
  }
};

// Get all ad interstitial data for a player
export const getAdInterstitialData = async (playerId: string) => {
  try {
    const adInterstitialRef = collection(db, 'ad_interstitials');
    const q = query(adInterstitialRef, where('playerId', '==', playerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching ad interstitial data:', error);
    return [];
  }
};

// Get all ads removed purchase data for a player
export const getAdsRemovedPurchaseData = async (playerId: string) => {
  try {
    const adsRemovedPurchaseRef = collection(db, 'ads_removed_purchases');
    const q = query(adsRemovedPurchaseRef, where('playerId', '==', playerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching ads removed purchase data:', error);
    return [];
  }
};

// Delete a merge success entry
export const deleteMergeSuccessEntry = async (entryId: string) => {
  try {
    const mergeSuccessRef = doc(db, 'merge_success', entryId);
    await deleteDoc(mergeSuccessRef);
    console.log('Merge success entry deleted successfully');
  } catch (error) {
    console.error('Error deleting merge success entry:', error);
  }
};

// Delete a merge failure entry
export const deleteMergeFailureEntry = async (entryId: string) => {
  try {
    const mergeFailureRef = doc(db, 'merge_failure', entryId);
    await deleteDoc(mergeFailureRef);
    console.log('Merge failure entry deleted successfully');
  } catch (error) {
    console.error('Error deleting merge failure entry:', error);
  }
};

// Delete a random event entry
export const deleteRandomEventEntry = async (entryId: string) => {
  try {
    const randomEventRef = doc(db, 'random_events', entryId);
    await deleteDoc(randomEventRef);
    console.log('Random event entry deleted successfully');
  } catch (error) {
    console.error('Error deleting random event entry:', error);
  }
};

// Delete an ad reward entry
export const deleteAdRewardEntry = async (entryId: string) => {
  try {
    const adRewardRef = doc(db, 'ad_rewards', entryId);
    await deleteDoc(adRewardRef);
    console.log('Ad reward entry deleted successfully');
  } catch (error) {
    console.error('Error deleting ad reward entry:', error);
  }
};

// Delete an ad interstitial entry
export const deleteAdInterstitialEntry = async (entryId: string) => {
  try {
    const adInterstitialRef = doc(db, 'ad_interstitials', entryId);
    await deleteDoc(adInterstitialRef);
    console.log('Ad interstitial entry deleted successfully');
  } catch (error) {
    console.error('Error deleting ad interstitial entry:', error);
  }
};

// Delete an ads removed purchase entry
export const deleteAdsRemovedPurchaseEntry = async (entryId: string) => {
  try {
    const adsRemovedPurchaseRef = doc(db, 'ads_removed_purchases', entryId);
    await deleteDoc(adsRemovedPurchaseRef);
    console.log('Ads removed purchase entry deleted successfully');
  } catch (error) {
    console.error('Error deleting ads removed purchase entry:', error);
  }
};