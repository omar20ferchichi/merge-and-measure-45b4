import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAuthState } from '../services/firebaseService';

interface MergeState {
  mergeCount: number;
  lastMergeTimestamp: string;
  isMerging: boolean;
  mergeSuccess: boolean;
  mergeFailure: boolean;
}

const initialState: MergeState = {
  mergeCount: 0,
  lastMergeTimestamp: '',
  isMerging: false,
  mergeSuccess: false,
  mergeFailure: false
};

export const mergeSlice = createSlice({
  name: 'merge',
  initialState,
  reducers: {
    startMerge: (state) => {
      state.isMerging = true;
    },
    completeMerge: (state) => {
      state.isMerging = false;
      state.mergeSuccess = true;
      state.mergeFailure = false;
    },
    failMerge: (state) => {
      state.isMerging = false;
      state.mergeSuccess = false;
      state.mergeFailure = true;
    },
    resetMerge: (state) => {
      state.isMerging = false;
      state.mergeSuccess = false;
      state.mergeFailure = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(trackMergeSuccess.pending, (state, action) => {
        state.mergeCount += 1;
        state.lastMergeTimestamp = new Date().toISOString();
        state.mergeSuccess = true;
      })
      .addCase(trackMergeFailure.pending, (state, action) => {
        state.mergeCount += 1;
        state.lastMergeTimestamp = new Date().toISOString();
        state.mergeFailure = true;
      });
  }
});

export const { startMerge, completeMerge, failMerge, resetMerge } = mergeSlice.actions;
export default mergeSlice.reducer;