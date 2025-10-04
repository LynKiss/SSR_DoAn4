import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import "./Shipping.css";

const Shipping = () => {
  const { isDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="shipping-tab-content">
            <div className="shipping-stats-grid">
              <div className="shipping-stat-card blue">
                <div className="shipping-stat-content">
                  <div>
                    <p className="shipping-stat-label">Đơn hàng đang giao</p>
                    <p className="shipping-stat-value">47</p>
                  </div>
                  <i className="fas fa-truck shipping-stat-icon"></i>
                </div>
              </div>

              <div className="shipping-stat-card green">
                <div className="shipping-stat-content">
                  <div>
                    <p className="shipping-stat-label">Đã giao thành công</p>
                    <p className="shipping-stat-value">156</p>
                  </div>
                  <i className="fas fa-check-circle shipping-stat-icon"></i>
                </div>
              </div>

              <div className="shipping-stat-card orange">
                <div className="shipping-stat-content">
                  <div>
                    <p className="shipping-stat-label">Đang xử lý</p>
                    <p className="shipping-stat-value">23</p>
                  </div>
                  <i className="fas fa-clock shipping-stat-icon"></i>
                </div>
              </div>

              <div className="shipping-stat-card red">
                <div className="shipping-stat-content">
                  <div>
                    <p className="shipping-stat-label">Trễ hạn</p>
                    <p className="shipping-stat-value">5</p>
                  </div>
                  <i className="fas fa-exclamation-triangle shipping-stat-icon"></i>
                </div>
              </div>
            </div>

            <div className="shipping-overview-grid">
              <div className={`shipping-card ${isDarkMode ? "dark" : ""}`}>
                <h3
                  className={`shipping-card-title ${isDarkMode ? "dark" : ""}`}
                >
                  Tình trạng giao hàng
                </h3>
                <div className="shipping-card-content">
                  <div className="shipping-status-item">
                    <span>Đúng hạn</span>
                    <span className="shipping-status green">94.2%</span>
                  </div>
                  <div className="shipping-status-item">
                    <span>Trễ 1-3 ngày</span>
                    <span className="shipping-status yellow">4.8%</span>
                  </div>
                  <div className="shipping-status-item">
                    <span>Trễ {">"}3 ngày</span>
                    <span className="shipping-status red">1.0%</span>
                  </div>
                </div>
              </div>

              <div className={`shipping-card ${isDarkMode ? "dark" : ""}`}>
                <h3
                  className={`shipping-card-title ${isDarkMode ? "dark" : ""}`}
                >
                  Vận chuyển theo khu vực
                </h3>
                <div className="shipping-card-content">
                  <div className="shipping-region-item">
                    <span>TP.HCM</span>
                    <span className="font-medium">45 đơn</span>
                  </div>
                  <div className="shipping-region-item">
                    <span>Hà Nội</span>
                    <span className="font-medium">32 đơn</span>
                  </div>
                  <div className="shipping-region-item">
                    <span>Đà Nẵng</span>
                    <span className="font-medium">18 đơn</span>
                  </div>
                  <div className="shipping-region-item">
                    <span>Khác</span>
                    <span className="font-medium">61 đơn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="shipping-tab-content">
            <div className="shipping-section-header">
              <h3 className="shipping-section-title">Đơn hàng vận chuyển</h3>
              <button className="shipping-add-btn">
                <i className="fas fa-plus"></i>Tạo đơn vận chuyển
              </button>
            </div>

            <div className="shipping-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Địa chỉ</th>
                    <th>Trọng lượng</th>
                    <th>Ngày giao</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">VC001</td>
                    <td>Công ty ABC</td>
                    <td>TP.HCM</td>
                    <td>25 kg</td>
                    <td>15/12/2024</td>
                    <td>
                      <span className="shipping-status green">Đã giao</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">VC002</td>
                    <td>Công ty XYZ</td>
                    <td>Hà Nội</td>
                    <td>15 kg</td>
                    <td>16/12/2024</td>
                    <td>
                      <span className="shipping-status blue">Đang giao</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "tracking":
        return (
          <div className="shipping-tab-content">
            <div className="shipping-section-header">
              <h3 className="shipping-section-title">Theo dõi đơn hàng</h3>
              <div className="shipping-search">
                <input
                  type="text"
                  placeholder="Nhập mã đơn hàng..."
                  className="shipping-search-input"
                />
                <button className="shipping-search-btn">
                  <i className="fas fa-search"></i>Tìm kiếm
                </button>
              </div>
            </div>

            <div className="shipping-tracking-grid">
              <div
                className={`shipping-tracking-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="shipping-tracking-title">
                  Đơn VC001 - Công ty ABC
                </h4>
                <div className="shipping-tracking-steps">
                  <div className="shipping-tracking-step">
                    <div className="shipping-tracking-dot green"></div>
                    <div className="shipping-tracking-content">
                      <p className="shipping-tracking-step-title green">
                        Đã giao thành công
                      </p>
                      <p className="shipping-tracking-step-text">
                        15/12/2024 14:30 - TP.HCM
                      </p>
                    </div>
                  </div>
                  <div className="shipping-tracking-step">
                    <div className="shipping-tracking-dot blue"></div>
                    <div className="shipping-tracking-content">
                      <p className="shipping-tracking-step-title blue">
                        Đang vận chuyển
                      </p>
                      <p className="shipping-tracking-step-text">
                        15/12/2024 10:15 - Kho trung chuyển
                      </p>
                    </div>
                  </div>
                  <div className="shipping-tracking-step">
                    <div className="shipping-tracking-dot gray"></div>
                    <div className="shipping-tracking-content">
                      <p className="shipping-tracking-step-title gray">
                        Đã xuất kho
                      </p>
                      <p className="shipping-tracking-step-text">
                        14/12/2024 16:45 - Kho chính
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`shipping-tracking-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="shipping-tracking-title">Thông tin chi tiết</h4>
                <div className="shipping-tracking-details">
                  <div className="shipping-tracking-detail">
                    <span>Người nhận:</span>
                    <span className="font-medium">Nguyễn Văn A</span>
                  </div>
                  <div className="shipping-tracking-detail">
                    <span>SĐT:</span>
                    <span className="font-medium">0901 234 567</span>
                  </div>
                  <div className="shipping-tracking-detail">
                    <span>Địa chỉ:</span>
                    <span className="font-medium">123 Đường ABC, TP.HCM</span>
                  </div>
                  <div className="shipping-tracking-detail">
                    <span>Dịch vụ:</span>
                    <span className="font-medium">Giao hàng tiêu chuẩn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "delivery":
        return (
          <div className="shipping-tab-content">
            <div className="shipping-section-header">
              <h3 className="shipping-section-title">Lịch giao hàng</h3>
              <button className="shipping-add-btn">
                <i className="fas fa-calendar-plus"></i>Lên lịch giao hàng
              </button>
            </div>

            <div className="shipping-delivery-grid">
              <div
                className={`shipping-delivery-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="shipping-delivery-title">
                  <i className="fas fa-calendar-day"></i>
                  Hôm nay (16/12)
                </h4>
                <div className="shipping-delivery-content">
                  <div className="shipping-delivery-item blue">
                    <p className="shipping-delivery-item-title blue">
                      VC002 - 08:00
                    </p>
                    <p className="shipping-delivery-item-text blue">
                      Công ty XYZ - Hà Nội
                    </p>
                  </div>
                  <div className="shipping-delivery-item green">
                    <p className="shipping-delivery-item-title green">
                      VC005 - 14:00
                    </p>
                    <p className="shipping-delivery-item-text green">
                      Công ty DEF - Đà Nẵng
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`shipping-delivery-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="shipping-delivery-title">
                  <i className="fas fa-calendar-day"></i>
                  Ngày mai (17/12)
                </h4>
                <div className="shipping-delivery-content">
                  <div className="shipping-delivery-item orange">
                    <p className="shipping-delivery-item-title orange">
                      VC008 - 09:00
                    </p>
                    <p className="shipping-delivery-item-text orange">
                      Công ty GHI - Cần Thơ
                    </p>
                  </div>
                  <div className="shipping-delivery-item purple">
                    <p className="shipping-delivery-item-title purple">
                      VC012 - 15:00
                    </p>
                    <p className="shipping-delivery-item-text purple">
                      Công ty JKL - Bình Dương
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`shipping-delivery-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="shipping-delivery-title">
                  <i className="fas fa-calendar-week"></i>
                  Tuần này
                </h4>
                <div className="shipping-delivery-content">
                  <div className="shipping-delivery-summary">
                    <span>Đã lên lịch:</span>
                    <span className="font-medium">23 đơn</span>
                  </div>
                  <div className="shipping-delivery-summary">
                    <span>Chưa lên lịch:</span>
                    <span className="font-medium text-orange-600">7 đơn</span>
                  </div>
                  <div className="shipping-delivery-summary">
                    <span>Tổng:</span>
                    <span className="font-medium">30 đơn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "returns":
        return (
          <div className="shipping-tab-content">
            <div className="shipping-section-header">
              <h3 className="shipping-section-title">Quản lý trả hàng</h3>
              <button className="shipping-return-btn">
                <i className="fas fa-undo"></i>Tạo yêu cầu trả hàng
              </button>
            </div>

            <div className="shipping-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã trả hàng</th>
                    <th>Mã đơn gốc</th>
                    <th>Khách hàng</th>
                    <th>Lý do</th>
                    <th>Ngày yêu cầu</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">TH001</td>
                    <td>VC001</td>
                    <td>Công ty ABC</td>
                    <td>Hỏng hóc</td>
                    <td>16/12/2024</td>
                    <td>
                      <span className="shipping-status yellow">Đang xử lý</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">TH002</td>
                    <td>VC003</td>
                    <td>Công ty XYZ</td>
                    <td>Giao sai</td>
                    <td>15/12/2024</td>
                    <td>
                      <span className="shipping-status green">Hoàn thành</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="shipping" className="module-content">
      <div className="shipping-header">
        <h2 className={`shipping-title ${isDarkMode ? "dark" : ""}`}>
          Quản lý vận chuyển
        </h2>
        <p className={`shipping-subtitle ${isDarkMode ? "dark" : ""}`}>
          Quản lý logistics và giao hàng
        </p>
      </div>

      <div className={`shipping-tabs ${isDarkMode ? "dark" : ""}`}>
        <div className={`shipping-tab-nav ${isDarkMode ? "dark" : ""}`}>
          <nav className="shipping-tab-list">
            <button
              className={`shipping-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Tổng quan
            </button>
            <button
              className={`shipping-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "orders" ? "active" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Đơn hàng
            </button>
            <button
              className={`shipping-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "tracking" ? "active" : ""
              }`}
              onClick={() => setActiveTab("tracking")}
            >
              Theo dõi
            </button>
            <button
              className={`shipping-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "delivery" ? "active" : ""
              }`}
              onClick={() => setActiveTab("delivery")}
            >
              Lịch giao
            </button>
            <button
              className={`shipping-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "returns" ? "active" : ""
              }`}
              onClick={() => setActiveTab("returns")}
            >
              Trả hàng
            </button>
          </nav>
        </div>

        <div className="shipping-tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Shipping;
