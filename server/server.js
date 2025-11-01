// ======================================================
// Smart Study Assistant (AI Web App)
// Backend Server (Node.js + Express)
// Author: Kareem Mostafa
// ======================================================

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import connectDB from "./database.js";
import routes from "./routes.js";
import { spawn } from "child_process";

// ======================================================
// 1. Initialize Environment and App
// ======================================================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ======================================================
// 2. Middleware Configuration
// ======================================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ======================================================
// 3. Database Connection
// ======================================================
connectDB();

// ======================================================
// 4. API Routes
// ======================================================
app.use("/api", routes);

// ======================================================
// 5. Python AI Bridge (Flask Communication)
// ======================================================
// Example endpoint to send text to Python AI backend
app.post("/api/ai/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Text input is required" });
    }

    // Spawn Python process for AI summarization
    const python = spawn("python3", ["./ai/app.py", text]);

    let result = "";
    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("AI Error:", data.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return res
          .status(500)
          .json({ error: "AI Module failed to process text" });
      }
      res.json({ summary: result.trim() });
    });
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ======================================================
// 6. Health Check Endpoint
// ======================================================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    server: "Smart Study Assistant Backend",
    timestamp: new Date().toISOString(),
  });
});

// ======================================================
// 7. Global Error Handling Middleware
// ======================================================
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ======================================================
// 8. Start Server
// ======================================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
