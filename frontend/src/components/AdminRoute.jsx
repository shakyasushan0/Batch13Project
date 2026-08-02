import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate replace to="/login" />
  );
}
export default AdminRoute;
