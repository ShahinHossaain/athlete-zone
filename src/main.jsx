import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./Provider/AuthProvider";
import axios from "axios";

// tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
// axios
axios.defaults.baseURL = "https://assignment-12-server-plum.vercel.app";

// axios.interceptors.response.use(
//   (res) => {
//     // ei data server side e req.headers.authorization er vitore pabe

//     console.log("from main jsx response", res);
//     return res.data;
//   },
//   (err) => {
//     console.log(err);
//   }
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>{" "}
    </QueryClientProvider>
  </React.StrictMode>
);
