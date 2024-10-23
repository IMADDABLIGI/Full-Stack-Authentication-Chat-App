import { React } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import {ProtectedRoute} from './Authentication/ProtectedRoute';
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

const route = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute child={<Home />} />,
    errorElement : <NotFound />
  },
  {
    path: "/login",
    element: <ProtectedRoute child={<Login />}/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />
  },
  
])

function App() {
  return (
    <RouterProvider router={route} />
  );
}

export default App;

