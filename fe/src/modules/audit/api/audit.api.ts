import { api } from "../../../shared/api/api";
import type { ApiResponse } from "../../../shared/types/api";

export const auditApi = {
  list: async (params: { page?: number; limit?: number; entityType?: string; entityId?: string; action?: string }) => {
    const resp = await api.get<ApiResponse<any[]>>("/audit-logs", { params });
    return resp.data;
  },
};
