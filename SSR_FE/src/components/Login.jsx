import { useState } from "react";
import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (username === "admin" && password === "admin") ||
      (username === "user" && password === "user")
    ) {
      onLogin(username);
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div
      id="loginScreen"
      className="min-h-screen flex items-center justify-center gradient-bg"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <i className="fas fa-industry text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Hệ thống ERP</h1>
          <p className="text-gray-600">Quản lý doanh nghiệp thông minh</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full gradient-bg text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo: admin/admin hoặc user/user</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
