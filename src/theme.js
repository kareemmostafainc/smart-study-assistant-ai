// ======================================================
// Smart Study Assistant (AI Web App)
// Theme Configuration (Dark / Light Mode)
// Author: Kareem Mostafa
// ======================================================

/**
 * This module handles the appearance theme of the application.
 * It allows seamless switching between dark and light modes,
 * persists user preference, and ensures system-level theme detection.
 */

// ======================================================
// 1. Load User or System Preference
// ======================================================

export function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  } else {
    // Detect system preference if no saved theme found
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("dark-mode", prefersDark);
    localStorage.setItem("theme", prefersDark ? "dark" : "light");
  }
}

// ======================================================
// 2. Toggle Theme Function
// ======================================================

export function toggleTheme() {
  const isDark = document.body.classList.contains("dark-mode");
  document.body.classList.toggle("dark-mode", !isDark);
  localStorage.setItem("theme", !isDark ? "dark" : "light");
}

// ======================================================
// 3. Get Current Theme
// ======================================================

export function getCurrentTheme() {
  return document.body.classList.contains("dark-mode") ? "dark" : "light";
}

// ======================================================
// 4. Listen to System Theme Changes (Optional Enhancement)
// ======================================================

export function watchSystemTheme() {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (event) => {
    const systemPrefersDark = event.matches;
    document.body.classList.toggle("dark-mode", systemPrefersDark);
    localStorage.setItem("theme", systemPrefersDark ? "dark" : "light");
  });
}

// ======================================================
// Initialization Example (to be called from App.js):
//
// import { initializeTheme, watchSystemTheme } from "./theme";
// initializeTheme();
// watchSystemTheme();
// ======================================================
