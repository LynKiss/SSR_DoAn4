import { api, unwrap } from "../../../lib/api";

export type LoginBody = { email: string; password: string };
export type LoginResult = {
  accessToken: string;
  refreshToken: string;
  user: { id: number | string; email: string; fullName?: string };
};

export async function loginApi(body: LoginBody) {
  return unwrap<LoginResult>(api.post("/auth/login", body));
}

export async function logoutApi(refreshToken: string) {
  return unwrap<{ ok: boolean }>(api.post("/auth/logout", { refreshToken }));
}
