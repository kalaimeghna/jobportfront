import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export type ApplicationStatus = "Applied" | "Interview" | "Shortlisted" | "Rejected" | "Hired";

export interface Application {
  _id: string;
  applicant: string;
  job: string;
  company: string;
  status: ApplicationStatus;
  resume?: string;
  createdAt?: string;
}

interface ApplicationState {
  applications: Application[];
  selectedApplication: Application | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  selectedApplication: null,
  loading: false,
  error: null,
};

// Async Thunk Example: Fetching applications
export const fetchApplications = createAsyncThunk("applications/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/applications");
    return data.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch applications");
  }
});

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    setSelectedApplication: (state, action: PayloadAction<Application | null>) => {
      state.selectedApplication = action.payload;
    },
    addApplication: (state, action: PayloadAction<Application>) => {
      state.applications.push(action.payload);
    },
    updateApplicationStatus: (state, action: PayloadAction<{ id: string; status: ApplicationStatus }>) => {
      const { id, status } = action.payload;
      const app = state.applications.find((a) => a._id === id);
      if (app) app.status = status;
      if (state.selectedApplication?._id === id) {
        state.selectedApplication.status = status;
      }
    },
    deleteApplication: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter((a) => a._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setApplications,
  setSelectedApplication,
  addApplication,
  updateApplicationStatus,
  deleteApplication,
  setLoading,
  setError,
} = applicationSlice.actions;

export default applicationSlice.reducer;