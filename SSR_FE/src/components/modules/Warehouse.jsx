import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import "./Warehouse.css";

const Warehouse = () => {
  const { isDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState("overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="warehouse-tab-content">
            <div className="warehouse-stats-grid">
              <div className="warehouse-stat-card green">
                <div className="warehouse-stat-content">
                  <div>
                    <p className="warehouse-stat-label">Tổng sản phẩm</p>
                    <p className="warehouse-stat-value">1,247</p>
                  </div>
                  <i className="fas fa-boxes warehouse-stat-icon"></i>
                </div>
              </div>

              <div className="warehouse-stat-card blue">
                <div className="warehouse-stat-content">
                  <div>
                    <p className="warehouse-stat-label">Tồn kho</p>
                    <p className="warehouse-stat-value">85%</p>
                  </div>
                  <i className="fas fa-warehouse warehouse-stat-icon"></i>
                </div>
              </div>

              <div className="warehouse-stat-card orange">
                <div className="warehouse-stat-content">
                  <div>
                    <p className="warehouse-stat-label">Sắp hết hàng</p>
                    <p className="warehouse-stat-value">12</p>
                  </div>
                  <i className="fas fa-exclamation-triangle warehouse-stat-icon"></i>
                </div>
              </div>
            </div>

            <div className="warehouse-overview-grid">
              <div className={`warehouse-card ${isDarkMode ? "dark" : ""}`}>
                <h3
                  className={`warehouse-card-title ${isDarkMode ? "dark" : ""}`}
                >
                  Tình trạng kho
                </h3>
                <div className="warehouse-card-content">
                  <div className="warehouse-status-item">
                    <span>Kho chính</span>
                    <span className="warehouse-status green">Bình thường</span>
                  </div>
                  <div className="warehouse-status-item">
                    <span>Kho phụ</span>
                    <span className="warehouse-status yellow">
                      Cần kiểm tra
                    </span>
                  </div>
                  <div className="warehouse-status-item">
                    <span>Kho nguyên liệu</span>
                    <span className="warehouse-status green">Bình thường</span>
                  </div>
                </div>
              </div>

              <div className={`warehouse-card ${isDarkMode ? "dark" : ""}`}>
                <h3
                  className={`warehouse-card-title ${isDarkMode ? "dark" : ""}`}
                >
                  Cảnh báo tồn kho
                </h3>
                <div className="warehouse-alerts">
                  <div className="warehouse-alert red">
                    <div className="warehouse-alert-dot red"></div>
                    <div className="warehouse-alert-content">
                      <p className="warehouse-alert-title red">Nguyên liệu A</p>
                      <p className="warehouse-alert-text red">
                        Còn 5 kg, dưới mức tối thiểu
                      </p>
                    </div>
                  </div>
                  <div className="warehouse-alert orange">
                    <div className="warehouse-alert-dot orange"></div>
                    <div className="warehouse-alert-content">
                      <p className="warehouse-alert-title orange">Sản phẩm B</p>
                      <p className="warehouse-alert-text orange">
                        Còn 25 cái, sắp hết
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "inbound":
        return (
          <div className="warehouse-tab-content">
            <div className="warehouse-section-header">
              <h3 className="warehouse-section-title">Nhập kho</h3>
              <button className="warehouse-add-btn">
                <i className="fas fa-plus"></i>Tạo phiếu nhập
              </button>
            </div>

            <div className="warehouse-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã phiếu</th>
                    <th>Ngày nhập</th>
                    <th>Nhà cung cấp</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">PN001</td>
                    <td>15/12/2024</td>
                    <td>Công ty ABC</td>
                    <td>Nguyên liệu A</td>
                    <td>500 kg</td>
                    <td>
                      <span className="warehouse-status green">Hoàn thành</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">PN002</td>
                    <td>16/12/2024</td>
                    <td>Công ty XYZ</td>
                    <td>Sản phẩm B</td>
                    <td>200 cái</td>
                    <td>
                      <span className="warehouse-status blue">Đang xử lý</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "outbound":
        return (
          <div className="warehouse-tab-content">
            <div className="warehouse-section-header">
              <h3 className="warehouse-section-title">Xuất kho</h3>
              <button className="warehouse-add-btn">
                <i className="fas fa-plus"></i>Tạo phiếu xuất
              </button>
            </div>

            <div className="warehouse-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã phiếu</th>
                    <th>Ngày xuất</th>
                    <th>Khách hàng</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">PX001</td>
                    <td>14/12/2024</td>
                    <td>Khách hàng A</td>
                    <td>Sản phẩm A</td>
                    <td>100 cái</td>
                    <td>
                      <span className="warehouse-status green">Hoàn thành</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">PX002</td>
                    <td>16/12/2024</td>
                    <td>Khách hàng B</td>
                    <td>Sản phẩm B</td>
                    <td>50 cái</td>
                    <td>
                      <span className="warehouse-status blue">Đang xử lý</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "areas":
        return (
          <div className="warehouse-tab-content">
            <div className="warehouse-section-header">
              <h3 className="warehouse-section-title">Quản lý khu vực kho</h3>
              <button className="warehouse-add-btn">
                <i className="fas fa-plus"></i>Thêm khu vực
              </button>
            </div>

            <div className="warehouse-areas-grid">
              <div
                className={`warehouse-area-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="warehouse-area-title">
                  <i className="fas fa-map-marker-alt"></i>
                  Khu vực A1
                </h4>
                <div className="warehouse-area-content">
                  <div className="warehouse-area-item">
                    <span>Diện tích:</span>
                    <span className="font-medium">100 m²</span>
                  </div>
                  <div className="warehouse-area-item">
                    <span>Sức chứa:</span>
                    <span className="font-medium">500 pallet</span>
                  </div>
                  <div className="warehouse-area-item">
                    <span>Tỷ lệ sửspan dụng:</span>
                    <span className="font-medium text-green-600">85%</span>
                  </div>
                </div>
              </div>

              <div
                className={`warehouse-area-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="warehouse-area-title">
                  <i className="fas fa-map-marker-alt"></i>
                  Khu vực B2
                </h4>
                <div className="warehouse-area-content">
                  <div className="warehouse-area-item">
                    <span>Diện tích:</span>
                    <span className="font-medium">80 m²</span>
                  </div>
                  <div className="warehouse-area-item">
                    <span>Sức chứa:</span>
                    <span className="font-medium">400 pallet</span>
                  </div>
                  <div className="warehouse-area-item">
                    <span>Tỷ lệ sửspan dụng:</span>
                    <span className="font-medium text-orange-600">65%</span>
                  </div>
                </div>
              </div>

              <div
                className={`warehouse-area-card ${isDarkMode ? "dark" : ""}`}
              >
                <h4 className="warehouse-area-title">
                  <i className="fas fa-map-marker-alt"></i>
                  Khu vực C3
                </h4>
                <div className="warehouse-area-content">
                  <div className="warehouse-area-item">
                    <span>Diện tích:</span>
                    <span className="font-medium">120 m²</span>
                  </div>
                  <div className="warehouse-area-item">
                    <span>Sức chứa:</span>
                    <span className="font-medium">600 pallet</span>
                  </div>
                  <div className="warehouse-area-item">
                    <span>Tỷ lệ sửspan dụng:</span>
                    <span className="font-medium text-red-600">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="warehouse-tab-content">
            <div className="warehouse-section-header">
              <h3 className="warehouse-section-title">Danh mục sản phẩm</h3>
              <button className="warehouse-add-btn">
                <i className="fas fa-plus"></i>Thêm sản phẩm
              </button>
            </div>

            <div className="warehouse-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã SP</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại</th>
                    <th>Tồn kho</th>
                    <th>Đơn vị</th>
                    <th>Vị trí</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">SP001</td>
                    <td>Sản phẩm A</td>
                    <td>Thành phẩm</td>
                    <td>1,200</td>
                    <td>Cái</td>
                    <td>A1-01</td>
                    <td>
                      <button className="warehouse-action-btn green">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="warehouse-action-btn blue">
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">NL001</td>
                    <td>Nguyên liệu A</td>
                    <td>Nguyên liệu</td>
                    <td>450</td>
                    <td>Kg</td>
                    <td>B2-05</td>
                    <td>
                      <button className="warehouse-action-btn green">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="warehouse-action-btn blue">
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "conditions":
        return (
          <div className="warehouse-tab-content">
            <div className="warehouse-conditions-grid">
              <div
                className={`warehouse-condition-card ${
                  isDarkMode ? "dark" : ""
                }`}
              >
                <h4 className="warehouse-condition-title">
                  <i className="fas fa-thermometer-half"></i>
                  Điều kiện bảo quản
                </h4>
                <div className="warehouse-condition-content">
                  <div className="warehouse-condition-item">
                    <span>Nhiệt độ:</span>
                    <span className="font-medium">15°C - 25°C</span>
                  </div>
                  <div className="warehouse-condition-item">
                    <span>Độ ẩm:</span>
                    <span className="font-medium">40% - 60%</span>
                  </div>
                  <div className="warehouse-condition-item">
                    <span>Ánh sáng:</span>
                    <span className="font-medium">
                      Tránh ánh nắng trực tiếp
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`warehouse-condition-card ${
                  isDarkMode ? "dark" : ""
                }`}
              >
                <h4 className="warehouse-condition-title">
                  <i className="fas fa-clock"></i>
                  Hạn sử dụng
                </h4>
                <div className="warehouse-condition-content">
                  <div className="warehouse-condition-item">
                    <span>Sản phẩm A:</span>
                    <span className="font-medium">12 tháng</span>
                  </div>
                  <div className="warehouse-condition-item">
                    <span>Nguyên liệu A:</span>
                    <span className="font-medium">6 tháng</span>
                  </div>
                  <div className="warehouse-condition-item">
                    <span>Phụ gia B:</span>
                    <span className="font-medium">18 tháng</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="warehouse-expiry-section">
              <h4 className="warehouse-expiry-title">Cảnh báo hạn sử dụng</h4>
              <div className="warehouse-expiry-alerts">
                <div className="warehouse-expiry-alert red">
                  <div className="warehouse-expiry-alert-content">
                    <div className="warehouse-expiry-alert-dot red"></div>
                    <div>
                      <p className="warehouse-expiry-alert-title red">
                        Nguyên liệu A - Lô 001
                      </p>
                      <p className="warehouse-expiry-alert-text red">
                        Hết hạn: 15/01/2025 (30 ngày nữa)
                      </p>
                    </div>
                  </div>
                  <button className="warehouse-expiry-alert-btn red">
                    <i className="fas fa-exclamation-triangle"></i>
                  </button>
                </div>
                <div className="warehouse-expiry-alert orange">
                  <div className="warehouse-expiry-alert-content">
                    <div className="warehouse-expiry-alert-dot orange"></div>
                    <div>
                      <p className="warehouse-expiry-alert-title orange">
                        Sản phẩm B - Lô 002
                      </p>
                      <p className="warehouse-expiry-alert-text orange">
                        Hết hạn: 20/02/2025 (75 ngày nữa)
                      </p>
                    </div>
                  </div>
                  <button className="warehouse-expiry-alert-btn orange">
                    <i className="fas fa-clock"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="warehouse" className="module-content">
      <div className="warehouse-header">
        <h2 className={`warehouse-title ${isDarkMode ? "dark" : ""}`}>
          Quản lý kho
        </h2>
        <p className={`warehouse-subtitle ${isDarkMode ? "dark" : ""}`}>
          Quản lý tồn kho và logistics
        </p>
      </div>

      <div className={`warehouse-tabs ${isDarkMode ? "dark" : ""}`}>
        <div className={`warehouse-tab-nav ${isDarkMode ? "dark" : ""}`}>
          <nav className="warehouse-tab-list">
            <button
              className={`warehouse-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Tổng quan
            </button>
            <button
              className={`warehouse-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "inbound" ? "active" : ""
              }`}
              onClick={() => setActiveTab("inbound")}
            >
              Nhập kho
            </button>
            <button
              className={`warehouse-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "outbound" ? "active" : ""
              }`}
              onClick={() => setActiveTab("outbound")}
            >
              Xuất kho
            </button>
            <button
              className={`warehouse-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "areas" ? "active" : ""
              }`}
              onClick={() => setActiveTab("areas")}
            >
              Khu vực
            </button>
            <button
              className={`warehouse-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "products" ? "active" : ""
              }`}
              onClick={() => setActiveTab("products")}
            >
              Sản phẩm
            </button>
            <button
              className={`warehouse-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "conditions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("conditions")}
            >
              Điều kiện
            </button>
          </nav>
        </div>

        <div className="warehouse-tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Warehouse;
