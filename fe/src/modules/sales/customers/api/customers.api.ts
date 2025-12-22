import { api } from "../../../../shared/api/api";
import type { ApiResponse } from "../../../../shared/types/api";
import type { Customer } from "../customers.types";

export const customersApi = {
  list: async (params: { q?: string; page?: number; limit?: number }) => {
    const resp = await api.get<ApiResponse<Customer[]>>("/customers", {
      params,
    });
    return resp.data;
  },
  create: async (input: { code: string; name: string; status?: string }) => {
    const resp = await api.post<ApiResponse<Customer>>("/customers", input);
    return resp.data.data;
  },
  remove: async (id: string) => {
    const resp = await api.delete<ApiResponse<{ ok: true }>>(
      `/customers/${id}`
    );
    return resp.data.data;
  },
};
