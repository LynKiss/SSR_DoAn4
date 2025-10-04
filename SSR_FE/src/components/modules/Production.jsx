import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import "./Production.css";

const Production = () => {
  const { isDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState("plan");

  const renderTabContent = () => {
    switch (activeTab) {
      case "plan":
        return (
          <div className="production-tab-content">
            <div className="production-section-header">
              <h3 className="production-section-title">Kế hoạch sản xuất</h3>
              <button className="production-add-btn">
                <i className="fas fa-plus"></i>Lập kế hoạch mới
              </button>
            </div>

            <div className="production-grid">
              <div className={`production-card ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-card-title">
                  Kế hoạch tháng 12/2024
                </h4>
                <div className="production-card-content">
                  <div className="production-item">
                    <span>Tổng lệnh:</span>
                    <span className="font-medium">45 lệnh</span>
                  </div>
                  <div className="production-item">
                    <span>Hoàn thành:</span>
                    <span className="font-medium text-green-600">
                      32 lệnh (71%)
                    </span>
                  </div>
                  <div className="production-item">
                    <span>Đang thực hiện:</span>
                    <span className="font-medium text-orange-600">8 lệnh</span>
                  </div>
                  <div className="production-item">
                    <span>Chờ thực hiện:</span>
                    <span className="font-medium text-blue-600">5 lệnh</span>
                  </div>
                </div>
              </div>

              <div className={`production-card ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-card-title">Tiến độ theo dõi</h4>
                <div className="production-card-content">
                  <div className="production-progress">
                    <div className="production-progress-label">
                      <span>Sản phẩm A</span>
                      <span>85%</span>
                    </div>
                    <div className="production-progress-bar">
                      <div
                        className="production-progress-fill"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="production-progress">
                    <div className="production-progress-label">
                      <span>Sản phẩm B</span>
                      <span>60%</span>
                    </div>
                    <div className="production-progress-bar">
                      <div
                        className="production-progress-fill orange"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="production-progress">
                    <div className="production-progress-label">
                      <span>Sản phẩm C</span>
                      <span>95%</span>
                    </div>
                    <div className="production-progress-bar">
                      <div
                        className="production-progress-fill"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="production-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã kế hoạch</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">KH001</td>
                    <td>Sản phẩm A</td>
                    <td>1,000 cái</td>
                    <td>01/12/2024</td>
                    <td>25/12/2024</td>
                    <td>
                      <span className="production-status green">
                        Đang thực hiện
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "parameters":
        return (
          <div className="production-tab-content">
            <div className="production-section-header">
              <h3 className="production-section-title">Thông số sản xuất</h3>
              <button className="production-add-btn">
                <i className="fas fa-plus"></i>Thêm thông số
              </button>
            </div>

            <div className="production-grid">
              <div className={`production-card ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-card-title">Thông số kỹ thuật</h4>
                <div className="production-card-content">
                  <div className="production-item">
                    <span>Nhiệt độ sản xuất:</span>
                    <span className="font-medium">180°C - 220°C</span>
                  </div>
                  <div className="production-item">
                    <span>Áp suất:</span>
                    <span className="font-medium">15-20 bar</span>
                  </div>
                  <div className="production-item">
                    <span>Tốc độ máy:</span>
                    <span className="font-medium">1200 rpm</span>
                  </div>
                  <div className="production-item">
                    <span>Thời gian chu kỳ:</span>
                    <span className="font-medium">45 giây</span>
                  </div>
                </div>
              </div>

              <div className={`production-card ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-card-title">Định mức nguyên liệu</h4>
                <div className="production-card-content">
                  <div className="production-item">
                    <span>Nguyên liệu A:</span>
                    <span className="font-medium">2.5 kg/sản phẩm</span>
                  </div>
                  <div className="production-item">
                    <span>Nguyên liệu B:</span>
                    <span className="font-medium">1.2 kg/sản phẩm</span>
                  </div>
                  <div className="production-item">
                    <span>Phụ gia C:</span>
                    <span className="font-medium">0.3 kg/sản phẩm</span>
                  </div>
                  <div className="production-item">
                    <span>Bao bì:</span>
                    <span className="font-medium">1 cái/sản phẩm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="production-tab-content">
            <div className="production-section-header">
              <h3 className="production-section-title">
                Lệnh sản xuất - Kanban
              </h3>
              <div className="flex space-x-2">
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                  <i className="fas fa-list mr-2"></i>Chế độ danh sách
                </button>
                <button className="production-add-btn">
                  <i className="fas fa-plus"></i>Tạo lệnh mới
                </button>
              </div>
            </div>

            <div className="production-kanban">
              <div className={`production-column ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-column-title">
                  <span className="blue"></span>
                  Tạo mới (5)
                </h4>
                <div className="space-y-3">
                  <div
                    className={`production-kanban-card blue ${
                      isDarkMode ? "dark" : ""
                    }`}
                  >
                    <p className="production-kanban-card-title">LSX001</p>
                    <p className="production-kanban-card-desc">
                      Sản phẩm A - 1000 cái
                    </p>
                    <p className="production-kanban-card-date">
                      Hạn: 25/12/2024
                    </p>
                    <div className="production-kanban-actions">
                      <button className="production-kanban-btn blue">
                        Bắt đầu
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`production-column ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-column-title">
                  <span className="orange"></span>
                  Đang thực hiện (3)
                </h4>
                <div className="space-y-3">
                  <div
                    className={`production-kanban-card orange ${
                      isDarkMode ? "dark" : ""
                    }`}
                  >
                    <p className="production-kanban-card-title">LSX003</p>
                    <p className="production-kanban-card-desc">
                      Sản phẩm C - 800 cái
                    </p>
                    <p className="production-kanban-card-date">Tiến độ: 65%</p>
                    <div className="production-kanban-progress">
                      <div className="production-kanban-progress-bar">
                        <div
                          className="production-kanban-progress-fill"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`production-column ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-column-title">
                  <span className="yellow"></span>
                  Kiểm tra QC (2)
                </h4>
                <div className="space-y-3">
                  <div
                    className={`production-kanban-card yellow ${
                      isDarkMode ? "dark" : ""
                    }`}
                  >
                    <p className="production-kanban-card-title">LSX004</p>
                    <p className="production-kanban-card-desc">
                      Sản phẩm D - 300 cái
                    </p>
                    <p className="production-kanban-card-date">
                      QC: Đang kiểm tra
                    </p>
                    <div className="production-kanban-actions">
                      <button className="production-kanban-btn green">
                        Duyệt
                      </button>
                      <button className="production-kanban-btn red">
                        Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`production-column ${isDarkMode ? "dark" : ""}`}>
                <h4 className="production-column-title">
                  <span className="green"></span>
                  Hoàn thành (12)
                </h4>
                <div className="space-y-3">
                  <div
                    className={`production-kanban-card green ${
                      isDarkMode ? "dark" : ""
                    }`}
                  >
                    <p className="production-kanban-card-title">LSX005</p>
                    <p className="production-kanban-card-desc">
                      Sản phẩm E - 1200 cái
                    </p>
                    <p className="production-kanban-card-date">
                      Hoàn thành: 20/12/2024
                    </p>
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        ✓ Đã xuất kho
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "resources":
        return (
          <div className="production-tab-content">
            <div className="production-resource-grid">
              <div
                className={`production-resource-card ${
                  isDarkMode ? "dark" : ""
                }`}
              >
                <h4 className="production-resource-title">
                  <i className="fas fa-users text-blue-500"></i>
                  Nhân sự sản xuất
                </h4>
                <div className="production-card-content">
                  <div className="production-machine-status">
                    <span>Ca sáng (6h-14h)</span>
                    <span className="font-medium">25/30 người</span>
                  </div>
                  <div className="production-machine-status">
                    <span>Ca chiều (14h-22h)</span>
                    <span className="font-medium">28/30 người</span>
                  </div>
                  <div className="production-machine-status">
                    <span>Ca đêm (22h-6h)</span>
                    <span className="font-medium">20/25 người</span>
                  </div>
                </div>
              </div>

              <div
                className={`production-resource-card ${
                  isDarkMode ? "dark" : ""
                }`}
              >
                <h4 className="production-resource-title">
                  <i className="fas fa-cogs text-green-500"></i>
                  Máy móc thiết bị
                </h4>
                <div className="production-card-content">
                  <div className="production-machine-status">
                    <span>Máy ép A1</span>
                    <span className="green">Hoạt động</span>
                  </div>
                  <div className="production-machine-status">
                    <span>Máy cắt B2</span>
                    <span className="red">Bảo trì</span>
                  </div>
                  <div className="production-machine-status">
                    <span>Máy đóng gói C3</span>
                    <span className="green">Hoạt động</span>
                  </div>
                </div>
              </div>

              <div
                className={`production-resource-card ${
                  isDarkMode ? "dark" : ""
                }`}
              >
                <h4 className="production-resource-title">
                  <i className="fas fa-clock text-purple-500"></i>
                  Ca làm việc
                </h4>
                <div className="production-card-content">
                  <div
                    className={`production-shift blue ${
                      isDarkMode ? "dark" : ""
                    }`}
                  >
                    <p className="production-shift-title">
                      Ca 1: 06:00 - 14:00
                    </p>
                    <p className="production-shift-desc">Sản xuất chính</p>
                  </div>
                  <div
                    className={`production-shift orange ${
                      isDarkMode ? "dark" : ""
                    }`}
                  >
                    <p className="production-shift-title">
                      Ca 2: 14:00 - 22:00
                    </p>
                    <p className="production-shift-desc">Sản xuất chính</p>
                  </div>
                  <div
                    className={`production-shift purple ${
                      isDarkMode ? "dark" : ""
                    }`}
                  >
                    <p className="production-shift-title">
                      Ca 3: 22:00 - 06:00
                    </p>
                    <p className="production-shift-desc">Bảo trì & làm sạch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "bom":
        return (
          <div className="production-tab-content">
            <div className="production-section-header">
              <h3 className="production-section-title">
                Danh mục sản phẩm & BOM
              </h3>
              <button className="production-add-btn">
                <i className="fas fa-plus"></i>Thêm sản phẩm
              </button>
            </div>

            <div className="production-bom-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã SP</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn vị</th>
                    <th>Thời gian SX</th>
                    <th>BOM</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">SP001</td>
                    <td>Sản phẩm A</td>
                    <td>Cái</td>
                    <td>45 phút</td>
                    <td>
                      <button className="production-bom-btn blue">
                        Xem BOM
                      </button>
                    </td>
                    <td>
                      <button className="production-bom-btn green">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="production-bom-btn blue">
                        <i className="fas fa-eye"></i>
                      </button>
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
    <div id="production" className="module-content">
      <div className="production-header">
        <h2 className={`production-title ${isDarkMode ? "dark" : ""}`}>
          Quản trị sản xuất
        </h2>
        <p className={`production-subtitle ${isDarkMode ? "dark" : ""}`}>
          Quản lý toàn bộ quy trình sản xuất
        </p>
      </div>

      <div className={`production-tabs ${isDarkMode ? "dark" : ""}`}>
        <div className={`production-tab-nav ${isDarkMode ? "dark" : ""}`}>
          <nav className="production-tab-list">
            <button
              className={`production-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "plan" ? "active" : ""
              }`}
              onClick={() => setActiveTab("plan")}
            >
              Kế hoạch sản xuất
            </button>
            <button
              className={`production-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "parameters" ? "active" : ""
              }`}
              onClick={() => setActiveTab("parameters")}
            >
              Thông số sản xuất
            </button>
            <button
              className={`production-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "orders" ? "active" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Lệnh sản xuất
            </button>
            <button
              className={`production-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "resources" ? "active" : ""
              }`}
              onClick={() => setActiveTab("resources")}
            >
              Nguồn lực
            </button>
            <button
              className={`production-tab ${isDarkMode ? "dark" : ""} ${
                activeTab === "bom" ? "active" : ""
              }`}
              onClick={() => setActiveTab("bom")}
            >
              BOM / Định mức
            </button>
          </nav>
        </div>

        <div className="production-tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Production;
