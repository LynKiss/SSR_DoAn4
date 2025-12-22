export const authStore = {
  get accessToken() {
    // Auto-login for demo purposes
    const token = localStorage.getItem("accessToken") || "demo-token-12345";
    if (!localStorage.getItem("accessToken")) {
      localStorage.setItem("accessToken", token);
    }
    return token;
  },
  set accessToken(v: string | null) {
    if (v) localStorage.setItem("accessToken", v);
    else localStorage.removeItem("accessToken");
  },
  get refreshToken() {
    return localStorage.getItem("refreshToken");
  },
  set refreshToken(v: string | null) {
    if (v) localStorage.setItem("refreshToken", v);
    else localStorage.removeItem("refreshToken");
  },
  clear() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
