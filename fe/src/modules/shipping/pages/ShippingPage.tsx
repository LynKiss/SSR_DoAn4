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
  Tooltip,
  Tabs,
  List,
  Avatar,
  Timeline,
  Alert,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TruckOutlined,
  CarOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
  InboxOutlined,
  GiftOutlined,
  GlobalOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface Shipment {
  id: string;
  shipmentNumber: string;
  orderId: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  items: number;
  totalWeight: number;
  shippingMethod: "standard" | "express" | "same_day" | "international";
  carrier: string;
  trackingNumber: string;
  status:
    | "pending"
    | "processing"
    | "picked_up"
    | "in_transit"
    | "out_for_delivery"
    | "delivered"
    | "failed";
  estimatedDelivery: string;
  actualDelivery?: string;
  shippingCost: number;
  priority: "low" | "medium" | "high" | "urgent";
  notes: string;
  createdAt: string;
}

interface DeliveryRoute {
  id: string;
  driverId: string;
  driverName: string;
  vehicle: string;
  date: string;
  shipments: Shipment[];
  totalDistance: number;
  estimatedTime: number;
  status: "planned" | "in_progress" | "completed" | "cancelled";
}

interface ShippingStats {
  totalShipments: number;
  deliveredToday: number;
  inTransit: number;
  pendingPickup: number;
  averageDeliveryTime: number;
  customerSatisfaction: number;
}

export default function ShippingPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("shipments");
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [routes, setRoutes] = useState<DeliveryRoute[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [form] = Form.useForm();

  // Mock data
  const mockStats: ShippingStats = {
    totalShipments: 1847,
    deliveredToday: 45,
    inTransit: 28,
    pendingPickup: 12,
    averageDeliveryTime: 2.3,
    customerSatisfaction: 4.7,
  };

  const mockShipments: Shipment[] = [
    {
      id: "1",
      shipmentNumber: "GH-2024-001",
      orderId: "DH-2024-001",
      customerName: "Công ty TNHH ABC",
      customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
      customerPhone: "0123 456 789",
      items: 5,
      totalWeight: 25.5,
      shippingMethod: "express",
      carrier: "Giao hàng nhanh",
      trackingNumber: "GHN123456789",
      status: "in_transit",
      estimatedDelivery: "2024-01-18",
      shippingCost: 50000,
      priority: "high",
      notes: "Khách hàng VIP - giao gấp",
      createdAt: "2024-01-17",
    },
    {
      id: "2",
      shipmentNumber: "GH-2024-002",
      orderId: "DH-2024-002",
      customerName: "Nguyễn Văn An",
      customerAddress: "456 Đường XYZ, Quận 3, TP.HCM",
      customerPhone: "0987 654 321",
      items: 2,
      totalWeight: 8.2,
      shippingMethod: "standard",
      carrier: "Viettel Post",
      trackingNumber: "VTP987654321",
      status: "out_for_delivery",
      estimatedDelivery: "2024-01-17",
      shippingCost: 25000,
      priority: "medium",
      notes: "",
      createdAt: "2024-01-16",
    },
    {
      id: "3",
      shipmentNumber: "GH-2024-003",
      orderId: "DH-2024-003",
      customerName: "Công ty XYZ Ltd",
      customerAddress: "789 Đường DEF, Quận 2, TP.HCM",
      customerPhone: "0111 222 333",
      items: 15,
      totalWeight: 75.0,
      shippingMethod: "same_day",
      carrier: "Giao hàng nội thành",
      trackingNumber: "GHN111222333",
      status: "delivered",
      estimatedDelivery: "2024-01-17",
      actualDelivery: "2024-01-17 14:30",
      shippingCost: 100000,
      priority: "urgent",
      notes: "Giao trong ngày",
      createdAt: "2024-01-17",
    },
  ];

  const mockRoutes: DeliveryRoute[] = [
    {
      id: "1",
      driverId: "TX-001",
      driverName: "Trần Văn Tài",
      vehicle: "Xe máy - 79A1-12345",
      date: "2024-01-17",
      shipments: [mockShipments[0], mockShipments[1]],
      totalDistance: 45.2,
      estimatedTime: 180,
      status: "in_progress",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setShipments(mockShipments);
      setRoutes(mockRoutes);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "orange",
      processing: "blue",
      picked_up: "cyan",
      in_transit: "purple",
      out_for_delivery: "geekblue",
      delivered: "green",
      failed: "red",
      planned: "default",
      completed: "green",
      cancelled: "default",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: "Chờ xử lý",
      processing: "Đang chuẩn bị",
      picked_up: "Đã lấy hàng",
      in_transit: "Đang vận chuyển",
      out_for_delivery: "Đang giao",
      delivered: "Đã giao hàng",
      failed: "Giao hàng thất bại",
      planned: "Đã lên kế hoạch",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getMethodIcon = (method: string) => {
    const icons = {
      standard: <TruckOutlined />,
      express: <ThunderboltOutlined />,
      same_day: <GiftOutlined />,
      international: <GlobalOutlined />,
    };
    return icons[method as keyof typeof icons] || <TruckOutlined />;
  };

  const getMethodText = (method: string) => {
    const texts = {
      standard: "Tiêu chuẩn",
      express: "Nhanh",
      same_day: "Trong ngày",
      international: "Quốc tế",
    };
    return texts[method as keyof typeof texts] || method;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "green",
      medium: "orange",
      high: "red",
      urgent: "volcano",
    };
    return colors[priority as keyof typeof colors] || "default";
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      low: "Thấp",
      medium: "Trung bình",
      high: "Cao",
      urgent: "Khẩn cấp",
    };
    return texts[priority as keyof typeof texts] || priority;
  };

  const handleAddShipment = () => {
    setEditingShipment(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditShipment = (shipment: Shipment) => {
    setEditingShipment(shipment);
    form.setFieldsValue(shipment);
    setModalVisible(true);
  };

  const handleDeleteShipment = (id: string) => {
    setShipments(shipments.filter((s) => s.id !== id));
    message.success("Xóa đơn hàng giao hàng thành công");
  };

  const handleSubmit = (values: any) => {
    if (editingShipment) {
      setShipments(
        shipments.map((s) =>
          s.id === editingShipment.id ? { ...s, ...values } : s
        )
      );
      message.success("Cập nhật đơn hàng giao hàng thành công");
    } else {
      const newShipment: Shipment = {
        id: Date.now().toString(),
        shipmentNumber: `GH-${String(shipments.length + 1).padStart(3, "0")}`,
        trackingNumber: `GHN${Date.now()}`,
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0],
        items: 0,
        totalWeight: 0,
        shippingCost: 0,
        ...values,
      };
      setShipments([...shipments, newShipment]);
      message.success("Tạo đơn hàng giao hàng thành công");
    }
    setModalVisible(false);
    form.resetFields();
  };

  const shipmentColumns: ColumnsType<Shipment> = [
    {
      title: "Mã vận đơn",
      dataIndex: "shipmentNumber",
      key: "shipmentNumber",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, record) => (
        <div>
          <Text strong>{record.customerName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            <PhoneOutlined /> {record.customerPhone}
          </Text>
        </div>
      ),
    },
    {
      title: "Địa chỉ giao",
      dataIndex: "customerAddress",
      key: "customerAddress",
      ellipsis: true,
    },
    {
      title: "Số món",
      dataIndex: "items",
      key: "items",
      render: (items) => <Text>{items} sản phẩm</Text>,
    },
    {
      title: "Phương thức",
      dataIndex: "shippingMethod",
      key: "shippingMethod",
      render: (method) => (
        <Tag icon={getMethodIcon(method)} color="blue">
          {getMethodText(method)}
        </Tag>
      ),
    },
    {
      title: "Đối tác vận chuyển",
      dataIndex: "carrier",
      key: "carrier",
    },
    {
      title: "Mã tracking",
      dataIndex: "trackingNumber",
      key: "trackingNumber",
      render: (tracking) => <Text code>{tracking}</Text>,
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
      title: "Ngày giao dự kiến",
      dataIndex: "estimatedDelivery",
      key: "estimatedDelivery",
    },
    {
      title: "Chi phí vận chuyển",
      dataIndex: "shippingCost",
      key: "shippingCost",
      render: (cost) => cost.toLocaleString() + " VNĐ",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button type="link" icon={<EnvironmentOutlined />} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditShipment(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa đơn hàng giao hàng"
            description="Bạn có chắc chắn muốn xóa đơn hàng này?"
            onConfirm={() => handleDeleteShipment(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const routeColumns: ColumnsType<DeliveryRoute> = [
    {
      title: "Tài xế",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Phương tiện",
      dataIndex: "vehicle",
      key: "vehicle",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Số đơn",
      key: "shipmentCount",
      render: (_, record) => record.shipments.length,
    },
    {
      title: "Quãng đường",
      dataIndex: "totalDistance",
      key: "totalDistance",
      render: (distance) => `${distance} km`,
    },
    {
      title: "Thời gian dự kiến",
      dataIndex: "estimatedTime",
      key: "estimatedTime",
      render: (time) => `${Math.floor(time / 60)}h ${time % 60}m`,
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
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EnvironmentOutlined />}>
            Xem tuyến đường
          </Button>
          <Button type="link" icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      <Title level={2}>
        <TruckOutlined /> Quản lý Giao hàng
      </Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng đơn giao hàng"
              value={mockStats.totalShipments}
              prefix={<TruckOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đã giao hôm nay"
              value={mockStats.deliveredToday}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang vận chuyển"
              value={mockStats.inTransit}
              prefix={<SendOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Thời gian giao TB"
              value={mockStats.averageDeliveryTime}
              suffix="ngày"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      <Alert
        message="Cảnh báo giao hàng"
        description="Có 3 đơn hàng cần giao khẩn cấp và 2 đơn hàng quá hạn."
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
        action={
          <Button size="small" type="primary" ghost>
            Xem chi tiết
          </Button>
        }
      />

      {/* Main Content */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Danh sách giao hàng" key="shipments">
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddShipment}
              >
                Tạo đơn giao hàng
              </Button>
            </div>
            <Table
              columns={shipmentColumns}
              dataSource={shipments}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} đơn giao hàng`,
              }}
              scroll={{ x: 1400 }}
            />
          </TabPane>

          <TabPane tab="Tuyến giao hàng" key="routes">
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo tuyến giao hàng
              </Button>
            </div>
            <Table
              columns={routeColumns}
              dataSource={routes}
              rowKey="id"
              loading={loading}
              pagination={false}
            />
          </TabPane>

          <TabPane tab="Theo dõi" key="tracking">
            <Row gutter={16}>
              <Col span={16}>
                <Card title="Timeline giao hàng">
                  <Timeline>
                    <Timeline.Item color="green">
                      <Text strong>Đơn hàng đã được tạo</Text>
                      <br />
                      <Text type="secondary">2024-01-17 09:00</Text>
                    </Timeline.Item>
                    <Timeline.Item color="blue">
                      <Text strong>Đã xác nhận và chuẩn bị hàng</Text>
                      <br />
                      <Text type="secondary">2024-01-17 10:30</Text>
                    </Timeline.Item>
                    <Timeline.Item color="orange">
                      <Text strong>Đã lấy hàng</Text>
                      <br />
                      <Text type="secondary">2024-01-17 14:00</Text>
                    </Timeline.Item>
                    <Timeline.Item color="purple">
                      <Text strong>Đang vận chuyển</Text>
                      <br />
                      <Text type="secondary">2024-01-17 15:30</Text>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Thống kê nhanh">
                  <List
                    dataSource={[
                      {
                        label: "Đã giao thành công",
                        value: 1456,
                        icon: (
                          <CheckCircleOutlined style={{ color: "#52c41a" }} />
                        ),
                      },
                      {
                        label: "Đang vận chuyển",
                        value: 28,
                        icon: <SendOutlined style={{ color: "#1890ff" }} />,
                      },
                      {
                        label: "Chờ xử lý",
                        value: 12,
                        icon: (
                          <ClockCircleOutlined style={{ color: "#fa8c16" }} />
                        ),
                      },
                      {
                        label: "Giao hàng thất bại",
                        value: 3,
                        icon: (
                          <ExclamationCircleOutlined
                            style={{ color: "#ff4d4f" }}
                          />
                        ),
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta avatar={item.icon} title={item.label} />
                        <Text strong>{item.value}</Text>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Add/Edit Shipment Modal */}
      <Modal
        title={
          editingShipment ? "Chỉnh sửa đơn giao hàng" : "Tạo đơn giao hàng mới"
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerName"
                label="Tên khách hàng"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khách hàng" },
                ]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="customerPhone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input placeholder="0123 456 789" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="customerAddress"
            label="Địa chỉ giao hàng"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ giao hàng" },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Nhập địa chỉ giao hàng đầy đủ"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="shippingMethod"
                label="Phương thức giao hàng"
                rules={[
                  { required: true, message: "Vui lòng chọn phương thức" },
                ]}
              >
                <Select placeholder="Chọn phương thức giao hàng">
                  <Option value="standard">Tiêu chuẩn</Option>
                  <Option value="express">Nhanh</Option>
                  <Option value="same_day">Trong ngày</Option>
                  <Option value="international">Quốc tế</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="carrier"
                label="Đối tác vận chuyển"
                rules={[{ required: true, message: "Vui lòng chọn đối tác" }]}
              >
                <Select placeholder="Chọn đối tác vận chuyển">
                  <Option value="Giao hàng nhanh">Giao hàng nhanh</Option>
                  <Option value="Viettel Post">Viettel Post</Option>
                  <Option value="Giao hàng nội thành">
                    Giao hàng nội thành
                  </Option>
                  <Option value="Ninja Van">Ninja Van</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="items"
                label="Số sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng nhập số sản phẩm" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="totalWeight"
                label="Trọng lượng (kg)"
                rules={[
                  { required: true, message: "Vui lòng nhập trọng lượng" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={0} step={0.1} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="shippingCost"
                label="Phí ship (VNĐ)"
                rules={[{ required: true, message: "Vui lòng nhập phí ship" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="estimatedDelivery"
                label="Ngày giao dự kiến"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày giao dự kiến",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
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
                  <Option value="urgent">Khẩn cấp</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Ghi chú">
            <Input.TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
