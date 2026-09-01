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

// Firebase service for tracking random events
export const FirebaseService = {
  // Track a random event trigger
  trackRandomEventTrigger: async (eventId: string, userId: string): Promise<void> => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, { randomEvents: [] });
      }

      const userDocSnap = await getDoc(userDocRef);
      const events = userDocSnap.data()?.randomEvents || [];
      
      if (!events.some(event => event.id === eventId)) {
        await updateDoc(userDocRef, {
          randomEvents: [...events, { id: eventId, timestamp: new Date().toISOString() }]
        });
      }
    } catch (error) {
      console.error('Error tracking random event:', error);
    }
  },

  // Track a random event effect
  trackRandomEventEffect: async (eventId: string, effect: string, userId: string): Promise<void> => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDoc");
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, { randomEvents: [] });
      }

      const userDocSnap = await getDoc(userDocRef);
      const events = userDocSnap.data()?.randomEvents || [];
      
      const updatedEvents = events.map(event => {
        if (event.id === eventId) {
          return { ...event, effect, timestamp: new Date().toISOString() };
        }
        return event;
      });

      await updateDoc(userDocRef, { randomEvents: updatedEvents });
    } catch (error) {
      console.error('Error tracking random event effect:', error);
    }
  },

  // Get all random events for a user
  getRandomEvents: async (userId: string): Promise<{ id: string, timestamp: string, effect?: string }[]> => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        return [];
      }

      return userDoc.data()?.randomEvents || [];
    } catch (error) {
      console.error('Error fetching random events:', error);
      return [];
    }
  },

  // Initialize Firebase service with user auth
  init: () => {
    return new Promise<void>((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, you can initialize Firebase here
          resolve();
        } else {
          // User is signed out, handle accordingly
          reject(new Error('User not authenticated'));
        }
      });
    });
  }
};
