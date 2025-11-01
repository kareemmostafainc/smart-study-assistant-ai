// ======================================================
// Smart Study Assistant (AI Web App)
// ChatPage - Interactive Q&A with AI
// Author: Kareem Mostafa
// ======================================================

import React, { useState, useRef, useEffect } from "react";
import "../styles.css";

// ======================================================
// 1. ChatPage Component
// ======================================================

const ChatPage = () => {
  // --------------------------
  // Local State
  // --------------------------
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello Kareem! How can I assist you with your notes today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // For automatic scrolling to the latest message
  const chatEndRef = useRef(null);

  // ======================================================
  // 2. Auto Scroll to Bottom
  // ======================================================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ======================================================
  // 3. Handle Message Send
  // ======================================================
  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add user message to chat
    const userMsg = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // ==============================
      // Future Implementation: Real API Call
      // ==============================
      // const response = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message: trimmedInput }),
      // });
      // const data = await response.json();
      // const aiResponse = data.reply;

      // Simulated AI response for preview
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const aiResponse =
        "That’s a great question! Based on your uploaded notes, here’s a concise explanation:\n\n" +
        "Artificial Intelligence uses algorithms and data to perform tasks that typically require human intelligence — such as reasoning, pattern recognition, and decision-making.\n\n" +
        "Would you like a short quiz on this topic?";

      const aiMsg = { sender: "ai", text: aiResponse };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        sender: "ai",
        text: "Sorry, there was a connection error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // ======================================================
  // 4. Handle Enter Key
  // ======================================================
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ======================================================
  // 5. Render Section
  // ======================================================
  return (
    <div className="container fade-in" style={{ height: "80vh" }}>
      <h1>AI Chat Assistant</h1>
      <p>Ask your study-related questions and receive clear, accurate explanations.</p>

      {/* ====================================================== */}
      {/* Chat Window */}
      {/* ====================================================== */}
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius)",
          padding: "1.5rem",
          height: "60vh",
          overflowY: "auto",
          backgroundColor: "#ffffff",
          marginTop: "1rem",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                backgroundColor:
                  msg.sender === "user" ? "var(--color-primary)" : "#f3f4f6",
                color: msg.sender === "user" ? "#fff" : "#111827",
                padding: "0.8rem 1.2rem",
                borderRadius: "var(--radius)",
                lineHeight: "1.6",
                whiteSpace: "pre-line",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* ====================================================== */}
      {/* Input Section */}
      {/* ====================================================== */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <textarea
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows="2"
          style={{
            flex: 1,
            resize: "none",
            padding: "0.8rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{
            height: "42px",
            padding: "0 1.5rem",
            fontWeight: "600",
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

// ======================================================
// Export Component
// ======================================================
export default ChatPage;
