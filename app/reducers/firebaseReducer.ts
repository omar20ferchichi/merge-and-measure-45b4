import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseService } from '../services/firebaseService';

interface FirebaseState {
  difficultyLevel: number;
  progress: number;
  lastUpdated: Date;
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseState = {
  difficultyLevel: 1,
  progress: 0,
  lastUpdated: new Date(),
  user: null,
  loading: false,
  error: null
};

export const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    setDifficultyLevel: (state, action: PayloadAction<number>) => {
      state.difficultyLevel = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setLastUpdated: (state, action: PayloadAction<Date>) => {
      state.lastUpdated = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(FirebaseService.trackDifficultyScaling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FirebaseService.trackDifficultyScaling.fulfilled, (state, action) => {
        state.loading = false;
        state.difficultyLevel = action.payload.difficultyLevel;
        state.progress = action.payload.progress;
        state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(FirebaseService.trackDifficultyScaling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FirebaseService.getUserDifficultyScaling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FirebaseService.getUserDifficultyScaling.fulfilled, (state, action) => {
        state.loading = false;
        state.difficultyLevel = action.payload.difficultyLevel;
        state.progress = action.payload.progress;
        state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(FirebaseService.getUserDifficultyScaling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FirebaseService.updateUserDifficultyScaling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FirebaseService.updateUserDifficultyScaling.fulfilled, (state, action) => {
        state.loading = false;
        state.difficultyLevel = action.payload.difficultyLevel;
        state.progress = action.payload.progress;
        state.lastUpdated = action.payload.lastUpdated;
      })
      .addCase(FirebaseService.updateUserDifficultyScaling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FirebaseService.deleteUserDifficultyScaling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FirebaseService.deleteUserDifficultyScaling.fulfilled, (state) => {
        state.loading = false;
        state.difficultyLevel = 1;
        state.progress = 0;
        state.lastUpdated = new Date();
      })
      .addCase(FirebaseService.deleteUserDifficultyScaling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setDifficultyLevel, setProgress, setLastUpdated, setUser, setLoading, setError } = firebaseSlice.actions;
export default firebaseSlice.reducer;