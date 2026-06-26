import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Application {
  _id: string;
  applicant: string;
  job: string;
  company: string;
  status:
    | "Applied"
    | "Interview"
    | "Shortlisted"
    | "Rejected"
    | "Hired";
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

const applicationSlice = createSlice({
  name: "applications",
  initialState,

  reducers: {
    setApplications: (
      state,
      action: PayloadAction<Application[]>
    ) => {
      state.applications = action.payload;
    },

    setSelectedApplication: (
      state,
      action: PayloadAction<Application | null>
    ) => {
      state.selectedApplication = action.payload;
    },

    addApplication: (
      state,
      action: PayloadAction<Application>
    ) => {
      state.applications.push(action.payload);
    },

    updateApplicationStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: Application["status"];
      }>
    ) => {
      const application = state.applications.find(
        (app) => app._id === action.payload.id
      );

      if (application) {
        application.status = action.payload.status;
      }

      if (
        state.selectedApplication &&
        state.selectedApplication._id === action.payload.id
      ) {
        state.selectedApplication.status =
          action.payload.status;
      }
    },

    deleteApplication: (
      state,
      action: PayloadAction<string>
    ) => {
      state.applications = state.applications.filter(
        (app) => app._id !== action.payload
      );
    },

    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },

    setError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.error = action.payload;
    },

    clearApplications: (state) => {
      state.applications = [];
      state.selectedApplication = null;
      state.error = null;
    },
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
  clearApplications,
} = applicationSlice.actions;

export default applicationSlice.reducer;