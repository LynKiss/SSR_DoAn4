import { api, API_BASE_URL } from "../../../shared/api/api";
import type { ApiResponse } from "../../../shared/types/api";

export type FileRow = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url?: string | null;
  path: string;
};

export const filesApi = {
  upload: async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const resp = await api.post<ApiResponse<any>>("/files/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return resp.data.data as { id: string; url?: string | null; originalName: string };
  },

  attach: async (input: { entityType: string; entityId: string; fileId: string; tag?: string }) => {
    const resp = await api.post<ApiResponse<any>>("/files/attach", input);
    return resp.data.data;
  },

  listByEntity: async (params: { entityType: string; entityId: string }) => {
    const resp = await api.get<ApiResponse<any[]>>("/files", { params });
    return resp.data.data;
  },

  publicUrl: (fileUrl?: string | null) => (fileUrl ? `${API_BASE_URL}${fileUrl}` : null),
};
