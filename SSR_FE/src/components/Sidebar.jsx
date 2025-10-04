import useTheme from "../hooks/useTheme";
import "./Sidebar.css";

const Sidebar = ({ currentModule, setCurrentModule }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

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
    <aside className={`sidebar ${isDarkMode ? "dark" : ""}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item ${isDarkMode ? "dark" : ""} ${
                currentModule === item.id ? "active" : ""
              }`}
              onClick={() => setCurrentModule(item.id)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
