import useTheme from "../../hooks/useTheme";
import "./System.css";

const System = () => {
  const { isDarkMode } = useTheme();

  return (
    <div id="system" className="module-content">
      <div className="system-header">
        <h2 className={`system-title ${isDarkMode ? "dark" : ""}`}>
          Quản trị hệ thống
        </h2>
        <p className={`system-subtitle ${isDarkMode ? "dark" : ""}`}>
          Cấu hình và quản lý hệ thống
        </p>
      </div>
      <div className={`system-card ${isDarkMode ? "dark" : ""}`}>
        <h3 className={`system-card-title ${isDarkMode ? "dark" : ""}`}>
          Cài đặt hệ thống
        </h3>
        <p className={`system-card-text ${isDarkMode ? "dark" : ""}`}>
          Chức năng đang được phát triển...
        </p>
      </div>
    </div>
  );
};

export default System;
