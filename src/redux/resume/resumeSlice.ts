import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uploadResume, fetchResume, updateResume, deleteResume, Resume } from "./resumeThunk";

interface ResumeState {
  resume: Resume | null;
  loading: boolean;
  error: string | null;
}

const initialState: ResumeState = {
  resume: null,
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    clearResume: (state) => {
      state.resume = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // UPLOAD RESUME
    builder
      .addCase(uploadResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadResume.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        state.resume = action.payload;
      })
      .addCase(uploadResume.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Upload failed";
      })

      // FETCH RESUME
      .addCase(fetchResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResume.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        state.resume = action.payload;
      })
      .addCase(fetchResume.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch";
      })

      // UPDATE RESUME
      .addCase(updateResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateResume.fulfilled, (state, action: PayloadAction<Resume>) => {
        state.loading = false;
        state.resume = action.payload;
      })
      .addCase(updateResume.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      })

      // DELETE RESUME
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteResume.fulfilled, (state) => {
        state.loading = false;
        state.resume = null;
      })
      .addCase(deleteResume.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Deletion failed";
      });
  },
});

export const { clearResume } = resumeSlice.actions;
export default resumeSlice.reducer;