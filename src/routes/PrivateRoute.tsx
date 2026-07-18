import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Shared/Loader";

interface Props {
  redirectTo?: string;
}

const PrivateRoute = ({
  redirectTo = "/login",
}: Props) => {

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();


  const location = useLocation();



  if (loading) {

    return (
      <Loader
        fullScreen
        text="Checking authentication..."
      />
    );

  }



  if (!isAuthenticated || !user) {

    return (

      <Navigate

        to={redirectTo}

        replace

        state={{
          from: location.pathname
        }}

      />

    );

  }



  return <Outlet />;

};


export default PrivateRoute;