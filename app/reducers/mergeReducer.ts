import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MergeState, MergeSuccessState } from '../../types';

const initialState: MergeState = {
  mergeCount: 0,
  mergeSuccessStates: [],
  currentMergeSuccessState: null,
  difficultyLevel: 1,
  progress: 0,
  measurementGoal: 100,
};

const mergeSlice = createSlice({
  name: 'merge',
  initialState,
  reducers: {
    incrementMergeCount(state) {
      state.mergeCount += 1;
      state.progress = Math.min(100, (state.mergeCount / state.measurementGoal) * 100);
    },

    setMergeSuccessState(state, action: PayloadAction<MergeSuccessState>) {
      state.mergeSuccessStates.push(action.payload);
      state.currentMergeSuccessState = action.payload;

      // Update difficulty based on merge count
      if (state.mergeCount % 10 === 0) {
        state.difficultyLevel += 1;
        state.measurementGoal = Math.floor(state.measurementGoal * 1.2);
      }
    },

    resetMergeState(state) {
      state.mergeCount = 0;
      state.mergeSuccessStates = [];
      state.currentMergeSuccessState = null;
      state.difficultyLevel = 1;
      state.progress = 0;
      state.measurementGoal = 100;
    },

    updateProgress(state, action: PayloadAction<number>) {
      state.progress = Math.min(100, action.payload);
    },
  },
});

export const { incrementMergeCount, setMergeSuccessState, resetMergeState, updateProgress } = mergeSlice.actions;

export default mergeSlice.reducer;