// ======================================================
// Smart Study Assistant (AI Web App)
// Authentication and Authorization Middleware
// Author: Kareem Mostafa
// ======================================================

import jwt from "jsonwebtoken";

// ======================================================
// 1. Middleware: Verify JWT Token
// ======================================================
export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// ======================================================
// 2. Middleware: Require Admin Role (Optional Future Feature)
// ======================================================
export const requireAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ error: "Admin privileges required." });
    }
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(500).json({ error: "Authorization check failed." });
  }
};

// ======================================================
// 3. Utility Function: Generate Token
// ======================================================
export const generateToken = (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("Token Generation Error:", error.message);
    throw new Error("Failed to generate token.");
  }
};
