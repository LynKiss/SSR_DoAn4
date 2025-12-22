import type { RouteObject } from "react-router-dom";
import AuditLogsPage from "./pages/AuditLogsPage";
import { RequirePerm } from "../../app/routeGuard";

export const auditRoutes: RouteObject[] = [
  {
    path: "audit",
    element: (
      <RequirePerm anyOf={["audit.read"]}>
        <AuditLogsPage />
      </RequirePerm>
    ),
  },
];
