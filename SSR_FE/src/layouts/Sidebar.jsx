import useTheme from "../hooks/useTheme";

const Sidebar = ({
  currentModule,
  setCurrentModule,
  sidebarOpen,
  closeSidebar,
}) => {
  const { isDarkMode } = useTheme();

  const menuItems = [
    { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { id: "production", icon: "fas fa-cogs", label: "Quản trị sản xuất" },
    { id: "warehouse", icon: "fas fa-warehouse", label: "Quản lý kho" },
    { id: "shipping", icon: "fas fa-truck", label: "Quản lý vận chuyển" },
    { id: "sales", icon: "fas fa-chart-line", label: "Quản lý bán hàng" },
    { id: "finance", icon: "fas fa-dollar-sign", label: "Tài chính - Kế toán" },
    { id: "hr", icon: "fas fa-users", label: "Quản lý nhân sự" },
    { id: "system", icon: "fas fa-cog", label: "Hệ thống" },
  ];

  return (
    <>
      <aside
        className={`main-sidebar ${sidebarOpen ? "open" : ""} ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <div className="sidebar-header">
          <h3 className="sidebar-title">ERP System</h3>
          <p className="sidebar-subtitle">Quản lý tổng thể</p>
        </div>

        <nav className="sidebar-menu">
          <ul className="sidebar-nav">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar-nav-item">
                <a
                  href="#"
                  className={`sidebar-nav-link ${
                    currentModule === item.id ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentModule(item.id);
                    if (closeSidebar) closeSidebar();
                  }}
                >
                  <i className={`${item.icon} sidebar-nav-icon`}></i>
                  <span className="sidebar-nav-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Quick Actions</div>
          <ul className="sidebar-nav">
            <li className="sidebar-nav-item">
              <a href="#" className="sidebar-nav-link">
                <i className="fas fa-plus sidebar-nav-icon"></i>
                <span className="sidebar-nav-text">Tạo mới</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <div className="sidebar-footer-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="sidebar-footer-text">
              <div className="footer-title">SSR ERP v1.0</div>
              <div className="footer-subtitle">Phiên bản hệ thống</div>
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>
    </>
  );
};

export default Sidebar;
