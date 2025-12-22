import { createBrowserRouter, Navigate } from "react-router-dom";
import { authStore } from "../shared/api/auth.store";
import AppShell from "../shared/ui/AppShell";
import LoginPage from "../modules/auth/pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/Notfound";
import ProductionPage from "../modules/production/pages/ProductionPage";
import WarehousePage from "../modules/warehouse/pages/WarehousePage";
import SalesPage from "../modules/sales/pages/SalesPage";
import FinancePage from "../modules/finance/pages/FinancePage";
import HRPage from "../modules/hr/pages/HRPage";
import ShippingPage from "../modules/shipping/pages/ShippingPage";
import type { JSX } from "react";

function RequireAuth({ children }: { children: JSX.Element }) {
  return authStore.accessToken ? children : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },

  {
    path: "/",
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "production", element: <ProductionPage /> },
      { path: "warehouse", element: <WarehousePage /> },
      { path: "sales", element: <SalesPage /> },
      { path: "shipping", element: <ShippingPage /> },
      { path: "finance", element: <FinancePage /> },
      { path: "hr", element: <HRPage /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);
