import { Navigate, Outlet } from "react-router-dom";

const isLogin = (): boolean => {
  return localStorage.getItem("accessToken") !== null;
};

const PrivateRoute = () => {
  return isLogin() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;