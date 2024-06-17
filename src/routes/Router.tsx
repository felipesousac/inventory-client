import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { App } from "../App";
import { Home } from "../pages/home/Home";
import { Categories } from "../pages/categories/Categories";
import { CategoryDetail } from "../pages/categories/CategoryDetail";
import { LoginPage } from "../pages/login/LoginPage";
import { getUsernameSessionStorage } from "@/contexts/authProvider/util";

export function Router() {
  const user = getUsernameSessionStorage();

  function redirectToLogin() {
    if (!user) {
      return redirect("/");
    }
    return null;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: "/home",
          element: <Home />,
          loader: redirectToLogin,
        },
        {
          path: "/categories",
          element: <Categories />,
          loader: redirectToLogin,
        },
        {
          path: "/categories/:id/",
          element: <CategoryDetail />,
          loader: redirectToLogin,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
