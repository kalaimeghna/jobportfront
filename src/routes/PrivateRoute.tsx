import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store"; // Adjust path to your store

interface Props {
  redirectTo?: string;
}

const PrivateRoute = ({ redirectTo = "/login" }: Props) => {
  // Access the auth state from Redux
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // 1. While the app is checking if the user is logged in, show a loader
  if (loading) {
    return <div>Loading...</div>; // Or your custom Spinner component
  }

  // 2. If no user is found, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 3. If logged in, show the protected content
  return <Outlet />;
};

export default PrivateRoute;