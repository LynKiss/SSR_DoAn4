import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes";
import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export default function App() {
  const token = useAuthStore((s) => s.accessToken);
  const hydrateMe = useAuthStore((s) => s.hydrateMe);

  useEffect(() => {
    // Có token thì hydrate user/permissions ngay khi vào app
    if (token) hydrateMe().catch(() => {});
  }, [token, hydrateMe]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
