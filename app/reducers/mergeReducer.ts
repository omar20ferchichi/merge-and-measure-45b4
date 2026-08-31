import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MergeState {
  mergeCount: number;
  isMerging: boolean;
  mergeSuccess: boolean;
  mergeFailure: boolean;
}

const initialState: MergeState = {
  mergeCount: 0,
  isMerging: false,
  mergeSuccess: false,
  mergeFailure: false,
};

export const mergeSlice = createSlice({
  name: 'merge',
  initialState,
  reducers: {
    startMerge: (state) => {
      state.isMerging = true;
      state.mergeSuccess = false;
      state.mergeFailure = false;
    },
    successMerge: (state, action: PayloadAction<number>) => {
      state.mergeCount = action.payload;
      state.isMerging = false;
      state.mergeSuccess = true;
      state.mergeFailure = false;
    },
    failureMerge: (state, action: PayloadAction<number>) => {
      state.mergeCount = action.payload;
      state.isMerging = false;
      state.mergeSuccess = false;
      state.mergeFailure = true;
    },
    resetMerge: (state) => {
      state.mergeCount = 0;
      state.isMerging = false;
      state.mergeSuccess = false;
      state.mergeFailure = false;
    },
  },
});

export const { startMerge, successMerge, failureMerge, resetMerge } = mergeSlice.actions;
export default mergeSlice.reducer;