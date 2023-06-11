import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log("location", location);
  if (loading)
    return (
      <div className="p-32">
        <p className="text-7xl text-center">Loading</p>
      </div>
    );
  if (user) return children;
  return <Navigate to="/login" state={location}></Navigate>;
};

export default PrivateRoute;
