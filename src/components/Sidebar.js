// ======================================================
// Smart Study Assistant (AI Web App)
// Sidebar Component
// Author: Kareem Mostafa
// ======================================================

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";

// ======================================================
// 1. Sidebar Component
// ======================================================

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ======================================================
  // 2. Navigation Links Configuration
  // ======================================================
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Notes", path: "/notes" },
    { name: "Quiz", path: "/quiz" },
    { name: "Chat", path: "/chat" },
  ];

  // ======================================================
  // 3. Determine Active Link
  // ======================================================
  const isActive = (path) => location.pathname === path;

  // ======================================================
  // 4. Render Sidebar
  // ======================================================
  return (
    <aside
      style={{
        width: "230px",
        height: "100vh",
        backgroundColor: "var(--color-bg-sidebar)",
        borderRight: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 1rem",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* ====================================================== */}
      {/* Logo Section */}
      {/* ====================================================== */}
      <div
        style={{
          fontWeight: "700",
          fontSize: "1.25rem",
          color: "var(--color-primary)",
          marginBottom: "2rem",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        SSA
      </div>

      {/* ====================================================== */}
      {/* Navigation Links */}
      {/* ====================================================== */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "var(--radius)",
              fontWeight: "500",
              cursor: "pointer",
              backgroundColor: isActive(item.path)
                ? "var(--color-primary)"
                : "transparent",
              color: isActive(item.path)
                ? "#ffffff"
                : "var(--color-text)",
              transition: "all 0.3s ease",
            }}
          >
            {item.name}
          </div>
        ))}
      </nav>

      {/* ====================================================== */}
      {/* Footer Section */}
      {/* ====================================================== */}
      <div
        style={{
          marginTop: "auto",
          fontSize: "0.85rem",
          color: "var(--color-text-secondary)",
          textAlign: "center",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "1rem",
        }}
      >
        Smart Study Assistant © {new Date().getFullYear()}
      </div>
    </aside>
  );
};

// ======================================================
// Export Component
// ======================================================
export default Sidebar;
