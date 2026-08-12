import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MiniDrawer from "./MiniDrawer.tsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MiniDrawer />
  </BrowserRouter>,
);
