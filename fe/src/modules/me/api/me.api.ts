import { api } from "../../../shared/api/api";
import type { ApiResponse } from "../../../shared/types/api";
import type { MenuItem } from "../../../shared/types/menu";

export const meApi = {
  me: async () => {
    const resp = await api.get<ApiResponse<{ id: string; email: string; fullName: string }>>("/me");
    return resp.data.data;
  },
  permissions: async () => {
    const resp = await api.get<ApiResponse<string[]>>("/me/permissions");
    return resp.data.data;
  },
  menu: async () => {
    const resp = await api.get<ApiResponse<MenuItem[]>>("/me/menu");
    return resp.data.data;
  },
};
