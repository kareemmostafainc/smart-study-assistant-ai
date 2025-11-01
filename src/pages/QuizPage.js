// ======================================================
// Smart Study Assistant (AI Web App)
// Interactive Quiz Generator Page
// Author: Kareem Mostafa
// ======================================================

import React, { useState } from "react";
import "../styles.css";

// ======================================================
// 1. QuizPage Component
// ======================================================

const QuizPage = () => {
  // --------------------------
  // Local State
  // --------------------------
  const [quizType, setQuizType] = useState("multiple"); // "multiple" or "truefalse"
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // --------------------------
  // Example Questions (Simulated)
  // --------------------------
  const quizData =
    quizType === "multiple"
      ? [
          {
            question: "What is Artificial Intelligence primarily concerned with?",
            options: [
              "Designing computer hardware",
              "Creating systems that can learn and reason",
              "Developing websites and databases",
              "Improving CPU performance",
            ],
            correct: 1,
          },
          {
            question: "Which algorithm is used for text summarization?",
            options: ["K-Means", "TF-IDF", "Naive Bayes", "BERT"],
            correct: 3,
          },
        ]
      : [
          {
            question: "AI systems can never make predictions based on data.",
            correct: false,
          },
          {
            question: "Machine learning is a subset of artificial intelligence.",
            correct: true,
          },
        ];

  // --------------------------
  // Handle Answer Selection
  // --------------------------
  const handleAnswer = (index) => {
    const question = quizData[currentQuestion];
    const isCorrect =
      quizType === "multiple"
        ? index === question.correct
        : index === question.correct;

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  // --------------------------
  // Restart Quiz
  // --------------------------
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsCompleted(false);
  };

  // ======================================================
  // Render Section
  // ======================================================
  return (
    <div className="container fade-in">
      <h1>Quiz Generator</h1>
      <p>
        Test your understanding of the summarized notes. Choose quiz type below.
      </p>

      {/* ====================================================== */}
      {/* Quiz Type Selector */}
      {/* ====================================================== */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => setQuizType("multiple")}
          style={{
            marginRight: "1rem",
            backgroundColor:
              quizType === "multiple" ? "var(--color-primary)" : "#d1d5db",
          }}
        >
          Multiple Choice
        </button>
        <button
          onClick={() => setQuizType("truefalse")}
          style={{
            backgroundColor:
              quizType === "truefalse" ? "var(--color-primary)" : "#d1d5db",
          }}
        >
          True / False
        </button>
      </div>

      {/* ====================================================== */}
      {/* Quiz Content */}
      {/* ====================================================== */}
      {!isCompleted ? (
        <div
          style={{
            padding: "2rem",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            backgroundColor: "#fff",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>
            Q{currentQuestion + 1}. {quizData[currentQuestion].question}
          </h2>

          {quizType === "multiple" ? (
            quizData[currentQuestion].options.map((opt, index) => (
              <button
                key={index}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  marginBottom: "1rem",
                  backgroundColor:
                    selectedAnswer === index
                      ? "var(--color-primary-dark)"
                      : "var(--color-primary)",
                }}
                onClick={() => handleAnswer(index)}
              >
                {opt}
              </button>
            ))
          ) : (
            <>
              <button
                style={{ marginRight: "1rem" }}
                onClick={() => handleAnswer(true)}
              >
                True
              </button>
              <button onClick={() => handleAnswer(false)}>False</button>
            </>
          )}
        </div>
      ) : (
        // ======================================================
        // Quiz Result Summary
        // ======================================================
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
            backgroundColor: "#f9fafb",
          }}
        >
          <h2>Quiz Completed</h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            Your Score: {score} / {quizData.length}
          </p>
          <button onClick={restartQuiz}>Try Again</button>
        </div>
      )}
    </div>
  );
};

// ======================================================
// Export Component
// ======================================================

export default QuizPage;
