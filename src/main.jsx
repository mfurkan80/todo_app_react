import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App, { dashboardAction, dashboardLoader } from "./App.jsx";
import Login from "./components/Login.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <App />,
    loader: dashboardLoader,
    action: dashboardAction,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
