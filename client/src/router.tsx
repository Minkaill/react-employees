import { createBrowserRouter } from "react-router-dom";
import { Paths } from "./paths";
import { Register } from "./pages/register";
import { Login } from "./pages/login";

export const router = createBrowserRouter([
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.home,
    element: <h1>Home</h1>,
  },
  {
    path: Paths.employee,
    element: <h1>employee</h1>,
  },
]);
