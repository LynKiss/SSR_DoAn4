import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, unwrap } from "@/lib/api";

export type AuthUser = {
  id: number | string;
  email: string;
  fullName?: string;
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  permissions: string[];
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: AuthUser | null) => void;
  setPermissions: (perms: string[]) => void;
  logout: () => void;
  hydrateMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      permissions: [],

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),
      setPermissions: (permissions) => set({ permissions }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          permissions: [],
        }),

      hydrateMe: async () => {
        // /me
        const me = await unwrap(api.get("/me"));
        set({ user: me.data as any });

        // /me/permissions (nếu backend có)
        try {
          const perms = await unwrap<string[]>(api.get("/me/permissions"));
          set({ permissions: perms.data || [] });
        } catch {
          // optional
          set({ permissions: [] });
        }
      },
    }),
    {
      name: "erp-auth",
      partialize: (s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        user: s.user,
        permissions: s.permissions,
      }),
    }
  )
);
