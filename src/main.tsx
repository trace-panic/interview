import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { DashboardLayout } from "@/layouts/dashboard";
import Cart from "@/pages/cart";
import { Dashboard } from "@/pages/dashboard";
import Home from "@/pages/home";
import { Login } from "@/pages/login";
import { CreateProduct } from "@/pages/new-product";
import ProductsTable from "@/pages/products";
import { Signup } from "@/pages/signup";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "./index.css";

// eslint-disable-next-line react-refresh/only-export-components
const MainLayout = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div>
      <Header />
      <Outlet />
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "products",
            element: <ProductsTable />,
          },
          {
            path: "products/new",
            element: <CreateProduct />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={ROUTER} />
    <Toaster />
  </StrictMode>,
);
