import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Loader from "../Shared/Loader";

interface ProtectedRouteProps {
  allowedRoles?: ("jobseeker" | "employer" | "admin")[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = "/login",
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication is initialized
  if (loading) {
    return (
      <Loader
        fullScreen
        text="Verifying your session..."
      />
    );
  }

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to={redirectPath}
        replace
        state={{ from: location }}
      />
    );
  }

  // Logged in but doesn't have the required role
  if (
    allowedRoles &&
    !allowedRoles.includes(
      user.role as "jobseeker" | "employer" | "admin"
    )
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  // Authorized
  return <Outlet />;
};

export default ProtectedRoute;