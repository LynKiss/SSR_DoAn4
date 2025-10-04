import useTheme from "../../hooks/useTheme";
import "./Dashboard.css";

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  return (
    <div id="dashboard" className="module-content">
      <div className="dashboard-header">
        <h2 className={`dashboard-title ${isDarkMode ? "dark" : ""}`}>
          Dashboard - Bảng điều khiển
        </h2>
        <p className={`dashboard-subtitle ${isDarkMode ? "dark" : ""}`}>
          Tổng quan hoạt động doanh nghiệp
        </p>
      </div>

      {/* Quick Reports Section */}
      <div className="quick-reports">
        <div className="report-card card-hover cursor-pointer">
          <div className="report-card-content">
            <div className="report-card-text">
              <p>Báo cáo tài chính</p>
              <p>2.5 tỷ VNĐ</p>
              <p>Doanh thu tháng</p>
            </div>
            <i className="fas fa-chart-line report-card-icon"></i>
          </div>
        </div>

        <div className="report-card blue card-hover cursor-pointer">
          <div className="report-card-content">
            <div className="report-card-text">
              <p>Báo cáo bán hàng</p>
              <p>1,247</p>
              <p>Đơn hàng tháng</p>
            </div>
            <i className="fas fa-shopping-cart report-card-icon"></i>
          </div>
        </div>

        <div className="report-card orange card-hover cursor-pointer">
          <div className="report-card-content">
            <div className="report-card-text">
              <p>Báo cáo tồn kho</p>
              <p>85%</p>
              <p>Mức tồn kho</p>
            </div>
            <i className="fas fa-boxes report-card-icon"></i>
          </div>
        </div>

        <div className="report-card purple card-hover cursor-pointer">
          <div className="report-card-content">
            <div className="report-card-text">
              <p>Hiệu suất sản xuất</p>
              <p>92%</p>
              <p>Năng suất</p>
            </div>
            <i className="fas fa-industry report-card-icon"></i>
          </div>
        </div>

        <div className="report-card indigo card-hover cursor-pointer">
          <div className="report-card-content">
            <div className="report-card-text">
              <p>KPI nhân sự</p>
              <p>87%</p>
              <p>Hiệu suất NV</p>
            </div>
            <i className="fas fa-users report-card-icon"></i>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-grid">
        {/* Financial Overview */}
        <div className={`dashboard-card ${isDarkMode ? "dark" : ""}`}>
          <h3 className={`dashboard-card-title ${isDarkMode ? "dark" : ""}`}>
            <i className="fas fa-chart-line text-green-500 mr-2"></i>
            Tài chính tháng
          </h3>
          <div className="dashboard-card-content">
            <div className="card-item">
              <span className={isDarkMode ? "dark" : ""}>Doanh thu</span>
              <span className="font-bold text-green-600">2.5 tỷ VNĐ</span>
            </div>
            <div className="card-item">
              <span className={isDarkMode ? "dark" : ""}>Chi phí</span>
              <span className="font-bold text-red-600">1.8 tỷ VNĐ</span>
            </div>
            <div className="card-item">
              <span className={isDarkMode ? "dark" : ""}>Lợi nhuận</span>
              <span className="font-bold text-blue-600">700 triệu VNĐ</span>
            </div>
            <div className={`card-divider ${isDarkMode ? "dark" : ""}`}>
              <div className="card-item">
                <span className={isDarkMode ? "dark" : ""}>Tỷ suất LN</span>
                <span className="font-bold text-purple-600">28%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Production Status */}
        <div className={`dashboard-card ${isDarkMode ? "dark" : ""}`}>
          <h3 className={`dashboard-card-title ${isDarkMode ? "dark" : ""}`}>
            <i className="fas fa-cogs text-purple-500 mr-2"></i>
            Tình hình sản xuất
          </h3>
          <div className="dashboard-card-content">
            <div className="card-item">
              <span className={isDarkMode ? "dark" : ""}>Đang sản xuất</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                15 lệnh
              </span>
            </div>
            <div className="card-item">
              <span className={isDarkMode ? "dark" : ""}>
                Hoàn thành hôm nay
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                8 lệnh
              </span>
            </div>
            <div className="card-item">
              <span className={isDarkMode ? "dark" : ""}>Chờ nguyên liệu</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                3 lệnh
              </span>
            </div>
            <div className={`card-divider ${isDarkMode ? "dark" : ""}`}>
              <div className="card-item">
                <span className={isDarkMode ? "dark" : ""}>Hiệu suất máy</span>
                <span className="font-bold text-blue-600">92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Activities */}
        <div className={`dashboard-card ${isDarkMode ? "dark" : ""}`}>
          <h3 className={`dashboard-card-title ${isDarkMode ? "dark" : ""}`}>
            <i className="fas fa-bell text-blue-500 mr-2"></i>
            Thông báo & Hoạt động
          </h3>
          <div className="notifications">
            <div className="notification-item red">
              <div className="notification-dot red"></div>
              <div className="notification-content">
                <p className="notification-title red">Cảnh báo tồn kho</p>
                <p className="notification-text red">
                  Sản phẩm B dưới mức tối thiểu
                </p>
                <p className={`notification-time ${isDarkMode ? "dark" : ""}`}>
                  5 phút trước
                </p>
              </div>
            </div>
            <div className="notification-item green">
              <div className="notification-dot green"></div>
              <div className="notification-content">
                <p className="notification-title green">Đơn hàng hoàn thành</p>
                <p className="notification-text green">
                  Đơn hàng #DH001 đã giao thành công
                </p>
                <p className={`notification-time ${isDarkMode ? "dark" : ""}`}>
                  15 phút trước
                </p>
              </div>
            </div>
            <div className="notification-item blue">
              <div className="notification-dot blue"></div>
              <div className="notification-content">
                <p className="notification-title blue">Nhập kho mới</p>
                <p className="notification-text blue">
                  Nhập 500 sản phẩm A vào kho
                </p>
                <p className={`notification-time ${isDarkMode ? "dark" : ""}`}>
                  30 phút trước
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className={`chart-card ${isDarkMode ? "dark" : ""}`}>
          <h3 className={`chart-title ${isDarkMode ? "dark" : ""}`}>
            Doanh thu 6 tháng gần đây
          </h3>
          <div className="bar-chart">
            <div className="bar" style={{ height: "60%" }}></div>
            <div className="bar" style={{ height: "75%" }}></div>
            <div className="bar" style={{ height: "45%" }}></div>
            <div className="bar" style={{ height: "85%" }}></div>
            <div className="bar" style={{ height: "70%" }}></div>
            <div className="bar" style={{ height: "90%" }}></div>
          </div>
          <div className={`bar-labels ${isDarkMode ? "dark" : ""}`}>
            <span>T7</span>
            <span>T8</span>
            <span>T9</span>
            <span>T10</span>
            <span>T11</span>
            <span>T12</span>
          </div>
        </div>

        <div className={`chart-card ${isDarkMode ? "dark" : ""}`}>
          <h3 className={`chart-title ${isDarkMode ? "dark" : ""}`}>
            Phân bổ doanh thu theo sản phẩm
          </h3>
          <div className="pie-chart">
            <div className="pie-container">
              <div className="pie-background"></div>
              <div className={`pie-center ${isDarkMode ? "dark" : ""}`}>
                <div className="pie-center-text">
                  <p>100%</p>
                  <p className={isDarkMode ? "dark" : ""}>Tổng</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pie-legend">
            <div className="legend-item">
              <div className="legend-dot blue"></div>
              <span className={`legend-text ${isDarkMode ? "dark" : ""}`}>
                Sản phẩm A (40%)
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-dot green"></div>
              <span className={`legend-text ${isDarkMode ? "dark" : ""}`}>
                Sản phẩm B (20%)
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-dot yellow"></div>
              <span className={`legend-text ${isDarkMode ? "dark" : ""}`}>
                Sản phẩm C (20%)
              </span>
            </div>
            <div className="legend-item">
              <div className="legend-dot red"></div>
              <span className={`legend-text ${isDarkMode ? "dark" : ""}`}>
                Khác (20%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
