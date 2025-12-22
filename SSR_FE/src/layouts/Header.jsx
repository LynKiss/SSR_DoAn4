import useTheme from "../hooks/useTheme";

const Header = ({ currentUser, onLogout, className, toggleSidebar }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className={`main-header ${className || ""}`}>
      <div className="header-left">
        <button
          onClick={toggleSidebar}
          className="header-menu-toggle"
          title="Menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        <a href="/" className="header-logo">
          <i className="fas fa-industry"></i>
          <span>SSR ERP System</span>
        </a>
      </div>

      <div className="header-center">
        <div className="header-search">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>

      <div className="header-right">
        <button
          onClick={toggleDarkMode}
          className="header-theme-toggle"
          title={isDarkMode ? "Chế độ sáng" : "Chế độ tối"}
        >
          <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>

        <div className="header-user">
          <div className="user-avatar">
            {currentUser.charAt(0).toUpperCase()}
          </div>
          <span className="user-name">{currentUser}</span>
        </div>

        <button onClick={onLogout} className="header-logout">
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
