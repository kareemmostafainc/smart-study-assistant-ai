// ======================================================
// Smart Study Assistant (AI Web App)
// Study Tracker Dashboard Page
// Author: Kareem Mostafa
// ======================================================

import React, { useEffect, useState } from "react";
import "../styles.css";

// ======================================================
// 1. Dashboard Component
// ======================================================

const Dashboard = () => {
  // --------------------------
  // Local State
  // --------------------------
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalQuizzes: 0,
    totalStudyTime: 0,
    averageScore: 0,
    lastSession: null,
  });

  // --------------------------
  // Fetch Stats (Simulated)
  // --------------------------
  useEffect(() => {
    // Normally fetched from backend API
    const fetchedData = {
      totalFiles: 8,
      totalQuizzes: 24,
      totalStudyTime: 540, // in minutes
      averageScore: 87,
      lastSession: "2025-10-31 18:20",
    };

    setStats(fetchedData);
  }, []);

  // --------------------------
  // Helper Functions
  // --------------------------
  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  // --------------------------
  // Dashboard Rendering
  // --------------------------
  return (
    <div className="container fade-in">
      <h1>Study Tracker Dashboard</h1>
      <p style={{ marginBottom: "2rem" }}>
        View your overall study performance, session history, and progress summary.
      </p>

      {/* ====================================================== */}
      {/* Stats Overview */}
      {/* ====================================================== */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <StatCard title="Total Files Studied" value={stats.totalFiles} />
        <StatCard title="Total Quizzes Taken" value={stats.totalQuizzes} />
        <StatCard
          title="Total Study Time"
          value={formatTime(stats.totalStudyTime)}
        />
        <StatCard
          title="Average Quiz Score"
          value={`${stats.averageScore}%`}
        />
      </div>

      {/* ====================================================== */}
      {/* Last Session Info */}
      {/* ====================================================== */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          backgroundColor: "rgba(37,99,235,0.05)",
        }}
      >
        <h2>Last Study Session</h2>
        <p>
          {stats.lastSession
            ? `Your last recorded session was on ${stats.lastSession}`
            : "No study sessions recorded yet."}
        </p>
      </div>
    </div>
  );
};

// ======================================================
// 2. Reusable Component: StatCard
// ======================================================

const StatCard = ({ title, value }) => {
  return (
    <div
      className="fade-in"
      style={{
        padding: "1.5rem",
        borderRadius: "var(--radius)",
        border: "1px solid var(--color-border)",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: "1.5rem", fontWeight: 600 }}>{value}</p>
    </div>
  );
};

// ======================================================
// Export Component
// ======================================================

export default Dashboard;
