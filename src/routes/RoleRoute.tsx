import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface RoleRoutesProps {
  allowedRoles: string[];
}

const RoleRoutes = ({
  allowedRoles,
}: RoleRoutesProps) => {
  const { user, isAuthenticated } =
    useAppSelector((state) => state.auth);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (
    !user ||
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoutes;