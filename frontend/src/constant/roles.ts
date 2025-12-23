// permission codes (string) – khớp backend permit("...")
export const PERMS = {
  CUSTOMER_READ: "sales.customer.read",
  CUSTOMER_WRITE: "sales.customer.write",
  AUDIT_READ: "audit.read",
  STATUS_WRITE: "status.write",
  STATUS_READ: "status.read",
  FILES_READ: "files.read",
  FILES_WRITE: "files.write",
  PRODUCT_READ: "product.read",
  PRODUCT_WRITE: "product.write",
} as const;
