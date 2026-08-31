import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveProgress, loadProgress, updateProgress, deleteProgress } from '../services/firebaseService';

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

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.progress = action.payload;
      })
      .addCase(saveProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to save progress';
      })
      .addCase(loadProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.progress = action.payload || 0;
      })
      .addCase(loadProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load progress';
      })
      .addCase(updateProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.progress = action.payload;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update progress';
      })
      .addCase(deleteProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProgress.fulfilled, (state) => {
        state.isLoading = false;
        state.progress = 0;
      })
      .addCase(deleteProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete progress';
      });
  }
});

export const { setProgress, setLoading, setError } = progressSlice.actions;
export default progressSlice.reducer;