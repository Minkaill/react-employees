import { createBrowserRouter } from "react-router-dom";
import { Paths } from "./paths";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { Employees } from "./pages/employees";
import { CreateEmployee } from "./pages/employees/createEmployee";
import { Status } from "./pages/status";
import { Employee } from "./pages/employees/employee";

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
    path: Paths.employeeAdd,
    element: <CreateEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
]);
