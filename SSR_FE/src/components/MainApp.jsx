import { useState } from "react";
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

const MainApp = ({ currentUser, onLogout }) => {
  const [currentModule, setCurrentModule] = useState("dashboard");

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
    <div>
      <Header currentUser={currentUser} onLogout={onLogout} />
      <div className="flex">
        <Sidebar
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
        />
        <main className="flex-1 p-6 overflow-y-auto">{renderModule()}</main>
      </div>
    </div>
  );
};

export default MainApp;
