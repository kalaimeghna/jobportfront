import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleRouteProps {
  allowedRoles: ("jobseeker" | "employer" | "admin")[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // 1. Maintain consistent loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-500">
        Authenticating...
      </div>
    );
  }

  // 2. Not logged in: Send to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Logged in but wrong role: Send to Home (or an Unauthorized page)
  return allowedRoles.includes(user.role) 
    ? <Outlet /> 
    : <Navigate to="/" replace />;
};

export default RoleRoute;