import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Progress,
  Row,
  Col,
  Statistic,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;

interface ProductionOrder {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: "pending" | "in_progress" | "completed" | "paused" | "cancelled";
  progress: number;
  assignedTo: string;
  priority: "low" | "medium" | "high";
  efficiency: number;
  cost: number;
}

interface ProductionStats {
  totalOrders: number;
  completedToday: number;
  inProgress: number;
  efficiency: number;
  monthlyTarget: number;
  monthlyProgress: number;
}

export default function ProductionPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<ProductionOrder | null>(
    null
  );
  const [form] = Form.useForm();

  // Mock data
  const mockStats: ProductionStats = {
    totalOrders: 156,
    completedToday: 23,
    inProgress: 18,
    efficiency: 94.5,
    monthlyTarget: 500,
    monthlyProgress: 378,
  };

  const mockOrders: ProductionOrder[] = [
    {
      id: "1",
      orderNumber: "PX-2024-001",
      productName: "Sản phẩm A-2024",
      quantity: 1000,
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      status: "in_progress",
      progress: 75,
      assignedTo: "Nhóm A",
      priority: "high",
      efficiency: 92,
      cost: 50000000,
    },
    {
      id: "2",
      orderNumber: "PX-2024-002",
      productName: "Sản phẩm B-2024",
      quantity: 500,
      startDate: "2024-01-16",
      endDate: "2024-01-18",
      status: "completed",
      progress: 100,
      assignedTo: "Nhóm B",
      priority: "medium",
      efficiency: 88,
      cost: 25000000,
    },
    {
      id: "3",
      orderNumber: "PX-2024-003",
      productName: "Sản phẩm C-2024",
      quantity: 200,
      startDate: "2024-01-17",
      endDate: "2024-01-25",
      status: "pending",
      progress: 0,
      assignedTo: "Nhóm C",
      priority: "low",
      efficiency: 0,
      cost: 15000000,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "orange",
      in_progress: "blue",
      completed: "green",
      paused: "red",
      cancelled: "default",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: "Chờ sản xuất",
      in_progress: "Đang sản xuất",
      completed: "Hoàn thành",
      paused: "Tạm dừng",
      cancelled: "Hủy",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "green",
      medium: "orange",
      high: "red",
    };
    return colors[priority as keyof typeof colors] || "default";
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      low: "Thấp",
      medium: "Trung bình",
      high: "Cao",
    };
    return texts[priority as keyof typeof texts] || priority;
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditOrder = (order: ProductionOrder) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setModalVisible(true);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
    message.success("Xóa lệnh sản xuất thành công");
  };

  const handleSubmit = (values: any) => {
    if (editingOrder) {
      // Update existing order
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id ? { ...order, ...values } : order
        )
      );
      message.success("Cập nhật lệnh sản xuất thành công");
    } else {
      // Add new order
      const newOrder: ProductionOrder = {
        id: Date.now().toString(),
        orderNumber: `PX-2024-${String(orders.length + 1).padStart(3, "0")}`,
        ...values,
        progress: 0,
        efficiency: 0,
      };
      setOrders([...orders, newOrder]);
      message.success("Tạo lệnh sản xuất thành công");
    }
    setModalVisible(false);
    form.resetFields();
  };

  const columns: ColumnsType<ProductionOrder> = [
    {
      title: "Mã lệnh",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => qty.toLocaleString(),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Tiến độ",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => (
        <Progress
          percent={progress}
          size="small"
          status={progress === 100 ? "success" : "active"}
        />
      ),
    },
    {
      title: "Hiệu suất",
      dataIndex: "efficiency",
      key: "efficiency",
      render: (eff) => (
        <div>
          <Text>{eff}%</Text>
          <Progress
            percent={eff}
            size="small"
            showInfo={false}
            strokeColor={
              eff >= 90 ? "#52c41a" : eff >= 70 ? "#faad14" : "#ff4d4f"
            }
          />
        </div>
      ),
    },
    {
      title: "Ưu tiên",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityText(priority)}
        </Tag>
      ),
    },
    {
      title: "Phụ trách",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Chi phí",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => cost.toLocaleString() + " VNĐ",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditOrder(record)}
          />
          <Popconfirm
            title="Xóa lệnh sản xuất"
            description="Bạn có chắc chắn muốn xóa lệnh này?"
            onConfirm={() => handleDeleteOrder(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      <Title level={2}>
        <ThunderboltOutlined /> Quản lý Sản xuất
      </Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng lệnh SX"
              value={mockStats.totalOrders}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Hoàn thành hôm nay"
              value={mockStats.completedToday}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang sản xuất"
              value={mockStats.inProgress}
              prefix={<PlayCircleOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Hiệu suất TB"
              value={mockStats.efficiency}
              suffix="%"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Monthly Target */}
      <Card style={{ marginBottom: 24 }}>
        <Row align="middle">
          <Col span={12}>
            <Title level={4}>Mục tiêu tháng này</Title>
            <Text>Sản xuất {mockStats.monthlyTarget} đơn vị sản phẩm</Text>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "right" }}>
              <Progress
                type="circle"
                percent={Math.round(
                  (mockStats.monthlyProgress / mockStats.monthlyTarget) * 100
                )}
                format={() =>
                  `${mockStats.monthlyProgress}/${mockStats.monthlyTarget}`
                }
                strokeColor="#52c41a"
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Production Orders Table */}
      <Card
        title="Danh sách lệnh sản xuất"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddOrder}
          >
            Tạo lệnh mới
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} lệnh`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={
          editingOrder ? "Chỉnh sửa lệnh sản xuất" : "Tạo lệnh sản xuất mới"
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="productName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Số lượng"
                  min={1}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Mức độ ưu tiên"
                rules={[
                  { required: true, message: "Vui lòng chọn mức độ ưu tiên" },
                ]}
              >
                <Select placeholder="Chọn mức độ ưu tiên">
                  <Option value="low">Thấp</Option>
                  <Option value="medium">Trung bình</Option>
                  <Option value="high">Cao</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Ngày bắt đầu"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày bắt đầu" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="Ngày kết thúc dự kiến"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày kết thúc" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="assignedTo"
            label="Nhóm phụ trách"
            rules={[
              { required: true, message: "Vui lòng chọn nhóm phụ trách" },
            ]}
          >
            <Select placeholder="Chọn nhóm phụ trách">
              <Option value="Nhóm A">Nhóm A</Option>
              <Option value="Nhóm B">Nhóm B</Option>
              <Option value="Nhóm C">Nhóm C</Option>
              <Option value="Nhóm D">Nhóm D</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="cost"
            label="Chi phí dự kiến (VNĐ)"
            rules={[{ required: true, message: "Vui lòng nhập chi phí" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Chi phí dự kiến"
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
