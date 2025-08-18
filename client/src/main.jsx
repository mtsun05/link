import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLoaderData,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import Navbar from "./components/utility/misc/Navbar.jsx";
import Landing from "./components/pages/Landing.jsx";
import Signup from "./components/pages/Signup.jsx";
import Login from "./components/pages/Login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import CreateComm from "./components/pages/CreateComm.jsx";
import Join from "./components/pages/Join.jsx";
import Community from "./components/pages/Community.jsx";
import CreateEvent from "./components/pages/CreateEvent.jsx";
import Event from "./components/pages/Event.jsx";
import "./index.css";

import { authLoader } from "./loaders/AuthLoader";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

const ProtectedLayout = () => {
  const user = useLoaderData();

  return (
    <div className="h-screen">
      <Navbar user={user} />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/users",
        children: [
          { path: "signup", element: <Signup /> },
          { path: "login", element: <Login /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    loader: authLoader,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/communities",
        children: [
          { path: "create", element: <CreateComm /> },
          { path: "join", element: <Join /> },
          { path: ":id", element: <Community /> },
        ],
      },
      {
        path: "/events",
        children: [
          { path: "create/:id", element: <CreateEvent /> },
          { path: "join", element: <Join /> },
          { path: ":id", element: <Event /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
