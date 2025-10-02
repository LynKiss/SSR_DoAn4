import { useState } from "react";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("Admin");

  const handleLogin = (username, password) => {
    // Simple login logic
    if (
      (username === "admin" && password === "admin") ||
      (username === "user" && password === "user")
    ) {
      setIsLoggedIn(true);
      setCurrentUser(username === "admin" ? "Admin" : "User");
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <MainApp currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
