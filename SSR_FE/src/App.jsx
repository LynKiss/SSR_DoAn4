import { useState } from "react";
import ThemeContext from "./contexts/ThemeContext";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("Admin");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username === "admin" ? "Admin" : "User");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeValue = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <MainApp currentUser={currentUser} onLogout={handleLogout} />
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
