import { Card, Space, Typography } from "antd";

export default function Home() {
  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Dashboard
      </Typography.Title>

      <Card>
        <Typography.Text>
          Base Dashboard (placeholder). Sau này bạn gắn API KPI/Chart theo tài
          liệu.
        </Typography.Text>
      </Card>
    </Space>
  );
}
