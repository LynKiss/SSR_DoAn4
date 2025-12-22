import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/modules/auth/components/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import LoginView from "@/modules/auth/views/LoginView";
import ForbiddenPage from "@/components/error/403";
import NotFoundPage from "@/components/error/404";
import { URLS } from "./urls";

import Home from "@/modules/home/views/Home";
import Customers from "@/modules/customers/views/Customers";
import CustomerDetail from "@/modules/customers/views/CustomerDetail";
import Files from "@/modules/files/views/Files";
import AuditLogs from "@/modules/audit-logs/views/AuditLogs";
import StatusHistory from "@/modules/status/views/StatusHistory";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={URLS.LOGIN} element={<LoginView />} />
      <Route path={URLS.FORBIDDEN} element={<ForbiddenPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={URLS.DASHBOARD} element={<Home />} />

          <Route path={URLS.SALES_CUSTOMERS} element={<Customers />} />
          <Route path="/sales/customers/:id" element={<CustomerDetail />} />

          <Route path={URLS.FILES} element={<Files />} />
          <Route path={URLS.AUDIT_LOGS} element={<AuditLogs />} />
          <Route path={URLS.STATUS} element={<StatusHistory />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
