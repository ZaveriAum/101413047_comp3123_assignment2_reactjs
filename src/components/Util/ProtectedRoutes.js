import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoutes() {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
