import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        onLogin(username);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-industry logo-icon"></i>
          </div>
          <h1 className="login-title">SSR ERP System</h1>
          <p className="login-subtitle">Đăng nhập để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Tên đăng nhập</label>
            <div className="form-input-wrapper">
              <i className="fas fa-user form-input-icon"></i>
              <input
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="form-input-wrapper">
              <i className="fas fa-lock form-input-icon"></i>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" className="checkbox" />
              <span className="checkbox-text">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="forgot-password">
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Chưa có tài khoản?{" "}
            <a href="#" className="footer-link">
              Đăng ký ngay
            </a>
          </p>
        </div>

        <div className="login-demo">
          <div className="demo-title">Tài khoản Demo</div>
          <div className="demo-credentials">
            <div className="demo-credential">
              <span className="label">Admin:</span>
              <span className="value">admin / admin</span>
            </div>
            <div className="demo-credential">
              <span className="label">User:</span>
              <span className="value">user / user</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
