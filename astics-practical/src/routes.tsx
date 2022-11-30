import React, { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Listing = lazy(() => import("./pages/Listing"));

const paths = {
  login: "",
  dashboard: "",
  list: "list",
  signUp: "sign-up",
};

const authRoutes = [
  {
    children: [
      {
        path: paths.login,
        element: <Login />,
      },
      {
        path: paths.signUp,
        element: <SignUp />,
      },
    ],
  },
];

const routes = [
  {
    children: [
      {
        path: paths.dashboard,
        element: <Dashboard />,
      },
      {
        path: paths.list,
        element: <Listing />,
      },
    ],
  },
];

export { routes, authRoutes };
