// ======================================================
// Smart Study Assistant (AI Web App)
// Navbar Component
// Author: Kareem Mostafa
// ======================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// ======================================================
// 1. Navbar Component
// ======================================================

const Navbar = () => {
  // --------------------------
  // Local State
  // --------------------------
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ======================================================
  // 2. Load User Status and Theme
  // ======================================================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // ======================================================
  // 3. Handle Theme Toggle
  // ======================================================
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // ======================================================
  // 4. Handle Logout
  // ======================================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // ======================================================
  // 5. Render UI
  // ======================================================
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "var(--color-bg-nav)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* ====================================================== */}
      {/* Left Section: Logo */}
      {/* ====================================================== */}
      <div
        style={{
          fontWeight: "700",
          fontSize: "1.25rem",
          cursor: "pointer",
          color: "var(--color-primary)",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Smart Study Assistant
      </div>

      {/* ====================================================== */}
      {/* Middle Section: Links */}
      {/* ====================================================== */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {isLoggedIn && (
          <>
            <span
              className="nav-link"
              onClick={() => navigate("/notes")}
            >
              Notes
            </span>
            <span
              className="nav-link"
              onClick={() => navigate("/quiz")}
            >
              Quizzes
            </span>
            <span
              className="nav-link"
              onClick={() => navigate("/chat")}
            >
              Chat
            </span>
            <span
              className="nav-link"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </span>
          </>
        )}
      </div>

      {/* ====================================================== */}
      {/* Right Section: Controls */}
      {/* ====================================================== */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        {/* Login / Logout Button */}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};

// ======================================================
// Export Component
// ======================================================
export default Navbar;
