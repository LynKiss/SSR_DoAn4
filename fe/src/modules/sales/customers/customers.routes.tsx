import type { RouteObject } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import { RequirePerm } from "../../../app/routeGuard";

export const customersRoutes: RouteObject[] = [
  {
    path: "sales/customers",
    element: (
      <RequirePerm anyOf={["sales.customer.read"]}>
        <CustomersPage />
      </RequirePerm>
    ),
  },
];
