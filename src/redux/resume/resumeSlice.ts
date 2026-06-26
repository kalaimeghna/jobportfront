import { createSlice } from "@reduxjs/toolkit";

interface ResumeState {
  resume: string | null;
  loading: boolean;
}

const initialState: ResumeState = {
  resume: null,
  loading: false,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setResume: (state, action) => {
      state.resume = action.payload;
    },
    clearResume: (state) => {
      state.resume = null;
    },
  },
});

export const { setResume, clearResume } = resumeSlice.actions;

export default resumeSlice.reducer;