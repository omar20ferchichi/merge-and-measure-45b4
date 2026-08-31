import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFirebaseSync } from '../services/firebaseService';

// Define the state type
interface ProgressState {
  mergeCount: number;
  difficulty: number;
  events: any[];
}

// Initialize state from Firebase
const initialState: ProgressState = {
  mergeCount: 0,
  difficulty: 1,
  events: []
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    incrementMergeCount(state, action: PayloadAction<number>) {
      state.mergeCount += action.payload;
      state.difficulty = Math.min(10, state.difficulty + Math.floor(state.mergeCount / 100));
    },
    addEvent(state, action: PayloadAction<any>) {
      state.events.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(useFirebaseSync.actions.saveProgress, (state, action) => {
        state.mergeCount = action.payload.mergeCount;
        state.difficulty = action.payload.difficulty;
        state.events = action.payload.events;
      });
  }
});

export const { incrementMergeCount, addEvent } = progressSlice.actions;
export default progressSlice.reducer;