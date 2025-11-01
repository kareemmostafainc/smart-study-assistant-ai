// ======================================================
// Smart Study Assistant (AI Web App)
// API Routes Definition
// Author: Kareem Mostafa
// ======================================================

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Note from "./models/Note.js";
import Quiz from "./models/Quiz.js";

const router = express.Router();

// ======================================================
// 1. Authentication Routes
// ======================================================

// User Registration
router.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// User Login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ======================================================
// 2. Notes Management Routes
// ======================================================

// Save summarized notes
router.post("/notes/save", async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    if (!userId || !title || !content)
      return res.status(400).json({ error: "Missing required fields" });

    const note = new Note({
      userId,
      title,
      content,
    });

    await note.save();
    res.status(201).json({ message: "Note saved successfully", note });
  } catch (err) {
    console.error("Save Note Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get all user notes
router.get("/notes/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (err) {
    console.error("Fetch Notes Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ======================================================
// 3. Quiz Generation Routes
// ======================================================

// Save quiz results
router.post("/quiz/save", async (req, res) => {
  try {
    const { userId, score, totalQuestions } = req.body;

    if (!userId || score === undefined || !totalQuestions)
      return res.status(400).json({ error: "Missing required fields" });

    const quiz = new Quiz({
      userId,
      score,
      totalQuestions,
      date: new Date(),
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz result saved", quiz });
  } catch (err) {
    console.error("Save Quiz Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Retrieve quiz history
router.get("/quiz/:userId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.params.userId });
    res.json(quizzes);
  } catch (err) {
    console.error("Fetch Quiz Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ======================================================
// 4. AI Related Routes
// ======================================================

// Forward AI requests (handled in Python)
router.post("/ai/query", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question)
      return res.status(400).json({ error: "Question input is required" });

    // Placeholder for AI integration
    res.json({
      response:
        "AI processing is handled in the Python module. This endpoint forwards data.",
    });
  } catch (err) {
    console.error("AI Route Error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ======================================================
// 5. Export Routes
// ======================================================
export default router;
