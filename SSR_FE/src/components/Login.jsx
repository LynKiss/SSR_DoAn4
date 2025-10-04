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
    <div id="loginScreen" className="login-screen">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <FontAwesomeIcon icon={faIndustry} />
          </div>
          <h1 className="login-title">Hệ thống ERP</h1>
          <p className="login-subtitle">Quản lý doanh nghiệp thông minh</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Đăng nhập
          </button>
        </form>

        <div className="demo-accounts">
          <p>
            <strong>Tài khoản demo:</strong>
          </p>
          <p>admin / admin (Quản trị viên)</p>
          <p>user / user (Người dùng)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
