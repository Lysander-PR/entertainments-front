import { createBrowserRouter, Navigate } from "react-router";

import { AuthPage } from "@/auth/pages/AuthPage";
import { EntertainmentsLayout } from "@/entertainments/layouts/EntertainmentsLayout";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <EntertainmentsLayout />,
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
