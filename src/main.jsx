import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App, { dashboardAction, dashboardLoader } from "./App.jsx";
import Login, { loginAction } from "./pages/Login.jsx";
import "./index.css";
import Register, { registerAction } from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/dashboard",
    element: <App />,
    loader: dashboardLoader,
    action: dashboardAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
