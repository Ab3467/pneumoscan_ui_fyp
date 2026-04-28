import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// Entry point monitoring
const appStartTime = new Date();
console.log("App start checked at", appStartTime);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Application entry point
