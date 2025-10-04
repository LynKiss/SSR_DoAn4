import useTheme from "../hooks/useTheme";
import "./Header.css";

const Header = ({ currentUser, onLogout, className }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header
      className={`${className} header main-header ${isDarkMode ? "dark" : ""}`}
    >
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">
            <i className="fas fa-industry"></i>
          </div>
          <h1 className={`header-title ${isDarkMode ? "dark" : ""}`}>
            Hệ thống ERP
          </h1>
        </div>

        <div className="header-right">
          <button
            onClick={toggleDarkMode}
            className={`theme-toggle ${isDarkMode ? "dark" : ""}`}
            title={
              isDarkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"
            }
          >
            <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          <div className="notification">
            <i className={`fas fa-bell ${isDarkMode ? "dark" : ""}`}></i>
            <span className="notification-badge">3</span>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <span
              className={`user-name ${isDarkMode ? "dark" : ""}`}
              id="currentUser"
            >
              {currentUser}
            </span>
            <button
              onClick={onLogout}
              className={`logout-btn ${isDarkMode ? "dark" : ""}`}
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
