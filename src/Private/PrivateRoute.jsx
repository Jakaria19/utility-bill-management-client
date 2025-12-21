import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { FadeLoader } from "react-spinners";
import { AuthContext } from "../contexts/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FadeLoader color="[#7A6AE0" />
        {/* <span className="loading loading-spinner text-primary"></span> */}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;