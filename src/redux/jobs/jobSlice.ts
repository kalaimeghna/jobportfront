import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  salary?: number;
  createdAt?: string;
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,

  reducers: {
    // set all jobs
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },

    // set single job (job details page)
    setSelectedJob: (state, action: PayloadAction<Job | null>) => {
      state.selectedJob = action.payload;
    },

    // add job (create job)
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.unshift(action.payload);
    },

    // update job
    updateJob: (state, action: PayloadAction<Job>) => {
      state.jobs = state.jobs.map((job) =>
        job._id === action.payload._id ? action.payload : job
      );

      if (
        state.selectedJob &&
        state.selectedJob._id === action.payload._id
      ) {
        state.selectedJob = action.payload;
      }
    },

    // delete job
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(
        (job) => job._id !== action.payload
      );

      if (
        state.selectedJob &&
        state.selectedJob._id === action.payload
      ) {
        state.selectedJob = null;
      }
    },

    // loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // clear state
    clearJobs: (state) => {
      state.jobs = [];
      state.selectedJob = null;
      state.error = null;
    },
  },
});

export const {
  setJobs,
  setSelectedJob,
  addJob,
  updateJob,
  deleteJob,
  setLoading,
  setError,
  clearJobs,
} = jobSlice.actions;

export default jobSlice.reducer;