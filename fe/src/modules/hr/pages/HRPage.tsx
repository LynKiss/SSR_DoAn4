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
  Rate,
  Badge,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  BankOutlined,
  ManOutlined,
  WomanOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  salary: number;
  status: "active" | "inactive" | "on_leave";
  gender: "male" | "female";
  dateOfBirth: string;
  address: string;
  performance: number;
  avatar?: string;
}

interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  workHours: number;
  overtime: number;
  status: "present" | "absent" | "late" | "half_day";
  notes: string;
}

interface Payroll {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  overtime: number;
  grossPay: number;
  tax: number;
  netPay: number;
  status: "draft" | "calculated" | "paid";
}

interface HRStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  averageSalary: number;
  attendanceRate: number;
  turnoverRate: number;
}

export default function HRPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [payroll, setPayroll] = useState<Payroll[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form] = Form.useForm();

  // Mock data
  const mockStats: HRStats = {
    totalEmployees: 156,
    activeEmployees: 142,
    onLeave: 8,
    averageSalary: 18500000,
    attendanceRate: 94.2,
    turnoverRate: 5.8,
  };

  const mockEmployees: Employee[] = [
    {
      id: "1",
      employeeId: "NV-001",
      name: "Nguyễn Văn An",
      email: "an.nguyen@company.com",
      phone: "0123 456 789",
      department: "Sản xuất",
      position: "Trưởng phòng",
      hireDate: "2020-03-15",
      salary: 25000000,
      status: "active",
      gender: "male",
      dateOfBirth: "1985-06-20",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      performance: 4.8,
    },
    {
      id: "2",
      employeeId: "NV-002",
      name: "Trần Thị Bình",
      email: "binh.tran@company.com",
      phone: "0987 654 321",
      department: "Kinh doanh",
      position: "Nhân viên bán hàng",
      hireDate: "2021-07-10",
      salary: 12000000,
      status: "active",
      gender: "female",
      dateOfBirth: "1992-11-12",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
      performance: 4.5,
    },
    {
      id: "3",
      employeeId: "NV-003",
      name: "Lê Văn Cường",
      email: "cuong.le@company.com",
      phone: "0111 222 333",
      department: "Tài chính",
      position: "Kế toán trưởng",
      hireDate: "2019-01-20",
      salary: 30000000,
      status: "on_leave",
      gender: "male",
      dateOfBirth: "1988-04-08",
      address: "789 Đường DEF, Quận 2, TP.HCM",
      performance: 4.9,
    },
  ];

  const mockAttendance: Attendance[] = [
    {
      id: "1",
      employeeId: "NV-001",
      employeeName: "Nguyễn Văn An",
      date: "2024-01-17",
      checkIn: "08:00",
      checkOut: "17:30",
      workHours: 8.5,
      overtime: 0.5,
      status: "present",
      notes: "Làm tăng ca 30 phút",
    },
    {
      id: "2",
      employeeId: "NV-002",
      employeeName: "Trần Thị Bình",
      date: "2024-01-17",
      checkIn: "08:15",
      checkOut: "17:00",
      workHours: 7.75,
      overtime: 0,
      status: "late",
      notes: "Đi muộn 15 phút",
    },
  ];

  const mockPayroll: Payroll[] = [
    {
      id: "1",
      employeeId: "NV-001",
      employeeName: "Nguyễn Văn An",
      month: "2024-01",
      baseSalary: 25000000,
      allowances: 2000000,
      deductions: 500000,
      overtime: 500000,
      grossPay: 27000000,
      tax: 2700000,
      netPay: 24300000,
      status: "calculated",
    },
    {
      id: "2",
      employeeId: "NV-002",
      employeeName: "Trần Thị Bình",
      month: "2024-01",
      baseSalary: 12000000,
      allowances: 1000000,
      deductions: 200000,
      overtime: 0,
      grossPay: 13000000,
      tax: 1300000,
      netPay: 11700000,
      status: "draft",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setEmployees(mockEmployees);
      setAttendance(mockAttendance);
      setPayroll(mockPayroll);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "green",
      inactive: "default",
      on_leave: "orange",
      present: "green",
      absent: "red",
      late: "orange",
      half_day: "blue",
      draft: "default",
      calculated: "blue",
      paid: "green",
    };
    return colors[status as keyof typeof colors] || "default";
  };

  const getStatusText = (status: string) => {
    const texts = {
      active: "Đang làm việc",
      inactive: "Không hoạt động",
      on_leave: "Nghỉ phép",
      present: "Có mặt",
      absent: "Vắng mặt",
      late: "Đi muộn",
      half_day: "Nửa ngày",
      draft: "Nháp",
      calculated: "Đã tính",
      paid: "Đã trả",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getGenderIcon = (gender: string) => {
    return gender === "male" ? <ManOutlined /> : <WomanOutlined />;
  };

  const getGenderText = (gender: string) => {
    return gender === "male" ? "Nam" : "Nữ";
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue(employee);
    setModalVisible(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    message.success("Xóa nhân viên thành công");
  };

  const handleSubmit = (values: any) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...values } : emp
        )
      );
      message.success("Cập nhật nhân viên thành công");
    } else {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        employeeId: `NV-${String(employees.length + 1).padStart(3, "0")}`,
        status: "active",
        performance: 0,
        ...values,
      };
      setEmployees([...employees, newEmployee]);
      message.success("Thêm nhân viên thành công");
    }
    setModalVisible(false);
    form.resetFields();
  };

  const employeeColumns: ColumnsType<Employee> = [
    {
      title: "Mã NV",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (text) => (
        <Text strong>
          <IdcardOutlined /> {text}
        </Text>
      ),
    },
    {
      title: "Nhân viên",
      key: "employee",
      render: (_, record) => (
        <div>
          <Text strong>{record.name}</Text>
          <br />
          <Tag size="small" icon={getGenderIcon(record.gender)}>
            {getGenderText(record.gender)}
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
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Ngày vào làm",
      dataIndex: "hireDate",
      key: "hireDate",
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      render: (salary) => salary.toLocaleString() + " VNĐ",
    },
    {
      title: "Hiệu suất",
      dataIndex: "performance",
      key: "performance",
      render: (performance) => (
        <div>
          <Rate disabled value={performance} />
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {performance}/5
          </Text>
        </div>
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
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditEmployee(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xóa nhân viên"
            description="Bạn có chắc chắn muốn xóa nhân viên này?"
            onConfirm={() => handleDeleteEmployee(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const attendanceColumns: ColumnsType<Attendance> = [
    {
      title: "Nhân viên",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Check in",
      dataIndex: "checkIn",
      key: "checkIn",
    },
    {
      title: "Check out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (time) => time || "-",
    },
    {
      title: "Giờ làm",
      dataIndex: "workHours",
      key: "workHours",
      render: (hours) => `${hours}h`,
    },
    {
      title: "Tăng ca",
      dataIndex: "overtime",
      key: "overtime",
      render: (overtime) => (overtime > 0 ? `${overtime}h` : "-"),
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
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
    },
  ];

  const payrollColumns: ColumnsType<Payroll> = [
    {
      title: "Nhân viên",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Tháng",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      key: "baseSalary",
      render: (salary) => salary.toLocaleString() + " VNĐ",
    },
    {
      title: "Phụ cấp",
      dataIndex: "allowances",
      key: "allowances",
      render: (allowance) => allowance.toLocaleString() + " VNĐ",
    },
    {
      title: "Khấu trừ",
      dataIndex: "deductions",
      key: "deductions",
      render: (deduction) => deduction.toLocaleString() + " VNĐ",
    },
    {
      title: "Tăng ca",
      dataIndex: "overtime",
      key: "overtime",
      render: (overtime) => overtime.toLocaleString() + " VNĐ",
    },
    {
      title: "Lương gross",
      dataIndex: "grossPay",
      key: "grossPay",
      render: (gross) => gross.toLocaleString() + " VNĐ",
    },
    {
      title: "Thuế",
      dataIndex: "tax",
      key: "tax",
      render: (tax) => tax.toLocaleString() + " VNĐ",
    },
    {
      title: "Lương net",
      dataIndex: "netPay",
      key: "netPay",
      render: (net) => (
        <Text strong style={{ color: "#52c41a" }}>
          {net.toLocaleString()} VNĐ
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
  ];

  return (
    <div style={{ padding: "24px 0" }}>
      <Title level={2}>
        <TeamOutlined /> Quản lý Nhân sự
      </Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng nhân viên"
              value={mockStats.totalEmployees}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang làm việc"
              value={mockStats.activeEmployees}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Nghỉ phép"
              value={mockStats.onLeave}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Lương TB"
              value={mockStats.averageSalary}
              prefix="₫"
              formatter={(value) => Number(value).toLocaleString()}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Attendance Rate */}
      <Card style={{ marginBottom: 24 }}>
        <Row align="middle">
          <Col span={12}>
            <Title level={4}>Tỷ lệ chuyên cần</Title>
            <Text>Tỷ lệ nhân viên có mặt đúng giờ</Text>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "right" }}>
              <Progress
                type="circle"
                percent={mockStats.attendanceRate}
                format={() => `${mockStats.attendanceRate}%`}
                strokeColor="#52c41a"
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Danh sách nhân viên" key="employees">
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddEmployee}
              >
                Thêm nhân viên
              </Button>
            </div>
            <Table
              columns={employeeColumns}
              dataSource={employees}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} nhân viên`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Chấm công" key="attendance">
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Chấm công mới
              </Button>
            </div>
            <Table
              columns={attendanceColumns}
              dataSource={attendance}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} bản ghi`,
              }}
            />
          </TabPane>

          <TabPane tab="Bảng lương" key="payroll">
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<DollarOutlined />}>
                Tính lương
              </Button>
            </div>
            <Table
              columns={payrollColumns}
              dataSource={payroll}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} bảng lương`,
              }}
              scroll={{ x: 1200 }}
            />
          </TabPane>

          <TabPane tab="Báo cáo" key="reports">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Top hiệu suất cao">
                  <List
                    dataSource={employees
                      .filter((e) => e.performance >= 4.5)
                      .slice(0, 5)}
                    renderItem={(employee) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={employee.name}
                          description={
                            <div>
                              <Text>{employee.position}</Text>
                              <br />
                              <Rate disabled value={employee.performance} />
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Nhân viên mới">
                  <List
                    dataSource={employees
                      .filter((e) => {
                        const hireDate = new Date(e.hireDate);
                        const now = new Date();
                        const diffTime = Math.abs(
                          now.getTime() - hireDate.getTime()
                        );
                        const diffDays = Math.ceil(
                          diffTime / (1000 * 60 * 60 * 24)
                        );
                        return diffDays <= 30;
                      })
                      .slice(0, 5)}
                    renderItem={(employee) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={employee.name}
                          description={
                            <div>
                              <Text>{employee.position}</Text>
                              <br />
                              <Text type="secondary">
                                Vào làm: {employee.hireDate}
                              </Text>
                            </div>
                          }
                        />
                        <Badge status="processing" text="Mới" />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Add/Edit Employee Modal */}
      <Modal
        title={editingEmployee ? "Chỉnh sửa nhân viên" : "Thêm nhân viên mới"}
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
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Giới tính"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
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
                <Input placeholder="email@company.com" />
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Phòng ban"
                rules={[{ required: true, message: "Vui lòng chọn phòng ban" }]}
              >
                <Select placeholder="Chọn phòng ban">
                  <Option value="Sản xuất">Sản xuất</Option>
                  <Option value="Kinh doanh">Kinh doanh</Option>
                  <Option value="Tài chính">Tài chính</Option>
                  <Option value="Nhân sự">Nhân sự</Option>
                  <Option value="Kỹ thuật">Kỹ thuật</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Chức vụ"
                rules={[{ required: true, message: "Vui lòng nhập chức vụ" }]}
              >
                <Input placeholder="Nhập chức vụ" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="hireDate"
                label="Ngày vào làm"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày vào làm" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateOfBirth"
                label="Ngày sinh"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Lương cơ bản (VNĐ)"
                rules={[{ required: true, message: "Vui lòng nhập lương" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Lương cơ bản"
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
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
