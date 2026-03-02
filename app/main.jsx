import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./app.css";
import router from "./router.jsx";
import Clarity from "@microsoft/clarity";

// Initialize Microsoft Clarity
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
if (clarityProjectId) {
  Clarity.init(clarityProjectId);
  console.log("[Clarity] Initialized with project ID:", clarityProjectId.substring(0, 8) + "...");
} else {
  console.warn("[Clarity] VITE_CLARITY_PROJECT_ID not set. Analytics disabled.");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
