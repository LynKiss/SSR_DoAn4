import type { RouteObject } from "react-router-dom";
import { customersRoutes } from "../modules/sales/customers/customers.routes";
import { auditRoutes } from "../modules/audit/audit.routes";

export type AppModule = { key: string; routes: RouteObject[] };

export const modules: AppModule[] = [
  { key: "sales.customers", routes: customersRoutes },
  { key: "audit", routes: auditRoutes },
];

export const moduleRoutes: RouteObject[] = modules.flatMap((m) => m.routes);
