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
  InputNumber,
  message,
  Popconfirm,
  Tooltip,
  Alert,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShopOutlined,
  InboxOutlined,
  OutboxOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  BarcodeOutlined,
  TruckOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface InventoryItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  location: string;
  supplier: string;
  lastUpdated: string;
  status: "in_stock" | "low_stock" | "out_of_stock" | "overstock";
  value: number;
}

interface StockMovement {
  id: string;
  productCode: string;
  productName: string;
  type: "in" | "out" | "transfer" | "adjustment";
  quantity: number;
  date: string;
  reference: string;
  user: string;
  reason: string;
}

interface WarehouseStats {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
  recentMovements: number;
  turnoverRate: number;
}

export default function WarehousePage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inventory");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [form] = Form.useForm();

  // Mock data
  const mockStats: WarehouseStats = {
    totalProducts: 1247,
    lowStockItems: 23,
    outOfStockItems: 5,
    totalValue: 1250000000,
    recentMovements: 156,
    turnoverRate: 85.3,
  };

  const mockInventory: InventoryItem[] = [
    {
      id: "1",
      productCode: "SP-001",
      productName: "Sản phẩm A-2024",
      category: "Điện tử",
      currentStock: 245,
      minStock: 100,
      maxStock: 500,
      unit: "cái",
      location: "Kho A-01",
      supplier: "Công ty ABC",
      lastUpdated: "2024-01-17",
      status: "in_stock",
      value: 122500000,
    },
    {
      id: "2",
      productCode: "SP-002",
      productName: "Sản phẩm B-2024",
      category: "Gia dụng",
      currentStock: 45,
      minStock: 80,
      maxStock: 300,
      unit: "cái",
      location: "Kho B-02",
      supplier: "Công ty XYZ",
      lastUpdated: "2024-01-16",
      status: "low_stock",
      value: 22500000,
    },
    {
      id: "3",
      productCode: "SP-003",
      productName: "Sản phẩm C-2024",
      category: "Công nghiệp",
      currentStock: 0,
      minStock: 50,
      maxStock: 200,
      unit: "cái",
      location: "Kho C-03",
      supplier: "Công ty DEF",
      lastUpdated: "2024-01-15",
      status: "out_of_stock",
      value: 0,
    },
  ];

  const mockMovements: StockMovement[] = [
    {
      id: "1",
      productCode: "SP-001",
      productName: "Sản phẩm A-2024",
      type: "in",
      quantity: 100,
      date: "2024-01-17",
      reference: "PO-2024-001",
      user: "Nguyễn Văn A",
      reason: "Nhập hàng từ nhà cung cấp",
    },
    {
      id: "2",
      productCode: "SP-002",
      productName: "Sản phẩm B-2024",
      type: "out",
      quantity: 25,
      date: "2024-01-17",
      reference: "SO-2024-045",
      user: "Trần Thị B",
      reason: "Xuất hàng cho đơn hàng",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setInventory(mockInventory);
      setMovements(mockMovements);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      in_stock: "green",
      low_stock: "orange",
      out_of_stock: "red",
      overstock: "blue",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getStatusText = (status: string) => {
    const texts = {
      in_stock: "Còn hàng",
      low_stock: "Tồn thấp",
      out_of_stock: "Hết hàng",
      overstock: "Tồn quá nhiều",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getMovementIcon = (type: string) => {
    const icons = {
      in: <InboxOutlined style={{ color: "#52c41a" }} />,
      out: <OutboxOutlined style={{ color: "#ff4d4f" }} />,
      transfer: <TruckOutlined style={{ color: "#1890ff" }} />,
      adjustment: <FileTextOutlined style={{ color: "#faad14" }} />,
    };
    return icons[type as keyof typeof icons] || <FileTextOutlined />;
  };

  const getMovementText = (type: string) => {
    const texts = {
      in: "Nhập kho",
      out: "Xuất kho",
      transfer: "Chuyển kho",
      adjustment: "Điều chỉnh",
    };
    return texts[type as keyof typeof texts] || type;
  };

  const handleAddItem = () => {
    setEditingItem(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setModalVisible(true);
  };

  const handleDeleteItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id));
    message.success("Xóa sản phẩm thành công");
  };

  const handleSubmit = (values: any) => {
    if (editingItem) {
      setInventory(
        inventory.map((item) =>
          item.id === editingItem.id ? { ...item, ...values } : item
        )
      );
      message.success("Cập nhật sản phẩm thành công");
    } else {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        productCode: `SP-${String(inventory.length + 1).padStart(3, "0")}`,
        lastUpdated: new Date().toISOString().split("T")[0],
        status: "in_stock",
        ...values,
      };
      setInventory([...inventory, newItem]);
      message.success("Thêm sản phẩm thành công");
    }
    setModalVisible(false);
    form.resetFields();
  };

  const inventoryColumns: ColumnsType<InventoryItem> = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => (
        <Text strong>
          <BarcodeOutlined /> {text}
        </Text>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "Điện tử", value: "Điện tử" },
        { text: "Gia dụng", value: "Gia dụng" },
        { text: "Công nghiệp", value: "Công nghiệp" },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "Tồn hiện tại",
      dataIndex: "currentStock",
      key: "currentStock",
      render: (stock, record) => (
        <div>
          <Text strong>
            {stock.toLocaleString()} {record.unit}
          </Text>
          <Progress
            percent={Math.min((stock / record.maxStock) * 100, 100)}
            size="small"
            showInfo={false}
            strokeColor={
              stock <= record.minStock
                ? "#ff4d4f"
                : stock >= record.maxStock
                ? "#faad14"
                : "#52c41a"
            }
          />
        </div>
      ),
    },
    {
      title: "Khoảng tồn",
      key: "stockRange",
      render: (_, record) => (
        <Text type="secondary">
          {record.minStock} - {record.maxStock} {record.unit}
        </Text>
      ),
    },
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Giá trị tồn",
      dataIndex: "value",
      key: "value",
      render: (value) => value.toLocaleString() + " VNĐ",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === "low_stock" && <WarningOutlined />}
          {status === "out_of_stock" && <ExclamationCircleOutlined />}
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Cập nhật",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
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
              onClick={() => handleEditItem(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDeleteItem(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const movementColumns: ColumnsType<StockMovement> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Sản phẩm",
      key: "product",
      render: (_, record) => (
        <div>
          <Text strong>{record.productName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.productCode}
          </Text>
        </div>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          icon={getMovementIcon(type)}
          color={
            type === "in"
              ? "green"
              : type === "out"
              ? "red"
              : type === "transfer"
              ? "blue"
              : "orange"
          }
        >
          {getMovementText(type)}
        </Tag>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => (
        <Text strong style={{ color: qty > 0 ? "#52c41a" : "#ff4d4f" }}>
          {qty > 0 ? "+" : ""}
          {qty}
        </Text>
      ),
    },
    {
      title: "Tham chiếu",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Người thực hiện",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
    },
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      <Title level={2}>
        <ShopOutlined /> Quản lý Kho hàng
      </Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng sản phẩm"
              value={mockStats.totalProducts}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tồn thấp"
              value={mockStats.lowStockItems}
              prefix={<WarningOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Hết hàng"
              value={mockStats.outOfStockItems}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: "#f5222d" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Giá trị tồn"
              value={mockStats.totalValue}
              prefix="₫"
              formatter={(value) => Number(value).toLocaleString()}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Alerts */}
      {mockStats.lowStockItems > 0 && (
        <Alert
          message={`Cảnh báo: ${mockStats.lowStockItems} sản phẩm tồn kho thấp`}
          description="Kiểm tra và bổ sung hàng hóa cho các sản phẩm có tồn kho thấp."
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
          action={
            <Button size="small" type="primary" ghost>
              Xem chi tiết
            </Button>
          }
        />
      )}

      {/* Main Content */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Quản lý tồn kho" key="inventory">
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddItem}
              >
                Thêm sản phẩm
              </Button>
            </div>
            <Table
              columns={inventoryColumns}
              dataSource={inventory}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} sản phẩm`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Lịch sử xuất nhập" key="movements">
            <Table
              columns={movementColumns}
              dataSource={movements}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} giao dịch`,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingItem ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
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
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
              >
                <Select placeholder="Chọn danh mục">
                  <Option value="Điện tử">Điện tử</Option>
                  <Option value="Gia dụng">Gia dụng</Option>
                  <Option value="Công nghiệp">Công nghiệp</Option>
                  <Option value="Thực phẩm">Thực phẩm</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="unit"
                label="Đơn vị"
                rules={[{ required: true, message: "Vui lòng nhập đơn vị" }]}
              >
                <Input placeholder="cái, kg, lít..." />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="currentStock"
                label="Tồn hiện tại"
                rules={[
                  { required: true, message: "Vui lòng nhập tồn hiện tại" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="minStock"
                label="Tồn tối thiểu"
                rules={[
                  { required: true, message: "Vui lòng nhập tồn tối thiểu" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="maxStock"
                label="Tồn tối đa"
                rules={[
                  { required: true, message: "Vui lòng nhập tồn tối đa" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Vị trí lưu trữ"
                rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}
              >
                <Input placeholder="Kho A-01" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="supplier"
                label="Nhà cung cấp"
                rules={[
                  { required: true, message: "Vui lòng nhập nhà cung cấp" },
                ]}
              >
                <Input placeholder="Tên nhà cung cấp" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="value"
            label="Giá trị tồn (VNĐ)"
            rules={[{ required: true, message: "Vui lòng nhập giá trị" }]}
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
        </Form>
      </Modal>
    </div>
  );
}
