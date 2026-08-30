import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MergeFailureState {
  failureCount: number;
  difficultyLevel: number;
  lastFailedMerge: string | null;
}

const initialState: MergeFailureState = {
  failureCount: 0,
  difficultyLevel: 1,
  lastFailedMerge: null,
};

const mergeFailureSlice = createSlice({
  name: 'mergeFailure',
  initialState,
  reducers: {
    incrementFailureCount(state, action: PayloadAction<string>) {
      state.failureCount += 1;
      state.lastFailedMerge = action.payload;
      state.difficultyLevel = Math.min(state.difficultyLevel + 1, 10);
    },
    resetFailureCount(state) {
      state.failureCount = 0;
      state.difficultyLevel = 1;
      state.lastFailedMerge = null;
    },
    setDifficultyLevel(state, action: PayloadAction<number>) {
      state.difficultyLevel = action.payload;
    },
  },
});

export const { incrementFailureCount, resetFailureCount, setDifficultyLevel } = mergeFailureSlice.actions;

export default mergeFailureSlice.reducer;