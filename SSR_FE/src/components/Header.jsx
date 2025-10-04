import useTheme from "../hooks/useTheme";
import "./Header.css";

const Header = ({ currentUser, onLogout, className, toggleSidebar }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <header className={`header ${className || ""}`}>
      <div className="header-content">
        <div className="header-left">
          <button id="sidebarToggle" className="sidebar-toggle" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="app-logo">
            <i className="fas fa-industry"></i>
          </div>
          <h1 className="app-title">Hệ thống ERP</h1>
        </div>

        <div className="header-right">
          <button onClick={toggleDarkMode} className="theme-toggle" title={isDarkMode ? "Sáng" : "Tối"}>
            <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
          </button>

          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>

          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <span className="user-name" id="currentUser">
              {currentUser}
            </span>
            <button onClick={onLogout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
