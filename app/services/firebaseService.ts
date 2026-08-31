import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
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

// Firebase service for merge count sync
export class FirebaseService {
  private userUid: string | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userUid = user.uid;
        this.syncMergeCount();
      } else {
        this.userUid = null;
      }
    });
  }

  private async syncMergeCount() {
    if (!this.userUid) return;

    const mergeCountRef = doc(db, 'users', this.userUid);
    const mergeCountSnap = await getDoc(mergeCountRef);

    if (mergeCountSnap.exists()) {
      // Load merge count from Firebase
      const mergeCount = mergeCountSnap.data().mergeCount || 0;
      // Update local state (you can store this in context or state)
      console.log('Merge count loaded from Firebase:', mergeCount);
    } else {
      // Initialize merge count if not exists
      await setDoc(mergeCountRef, { mergeCount: 0 });
      console.log('Merge count initialized in Firebase');
    }
  }

  public async incrementMergeCount() {
    if (!this.userUid) return;

    const mergeCountRef = doc(db, 'users', this.userUid);
    const mergeCountSnap = await getDoc(mergeCountRef);

    if (mergeCountSnap.exists()) {
      const mergeCount = mergeCountSnap.data().mergeCount || 0;
      await updateDoc(mergeCountRef, { mergeCount: mergeCount + 1 });
      console.log('Merge count updated in Firebase');
    } else {
      await setDoc(mergeCountRef, { mergeCount: 1 });
      console.log('Merge count initialized and updated in Firebase');
    }
  }

  public async resetMergeCount() {
    if (!this.userUid) return;

    const mergeCountRef = doc(db, 'users', this.userUid);
    await deleteDoc(mergeCountRef);
    console.log('Merge count reset in Firebase');
  }

  public async getMergeCount(): Promise<number> {
    if (!this.userUid) return 0;

    const mergeCountRef = doc(db, 'users', this.userUid);
    const mergeCountSnap = await getDoc(mergeCountRef);

    if (mergeCountSnap.exists()) {
      return mergeCountSnap.data().mergeCount || 0;
    } else {
      return 0;
    }
  }

  // Example: Add a new user to Firebase
  public async addUser(username: string) {
    const usersRef = collection(db, 'users');
    const newUserRef = doc(usersRef);
    await setDoc(newUserRef, { username, mergeCount: 0 });
    console.log('User added to Firebase');
  }

  // Example: Get all users from Firebase
  public async getAllUsers(): Promise<{ id: string; username: string; mergeCount: number }[]> {
    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef);
    const querySnapshot = await getDocs(usersQuery);

    const users: { id: string; username: string; mergeCount: number }[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({ id: doc.id, username: data.username || 'Unknown', mergeCount: data.mergeCount || 0 });
    });
    return users;
  }

  // Example: Update a user's merge count
  public async updateUserMergeCount(userId: string, mergeCount: number) {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { mergeCount });
    console.log('User merge count updated in Firebase');
  }

  // Example: Delete a user
  public async deleteUser(userId: string) {
    const userRef = doc(db, 'users', userId);
    await deleteDoc(userRef);
    console.log('User deleted from Firebase');
  }
}

// Firebase service instance
export const firebaseService = new FirebaseService();