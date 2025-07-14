
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // Not authenticated, redirect to signup (or login)
    return <Navigate to="/signup" replace />;
  }

  // Authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
