import axios from "axios";
import { authStore } from "./auth.store";

export const API_BASE_URL = "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = authStore.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = false;
let queue: Array<(token: string | null) => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const status = err?.response?.status;
    const original = err.config;

    if (status === 401 && !original._retry && authStore.refreshToken) {
      original._retry = true;

      if (refreshing) {
        const token = await new Promise<string | null>((resolve) => queue.push(resolve));
        if (!token) throw err;
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      }

      refreshing = true;
      try {
        const resp = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: authStore.refreshToken,
        });

        const { accessToken, refreshToken } = resp.data.data;
        authStore.accessToken = accessToken;
        authStore.refreshToken = refreshToken;

        queue.forEach((fn) => fn(accessToken));
        queue = [];

        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (e) {
        queue.forEach((fn) => fn(null));
        queue = [];
        authStore.clear();
        throw e;
      } finally {
        refreshing = false;
      }
    }

    throw err;
  }
);
