import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DifficultyState {
  currentDifficulty: number;
  mergeThreshold: number;
  eventFrequency: number;
}

const initialState: DifficultyState = {
  currentDifficulty: 1,
  mergeThreshold: 10,
  eventFrequency: 5
};

export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    increaseDifficulty: (state) => {
      state.currentDifficulty += 1;
      state.mergeThreshold += 5;
      state.eventFrequency += 2;
    },
    resetDifficulty: (state) => {
      state.currentDifficulty = 1;
      state.merge,mergeThreshold = 10;
      state.eventFrequency = 5;
    }
  }
});

export const { increaseDifficulty, resetDifficulty } = difficultySlice.actions;
export default difficultySlice.reducer;