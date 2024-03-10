import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Router } from "./Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { UserSessionProvider } from "./contexts/UserSession";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserSessionProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </UserSessionProvider>
  </React.StrictMode>
);
