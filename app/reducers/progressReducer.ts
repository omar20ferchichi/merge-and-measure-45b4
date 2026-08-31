import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgressData } from '../services/firebaseService';

interface ProgressState {
  progress: ProgressData;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: {
    mergeCount: 0,
    difficultyLevel: 1,
    lastMergeTimestamp: Date.now(),
    randomEvents: []
  },
  loading: false,
  error: null
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    updateMergeCount: (state, action: PayloadAction<number>) => {
      state.progress.mergeCount = action.payload;
      state.progress.lastMergeTimestamp = Date.now();
      state.progress.difficultyLevel = Math.min(10, state.progress.difficultyLevel + 1);
    },
    addRandomEvent: (state, action: PayloadAction<string>) => {
      state.progress.randomEvents.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const { updateMergeCount, addRandomEvent, setLoading, setError } = progressSlice.actions;

export default progressSlice.reducer;