import { createBrowserRouter, Navigate } from "react-router";

import { AuthPage } from "@/auth/pages/AuthPage";
import { EntertainmentsLayout } from "@/entertainments/layouts/EntertainmentsLayout";
import { HomePage } from "@/entertainments/pages/HomePage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <EntertainmentsLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/signature",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
