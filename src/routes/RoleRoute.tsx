import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store"; // Adjust path to your store

interface RoleRouteProps {
  allowedRoles: ("jobseeker" | "employer" | "admin")[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  // Access auth state from Redux
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // 1. Loading State: Wait for authentication to resolve
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-500">
        Authenticating...
      </div>
    );
  }

  // 2. Not logged in: Redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Logged in but wrong role:
  // Use console.log for debugging purposes to see exactly what role is failing
  if (!allowedRoles.includes(user.role)) {
    console.warn(`Access Denied: User role '${user.role}' is not in allowed roles: [${allowedRoles.join(", ")}]`);
    return <Navigate to="/" replace />;
  }

  // 4. Authorized: Render the nested routes
  return <Outlet />;
};

export default RoleRoute;