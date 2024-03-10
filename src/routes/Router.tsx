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
import { useUserSessionContext } from "@/contexts/UserSession";

export function Router() {
  const { userIsLogged } = useUserSessionContext();

  function redirectToLogin() {
    if (!userIsLogged) {
      return redirect("/login");
    }
    return null;
  }

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
