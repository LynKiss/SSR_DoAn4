import { useState, useEffect } from "react";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("thang");
  const [chartType, setChartType] = useState("pie");
  const [loading, setLoading] = useState(true);

  // Mock data - trong thực tế sẽ fetch từ API
  const dashboardData = {
    stats: {
      revenue: {
        current: "2.85 tỷ",
        change: "+18.5%",
        trend: "up",
        target: "3.2 tỷ",
        progress: 89,
      },
      orders: {
        current: "1,456",
        change: "+12.3%",
        trend: "up",
        target: "1,800",
        progress: 81,
      },
      inventory: {
        current: "87%",
        change: "-3.2%",
        trend: "down",
        target: "85%",
        progress: 87,
      },
      production: {
        current: "94.5%",
        change: "+5.1%",
        trend: "up",
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
        priority: "high",
      },
      {
        id: 2,
        type: "production",
        title: "Sản xuất hoàn thành",
        description: "Lệnh sản xuất LSX-2024-0015 hoàn thành",
        time: "15 phút trước",
        status: "completed",
        priority: "medium",
      },
      {
        id: 3,
        type: "inventory",
        title: "Nhập kho",
        description: "Nhập 500 sản phẩm Model A-2024 vào kho",
        time: "30 phút trước",
        status: "completed",
        priority: "low",
      },
      {
        id: 4,
        type: "shipment",
        title: "Giao hàng",
        description: "Giao 200 sản phẩm đến kho hàng Miền Nam",
        time: "45 phút trước",
        status: "in_transit",
        priority: "medium",
      },
      {
        id: 5,
        type: "finance",
        title: "Thanh toán",
        description: "Nhận thanh toán 500 triệu từ khách hàng XYZ",
        time: "1 giờ trước",
        status: "completed",
        priority: "high",
      },
    ],
    alerts: [
      {
        id: 1,
        type: "error",
        title: "Tồn kho thấp",
        description: "Sản phẩm B-2024 chỉ còn 45 cái (dưới mức an toàn)",
        action: "Nhập hàng",
        priority: "high",
      },
      {
        id: 2,
        type: "warning",
        title: "Bảo trì máy móc",
        description: "Máy ép E-01 cần bảo trì định kỳ (đã 89 ngày)",
        action: "Lên lịch",
        priority: "medium",
      },
      {
        id: 3,
        type: "info",
        title: "Đơn hàng chờ duyệt",
        description: "7 đơn hàng cần phê duyệt từ bộ phận bán hàng",
        action: "Xem đơn",
        priority: "medium",
      },
      {
        id: 4,
        type: "warning",
        title: "Chậm giao hàng",
        description: "3 đơn hàng có nguy cơ chậm giao (quá 80% thời gian)",
        action: "Kiểm tra",
        priority: "high",
      },
    ],
    kpis: [
      { name: "Doanh thu", value: 89, target: 100, status: "good" },
      { name: "Sản xuất", value: 94.5, target: 95, status: "excellent" },
      { name: "Chất lượng", value: 98.2, target: 98, status: "excellent" },
      { name: "Giao hàng đúng hạn", value: 91.5, target: 95, status: "good" },
      {
        name: "Satisfy khách hàng",
        value: 96.8,
        target: 95,
        status: "excellent",
      },
      {
        name: "Hiệu suất nhân viên",
        value: 87.3,
        target: 90,
        status: "warning",
      },
    ],
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      order: "fas fa-shopping-cart",
      production: "fas fa-industry",
      inventory: "fas fa-boxes",
      shipment: "fas fa-truck",
      finance: "fas fa-dollar-sign",
      hr: "fas fa-users",
      system: "fas fa-cog",
    };
    return icons[type] || "fas fa-info-circle";
  };

  const getActivityColor = (type, status) => {
    const colors = {
      order: status === "pending" ? "warning" : "primary",
      production: status === "completed" ? "success" : "info",
      inventory: status === "completed" ? "success" : "info",
      shipment:
        status === "in_transit"
          ? "info"
          : status === "completed"
          ? "success"
          : "warning",
      finance: "success",
      hr: "primary",
      system: "secondary",
    };
    return colors[type] || "secondary";
  };

  const getAlertIcon = (type) => {
    const icons = {
      error: "fas fa-exclamation-triangle",
      warning: "fas fa-exclamation-circle",
      info: "fas fa-info-circle",
      success: "fas fa-check-circle",
    };
    return icons[type] || "fas fa-info-circle";
  };

  const getAlertColor = (type) => {
    const colors = {
      error: "error",
      warning: "warning",
      info: "info",
      success: "success",
    };
    return colors[type] || "info";
  };

  const getKPIStatusColor = (status) => {
    const colors = {
      excellent: "success",
      good: "primary",
      warning: "warning",
      error: "error",
    };
    return colors[status] || "secondary";
  };

  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-title-section">
            <h1 className="dashboard-title">
              <i className="fas fa-tachometer-alt"></i>
              Dashboard - Tổng quan hệ thống
            </h1>
            <p className="dashboard-subtitle">
              Theo dõi hoạt động doanh nghiệp và các chỉ số KPI quan trọng
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-sync-alt"></i>
              Làm mới
            </button>
            <button className="btn btn-secondary btn-sm">
              <i className="fas fa-download"></i>
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats">
        <div className="stats-grid">
          {/* Revenue Card */}
          <div className="stat-card revenue-card">
            <div className="stat-card-header">
              <div className="stat-card-icon revenue-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-card-badge">
                <span className="badge badge-success">
                  <i className="fas fa-arrow-up"></i>
                  {dashboardData.stats.revenue.change}
                </span>
              </div>
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-label">Doanh thu tháng</h3>
              <div className="stat-card-value">
                {dashboardData.stats.revenue.current}
              </div>
              <div className="stat-card-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill revenue-fill"
                    style={{
                      width: `${dashboardData.stats.revenue.progress}%`,
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {dashboardData.stats.revenue.progress}% mục tiêu (
                  {dashboardData.stats.revenue.target})
                </span>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="stat-card orders-card">
            <div className="stat-card-header">
              <div className="stat-card-icon orders-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="stat-card-badge">
                <span className="badge badge-success">
                  <i className="fas fa-arrow-up"></i>
                  {dashboardData.stats.orders.change}
                </span>
              </div>
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-label">Đơn hàng</h3>
              <div className="stat-card-value">
                {dashboardData.stats.orders.current}
              </div>
              <div className="stat-card-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill orders-fill"
                    style={{ width: `${dashboardData.stats.orders.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {dashboardData.stats.orders.progress}% mục tiêu (
                  {dashboardData.stats.orders.target})
                </span>
              </div>
            </div>
          </div>

          {/* Inventory Card */}
          <div className="stat-card inventory-card">
            <div className="stat-card-header">
              <div className="stat-card-icon inventory-icon">
                <i className="fas fa-boxes"></i>
              </div>
              <div className="stat-card-badge">
                <span className="badge badge-warning">
                  <i className="fas fa-arrow-down"></i>
                  {dashboardData.stats.inventory.change}
                </span>
              </div>
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-label">Tồn kho</h3>
              <div className="stat-card-value">
                {dashboardData.stats.inventory.current}
              </div>
              <div className="stat-card-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill inventory-fill"
                    style={{
                      width: `${dashboardData.stats.inventory.progress}%`,
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  Mức an toàn: {dashboardData.stats.inventory.target}
                </span>
              </div>
            </div>
          </div>

          {/* Production Card */}
          <div className="stat-card production-card">
            <div className="stat-card-header">
              <div className="stat-card-icon production-icon">
                <i className="fas fa-industry"></i>
              </div>
              <div className="stat-card-badge">
                <span className="badge badge-success">
                  <i className="fas fa-arrow-up"></i>
                  {dashboardData.stats.production.change}
                </span>
              </div>
            </div>
            <div className="stat-card-content">
              <h3 className="stat-card-label">Hiệu suất SX</h3>
              <div className="stat-card-value">
                {dashboardData.stats.production.current}
              </div>
              <div className="stat-card-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill production-fill"
                    style={{
                      width: `${dashboardData.stats.production.progress}%`,
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  Mục tiêu: {dashboardData.stats.production.target}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Activities Grid */}
      <div className="dashboard-main">
        <div className="dashboard-main-grid">
          {/* Revenue Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">
                <i className="fas fa-chart-area"></i>
                Doanh thu 12 tháng
              </h3>
              <div className="chart-actions">
                <button
                  className={`chart-action-btn ${
                    timeRange === "thang" ? "active" : ""
                  }`}
                  onClick={() => setTimeRange("thang")}
                >
                  Tháng
                </button>
                <button
                  className={`chart-action-btn ${
                    timeRange === "quy" ? "active" : ""
                  }`}
                  onClick={() => setTimeRange("quy")}
                >
                  Quý
                </button>
                <button
                  className={`chart-action-btn ${
                    timeRange === "nam" ? "active" : ""
                  }`}
                  onClick={() => setTimeRange("nam")}
                >
                  Năm
                </button>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-placeholder">
                <i className="fas fa-chart-line"></i>
                <p>Biểu đồ doanh thu sẽ hiển thị tại đây</p>
                <small>Thời gian: {timeRange}</small>
              </div>
            </div>
          </div>

          {/* Product Distribution Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">
                <i className="fas fa-chart-pie"></i>
                Phân bổ sản phẩm
              </h3>
              <div className="chart-actions">
                <button
                  className={`chart-action-btn ${
                    chartType === "pie" ? "active" : ""
                  }`}
                  onClick={() => setChartType("pie")}
                >
                  Pie Chart
                </button>
                <button
                  className={`chart-action-btn ${
                    chartType === "bar" ? "active" : ""
                  }`}
                  onClick={() => setChartType("bar")}
                >
                  Bar Chart
                </button>
                <button
                  className={`chart-action-btn ${
                    chartType === "line" ? "active" : ""
                  }`}
                  onClick={() => setChartType("line")}
                >
                  Line Chart
                </button>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-placeholder">
                <i className="fas fa-chart-pie"></i>
                <p>Biểu đồ phân bổ sản phẩm sẽ hiển thị tại đây</p>
                <small>Loại: {chartType}</small>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities-card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-clock"></i>
                Hoạt động gần đây
              </h3>
              <button className="btn btn-sm btn-secondary">Xem tất cả</button>
            </div>
            <div className="activities-list">
              {dashboardData.activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <i className={getActivityIcon(activity.type)}></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-header">
                      <h4 className="activity-title">{activity.title}</h4>
                      <div className="activity-meta">
                        <span
                          className={`badge badge-${getActivityColor(
                            activity.type,
                            activity.status
                          )} badge-sm`}
                        >
                          {activity.status === "pending"
                            ? "Chờ"
                            : activity.status === "completed"
                            ? "Hoàn thành"
                            : activity.status === "in_transit"
                            ? "Đang vận chuyển"
                            : activity.status}
                        </span>
                      </div>
                    </div>
                    <p className="activity-description">
                      {activity.description}
                    </p>
                    <div className="activity-footer">
                      <span className="activity-time">
                        <i className="fas fa-clock"></i>
                        {activity.time}
                      </span>
                      {activity.priority === "high" && (
                        <span className="activity-priority high">
                          <i className="fas fa-exclamation"></i>
                          Ưu tiên cao
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="alerts-card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-exclamation-triangle"></i>
                Cảnh báo hệ thống
              </h3>
              <button className="btn btn-sm btn-secondary">Xem tất cả</button>
            </div>
            <div className="alerts-list">
              {dashboardData.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`alert-item alert-${getAlertColor(alert.type)}`}
                >
                  <div className="alert-icon">
                    <i className={getAlertIcon(alert.type)}></i>
                  </div>
                  <div className="alert-content">
                    <div className="alert-header">
                      <h4 className="alert-title">{alert.title}</h4>
                      <span
                        className={`badge badge-${getAlertColor(
                          alert.type
                        )} badge-sm`}
                      >
                        {alert.priority === "high"
                          ? "Ưu tiên cao"
                          : alert.priority === "medium"
                          ? "Ưu tiên vừa"
                          : "Ưu tiên thấp"}
                      </span>
                    </div>
                    <p className="alert-description">{alert.description}</p>
                    <div className="alert-actions">
                      <button className="btn btn-sm btn-primary">
                        {alert.action}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPI Progress */}
          <div className="kpi-card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-chart-bar"></i>
                KPI tháng này
              </h3>
              <div className="kpi-summary">
                <span className="kpi-score">85.2%</span>
                <span className="kpi-label">Điểm tổng thể</span>
              </div>
            </div>
            <div className="kpi-list">
              {dashboardData.kpis.map((kpi, index) => (
                <div key={index} className="kpi-item">
                  <div className="kpi-header">
                    <span className="kpi-name">{kpi.name}</span>
                    <div className="kpi-values">
                      <span className="kpi-current">{kpi.value}%</span>
                      <span className="kpi-target">/{kpi.target}%</span>
                    </div>
                  </div>
                  <div className="kpi-progress">
                    <div className="progress-bar">
                      <div
                        className={`progress-fill kpi-fill-${getKPIStatusColor(
                          kpi.status
                        )}`}
                        style={{ width: `${Math.min(kpi.value, 100)}%` }}
                      ></div>
                    </div>
                    <span
                      className={`kpi-status kpi-status-${getKPIStatusColor(
                        kpi.status
                      )}`}
                    >
                      {kpi.status === "excellent"
                        ? "Xuất sắc"
                        : kpi.status === "good"
                        ? "Tốt"
                        : kpi.status === "warning"
                        ? "Cần cải thiện"
                        : "Kém"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-bolt"></i>
                Thao tác nhanh
              </h3>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-btn">
                <i className="fas fa-plus"></i>
                <span>Tạo đơn hàng</span>
              </button>
              <button className="quick-action-btn">
                <i className="fas fa-industry"></i>
                <span>Lệnh sản xuất</span>
              </button>
              <button className="quick-action-btn">
                <i className="fas fa-boxes"></i>
                <span>Kiểm tra kho</span>
              </button>
              <button className="quick-action-btn">
                <i className="fas fa-truck"></i>
                <span>Giao hàng</span>
              </button>
              <button className="quick-action-btn">
                <i className="fas fa-chart-line"></i>
                <span>Báo cáo</span>
              </button>
              <button className="quick-action-btn">
                <i className="fas fa-cog"></i>
                <span>Cài đặt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
