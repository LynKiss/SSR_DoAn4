export const URLS = {
  LOGIN: "/login",
  DASHBOARD: "/",
  
  // Sales
  SALES_CUSTOMERS: "/sales/customers",
  SALES_CUSTOMER_DETAIL: (id: string | number) => `/sales/customers/${id}`,
  SALES_PRODUCTS: "/sales/products",
  SALES_ORDERS: "/sales/orders",
  SALES_QUOTATIONS: "/sales/quotations",

  // Production
  PRODUCTION_PLANS: "/production/plans",
  PRODUCTION_WORK_ORDERS: "/production/work-orders",
  PRODUCTION_RESOURCES: "/production/resources",

  // Warehouse
  WAREHOUSE_WAREHOUSES: "/warehouse/warehouses",
  WAREHOUSE_INVENTORY: "/warehouse/inventory",
  WAREHOUSE_INBOUND: "/warehouse/inbound",
  WAREHOUSE_OUTBOUND: "/warehouse/outbound",

  // Shipping
  SHIPPING_PARTNERS: "/shipping/partners",
  SHIPPING_VEHICLES: "/shipping/vehicles",
  SHIPPING_PLANS: "/shipping/plans",
  SHIPPING_SHIPMENTS: "/shipping/shipments",

  // System
  FILES: "/files",
  AUDIT_LOGS: "/system/audit-logs",
  STATUS: "/system/status",

  FORBIDDEN: "/403",
  NOT_FOUND: "/404",
} as const;
