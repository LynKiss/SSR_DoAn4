import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { URLS } from "@/routes/urls";

export default function ProtectedRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={URLS.LOGIN} replace state={{ from: location }} />;
  }
  return <Outlet />;
}
