// ======================================================
// Smart Study Assistant (AI Web App)
// React Entry Point
// ======================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ======================================================
// Rendering Application to the Root DOM Element
// ======================================================
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ======================================================
// Performance Monitoring (Optional)
// ======================================================
// To enable web vitals logging or performance tracking in production,
// uncomment the following lines and integrate with your analytics service.
//
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);
