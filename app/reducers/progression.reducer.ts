import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/reducers/root.reducer';

interface ProgressionState {
  currentMeasurement: number;
  difficultyLevel: number;
  levelProgress: number;
  mergeCount: number;
  isRandomEventActive: boolean;
  lastMergeTimestamp: number;
}

const initialState: ProgressionState = {
  currentMeasurement: 0,
  difficultyLevel: 1,
  levelProgress: 0,
  mergeCount: 0,
  isRandomEventActive: false,
  lastMergeTimestamp: 0,
};

export const progressionSlice = createSlice({
  name: 'progression',
  initialState,
  reducers: {
    incrementMeasurement(state, action: PayloadAction<number>) {
      state.currentMeasurement += action.payload;
      state.levelProgress = Math.min(100, (state.currentMeasurement / 1000) * 100);
      state.mergeCount += 1;
      state.difficultyLevel = Math.floor(state.mergeCount / 50) + 1;
      state.isRandomEventActive = Math.random() < 0.1;
      state.lastMergeTimestamp = Date.now();
    },
    resetProgression(state) {
      state.currentMeasurement = 0;
      state.difficultyLevel = 1;
      state.levelProgress = 0;
      state.mergeCount = 0;
      state.isRandomEventActive = false;
      state.lastMerge,timestamp = 0;
    },
    triggerRandomEvent(state) {
      state.isRandomEventActive = true;
    },
    completeLevel(state) {
      state.levelProgress = 100;
      state.difficultyLevel += 1;
      state.levelProgress = 0;
    },
  },
});

export const { incrementMeasurement, resetProgression, triggerRandomEvent, completeLevel } = progressionSlice.actions;

export const selectProgression = (state: RootState) => state.progression;