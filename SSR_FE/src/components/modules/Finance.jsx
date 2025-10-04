import useTheme from "../../hooks/useTheme";
import "./Finance.css";

const Finance = () => {
  const { isDarkMode } = useTheme();

  return (
    <div id="finance" className="module-content">
      <div className="finance-header">
        <h2 className={`finance-title ${isDarkMode ? "dark" : ""}`}>
          Tài chính - Kế toán
        </h2>
        <p className={`finance-subtitle ${isDarkMode ? "dark" : ""}`}>
          Quản lý tài chính và báo cáo kế toán
        </p>
      </div>
      <div className={`finance-card ${isDarkMode ? "dark" : ""}`}>
        <h3 className={`finance-card-title ${isDarkMode ? "dark" : ""}`}>
          Báo cáo tài chính
        </h3>
        <p className={`finance-card-text ${isDarkMode ? "dark" : ""}`}>
          Chức năng đang được phát triển...
        </p>
      </div>
    </div>
  );
};

export default Finance;
