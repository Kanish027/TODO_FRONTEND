import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContextProvider from "./context/UserContextProvider";

export const server = "https://todoapp-v1qw.onrender.com/api/v1";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
