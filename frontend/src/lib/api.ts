import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import type { ApiResponse } from "@/types";

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

function flushQueue(token: string | null) {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;
    if (!original) throw error;

    const status = error.response?.status;

    // Nếu refresh fail / logout thì không loop
    if (
      original.url?.includes("/auth/login") ||
      original.url?.includes("/auth/refresh")
    ) {
      throw error;
    }

    if (status === 401 && !original._retry) {
      original._retry = true;

      const { refreshToken } = useAuthStore.getState();
      if (!refreshToken) {
        useAuthStore.getState().logout();
        throw error;
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push((token) => {
            if (!token) return reject(error);
            original.headers = {
              ...(original.headers || {}),
              Authorization: `Bearer ${token}`,
            };
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;
      try {
        const resp = await axios.post<ApiResponse<RefreshResponse>>(
          `${baseURL}/auth/refresh`,
          { refreshToken },
          { timeout: 15000 }
        );

        const payload = resp.data;
        if (payload.error || !payload.data) {
          useAuthStore.getState().logout();
          flushQueue(null);
          throw error;
        }

        useAuthStore
          .getState()
          .setTokens(payload.data.accessToken, payload.data.refreshToken);

        flushQueue(payload.data.accessToken);

        original.headers = {
          ...(original.headers || {}),
          Authorization: `Bearer ${payload.data.accessToken}`,
        };
        return api(original);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      // để UI điều hướng 403 ở ProtectedRoute/AccessControl
      throw error;
    }

    throw error;
  }
);

// Helper: unwrap ApiResponse<T> => T
export async function unwrap<T>(
  p: Promise<{ data: ApiResponse<T> }>
): Promise<{ data: T; meta: any | null }> {
  const res = await p;
  const body = res.data;
  if (body.error || body.data === null) {
    const msg = body.error?.message || "Có lỗi xảy ra";
    throw new Error(msg);
  }
  return { data: body.data, meta: body.meta };
}
