import { useState } from "react";
import useTheme from "../hooks/useTheme";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./modules/Dashboard";
import Production from "./modules/Production";
import Warehouse from "./modules/Warehouse";
import Shipping from "./modules/Shipping";
import Sales from "./modules/Sales";
import Finance from "./modules/Finance";
import HR from "./modules/HR";
import System from "./modules/System";
import "./MainApp.css";

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

  return (
    <div className={`main-app ${isDarkMode ? "dark" : ""}`}>
      <Header
        currentUser={currentUser}
        onLogout={onLogout}
        className={`main-header ${isDarkMode ? "dark" : ""}`}
        toggleSidebar={toggleSidebar}
      />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          className={`main-sidebar ${isDarkMode ? "dark" : ""}`}
          sidebarOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <main className={`main-content ${isDarkMode ? "dark" : ""}`}>
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default MainApp;
