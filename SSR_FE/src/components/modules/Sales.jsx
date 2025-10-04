import useTheme from "../../hooks/useTheme";
import "./Sales.css";

const Sales = () => {
  const { isDarkMode } = useTheme();

  return (
    <div id="sales" className="module-content">
      <div className="sales-header">
        <h2 className={`sales-title ${isDarkMode ? "dark" : ""}`}>
          Quản lý bán hàng
        </h2>
        <p className={`sales-subtitle ${isDarkMode ? "dark" : ""}`}>
          Quản lý đơn hàng và khách hàng
        </p>
      </div>
      <div className={`sales-card ${isDarkMode ? "dark" : ""}`}>
        <h3 className={`sales-card-title ${isDarkMode ? "dark" : ""}`}>
          Tình hình bán hàng
        </h3>
        <p className={`sales-card-text ${isDarkMode ? "dark" : ""}`}>
          Chức năng đang được phát triển...
        </p>
      </div>
    </div>
  );
};

export default Sales;
