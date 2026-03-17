import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "@/layouts/app-layout"
import { AuthLayout } from "@/layouts/auth-layout"

import DashboardPage from "@/pages/dashboard/DashboardPage"
import LoginPage from "@/pages/auth/login-page"
import ProductsPage from "@/pages/products/ProductsPage"
import SettingsPage from "@/pages/settings/SettingsPage"
import ErrorPage from "@/pages/error-page"
import NotFoundPage from "@/pages/not-found-page"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
])
