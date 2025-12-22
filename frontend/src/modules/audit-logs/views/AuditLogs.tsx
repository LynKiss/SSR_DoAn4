import { Card, Space, Typography } from "antd";

export default function AuditLogs() {
  return (
    <Space orientation="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Nhật ký hoạt động
      </Typography.Title>
      <Card>
        Base Audit Logs (placeholder). Sẽ map API /audit-logs ở bước tiếp theo.
      </Card>
    </Space>
  );
}
