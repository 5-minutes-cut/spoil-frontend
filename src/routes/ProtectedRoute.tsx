// routes/ProtectedRoute.tsx
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
