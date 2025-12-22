import axios from "axios";
import { API_BASE_URL } from "../../../shared/api/api";
import type { ApiResponse } from "../../../shared/types/api";

export type LoginResp = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; fullName: string };
};

export const authApi = {
  login: async (input: { email: string; password: string }) => {
    const resp = await axios.post<ApiResponse<LoginResp>>(
      `${API_BASE_URL}/auth/login`,
      input
    );
    return resp.data.data;
  },
};
