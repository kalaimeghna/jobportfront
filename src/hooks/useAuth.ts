import { useAppSelector } from "../hooks/redux";
import { RootState } from "../app/store";

/**
 * Custom hook to access Auth state.
 * Using memoized selectors prevents unnecessary re-renders.
 */
export const useAuth = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  
  // You can also add loading states if your auth slice tracks them
  // const loading = useAppSelector((state: RootState) => state.auth.loading);

  return {
    user,
    isAuthenticated,
  };
};

/**
 * Optional: Individual selectors for components that only need 
 * a specific part of the auth state.
 */
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;