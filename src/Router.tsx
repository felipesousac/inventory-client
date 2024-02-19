import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
}
