import { api } from "../../../shared/api/api";
import type { ApiResponse } from "../../../shared/types/api";

export const statusApi = {
  change: async (input: { entityType: string; entityId: string; toStatus: string; note?: string }) => {
    const resp = await api.post<ApiResponse<{ ok: true }>>("/status/change", input);
    return resp.data.data;
  },
  history: async (params: { entityType: string; entityId: string }) => {
    const resp = await api.get<ApiResponse<any[]>>("/status/history", { params });
    return resp.data.data;
  },
};
