// ======================================================
// Smart Study Assistant (AI Web App)
// Smart Notes Generator Page
// Author: Kareem Mostafa
// ======================================================

import React, { useState } from "react";
import "../styles.css";

// ======================================================
// 1. NotesPage Component
// ======================================================

const NotesPage = () => {
  // --------------------------
  // Local State
  // --------------------------
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  // ======================================================
  // 2. Handle File Upload
  // ======================================================
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setError("");
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  // ======================================================
  // 3. Simulate AI Summarization (Future: Replace with API)
  // ======================================================
  const handleSummarize = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    setIsUploading(true);
    setSummary("");
    setError("");

    try {
      // Normally, you would send the file to the backend AI API like:
      // const formData = new FormData();
      // formData.append("pdf", file);
      // const res = await fetch("/api/summarize", { method: "POST", body: formData });
      // const data = await res.json();
      // setSummary(data.summary);

      // Simulated delay and output for static preview
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockSummary = `
      • Artificial Intelligence focuses on creating systems that can learn and make decisions.
      • Machine learning algorithms analyze data patterns to predict outcomes.
      • Natural Language Processing enables computers to understand and summarize human text.
      • Efficient study habits rely on focused reading and active recall.
      • Smart Study Assistant transforms PDFs into concise, actionable notes.
      `;

      setSummary(mockSummary.trim());
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // ======================================================
  // 4. Render Section
  // ======================================================
  return (
    <div className="container fade-in">
      <h1>Smart Notes Generator</h1>
      <p>
        Upload your study material (PDF format), and our AI will generate concise notes for you.
      </p>

      {/* ====================================================== */}
      {/* File Upload Section */}
      {/* ====================================================== */}
      <div
        style={{
          border: "2px dashed var(--color-border)",
          borderRadius: "var(--radius)",
          padding: "2rem",
          marginTop: "1.5rem",
          backgroundColor: "#fff",
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem" }}
        />
        <button onClick={handleSummarize} disabled={isUploading}>
          {isUploading ? "Processing..." : "Generate Summary"}
        </button>

        {error && (
          <p style={{ color: "red", marginTop: "1rem", fontWeight: "500" }}>
            {error}
          </p>
        )}
      </div>

      {/* ====================================================== */}
      {/* Summary Display Section */}
      {/* ====================================================== */}
      {summary && (
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            backgroundColor: "#f9fafb",
            whiteSpace: "pre-line",
            lineHeight: "1.8",
          }}
        >
          <h2 style={{ marginBottom: "1rem", color: "var(--color-primary)" }}>
            Generated Notes
          </h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

// ======================================================
// Export Component
// ======================================================

export default NotesPage;
