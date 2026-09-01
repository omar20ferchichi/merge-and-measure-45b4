import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseService } from '../services/firebaseService';

interface DifficultyState {
  difficultyLevel: number;
  mergeCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: DifficultyState = {
  difficultyLevel: 1,
  mergeCount: 0,
  isLoading: false,
  error: null
};

export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    setDifficultyLevel(state, action: PayloadAction<number>) {
      state.difficultyLevel = action.payload;
    },
    incrementMergeCount(state) {
      state.mergeCount += 1;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for async actions here
  }
});

export const { setDifficultyLevel, incrementMergeCount, setLoading, setError } = difficultySlice.actions;
export default difficultySlice.reducer;