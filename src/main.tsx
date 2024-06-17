import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./routes/Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserSessionProvider } from "./contexts/UserSession";
import { AuthProvider } from "./contexts/authProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
