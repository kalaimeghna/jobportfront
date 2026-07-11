import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import your reducers
import authReducer from '../redux/auth/authSlice';
import companyReducer from '../redux/company/companySlice';
import jobReducer from '../redux/jobs/jobSlice';
import applicationReducer from '../redux/application/applicationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    jobs: jobReducer,
    applications: applicationReducer,
  },
  // Middleware is configured automatically by RTK
  // You can add custom middleware here if needed later
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;