import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MiniDrawer from "./MiniDrawer.tsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MiniDrawer />
    </SnackbarProvider>
  </BrowserRouter>,
);
