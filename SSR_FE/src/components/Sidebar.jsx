const Sidebar = ({ currentModule, setCurrentModule }) => {
  const menuItems = [
    { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { id: "production", icon: "fas fa-cogs", label: "Quản trị sản xuất" },
    { id: "warehouse", icon: "fas fa-warehouse", label: "Quản lý kho" },
    { id: "shipping", icon: "fas fa-truck", label: "Quản lý vận chuyển" },
    { id: "sales", icon: "fas fa-chart-line", label: "Quản lý bán hàng" },
    { id: "finance", icon: "fas fa-dollar-sign", label: "Tài chính - Kế toán" },
    { id: "hr", icon: "fas fa-users", label: "Quản lý nhân sự" },
    { id: "system", icon: "fas fa-cog", label: "Quản trị hệ thống" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen overflow-y-auto">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-item p-3 rounded-lg cursor-pointer transition duration-200 ${
                currentModule === item.id ? "bg-blue-50 text-blue-600" : ""
              }`}
              onClick={() => setCurrentModule(item.id)}
            >
              <i className={`${item.icon} mr-3`}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
