import { Button, Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/modules/auth/api/auth.api";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { URLS } from "@/routes/urls";

type FormValues = { email: string; password: string };

export default function LoginView() {
  const nav = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const hydrateMe = useAuthStore((s) => s.hydrateMe);

  const onFinish = async (v: FormValues) => {
    try {
      const { data } = await loginApi(v);
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      await hydrateMe();
      message.success("Đăng nhập thành công");
      nav(URLS.DASHBOARD, { replace: true });
    } catch (e: any) {
      message.error(e?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <Card style={{ width: 380 }}>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Đăng nhập
        </Typography.Title>

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input placeholder="email@company.com" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </div>
  );
}
