import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
} from 'firebase/firestore';
import {
  initializeAuth,
  signInAnonymously,
  onAuthStateChanged,
  Auth,
  User,
} from 'firebase/auth';
// getReactNativePersistence only exists in @firebase/auth's react-native build.
// Metro resolves this correctly at bundle/runtime time via the package's
// "react-native" export condition, but tsc's exports resolution doesn't pick
// the platform-specific branch here — a known, documented gap (not a runtime
// bug). Hence the ts-ignore rather than a real type error.
// @ts-ignore
import { getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
// Fill these in with your own Firebase project's config (Project settings ->
// General -> Your apps -> SDK setup and configuration) to enable cloud save.
// Until you do, the app runs fine — progress just stays local to the device.
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const isConfigured = firebaseConfig.apiKey !== 'YOUR_API_KEY' && !!firebaseConfig.apiKey;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  db = getFirestore(app);
} else {
  console.warn(
    '[firebase] No Firebase config set in app/services/firebase.ts — cloud save is disabled, progress will stay local to this device.'
  );
}

// ---------------------------------------------------------------------------
// Anonymous auth — gives every device a stable id to save progress under,
// with no login screen needed.
// ---------------------------------------------------------------------------
let currentUser: User | null = null;
let authReadyPromise: Promise<User | null> | null = null;

const getAuthedUser = (): Promise<User | null> => {
  if (!isConfigured || !auth) return Promise.resolve(null);
  if (currentUser) return Promise.resolve(currentUser);
  if (authReadyPromise) return authReadyPromise;

  authReadyPromise = new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth!, async (user) => {
      if (user) {
        currentUser = user;
        unsubscribe();
        resolve(user);
      } else {
        try {
          const credential = await signInAnonymously(auth!);
          currentUser = credential.user;
        } catch (error) {
          console.warn('[firebase] Anonymous sign-in failed:', error);
          currentUser = null;
        }
        unsubscribe();
        resolve(currentUser);
      }
    });
  });

  return authReadyPromise;
};

// ---------------------------------------------------------------------------
// Progress save/load
// ---------------------------------------------------------------------------
export interface SavedProgress {
  progress: number;
  updatedAt: number;
}

/** Returns true if real Firebase credentials have been configured. */
export const isCloudSaveEnabled = (): boolean => isConfigured;

/** Save the player's progress. No-ops quietly if Firebase isn't configured. */
export const saveProgress = async (progress: number): Promise<void> => {
  if (!isConfigured || !db) return;
  try {
    const user = await getAuthedUser();
    if (!user) return;
    await setDoc(doc(db, 'players', user.uid), {
      progress,
      updatedAt: Date.now(),
    } as SavedProgress);
  } catch (error) {
    console.warn('[firebase] Failed to save progress:', error);
  }
};

/** Load the player's saved progress. Returns null if none exists or Firebase isn't configured. */
export const loadProgress = async (): Promise<number | null> => {
  if (!isConfigured || !db) return null;
  try {
    const user = await getAuthedUser();
    if (!user) return null;
    const snapshot = await getDoc(doc(db, 'players', user.uid));
    if (snapshot.exists()) {
      const data = snapshot.data() as SavedProgress;
      return data.progress ?? null;
    }
    return null;
  } catch (error) {
    console.warn('[firebase] Failed to load progress:', error);
    return null;
  }
};
