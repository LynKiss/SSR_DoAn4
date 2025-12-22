import { Card, Descriptions, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../api/get-customer-by-id";

export default function CustomerDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["customer", id],
    queryFn: async () => getCustomerById(id!),
    enabled: !!id,
  });

  const c = data?.data;

  return (
    <Space orientation="vertical" size={16} style={{ width: "100%" }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Chi tiết khách hàng
      </Typography.Title>

      <Card loading={isLoading}>
        {c && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã">{c.code}</Descriptions.Item>
            <Descriptions.Item label="Tên">{c.name}</Descriptions.Item>
            <Descriptions.Item label="SĐT">{c.phone || "-"}</Descriptions.Item>
            <Descriptions.Item label="Email">
              {c.email || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>
              {c.address || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {c.status || "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </Space>
  );
}
