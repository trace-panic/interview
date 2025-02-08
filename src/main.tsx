import { Toaster } from "@/components/ui/toaster";
import { Login } from "@/pages/login";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const ROUTER = createBrowserRouter([
  {
    path: "/",
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={ROUTER} />
  </StrictMode>,
);
