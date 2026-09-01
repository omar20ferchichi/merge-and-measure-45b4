import { createAction, createReducer } from '@reduxjs/toolkit';
import { FirebaseService } from '../services/firebaseService';

// Define Firebase state
interface FirebaseState {
  user: string | null;
  randomEvents: { id: string; timestamp: string; effect?: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseState = {
  user: null,
  randomEvents: [],
  loading: false,
  error: null
};

// Actions
export const setUser = createAction('firebase/setUser');
export const setRandomEvents = createAction('firebase/setRandomEvents');
export const setLoading = createAction('firebase/setLoading');
export const setError = createAction('firebase/setError');

// Reducer
export const firebaseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(setRandomEvents, (state, action) => {
      state.randomEvents = action.payload;
      state.loading = false;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});

// Firebase service integration
export const initFirebase = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await FirebaseService.init();
      const user = FirebaseService.getCurrentUser();
      if (user) {
        dispatch(setUser(user.uid));
        const events = await FirebaseService.getRandomEvents(user.uid);
        dispatch(setRandomEvents(events));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
