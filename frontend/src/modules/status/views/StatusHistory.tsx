import { Card, Space, Typography } from "antd";

export default function StatusHistory() {
  return (
    <Space orientation="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Trạng thái & Lịch sử
      </Typography.Title>
      <Card>
        Base Status (placeholder). Sẽ map /status/history + /status/change ở
        bước tiếp theo.
      </Card>
    </Space>
  );
}
