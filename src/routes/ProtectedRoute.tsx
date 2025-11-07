import { Navigate, Outlet, useLocation } from "react-router-dom";

function isAuthed() {
  return !!localStorage.getItem("spoil_session");
}

export default function ProtectedRoute() {
  const loc = useLocation();

  if (!isAuthed()) {
    return (
      <Navigate to="/" replace state={{ from: loc.pathname + loc.search }} />
    );
  }
  return <Outlet />;
}
