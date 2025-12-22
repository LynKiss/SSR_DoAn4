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
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  BankOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  category: string;
  description: string;
  amount: number;
  date: string;
  account: string;
  reference: string;
  status: "completed" | "pending" | "cancelled";
  method: "cash" | "bank" | "card" | "transfer";
}

interface Account {
  id: string;
  name: string;
  type: "cash" | "bank" | "investment" | "credit";
  balance: number;
  currency: string;
  status: "active" | "inactive";
  lastTransaction: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  type: "income" | "expense";
  customer: string;
  amount: number;
  tax: number;
  total: number;
  date: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  paidDate?: string;
}

interface FinanceStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  cashFlow: number;
  accountsReceivable: number;
  accountsPayable: number;
  profitMargin: number;
}

export default function FinancePage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [form] = Form.useForm();

  // Mock data
  const mockStats: FinanceStats = {
    totalIncome: 2850000000,
    totalExpense: 2150000000,
    netProfit: 700000000,
    cashFlow: 350000000,
    accountsReceivable: 450000000,
    accountsPayable: 320000000,
    profitMargin: 24.6,
  };

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      category: "Doanh thu bán hàng",
      description: "Thanh toán đơn hàng DH-2024-001",
      amount: 15000000,
      date: "2024-01-17",
      account: "Tài khoản ngân hàng",
      reference: "DH-2024-001",
      status: "completed",
      method: "bank",
    },
    {
      id: "2",
      type: "expense",
      category: "Chi phí vận hành",
      description: "Mua nguyên liệu sản xuất",
      amount: 8500000,
      date: "2024-01-16",
      account: "Tiền mặt",
      reference: "PO-2024-001",
      status: "completed",
      method: "cash",
    },
    {
      id: "3",
      type: "expense",
      category: "Lương nhân viên",
      description: "Trả lương tháng 1/2024",
      amount: 25000000,
      date: "2024-01-15",
      account: "Tài khoản ngân hàng",
      reference: "PAY-2024-001",
      status: "pending",
      method: "bank",
    },
  ];

  const mockAccounts: Account[] = [
    {
      id: "1",
      name: "Tiền mặt",
      type: "cash",
      balance: 125000000,
      currency: "VND",
      status: "active",
      lastTransaction: "2024-01-17",
    },
    {
      id: "2",
      name: "Ngân hàng Vietcombank",
      type: "bank",
      balance: 450000000,
      currency: "VND",
      status: "active",
      lastTransaction: "2024-01-17",
    },
    {
      id: "3",
      name: "Thẻ tín dụng",
      type: "credit",
      balance: -15000000,
      currency: "VND",
      status: "active",
      lastTransaction: "2024-01-16",
    },
  ];

  const mockInvoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "HD-2024-001",
      type: "income",
      customer: "Công ty TNHH ABC",
      amount: 15000000,
      tax: 1500000,
      total: 16500000,
      date: "2024-01-17",
      dueDate: "2024-02-16",
      status: "sent",
    },
    {
      id: "2",
      invoiceNumber: "HD-2024-002",
      type: "expense",
      customer: "Nhà cung cấp XYZ",
      amount: 8500000,
      tax: 850000,
      total: 9350000,
      date: "2024-01-16",
      dueDate: "2024-02-15",
      status: "paid",
      paidDate: "2024-01-16",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setTransactions(mockTransactions);
      setAccounts(mockAccounts);
      setInvoices(mockInvoices);
      setLoading(false);
    }, 1000);
  }, []);

  const getTransactionIcon = (type: string) => {
    const icons = {
      income: <RiseOutlined style={{ color: "#52c41a" }} />,
      expense: <FallOutlined style={{ color: "#ff4d4f" }} />,
      transfer: <CalculatorOutlined style={{ color: "#1890ff" }} />,
    };
    return icons[type as keyof typeof icons] || <FileTextOutlined />;
  };

  const getTransactionTypeText = (type: string) => {
    const texts = {
      income: "Thu",
      expense: "Chi",
      transfer: "Chuyển tiền",
    };
    return texts[type as keyof typeof texts] || type;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed: "green",
      pending: "orange",
      cancelled: "red",
      active: "green",
      inactive: "default",
      draft: "default",
      sent: "blue",
      paid: "green",
      overdue: "red",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getStatusText = (status: string) => {
    const texts = {
      completed: "Hoàn thành",
      pending: "Chờ xử lý",
      cancelled: "Đã hủy",
      active: "Hoạt động",
      inactive: "Không hoạt động",
      draft: "Nháp",
      sent: "Đã gửi",
      paid: "Đã thanh toán",
      overdue: "Quá hạn",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getAccountTypeText = (type: string) => {
    const texts = {
      cash: "Tiền mặt",
      bank: "Ngân hàng",
      investment: "Đầu tư",
      credit: "Tín dụng",
    };
    return texts[type as keyof typeof texts] || type;
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    form.setFieldsValue(transaction);
    setModalVisible(true);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    message.success("Xóa giao dịch thành công");
  };

  const handleSubmit = (values: any) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? { ...t, ...values } : t
        )
      );
      message.success("Cập nhật giao dịch thành công");
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        reference: `TXN-${String(transactions.length + 1).padStart(3, "0")}`,
        status: "completed",
        ...values,
      };
      setTransactions([...transactions, newTransaction]);
      message.success("Thêm giao dịch thành công");
    }
    setModalVisible(false);
    form.resetFields();
  };

  const transactionColumns: ColumnsType<Transaction> = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag
          icon={getTransactionIcon(type)}
          color={
            type === "income" ? "green" : type === "expense" ? "red" : "blue"
          }
        >
          {getTransactionTypeText(type)}
        </Tag>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <Text
          strong
          style={{
            color:
              record.type === "income"
                ? "#52c41a"
                : record.type === "expense"
                ? "#ff4d4f"
                : "#1890ff",
          }}
        >
          {record.type === "expense" ? "-" : "+"}
          {amount.toLocaleString()} VNĐ
        </Text>
      ),
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      render: (method) => {
        const methodTexts = {
          cash: "Tiền mặt",
          bank: "Ngân hàng",
          card: "Thẻ",
          transfer: "Chuyển khoản",
        };
        return methodTexts[method as keyof typeof methodTexts] || method;
      },
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
              onClick={() => handleEditTransaction(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa giao dịch"
            description="Bạn có chắc chắn muốn xóa giao dịch này?"
            onConfirm={() => handleDeleteTransaction(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const accountColumns: ColumnsType<Account> = [
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <br />
          <Tag size="small" color="blue">
            {getAccountTypeText(record.type)}
          </Tag>
        </div>
      ),
    },
    {
      title: "Số dư",
      dataIndex: "balance",
      key: "balance",
      render: (balance) => (
        <Text
          strong
          style={{
            color: balance >= 0 ? "#52c41a" : "#ff4d4f",
          }}
        >
          {balance >= 0 ? "" : "-"}
          {Math.abs(balance).toLocaleString()} VNĐ
        </Text>
      ),
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
      title: "Giao dịch cuối",
      dataIndex: "lastTransaction",
      key: "lastTransaction",
    },
  ];

  const invoiceColumns: ColumnsType<Invoice> = [
    {
      title: "Số hóa đơn",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Khách hàng/NCC",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "income" ? "green" : "red"}>
          {type === "income" ? "Thu" : "Chi"}
        </Tag>
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => total.toLocaleString() + " VNĐ",
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Hạn thanh toán",
      dataIndex: "dueDate",
      key: "dueDate",
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
          <Button type="link" icon={<EyeOutlined />} />
          <Button type="link" icon={<FileTextOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      <Title level={2}>
        <DollarOutlined /> Quản lý Tài chính
      </Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng thu"
              value={mockStats.totalIncome}
              prefix="₫"
              formatter={(value) => Number(value).toLocaleString()}
              valueStyle={{ color: "#3f8600" }}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng chi"
              value={mockStats.totalExpense}
              prefix="₫"
              formatter={(value) => Number(value).toLocaleString()}
              valueStyle={{ color: "#cf1322" }}
              prefix={<FallOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Lợi nhuận ròng"
              value={mockStats.netProfit}
              prefix="₫"
              formatter={(value) => Number(value).toLocaleString()}
              valueStyle={{ color: "#1890ff" }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Dòng tiền"
              value={mockStats.cashFlow}
              prefix="₫"
              formatter={(value) => Number(value).toLocaleString()}
              valueStyle={{ color: "#722ed1" }}
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Profit Margin */}
      <Card style={{ marginBottom: 24 }}>
        <Row align="middle">
          <Col span={12}>
            <Title level={4}>Biên lợi nhuận</Title>
            <Text>Tỷ lệ lợi nhuận trên doanh thu</Text>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "right" }}>
              <Progress
                type="circle"
                percent={mockStats.profitMargin}
                format={() => `${mockStats.profitMargin}%`}
                strokeColor="#52c41a"
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Tổng quan" key="overview">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Các tài khoản" size="small">
                  <List
                    dataSource={accounts}
                    renderItem={(account) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<BankOutlined />} />}
                          title={account.name}
                          description={getAccountTypeText(account.type)}
                        />
                        <Text
                          strong
                          style={{
                            color: account.balance >= 0 ? "#52c41a" : "#ff4d4f",
                          }}
                        >
                          {account.balance >= 0 ? "" : "-"}
                          {Math.abs(account.balance).toLocaleString()} VNĐ
                        </Text>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Hóa đơn gần đây" size="small">
                  <List
                    dataSource={invoices.slice(0, 5)}
                    renderItem={(invoice) => (
                      <List.Item>
                        <List.Item.Meta
                          title={invoice.invoiceNumber}
                          description={
                            <div>
                              <Text>{invoice.customer}</Text>
                              <br />
                              <Text type="secondary">
                                {invoice.total.toLocaleString()} VNĐ
                              </Text>
                            </div>
                          }
                        />
                        <Tag color={getStatusColor(invoice.status)}>
                          {getStatusText(invoice.status)}
                        </Tag>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab="Giao dịch" key="transactions">
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddTransaction}
              >
                Thêm giao dịch
              </Button>
            </div>
            <Table
              columns={transactionColumns}
              dataSource={transactions}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} giao dịch`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Tài khoản" key="accounts">
            <Table
              columns={accountColumns}
              dataSource={accounts}
              rowKey="id"
              loading={loading}
              pagination={false}
            />
          </TabPane>

          <TabPane tab="Hóa đơn" key="invoices">
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Tạo hóa đơn mới
              </Button>
            </div>
            <Table
              columns={invoiceColumns}
              dataSource={invoices}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} hóa đơn`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Add/Edit Transaction Modal */}
      <Modal
        title={
          editingTransaction ? "Chỉnh sửa giao dịch" : "Thêm giao dịch mới"
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại giao dịch"
                rules={[
                  { required: true, message: "Vui lòng chọn loại giao dịch" },
                ]}
              >
                <Select placeholder="Chọn loại giao dịch">
                  <Option value="income">Thu</Option>
                  <Option value="expense">Chi</Option>
                  <Option value="transfer">Chuyển tiền</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng nhập danh mục" }]}
              >
                <Input placeholder="Nhập danh mục" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả giao dịch" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Số tiền"
                rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Số tiền"
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="method"
                label="Phương thức thanh toán"
                rules={[
                  { required: true, message: "Vui lòng chọn phương thức" },
                ]}
              >
                <Select placeholder="Chọn phương thức">
                  <Option value="cash">Tiền mặt</Option>
                  <Option value="bank">Ngân hàng</Option>
                  <Option value="card">Thẻ</Option>
                  <Option value="transfer">Chuyển khoản</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="account"
                label="Tài khoản"
                rules={[{ required: true, message: "Vui lòng chọn tài khoản" }]}
              >
                <Select placeholder="Chọn tài khoản">
                  {accounts.map((account) => (
                    <Option key={account.id} value={account.name}>
                      {account.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Ngày"
                rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
