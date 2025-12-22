import { useState, useEffect } from "react";
import "./Production.css";

const Production = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [productionOrders, setProductionOrders] = useState([]);
  const [machines, setMachines] = useState([]);
  const [materials, setMaterials] = useState([]);

  // Mock data cho Production module
  const productionData = {
    overview: {
      dailyProduction: {
        target: 1000,
        actual: 945,
        efficiency: 94.5,
        defects: 23,
        quality: 97.6,
      },
      weeklyTrend: [
        { day: "T2", target: 1000, actual: 987 },
        { day: "T3", target: 1000, actual: 1005 },
        { day: "T4", target: 1000, actual: 945 },
        { day: "T5", target: 1000, actual: 1023 },
        { day: "T6", target: 1000, actual: 989 },
        { day: "T7", target: 800, actual: 756 },
        { day: "CN", target: 600, actual: 0 },
      ],
    },
    orders: [
      {
        id: "PO-2024-001",
        product: "Sản phẩm A-2024",
        quantity: 500,
        completed: 320,
        status: "in_progress",
        priority: "high",
        startDate: "2024-01-15",
        endDate: "2024-01-25",
        assignedMachine: "Máy ép E-01",
        progress: 64,
        operator: "Nguyễn Văn A",
        defects: 5,
      },
      {
        id: "PO-2024-002",
        product: "Sản phẩm B-2024",
        quantity: 300,
        completed: 300,
        status: "completed",
        priority: "medium",
        startDate: "2024-01-10",
        endDate: "2024-01-20",
        assignedMachine: "Máy cắt C-02",
        progress: 100,
        operator: "Trần Thị B",
        defects: 2,
      },
      {
        id: "PO-2024-003",
        product: "Sản phẩm C-2024",
        quantity: 750,
        completed: 0,
        status: "pending",
        priority: "low",
        startDate: "2024-01-22",
        endDate: "2024-02-05",
        assignedMachine: "Máy hàn H-03",
        progress: 0,
        operator: "Chưa phân công",
        defects: 0,
      },
    ],
    machines: [
      {
        id: "E-01",
        name: "Máy ép E-01",
        type: "Ép nhựa",
        status: "running",
        currentOrder: "PO-2024-001",
        efficiency: 94.2,
        nextMaintenance: "2024-02-15",
        operatingHours: 2456,
        totalProduced: 15420,
        defectRate: 2.1,
      },
      {
        id: "C-02",
        name: "Máy cắt C-02",
        type: "Cắt laser",
        status: "maintenance",
        currentOrder: null,
        efficiency: 0,
        nextMaintenance: "2024-01-25",
        operatingHours: 3892,
        totalProduced: 28750,
        defectRate: 1.8,
      },
      {
        id: "H-03",
        name: "Máy hàn H-03",
        type: "Hàn siêu âm",
        status: "idle",
        currentOrder: null,
        efficiency: 0,
        nextMaintenance: "2024-03-01",
        operatingHours: 1234,
        totalProduced: 8960,
        defectRate: 3.2,
      },
    ],
    materials: [
      {
        id: "MAT-001",
        name: "Nhựa ABS - Trắng",
        category: "Nguyên liệu chính",
        currentStock: 2450,
        minStock: 500,
        maxStock: 5000,
        unit: "kg",
        supplier: "Công ty X",
        lastDelivery: "2024-01-20",
        price: 45000,
      },
      {
        id: "MAT-002",
        name: "Nhựa PP - Đen",
        category: "Nguyên liệu chính",
        currentStock: 180,
        minStock: 300,
        maxStock: 3000,
        unit: "kg",
        supplier: "Công ty Y",
        lastDelivery: "2024-01-18",
        price: 38000,
      },
      {
        id: "MAT-003",
        name: "Keo Epoxy",
        category: "Phụ gia",
        currentStock: 45,
        minStock: 20,
        maxStock: 200,
        unit: "lít",
        supplier: "Công ty Z",
        lastDelivery: "2024-01-22",
        price: 85000,
      },
    ],
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      setProductionOrders(productionData.orders);
      setMachines(productionData.machines);
      setMaterials(productionData.materials);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      running: "success",
      idle: "warning",
      maintenance: "error",
      completed: "success",
      in_progress: "info",
      pending: "secondary",
    };
    return colors[status] || "secondary";
  };

  const getStatusText = (status) => {
    const texts = {
      running: "Đang chạy",
      idle: "Sẵn sàng",
      maintenance: "Bảo trì",
      completed: "Hoàn thành",
      in_progress: "Đang thực hiện",
      pending: "Chờ xử lý",
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "error",
      medium: "warning",
      low: "info",
    };
    return colors[priority] || "secondary";
  };

  if (loading) {
    return (
      <div className="production loading">
        <div className="production-loading">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu sản xuất...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="production">
      {/* Header */}
      <div className="production-header">
        <div className="production-header-content">
          <div className="production-title-section">
            <h1 className="production-title">
              <i className="fas fa-industry"></i>
              Quản lý Sản xuất
            </h1>
            <p className="production-subtitle">
              Theo dõi và điều hành hoạt động sản xuất, máy móc và nguyên liệu
            </p>
          </div>
          <div className="production-actions">
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-plus"></i>
              Lệnh sản xuất mới
            </button>
            <button className="btn btn-secondary btn-sm">
              <i className="fas fa-file-export"></i>
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="production-tabs">
        <div className="tab-nav">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <i className="fas fa-chart-line"></i>
            Tổng quan
          </button>
          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <i className="fas fa-list"></i>
            Lệnh sản xuất
          </button>
          <button
            className={`tab-btn ${activeTab === "machines" ? "active" : ""}`}
            onClick={() => setActiveTab("machines")}
          >
            <i className="fas fa-cogs"></i>
            Máy móc
          </button>
          <button
            className={`tab-btn ${activeTab === "materials" ? "active" : ""}`}
            onClick={() => setActiveTab("materials")}
          >
            <i className="fas fa-boxes"></i>
            Nguyên liệu
          </button>
          <button
            className={`tab-btn ${activeTab === "quality" ? "active" : ""}`}
            onClick={() => setActiveTab("quality")}
          >
            <i className="fas fa-check-circle"></i>
            Chất lượng
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="production-content">
        {activeTab === "overview" && (
          <div className="overview-content">
            {/* Production Stats */}
            <div className="production-stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon success">
                      <i className="fas fa-industry"></i>
                    </div>
                  </div>
                  <div className="stat-card-content">
                    <h3>Sản lượng hôm nay</h3>
                    <div className="stat-value">
                      {productionData.overview.dailyProduction.actual}
                      <span className="stat-unit">
                        / {productionData.overview.dailyProduction.target} cái
                      </span>
                    </div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill success"
                          style={{
                            width: `${
                              (productionData.overview.dailyProduction.actual /
                                productionData.overview.dailyProduction
                                  .target) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {(
                          (productionData.overview.dailyProduction.actual /
                            productionData.overview.dailyProduction.target) *
                          100
                        ).toFixed(1)}
                        % mục tiêu
                      </span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon primary">
                      <i className="fas fa-chart-line"></i>
                    </div>
                  </div>
                  <div className="stat-card-content">
                    <h3>Hiệu suất</h3>
                    <div className="stat-value">
                      {productionData.overview.dailyProduction.efficiency}%
                    </div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill primary"
                          style={{
                            width: `${productionData.overview.dailyProduction.efficiency}%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">Mục tiêu: 95%</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon warning">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                  </div>
                  <div className="stat-card-content">
                    <h3>Sản phẩm lỗi</h3>
                    <div className="stat-value">
                      {productionData.overview.dailyProduction.defects}
                      <span className="stat-unit"> cái</span>
                    </div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill warning"
                          style={{
                            width: `${
                              (productionData.overview.dailyProduction.defects /
                                productionData.overview.dailyProduction
                                  .actual) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        Tỷ lệ lỗi:{" "}
                        {(
                          (productionData.overview.dailyProduction.defects /
                            productionData.overview.dailyProduction.actual) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon info">
                      <i className="fas fa-medal"></i>
                    </div>
                  </div>
                  <div className="stat-card-content">
                    <h3>Chất lượng</h3>
                    <div className="stat-value">
                      {productionData.overview.dailyProduction.quality}%
                    </div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill info"
                          style={{
                            width: `${productionData.overview.dailyProduction.quality}%`,
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">Mục tiêu: 98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Production Trend */}
            <div className="production-trend">
              <div className="chart-card">
                <div className="chart-header">
                  <h3 className="chart-title">
                    <i className="fas fa-chart-area"></i>
                    Xu hướng sản xuất 7 ngày
                  </h3>
                </div>
                <div className="chart-container">
                  <div className="trend-placeholder">
                    <i className="fas fa-chart-line"></i>
                    <p>Biểu đồ xu hướng sản xuất sẽ hiển thị tại đây</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-content">
            <div className="orders-header">
              <h3>Danh sách lệnh sản xuất</h3>
              <div className="orders-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-plus"></i>
                  Tạo lệnh mới
                </button>
              </div>
            </div>
            <div className="orders-list">
              {productionOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h4 className="order-title">{order.id}</h4>
                      <p className="order-product">{order.product}</p>
                    </div>
                    <div className="order-meta">
                      <span
                        className={`badge badge-${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                      <span
                        className={`badge badge-${getPriorityColor(
                          order.priority
                        )} badge-sm`}
                      >
                        Ưu tiên{" "}
                        {order.priority === "high"
                          ? "cao"
                          : order.priority === "medium"
                          ? "vừa"
                          : "thấp"}
                      </span>
                    </div>
                  </div>
                  <div className="order-details">
                    <div className="order-progress">
                      <div className="progress-info">
                        <span>
                          Số lượng: {order.completed}/{order.quantity}
                        </span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className={`progress-fill ${
                            order.status === "completed" ? "success" : "primary"
                          }`}
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="order-info-grid">
                      <div className="info-item">
                        <label>Máy:</label>
                        <span>{order.assignedMachine}</span>
                      </div>
                      <div className="info-item">
                        <label>Người vận hành:</label>
                        <span>{order.operator}</span>
                      </div>
                      <div className="info-item">
                        <label>Bắt đầu:</label>
                        <span>{order.startDate}</span>
                      </div>
                      <div className="info-item">
                        <label>Dự kiến hoàn thành:</label>
                        <span>{order.endDate}</span>
                      </div>
                      <div className="info-item">
                        <label>Sản phẩm lỗi:</label>
                        <span className="text-error">{order.defects}</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-actions">
                    <button className="btn btn-sm btn-secondary">
                      <i className="fas fa-eye"></i>
                      Chi tiết
                    </button>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-edit"></i>
                      Cập nhật
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "machines" && (
          <div className="machines-content">
            <div className="machines-header">
              <h3>Quản lý máy móc</h3>
              <div className="machines-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-plus"></i>
                  Thêm máy mới
                </button>
              </div>
            </div>
            <div className="machines-grid">
              {machines.map((machine) => (
                <div key={machine.id} className="machine-card">
                  <div className="machine-header">
                    <div className="machine-info">
                      <h4 className="machine-name">{machine.name}</h4>
                      <p className="machine-type">{machine.type}</p>
                    </div>
                    <div className="machine-status">
                      <span
                        className={`status-indicator status-${getStatusColor(
                          machine.status
                        )}`}
                      ></span>
                      <span
                        className={`badge badge-${getStatusColor(
                          machine.status
                        )}`}
                      >
                        {getStatusText(machine.status)}
                      </span>
                    </div>
                  </div>
                  <div className="machine-details">
                    <div className="machine-stats">
                      <div className="stat-item">
                        <label>Hiệu suất:</label>
                        <span className="stat-value">
                          {machine.efficiency}%
                        </span>
                      </div>
                      <div className="stat-item">
                        <label>Sản lượng:</label>
                        <span className="stat-value">
                          {machine.totalProduced.toLocaleString()}
                        </span>
                      </div>
                      <div className="stat-item">
                        <label>Tỷ lệ lỗi:</label>
                        <span className="stat-value text-error">
                          {machine.defectRate}%
                        </span>
                      </div>
                      <div className="stat-item">
                        <label>Giờ vận hành:</label>
                        <span className="stat-value">
                          {machine.operatingHours}h
                        </span>
                      </div>
                    </div>
                    <div className="machine-progress">
                      <div className="progress-info">
                        <span>Bảo trì tiếp theo:</span>
                        <span className="maintenance-date">
                          {machine.nextMaintenance}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill warning"
                          style={{
                            width: `${Math.min(
                              (machine.operatingHours / 3000) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    {machine.currentOrder && (
                      <div className="current-order">
                        <label>Lệnh hiện tại:</label>
                        <span className="order-id">{machine.currentOrder}</span>
                      </div>
                    )}
                  </div>
                  <div className="machine-actions">
                    <button className="btn btn-sm btn-secondary">
                      <i className="fas fa-cog"></i>
                      Cài đặt
                    </button>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-wrench"></i>
                      Bảo trì
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="materials-content">
            <div className="materials-header">
              <h3>Quản lý nguyên liệu</h3>
              <div className="materials-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-plus"></i>
                  Nhập nguyên liệu
                </button>
              </div>
            </div>
            <div className="materials-list">
              {materials.map((material) => (
                <div key={material.id} className="material-card">
                  <div className="material-header">
                    <div className="material-info">
                      <h4 className="material-name">{material.name}</h4>
                      <p className="material-category">{material.category}</p>
                    </div>
                    <div className="material-stock-status">
                      <span
                        className={`badge ${
                          material.currentStock <= material.minStock
                            ? "badge-error"
                            : "badge-success"
                        }`}
                      >
                        {material.currentStock <= material.minStock
                          ? "Thấp"
                          : "Đủ"}
                      </span>
                    </div>
                  </div>
                  <div className="material-details">
                    <div className="stock-info">
                      <div className="stock-level">
                        <div className="stock-bar">
                          <div
                            className={`stock-fill ${
                              material.currentStock <= material.minStock
                                ? "error"
                                : "success"
                            }`}
                            style={{
                              width: `${Math.min(
                                (material.currentStock / material.maxStock) *
                                  100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <div className="stock-text">
                          {material.currentStock} {material.unit} /{" "}
                          {material.maxStock} {material.unit}
                        </div>
                      </div>
                    </div>
                    <div className="material-info-grid">
                      <div className="info-item">
                        <label>Tồn tối thiểu:</label>
                        <span>
                          {material.minStock} {material.unit}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Nhà cung cấp:</label>
                        <span>{material.supplier}</span>
                      </div>
                      <div className="info-item">
                        <label>Giá:</label>
                        <span>
                          {material.price.toLocaleString()} VNĐ/{material.unit}
                        </span>
                      </div>
                      <div className="info-item">
                        <label>Nhập cuối:</label>
                        <span>{material.lastDelivery}</span>
                      </div>
                    </div>
                  </div>
                  <div className="material-actions">
                    <button className="btn btn-sm btn-secondary">
                      <i className="fas fa-eye"></i>
                      Chi tiết
                    </button>
                    <button className="btn btn-sm btn-primary">
                      <i className="fas fa-shopping-cart"></i>
                      Đặt hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="quality-content">
            <div className="quality-header">
              <h3>Quản lý chất lượng</h3>
              <div className="quality-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-plus"></i>
                  Kiểm tra chất lượng
                </button>
              </div>
            </div>
            <div className="quality-stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon success">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  </div>
                  <div className="stat-card-content">
                    <h3>Tỷ lệ đạt chuẩn</h3>
                    <div className="stat-value">97.6%</div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill success"
                          style={{ width: "97.6%" }}
                        ></div>
                      </div>
                      <span className="progress-text">Mục tiêu: 98%</span>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon error">
                      <i className="fas fa-times-circle"></i>
                    </div>
                  </div>
                  <div className="stat-card-content">
                    <h3>Sản phẩm lỗi hôm nay</h3>
                    <div className="stat-value">23</div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill error"
                          style={{ width: "23%" }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        Giảm 15% so với hôm qua
                      </span>
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon warning">
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                  </div>
                  <div className="stat-card-content">
                    <h3>Cần kiểm tra lại</h3>
                    <div className="stat-value">8</div>
                    <div className="stat-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill warning"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        Cần xử lý trong ngày
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Production;
