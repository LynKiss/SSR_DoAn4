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
  Alert,
  Tabs,
  List,
  Avatar,
  Rate,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SendOutlined,
  EyeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface Customer {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: "individual" | "company";
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive" | "vip";
  rating: number;
}

interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  totalAmount: number;
  paidAmount: number;
  paymentStatus: "unpaid" | "partial" | "paid";
  items: number;
  priority: "low" | "medium" | "high";
  notes: string;
}

interface SalesStats {
  totalOrders: number;
  totalRevenue: number;
  newCustomers: number;
  conversionRate: number;
  averageOrderValue: number;
  pendingOrders: number;
}

export default function SalesPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();

  // Mock data
  const mockStats: SalesStats = {
    totalOrders: 1847,
    totalRevenue: 2850000000,
    newCustomers: 234,
    conversionRate: 68.5,
    averageOrderValue: 1543000,
    pendingOrders: 45,
  };

  const mockCustomers: Customer[] = [
    {
      id: "1",
      code: "KH-001",
      name: "Công ty TNHH ABC",
      email: "contact@abc.com",
      phone: "0123 456 789",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      type: "company",
      totalOrders: 45,
      totalSpent: 125000000,
      lastOrder: "2024-01-16",
      status: "vip",
      rating: 4.8,
    },
    {
      id: "2",
      code: "KH-002",
      name: "Nguyễn Văn An",
      email: "an.nguyen@email.com",
      phone: "0987 654 321",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
      type: "individual",
      totalOrders: 12,
      totalSpent: 25000000,
      lastOrder: "2024-01-15",
      status: "active",
      rating: 4.2,
    },
    {
      id: "3",
      code: "KH-003",
      name: "Công ty XYZ Ltd",
      email: "info@xyz.vn",
      phone: "0111 222 333",
      address: "789 Đường DEF, Quận 2, TP.HCM",
      type: "company",
      totalOrders: 8,
      totalSpent: 85000000,
      lastOrder: "2024-01-14",
      status: "active",
      rating: 4.5,
    },
  ];

  const mockOrders: SalesOrder[] = [
    {
      id: "1",
      orderNumber: "DH-2024-001",
      customerId: "1",
      customerName: "Công ty TNHH ABC",
      date: "2024-01-17",
      status: "confirmed",
      totalAmount: 15000000,
      paidAmount: 5000000,
      paymentStatus: "partial",
      items: 5,
      priority: "high",
      notes: "Khách hàng VIP - giao hàng gấp",
    },
    {
      id: "2",
      orderNumber: "DH-2024-002",
      customerId: "2",
      customerName: "Nguyễn Văn An",
      date: "2024-01-16",
      status: "processing",
      totalAmount: 2500000,
      paidAmount: 2500000,
      paymentStatus: "paid",
      items: 2,
      priority: "medium",
      notes: "Thanh toán đầy đủ",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCustomers(mockCustomers);
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "orange",
      confirmed: "blue",
      processing: "cyan",
      shipped: "purple",
      delivered: "green",
      cancelled: "red",
      active: "green",
      inactive: "default",
      vip: "gold",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      processing: "Đang xử lý",
      shipped: "Đã giao",
      delivered: "Hoàn thành",
      cancelled: "Đã hủy",
      active: "Hoạt động",
      inactive: "Không hoạt động",
      vip: "VIP",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      unpaid: "red",
      partial: "orange",
      paid: "green",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getPaymentStatusText = (status: string) => {
    const texts = {
      unpaid: "Chưa thanh toán",
      partial: "Thanh toán một phần",
      paid: "Đã thanh toán",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setModalVisible(true);
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    message.success("Xóa khách hàng thành công");
  };

  const handleSubmit = (values: any) => {
    if (editingCustomer) {
      setCustomers(
        customers.map((customer) =>
          customer.id === editingCustomer.id
            ? { ...customer, ...values }
            : customer
        )
      );
      message.success("Cập nhật khách hàng thành công");
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        code: `KH-${String(customers.length + 1).padStart(3, "0")}`,
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: new Date().toISOString().split("T")[0],
        status: "active",
        rating: 0,
        ...values,
      };
      setCustomers([...customers, newCustomer]);
      message.success("Thêm khách hàng thành công");
    }
    setModalVisible(false);
    form.resetFields();
  };

  const customerColumns: ColumnsType<Customer> = [
    {
      title: "Mã KH",
      dataIndex: "code",
      key: "code",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, record) => (
        <div>
          <Text strong>{record.name}</Text>
          <br />
          <Tag
            size="small"
            color={record.type === "company" ? "blue" : "green"}
          >
            {record.type === "company" ? "Doanh nghiệp" : "Cá nhân"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Liên hệ",
      key: "contact",
      render: (_, record) => (
        <div>
          <div>
            <PhoneOutlined /> {record.phone}
          </div>
          <div>
            <MailOutlined /> {record.email}
          </div>
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Tổng đơn",
      dataIndex: "totalOrders",
      key: "totalOrders",
      render: (orders) => orders.toLocaleString(),
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (spent) => spent.toLocaleString() + " VNĐ",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled value={rating} />,
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
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditCustomer(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa khách hàng"
            description="Bạn có chắc chắn muốn xóa khách hàng này?"
            onConfirm={() => handleDeleteCustomer(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const orderColumns: ColumnsType<SalesOrder> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
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
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => amount.toLocaleString() + " VNĐ",
    },
    {
      title: "Thanh toán",
      key: "payment",
      render: (_, record) => (
        <div>
          <Tag color={getPaymentStatusColor(record.paymentStatus)}>
            {getPaymentStatusText(record.paymentStatus)}
          </Tag>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.paidAmount.toLocaleString()} VNĐ
          </Text>
        </div>
      ),
    },
    {
      title: "Số món",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Ưu tiên",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <Tag
          color={
            priority === "high"
              ? "red"
              : priority === "medium"
              ? "orange"
              : "green"
          }
        >
          {priority === "high"
            ? "Cao"
            : priority === "medium"
            ? "Trung bình"
            : "Thấp"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button type="link" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="In hóa đơn">
            <Button type="link" icon={<FileTextOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      <Title level={2}>
        <ShoppingCartOutlined /> Quản lý Bán hàng
      </Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={mockStats.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Doanh thu"
              value={mockStats.totalRevenue}
              prefix="₫"
              formatter={(value) => Number(value).toLocaleString()}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Khách hàng mới"
              value={mockStats.newCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn chờ xử lý"
              value={mockStats.pendingOrders}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Conversion Rate */}
      <Card style={{ marginBottom: 24 }}>
        <Row align="middle">
          <Col span={12}>
            <Title level={4}>Tỷ lệ chuyển đổi</Title>
            <Text>Tỷ lệ khách hàng tiềm năng thành khách hàng thực tế</Text>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "right" }}>
              <Progress
                type="circle"
                percent={mockStats.conversionRate}
                format={() => `${mockStats.conversionRate}%`}
                strokeColor="#52c41a"
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Đơn hàng" key="orders">
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo đơn hàng mới
              </Button>
            </div>
            <Table
              columns={orderColumns}
              dataSource={orders}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} đơn hàng`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Khách hàng" key="customers">
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddCustomer}
              >
                Thêm khách hàng
              </Button>
            </div>
            <Table
              columns={customerColumns}
              dataSource={customers}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} khách hàng`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Báo cáo" key="reports">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Top khách hàng VIP">
                  <List
                    dataSource={customers
                      .filter((c) => c.status === "vip")
                      .slice(0, 5)}
                    renderItem={(customer) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={customer.name}
                          description={
                            <div>
                              <Text>Đơn hàng: {customer.totalOrders}</Text>
                              <br />
                              <Text>
                                Chi tiêu: {customer.totalSpent.toLocaleString()}{" "}
                                VNĐ
                              </Text>
                            </div>
                          }
                        />
                        <Rate disabled value={customer.rating} />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Đơn hàng cần xử lý">
                  <List
                    dataSource={orders
                      .filter((o) => o.status === "pending")
                      .slice(0, 5)}
                    renderItem={(order) => (
                      <List.Item>
                        <List.Item.Meta
                          title={order.orderNumber}
                          description={
                            <div>
                              <Text strong>{order.customerName}</Text>
                              <br />
                              <Text type="secondary">
                                {order.totalAmount.toLocaleString()} VNĐ
                              </Text>
                            </div>
                          }
                        />
                        <Tag color="orange">{getStatusText(order.status)}</Tag>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Add/Edit Customer Modal */}
      <Modal
        title={editingCustomer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
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
                name="type"
                label="Loại khách hàng"
                rules={[
                  { required: true, message: "Vui lòng chọn loại khách hàng" },
                ]}
              >
                <Select placeholder="Chọn loại khách hàng">
                  <Option value="individual">Cá nhân</Option>
                  <Option value="company">Doanh nghiệp</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="email@example.com" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
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
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập địa chỉ đầy đủ" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
