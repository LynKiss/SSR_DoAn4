export const URLS = {
  LOGIN: "/login",
  DASHBOARD: "/",
  SALES_CUSTOMERS: "/sales/customers",
  SALES_CUSTOMER_DETAIL: (id: string | number) => `/sales/customers/${id}`,
  SALES_ORDERS: "/sales/orders",
  SALES_QUOTATIONS: "/sales/quotations",

  FILES: "/files",
  AUDIT_LOGS: "/system/audit-logs",
  STATUS: "/system/status",

  FORBIDDEN: "/403",
  NOT_FOUND: "/404",
} as const;
