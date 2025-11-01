// ======================================================
// Smart Study Assistant (AI Web App)
// Register Page
// Author: Kareem Mostafa
// ======================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

// ======================================================
// 1. Register Component
// ======================================================

const Register = () => {
  // --------------------------
  // Local State
  // --------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ======================================================
  // 2. Validate Input
  // ======================================================
  const validateInputs = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError("");
    return true;
  };

  // ======================================================
  // 3. Handle Registration Submission
  // ======================================================
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      // --------------------------
      // Real Implementation Example:
      // --------------------------
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, password }),
      // });
      // const data = await response.json();
      //
      // if (data.success) {
      //   navigate("/login");
      // } else {
      //   setError(data.message || "Registration failed.");
      // }

      // --------------------------
      // Mocked Preview Response
      // --------------------------
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email === "student@example.com") {
        setError("This email is already registered.");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================================
  // 4. Render UI
  // ======================================================
  return (
    <div className="container fade-in" style={{ maxWidth: "440px" }}>
      <h1>Create Account</h1>
      <p>Join Smart Study Assistant and start learning smarter today.</p>

      <form onSubmit={handleRegister} style={{ marginTop: "2rem" }}>
        {/* ====================================================== */}
        {/* Name Field */}
        {/* ====================================================== */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            style={{ width: "100%", padding: "0.8rem", borderRadius: "var(--radius)" }}
          />
        </div>

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
            autoComplete="new-password"
            style={{ width: "100%", padding: "0.8rem", borderRadius: "var(--radius)" }}
          />
        </div>

        {/* ====================================================== */}
        {/* Confirm Password Field */}
        {/* ====================================================== */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            autoComplete="new-password"
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
          {isLoading ? "Creating account..." : "Register"}
        </button>
      </form>

      {/* ====================================================== */}
      {/* Redirect Section */}
      {/* ====================================================== */}
      <p style={{ marginTop: "1.5rem" }}>
        Already have an account?{" "}
        <span
          style={{ color: "var(--color-primary)", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

// ======================================================
// Export Component
// ======================================================
export default Register;
