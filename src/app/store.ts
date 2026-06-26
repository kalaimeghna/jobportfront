import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/auth/authSlice";
import jobReducer from "../redux/jobs/jobSlice";
import companyReducer from "../redux/company/companySlice";
import applicationReducer from "../redux/application/applicationSlice";
import resumeReducer from "../redux/resume/resumeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    company: companyReducer,
    applications: applicationReducer,
    resume: resumeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;