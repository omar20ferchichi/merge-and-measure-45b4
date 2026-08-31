import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { savePlayerProgress, getPlayerProgress, updatePlayerProgress } from '../services/firebaseService';

interface ProgressState {
  progress: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: 0,
  isLoading: false,
  error: null
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    loadProgressStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadProgressSuccess(state, action: PayloadAction<number>) {
      state.progress = action.payload;
      state.isLoading = false;
    },
    loadProgressFailure(state, action: Payload, Action<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
      savePlayerProgress('user123', action.payload);
    }
  }
});

export const { loadProgressStart, loadProgressSuccess, loadProgressFailure, updateProgress } = progressSlice.actions;

export default progressSlice.reducer;