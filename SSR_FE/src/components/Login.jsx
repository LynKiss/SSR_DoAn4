import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-icon">
            <FontAwesomeIcon icon={faIndustry} />
          </div>
          <h1 className="login-title">Hệ thống ERP</h1>
          <p className="login-subtitle">Quản lý doanh nghiệp thông minh</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>

        <div className="login-footer">
          <p>Demo: admin/admin hoặc user/user</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
