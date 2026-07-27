import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
