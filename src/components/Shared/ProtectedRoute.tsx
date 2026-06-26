import { Navigate, Outlet } from "react-router-dom";

interface Props {
  redirectPath?: string;
}

const ProtectedRoute = ({ redirectPath = "/login" }: Props) => {
  // Example: token stored in localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;