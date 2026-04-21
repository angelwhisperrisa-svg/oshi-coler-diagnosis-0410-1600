import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rawPublicUrl = process.env.PUBLIC_URL || "";
const routerBasename = /^https?:\/\//i.test(rawPublicUrl) ? "" : rawPublicUrl.replace(/\/$/, "");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={routerBasename}>
    <App />
  </BrowserRouter>
);