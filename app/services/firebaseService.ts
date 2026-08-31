import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export const useFirebaseSync = () => {
  const [user, setUser] = useState(null);
  const [randomEvents, setRandomEvents] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const eventsRef = ref(db, `users/${user.uid}/randomEvents`);
        onValue(eventsRef, (snapshot) => {
          const eventsData = snapshot.val();
          if (eventsData) {
            setRandomEvents(Object.entries(eventsData).map(([id, event]) => ({ id, ...event })));
          } else {
            setRandomEvents([]);
          }
        });
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const triggerRandomEvent = (eventData) => {
    if (user) {
      const eventsRef = ref(db, `users/${user.uid}/randomEvents`);
      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
        timestamp: Date.now()
      };
      set(eventsRef, { [newEvent.id]: newEvent });
    }
  };

  const updateRandomEvent = (eventId, updatedData) => {
    if (user) {
      const eventRef = ref(db, `users/${user.uid}/random

      update(eventRef, { [eventId]: { ...updatedData } });
    }
  };

  const removeRandomEvent = (eventId) => {
    if (user) {
      const eventRef = ref(db, `users/${user.uid}/randomEvents`);
      remove(eventRef.child(eventId));
    }
  };

  return {
    user,
    randomEvents,
    triggerRandomEvent,
    updateRandomEvent,
    removeRandomEvent
  };
};