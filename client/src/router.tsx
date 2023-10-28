import { createBrowserRouter } from "react-router-dom";
import { Paths } from "./paths";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Employees } from "./pages/employees";

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
    element: <Employees />,
  },
  {
    path: Paths.employee,
    element: <h1>employee</h1>,
  },
]);
