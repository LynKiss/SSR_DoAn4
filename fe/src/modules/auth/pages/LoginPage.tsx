import { useState } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { authStore } from "../../../shared/api/auth.store";

export default function LoginPage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("admin@erp.local");
  const [password, setPassword] = useState("Admin@123");

  const submit = async () => {
    setLoading(true);
    try {
      const data = await authApi.login({ email, password });
      authStore.accessToken = data.accessToken;
      authStore.refreshToken = data.refreshToken;
      message.success("Login success");
      nav("/");
    } catch (e: any) {
      message.error(e?.response?.data?.error?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f5f7fb",
      }}
    >
      <Card style={{ width: 360, borderRadius: 14 }}>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Sign in
        </Typography.Title>

        <Form layout="vertical" onFinish={submit}>
          <Form.Item label="Email" required>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password" required>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
