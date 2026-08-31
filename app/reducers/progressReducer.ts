import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveProgress, getProgress } from '../services/firebaseService';

interface ProgressState {
  progress: number;
  events: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: 0,
  events: [],
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
    setEvents: (state, action: PayloadAction<string[]>) => {
      state.events = action.payload;
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
      .addCase(saveProgress.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(saveProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to save progress';
      })
      .addCase(getProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load progress';
      });
  }
});

export const { setProgress, setEvents, setLoading, setError } = progressSlice.actions;
export default progressSlice.reducer;