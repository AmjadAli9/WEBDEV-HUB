// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ Only here

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>


    <BrowserRouter>

      <App />
    </BrowserRouter>
  </React.StrictMode>
);
