import { useState } from "react";
import useTheme from "../hooks/useTheme";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import Dashboard from "./modules/Dashboard";
import Production from "./modules/Production";
import Warehouse from "./modules/Warehouse";
import Shipping from "./modules/Shipping";
import Sales from "./modules/Sales";
import Finance from "./modules/Finance";
import HR from "./modules/HR";
import System from "./modules/System";

const MainApp = ({ currentUser, onLogout }) => {
  const { isDarkMode } = useTheme();
  const [currentModule, setCurrentModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const renderModule = () => {
    switch (currentModule) {
      case "dashboard":
        return <Dashboard />;
      case "production":
        return <Production />;
      case "warehouse":
        return <Warehouse />;
      case "shipping":
        return <Shipping />;
      case "sales":
        return <Sales />;
      case "finance":
        return <Finance />;
      case "hr":
        return <HR />;
      case "system":
        return <System />;
      default:
        return <Dashboard />;
    }
  };

  const getModuleTitle = (moduleId) => {
    const titles = {
      dashboard: "Dashboard - Tổng quan hệ thống",
      production: "Quản trị sản xuất",
      warehouse: "Quản lý kho",
      shipping: "Quản lý vận chuyển",
      sales: "Quản lý bán hàng",
      finance: "Tài chính - Kế toán",
      hr: "Quản lý nhân sự",
      system: "Hệ thống",
    };
    return titles[moduleId] || "Dashboard";
  };

  return (
    <div className={`main-app ${isDarkMode ? "dark" : ""}`}>
      <Header
        currentUser={currentUser}
        onLogout={onLogout}
        toggleSidebar={toggleSidebar}
      />

      <div className="app-layout">
        <Sidebar
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          sidebarOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <main className="main-content">
          <div className="content-wrapper">
            <div className="content-header">
              <h1 className="content-title">{getModuleTitle(currentModule)}</h1>
              <p className="content-subtitle">
                {currentModule === "dashboard"
                  ? "Xem tổng quan hệ thống và các chỉ số quan trọng"
                  : "Quản lý và theo dõi hoạt động"}
              </p>
            </div>

            <div className="content-body">
              <div
                className={`module-content ${currentModule ? "active" : ""}`}
              >
                {renderModule()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainApp;
