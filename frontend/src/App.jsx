import { React } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoute } from "./Authentication/ProtectedRoute";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "./home/Home";
import NotFound from "./home/NotFound";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
  // localStorage.clear()
  return <Navigate to="/signin" />;
}

const route = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute child={<Home />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/signin",
    element: <ProtectedRoute child={<Login />} />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
