import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJobs } from './jobThunk'; 
import { Job, JobState } from '../../types/job.types';

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobError: (state) => {
      state.error = null;
    },
    setSelectedJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle Fetch All Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        // action.payload is the string returned by rejectWithValue
        state.error = action.payload as string ?? 'Failed to fetch jobs';
      });
  },
});

export const { clearJobError, setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;