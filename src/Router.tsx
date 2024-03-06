import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/home/Home";
import { Categories } from "./pages/categories/Categories";
import { CategoryDetail } from "./pages/categories/CategoryDetail";
import { LoginPage } from "./pages/login/LoginPage";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:id/",
          element: <CategoryDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
