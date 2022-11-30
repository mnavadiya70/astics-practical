import React from "react";
import { useRoutes } from "react-router-dom";
import { routes, authRoutes } from "./routes";

const App = () => {
  const content = useRoutes(routes);
  const authContent = useRoutes(authRoutes);
  const password = localStorage.getItem("password");
  if (password) {
    return content;
  }
  return authContent;
};

export default App;
