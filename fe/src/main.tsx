import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Providers from "./app/providers";
import { router } from "./app/router";
import { App as AntdApp } from "antd";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </Providers>
  </React.StrictMode>
);
