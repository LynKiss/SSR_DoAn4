import { Card, Space, Typography } from "antd";

export default function Files() {
  return (
    <Space orientation="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Tệp tin
      </Typography.Title>
      <Card>
        Base Files (placeholder). Bước tiếp theo mình sẽ generate upload +
        attach entity theo backend /files.
      </Card>
    </Space>
  );
}
