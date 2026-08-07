import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App, { dashboardAction, dashboardLoader } from "./App.jsx";
import Login, { loginAction } from "./pages/Login.jsx";
import "./index.css";
import Register, { registerAction } from "./pages/Register.jsx";
import Profile, { profileLoader } from "./pages/Profile.jsx";

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
  {
    path: "/profile",
    element: <Profile />,
    loader: profileLoader,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
