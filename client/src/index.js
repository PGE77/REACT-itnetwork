import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const Root = createRoot(rootElement);

Root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
