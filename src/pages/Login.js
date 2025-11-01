// ======================================================
// Smart Study Assistant (AI Web App)
// Login Page
// Author: Kareem Mostafa
// ======================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// ======================================================
// 1. Login Component
// ======================================================

const Login = () => {
  // --------------------------
  // Local State
  // --------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ======================================================
  // 2. Validate Input
  // ======================================================
  const validateInputs = () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError("");
    return true;
  };

  // ======================================================
  // 3. Handle Login Submission
  // ======================================================
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      // --------------------------
      // Real Implementation Example:
      // --------------------------
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      //
      // if (data.success) {
      //   localStorage.setItem("token", data.token);
      //   navigate("/dashboard");
      // } else {
      //   setError(data.message || "Invalid credentials.");
      // }

      // --------------------------
      // Mocked Preview Response
      // --------------------------
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (email === "student@example.com" && password === "password123") {
        localStorage.setItem("token", "mock-jwt-token-123");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Server connection error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================================
  // 4. Render UI
  // ======================================================
  return (
    <div className="container fade-in" style={{ maxWidth: "420px" }}>
      <h1>Login</h1>
      <p>Welcome back! Please enter your credentials to continue.</p>

      <form onSubmit={handleLogin} style={{ marginTop: "2rem" }}>
        {/* ====================================================== */}
        {/* Email Field */}
        {/* ====================================================== */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            style={{ width: "100%", padding: "0.8rem", borderRadius: "var(--radius)" }}
          />
        </div>

        {/* ====================================================== */}
        {/* Password Field */}
        {/* ====================================================== */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            style={{ width: "100%", padding: "0.8rem", borderRadius: "var(--radius)" }}
          />
        </div>

        {/* ====================================================== */}
        {/* Error Message */}
        {/* ====================================================== */}
        {error && (
          <p style={{ color: "red", marginBottom: "1rem", fontWeight: "500" }}>
            {error}
          </p>
        )}

        {/* ====================================================== */}
        {/* Submit Button */}
        {/* ====================================================== */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "0.9rem",
            fontWeight: "600",
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* ====================================================== */}
      {/* Redirect Section */}
      {/* ====================================================== */}
      <p style={{ marginTop: "1.5rem" }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "var(--color-primary)", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
};

// ======================================================
// Export Component
// ======================================================
export default Login;
