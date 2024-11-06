import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/contexts/theme-provider.tsx";
import Router from "./router/Router.tsx";
import("./index.css");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </StrictMode>,
);
