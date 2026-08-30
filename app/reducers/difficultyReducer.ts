import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DifficultyState {
  currentDifficulty: number;
  mergeCount: number;
  randomEventsTriggered: number;
  difficultyMultiplier: number;
}

const initialState: DifficultyState = {
  currentDifficulty: 1,
  mergeCount: 0,
  randomEventsTriggered: 0,
  difficultyMultiplier: 1,
};

export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState,
  reducers: {
    incrementMergeCount(state, action: PayloadAction<number>) {
      state.mergeCount += action.payload;
      state.currentDifficulty = calculateDifficulty(state.mergeCount, state.randomEventsTriggered);
      state.difficultyMultiplier = Math.min(1 + state.mergeCount / 100, 5);
    },
    triggerRandomEvent(state) {
      state.randomEventsTriggered += 1;
      state.currentDifficulty = calculateDifficulty(state.mergeCount, state.randomEventsTriggered);
      state.difficultyMultiplier = Math.min(1 + state.mergeCount / 100, 5);
    },
    resetDifficulty(state) {
      state.currentDifficulty = 1;
      state.mergeCount = 0;
      state.randomEventsTriggered = 0;
      state.difficultyMultiplier = 1;
    },
  },
});

export const { incrementMergeCount, triggerRandomEvent, resetDifficulty } = difficultySlice.actions;

export default difficultySlice.reducer;

function calculateDifficulty(mergeCount: number, randomEventsTriggered: number): number {
  const baseDifficulty = Math.min(1 + mergeCount / 100, 5);
  const eventMultiplier = 1 + (randomEventsTriggered / 10);
  return Math.min(baseDifficulty * eventMultiplier, 10);
}