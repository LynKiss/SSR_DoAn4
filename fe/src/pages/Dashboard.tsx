import { useState, useEffect } from "react";
import Page from "../shared/ui/Page";
import {
  Card,
  Col,
  Row,
  Statistic,
  Badge,
  Progress,
  Button,
  Typography,
  List,
  Avatar,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ShopOutlined,
  BankOutlined,
  ThunderboltOutlined,
  AlertOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface StatsData {
  revenue: {
    current: string;
    change: string;
    trend: "up" | "down";
    target: string;
    progress: number;
  };
  orders: {
    current: string;
    change: string;
    trend: "up" | "down";
    target: string;
    progress: number;
  };
  inventory: {
    current: string;
    change: string;
    trend: "up" | "down";
    target: string;
    progress: number;
  };
  production: {
    current: string;
    change: string;
    trend: "up" | "down";
    target: string;
    progress: number;
  };
}

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  status: string;
  priority: "high" | "medium" | "low";
}

interface Alert {
  id: number;
  type: "error" | "warning" | "info" | "success";
  title: string;
  description: string;
  action: string;
  priority: "high" | "medium" | "low";
}

interface KPI {
  name: string;
  value: number;
  target: number;
  status: "excellent" | "good" | "warning" | "error";
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("thang");
  const [chartType, setChartType] = useState("pie");

  // Mock data
  const dashboardData = {
    stats: {
      revenue: {
        current: "2.85 tỷ",
        change: "+18.5%",
        trend: "up" as const,
        target: "3.2 tỷ",
        progress: 89,
      },
      orders: {
        current: "1,456",
        change: "+12.3%",
        trend: "up" as const,
        target: "1,800",
        progress: 81,
      },
      inventory: {
        current: "87%",
        change: "-3.2%",
        trend: "down" as const,
        target: "85%",
        progress: 87,
      },
      production: {
        current: "94.5%",
        change: "+5.1%",
        trend: "up" as const,
        target: "95%",
        progress: 94.5,
      },
    },
    activities: [
      {
        id: 1,
        type: "order",
        title: "Đơn hàng mới",
        description: "Đơn hàng #DH-2024-001247 từ Công ty TNHH ABC",
        time: "2 phút trước",
        status: "pending",
        priority: "high" as const,
      },
      {
        id: 2,
        type: "production",
        title: "Sản xuất hoàn thành",
        description: "Lệnh sản xuất LSX-2024-0015 hoàn thành",
        time: "15 phút trước",
        status: "completed",
        priority: "medium" as const,
      },
      {
        id: 3,
        type: "inventory",
        title: "Nhập kho",
        description: "Nhập 500 sản phẩm Model A-2024 vào kho",
        time: "30 phút trước",
        status: "completed",
        priority: "low" as const,
      },
    ] as Activity[],
    alerts: [
      {
        id: 1,
        type: "error" as const,
        title: "Tồn kho thấp",
        description: "Sản phẩm B-2024 chỉ còn 45 cái (dưới mức an toàn)",
        action: "Nhập hàng",
        priority: "high" as const,
      },
      {
        id: 2,
        type: "warning" as const,
        title: "Bảo trì máy móc",
        description: "Máy ép E-01 cần bảo trì định kỳ (đã 89 ngày)",
        action: "Lên lịch",
        priority: "medium" as const,
      },
    ] as Alert[],
    kpis: [
      { name: "Doanh thu", value: 89, target: 100, status: "good" as const },
      {
        name: "Sản xuất",
        value: 94.5,
        target: 95,
        status: "excellent" as const,
      },
      {
        name: "Chất lượng",
        value: 98.2,
        target: 98,
        status: "excellent" as const,
      },
      {
        name: "Giao hàng đúng hạn",
        value: 91.5,
        target: 95,
        status: "good" as const,
      },
      {
        name: "Hài lòng khách hàng",
        value: 96.8,
        target: 95,
        status: "excellent" as const,
      },
      {
        name: "Hiệu suất nhân viên",
        value: 87.3,
        target: 90,
        status: "warning" as const,
      },
    ] as KPI[],
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      order: <ShoppingCartOutlined />,
      production: <BankOutlined />,
      inventory: <ShopOutlined />,
      shipment: <ThunderboltOutlined />,
      finance: <DollarOutlined />,
    };
    return icons[type] || <AlertOutlined />;
  };

  const getAlertColor = (type: string) => {
    const colors: Record<string, string> = {
      error: "error",
      warning: "warning",
      info: "processing",
      success: "success",
    };
    return colors[type] || "processing";
  };

  const getKPIStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      excellent: "success",
      good: "processing",
      warning: "warning",
      error: "error",
    };
    return colors[status] || "processing";
  };

  if (loading) {
    return (
      <Page title="Dashboard" breadcrumb={[{ label: "Dashboard" }]}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            flexDirection: "column",
          }}
        >
          <div
            className="loading-spinner"
            style={{
              width: 40,
              height: 40,
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #1890ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <Text style={{ marginTop: 16 }}>Đang tải dữ liệu dashboard...</Text>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Dashboard" breadcrumb={[{ label: "Dashboard" }]}>
      <div style={{ padding: "24px 0" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <ThunderboltOutlined /> Dashboard - Tổng quan hệ thống
          </Title>
          <Text type="secondary">
            Theo dõi hoạt động doanh nghiệp và các chỉ số KPI quan trọng
          </Text>
          <div style={{ marginTop: 16 }}>
            <Button
              type="primary"
              icon={<ThunderboltOutlined />}
              style={{ marginRight: 8 }}
            >
              Làm mới
            </Button>
            <Button icon={<DollarOutlined />}>Xuất báo cáo</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Doanh thu tháng"
                value={dashboardData.stats.revenue.current}
                prefix={<DollarOutlined />}
                suffix={
                  <Badge
                    color={
                      dashboardData.stats.revenue.trend === "up"
                        ? "green"
                        : "red"
                    }
                    text={dashboardData.stats.revenue.change}
                  />
                }
              />
              <Progress
                percent={dashboardData.stats.revenue.progress}
                showInfo={false}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {dashboardData.stats.revenue.progress}% mục tiêu (
                {dashboardData.stats.revenue.target})
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đơn hàng"
                value={dashboardData.stats.orders.current}
                prefix={<ShoppingCartOutlined />}
                suffix={
                  <Badge
                    color={
                      dashboardData.stats.orders.trend === "up"
                        ? "green"
                        : "red"
                    }
                    text={dashboardData.stats.orders.change}
                  />
                }
              />
              <Progress
                percent={dashboardData.stats.orders.progress}
                showInfo={false}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {dashboardData.stats.orders.progress}% mục tiêu (
                {dashboardData.stats.orders.target})
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tồn kho"
                value={dashboardData.stats.inventory.current}
                prefix={<ShopOutlined />}
                suffix={
                  <Badge
                    color={
                      dashboardData.stats.inventory.trend === "up"
                        ? "green"
                        : "orange"
                    }
                    text={dashboardData.stats.inventory.change}
                  />
                }
              />
              <Progress
                percent={dashboardData.stats.inventory.progress}
                showInfo={false}
                strokeColor={{
                  "0%": "#faad14",
                  "100%": "#52c41a",
                }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Mức an toàn: {dashboardData.stats.inventory.target}
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Hiệu suất SX"
                value={dashboardData.stats.production.current}
                prefix={<BankOutlined />}
                suffix={
                  <Badge
                    color={
                      dashboardData.stats.production.trend === "up"
                        ? "green"
                        : "red"
                    }
                    text={dashboardData.stats.production.change}
                  />
                }
              />
              <Progress
                percent={dashboardData.stats.production.progress}
                showInfo={false}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#52c41a",
                }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Mục tiêu: {dashboardData.stats.production.target}
              </Text>
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={12}>
            <Card title="Doanh thu 12 tháng">
              <div
                style={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                  borderRadius: 8,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <DollarOutlined style={{ fontSize: 48, color: "#d9d9d9" }} />
                  <p style={{ marginTop: 16, color: "#666" }}>
                    Biểu đồ doanh thu sẽ hiển thị tại đây
                  </p>
                  <Text type="secondary">Thời gian: {timeRange}</Text>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Phân bổ sản phẩm">
              <div
                style={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                  borderRadius: 8,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <ShoppingCartOutlined
                    style={{ fontSize: 48, color: "#d9d9d9" }}
                  />
                  <p style={{ marginTop: 16, color: "#666" }}>
                    Biểu đồ phân bổ sản phẩm sẽ hiển thị tại đây
                  </p>
                  <Text type="secondary">Loại: {chartType}</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Activities and Alerts */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                  Hoạt động gần đây
                </span>
              }
              extra={<Button type="link">Xem tất cả</Button>}
            >
              <List
                dataSource={dashboardData.activities}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={getActivityIcon(item.type)} />}
                      title={item.title}
                      description={
                        <div>
                          <p>{item.description}</p>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {item.time}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <AlertOutlined style={{ marginRight: 8 }} />
                  Cảnh báo hệ thống
                </span>
              }
              extra={<Button type="link">Xem tất cả</Button>}
            >
              <List
                dataSource={dashboardData.alerts}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor:
                              getAlertColor(item.type) === "error"
                                ? "#ff4d4f"
                                : getAlertColor(item.type) === "warning"
                                ? "#faad14"
                                : getAlertColor(item.type) === "success"
                                ? "#52c41a"
                                : "#1890ff",
                          }}
                          icon={<AlertOutlined />}
                        />
                      }
                      title={item.title}
                      description={item.description}
                    />
                    <Button size="small" type="primary">
                      {item.action}
                    </Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* KPI Progress */}
        <Card
          title={
            <span>
              <TrophyOutlined style={{ marginRight: 8 }} />
              KPI tháng này
            </span>
          }
          style={{ marginTop: 24 }}
        >
          <Row gutter={[16, 16]}>
            {dashboardData.kpis.map((kpi, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <div style={{ padding: "16px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <Text strong>{kpi.name}</Text>
                    <div>
                      <Text>{kpi.value}%</Text>
                      <Text type="secondary">/{kpi.target}%</Text>
                    </div>
                  </div>
                  <Progress
                    percent={Math.min(kpi.value, 100)}
                    strokeColor={{
                      "0%":
                        getKPIStatusColor(kpi.status) === "success"
                          ? "#52c41a"
                          : getKPIStatusColor(kpi.status) === "processing"
                          ? "#1890ff"
                          : getKPIStatusColor(kpi.status) === "warning"
                          ? "#faad14"
                          : "#ff4d4f",
                      "100%":
                        getKPIStatusColor(kpi.status) === "success"
                          ? "#73d13d"
                          : getKPIStatusColor(kpi.status) === "processing"
                          ? "#40a9ff"
                          : getKPIStatusColor(kpi.status) === "warning"
                          ? "#ffc53d"
                          : "#ff7875",
                    }}
                    size="small"
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </Page>
  );
}
