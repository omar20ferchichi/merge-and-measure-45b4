import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firebaseService } from '../services/firebaseService';

interface ProgressState {
  level: number;
  score: number;
  merges: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  level: 0,
  score: 0,
  merges: 0,
  isLoading: false,
  error: null
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setMerges: (state, action: PayloadAction<number>) => {
      state.merges = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Load progress from Firebase
    builder.addCase(firebaseService.loadProgress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(firebaseService.loadProgress.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.level = action.payload.level;
        state.score = action.payload.score;
        state.merges = action.payload.merges;
      }
    });
    builder.addCase(firebaseService.loadProgress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to load progress';
    });

    // Save progress to Firebase
    builder.addCase(firebaseService.saveProgress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(firebaseService.saveProgress.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(firebaseService.saveProgress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to save progress';
    });

    // Update progress in Firebase
    builder.addCase(firebaseService.updateProgress.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(firebaseService.updateProgress.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(firebaseService.updateProgress.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to update progress';
    });
  }
});

export const { setLevel, setScore, setMerges, setLoading, setError } = progressSlice.actions;
export default progressSlice.reducer;