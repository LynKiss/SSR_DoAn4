// Application Constants
export const APP_NAME = "SSR-DoAn4";
export const APP_VERSION = "1.0.0";

// Theme Constants
export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
};

// Module Constants
export const MODULES = {
  DASHBOARD: "dashboard",
  PRODUCTION: "production",
  WAREHOUSE: "warehouse",
  SHIPPING: "shipping",
  SALES: "sales",
  FINANCE: "finance",
  HR: "hr",
  SYSTEM: "system",
};

// API Endpoints (if needed in future)
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  AUTH: "/auth",
  USERS: "/users",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: "app-theme",
  USER_TOKEN: "user-token",
  USER_PREFERENCES: "user-preferences",
};

// Validation Rules
export const VALIDATION = {
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 6,
};
