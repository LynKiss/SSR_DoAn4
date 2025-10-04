import useTheme from "../../hooks/useTheme";
import "./HR.css";

const HR = () => {
  const { isDarkMode } = useTheme();

  return (
    <div id="hr" className="module-content">
      <div className="hr-header">
        <h2 className={`hr-title ${isDarkMode ? "dark" : ""}`}>
          Quản lý nhân sự
        </h2>
        <p className={`hr-subtitle ${isDarkMode ? "dark" : ""}`}>
          Quản lý nhân viên và nguồn nhân lực
        </p>
      </div>
      <div className={`hr-card ${isDarkMode ? "dark" : ""}`}>
        <h3 className={`hr-card-title ${isDarkMode ? "dark" : ""}`}>
          Quản lý nhân viên
        </h3>
        <p className={`hr-card-text ${isDarkMode ? "dark" : ""}`}>
          Chức năng đang được phát triển...
        </p>
      </div>
    </div>
  );
};

export default HR;
