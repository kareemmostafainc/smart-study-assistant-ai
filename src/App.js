// ======================================================
// Smart Study Assistant (AI Web App)
// Main Application Component
// ======================================================

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import QuizPage from "./pages/QuizPage";
import NotesPage from "./pages/NotesPage";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles.css";
import { ThemeProvider } from "./theme";

// ======================================================
// Main Application Component
// ======================================================
function App() {
  const [theme, setTheme] = useState("light");

  // ------------------------------------------------------
  // Load Theme Preference from Local Storage
  // ------------------------------------------------------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // ------------------------------------------------------
  // Toggle Between Light and Dark Modes
  // ------------------------------------------------------
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // ------------------------------------------------------
  // Application Rendering
  // ------------------------------------------------------
  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <Router>
        <div className={`app-container ${theme}`}>
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <div className="page-container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

// ======================================================
// Export Component
// ======================================================
export default App;
