import { Layout, Button, Space, Typography } from "antd";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { logoutApi } from "@/modules/auth/api/auth.api";
import { useNavigate } from "react-router-dom";
import { URLS } from "@/routes/urls";

const { Header } = Layout;

export default function HeaderBar() {
  const nav = useNavigate();
  const user = useAuthStore((s) => s.user);
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const logout = useAuthStore((s) => s.logout);

  const onLogout = async () => {
    try {
      if (refreshToken) await logoutApi(refreshToken);
    } finally {
      logout();
      nav(URLS.LOGIN, { replace: true });
    }
  };

  return (
    <Header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <Typography.Text strong>ERP Admin</Typography.Text>
        <Space>
          <Typography.Text>{user?.fullName || user?.email}</Typography.Text>
          <Button onClick={onLogout}>Đăng xuất</Button>
        </Space>
      </Space>
    </Header>
  );
}
