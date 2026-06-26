import { Navigate, Outlet } from "react-router-dom";

interface Props {
  redirectTo?: string;
}

const PrivateRoute = ({ redirectTo = "/login" }: Props) => {
  const token = localStorage.getItem("token");

  // If user is NOT logged in → redirect
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // If logged in → allow access to nested routes
  return <Outlet />;
};

export default PrivateRoute;